'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export type LoaderState = 'build' | 'pulse' | 'orbit' | 'scan' | 'skeleton' | 'dots';

interface LoaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  state: LoaderState;
  size?: number;
}

export function Loader({ state, size = 40, className, ...props }: LoaderProps) {
  if (state === 'build') {
    return (
      <div className={cn("relative", className)} style={{ width: size, height: size * 0.9 }} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" width="100%" height="100%">
          <motion.polygon 
            points="100,20 148,48 100,76 52,48" 
            fill="#0B9EDE"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          />
          <motion.polygon 
            points="52,48 100,76 100,148 52,120" 
            fill="#044E73"
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
          <motion.polygon 
            points="100,76 148,48 148,120 100,148" 
            fill="#0773A8"
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <polygon points="100,20 148,48 100,76 52,48" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
            <line x1="52" y1="48" x2="52" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            <line x1="148" y1="48" x2="148" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            <line x1="52" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            <line x1="148" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            <line x1="100" y1="76" x2="100" y2="148" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          </motion.g>
        </svg>
      </div>
    );
  }

  if (state === 'pulse') {
    return (
      <motion.div 
        className={cn("relative", className)} 
        style={{ width: size, height: size * 0.9 }}
        animate={{ opacity: [1, 0.6, 1], scale: [1, 0.95, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        {...props}
      >
        <Logo />
      </motion.div>
    );
  }

  if (state === 'orbit') {
    return (
      <div className={cn("relative flex items-center justify-center", className)} style={{ width: size * 1.5, height: size * 1.5 }} {...props}>
        <div style={{ width: size, height: size * 0.9 }}>
          <Logo />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--sg-surface-3)] border-t-[var(--sg-blue)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    );
  }

  if (state === 'scan') {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ width: size, height: size * 0.9 }} {...props}>
        <Logo />
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-[var(--sg-blue)] shadow-[0_0_8px_var(--sg-blue)] z-10"
          animate={{ top: ["-10%", "110%", "-10%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (state === 'skeleton') {
    return (
      <div 
        className={cn("bg-[var(--sg-surface-2)] rounded-[var(--r-md)] relative overflow-hidden", className)} 
        {...props}
      >
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] dark:via-[rgba(255,255,255,0.03)] to-transparent -translate-x-full"
          animate={{ translateX: ["-100%", "100%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (state === 'dots') {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)} {...props}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-current"
            animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 1.4, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
