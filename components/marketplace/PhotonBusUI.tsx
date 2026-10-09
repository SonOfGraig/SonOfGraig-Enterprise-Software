'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PhotonBusUI: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

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

    const photons = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 4 + Math.random() * 8,
      len: 20 + Math.random() * 60,
      opacity: 0.2 + Math.random() * 0.5
    }));

    const render = () => {
      const darkActive = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = darkActive ? 'rgba(2, 4, 8, 0.2)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, w, h);
      
      photons.forEach(p => {
        p.x += p.vx;
        if (p.x > w + p.len) p.x = -p.len;
        const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.len, p.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, `rgba(0, 229, 255, ${p.opacity})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.len, p.y);
        ctx.stroke();
      });
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#010204] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-60 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-black via-transparent to-slate-50 dark:to-black opacity-60" />
      
      <header className="fixed top-6 right-6 @md:top-10 @md:right-10 z-50">
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 p-12 @md:p-24 flex flex-col items-start justify-center relative z-10">
        <div className="space-y-6 max-w-2xl">
          <span className="text-primary font-mono text-[10px] font-black uppercase tracking-[0.8em] block italic">Transmission_Array_X71</span>
          <h1 className="text-5xl @md:text-9xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white drop-shadow-3xl">Photon<br/><span className="text-primary">Bus_v4</span></h1>
          <p className="text-slate-600 dark:text-white/40 text-xl @md:text-3xl font-light italic leading-relaxed">"Light-speed binary synthesis across the global node backbone."</p>
        </div>
        
        <div className="mt-16 flex gap-10">
           <div className="flex flex-col gap-1">
             <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest">Throughput</span>
             <span className="text-3xl font-black italic tracking-tighter">4.2 PB/s</span>
           </div>
           <div className="flex flex-col gap-1 text-primary">
             <span className="text-[9px] font-mono text-primary/40 uppercase tracking-widest">Efficiency</span>
             <span className="text-3xl font-black italic tracking-tighter">99.98%</span>
           </div>
        </div>
      </main>

      <div className="absolute bottom-10 right-10 flex gap-2">
         {[1,2,3,4].map(i => <div key={i} className="size-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
      </div>
    </div>
  );
};

export default PhotonBusUI;
