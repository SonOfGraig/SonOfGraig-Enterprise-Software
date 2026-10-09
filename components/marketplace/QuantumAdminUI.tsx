'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const QuantumAdminUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [telemetry, setTelemetry] = useState({ fps: 60, lat: 14 });

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({ fps: 58 + Math.floor(Math.random() * 4), lat: 12 + Math.floor(Math.random() * 6) });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const MENU = [
    { label: 'Overview', icon: 'grid_view' },
    { label: 'Security', icon: 'shield_lock' },
    { label: 'Nodes', icon: 'hub' },
    { label: 'Vault', icon: 'key' }
  ];

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white flex flex-col @lg:flex-row font-display relative overflow-hidden transition-colors duration-700">
      
      <aside className="hidden @lg:flex w-24 hover:w-64 border-r border-slate-200 dark:border-white/5 flex-col py-10 transition-all duration-500 group/sidebar z-20 shrink-0 bg-white/40 dark:bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4 px-8 mb-20 overflow-hidden whitespace-nowrap">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shrink-0">
            <MIcon name="change_history" className="text-lg" />
          </div>
          <span className="font-black tracking-tighter uppercase italic text-lg opacity-0 group-hover/sidebar:opacity-100 transition-opacity">Quantum_OS</span>
        </div>
        <nav className="flex-1 space-y-4 px-6">
          {MENU.map((item) => (
            <button key={item.label} onClick={() => setActiveTab(item.label)} className={cn(
              "w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all font-bold text-sm overflow-hidden whitespace-nowrap",
              activeTab === item.label ? "bg-primary text-white shadow-xl" : "text-slate-400 dark:text-white/20 hover:text-primary"
            )}>
              <MIcon name={item.icon} className="text-xl" />
              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-6 @md:p-12 relative z-10 pb-32 @lg:pb-12">
        <header className="flex flex-col @md:flex-row justify-between items-start @md:items-center mb-12 gap-8">
          <div>
            <h2 className="text-3xl @md:text-6xl font-black tracking-tighter italic uppercase leading-none">{activeTab}</h2>
            <p className="opacity-30 text-[9px] @md:text-xs font-black mt-2 uppercase tracking-[0.3em]">
              Global_System_Sync: NOMINAL
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={toggleLocalTheme}
              className="size-11 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all"
            >
              <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="text-lg" />
            </button>
            <div className="hidden @md:flex items-center gap-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-xl text-[9px] font-mono font-black uppercase">
                <span className="text-green-500">{telemetry.fps} FPS</span>
                <span className="text-primary">{telemetry.lat}MS</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
          {[
            { label: 'Traffic', val: '4.2 PB', color: 'text-primary' },
            { label: 'Active Nodes', val: '1,241', color: 'text-green-500' },
            { label: 'Sec. Score', val: '99.9', color: 'text-accent' }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0c1a]/40 shadow-xl backdrop-blur-xl relative overflow-hidden group">
               <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 italic block mb-10">{stat.label}</span>
               <h4 className="text-4xl @md:text-6xl font-black italic tracking-tighter leading-none">{stat.val}</h4>
            </div>
          ))}
        </div>
      </main>

      <div className="@lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[100]">
        <div className="glass-panel p-3 rounded-full flex items-center justify-around border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0f172a]/90 shadow-3xl backdrop-blur-3xl">
          {MENU.map((item) => (
            <button key={item.label} onClick={() => setActiveTab(item.label)} className={cn(
              "size-12 rounded-full flex items-center justify-center transition-all",
              activeTab === item.label ? "bg-primary text-white shadow-lg" : "text-slate-400 dark:text-white/30"
            )}>
              <MIcon name={item.icon} className="text-xl" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuantumAdminUI;
