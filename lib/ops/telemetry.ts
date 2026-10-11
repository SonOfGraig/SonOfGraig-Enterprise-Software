// Operational telemetry for GRAIG (the founder's operations agent), who pulls
// it from /api/ops/summary every 15 minutes and keeps the history himself.
//
// Kept in memory on purpose: the systemd unit makes the filesystem read-only
// (ProtectSystem=strict) and the site stores nothing about visitors. A restart
// resets the counters; GRAIG merges hourly buckets by max, so at most the
// restart hour is undercounted.
//
// Privacy (POPIA): no cookies, no IP addresses, no user ids, no query strings.
// A page view is a path, a referrer HOST, a country code from Cloudflare and a
// device class. Form outcomes carry the form name and outcome, never the
// submitted fields. Every event is also logged as one JSON line to journald.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const HOURS_KEPT = 48;
const RECENT_KEPT = 50;

type Counter = Record<string, number>;
type Bucket = {
  hour: string; // ISO hour, e.g. 2026-10-11T15
  views: number;
  paths: Counter;
  referrers: Counter;
  countries: Counter;
  devices: Counter;
  /** page views whose device asked for reduced motion */
  reducedMotion: number;
  /** scene health, summed over page views that reported it */
  scenes: { reports: number; mounted: number; reduced: number; seen: number; animating: number; stalled: number; stalledPages: number };
  forms: Record<string, Counter>; // form → outcome → count
  clientErrors: number;
  vitals: Record<string, number[]>; // LCP/CLS/INP samples (capped)
};

export type FormOutcome =
  | 'ok'
  | 'validation'
  | 'turnstile'
  | 'rate_limited'
  | 'too_large'
  | 'invalid_json'
  | 'honeypot_dropped'
  | 'send_failed';

type Recent = { at: string; kind: string; [k: string]: unknown };

// One store per server process, on globalThis: each route is its own bundle,
// so plain module state would give /api/telemetry and /api/ops/summary
// separate copies (seen in `next dev`; nothing guarantees sharing in prod).
type Store = { startedAt: string; buckets: Map<string, Bucket>; failures: Recent[]; errors: Recent[]; stalls: Recent[] };
const g = globalThis as typeof globalThis & { __sgOpsTelemetry?: Store };
const store: Store = (g.__sgOpsTelemetry ??= {
  startedAt: new Date().toISOString(),
  buckets: new Map(),
  failures: [],
  errors: [],
  stalls: [],
});
const { startedAt, buckets } = store;
const recentFailures = store.failures;
const recentErrors = store.errors;
const recentStalls = store.stalls;

function hourKey(d = new Date()) {
  return d.toISOString().slice(0, 13);
}

function bucket(): Bucket {
  const key = hourKey();
  let b = buckets.get(key);
  if (!b) {
    b = {
      hour: key, views: 0, paths: {}, referrers: {}, countries: {}, devices: {}, reducedMotion: 0,
      scenes: { reports: 0, mounted: 0, reduced: 0, seen: 0, animating: 0, stalled: 0, stalledPages: 0 },
      forms: {}, clientErrors: 0, vitals: {},
    };
    buckets.set(key, b);
    const cutoff = hourKey(new Date(Date.now() - HOURS_KEPT * 3600_000));
    for (const k of buckets.keys()) if (k < cutoff) buckets.delete(k);
  }
  return b;
}

function inc(c: Counter, k: string, by = 1) {
  // Cap distinct keys per bucket so junk paths can't grow memory without bound.
  if (!(k in c) && Object.keys(c).length >= 200) k = '(other)';
  c[k] = (c[k] ?? 0) + by;
}

function push(list: Recent[], item: Recent) {
  list.unshift(item);
  if (list.length > RECENT_KEPT) list.length = RECENT_KEPT;
}

function log(event: Record<string, unknown>) {
  console.log(`[ops] ${JSON.stringify(event)}`);
}

export function recordView(v: {
  path: string; referrer?: string; country?: string; device: string; reducedMotion: boolean;
}) {
  const b = bucket();
  b.views++;
  inc(b.paths, v.path);
  inc(b.referrers, v.referrer || '(direct)');
  inc(b.countries, v.country || '??');
  inc(b.devices, v.device);
  if (v.reducedMotion) b.reducedMotion++;
}

export function recordScenes(path: string, s: {
  mounted: number; reduced: number; seen: number; animating: number; stalled: number; stalledNames: string[];
}, ctx: { device: string; browser: string }) {
  const b = bucket();
  b.scenes.reports++;
  b.scenes.mounted += s.mounted;
  b.scenes.reduced += s.reduced;
  b.scenes.seen += s.seen;
  b.scenes.animating += s.animating;
  b.scenes.stalled += s.stalled;
  if (s.stalled > 0) {
    b.scenes.stalledPages++;
    const item = { at: new Date().toISOString(), kind: 'scene_stall', path, names: s.stalledNames, ...ctx };
    push(recentStalls, item);
    log(item);
  }
}

export function recordClientError(e: { path: string; message: string; source: string; browser: string }) {
  bucket().clientErrors++;
  const item = { at: new Date().toISOString(), kind: 'client_error', ...e };
  push(recentErrors, item);
  log(item);
}

export function recordVital(name: string, value: number) {
  const v = (bucket().vitals[name] ??= []);
  if (v.length < 500) v.push(Math.round(value * 1000) / 1000);
}

/** Server-side form outcome. `reason` is a short internal cause, never user input. */
export function recordForm(form: string, outcome: FormOutcome, reason?: string) {
  const b = bucket();
  inc((b.forms[form] ??= {}), outcome);
  if (outcome === 'send_failed' || outcome === 'turnstile') {
    const item = { at: new Date().toISOString(), kind: 'form_failure', form, outcome, reason: reason?.slice(0, 200) };
    push(recentFailures, item);
    log(item);
  }
}

let buildId: string | null | undefined;
function currentBuild() {
  if (buildId === undefined) {
    try {
      buildId = readFileSync(join(process.cwd(), '.next', 'BUILD_ID'), 'utf8').trim();
    } catch {
      buildId = null;
    }
  }
  return buildId;
}

function p75(xs: number[]) {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(s.length * 0.75))];
}

export function summary() {
  const hours = [...buckets.values()]
    .sort((a, b) => a.hour.localeCompare(b.hour))
    .map(({ vitals, ...rest }) => ({
      ...rest,
      vitals: Object.fromEntries(Object.entries(vitals).map(([k, xs]) => [k, { p75: p75(xs), n: xs.length }])),
    }));
  return {
    startedAt,
    now: new Date().toISOString(),
    buildId: currentBuild(),
    hours,
    recent: { formFailures: recentFailures, clientErrors: recentErrors, sceneStalls: recentStalls },
  };
}
