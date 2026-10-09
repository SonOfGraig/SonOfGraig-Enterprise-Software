'use client';

import { MIcon } from './MIcon';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Helper for model-viewer custom element
const ModelViewer = 'model-viewer' as any;

const SpatialControllerUI: React.FC = () => {
  const modelViewerRef = useRef<any>(null);
  const [coords, setCoords] = useState({ x: -0.433, y: -0.239, z: -0.730 });
  const [exposure, setExposure] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'xray'>('solid');
  const [activeArtifact, setActiveArtifact] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleLocalTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const ARTIFACTS = [
    { name: 'NEURAL_CORE', src: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb' },
    { name: 'VOID_SHARD', src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb' },
    { name: 'LOGIC_NODE', src: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb' }
  ];

  // Robust Material Logic
  useEffect(() => {
    const mv = modelViewerRef.current;
    if (!mv) return;

    const applyMaterialEffect = () => {
      if (!mv.model) return;
      const materials = mv.model.materials;

      materials.forEach((mat: any) => {
        if (viewMode === 'xray') {
          // Deep Cyber Blue X-Ray
          mat.pbrMetallicRoughness.setBaseColorFactor([0.05, 0.2, 0.6, 0.5]);
          mat.setAlphaMode('BLEND');
          mat.setEmissiveFactor([0, 0.4, 1.0]);
        } else if (viewMode === 'wireframe') {
          // Neon Cyan Ghost Finish
          mat.pbrMetallicRoughness.setBaseColorFactor([0, 1, 1, 0.05]);
          mat.setAlphaMode('BLEND');
          mat.setEmissiveFactor([0, 2.0, 2.0]); 
        } else {
          // Synthetic Ice Blue-White
          mat.pbrMetallicRoughness.setBaseColorFactor([0.9, 0.95, 1.0, 1.0]);
          mat.pbrMetallicRoughness.setRoughnessFactor(0.05);
          mat.pbrMetallicRoughness.setMetallicFactor(0.9);
          mat.setAlphaMode('OPAQUE');
          mat.setEmissiveFactor([0, 0.1, 0.2]); 
        }
      });
    };

    const onLoad = () => applyMaterialEffect();
    mv.addEventListener('load', onLoad);
    if (mv.model) applyMaterialEffect();

    return () => mv.removeEventListener('load', onLoad);
  }, [viewMode, activeArtifact]);

  // Telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        x: Number((prev.x + (Math.random() - 0.5) * 0.008).toFixed(3)),
        y: Number((prev.y + (Math.random() - 0.5) * 0.008).toFixed(3)),
        z: Number((prev.z + (Math.random() - 0.5) * 0.008).toFixed(3))
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="@container h-full w-full bg-slate-50 dark:bg-[#010204] text-slate-900 dark:text-white flex flex-col font-display overflow-hidden relative selection:bg-primary/30 transition-colors duration-700">
      
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,136,204,0.08)_0%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="absolute right-6 top-6 @md:top-10 @md:right-10 z-50">
        <button 
          onClick={toggleLocalTheme}
          className="size-11 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/10 transition-all shadow-xl"
        >
          <MIcon name={isDark ? 'light_mode' : 'dark_mode'} className="" />
        </button>
      </div>

      {/* TOP-LEFT STATUS PANELS */}
      <div className="absolute left-6 @md:left-10 top-6 @md:top-14 z-30 flex flex-col gap-4 @md:gap-6 pointer-events-none max-w-[calc(100%-2rem)]">
         <motion.div 
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="glass-panel p-4 @md:p-6 rounded-2xl @md:rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#050810]/70 backdrop-blur-xl shadow-2xl w-fit min-w-[170px] @md:min-w-[210px]"
         >
            <span className="text-primary font-mono text-[7px] @md:text-[8px] font-black uppercase tracking-[0.4em] mb-2 @md:mb-4 block italic">COORDINATE_MATRIX</span>
            <div className="space-y-2 @md:space-y-3 font-mono text-[10px] @md:text-[11px] text-slate-600 dark:text-white/80">
               <div className="flex justify-between gap-6 @md:gap-10"><span>X:</span><span className="text-primary tabular-nums">{coords.x.toFixed(3)}</span></div>
               <div className="flex justify-between gap-6 @md:gap-10"><span>Y:</span><span className="text-primary tabular-nums">{coords.y.toFixed(3)}</span></div>
               <div className="flex justify-between gap-6 @md:gap-10"><span>Z:</span><span className="text-primary tabular-nums">{coords.z.toFixed(3)}</span></div>
            </div>
         </motion.div>
         
         <motion.div 
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.1 }}
           className="glass-panel p-4 @md:p-6 rounded-2xl @md:rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#050810]/70 backdrop-blur-xl shadow-2xl w-fit min-w-[170px] @md:min-w-[210px]"
         >
            <span className="text-slate-400 dark:text-white/30 font-mono text-[7px] @md:text-[8px] uppercase tracking-[0.4em] mb-2 @md:mb-4 block">TARGET_ID</span>
            <h3 className="text-xl @md:text-2xl font-black italic tracking-tighter uppercase leading-none text-slate-900 dark:text-white">{ARTIFACTS[activeArtifact].name}</h3>
            <div className="flex items-center gap-2 mt-2 @md:mt-3">
               <div className="size-1 @md:size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#0088CC]" />
               <p className="text-[6px] @md:text-[7px] font-mono text-primary/80 uppercase tracking-widest">ENCRYPTED_UPLINK_STABLE</p>
            </div>
         </motion.div>
      </div>

      {/* SCANNER GRID DETAIL */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-end opacity-20 pointer-events-none z-10 hidden @lg:flex">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={cn("h-px bg-primary transition-all", i % 5 === 0 ? "w-12" : "w-6")} />
        ))}
      </div>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 relative flex items-center justify-center p-4 @md:p-20">
        <div className="w-full h-full max-w-5xl relative z-20">
          <ModelViewer
            ref={modelViewerRef}
            src={ARTIFACTS[activeArtifact].src}
            auto-rotate
            camera-controls
            interaction-prompt="none"
            shadow-intensity="1.2"
            exposure={exposure}
            environment-image="neutral"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          />
          
          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ top: '0%', opacity: 0 }}
                animate={{ top: '100%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_30px_#0088CC] z-30 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Tactical Frames */}
        <div className="absolute inset-10 z-10 pointer-events-none opacity-40 @md:opacity-100">
           <div className="absolute top-0 left-0 size-20 md:size-32 border-t border-l border-primary/20" />
           <div className="absolute top-0 right-0 size-20 md:size-32 border-t border-r border-primary/20" />
           <div className="absolute bottom-0 left-0 size-20 md:size-32 border-b border-l border-primary/20" />
           <div className="absolute bottom-0 right-0 size-20 md:size-32 border-b border-r border-primary/20" />
        </div>
      </div>

      {/* REPOSITIONED CONTROLLER HUD (Avoiding bottom-right corner) */}
      <div className="absolute bottom-8 @md:bottom-14 left-6 @md:left-10 z-50 flex flex-col @xl:flex-row items-center gap-6">
        
        {/* Exposure & Modes Group */}
        <div className="flex items-center gap-8 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 p-5 @md:p-6 rounded-[2rem] @md:rounded-[2.5rem] shadow-3xl">
          <div className="flex flex-col gap-2.5">
             <span className="text-[7px] @md:text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 italic">EXPOSURE_OFFSET</span>
             <input 
                type="range" min="0" max="2" step="0.1" 
                value={exposure} onChange={(e) => setExposure(parseFloat(e.target.value))}
                className="w-32 @md:w-44 h-1 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
              />
          </div>
          
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-2">
            {(['SOLID', 'WIREFRAME', 'XRAY'] as const).map(mode => (
              <button 
                key={mode}
                onClick={() => setViewMode(mode.toLowerCase() as any)}
                className={cn(
                  "px-4 @md:px-5 py-2 @md:py-2.5 rounded-full text-[8px] @md:text-[9px] font-black uppercase tracking-[0.2em] transition-all",
                  viewMode === mode.toLowerCase() ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40 hover:text-primary"
                )}
              >
                {mode === 'WIREFRAME' ? 'W-FRAME' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Action Group (Scan & Switcher) */}
        <div className="flex items-center gap-5 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 p-5 @md:p-6 rounded-[2rem] @md:rounded-[2.5rem] shadow-3xl">
           <div className="flex gap-2.5 mr-2">
             {ARTIFACTS.map((_, i) => (
               <button 
                key={i}
                onClick={() => setActiveArtifact(i)}
                className={cn(
                  "size-2 @md:size-2.5 rounded-full transition-all duration-700", 
                  activeArtifact === i ? "bg-primary scale-125 shadow-[0_0_12px_#0088CC]" : "bg-slate-200 dark:bg-white/10 hover:bg-primary/40"
                )}
               />
             ))}
           </div>

           <button 
            onClick={() => setIsScanning(!isScanning)}
            className={cn(
              "h-12 @md:h-14 px-8 @md:px-12 rounded-2xl font-black uppercase text-[9px] @md:text-[10px] tracking-[0.4em] transition-all shadow-xl active:scale-95 flex items-center gap-4",
              isScanning ? "bg-red-500 text-white shadow-red-500/30" : "bg-primary text-white shadow-primary/30"
            )}
           >
             {isScanning ? 'HALT' : 'SCAN'}
             {isScanning && <div className="size-1.5 rounded-full bg-white animate-pulse" />}
           </button>
        </div>
      </div>

    </div>
  );
};

export default SpatialControllerUI;
