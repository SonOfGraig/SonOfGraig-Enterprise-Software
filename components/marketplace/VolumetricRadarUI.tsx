'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const VolumetricRadarUI: React.FC = () => {
  const [scanRotation, setScanRotation] = useState(0);
  const [targets, setTargets] = useState<{ id: number, x: number, y: number, alpha: number }[]>([]);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScanRotation(prev => (prev + 2) % 360);
      if (Math.random() > 0.95 && targets.length < 10) {
        setTargets(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, alpha: 1 }]);
      }
      setTargets(prev => prev.map(t => ({ ...t, alpha: t.alpha - 0.005 })).filter(t => t.alpha > 0));
    }, 30);
    return () => clearInterval(interval);
  }, [targets]);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#05080c] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.03)_0%,transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none" />

      <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/60 dark:bg-black/60 backdrop-blur-xl shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary animate-pulse shadow-sm">
            <MIcon name="radar" className="text-base" />
          </div>
          <h2 className="text-lg font-black italic uppercase tracking-tighter">VOLU_RADAR<span className="text-primary">.PRO</span></h2>
        </div>
        <div className="flex gap-4 @md:gap-6 items-center">
           <button 
             onClick={toggleLocalTheme}
             className="size-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all shadow-sm"
           >
             <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
           </button>
           <div className="hidden @sm:flex flex-col items-end">
             <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase font-black">Active_Pings</span>
             <span className="text-[11px] font-black text-primary">{targets.length}</span>
           </div>
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center p-6 @md:p-12 overflow-hidden">
         <div className="relative size-64 @md:size-[600px] rounded-full border border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Crosshairs */}
            <div className="absolute inset-x-0 h-px bg-slate-200 dark:bg-primary/10 top-1/2 -translate-y-1/2" />
            <div className="absolute inset-y-0 w-px bg-slate-200 dark:bg-primary/10 left-1/2 -translate-x-1/2" />
            
            {/* Concentric Rings */}
            {[0.25, 0.5, 0.75].map(s => (
              <div key={s} className="absolute rounded-full border border-slate-200 dark:border-primary/5" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
            ))}

            {/* Scanning Beam */}
            <div 
              className="absolute top-1/2 left-1/2 w-full h-[50%] bg-gradient-to-tr from-primary/20 to-transparent origin-top-left z-20 pointer-events-none" 
              style={{ transform: `rotate(${scanRotation}deg)` }}
            />

            {/* Targets */}
            {targets.map(t => (
              <div 
                key={t.id} 
                className="absolute size-3 rounded-full bg-primary shadow-[0_0_15px_#0088CC] z-10 transition-opacity" 
                style={{ left: `${t.x}%`, top: `${t.y}%`, opacity: t.alpha }}
              >
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[7px] font-mono font-black uppercase text-primary whitespace-nowrap bg-white/90 dark:bg-black/60 px-1.5 py-0.5 rounded shadow-sm border border-primary/20">TRGT_0x{t.id.toString(16).substr(-4).toUpperCase()}</div>
                 <div className="absolute inset-0 rounded-full border border-primary animate-ping" />
              </div>
            ))}

            <div className="relative z-30 flex flex-col items-center">
               <span className="text-[11px] font-black uppercase tracking-[0.8em] text-primary italic drop-shadow-md">SCANNING_CORE</span>
            </div>
         </div>
      </main>

      <footer className="p-8 border-t border-slate-200 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6 shrink-0 z-30 transition-colors">
         <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Tactical_Brief</h4>
            <p className="text-slate-500 dark:text-white/40 text-[10px] @md:text-xs font-light italic max-w-sm">"Real-time spatial reconnaissance for high-fidelity edge deployments."</p>
         </div>
         <button className="px-10 py-4 rounded-xl bg-slate-900 dark:bg-primary text-white dark:text-black font-black uppercase text-[10px] tracking-[0.4em] shadow-xl hover:brightness-110 active:scale-95 transition-all">Initialize_Strike</button>
      </footer>
    </div>
  );
};

export default VolumetricRadarUI;
