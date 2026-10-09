'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NeuralTracerUI: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const STEPS = ['Ingesting_Data', 'Mapping_Intent', 'Tracing_Logic', 'Executing_Synthetics'];

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

    interface Node { x: number; y: number; active: boolean; }
    const nodes: Node[] = Array.from({ length: 50 }).map(() => ({ x: Math.random() * w, y: Math.random() * h, active: false }));

    const render = () => {
      const darkActive = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = darkActive ? 'rgba(2, 4, 8, 0.15)' : 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = darkActive ? 'rgba(0, 136, 204, 0.2)' : 'rgba(0, 136, 204, 0.08)';
      ctx.lineWidth = 1;

      nodes.forEach((n, i) => {
        if (i > 0) {
           const prev = nodes[i-1];
           ctx.beginPath();
           ctx.moveTo(prev.x, prev.y);
           ctx.lineTo(n.x, n.y);
           ctx.stroke();
        }
        ctx.fillStyle = i < (nodes.length * (activeStep + 1) / 4) ? '#0088CC' : (darkActive ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)');
        ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(render);
    };
    render();
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <header className="h-20 border-b border-slate-200 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-sm">
            <MIcon name="route" className="text-2xl" />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest italic text-slate-400 dark:text-white/40">Neural_Tracer.v4</h2>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
           <button 
            onClick={toggleLocalTheme}
            className="size-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all"
           >
              <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="text-lg" />
           </button>
           <div className="flex gap-2">
             {STEPS.map((_, i) => <div key={i} className={cn("size-2 rounded-full transition-all duration-500", i <= activeStep ? 'bg-primary shadow-[0_0_10px_#0088CC]' : 'bg-slate-200 dark:bg-white/10')} />)}
           </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden flex flex-col p-8 @md:p-24 justify-center items-center gap-16">
        <div className="absolute inset-0 z-0">
           <canvas ref={canvasRef} className="w-full h-full opacity-60" />
        </div>

        <div className="relative z-10 text-center space-y-6">
           <AnimatePresence mode="wait">
             <motion.h3 
               key={activeStep}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-4xl @md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white"
             >
               {STEPS[activeStep]}
             </motion.h3>
           </AnimatePresence>
           <p className="text-primary font-mono text-[10px] @md:text-xs uppercase tracking-[1em] font-black">Analyzing_Intent_Lattice</p>
        </div>

        <div className="relative z-10 w-full max-w-lg glass-panel p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-3xl">
           <div className="space-y-4">
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest">
                 <span>Tracing_Pings</span>
                 <span>42/50 Nodes</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                 <motion.div 
                   animate={{ width: `${(activeStep + 1) * 25}%` }}
                   className="h-full bg-primary shadow-[0_0_15px_#0088CC]"
                 />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default NeuralTracerUI;
