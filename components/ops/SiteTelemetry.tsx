'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';
import { sceneReport } from '@/lib/ops/scenes';

// Cookieless operational beacon → /api/telemetry → GRAIG. Sends: page views
// (path, referrer host, device class, reduced-motion flag), whether the
// animated backgrounds actually ran, JavaScript errors and Core Web Vitals.
// No cookies, ids, query strings or anything typed. Page views are skipped
// when the browser sends Global Privacy Control or Do Not Track; health
// signals (errors, stalled animations) are not about the visitor and still go.

const SCENE_CHECK_MS = 12_000;
const MAX_ERRORS_PER_LOAD = 3;

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

let firstView = true;
let errorsSent = 0;
const errorSeen = new Set<string>();

export function SiteTelemetry() {
  const path = usePathname() || '/';

  useReportWebVitals((m) => {
    if (['LCP', 'CLS', 'INP', 'FCP', 'TTFB'].includes(m.name)) send({ t: 'vital', name: m.name, value: m.value });
  });

  // Page view + an animation health check for each route.
  useEffect(() => {
    if (!optedOut()) {
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
      firstView = false;
      send({ t: 'view', path, ref, device: device(), rm: matchMedia('(prefers-reduced-motion: reduce)').matches });
    }

    // Only judge animations if the tab stayed in front the whole time: a hidden
    // tab pauses them by design and would read as a false "stalled".
    let hidden = document.hidden;
    const onVis = () => {
      if (document.hidden) hidden = true;
    };
    document.addEventListener('visibilitychange', onVis);
    const timer = window.setTimeout(() => {
      const r = sceneReport();
      if (hidden || r.mounted === 0) return;
      send({ t: 'scenes', path, device: device(), browser: browser(), ...r });
    }, SCENE_CHECK_MS);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVis);
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
