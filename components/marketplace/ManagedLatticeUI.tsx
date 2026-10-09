'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ManagedLatticeUI: React.FC = () => {
  const [nodes, setNodes] = useState(Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    status: Math.random() > 0.3 ? 'active' : 'dormant',
    load: Math.floor(Math.random() * 100),
    health: 95 + Math.random() * 5
  })));

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        load: n.status === 'active' ? Math.max(10, Math.min(100, n.load + (Math.random() - 0.5) * 10)) : 0
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white p-6 @md:p-14 flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="flex flex-col @md:flex-row justify-between items-start @md:items-end mb-16 relative z-10 gap-8">
        <div>
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 shadow-sm">
             <span className="size-2 rounded-full bg-primary animate-pulse" />
             Core_Lattice_v4.2.0
           </div>
           <h2 className="text-4xl @md:text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Managed<br/><span className="text-primary">Lattice_Control</span></h2>
        </div>
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </div>

      <div className="grid grid-cols-4 @md:grid-cols-6 @xl:grid-cols-8 gap-4 flex-1 relative z-10 overflow-y-auto pr-2 scrollbar-hide">
         {nodes.map(node => (
           <motion.div
            key={node.id}
            className={cn(
              "aspect-square rounded-2xl md:rounded-3xl border-2 transition-all duration-700 flex flex-col items-center justify-center gap-2 md:gap-3 relative overflow-hidden group",
              node.status === 'active' 
                ? "bg-white dark:bg-primary/5 border-primary/30 shadow-xl" 
                : "bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 opacity-40"
            )}
           >
              <MIcon name={node.status === 'active' ? 'hub' : 'power_off'} className={cn("text-xl @md:text-3xl", node.status === 'active' ? "text-primary" : "text-slate-300 dark:text-white/10")} />
           </motion.div>
         ))}
      </div>
    </div>
  );
};
export default ManagedLatticeUI;
