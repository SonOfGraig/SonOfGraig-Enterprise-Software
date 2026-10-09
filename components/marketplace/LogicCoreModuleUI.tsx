'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const LogicCoreModuleUI: React.FC = () => {
  const [load, setLoad] = useState(45);
  const [instructions, setInstructions] = useState(['INIT', 'SCAN', 'FETCH', 'SYNC']);
  const [activeStep, setActiveStep] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => Math.max(10, Math.min(98, prev + (Math.random() - 0.5) * 10)));
      setActiveStep(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#05060a] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Top OS Bar */}
      <header className="h-14 border-b border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-30">
        <div className="flex gap-1.5"><div className="size-2.5 rounded-full bg-red-500/40"/><div className="size-2.5 rounded-full bg-yellow-500/40"/><div className="size-2.5 rounded-full bg-green-500/40"/></div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">LOGIC_PIPE_X71</span>
          <button 
            onClick={toggleLocalTheme}
            className="size-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10"
          >
            <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="text-base" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col @lg:flex-row p-6 @md:p-12 gap-8 @md:gap-10 overflow-y-auto">
        {/* Core Visualization */}
        <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
           <div className="relative size-64 @md:size-80 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-[3rem] border-2 border-primary/20 border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5"
              />
              <div className="relative z-10 size-48 @md:size-56 rounded-[2.5rem] bg-white dark:bg-black border-2 border-primary/40 flex flex-col items-center justify-center gap-4 shadow-3xl overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                 <MIcon name="memory" className="text-6xl text-primary drop-shadow-[0_0_20px_#0088CC]" />
                 <div className="text-center">
                    <p className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.4em]">CORE_STATUS</p>
                    <p className="text-2xl font-black italic text-slate-900 dark:text-white">NOMINAL</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Command Interface */}
        <div className="w-full @lg:w-96 flex flex-col gap-8 shrink-0">
           <div className="glass-panel p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] space-y-10 flex-1 flex flex-col shadow-2xl">
              <div className="flex-1 overflow-hidden">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/20 mb-6 block italic">Instruction_Pipe</span>
                 <div className="space-y-3">
                    {instructions.map((inst, i) => (
                      <div key={inst} className={cn(
                        "p-4 rounded-xl border transition-all duration-500 flex items-center justify-between group",
                        activeStep === i ? "bg-primary border-primary shadow-lg shadow-primary/20 text-white" : "border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/40 opacity-40"
                      )}>
                         <span className="text-xs font-mono font-black italic">{inst}::0x{i}F4A</span>
                         {activeStep === i && <MIcon name="sync" className="text-sm animate-spin" />}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="mt-auto space-y-6">
                 <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 dark:text-white/30 tracking-widest">
                    <span>Processing_Load</span>
                    <span className="text-primary font-mono">{Math.floor(load)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <motion.div animate={{ width: `${load}%` }} transition={{ type: 'spring' }} className="h-full bg-primary shadow-[0_0_10px_#0088CC]" />
                 </div>
              </div>
           </div>

           <button className="h-20 rounded-3xl bg-primary text-white dark:text-black font-black uppercase text-xs tracking-[0.5em] shadow-xl hover:brightness-110 active:scale-95 transition-all">Execute_Prime_Module</button>
        </div>
      </main>

      <footer className="h-12 border-t border-slate-200 dark:border-white/5 bg-white/60 dark:bg-black/60 backdrop-blur-xl flex items-center justify-between px-10 shrink-0 opacity-40">
         <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500 dark:text-white/40">Logic_ID: 0x42-SYNTH-X71</span>
         <div className="flex gap-4 text-[8px] font-mono uppercase text-slate-500 dark:text-white/40">
            <span>Voltage: 1.2v</span>
            <span>Temp: 42C</span>
         </div>
      </footer>
    </div>
  );
};

export default LogicCoreModuleUI;
