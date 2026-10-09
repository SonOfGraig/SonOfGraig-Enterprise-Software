import type Lenis from 'lenis';

// Lenis (components/fx/SmoothScroll) owns the scroll position while it runs,
// so a native `window.scrollTo({ behavior: 'smooth' })` is cancelled
// mid-flight (measured: asked for 400px, landed at 27). Every programmatic
// smooth scroll on the site goes through here instead.

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smoothly scroll to a Y offset or an element. `offset` is added to the target (e.g. -80 for the sticky header). */
export function smoothScrollTo(target: number | Element, { offset = 0, block = 'start' }: { offset?: number; block?: 'start' | 'center' } = {}) {
  const lenis = typeof window !== 'undefined' ? window.__lenis : undefined;

  let top: number;
  if (typeof target === 'number') {
    top = target + offset;
  } else {
    const r = target.getBoundingClientRect();
    top = window.scrollY + r.top + offset - (block === 'center' ? (window.innerHeight - r.height) / 2 : 0);
  }

  if (lenis) lenis.scrollTo(top, { duration: 1.1 });
  else window.scrollTo({ top, behavior: 'smooth' });
}
