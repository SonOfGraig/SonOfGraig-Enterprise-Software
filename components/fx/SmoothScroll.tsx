'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import '@/lib/scroll'; // window.__lenis type

// Lenis inertial scrolling, as on the 2026 agency site. Off for
// prefers-reduced-motion and for touch devices, which already scroll natively.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // anchors: in-page #links scroll through Lenis instead of being cancelled.
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -80 } });
    window.__lenis = lenis; // used by lib/scroll.ts smoothScrollTo()
    let frame = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      if (window.__lenis === lenis) delete window.__lenis;
      lenis.destroy();
    };
  }, []);
  return null;
}
