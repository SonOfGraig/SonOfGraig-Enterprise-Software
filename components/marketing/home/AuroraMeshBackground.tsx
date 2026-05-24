'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * AuroraMeshBackground
 *
 * Premium motion-graphics layer for the home hero. Five large, heavily
 * blurred radial-gradient blobs drift on independent long loops to create
 * a continuously breathing aurora mesh in brand colours. A faint dot-grid
 * adds technical texture, and soft vignettes shape the edges so the mesh
 * sits behind both hero columns without competing with the dashboard.
 *
 * Brand tokens used: --sg-blue, --sg-amber, --sg-success, deep blue from
 * the AI Dev Platform logo (#044E73). Honours prefers-reduced-motion by
 * rendering a static frame with blobs in their initial positions.
 */

type Blob = {
  color: string;
  size: number;
  left: string;
  top: string;
  xRange: [string, string, string, string];
  yRange: [string, string, string, string];
  duration: number;
};

const BLOBS: Blob[] = [
  {
    // Primary brand blue — sets the dominant tonal wash from the top-left
    color: 'rgba(11, 158, 222, 0.55)',
    size: 760,
    left: '-12%',
    top: '-18%',
    xRange: ['0%', '12%', '-6%', '0%'],
    yRange: ['0%', '8%', '14%', '0%'],
    duration: 22,
  },
  {
    // Deep navy (logo shadow) — anchors the lower-left with depth
    color: 'rgba(4, 78, 115, 0.40)',
    size: 620,
    left: '-6%',
    top: '55%',
    xRange: ['0%', '10%', '-8%', '0%'],
    yRange: ['0%', '-6%', '8%', '0%'],
    duration: 26,
  },
  {
    // Amber accent — warm counterpoint on the right
    color: 'rgba(249, 115, 22, 0.32)',
    size: 580,
    left: '65%',
    top: '-12%',
    xRange: ['0%', '-10%', '6%', '0%'],
    yRange: ['0%', '8%', '-4%', '0%'],
    duration: 28,
  },
  {
    // Secondary brand blue — fills the right side behind the dashboard,
    // lower opacity so the dashboard frame still pops
    color: 'rgba(11, 158, 222, 0.38)',
    size: 660,
    left: '55%',
    top: '40%',
    xRange: ['0%', '-8%', '10%', '0%'],
    yRange: ['0%', '10%', '-6%', '0%'],
    duration: 24,
  },
  {
    // Success green — small accent in the lower mid, ties to brand palette
    color: 'rgba(22, 163, 74, 0.22)',
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

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base wash — a near-white surface fade so blobs blend against
          something slightly warmer than pure surface, lifting them out */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 247, 237, 0.5) 100%)',
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
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 65%)`,
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

      {/* Faint dot grid — technical texture, masked to fade at edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(11, 158, 222, 0.18) 1px, transparent 1.4px)',
          backgroundSize: '36px 36px',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 50%, black 25%, transparent 95%)',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 50%, black 25%, transparent 95%)',
          opacity: 0.6,
        }}
      />

      {/* Top + bottom soft vignettes — anchor the hero edges and give
          subtle vertical depth without darkening the surface */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.7) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
