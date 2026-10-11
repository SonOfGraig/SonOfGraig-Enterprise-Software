import { NextRequest } from 'next/server';
import { z } from 'zod';
import { recordClick, recordClientError, recordFormStep, recordPage, recordScenes, recordView, recordVital } from '@/lib/ops/telemetry';
import { getClientIp } from '@/lib/forms/rate-limit';

// First-party, cookieless beacon (components/ops/SiteTelemetry.tsx). Feeds
// lib/ops/telemetry, which GRAIG reads. Always answers 204 so a broken or
// abusive client learns nothing; the body is capped and strictly validated.
// Its own rate limit — sharing the forms' bucket would eat a visitor's
// 5-per-10-minutes form allowance on page views.

const MAX_BODY = 4 * 1024;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 120; // clicks and page-end events add up on a busy visit
const hits = new Map<string, { n: number; reset: number }>();

function allowed(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return true;
  }
  return ++h.n <= MAX_PER_WINDOW;
}

const path = z.string().max(200).regex(/^\/[\w\-/.]*$/);
const device = z.enum(['mobile', 'tablet', 'desktop']);
const browser = z.string().max(20).regex(/^[\w-]*$/);
// Short human labels (link text, button text, form/field names). No @ — an
// email address in a label would be personal information; such events drop.
const label = z.string().min(1).max(80).regex(/^[^@<>]*$/);
const form = z.string().max(40).regex(/^[a-z0-9:-]+$/);
const campaign = z.string().max(120).regex(/^[^@<>]*$/);

const event = z.discriminatedUnion('t', [
  z.object({
    t: z.literal('view'),
    path,
    ref: z.string().max(100).regex(/^[\w.()-]*$/).optional(),
    device,
    rm: z.boolean(),
    prev: path.optional(),
    landing: z.boolean().optional(),
    camp: campaign.optional(),
  }),
  z.object({ t: z.literal('click'), path, label }),
  z.object({
    t: z.literal('page'),
    path,
    depth: z.union([z.literal(0), z.literal(25), z.literal(50), z.literal(75), z.literal(100)]).optional(),
    ms: z.number().min(0).max(3_600_000),
  }),
  z.object({ t: z.literal('form'), form, step: z.enum(['start', 'abandon']), field: z.string().max(40).regex(/^[\w-]*$/).optional() }),
  z.object({
    t: z.literal('scenes'),
    path,
    device,
    browser,
    mounted: z.number().int().min(0).max(50),
    reduced: z.number().int().min(0).max(50),
    seen: z.number().int().min(0).max(50),
    animating: z.number().int().min(0).max(50),
    stalled: z.number().int().min(0).max(50),
    stalledNames: z.array(z.string().max(40).regex(/^[\w:-]+$/)).max(5),
  }),
  z.object({
    t: z.literal('error'),
    path,
    browser,
    message: z.string().max(300),
    source: z.string().max(120),
  }),
  z.object({
    t: z.literal('vital'),
    name: z.enum(['LCP', 'CLS', 'INP', 'FCP', 'TTFB']),
    value: z.number().min(0).max(120_000),
  }),
]);

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor/i;

export async function POST(req: NextRequest) {
  const done = new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY) return done;
  if (BOT.test(req.headers.get('user-agent') ?? '')) return done;
  if (!allowed(getClientIp(req.headers))) return done;

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return done;
  }
  if (raw.length > MAX_BODY) return done;

  let parsed;
  try {
    parsed = event.safeParse(JSON.parse(raw));
  } catch {
    return done;
  }
  if (!parsed.success) return done;
  const e = parsed.data;

  switch (e.t) {
    case 'view':
      recordView({
        path: e.path,
        referrer: e.ref,
        // Set by Cloudflare at the edge; two letters, never more precise.
        country: (req.headers.get('cf-ipcountry') ?? '').slice(0, 2).toUpperCase() || undefined,
        device: e.device,
        reducedMotion: e.rm,
        prev: e.prev,
        landing: e.landing,
        campaign: e.camp,
      });
      break;
    case 'click':
      recordClick(e.path, e.label);
      break;
    case 'page':
      recordPage(e.path, e.depth, e.ms);
      break;
    case 'form':
      recordFormStep(e.form, e.step, e.field);
      break;
    case 'scenes':
      recordScenes(e.path, e, { device: e.device, browser: e.browser });
      break;
    case 'error':
      recordClientError({ path: e.path, message: e.message, source: e.source, browser: e.browser });
      break;
    case 'vital':
      recordVital(e.name, e.value);
      break;
  }
  return done;
}
export const runtime = 'nodejs';
