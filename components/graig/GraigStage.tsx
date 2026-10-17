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
    // The live stage starts on the visitor's first interaction (a move, touch, scroll or
    // key). Until then the hero is a still poster: the page paints and settles at once,
    // and nothing heavy runs for a visitor (or a crawler) who never touches it.
    const EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const;
    let kicked = false;
    const kick = () => {
      if (kicked) return;
      kicked = true;
      EVENTS.forEach((e) => removeEventListener(e, kick));
      void start();
    };
    EVENTS.forEach((e) => addEventListener(e, kick, { passive: true }));
    if (new URLSearchParams(location.search).has('gl')) kick(); // ?gl: start at once (captures, debugging)
    return () => {
      cancelled = true;
      EVENTS.forEach((e) => removeEventListener(e, kick));
      stage?.destroy();
    };
  }, []);
  return <canvas ref={canvasRef} className="g-canvas" aria-hidden="true" />;
}
