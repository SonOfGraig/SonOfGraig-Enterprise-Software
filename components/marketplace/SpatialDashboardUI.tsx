'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const SpatialDashboardUI: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 60, damping: 20 });

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white overflow-hidden p-6 @md:p-12 flex flex-col items-center justify-center font-display transition-colors duration-700 perspective-2000"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      {/* HUD Header */}
      <header className="fixed top-6 left-6 right-6 @md:top-10 @md:left-10 @md:right-10 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg pointer-events-auto">
             <MIcon name="spatial_tracking" className="" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden @sm:block">Spatial_v4</span>
        </div>
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl pointer-events-auto"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </header>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full max-w-6xl grid grid-cols-1 @xl:grid-cols-12 gap-8 relative"
      >
        {/* Main Immersive Chart Container */}
        <div 
          className="@xl:col-span-8 aspect-[16/10] @xl:aspect-video rounded-[3rem] @md:rounded-[4rem] bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-8 @md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col justify-between relative group overflow-hidden backdrop-blur-2xl"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="absolute top-0 right-0 p-48 bg-primary/5 blur-[120px] rounded-full" />
          
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-primary tracking-[0.6em]">System_Pulse_Alpha</span>
              <h2 className="text-4xl @md:text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Cluster<br/><span className="text-primary">Dynamics</span></h2>
            </div>
            <div className="size-16 @md:size-20 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
               <MIcon name="analytics" className="text-4xl text-primary" />
            </div>
          </div>

          <div className="flex items-end gap-3 h-32 @md:h-48 relative z-10 px-4">
             {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
               <motion.div 
                 key={i} 
                 initial={{ height: 0 }} 
                 animate={{ height: `${h}%` }} 
                 className="flex-1 bg-primary/20 border-t-4 border-primary rounded-t-2xl shadow-[0_0_30px_rgba(0,136,204,0.2)]"
               />
             ))}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] @md:text-[15rem] font-black text-slate-900/[0.02] dark:text-white/[0.02] italic pointer-events-none select-none">
            GRID
          </div>
        </div>

        {/* Floating Side Metrics */}
        <div className="@xl:col-span-4 flex flex-col justify-center gap-6">
           {[
             { label: 'Edge Latency', val: '14ms', icon: 'speed', color: 'text-primary' },
             { label: 'Node Uptime', val: '99.9%', icon: 'verified', color: 'text-green-500' },
             { label: 'Active Clusters', val: '42', icon: 'hub', color: 'text-accent' }
           ].map((stat, i) => (
             <motion.div 
                key={stat.label}
                style={{ transform: `translateZ(${40 + i * 30}px)` }}
                className="p-6 @md:p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-6 shadow-3xl hover:border-primary/50 transition-all cursor-pointer group backdrop-blur-xl"
             >
                <div className={cn("size-12 @md:size-14 rounded-[1.25rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg", stat.color)}>
                   <MIcon name={stat.icon} className="text-2xl @md:text-3xl" />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 mb-1">Global_{stat.label}</p>
                   <h4 className="text-2xl @md:text-3xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white">{stat.val}</h4>
                </div>
             </motion.div>
           ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SpatialDashboardUI;
