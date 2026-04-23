'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function PlatformHero() {
  const reduced = useReducedMotion();

  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        
        {/* Eyebrow pill */}
        <motion.div 
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-[var(--sp-2)] bg-[var(--sg-surface)] border border-[var(--sg-border-md)] rounded-[var(--r-full)] px-[12px] py-[5px]"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[var(--sg-amber)]" />
          <span className="font-sans text-[11px] font-semibold text-[var(--sg-text-3)] uppercase tracking-[0.08em]">
            IN DEVELOPMENT -- LAUNCHING 2026
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1 
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-h1 max-w-[720px] mx-auto mt-6 text-[var(--sg-text-1)]"
        >
          The SonOfGraig platform{' '}
          <motion.span 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-clip-text text-transparent bg-gradient-to-br from-[#0B9EDE] to-[#38BDF8] inline-block"
          >
            is being built.
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-body-lg text-[var(--sg-text-3)] max-w-[560px] mx-auto mt-[var(--sp-6)]"
        >
          We are building Africa&apos;s first enterprise AI platform -- converting our 18 service capabilities into 5 SaaS product clusters. We are telling you this openly because we want to build it with the right people alongside us.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center gap-[var(--sp-3)] mt-[var(--sp-10)]"
        >
          <Button variant="primary" size="lg" asChild>
            <Link href="/early-access">Join early access</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="#clusters">Explore the clusters</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
