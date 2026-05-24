'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';

/**
 * AuroraMeshBackground
 *
 * Premium motion-graphics layer for the home hero. Five large, heavily
 * blurred radial-gradient blobs drift on independent long loops to create
 * a continuously breathing aurora mesh in brand colours. A faint dot-grid
 * adds technical texture, and soft vignettes shape the edges so the mesh
 * sits behind both hero columns without competing with the dashboard.
 *
 * Colours, base wash, and vignettes adapt to dark / light mode via
 * next-themes — bright cyans on dark surfaces, deeper tints on light.
 * Honours prefers-reduced-motion by rendering a static frame.
 */

type Blob = {
  /** Light-mode rgba colour string */
  light: string;
  /** Dark-mode rgba colour string */
  dark: string;
  size: number;
  left: string;
  top: string;
  xRange: [string, string, string, string];
  yRange: [string, string, string, string];
  duration: number;
};

const BLOBS: Blob[] = [
  {
    // Primary brand blue — dominant tonal wash from the top-left
    light: 'rgba(11, 158, 222, 0.55)',
    dark: 'rgba(11, 158, 222, 0.50)',
    size: 760,
    left: '-12%',
    top: '-18%',
    xRange: ['0%', '12%', '-6%', '0%'],
    yRange: ['0%', '8%', '14%', '0%'],
    duration: 22,
  },
  {
    // Deeper anchor on the lower-left
    // Light: deep navy (logo shadow) for depth
    // Dark:  brighter cyan so it's visible against the dark surface
    light: 'rgba(4, 78, 115, 0.40)',
    dark: 'rgba(56, 189, 248, 0.32)',
    size: 620,
    left: '-6%',
    top: '55%',
    xRange: ['0%', '10%', '-8%', '0%'],
    yRange: ['0%', '-6%', '8%', '0%'],
    duration: 26,
  },
  {
    // Amber accent — warm counterpoint on the right
    light: 'rgba(249, 115, 22, 0.32)',
    dark: 'rgba(249, 115, 22, 0.26)',
    size: 580,
    left: '65%',
    top: '-12%',
    xRange: ['0%', '-10%', '6%', '0%'],
    yRange: ['0%', '8%', '-4%', '0%'],
    duration: 28,
  },
  {
    // Secondary brand blue behind the dashboard
    light: 'rgba(11, 158, 222, 0.38)',
    dark: 'rgba(11, 158, 222, 0.34)',
    size: 660,
    left: '55%',
    top: '40%',
    xRange: ['0%', '-8%', '10%', '0%'],
    yRange: ['0%', '10%', '-6%', '0%'],
    duration: 24,
  },
  {
    // Success-green accent in the lower mid
    light: 'rgba(22, 163, 74, 0.22)',
    dark: 'rgba(34, 197, 94, 0.22)',
    size: 480,
    left: '30%',
    top: '60%',
    xRange: ['0%', '14%', '-10%', '0%'],
    yRange: ['0%', '-8%', '6%', '0%'],
    duration: 30,
  },
];

export function AuroraMeshBackground() {
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // During SSR / first paint, default to light to avoid hydration mismatch.
  // Once mounted, switch to the real theme.
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base wash — gives the mesh a slightly modulated backdrop in
          each mode rather than sitting on a perfectly flat surface. */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(4, 78, 115, 0.30) 0%, rgba(0, 0, 0, 0) 50%, rgba(11, 158, 222, 0.12) 100%)'
            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 247, 237, 0.5) 100%)',
        }}
      />

      {/* Animated colour blobs */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: `radial-gradient(circle at center, ${isDark ? b.dark : b.light} 0%, transparent 65%)`,
            filter: 'blur(90px)',
            willChange: 'transform',
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: b.xRange,
                  y: b.yRange,
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: b.duration,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: i * 1.4,
                }
          }
        />
      ))}

      {/* Faint dot grid — technical texture, masked to fade at edges.
          Brightened slightly in dark mode for visibility. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(11, 158, 222, 0.22) 1px, transparent 1.4px)'
            : 'radial-gradient(circle, rgba(11, 158, 222, 0.18) 1px, transparent 1.4px)',
          backgroundSize: '36px 36px',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 50%, black 25%, transparent 95%)',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 50%, black 25%, transparent 95%)',
          opacity: 0.6,
        }}
      />

      {/* Top + bottom vignettes — white tints on light, black tints on
          dark, so the edges deepen rather than lighten in dark mode. */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: isDark
            ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, transparent 100%)'
            : 'linear-gradient(0deg, rgba(255, 255, 255, 0.7) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
