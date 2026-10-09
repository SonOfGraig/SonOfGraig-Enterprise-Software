'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const BinaryLogLine: React.FC<{ text: string }> = ({ text }) => (
  <motion.div 
    initial={{ opacity: 0, x: -5 }} 
    animate={{ opacity: 1, x: 0 }} 
    className="flex gap-4 py-0.5 group/line"
  >
    <span className="text-primary/30 group-hover/line:text-primary/60 transition-colors shrink-0 font-mono">[KEY_GEN]</span>
    <span className="truncate">{text}</span>
    <span className="text-primary/40 ml-auto font-black italic font-mono">OK</span>
  </motion.div>
);

const DataEncryptionShardUI: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [hardening, setHardening] = useState(99.8);
  const [logs, setLogs] = useState<string[]>([]);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Generate real-time cryptographic telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.random().toString(16).substr(2, 12).toUpperCase();
      const addr = Math.random().toString(16).substr(2, 4).toUpperCase();
      setLogs(prev => [...prev.slice(-25), `SHA-256: ${hex} // NODE_0x${addr}`]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#010204] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative selection:bg-primary/40 transition-colors duration-500">
      
      {/* ATMOSPHERIC TECH GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      </div>

      {/* TOP HEADER HUD */}
      <header className="h-16 @md:h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 @md:px-8 bg-white/40 dark:bg-black/40 backdrop-blur-xl shrink-0 z-30 transition-colors">
        <div className="flex items-center gap-4 @md:gap-5">
          <div className="size-8 @md:size-10 rounded-xl border border-primary/40 bg-primary/5 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(0,136,204,0.2)]">
            <MIcon name="enhanced_encryption" className="text-xl @md:text-2xl" />
          </div>
          <div className="leading-tight">
            <h1 className="text-xs @md:text-sm font-black uppercase tracking-widest italic">SHARD_CRYPT_V4.2</h1>
            <p className="text-[7px] @md:text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] font-black">AES_256_QUANTUM_READY</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 @md:gap-8">
           <button 
             onClick={toggleLocalTheme}
             className="size-9 @md:size-11 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all shadow-sm"
           >
             <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
           </button>
           <div className="text-right hidden @sm:block">
             <span className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase font-black tracking-widest">ENTROPY_POOL</span>
             <span className="text-primary font-mono text-xs font-black block">0x625A1344</span>
           </div>
           <button 
             onClick={() => setIsLocked(!isLocked)}
             className={cn(
               "h-8 @md:h-10 px-4 @md:px-8 rounded-xl font-black text-[8px] @md:text-[9px] uppercase tracking-widest transition-all shadow-xl active:scale-95 whitespace-nowrap",
               isLocked ? "bg-red-600 text-white shadow-red-600/20" : "bg-primary text-white shadow-primary/20"
             )}
           >
             {isLocked ? 'VAULT_LOCKED' : 'ACCESS_LIVE'}
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col @xl:flex-row p-4 @md:p-8 @xl:p-10 gap-6 @md:gap-8 overflow-hidden z-10 relative">
        
        {/* CENTRAL VISUALIZER */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] @md:min-h-[400px]">
           <div className="relative size-64 @md:size-[400px] @xl:size-[500px] flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-[3rem] @md:rounded-[4rem] border border-slate-200 dark:border-primary/20 border-dashed transition-colors"
              />
              
              <motion.div 
                animate={{ 
                  rotateY: isLocked ? 15 : 0, 
                  rotateX: isLocked ? 10 : 0 
                }}
                className={cn(
                  "relative aspect-square w-[80%] @md:w-[70%] max-w-[320px] rounded-[2.5rem] @md:rounded-[3.5rem] border-4 transition-all duration-1000 flex flex-col items-center justify-center gap-4 @md:gap-6 shadow-3xl overflow-hidden group",
                  isLocked 
                    ? "border-slate-300/40 dark:border-white/10 bg-white/40 dark:bg-white/5 opacity-40 grayscale" 
                    : "border-primary bg-white/80 dark:bg-[#050810]/60 shadow-[0_0_100px_rgba(0,136,204,0.15)]"
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.1),transparent_70%)] animate-pulse" />
                
                {!isLocked && (
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 h-px bg-primary/40 shadow-[0_0_15px_#0088CC] z-10"
                  />
                )}

                <motion.span 
                  animate={isLocked ? { scale: 1 } : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={cn(
                    "msym text-[5rem] @md:text-[8rem] transition-colors duration-1000 z-20",
                    isLocked ? "text-slate-300 dark:text-white/10" : "text-primary drop-shadow-[0_0_30px_rgba(0,136,204,0.6)]"
                  )}
                >
                  <MIcon name={isLocked ? 'lock' : 'lock_open'} className="text-[1em]" />
                </motion.span>
                
                <div className="relative z-20 text-center">
                  <p className="text-[9px] @md:text-[10px] font-mono text-primary font-black uppercase tracking-[0.4em] opacity-60">Status</p>
                  <p className="text-lg @md:text-xl font-black italic tracking-tighter uppercase">{isLocked ? 'Encrypted' : 'Synthesized'}</p>
                </div>
              </motion.div>
           </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full @xl:w-[380px] flex flex-col gap-6 shrink-0 h-auto @xl:h-full pb-8 @xl:pb-0">
           <div className="h-[300px] @xl:flex-1 glass-panel p-6 @md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#050810]/80 flex flex-col shadow-2xl relative overflow-hidden transition-colors">
              <div className="absolute top-0 left-0 w-1 h-12 bg-primary shadow-[0_0_15px_#0088CC]" />
              
              <div className="flex justify-between items-center mb-6 @md:mb-8 pb-4 border-b border-slate-100 dark:border-white/5">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/40">BINARY_MANIFEST</h3>
                <MIcon name="more_horiz" className="text-slate-300 dark:text-white/10 text-lg" />
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-[9px] text-primary/60 space-y-1.5 scrollbar-hide pr-2">
                {!isLocked ? logs.map((log, i) => (
                  <BinaryLogLine key={i} text={log} />
                )) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-center italic opacity-20 uppercase tracking-[0.2em] max-w-[140px] text-[10px]">Awaiting Decryption Sequence...</p>
                  </div>
                )}
              </div>
           </div>

           <div className="p-6 @md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/40 shadow-xl space-y-6 @md:space-y-8 transition-colors">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <p className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase font-black tracking-widest">HARDENING_INDEX</p>
                   <h4 className="text-xl @md:text-2xl font-black italic tabular-nums text-slate-900 dark:text-white">{hardening}%</h4>
                </div>
                <span className="text-[9px] font-black text-primary uppercase italic">OPTIMAL</span>
              </div>
              
              <div className="relative group">
                <input 
                  type="range" 
                  min="0" max="100" step="0.1"
                  value={hardening}
                  onChange={(e) => setHardening(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex justify-between items-center">
                 <button className="size-10 @md:size-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-primary transition-all">
                    <MIcon name="desktop_windows" className="text-lg @md:text-xl" />
                 </button>
                 <button className="size-10 @md:size-11 rounded-xl bg-primary border border-primary flex items-center justify-center text-white dark:text-black shadow-[0_0_20px_rgba(0,136,204,0.4)]">
                    <MIcon name="smartphone" className="text-lg @md:text-xl" />
                 </button>
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
};

export default DataEncryptionShardUI;
