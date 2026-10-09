'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const LiquidCoreUI: React.FC = () => {
  const [temp, setTemp] = useState(42);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 1.5 + 0.5,
      r: Math.random() * 20 + 10
    }));

    const render = () => {
      const darkActive = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = darkActive ? 'rgba(2, 4, 8, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, w, h);
      
      particles.forEach(p => {
        p.y -= p.vy;
        if (p.y < -p.r) p.y = h + p.r;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, darkActive ? 'rgba(0, 136, 204, 0.15)' : 'rgba(0, 136, 204, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#010204] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      <header className="fixed top-6 right-6 @md:top-10 @md:right-10 z-50">
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 p-8 @md:p-24 flex flex-col items-center justify-center relative z-10">
        <div className="relative size-64 @md:size-96 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 blur-xl animate-pulse" />
            <div className="size-48 @md:size-72 rounded-full border-2 border-primary/40 bg-white/60 dark:bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center gap-4 shadow-3xl">
                <MIcon name="ac_unit" className="text-6xl @md:text-8xl text-primary drop-shadow-[0_0_20px_#0088CC]" />
                <div className="text-center">
                    <h3 className="text-4xl @md:text-6xl font-black italic tabular-nums text-slate-900 dark:text-white">{temp}<span className="text-xl opacity-30">°C</span></h3>
                    <p className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.4em]">Core_Thermal</p>
                </div>
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border border-dashed border-primary/40 rounded-full"
            />
        </div>

        <div className="mt-20 grid grid-cols-2 @md:grid-cols-4 gap-4 w-full max-w-4xl">
           {['Pressure: 1.4 Bar', 'Flow: 4.2 L/m', 'Status: OK', 'Sync: 99%'].map((s, i) => (
             <div key={i} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 backdrop-blur-xl shadow-xl">
                <p className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase font-black mb-1">{s.split(': ')[0]}</p>
                <p className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">{s.split(': ')[1]}</p>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default LiquidCoreUI;
