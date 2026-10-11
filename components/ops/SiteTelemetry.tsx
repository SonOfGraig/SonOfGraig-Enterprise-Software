'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';
import { sceneReport } from '@/lib/ops/scenes';
import { campaignKey, captureAttribution } from '@/lib/ops/attribution';

// Cookieless operational + behaviour beacon → /api/telemetry → GRAIG.
//
// Per page view: path, referrer host, device class, reduced-motion flag, the
// previous path (journeys), whether it's the landing page, and the campaign
// tag if the visit came from a tagged link. While on the page: which links and
// buttons get clicked (their visible label, never form contents), the deepest
// quarter scrolled, and engaged time (tab in front AND input in the last 15 s).
// Forms: that one was started, and — if left unsent — the NAME of the last
// field touched (never what was typed). Plus JS errors, Web Vitals and whether
// the animated backgrounds ran.
//
// No cookies, ids, IPs or query strings. Behaviour and page views are skipped
// under Global Privacy Control / Do Not Track; health signals (errors,
// stalled animations) are not about the visitor and still go.

const SCENE_CHECK_MS = 12_000;
const MAX_ERRORS_PER_LOAD = 3;
const MAX_CLICKS_PER_PAGE = 30;
const IDLE_AFTER_MS = 15_000;

function send(body: Record<string, unknown>) {
  try {
    const data = JSON.stringify(body);
    if (navigator.sendBeacon?.('/api/telemetry', new Blob([data], { type: 'text/plain' }))) return;
    void fetch('/api/telemetry', { method: 'POST', body: data, keepalive: true }).catch(() => {});
  } catch {
    /* telemetry must never break the page */
  }
}

function device() {
  const w = window.innerWidth;
  return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
}

