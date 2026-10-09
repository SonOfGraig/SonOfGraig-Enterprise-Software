'use client';

import { motion, useReducedMotion } from 'framer-motion';

// The one scroll-in motion for below-the-fold content: fade + 20px rise,
// ease-out, once. Use `delay` (seconds) to stagger items in a grid.
// Above-the-fold content uses the CSS .reveal-up class instead, so it paints
// before hydration.
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  blur = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'article';
  /** The 2026 site's card entrance: resolve out of a 12px blur from 40px below. */
  blur?: boolean;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : blur ? { opacity: 0, y: 40, filter: 'blur(12px)' } : { opacity: 0, y: 20 }}
      whileInView={blur ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: blur ? 0.9 : 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
