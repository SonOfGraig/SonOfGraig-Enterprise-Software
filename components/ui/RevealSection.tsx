'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import React from 'react';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,   // 80ms between each child
      delayChildren: 0.05,     // 50ms before first child
    },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.section>
  );
}

export const revealVariants = {
  container,
  child,
};
