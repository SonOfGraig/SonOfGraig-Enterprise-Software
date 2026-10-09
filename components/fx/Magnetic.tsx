'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

// Ported from the 2026 agency site (MagneticButton.tsx), reduced to the
// behaviour itself: the child drifts a little toward the pointer and springs
// back. Styling stays with the wrapped Button, so the design system owns it.
export function Magnetic({ children, strength = 0.18 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 160, damping: 15, mass: 0.5 });

  if (reduced) return <div className="inline-flex">{children}</div>;

  return (
    <motion.div
      ref={ref}
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
