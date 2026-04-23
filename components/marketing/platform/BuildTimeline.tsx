'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function BuildTimeline() {
  const reduced = useReducedMotion();

  const entries = [
    {
      date: 'Now',
      active: true,
      title: 'Services + platform design',
      desc: 'Delivering projects. Designing the platform architecture. Accepting founding customer applications.'
    },
    {
      date: 'Q3 2026',
      active: false,
      title: 'RAG Studio -- early access',
      desc: 'First product ships to pilot customers. Connect documents, get cited AI answers. Heavily discounted for early access members.'
    },
    {
      date: 'Q4 2026',
      active: false,
      title: 'Agent Builder -- beta',
      desc: 'Visual canvas for building and deploying autonomous AI agents. Multi-agent orchestration. Full execution trace logging.'
    },
    {
      date: 'Q1 2027',
      active: false,
      title: 'Governance Hub + Fine-Tuning Ops',
      desc: 'Automated bias audits, POPIA compliance reporting, and custom model training on enterprise data.'
    },
    {
      date: '2027+',
      active: false,
      title: 'Full platform -- all 5 clusters',
      desc: 'Cloud & DevOps Suite, Data & Analytics OS, Creative & XR Studio, and Dev Platform join the AI core.'
    }
  ];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const entryVariant: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariant: Variants = {
    hidden: { scale: reduced ? 1 : 0 },
    visible: { scale: 1, transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] } },
  };

  const contentVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="w-full py-[var(--sp-16)]">
      <div className="max-w-[800px] mx-auto px-8">
        
        <div className="text-center mb-[var(--sp-12)]">
          <div className="text-label text-[var(--sg-text-4)] mb-2">BUILD TIMELINE</div>
          <h2 className="text-h2 text-[var(--sg-text-1)]">What ships, and when.</h2>
        </div>

        <motion.div 
          className="flex flex-col"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {entries.map((entry, i) => (
            <motion.div 
              key={i} 
              variants={entryVariant}
              className="grid grid-cols-[100px_40px_1fr] sm:grid-cols-[120px_40px_1fr]"
            >
              {/* Date column */}
              <motion.div variants={contentVariant} className="font-sans text-[12px] font-semibold text-[var(--sg-blue)] text-right pt-[18px] pr-4">
                {entry.date}
              </motion.div>

              {/* Dot column */}
              <div className="flex flex-col items-center pt-4">
                <motion.div 
                  variants={dotVariant}
                  className={`w-[14px] h-[14px] rounded-full shrink-0 ${
                    entry.active ? 'bg-[var(--sg-blue)]' : 'bg-[var(--sg-border-str)]'
                  }`} 
                />
                {i < entries.length - 1 && (
                  <div className="w-[2px] bg-[var(--sg-border)] flex-1 min-h-[24px] mt-2 mb-2" />
                )}
              </div>

              {/* Content column */}
              <motion.div variants={contentVariant} className="pb-[var(--sp-6)] pl-[var(--sp-4)] pt-[14px]">
                <h3 className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)] mb-1">
                  {entry.title}
                </h3>
                <p className="font-sans text-[13px] text-[var(--sg-text-3)] leading-[1.6]">
                  {entry.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
