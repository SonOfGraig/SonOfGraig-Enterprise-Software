'use client';

import { Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { RevealSection, revealVariants } from '@/components/ui/RevealSection';
import { motion } from 'framer-motion';

export function TransitionExplainer() {
  return (
    <section className="w-full bg-[var(--sg-surface)] py-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        
        <div className="text-label text-[var(--sg-blue)] mb-2">WHERE WE ARE NOW</div>
        <h2 className="text-h1 text-[var(--sg-text-1)] mb-[var(--sp-8)]">The transition, explained honestly</h2>

        {/* CALLOUT */}
        <motion.div 
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="status" 
          className="bg-[var(--sg-warn-bg)] border border-[var(--sg-warn-bd)] rounded-[var(--r-lg)] p-[var(--sp-5)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <Info size={20} strokeWidth={1.5} className="text-[var(--sg-amber)] shrink-0 mt-1" />
            <div>
              <div className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)] mb-1">Building in public</div>
              <p className="font-sans text-[13px] text-[var(--sg-text-2)] max-w-[600px] leading-relaxed">
                Our first product, RAG Studio, is in active development. We are not a SaaS company yet. We are a services firm with a clear software roadmap. Every project we deliver today adds IP to the platform we are building. Services fund the build.
              </p>
            </div>
          </div>
          <Button variant="cta" size="md" className="shrink-0" asChild>
            <Link href="/early-access">Join early access</Link>
          </Button>
        </motion.div>

        {/* PHASE CARDS */}
        <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-4)] mt-[var(--sp-8)]">
          
          {/* Phase 1 */}
          <motion.div variants={revealVariants.child}>
            <Link href="/platform" className="block group h-full">
              <div className="h-full bg-[rgba(11,158,222,0.03)] border border-[var(--sg-blue-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer">
                <div className="text-label text-[var(--sg-blue)] mb-3">PHASE 1 -- NOW</div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">Services + platform vision</h3>
                <p className="text-body text-[var(--sg-text-3)]">
                  We deliver expert AI, cloud, and data implementation projects. Every engagement adds domain expertise and architectural patterns to our future platform. Revenue funds the product build.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Phase 2 */}
          <motion.div variants={revealVariants.child}>
            <Link href="/platform" className="block group h-full">
              <div className="h-full bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer">
                <div className="text-label text-[var(--sg-text-4)] mb-3">PHASE 2 -- Q4 2026</div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">Early access software</h3>
                <p className="text-body text-[var(--sg-text-3)]">
                  RAG Studio ships to early access customers. Agent Builder enters beta. Services and software revenue run in parallel.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Phase 3 */}
          <motion.div variants={revealVariants.child}>
            <Link href="/platform" className="block group h-full">
              <div className="h-full bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer">
                <div className="text-label text-[var(--sg-text-4)] mb-3">PHASE 3 -- 2027</div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">Platform company</h3>
                <p className="text-body text-[var(--sg-text-3)]">
                  Recurring software revenue exceeds services. SonOfGraig operates as a full SaaS platform with professional services as an enterprise add-on.
                </p>
              </div>
            </Link>
          </motion.div>

        </RevealSection>

      </div>
    </section>
  );
}
