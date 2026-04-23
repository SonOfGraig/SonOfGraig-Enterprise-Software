'use client';

import { Check } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export function ComplianceStrip() {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full bg-[var(--sg-surface)] border-y border-[var(--sg-border)] py-[var(--sp-5)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex justify-center items-center gap-[var(--sp-8)] flex-wrap"
        >
          {[
            'SOC 2 Type II (in progress)',
            'POPIA compliant',
            'EU AI Act ready',
            'Data stays in South Africa',
            'AWS af-south-1 region',
            'ZAR pricing -- no FX risk'
          ].map((item, i) => (
            <motion.div variants={child} key={i} className="flex items-center gap-[var(--sp-2)] font-sans text-[12px] font-medium text-[var(--sg-text-4)]">
              <div className="w-[16px] h-[16px] rounded-full bg-[var(--sg-success-bg)] flex items-center justify-center shrink-0">
                <Check size={8} strokeWidth={2} aria-hidden="true" className="text-[var(--sg-success)]" />
              </div>
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
