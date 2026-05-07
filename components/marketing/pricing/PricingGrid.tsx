'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function PricingGrid() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const starterVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const growthVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: reduced ? 1 : [0.95, 1.03, 1],
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const badgeVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const enterpriseVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-4)]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          
          {/* STARTER */}
          <motion.div variants={starterVariant} className="pricing-card bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col">
            <div className="font-sans text-[18px] font-semibold text-[var(--sg-text-1)] mb-2">Starter</div>
            <div className="mb-4">
              <span className="font-display font-semibold text-[36px] text-[var(--sg-text-1)] tracking-[-0.03em]">R4,999</span>
              <span className="font-sans text-[13px] text-[var(--sg-text-4)]">/month</span>
            </div>
            <p className="font-sans text-[13px] text-[var(--sg-text-3)] mb-6 h-10">
              Agent Builder + RAG Studio. Up to 5 users.
            </p>
            
            <ul className="space-y-3 mb-8 flex-1">
              {[
                'Agent Builder unlimited agents',
                'RAG Studio 5 knowledge bases',
                '1M tokens/month',
                '5 team seats',
                'SOC 2 + POPIA documentation',
                'Community support'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-[13px] text-[var(--sg-text-2)]">
                  <Check size={14} strokeWidth={1.5} aria-hidden="true" className="text-[var(--sg-success)] shrink-0 mt-[2px]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button variant="secondary" size="md" fullWidth asChild>
              <Link href="/early-access">Join waitlist</Link>
            </Button>
          </motion.div>

          {/* GROWTH */}
          <motion.div variants={growthVariant} className="pricing-card growth bg-[var(--sg-bg)] border-2 border-[var(--sg-blue)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col relative mt-4 md:mt-0">
            <motion.div variants={badgeVariant} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Badge variant="blue" className="px-3 py-1 tracking-wider uppercase">Most popular</Badge>
            </motion.div>
            <div className="font-sans text-[18px] font-semibold text-[var(--sg-text-1)] mb-2">Growth</div>
            <div className="mb-4">
              <span className="font-display font-semibold text-[36px] text-[var(--sg-text-1)] tracking-[-0.03em]">R19,999</span>
              <span className="font-sans text-[13px] text-[var(--sg-text-4)]">/month</span>
            </div>
            <p className="font-sans text-[13px] text-[var(--sg-text-3)] mb-6 h-10">
              All 4 products. Up to 25 users.
            </p>
            
            <ul className="space-y-3 mb-8 flex-1">
              {[
                'All 4 products',
                'Governance Hub included',
                '10M tokens/month',
                '25 team seats',
                'Priority support 8hr SLA',
                '99.9% uptime SLA'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-[13px] text-[var(--sg-text-2)]">
                  <Check size={14} strokeWidth={1.5} aria-hidden="true" className="text-[var(--sg-success)] shrink-0 mt-[2px]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button variant="primary" size="md" fullWidth asChild>
              <Link href="/early-access">Join waitlist</Link>
            </Button>
          </motion.div>

          {/* ENTERPRISE */}
          <motion.div variants={enterpriseVariant} className="pricing-card bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col mt-4 md:mt-0">
            <div className="font-sans text-[18px] font-semibold text-[var(--sg-text-1)] mb-2">Enterprise</div>
            <div className="mb-4">
              <span className="font-display font-semibold text-[24px] text-[var(--sg-text-1)] leading-[42px]">Custom</span>
            </div>
            <p className="font-sans text-[13px] text-[var(--sg-text-3)] mb-6 h-10">
              Unlimited users. Custom SLAs. Data residency. On-premises option.
            </p>
            
            <ul className="space-y-3 mb-8 flex-1">
              {[
                'All platform clusters',
                'BYOK encryption',
                'Data residency guarantee',
                '24/7 dedicated support + CSM',
                'On-premises deployment',
                'SLA up to 99.95%'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-[13px] text-[var(--sg-text-2)]">
                  <Check size={14} strokeWidth={1.5} aria-hidden="true" className="text-[var(--sg-success)] shrink-0 mt-[2px]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button variant="cta" size="md" fullWidth asChild>
              <Link href="/contact">Talk to sales</Link>
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
