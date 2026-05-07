'use client';

import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { RevealSection, revealVariants } from '@/components/ui/RevealSection';
import { motion } from 'framer-motion';

export function PricingPreview() {
  return (
    <section className="w-full py-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        
        <div className="text-label text-[var(--sg-text-4)] mb-2">PRICING -- AVAILABLE FROM Q3 2026</div>
        <h2 className="text-h2 text-[var(--sg-text-1)] mb-3">Transparent ZAR pricing. No surprises.</h2>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto">
          Join the waitlist. Early access customers receive the first year significantly discounted.
        </p>

        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-4)] text-left mt-[var(--sp-12)]">
          
          {/* STARTER */}
          <motion.div variants={revealVariants.child} className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col">
            <div className="font-sans text-[18px] font-semibold text-[var(--sg-text-1)] mb-2">Starter</div>
            <div className="mb-4">
              <span className="font-display font-semibold text-[36px] text-[var(--sg-text-1)]">R4,999</span>
              <span className="font-sans text-[14px] text-[var(--sg-text-3)]">/month</span>
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
          <motion.div variants={revealVariants.child} className="bg-[var(--sg-bg)] border-2 border-[var(--sg-blue-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--sg-blue)] text-[var(--sg-text-inv)] font-sans text-[10px] font-semibold px-3 py-1 rounded-[var(--r-full)] tracking-wider">
              MOST POPULAR
            </div>
            <div className="font-sans text-[18px] font-semibold text-[var(--sg-text-1)] mb-2">Growth</div>
            <div className="mb-4">
              <span className="font-display font-semibold text-[36px] text-[var(--sg-text-1)]">R19,999</span>
              <span className="font-sans text-[14px] text-[var(--sg-text-3)]">/month</span>
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
          <motion.div variants={revealVariants.child} className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col">
            <div className="font-sans text-[18px] font-semibold text-[var(--sg-text-1)] mb-2">Enterprise</div>
            <div className="mb-4">
              <span className="font-display font-semibold text-[26px] text-[var(--sg-text-1)] leading-[42px]">Custom</span>
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

        </RevealSection>

      </div>
    </section>
  );
}
