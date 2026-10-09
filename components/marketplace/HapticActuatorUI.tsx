'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const HapticActuatorUI: React.FC = () => {
  const [intensity, setIntensity] = useState(0.4);
  const [isVibrating, setIsVibrating] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = '#FF6201';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x += 2) {
        const amp = isVibrating ? (h * 0.3 * intensity) : (h * 0.05);
        const freq = isVibrating ? 0.05 : 0.01;
        const y = h / 2 + Math.sin(x * freq + frame * 0.1) * amp;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      frame++;
      requestAnimationFrame(render);
    };
    render();
  }, [isVibrating, intensity]);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#050201] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative selection:bg-accent/30 transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,98,1,0.05)_0%,transparent_80%)] pointer-events-none" />
      
      <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(255,98,1,0.2)]">
            <MIcon name="vibration" className="" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-tighter italic">Haptic_Node_v2.4</h1>
            <p className="text-[8px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em]">Tactile_Resonance_Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4 @md:gap-6">
           <button 
             onClick={toggleLocalTheme}
             className="size-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-accent border border-slate-200 dark:border-white/10 transition-all shadow-sm"
           >
             <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="text-lg" />
           </button>
           <button 
             onClick={() => { setIsVibrating(true); setTimeout(() => setIsVibrating(false), 1000); }}
             className="px-6 py-2 rounded-xl bg-accent text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
           >
             Trigger_Pulse
           </button>
        </div>
      </header>

      <main className="flex-1 p-6 @md:p-12 flex flex-col items-center justify-center gap-12 overflow-hidden">
        <div className="relative size-64 @md:size-80 flex items-center justify-center">
            <motion.div 
                animate={isVibrating ? { scale: [1, 1.1, 0.9, 1], x: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.1, repeat: Infinity }}
                className={cn(
                    "size-48 @md:size-64 rounded-full border-4 transition-all duration-300 flex items-center justify-center relative shadow-3xl",
                    isVibrating ? "border-accent bg-accent/10 shadow-[0_0_60px_rgba(255,98,1,0.3)]" : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/5"
                )}
            >
                <MIcon name="touch_app" className={cn("text-6xl @md:text-8xl transition-colors", isVibrating ? "text-accent" : "text-slate-200 dark:text-white/10")} />
            </motion.div>
            <div className="absolute inset-0 border border-dashed border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="w-full max-w-2xl space-y-10">
            <div className="h-32 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/40 overflow-hidden shadow-inner">
                <canvas ref={canvasRef} className="w-full h-full opacity-60" />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black italic">
                    <span>Intensity_Matrix</span>
                    <span className="text-accent">{Math.round(intensity * 100)}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="1" step="0.01" 
                  value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                />
            </div>
        </div>
      </main>

      <footer className="p-8 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-black/60 backdrop-blur-xl flex justify-between items-center opacity-40 shrink-0">
          <span className="text-[8px] font-mono uppercase tracking-widest italic">Driver: NEURAL_KINETIC_v4</span>
          <div className="flex gap-4">
             <span className="text-[8px] font-mono uppercase">Latency: 2ms</span>
             <span className="text-[8px] font-mono uppercase">Voltage: 3.7v</span>
          </div>
      </footer>
    </div>
  );
};

export default HapticActuatorUI;
