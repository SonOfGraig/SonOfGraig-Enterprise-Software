// Resolves once the page has loaded and the browser is idle. Canvas
// backgrounds wait on this before starting their animation loops, so they
// don't compete with hydration for the main thread (it showed up as ~1.9 s of
// blocking time on the home page in Lighthouse). After the first resolution
// it stays resolved, so client-side navigations start scenes immediately.
let idle: Promise<void> | null = null;

export function whenPageIdle(): Promise<void> {
  if (idle) return idle;
  idle = new Promise((resolve) => {
    const go = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 2500 });
      else setTimeout(resolve, 1200);
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
  });
  return idle;
}
