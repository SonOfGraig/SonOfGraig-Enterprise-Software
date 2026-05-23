'use client';

import { motion, useReducedMotion } from 'framer-motion';

const BLOBS = [
  {
    color: 'rgba(11, 158, 222, 0.38)',
    size: 920,
    style: { left: '-12%', top: '-18%' },
    animate: { x: ['0%', '14%', '-6%', '0%'], y: ['0%', '8%', '18%', '0%'] },
    duration: 28,
  },
  {
    color: 'rgba(249, 115, 22, 0.24)',
    size: 760,
    style: { right: '-8%', bottom: '-18%' },
    animate: { x: ['0%', '-12%', '8%', '0%'], y: ['0%', '-8%', '4%', '0%'] },
    duration: 34,
  },
  {
    color: 'rgba(22, 163, 74, 0.18)',
    size: 680,
    style: { left: '38%', top: '22%' },
    animate: { x: ['0%', '16%', '-18%', '0%'], y: ['0%', '14%', '12%', '0%'] },
    duration: 38,
  },
  {
    color: 'rgba(11, 158, 222, 0.20)',
    size: 560,
    style: { left: '55%', bottom: '-14%' },
    animate: { x: ['0%', '-16%', '8%', '0%'], y: ['0%', '10%', '-12%', '0%'] },
    duration: 30,
  },
];

export function LiquidIntelligenceBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ backgroundColor: 'var(--sg-surface)' }}
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(72px)',
            ...blob.style,
          }}
          animate={reduced ? undefined : blob.animate}
          transition={
            reduced
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: i * 1.2,
                }
          }
        />
      ))}

      {/* Subtle film grain — adds the "intelligence" texture without noise */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
