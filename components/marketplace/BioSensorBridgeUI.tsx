'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BioSensorBridgeUI: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bpm, setBpm] = useState(72);
  const [status, setStatus] = useState('Syncing');
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

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
      const isDarkActive = document.documentElement.dataset.theme === 'dark';
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = isDarkActive ? '#0088CC' : '#0066CC';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const angle = (x / w) * Math.PI * 10 + frame * 0.1;
        const heartBeat = Math.sin(angle) * (Math.random() > 0.95 ? 40 : 10);
        const y = h / 2 + heartBeat;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      frame++;
      requestAnimationFrame(render);
    };
    render();
    
    const interval = setInterval(() => {
      setBpm(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white flex flex-col font-display transition-colors duration-500">
      <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl shrink-0 z-20 transition-colors">
        <div className="flex items-center gap-3">
          <MIcon name="vital_signs" className="text-primary text-3xl animate-pulse" />
          <h2 className="text-xl font-black italic uppercase tracking-tighter">Bio_Link<span className="text-primary">.v4</span></h2>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={toggleLocalTheme}
             className="size-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all shadow-sm"
           >
             <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
           </button>
           <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest hidden @sm:block">Medical_Grade_v1</div>
           <div className="size-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
        </div>
      </header>

      <main className="flex-1 p-6 @md:p-12 grid grid-cols-1 @xl:grid-cols-3 gap-8 overflow-hidden">
        <div className="@xl:col-span-2 flex flex-col gap-8">
           <div className="h-64 @md:h-80 glass-panel rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-black/40 p-10 flex flex-col shadow-2xl relative overflow-hidden transition-colors">
              <div className="flex justify-between items-center mb-8">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Wave_Analysis_Channel_01</span>
                 <span className="text-primary font-mono text-xs">{bpm} BPM</span>
              </div>
              <div className="flex-1 w-full opacity-60">
                 <canvas ref={canvasRef} className="w-full h-full" />
              </div>
           </div>

           <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
              {['Temp: 36.8C', 'SpO2: 98%', 'BP: 120/80', 'Stress: Low'].map((s, i) => (
                <div key={i} className="p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-sm transition-colors">
                   <p className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase font-black mb-1">{s.split(': ')[0]}</p>
                   <p className="text-xl font-black italic tracking-tighter">{s.split(': ')[1]}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="flex flex-col gap-8">
           <div className="flex-1 glass-panel p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/60 shadow-2xl flex flex-col justify-between transition-colors">
              <div className="space-y-6">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">Diagnostic_Log</h3>
                 <div className="space-y-3 font-mono text-[10px] text-slate-400 dark:text-white/30">
                    <p className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2"><span>Node_Link</span><span className="text-primary">OK</span></p>
                    <p className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2"><span>Auth_Handshake</span><span className="text-primary">SECURE</span></p>
                    <p className="flex justify-between"><span>Inference_Core</span><span className="text-primary">STABLE</span></p>
                 </div>
              </div>
              <button className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-[0.4em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Generate_Report</button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default BioSensorBridgeUI;
