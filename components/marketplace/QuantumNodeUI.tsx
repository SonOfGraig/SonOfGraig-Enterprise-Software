'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const QuantumNodeUI: React.FC = () => {
  const [prob, setProb] = useState(0.5);
  const [isEntangled, setIsEntangled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProb(Math.random());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020308] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <header className="fixed top-6 right-6 @md:top-10 @md:right-10 z-50">
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 p-6 @md:p-24 flex flex-col @xl:flex-row items-center justify-center gap-16 @md:gap-24 relative z-10">
        <div className="flex-1 flex flex-col items-center gap-12 text-center @xl:text-left @xl:items-start">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <span className="px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.6em] italic">Probability_Forge_v1</span>
              <h1 className="text-6xl @md:text-9xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white">Quantum<br/><span className="text-primary">Node_X</span></h1>
              <p className="text-slate-500 dark:text-white/40 text-lg @md:text-2xl font-light italic leading-relaxed max-w-xl mx-auto @xl:mx-0">"Synthesizing outcomes through non-local superposition. Total data entropy neutralized."</p>
           </motion.div>
           <div className="flex flex-col @sm:flex-row gap-6">
              <button onClick={() => setIsEntangled(!isEntangled)} className={cn("px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.4em] transition-all shadow-xl active:scale-95", isEntangled ? "bg-red-500 text-white shadow-red-500/20" : "bg-primary text-white shadow-primary/20")}>
                {isEntangled ? 'DE-ENTANGLE' : 'ESTABLISH_LINK'}
              </button>
           </div>
        </div>

        <div className="relative size-64 @md:size-[500px] flex items-center justify-center">
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: isEntangled ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute inset-0 rounded-full border-2 border-primary/20 border-dashed"
            />
            <div className={cn(
              "size-48 @md:size-80 rounded-full border-4 transition-all duration-1000 flex items-center justify-center relative shadow-[0_0_100px_rgba(0,136,204,0.1)] overflow-hidden",
              isEntangled ? "border-primary" : "border-slate-200 dark:border-white/5 opacity-40"
            )}>
               <div className="absolute inset-0 bg-primary/5 animate-pulse" />
               <div className="relative text-center">
                  <p className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.6em] mb-2">{isEntangled ? 'STABLE_WAVE' : 'COLLAPSED'}</p>
                  <h3 className="text-5xl @md:text-7xl font-black italic tabular-nums text-slate-900 dark:text-white">{(prob * 100).toFixed(1)}<span className="text-xl opacity-20">%</span></h3>
               </div>
            </div>
        </div>
      </main>

      <footer className="h-20 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-10 shrink-0">
         <div className="flex gap-12">
            <div><p className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase mb-1">Entanglement</p><p className="text-xs font-black uppercase text-primary">{isEntangled ? 'ACTIVE' : 'IDLE'}</p></div>
            <div><p className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase mb-1">State_Logic</p><p className="text-xs font-black uppercase text-slate-900 dark:text-white">0x42-PRIME</p></div>
         </div>
         <div className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-primary cursor-pointer transition-colors">
            <MIcon name="help_outline" className="" />
         </div>
      </footer>
    </div>
  );
};

export default QuantumNodeUI;
