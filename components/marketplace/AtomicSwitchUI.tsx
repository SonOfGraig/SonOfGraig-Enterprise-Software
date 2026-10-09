'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const AtomicSwitchUI: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#05060a] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-500">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-60" />
      
      <header className="h-20 flex items-center justify-between px-8 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-slate-900 dark:bg-primary flex items-center justify-center text-white shadow-lg">
             <MIcon name="account_tree" className="text-xl" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden @sm:block">Logic_Gate_v1</span>
        </div>
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 @md:p-24 gap-12 relative z-10">
        <div className="text-center space-y-4">
           <span className="text-primary font-mono text-[10px] font-black uppercase tracking-[0.6em] block italic">Binary_Logical_Gate_v1</span>
           <h2 className="text-4xl @md:text-8xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white">Atomic<br/><span className="text-primary">Switch</span></h2>
        </div>

        <button 
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "relative w-48 h-72 md:w-64 md:h-96 rounded-[5rem] border-8 transition-all duration-700 shadow-3xl p-4 flex flex-col items-center justify-between group",
            isActive 
              ? "border-primary bg-primary/10 shadow-[0_0_80px_rgba(0,136,204,0.2)]" 
              : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/5"
          )}
        >
            <motion.div 
              animate={{ y: isActive ? 0 : 200 }}
              transition={{ type: 'spring', damping: 12, stiffness: 80 }}
              className={cn(
                "size-40 md:size-52 rounded-full border-4 transition-all duration-500 flex items-center justify-center relative shadow-2xl",
                isActive ? "bg-primary border-white" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10"
              )}
            >
               <MIcon name="bolt" className={cn("text-5xl md:text-8xl transition-all", isActive ? "text-white" : "text-slate-200 dark:text-white/10")} />
               {isActive && (
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 rounded-full bg-white/20"
                 />
               )}
            </motion.div>

            <div className="pb-10">
               <span className={cn("text-[10px] md:text-xs font-black uppercase tracking-[0.5em] transition-colors", isActive ? "text-primary animate-pulse" : "text-slate-400 dark:text-white/20")}>
                 {isActive ? 'STATE: ACTIVE' : 'STATE: IDLE'}
               </span>
            </div>
        </button>

        <div className="flex gap-4 opacity-40">
           {['TRUE', 'FALSE', 'NULL'].map(val => (
             <div key={val} className="px-6 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[8px] font-mono font-black uppercase tracking-widest text-slate-500 dark:text-white/60">{val}</div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default AtomicSwitchUI;
