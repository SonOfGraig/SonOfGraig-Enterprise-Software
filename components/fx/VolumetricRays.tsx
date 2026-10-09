'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

// Ported from the 2026 agency site (VolumetricRays.tsx). Differences:
// - sized to its parent section, not the window
// - colour comes from the --rays-rgb token, so it follows data-theme
// - pauses when off-screen or the tab is hidden; DPR capped for old laptops
// - prefers-reduced-motion draws one still frame and stops

type Ray = { angle: number; width: number; speed: number; opacity: number; pulse: number; offset: number };

export function VolumetricRays({ count = 28, className = '' }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const rays: Ray[] = Array.from({ length: count }, (_, i) => ({
      angle: (Math.PI / (count / 2)) * i + Math.random() * 0.5,
      width: 0.08 + Math.random() * 0.32,
      speed: 0.0002 + Math.random() * 0.0005,
      opacity: 0.12 + Math.random() * 0.22,
      pulse: 0.0015 + Math.random() * 0.003,
      offset: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      if (!width || !height) return; // zero-size during layout → NaN gradients
      const rgb = getComputedStyle(document.documentElement).getPropertyValue('--rays-rgb').trim() || '11, 120, 222';
      const dark = document.documentElement.dataset.theme === 'dark';
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2 + mouse.x;
      const cy = -height * 0.12 + mouse.y;
      const reach = Math.max(width, height) * 3;

      for (const ray of rays) {
        const a = ray.angle + Math.sin(time * ray.speed + ray.offset) * 0.3;
        const breathe = Math.sin(time * ray.pulse + ray.offset) * 0.45 + 0.55;
        const alpha = ray.opacity * breathe * (dark ? 1 : 0.55);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 1.6);
        grad.addColorStop(0, `rgba(${rgb}, ${alpha})`);
        grad.addColorStop(0.35, `rgba(${rgb}, ${alpha * 0.28})`);
        grad.addColorStop(0.75, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a - ray.width) * reach, cy + Math.sin(a - ray.width) * reach);
        ctx.lineTo(cx + Math.cos(a + ray.width) * reach, cy + Math.sin(a + ray.width) * reach);
        ctx.closePath();
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!reduced && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      if (!r.width || !r.height) return;
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 80;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 30;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });

    resize();
    draw(0);
    io.observe(parent);
    ro.observe(parent);
    document.addEventListener('visibilitychange', start);
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', start);
      window.removeEventListener('pointermove', onMove);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'var(--rays-blend)' as CSSProperties['mixBlendMode'] }}
    />
  );
}
