'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const KineticShardUI: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    setRotation(x * 45);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="@container h-full w-full bg-slate-50 dark:bg-[#05060a] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700 perspective-2000"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <header className="h-20 flex items-center justify-between px-8 @md:px-12 z-20 shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
             <MIcon name="bolt" className="" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden @sm:block">Kinetic_Core</span>
        </div>
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 @md:p-24 relative z-10">
        <div className="text-center mb-20 space-y-4">
           <span className="text-primary font-mono text-[10px] font-black uppercase tracking-[0.6em] block italic">Kinetic_Engine_v1</span>
           <h2 className="text-5xl @md:text-8xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white">The <span className="text-primary">Shard</span></h2>
        </div>

        <motion.div 
            animate={{ rotateY: rotation }}
            className="relative size-64 @md:size-96 preserve-3d"
        >
            {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute inset-0 border-4 border-primary/20 rounded-[3rem] shadow-3xl bg-white/40 dark:bg-primary/5 backdrop-blur-xl transition-colors duration-700"
                  style={{ transform: `translateZ(${i * 40}px) rotate(${i * 10}deg)` }}
                />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
               <MIcon name="bolt" className="text-[10rem] text-primary drop-shadow-[0_0_30px_#0088CC] animate-pulse" />
            </div>
        </motion.div>

        <div className="mt-24 w-full max-w-xl p-8 rounded-[3rem] bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/5 backdrop-blur-xl flex justify-between items-center shadow-2xl transition-colors">
           <div>
              <p className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] mb-2 font-black">Momentum_Index</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{Math.abs(Math.round(rotation * 10))} Units</h4>
           </div>
           <div className="h-1.5 w-32 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                animate={{ width: `${Math.abs(rotation) + 30}%` }}
                className="h-full bg-primary shadow-[0_0_15px_#0088CC]"
              />
           </div>
        </div>
      </main>
    </div>
  );
};

export default KineticShardUI;
