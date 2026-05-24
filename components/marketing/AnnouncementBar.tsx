'use client';

import Link from 'next/link';
import { DismissButton } from './DismissButton';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function AnnouncementBar() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      id="announcement-bar"
      initial={{ y: reduced ? 0 : '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#0D1117] min-h-[40px] py-2 flex items-center justify-center px-8 sm:px-12 relative"
    >
      <div className="flex items-start sm:items-center gap-2 text-left sm:text-center max-w-[90%]">
        <div className="w-[6px] h-[6px] rounded-full bg-[var(--sg-amber)] mt-1.5 sm:mt-0 flex-shrink-0" />
        <span className="font-sans text-[12px] sm:text-[13px] font-medium text-[rgba(255,255,255,0.85)] leading-snug">
          Transitioning to enterprise software. Services live now. First product, RAG Studio, ships Q4 2026.{' '}
          <Link href="/roadmap" className="font-semibold whitespace-nowrap text-white hover:text-white underline underline-offset-4 decoration-[rgba(255,255,255,0.3)] hover:decoration-white transition-colors sm:ml-1">
            Learn more &rarr;
          </Link>
        </span>
      </div>
      <DismissButton />
    </motion.div>
  );
}
