'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function CTASection() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full bg-[#0D1117] py-[var(--sp-20)] text-center">
      <motion.div 
        className="max-w-[1080px] mx-auto px-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        
        <motion.h2 variants={child} className="text-h1 text-white max-w-[640px] mx-auto">
          Build enterprise AI in Africa. With the team building the platform.
        </motion.h2>

        <motion.p variants={child} className="font-sans text-[16px] text-[rgba(255,255,255,0.5)] max-w-[440px] mx-auto mt-[var(--sp-4)] mb-[var(--sp-8)]">
          Start a project now or join the waitlist for the platform. Either way, your work shapes what we build.
        </motion.p>

        <motion.div variants={child} className="flex justify-center gap-[var(--sp-3)]">
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-[#0D1117] hover:bg-white/90"
            asChild
          >
            <Link href="/contact">Start a project</Link>
          </Button>
          <Button variant="cta" size="lg" asChild>
            <Link href="/early-access">Join early access</Link>
          </Button>
        </motion.div>

      </motion.div>
    </section>
  );
}
