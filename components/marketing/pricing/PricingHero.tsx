'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function PricingHero() {
  const [isAnnual, setIsAnnual] = useState(false);
  const reduced = useReducedMotion();

  return (
    <section className="pt-[var(--sp-16)] pb-[var(--sp-10)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="text-label text-[var(--sg-blue)] mb-2"
        >
          PRICING
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-h1 text-[var(--sg-text-1)] mb-4"
        >
          Transparent ZAR pricing. No surprises.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[480px] mx-auto mb-[var(--sp-8)]"
        >
          Start free, scale as you grow. All plans include SOC 2 Type II and POPIA compliance documentation.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, x: reduced ? 0 : 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <span className={`font-sans text-[14px] font-medium ${!isAnnual ? 'text-[var(--sg-text-1)]' : 'text-[var(--sg-text-3)]'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 rounded-full bg-[var(--sg-surface-3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sg-blue)]"
            aria-label="Toggle billing period"
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-[var(--sg-blue)] transition-transform duration-200 ease-out ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`font-sans text-[14px] font-medium flex items-center gap-2 ${isAnnual ? 'text-[var(--sg-text-1)]' : 'text-[var(--sg-text-3)]'}`}>
            Annual
            <Badge variant="amber">-20%</Badge>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
