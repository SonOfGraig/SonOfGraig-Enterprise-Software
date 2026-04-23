'use client';

import { RevealSection, revealVariants } from '@/components/ui/RevealSection';
import { motion } from 'framer-motion';

export function LogosBar() {
  return (
    <div className="w-full bg-[var(--sg-surface)] border-y border-[var(--sg-border)] py-[var(--sp-8)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="font-sans text-[11px] font-semibold text-[var(--sg-text-4)] uppercase tracking-[0.1em] text-center mb-[var(--sp-5)]">
          TRUSTED BY FORWARD-THINKING SOUTH AFRICAN ORGANISATIONS
        </div>
        <RevealSection className="flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
          {[
            'STANDARD BANK',
            'DISCOVERY',
            'NASPERS',
            'VODACOM',
            'SARS',
            'WOOLWORTHS'
          ].map((logo) => (
            <motion.div 
              key={logo} 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-display font-semibold text-[13px] text-[var(--sg-surface-3)] opacity-40 grayscale"
            >
              {logo}
            </motion.div>
          ))}
        </RevealSection>
      </div>
    </div>
  );
}
