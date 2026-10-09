'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const DeltaSyncUI: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(true);
  const [syncPercent, setSyncPercent] = useState(98.2);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    if (!isSyncing) return;
    const interval = setInterval(() => {
      setSyncPercent(prev => Math.max(98, Math.min(99.9, prev + (Math.random() - 0.5) * 0.1)));
    }, 2000);
    return () => clearInterval(interval);
  }, [isSyncing]);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#010204] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />

      <header className="h-20 flex items-center justify-between px-8 @md:px-12 z-20 shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
            <MIcon name="sync" className="" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden @sm:block">Delta_Sync_v4</span>
        </div>
        <button
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 p-8 @md:p-24 flex flex-col items-center justify-center gap-16 relative z-10">
        <div className="relative size-64 @md:size-80 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-primary/20 border-dashed rounded-[3rem]"
          />
          <div className="size-48 @md:size-64 rounded-[2.5rem] bg-white dark:bg-black border-2 border-primary flex flex-col items-center justify-center gap-6 shadow-3xl overflow-hidden relative transition-colors duration-700">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <MIcon name="sync" className="text-6xl text-primary drop-shadow-[0_0_20px_#0088CC]" />
            <div className="text-center space-y-1">
              <h3 className="text-4xl font-black italic tabular-nums tracking-tighter text-slate-900 dark:text-white">{syncPercent.toFixed(1)}%</h3>
              <p className="text-[9px] font-mono text-primary font-black uppercase tracking-[0.4em]">Sync_Fidelity</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl grid grid-cols-1 @md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-2xl flex flex-col gap-6">
            <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Peer_Nodes</h4>
            <div className="space-y-3">
              {['Node_Alpha', 'Node_Beta', 'Node_Gama'].map(n => (
                <div key={n} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 dark:text-white/60">{n}</span>
                  <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Delta_Logs</h4>
              <p className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase italic leading-relaxed">"{'>'} Incoming state diff_0x42F... OK" <br /> "{'>'} Validating cryptographic chain... OK"</p>
            </div>
            <button onClick={() => setIsSyncing(!isSyncing)} className={cn("w-full py-4 rounded-2xl font-black uppercase text-[9px] tracking-widest transition-all shadow-xl active:scale-95", isSyncing ? "bg-primary text-white" : "bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-white/20")}>
              {isSyncing ? 'HALT_SYNC' : 'RESUME_SYNC'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeltaSyncUI;
