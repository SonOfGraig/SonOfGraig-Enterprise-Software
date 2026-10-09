'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const FluxBridgeUI: React.FC = () => {
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

    const render = () => {
      const isDarkActive = document.documentElement.dataset.theme === 'dark';
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = isDarkActive ? 'lighter' : 'multiply';
      
      const count = 3;
      for (let i = 0; i < count; i++) {
        const angle = time + (i / count) * Math.PI * 2;
        const x = w/2 + Math.cos(angle) * (w/4);
        const y = h/2 + Math.sin(angle) * (h/4);
        
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 200);
        const alpha = isDarkActive ? 0.3 : 0.15;
        grad.addColorStop(0, i === 0 ? `rgba(0, 136, 204, ${alpha})` : i === 1 ? `rgba(0, 229, 255, ${alpha})` : `rgba(255, 98, 1, ${alpha})`);
        grad.addColorStop(1, 'transparent');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 200, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020205] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      <header className="h-20 flex items-center justify-between px-8 @md:px-12 z-20 shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-slate-900 dark:bg-primary flex items-center justify-center text-white shadow-lg">
             <MIcon name="waves" className="" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden @sm:block text-slate-500 dark:text-white/40">Flux_Node_v4</span>
        </div>
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 p-8 @md:p-24 flex flex-col items-center justify-center relative z-10 text-center gap-12">
        <div className="space-y-6">
           <span className="text-primary font-mono text-[10px] font-black uppercase tracking-[1em] block italic">Subroutine_0x42_FLUX</span>
           <h2 className="text-5xl @md:text-[9rem] font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white drop-shadow-3xl">Flux<br/><span className="text-primary">Bridge</span></h2>
           <p className="text-slate-500 dark:text-white/40 text-lg @md:text-2xl font-light italic max-w-2xl mx-auto">"Harmonizing abstract energy flows into hardened architectural logic."</p>
        </div>

        <div className="flex gap-16 md:gap-24">
           <div className="text-center">
              <p className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] mb-4 font-black">Input_Flux</p>
              <h4 className="text-4xl @md:text-6xl font-black italic text-primary">1.21 GW</h4>
           </div>
           <div className="text-center">
              <p className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] mb-4 font-black">Synthesis_Rate</p>
              <h4 className="text-4xl @md:text-6xl font-black italic text-slate-900 dark:text-white">100%</h4>
           </div>
        </div>

        <button className="px-16 py-6 rounded-3xl bg-slate-900 dark:bg-primary text-white dark:text-black font-black uppercase text-xs tracking-[0.5em] shadow-[0_20px_50px_rgba(0,136,204,0.4)] hover:scale-105 active:scale-95 transition-all">Establish_Bridge</button>
      </main>
    </div>
  );
};

export default FluxBridgeUI;
