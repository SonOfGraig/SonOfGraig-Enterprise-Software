'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// Design system v3.1 — ported from the 2026 agency site's ChronosTimeline.tsx.
// A centre rail fills with brand blue as the section scrolls past; cards slide
// in from alternating sides; each node rings once as it enters.
// Content rule: past and present only — never future ship dates.

export type TimelineItem = {
  when: string;
  title: string;
  body: string;
  /** A rendered icon element, e.g. <Flag />. (Elements, not components:
   *  this is a client component and component functions can't cross the
   *  server → client boundary.) Sized by the tile. */
  icon: ReactNode;
  /** Marks the present-tense entry ("Now"). */
  current?: boolean;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      {/* rail + scroll-linked fill */}
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-5 md:left-1/2 w-px -translate-x-1/2 bg-[var(--sg-border-md)]" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : fill, originY: 0 }}
        className="absolute top-0 bottom-0 left-5 md:left-1/2 w-[2px] -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--sg-blue),var(--sg-blue-dim))]"
      />

      {items.map((item, i) => {
        const right = i % 2 === 1;
        return (
          <li key={item.title} className="relative grid md:grid-cols-2 gap-[var(--sp-6)] md:gap-[var(--sp-16)] pl-14 md:pl-0 pb-[var(--sp-12)] last:pb-0">
            {/* node */}
            <motion.span
              aria-hidden="true"
              initial={reduced ? false : { scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-30% 0px' }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10 grid place-items-center size-10 rounded-full bg-[var(--sg-bg)] border-2 border-[var(--sg-blue)] shadow-[0_0_0_6px_var(--sg-blue-glow)]"
            >
              <span className={cn('size-2.5 rounded-full bg-[var(--sg-blue)]', item.current && 'animate-pulse-dot')} />
              {!reduced && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-[var(--sg-blue)]"
                  initial={{ scale: 1, opacity: 0.6 }}
                  whileInView={{ scale: 2.2, opacity: 0 }}
                  viewport={{ once: true, margin: '-30% 0px' }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                />
              )}
            </motion.span>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: right ? 48 : -48, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={cn('group', right ? 'md:col-start-2' : 'md:col-start-1 md:text-right')}
            >
              <div className="relative overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] p-[var(--sp-8)] transition-[border-color,box-shadow] duration-500 hover:border-[var(--sg-blue-border)] hover:shadow-[var(--shadow-lift-md)]">
                {/* the original's faint scanlines */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,var(--sg-blue-glow)_50%)] bg-[length:100%_8px] opacity-40" />
                <div className={cn('relative flex items-start justify-between gap-4', !right && 'md:flex-row-reverse')}>
                  <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] text-[var(--sg-blue)] [&>svg]:size-[22px] [&>svg]:stroke-[1.75] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[13px] text-[var(--sg-text-3)]">{item.when}</span>
                </div>
                <h3 className="relative text-h3 text-[var(--sg-text-1)] mt-[var(--sp-6)] transition-colors group-hover:text-[var(--sg-blue)]">{item.title}</h3>
                <p className="relative text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">{item.body}</p>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
