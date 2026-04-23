'use client';

import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section 
      className="pt-[var(--sp-20)] pb-[var(--sp-16)]"
      style={{
        backgroundColor: 'var(--sg-surface)',
        backgroundImage: 'radial-gradient(ellipse 120% 80% at 0% 0%, rgba(11,158,222,.15) 0%, transparent 50%), radial-gradient(ellipse 100% 90% at 100% 100%, rgba(249,115,22,.1) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 50% 50%, rgba(22,163,74,.08) 0%, transparent 60%)'
      }}
    >
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        
        {/* EYEBROW PILL */}
        <motion.div 
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-[var(--sp-2)] bg-[var(--sg-surface)] border border-[var(--sg-border-md)] rounded-[var(--r-full)] px-[12px] py-[5px] max-w-full"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[var(--sg-blue)] shrink-0" />
          <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-[var(--sg-text-3)] uppercase tracking-[0.08em] leading-[1.2] text-left">
            TRANSITIONING FROM SERVICES TO SOFTWARE
          </span>
        </motion.div>

        {/* H1 HEADLINE */}
        <motion.h1 
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-h1 max-w-[720px] mx-auto mt-6 text-[var(--sg-text-1)]"
        >
          We built the expertise.<br />
          Now we are building the <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#0B9EDE] to-[#38BDF8]">platform.</span>
        </motion.h1>

        {/* SUBHEADING */}
        <motion.p 
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-body-lg text-[var(--sg-text-3)] max-w-[560px] mx-auto mt-[var(--sp-6)]"
        >
          SonOfGraig has delivered enterprise AI, cloud, and data solutions for years. We are now converting that expertise into Africa&apos;s first enterprise AI platform — services today, software tomorrow.
        </motion.p>

        {/* CTA ROW */}
        <motion.div 
          initial={{ opacity: 0, y: reduced ? 0 : 8, scale: reduced ? 1 : 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-[var(--sp-3)] mt-[var(--sp-10)]"
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto text-center justify-center" asChild>
            <Link href="/contact">Work with us now</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-center justify-center" asChild>
            <Link href="/platform">See what we are building</Link>
          </Button>
        </motion.div>

        {/* TRUST PILLS ROW */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.45,
                staggerChildren: 0.05,
              },
            },
          }}
          className="flex justify-center gap-y-4 gap-x-6 sm:gap-x-[var(--sp-8)] flex-wrap mt-[var(--sp-10)]"
        >
          {[
            'South African company',
            'POPIA-native by design',
            'ZAR pricing, no FX risk',
            'Enterprise delivery track record',
          ].map((item) => (
            <motion.div 
              key={item} 
              variants={{
                hidden: { opacity: 0, y: reduced ? 0 : 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex items-center gap-[var(--sp-2)] font-sans text-[12px] font-medium text-[var(--sg-text-4)]"
            >
              <div className="w-[14px] h-[14px] rounded-full bg-[var(--sg-success-bg)] flex items-center justify-center">
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