function browser() {
  const ua = navigator.userAgent;
  if (/SamsungBrowser/.test(ua)) return 'samsung';
  if (/Edg\//.test(ua)) return 'edge';
  if (/OPR\//.test(ua)) return 'opera';
  if (/Firefox\//.test(ua)) return 'firefox';
  if (/Chrome\//.test(ua)) return 'chrome';
  if (/Safari\//.test(ua)) return 'safari';
  return 'other';
}

function optedOut() {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return n.globalPrivacyControl === true || n.doNotTrack === '1';
}

/** The label a person would use for a link or button. Never an email address. */
function labelOf(el: HTMLElement): string | null {
  const raw =
    el.dataset.track ||
    el.getAttribute('aria-label') ||
    (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim() ||
    el.getAttribute('title') ||
    (el instanceof HTMLAnchorElement ? el.pathname : '');
  const text = raw.slice(0, 60).trim();
  if (!text || /@/.test(text)) return null;
  let target = '';
  if (el instanceof HTMLAnchorElement && el.href) {
    try {
      const u = new URL(el.href);
      target = u.origin === location.origin ? u.pathname : u.hostname.replace(/^www\./, '');
    } catch {
      target = '';
    }
  }
  return (target && target !== text ? `${text} → ${target}` : text).slice(0, 80).replace(/[<>@]/g, '');
}

const formName = (f: HTMLFormElement | null) => (f?.dataset.form && /^[a-z0-9:-]{1,40}$/.test(f.dataset.form) ? f.dataset.form : null);

let firstView = true;
let errorsSent = 0;
const errorSeen = new Set<string>();

export function SiteTelemetry() {
  const path = usePathname() || '/';
  const prevPath = useRef<string | null>(null);

  useReportWebVitals((m) => {
    if (['LCP', 'CLS', 'INP', 'FCP', 'TTFB'].includes(m.name)) send({ t: 'vital', name: m.name, value: m.value });
  });

  // One page view: view event, then behaviour until the visitor leaves it.
  useEffect(() => {
    const track = !optedOut();
    const attr = captureAttribution();
    if (track) {
      let ref: string | undefined;
      if (firstView) {
        try {
          const host = document.referrer ? new URL(document.referrer).hostname : '';
          ref = host && host !== location.hostname ? host.replace(/^www\./, '').slice(0, 100) : undefined;
        } catch {
          ref = undefined;
        }
      } else {
        ref = '(internal)';
      }
      send({
        t: 'view',
        path,
        ref,
        device: device(),
        rm: matchMedia('(prefers-reduced-motion: reduce)').matches,
        prev: prevPath.current ?? undefined,
        landing: firstView || undefined,
        camp: campaignKey(attr),
      });
    }
    firstView = false;
    prevPath.current = path;

    // ── behaviour ──
    let maxDepth = 0;
    let engaged = 0;
    let lastInput = performance.now();
    let clicks = 0;
    let depthSent = false;
    const started = new Map<string, string>(); // form → last field name
    const submitted = new Set<string>();

    const measure = () => {
      const doc = document.documentElement;
      const h = Math.max(doc.scrollHeight, 1);
      maxDepth = Math.max(maxDepth, Math.min(1, (window.scrollY + window.innerHeight) / h));
    };
    const active = () => {
      lastInput = performance.now();
    };
    const onScroll = () => {
      active();
      measure();
    };
    const tick = window.setInterval(() => {
      if (!document.hidden && performance.now() - lastInput < IDLE_AFTER_MS) engaged += 1000;
    }, 1000);

    const onClick = (e: MouseEvent) => {
      active();
      if (!track || clicks >= MAX_CLICKS_PER_PAGE) return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [role="button"], [data-track]');
      if (!el || el.closest('input, textarea, select')) return;
      const label = labelOf(el);
      if (!label) return;
      clicks++;
      send({ t: 'click', path, label });
    };

    const onFocus = (e: FocusEvent) => {
      const field = e.target as HTMLInputElement | null;
      const f = formName(field?.form ?? null);
      if (!f || !field?.name || field.name === 'hp') return;
      if (!started.has(f) && track) send({ t: 'form', form: f, step: 'start' });
      started.set(f, field.name.replace(/[^\w-]/g, '').slice(0, 40));
    };
    const onSubmit = (e: SubmitEvent) => {
      const f = formName(e.target as HTMLFormElement);
      if (f) submitted.add(f);
    };

    // Called when the page view ends (navigation) or the tab is hidden. The
    // depth and abandoned forms are reported once; engaged time as a delta.
    const flush = (final: boolean) => {
      if (!track) return;
      measure();
      const depth = Math.round(maxDepth * 4) * 25; // 0/25/50/75/100
      if (!depthSent || engaged > 0) send({ t: 'page', path, depth: depthSent ? undefined : depth, ms: engaged });
      depthSent = true;
      engaged = 0;
      if (final) {
        for (const [f, field] of started) if (!submitted.has(f)) send({ t: 'form', form: f, step: 'abandon', field });
        started.clear();
      }
    };
    const onHide = () => {
      if (document.hidden) flush(false);
    };
    const onPageHide = () => flush(true);

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    for (const ev of ['pointermove', 'keydown', 'touchstart'] as const) window.addEventListener(ev, active, { passive: true });
    document.addEventListener('click', onClick, true);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('submit', onSubmit, true);
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onPageHide);

    // Animation health: only if the tab stayed in front the whole time — a
    // hidden tab pauses them by design and would read as a false "stalled".
    let hidden = document.hidden;
    const onVis = () => {
      if (document.hidden) hidden = true;
    };
    document.addEventListener('visibilitychange', onVis);
    const sceneTimer = window.setTimeout(() => {
      const r = sceneReport();
      if (hidden || r.mounted === 0) return;
      send({ t: 'scenes', path, device: device(), browser: browser(), ...r });
    }, SCENE_CHECK_MS);

    return () => {
      flush(true); // client-side navigation to another page
      clearInterval(tick);
      clearTimeout(sceneTimer);
      window.removeEventListener('scroll', onScroll);
      for (const ev of ['pointermove', 'keydown', 'touchstart'] as const) window.removeEventListener(ev, active);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('submit', onSubmit, true);
      document.removeEventListener('visibilitychange', onHide);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [path]);

  // JavaScript errors from our own code (extensions and opaque cross-origin
  // "Script error." are noise we can't act on).
  useEffect(() => {
    const report = (message: string, source: string) => {
      if (errorsSent >= MAX_ERRORS_PER_LOAD) return;
      if (!message || message === 'Script error.' || /extension:\/\//.test(source)) return;
      const key = `${message}|${source}`;
      if (errorSeen.has(key)) return;
      errorSeen.add(key);
      errorsSent++;
      send({ t: 'error', path: location.pathname.slice(0, 200), browser: browser(), message: message.slice(0, 300), source: source.slice(0, 120) });
    };
    const onError = (e: ErrorEvent) => {
      let src = '';
      try {
        src = e.filename ? `${new URL(e.filename).pathname.split('/').pop()}:${e.lineno}` : '';
      } catch {
        src = String(e.filename).slice(0, 120);
      }
      if (e.filename && !e.filename.startsWith(location.origin)) return;
      report(String(e.message), src);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const r = e.reason as { message?: string } | undefined;
      report(`unhandled rejection: ${r?.message ?? String(e.reason)}`, '');
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}
