'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function ProcessSection() {
  const reduced = useReducedMotion();

  const steps = [
    {
      title: 'Discovery call',
      desc: '30-minute scoping session. We diagnose the challenge and recommend the right approach.'
    },
    {
      title: 'Proposal & scope',
      desc: 'Fixed-scope proposal with defined deliverables, timeline, and price. No surprises.'
    },
    {
      title: 'Build & deliver',
      desc: 'We build. You get weekly updates. Final delivery includes full handover documentation.'
    },
    {
      title: 'Platform credit',
      desc: 'Your project becomes a platform template. You receive free early access when the software ships.'
    }
  ];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const stepVariant: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariant: Variants = {
    hidden: { scale: reduced ? 1 : 0 },
    visible: { scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  const textVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="w-full bg-[var(--sg-surface)] py-[var(--sp-16)] border-y border-[var(--sg-border)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-center mb-[var(--sp-12)]">
          <h2 className="text-h2 text-[var(--sg-text-1)]">How we work</h2>
        </div>

        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden md:block absolute top-[20px] left-[5%] right-[5%] h-[1px] bg-[var(--sg-border-md)]" />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={stepVariant} className="flex flex-col items-center text-center">
                <motion.div variants={circleVariant} className="w-[40px] h-[40px] rounded-full bg-[var(--sg-blue)] text-[var(--sg-text-inv)] font-display font-bold text-[16px] flex items-center justify-center mb-6 shadow-[0_0_0_8px_var(--sg-surface)]">
                  {i + 1}
                </motion.div>
                <motion.div variants={textVariant}>
                  <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">{step.title}</h3>
                  <p className="text-caption text-[var(--sg-text-3)] max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
