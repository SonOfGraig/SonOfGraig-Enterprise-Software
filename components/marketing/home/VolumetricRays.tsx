'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

type Ray = {
  angle: number;
  width: number;
  speed: number;
  opacity: number;
  pulseSpeed: number;
  offset: number;
};

export function VolumetricRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 40, damping: 20 });
  const rayYOffset = useTransform(smoothScrollY, [0, 800], [0, 150]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    sizeCanvas();

    const rays: Ray[] = [];
    for (let i = 0; i < 35; i++) {
      rays.push({
        angle: (Math.PI / 17.5) * i + Math.random() * 0.5,
        width: 0.1 + Math.random() * 0.4,
        speed: 0.0002 + Math.random() * 0.0006,
        opacity: 0.15 + Math.random() * 0.25,
        pulseSpeed: 0.002 + Math.random() * 0.004,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 80,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      };
    };

    const handleResize = () => sizeCanvas();

    let animationFrame = 0;

    const drawFrame = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, width, height);

      const time = Date.now();
      const centerX = width / 2 + mouseRef.current.x;
      const centerY = -height * 0.1 + mouseRef.current.y + (rayYOffset.get() as number);

      rays.forEach((ray) => {
        const currentAngle = ray.angle + Math.sin(time * ray.speed + ray.offset) * 0.35;
        const breathe = Math.sin(time * ray.pulseSpeed + ray.offset) * 0.45 + 0.55;
        const currentOpacity = ray.opacity * breathe;

        const reach = width * 3.5;
        const x1 = centerX + Math.cos(currentAngle - ray.width) * reach;
        const y1 = centerY + Math.sin(currentAngle - ray.width) * reach;
        const x2 = centerX + Math.cos(currentAngle + ray.width) * reach;
        const y2 = centerY + Math.sin(currentAngle + ray.width) * reach;

        const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 2.2);

        // Light + dark mode tuning. Light mode uses straight alpha compositing
        // (no multiply blend) so the rays read against the near-white surface.
        const baseOpacity = isDark ? currentOpacity : currentOpacity * 0.85;
        const blueHue = isDark ? '0, 163, 255' : '0, 136, 204';

        grad.addColorStop(0, `rgba(${blueHue}, ${baseOpacity})`);
        grad.addColorStop(0.3, `rgba(${blueHue}, ${baseOpacity * 0.3})`);
        grad.addColorStop(0.7, `rgba(${blueHue}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
      });
    };

    const loop = () => {
      drawFrame();
      animationFrame = requestAnimationFrame(loop);
    };

    if (reduced) {
      drawFrame();
    } else {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      loop();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rayYOffset, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 dark:mix-blend-screen transition-opacity duration-1000"
    />
  );
}
