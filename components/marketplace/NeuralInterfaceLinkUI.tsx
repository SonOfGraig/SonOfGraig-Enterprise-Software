'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Sub-component: Neural Waveform Visualizer ---
const NeuralWaveform: React.FC<{ active: boolean; intensity: number }> = ({ active, intensity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let frame = 0;

    const render = () => {
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.clearRect(0, 0, width, height);
      
      const lines = 4;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = i === 0 ? 3 : 1;
        const alpha = (1 - i / lines) * (active ? 0.8 : 0.2);
        ctx.strokeStyle = isDark ? `rgba(0, 136, 204, ${alpha})` : `rgba(0, 136, 204, ${alpha * 0.8})`;
        
        const yBase = height / 2;
        const amplitude = (20 + i * 10) * intensity;
        const freq = 0.01 + i * 0.005;

        for (let x = 0; x <= width; x += 5) {
          const y = yBase + Math.sin(x * freq + frame * 0.05 + i) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      frame++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
    };
  }, [active, intensity]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

// --- Main Template Component ---
const NeuralInterfaceLinkUI: React.FC = () => {
  const [isSynced, setIsSynced] = useState(false);
  const [load, setLoad] = useState(42);
  const [telemetry, setTelemetry] = useState<string[]>([]);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSynced) {
        const hex = Math.random().toString(16).substr(2, 6).toUpperCase();
        setTelemetry(prev => [...prev.slice(-12), `[SYNC_OK] ADDR_0x${hex} // STABILITY: 99.${Math.floor(Math.random()*9)}%`]);
        setLoad(prev => Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 5)));
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isSynced]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [telemetry]);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden transition-colors duration-700">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* OS Header */}
      <header className="h-20 @md:h-24 border-b border-slate-200 dark:border-white/5 bg-white/60 dark:bg-black/40 backdrop-blur-2xl flex items-center justify-between px-8 @md:px-12 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="size-10 @md:size-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-[0_0_25px_rgba(0,136,204,0.2)]">
            <MIcon name="psychology" className="text-2xl @md:text-3xl" />
          </div>
          <div>
            <h1 className="text-sm @md:text-xl font-black italic tracking-tighter uppercase leading-none">Neural_Link<span className="text-primary">.v4</span></h1>
            <p className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.5em] font-black mt-1">Direct_Interface_Established</p>
          </div>
        </div>
        <div className="flex items-center gap-4 @md:gap-8">
           <button 
            onClick={toggleLocalTheme}
            className="size-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all"
           >
              <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="text-lg" />
           </button>
           <div className="hidden @sm:flex flex-col items-end">
             <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase font-black">Sync_Fidelity</span>
             <span className={cn("text-[11px] font-black italic", isSynced ? "text-primary" : "text-slate-300 dark:text-white/10")}>{isSynced ? '98.4%' : 'N/A'}</span>
           </div>
           <button 
            onClick={() => setIsSynced(!isSynced)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95",
              isSynced ? "bg-red-500 text-white shadow-red-500/20" : "bg-primary text-white shadow-primary/20"
            )}
           >
             {isSynced ? 'Terminate' : 'Initialize'}
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col @xl:flex-row p-6 @md:p-10 gap-6 @md:gap-10 overflow-hidden relative z-10">
         
         {/* Left Side: Waveform & Telemetry */}
         <div className="flex-1 flex flex-col gap-6 @md:gap-8">
            <div className="h-48 @md:h-64 glass-panel rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-black/40 p-8 @md:p-10 relative overflow-hidden shadow-2xl">
               <div className="absolute top-6 left-8 flex items-center gap-3">
                  <div className={cn("size-2 rounded-full", isSynced ? "bg-primary animate-pulse" : "bg-slate-200 dark:bg-white/10")} />
                  <span className="text-[10px] font-black uppercase text-slate-400 dark:text-white/30 tracking-widest italic">Live_Synaptic_Stream</span>
               </div>
               <div className="absolute inset-0 pt-10">
                  <NeuralWaveform active={isSynced} intensity={isSynced ? 1 : 0.2} />
               </div>
               <div className="absolute bottom-6 right-8 text-[9px] font-mono text-primary font-black uppercase tracking-widest">Frequency: 420Hz</div>
            </div>

            <div className="flex-1 glass-panel rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-black/40 p-8 @md:p-10 flex flex-col shadow-2xl relative">
                <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none opacity-20" />
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 mb-8 pb-4 border-b border-slate-100 dark:border-white/5">Subroutine_Logs</h3>
                <div ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-hide text-slate-500 dark:text-white/40">
                  {!isSynced && <div className="italic opacity-50 py-10 text-center uppercase tracking-widest">Awaiting_Neural_Sync...</div>}
                  {telemetry.map((log, i) => (
                    <div key={i} className="flex gap-4 group animate-fade-in-up">
                       <span className="text-primary opacity-40">{'>'}</span>
                       <span className="group-hover:text-primary transition-colors">{log}</span>
                    </div>
                  ))}
                </div>
            </div>
         </div>

         {/* Right Side: Visual Core & Metrics */}
         <div className="flex-1 @xl:max-w-md flex flex-col gap-6 @md:gap-8">
            <div className="aspect-square rounded-[3.5rem] @md:rounded-[4rem] border-4 border-slate-100 dark:border-white/5 bg-white dark:bg-[#050810] shadow-3xl relative overflow-hidden flex flex-col items-center justify-center group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.1),transparent_70%)] animate-pulse" />
               
               {/* Orbital Visuals */}
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute size-64 @md:size-80 rounded-full border border-primary/20 border-dashed"
               />
               <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute size-48 @md:size-56 rounded-full border-2 border-primary/10"
               />

               <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className={cn(
                    "size-24 @md:size-32 rounded-[2.5rem] flex items-center justify-center transition-all duration-1000",
                    isSynced ? "bg-primary text-white shadow-[0_0_60px_rgba(0,136,204,0.4)] rotate-45" : "bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-white/10"
                  )}>
                     <MIcon name={isSynced ? 'all_inclusive' : 'cloud_off'} className={cn("text-5xl @md:text-6xl transition-all duration-700", isSynced ? "-rotate-45" : "")} />
                  </div>
                  <div className="text-center space-y-1">
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Neural_Core</h3>
                     <p className="text-[10px] font-mono text-primary font-black uppercase tracking-widest animate-pulse">{isSynced ? 'BROADCAST_ACTIVE' : 'STANDBY'}</p>
                  </div>
               </div>
            </div>

            <div className="glass-panel p-8 @md:p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-2xl">
               <div className="space-y-8">
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                        <span>Cognitive_Load</span>
                        <span className="text-primary italic font-mono">{Math.floor(load)}%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          animate={{ width: `${load}%` }} 
                          className={cn("h-full transition-colors duration-500", load > 80 ? 'bg-accent' : 'bg-primary')} 
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-1">
                        <span className="text-[8px] font-mono text-slate-400 uppercase font-black">Buffer_Stall</span>
                        <span className="text-xl font-black italic text-slate-900 dark:text-white">0.02ms</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-1">
                        <span className="text-[8px] font-mono text-slate-400 uppercase font-black">Lattice_Sync</span>
                        <span className="text-xl font-black italic text-green-500">STABLE</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* Footer System Status */}
      <footer className="h-14 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-10 shrink-0 z-20">
         <div className="flex gap-8">
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase font-black">Sector:</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-white/70">Neo-Tokyo_Grid_7</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase font-black">Status:</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Verified_Identity</span>
            </div>
         </div>
         <div className="flex gap-2">
            {[1,2,3,4,5].map(i => <div key={i} className={cn("size-1 rounded-full", isSynced && i <= 3 ? "bg-primary" : "bg-slate-200 dark:bg-white/10")} />)}
         </div>
      </footer>
    </div>
  );
};

export default NeuralInterfaceLinkUI;
