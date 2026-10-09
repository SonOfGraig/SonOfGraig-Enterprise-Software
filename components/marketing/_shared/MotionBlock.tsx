'use client';

import { motion } from 'framer-motion';
import { ExplainerVideo } from './ExplainerVideo';

type SourceSet = {
  light: { mp4: string; webm?: string; poster: string };
  dark?: { mp4: string; webm?: string; poster: string };
  caption: string;
};

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  sources: SourceSet;
  /** When true, place video on the left instead of right. */
  reverse?: boolean;
};

export function MotionBlock({ eyebrow, title, body, sources, reverse = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-[var(--sp-8)] items-center ${
        reverse ? 'lg:[direction:rtl]' : ''
      }`}
    >
      <div className={`lg:col-span-5 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
        <div className="text-label text-[var(--sg-blue)] mb-[var(--sp-2)]">{eyebrow}</div>
        <h3 className="text-h3 text-[var(--sg-text-1)] mb-[var(--sp-3)]">{title}</h3>
        <p className="text-body text-[var(--sg-text-3)] max-w-[440px]">{body}</p>
      </div>
      <div className={`lg:col-span-7 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
        <ExplainerVideo
          light={sources.light}
          dark={sources.dark}
          caption={sources.caption}
          aspectRatio={16 / 9}
        />
      </div>
    </motion.div>
  );
}
