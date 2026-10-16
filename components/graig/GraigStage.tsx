'use client';

import { useEffect, useRef } from 'react';

// Mounts Graig's stage: one fixed WebGL canvas behind the whole page (see
// components/graig/stage/engine.js). three.js and the scenes load after first paint;
// until then — and without WebGL — every section shows its own colour from CSS.

const loaders = {
  hero: () => import('./stage/scenes/hero'),
  merge: () => import('./stage/scenes/merge'),
  work: () => import('./stage/scenes/work'),
  chain: () => import('./stage/scenes/chain'),
  vault: () => import('./stage/scenes/vault'),
  mark: () => import('./stage/scenes/mark'),
};

export function GraigStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const root = canvas?.closest('.g-page') as HTMLElement | null;
    if (!canvas || !root) return;
    let stage: { destroy: () => void } | null = null;
    let cancelled = false;
    const start = () =>
      import('./stage/engine').then(({ startStage }) => {
        if (!cancelled) stage = startStage({ canvas, root, loaders });
      });
    // after first paint, when the main thread is free
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const id = ric ? ric(start, { timeout: 1200 }) : window.setTimeout(start, 200);
    return () => {
      cancelled = true;
      if (!ric) window.clearTimeout(id);
      stage?.destroy();
    };
  }, []);
  return <canvas ref={canvasRef} className="g-canvas" aria-hidden="true" />;
}
