'use client';

import { useEffect, useRef } from 'react';
import { whenPageIdle } from '@/lib/idle';

// One engine for every canvas background ported from the 2026 agency site.
// The originals each re-implemented sizing and the RAF loop, sized to the
// window instead of their section, ran forever off-screen, ignored DPR and
// reduced motion, and sniffed a `.dark` class. Here a scene only draws:
//
//   const scene: Scene<State> = {
//     init: (ctx) => state,            // build particles once per size
//     frame: (ctx, state, t) => {...}, // draw one frame
//   };
//
// The engine sizes the canvas to its parent, caps DPR, pauses when the
// section is off-screen or the tab is hidden, draws a single still frame for
// prefers-reduced-motion, and hands every frame the theme (brand RGB + dark).

export type SceneContext = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  /** Brand blue as "r, g, b" from the --rays-rgb token (follows the theme). */
  rgb: string;
  dark: boolean;
  /** Pointer position relative to the canvas centre, -1…1, smoothed. */
  pointer: { x: number; y: number; inside: boolean };
  /** Page scroll velocity in px/frame, smoothed (for scroll-reactive scenes). */
  scrollVelocity: number;
};

export type Scene<S> = {
  init: (c: SceneContext) => S;
  frame: (c: SceneContext, state: S, time: number) => void;
};

export function useCanvasScene<S>(scene: Scene<S>, { maxDpr = 1.5 }: { maxDpr?: number } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const root = document.documentElement;
    // inside: the pointer is over this canvas (scenes that react only to a
    // nearby cursor use it, so a resting pointer at 0,0 lights nothing).
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false };
    let velocity = 0;
    let lastScroll = window.scrollY;
    let frame = 0;
    let visible = false;
    let ready = false; // loops wait for page idle; still frames don't
    let state: S;
    // Theme colours are read on mount and on theme change — never per frame
    // (getComputedStyle every frame forced a style recalc in every scene).
    let rgb = '11, 120, 222';
    let dark = false;
    const readTheme = () => {
      rgb = getComputedStyle(canvas).getPropertyValue('--rays-rgb').trim() || '11, 120, 222';
      dark = (canvas.closest('[data-theme]') as HTMLElement | null)?.dataset.theme === 'dark';
    };

    // Theme comes from the nearest [data-theme] ancestor, so a section can
    // force a theme locally (e.g. an always-dark CTA band).
    const context = (): SceneContext => ({
      ctx,
      width: canvas.width / dpr,
      height: canvas.height / dpr,
      rgb,
      dark,
      pointer,
      scrollVelocity: velocity,
    });

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state = scene.init(context());
      if (reduced || !visible) scene.frame(context(), state, 0);
    };

    const loop = (t: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const y = window.scrollY;
      velocity += (y - lastScroll - velocity) * 0.1;
      lastScroll = y;
      if (canvas.width > 1 && canvas.height > 1) scene.frame(context(), state, t);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (ready && !reduced && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return; // avoid NaN pointer → non-finite gradients
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      pointer.inside = Math.abs(pointer.tx) <= 1 && Math.abs(pointer.ty) <= 1;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(resize);
    // Theme switches repaint a still frame even when paused.
    const mo = new MutationObserver(() => {
      readTheme();
      if (reduced || !frame) scene.frame(context(), state, performance.now());
    });

    readTheme();
    resize();
    io.observe(parent);
    ro.observe(parent);
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('visibilitychange', start);
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });
    let cancelled = false;
    whenPageIdle().then(() => {
      if (cancelled) return;
      ready = true;
      start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', start);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [scene, maxDpr]);

  return ref;
}
