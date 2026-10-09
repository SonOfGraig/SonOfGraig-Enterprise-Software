'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const SCAN_MESSAGES = [
  "INITIALIZING_NEURAL_LINK",
  "SCANNING_RETINAL_MAP",
  "COMPARING_DNA_HASH",
  "VERIFYING_CLEARANCE_LEVEL_4",
  "HANDSHAKING_QUANTUM_CORE",
  "DECRYPTING_BIOMETRIC_VAULT"
];

const BiometricAccessUI: React.FC = () => {
  const [status, setStatus] = useState<'locked' | 'scanning' | 'granted'>('locked');
  const [progress, setProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState(SCAN_MESSAGES[0]);
  const [telemetry, setTelemetry] = useState<string[]>([]);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Generate random telemetry for the "Hacker" aesthetic
  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.random().toString(16).substr(2, 8).toUpperCase();
      setTelemetry(prev => [...prev.slice(-15), `[0x${hex}] IN_LINK_STABLE: NODE_${Math.floor(Math.random()*999)}`]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [telemetry]);

  const startScan = () => {
    if (status !== 'locked') return;
    setStatus('scanning');
    setProgress(0);
    
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % SCAN_MESSAGES.length;
      setScanMessage(SCAN_MESSAGES[msgIdx]);
    }, 600);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(msgInterval);
          setStatus('granted');
          return 100;
        }
        return prev + 1;
      });
    }, 40);
  };

  const resetVault = () => {
    setStatus('locked');
    setProgress(0);
    setScanMessage(SCAN_MESSAGES[0]);
  };

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white flex flex-col items-center justify-center p-4 @md:p-12 overflow-hidden font-display relative transition-colors duration-700">
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="absolute top-6 right-6 @md:top-10 @md:right-10 z-50">
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {status !== 'granted' ? (
          <motion.div 
            key="lock-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            className="w-full max-w-lg flex flex-col items-center gap-10 relative z-10"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm animate-pulse">
                System_Lockdown_Active
              </div>
              <h2 className="text-4xl @md:text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Ironclad<br/><span className="text-primary">Vault_X71</span></h2>
              <p className="text-slate-400 dark:text-white/30 font-mono text-[9px] @md:text-[10px] uppercase tracking-[0.4em]">Level 4 Authorization Required</p>
            </div>

            {/* Interactive Scanner */}
            <div className="relative group cursor-pointer" onClick={startScan}>
              {/* Outer Rotating Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-dashed border-primary/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border border-primary/10 rounded-full"
              />

              <div className={cn(
                "size-44 @md:size-56 rounded-full border-4 transition-all duration-700 flex items-center justify-center relative overflow-hidden bg-white dark:bg-black/20 shadow-2xl",
                status === 'scanning' ? "border-primary shadow-primary/20" : "border-slate-200 dark:border-white/5 group-hover:border-primary/40"
              )}>
                {/* Scanning Laser Line */}
                {status === 'scanning' && (
                  <motion.div 
                    animate={{ top: ['-10%', '110%', '-10%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_20px_#0088CC] z-20"
                  />
                )}

                <MIcon name={status === 'scanning' ? 'fingerprint' : 'lock'} className={cn(
                  "text-7xl @md:text-8xl transition-all duration-500 z-10",
                  status === 'scanning' ? "text-primary scale-110 drop-shadow-[0_0_15px_rgba(0,136,204,0.5)]" : "text-slate-300 dark:text-white/20 group-hover:text-primary/40"
                )} />

                {/* Progress Circle Fill */}
                <svg className="absolute inset-0 size-full -rotate-90">
                  <circle 
                    cx="50%" cy="50%" r="48%" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    className="text-primary/10" 
                  />
                  <motion.circle 
                    cx="50%" cy="50%" r="48%" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="text-primary"
                    style={{ 
                      pathLength: progress / 100,
                      filter: 'drop-shadow(0 0 5px #0088CC)'
                    }}
                  />
                </svg>
              </div>

              {/* Status Info HUD */}
              <div className="mt-12 flex flex-col items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={scanMessage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
                  >
                    {status === 'scanning' ? `>> ${scanMessage}...` : 'Ready_for_Input'}
                  </motion.p>
                </AnimatePresence>
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={cn("size-1 rounded-full transition-all duration-300", i < (progress / 20) ? "bg-primary shadow-[0_0_8px_#0088CC]" : "bg-slate-200 dark:bg-white/10")} />
                   ))}
                </div>
              </div>
            </div>

            {/* Bottom Scrambler HUD */}
            <div className="w-full h-12 flex items-center justify-center opacity-40">
                <div className="text-[9px] font-mono uppercase tracking-[0.6em] whitespace-nowrap overflow-hidden text-slate-500 dark:text-white">
                    {telemetry[telemetry.length - 1]}
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="vault-access"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full max-w-6xl grid grid-cols-1 @xl:grid-cols-12 gap-8 items-stretch overflow-hidden py-10"
          >
            {/* Sidebar: Navigation & Identity */}
            <div className="@xl:col-span-4 flex flex-col gap-6">
                <div className="glass-panel p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/40 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[80px] rounded-full" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="size-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-600 dark:text-green-500 shadow-lg">
                           <MIcon name="verified_user" className="text-4xl" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Chief_Architect</h3>
                           <p className="text-slate-500 dark:text-white/40 text-[10px] font-mono tracking-widest uppercase">ID: SG_NODE_VAULT_X71</p>
                        </div>
                    </div>
                    <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 dark:text-white/20 tracking-widest">
                            <span>Auth_Token_TTL</span>
                            <span className="text-primary font-mono italic">02:59:58</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                           <motion.div initial={{ width: '100%' }} animate={{ width: '80%' }} className="h-full bg-primary" transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }} />
                        </div>
                    </div>
                </div>

                {/* Telemetry Stream */}
                <div className="flex-1 glass-panel p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/60 shadow-inner flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-white/5">
                        <span className="text-[9px] font-mono font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">Uplink_Telemetry</span>
                        <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-[8px] text-primary/60 space-y-1 scrollbar-hide">
                        {telemetry.map((t, i) => (
                          <div key={i} className="animate-fade-in">{t}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content: Files & Manifest */}
            <div className="@xl:col-span-8 flex flex-col gap-6">
                <div className="flex-1 glass-panel p-8 rounded-[3.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#050810]/80 shadow-3xl flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-end mb-10">
                       <div>
                          <h4 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Vault_Manifest</h4>
                          <p className="text-slate-500 dark:text-white/30 text-xs font-medium uppercase tracking-widest mt-1">Target: ENCRYPTED_CORE_ALPHA</p>
                       </div>
                       <button className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all">Download_All</button>
                    </div>

                    <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                        {[
                          { name: 'NEURAL_NET_WEIGHTS', size: '4.2 GB', type: 'Weights' },
                          { name: 'QUANTUM_LEDGER_V1', size: '128 MB', type: 'Database' },
                          { name: 'GOVERNANCE_PROTOCOL', size: '1.2 MB', type: 'Blueprint' },
                          { name: 'ENCRYPTED_AUTH_RECORDS', size: '89 KB', type: 'Secure_Log' }
                        ].map(file => (
                          <motion.div 
                            key={file.name} 
                            whileHover={{ y: -4, border: '1px solid #0088CC' }}
                            className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between group transition-all cursor-pointer shadow-sm"
                          >
                             <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                   <MIcon name="description" className="" />
                                </div>
                                <div>
                                   <p className="text-xs font-black italic uppercase tracking-tight text-slate-900 dark:text-white">{file.name}</p>
                                   <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase">{file.type} • {file.size}</span>
                                </div>
                             </div>
                             <MIcon name="download" className="text-slate-300 dark:text-white/10 group-hover:text-primary transition-colors" />
                          </motion.div>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 flex flex-col @md:flex-row gap-6">
                        <button onClick={resetVault} className="flex-1 py-5 rounded-3xl bg-white dark:bg-transparent border border-red-500/30 text-red-600 dark:text-red-500 font-black uppercase text-xs tracking-[0.4em] hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95">
                          Terminate_Session
                        </button>
                        <button className="flex-1 py-5 rounded-3xl bg-primary text-white font-black uppercase text-xs tracking-[0.4em] shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                          Establish_New_Uplink
                        </button>
                    </div>
                </div>

                {/* Sub-Metric Bar */}
                <div className="h-20 glass-panel rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/60 px-10 flex items-center justify-between shadow-xl">
                   <div className="flex gap-12">
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Active_Connections</span>
                        <span className="text-sm font-black italic tabular-nums text-slate-900 dark:text-white">1,241</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Traffic_Load</span>
                        <span className="text-sm font-black italic tabular-nums text-primary">NOMI_STABLE</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className="w-1.5 h-6 rounded-full bg-primary/20 relative overflow-hidden">
                            <motion.div 
                              animate={{ y: ['0%', '100%'] }} 
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} 
                              className="absolute inset-0 bg-primary shadow-[0_0_10px_#0088CC]" 
                            />
                         </div>
                       ))}
                   </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BiometricAccessUI;
