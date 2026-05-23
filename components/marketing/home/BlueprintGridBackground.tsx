'use client';

import { motion, useReducedMotion } from 'framer-motion';

const VW = 1440;
const VH = 800;

// Major grid lines — these draw in on mount with a stagger
const MAJOR_VERTICALS = [180, 360, 540, 720, 900, 1080, 1260];
const MAJOR_HORIZONTALS = [160, 320, 480, 640];

// One subtle perspective stroke from each top corner — adds depth without
// breaking the rectilinear blueprint feel
const PERSPECTIVES: Array<{ x1: number; y1: number; x2: number; y2: number }> = [
  { x1: 0, y1: 0, x2: VW / 2, y2: VH },
  { x1: VW, y1: 0, x2: VW / 2, y2: VH },
];

type Stroke = { x1: number; y1: number; x2: number; y2: number; kind: 'major' | 'perspective' };

const STROKES: Stroke[] = [
  ...MAJOR_VERTICALS.map((x) => ({ x1: x, y1: 0, x2: x, y2: VH, kind: 'major' as const })),
  ...MAJOR_HORIZONTALS.map((y) => ({ x1: 0, y1: y, x2: VW, y2: y, kind: 'major' as const })),
  ...PERSPECTIVES.map((p) => ({ ...p, kind: 'perspective' as const })),
];

// Small construction-marker crosses at a few intersections — pure SVG, static
const MARKERS: Array<{ x: number; y: number }> = [
  { x: 360, y: 160 },
  { x: 720, y: 320 },
  { x: 1080, y: 480 },
  { x: 540, y: 480 },
  { x: 1260, y: 160 },
];

const MARKER_SIZE = 6;

export function BlueprintGridBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Fine CSS grid — tight, low-opacity, masked to fade at edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(11, 158, 222, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 158, 222, 0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage:
            'radial-gradient(ellipse 95% 80% at 50% 50%, black 35%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 95% 80% at 50% 50%, black 35%, transparent 100%)',
        }}
      />

      {/* Major grid + perspective accents — animated self-draw */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 90% at 50% 45%, black 40%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 100% 90% at 50% 45%, black 40%, transparent 100%)',
        }}
      >
        {STROKES.map((s, i) => (
          <motion.path
            key={i}
            d={`M ${s.x1} ${s.y1} L ${s.x2} ${s.y2}`}
            stroke={
              s.kind === 'major'
                ? 'rgba(11, 158, 222, 0.22)'
                : 'rgba(11, 158, 222, 0.10)'
            }
            strokeWidth={s.kind === 'major' ? 1 : 0.75}
            fill="none"
            initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 1.4,
              delay: reduced ? 0 : i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Construction markers — small crosses at key intersections */}
        {MARKERS.map((m, i) => (
          <motion.g
            key={`m-${i}`}
            initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 1.6 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <line
              x1={m.x - MARKER_SIZE}
              y1={m.y}
              x2={m.x + MARKER_SIZE}
              y2={m.y}
              stroke="rgba(11, 158, 222, 0.45)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={m.x}
              y1={m.y - MARKER_SIZE}
              x2={m.x}
              y2={m.y + MARKER_SIZE}
              stroke="rgba(11, 158, 222, 0.45)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
