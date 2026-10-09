'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NeuralAgentUI: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Neural system ready. Sequence initialization complete.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'model', text: `Processing parameters for "${userText}". Optimization protocol established across 14 clusters.` }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#02050a] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden transition-colors duration-700">
      
      {/* Refined Header */}
      <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/80 dark:bg-black/40 backdrop-blur-2xl shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,136,204,0.3)]">
            <MIcon name="psychology" className="text-2xl" />
          </div>
          <div className="hidden @md:block">
            <span className="text-sm font-black italic uppercase tracking-tighter block leading-none">Neural_Core v4.2</span>
            <span className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.5em] font-black mt-1 block">Autonomous_Operative</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-5">
           <button 
            onClick={toggleLocalTheme}
            className="size-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 hover:text-primary border border-slate-200 dark:border-white/10 transition-all"
           >
              <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="text-lg" />
           </button>
           <div className="flex flex-col items-end hidden @sm:flex">
             <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase font-black">Link_Stability</span>
             <span className="text-green-600 dark:text-green-500 font-black text-[10px]">99.98%</span>
           </div>
           <div className="size-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]" />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-40 pointer-events-none z-0">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/10 blur-[100px] rounded-full animate-pulse" />
        </div>

        {/* Sidebar - Desktop Context */}
        <aside className="w-72 border-r border-slate-200 dark:border-white/5 p-8 space-y-10 hidden @xl:block shrink-0 bg-white/40 dark:bg-transparent z-10">
           <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/20">Knowledge_Graft</span>
              <div className="space-y-3">
                {['Schema_Mapping', 'Entity_Scan', 'Binary_Audit'].map(item => (
                  <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm group hover:border-primary transition-all cursor-pointer">
                     <span className="text-xs font-bold text-slate-600 dark:text-white/60 group-hover:text-primary">{item}</span>
                     <MIcon name="verified" className="text-sm opacity-20 group-hover:opacity-100 group-hover:text-primary" />
                  </div>
                ))}
              </div>
           </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-white/20 dark:bg-black/20 z-10 relative">
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 @md:p-12 space-y-8 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "max-w-[90%] @md:max-w-[75%] p-8 rounded-[2.5rem] shadow-2xl relative group",
                    msg.role === 'user' 
                      ? "ml-auto bg-slate-900 dark:bg-primary/20 text-white border border-white/10" 
                      : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white/80"
                  )}
                >
                  <span className={cn("absolute -top-3 text-[8px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full border shadow-sm", msg.role === 'user' ? "right-6 bg-slate-800 border-white/20 text-white" : "left-6 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/20 text-primary")}>
                    {msg.role === 'user' ? 'OPERATIVE' : 'CORE_AGENT'}
                  </span>
                  <p className="text-base @md:text-lg leading-relaxed font-medium italic">"{msg.text}"</p>
                </motion.div>
              ))}
              {isTyping && (
                <div className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-3xl flex gap-2 w-fit animate-pulse">
                   <div className="size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                   <div className="size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                   <div className="size-2 rounded-full bg-primary animate-bounce" />
                </div>
              )}
           </div>

           {/* High-fidelity Input Bar */}
           <div className="p-6 @md:p-12 border-t border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#050b14]/90 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="max-w-4xl mx-auto relative group">
                 <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Task the neural system..." 
                  className="w-full py-6 px-10 rounded-[2rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-all font-mono text-base shadow-inner placeholder:opacity-20"
                 />
                 <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                    <MIcon name="send" className="text-2xl" />
                 </button>
              </div>
              <div className="mt-6 flex justify-between items-center px-4 max-w-4xl mx-auto">
                 <span className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] font-black italic">Decrypted_Secure_Tunnel</span>
                 <div className="flex gap-2">
                    {[1,2,3].map(i => <div key={i} className="size-1 rounded-full bg-primary/40" />)}
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default NeuralAgentUI;
