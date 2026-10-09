'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ExplainerVideo } from '@/components/marketing/_shared/ExplainerVideo';
import { explainerSources } from '@/lib/assets';
import { cn } from '@/lib/utils';

// Design system v3.1 — a raised segmented control (same tactile language as
// the theme toggle) switching between explainer videos. Auto-advances while
// in view with a progress bar under the active tab; any click stops the
// auto-advance. Reduced motion: no auto-advance, instant switch.

export type VideoTab = { label: string; video: string; caption: string; blurb: string };

export function VideoTabs({ tabs, interval = 9000 }: { tabs: VideoTab[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const reduced = useReducedMotion();
  const running = auto && inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % tabs.length), interval);
    return () => clearTimeout(t);
  }, [running, active, interval, tabs.length]);

  const tab = tabs[active];

  return (
    <div ref={ref}>
      <div role="tablist" aria-label="Platform modules" className="mx-auto flex w-fit max-w-full overflow-x-auto rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface-2)] p-1 shadow-[inset_0_1px_2px_rgba(13,17,23,.06)]">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="video-tab-panel"
            onClick={() => {
              setActive(i);
              setAuto(false);
            }}
            className={cn(
              'relative whitespace-nowrap rounded-full px-4 sm:px-5 py-2 font-sans text-[13px] font-medium transition-colors duration-200',
              i === active ? 'btn-raised-primary' : 'text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]',
            )}
          >
            {t.label}
            {i === active && running && (
              <motion.span
                key={`${active}-progress`}
                aria-hidden="true"
                className="absolute left-3 right-3 bottom-1 h-[2px] origin-left rounded-full bg-white/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: interval / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      <div id="video-tab-panel" role="tabpanel" className="mt-[var(--sp-8)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.video}
            initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExplainerVideo light={explainerSources(tab.video)} dark={explainerSources(`${tab.video}-dark`)} caption={tab.caption} />
            <p className="text-body-lg text-[var(--sg-text-3)] text-center max-w-[620px] mx-auto mt-[var(--sp-6)]">{tab.blurb}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
