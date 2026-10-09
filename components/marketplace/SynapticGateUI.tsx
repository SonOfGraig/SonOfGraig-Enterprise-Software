'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const SynapticGateUI: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'granted'>('idle');
  const [authProgress, setAuthProgress] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const startAuth = () => {
    setStatus('scanning');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setAuthProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('granted');
      }
    }, 50);
  };

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020308] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.06)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      <header className="fixed top-6 right-6 @md:top-10 @md:right-10 z-50">
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 @md:p-12 gap-12 relative z-10">
        <div className="text-center space-y-4">
            <span className="text-primary font-mono text-[9px] font-black uppercase tracking-[0.6em] italic">Mesh_Access_Protocol_v4</span>
            <h2 className="text-4xl @md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Synaptic<br/><span className="text-primary">Gate_01</span></h2>
        </div>

        <div className="relative size-64 @md:size-96 flex items-center justify-center">
            <div className={cn(
              "size-full rounded-[4rem] border-4 transition-all duration-1000 relative flex items-center justify-center",
              status === 'granted' ? "border-primary bg-primary/10 shadow-[0_0_80px_rgba(0,136,204,0.2)]" : "border-slate-200 dark:border-white/5 bg-white dark:bg-white/5"
            )}>
               <AnimatePresence mode="wait">
                 <motion.span 
                   key={status}
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className={cn("msym text-8xl md:text-9xl transition-colors duration-1000", status === 'granted' ? 'text-primary' : 'text-slate-300 dark:text-white/20')}
                 >
                   <MIcon name={status === 'granted' ? 'vpn_lock' : 'sensor_door'} className="text-[1em]" />
                 </motion.span>
               </AnimatePresence>
               
               {status === 'scanning' && (
                 <svg className="absolute inset-[-10px] size-[calc(100%+20px)] -rotate-90">
                    <motion.circle 
                      cx="50%" cy="50%" r="48%" 
                      fill="none" 
                      stroke="#0088CC" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: authProgress / 100 }}
                    />
                 </svg>
               )}
            </div>
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-40px] border border-dashed border-primary/20 rounded-full"
            />
        </div>

        <div className="w-full max-w-md space-y-6">
           {status === 'idle' ? (
             <button onClick={startAuth} className="w-full h-20 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-[0.5em] transition-all hover:bg-primary/10 shadow-xl">Initiate_Handshake</button>
           ) : (
             <div className="p-6 rounded-3xl bg-white/80 dark:bg-black/60 border border-slate-200 dark:border-white/5 backdrop-blur-xl space-y-4 shadow-xl">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">
                  <span>Cryptographic_Sync</span>
                  <span className="text-primary">{status === 'granted' ? 'SUCCESS' : `${authProgress}%`}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                   <motion.div animate={{ width: `${authProgress}%` }} className="h-full bg-primary shadow-[0_0_10px_#0088CC]" />
                </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default SynapticGateUI;
