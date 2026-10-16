'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SceneBackground } from '@/components/fx/SceneBackground';
import { WordReveal } from '@/components/fx/WordReveal';
import { Magnetic } from '@/components/fx/Magnetic';
import { AIDevHeroCard } from './AIDevHeroCard';

// Entrance animations are CSS (.reveal-up / .reveal-word) so the hero paints
// before hydration. JS is only used for the scroll-linked tilt of the frame.
const delay = (s: number) => ({ animationDelay: `${s}s` });

export function HeroSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // The card tilts up out of the page as you start to scroll.
  const tilt = useTransform(scrollYProgress, [0, 0.45], [reduced ? 0 : 14, 0]);
  const lift = useTransform(scrollYProgress, [0, 0.45], [reduced ? 0 : 40, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden grain" style={{ background: 'var(--sg-bg)' }}>
      {/* Founder's pick (2026-10-17): the layered waves from the platform page's
          "How it is funded" section, as the home hero's ground. */}
      <SceneBackground scene="acousticWaves" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--sg-bg) 85%)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 pt-[clamp(56px,12vh,128px)] pb-[var(--sp-20)] flex flex-col items-center text-center">
        <div className="reveal-up">
          <Link
            href="/early-access"
            className="liquid-glass inline-flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1.5 font-sans text-[12px] font-medium text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] transition-colors"
          >
            <span className="relative z-[2] rounded-full bg-[var(--sg-blue)] text-white px-2 py-0.5 text-[11px]">AI Dev Platform</span>
            <span className="relative z-[2]">Early access is open</span>
            <ArrowRight size={13} aria-hidden="true" className="relative z-[2]" />
          </Link>
        </div>

        <h1 data-speakable="hero-headline" className="text-hero text-[var(--sg-text-1)] mt-8 max-w-[18ch] text-balance">
          <WordReveal text="Enterprise AI you can trust." delay={0.15} className="block" />{' '}
          <WordReveal text="Every answer traced." delay={0.5} wordClassName="shimmer-text" className="block" />
        </h1>

        <p
          data-speakable="hero-body"
          className="reveal-up font-sans text-[17px] md:text-[19px] leading-[1.6] text-[var(--sg-text-3)] mt-6 max-w-[620px] text-balance"
          style={delay(0.75)}
        >
          The AI Dev Platform brings RAG Studio, Agent Builder and governance together. Every answer cites its
          source and every agent step is logged. Built in South Africa, designed around POPIA.
        </p>

        <div className="reveal-up flex flex-col sm:flex-row items-center gap-3 mt-9 w-full sm:w-auto" style={delay(0.9)}>
          <Magnetic>
            <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
              <Link href="/early-access">Join early access</Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
              <Link href="/contact">Talk to us about a project</Link>
            </Button>
          </Magnetic>
        </div>

        <div
          className="reveal-up w-full mt-16 [perspective:1600px]"
          style={{ ...delay(1.05), ['--reveal-distance' as string]: '48px', animationDuration: '1.1s' }}
        >
          <motion.div style={{ rotateX: tilt, y: lift }} className="origin-top">
            <AIDevHeroCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
