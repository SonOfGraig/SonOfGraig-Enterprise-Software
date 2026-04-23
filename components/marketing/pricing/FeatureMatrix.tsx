'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function FeatureMatrix() {
  const reduced = useReducedMotion();

  const groups = [
    {
      name: 'Platform',
      features: [
        { name: 'Agent Builder', starter: true, growth: true, enterprise: true },
        { name: 'RAG Studio', starter: true, growth: true, enterprise: true },
        { name: 'Governance Hub', starter: false, growth: true, enterprise: true },
        { name: 'Cloud & DevOps Suite', starter: false, growth: false, enterprise: true },
        { name: 'Data & Analytics OS', starter: false, growth: false, enterprise: true },
      ]
    },
    {
      name: 'AI Dev',
      features: [
        { name: 'Tokens per month', starter: '1M', growth: '10M', enterprise: 'Custom' },
        { name: 'Knowledge bases', starter: '5', growth: '25', enterprise: 'Unlimited' },
        { name: 'Custom models', starter: false, growth: false, enterprise: true },
        { name: 'Execution trace logging', starter: '7 days', growth: '30 days', enterprise: 'Unlimited' },
      ]
    },
    {
      name: 'Compliance',
      features: [
        { name: 'SOC 2 Type II docs', starter: true, growth: true, enterprise: true },
        { name: 'POPIA docs', starter: true, growth: true, enterprise: true },
        { name: 'EU AI Act ready', starter: false, growth: true, enterprise: true },
        { name: 'Data residency', starter: false, growth: false, enterprise: 'South Africa' },
      ]
    },
    {
      name: 'Support & Infrastructure',
      features: [
        { name: 'Team seats', starter: '5', growth: '25', enterprise: 'Unlimited' },
        { name: 'Support level', starter: 'Community', growth: 'Priority (8hr SLA)', enterprise: '24/7 Dedicated' },
        { name: 'Uptime SLA', starter: 'Best effort', growth: '99.9%', enterprise: '99.95%' },
        { name: 'On-premises deployment', starter: false, growth: false, enterprise: true },
      ]
    }
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={16} strokeWidth={1.5} className="text-[var(--sg-success)] mx-auto" />
      ) : (
        <X size={16} strokeWidth={1.5} className="text-[var(--sg-text-4)] mx-auto" />
      );
    }
    return <span className="font-sans text-[13px] text-[var(--sg-text-2)] text-center block">{value}</span>;
  };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const rowVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full py-[var(--sp-16)] bg-[var(--sg-surface)] border-y border-[var(--sg-border)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <h2 className="text-h3 text-[var(--sg-text-1)] mb-[var(--sp-8)]">Full feature comparison</h2>
        
        <div className="w-full overflow-x-auto">
          <motion.table 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="w-full border-collapse min-w-[800px]"
          >
            <thead>
              <tr className="border-b border-[var(--sg-border)]">
                <th className="text-left py-4 px-4 font-sans text-[13px] font-semibold text-[var(--sg-text-1)] w-[40%]">Feature</th>
                <th className="text-center py-4 px-4 font-sans text-[13px] font-semibold text-[var(--sg-text-1)] w-[20%]">Starter</th>
                <th className="text-center py-4 px-4 font-sans text-[13px] font-semibold text-[var(--sg-text-1)] w-[20%]">Growth</th>
                <th className="text-center py-4 px-4 font-sans text-[13px] font-semibold text-[var(--sg-text-1)] w-[20%]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, i) => (
                <React.Fragment key={i}>
                  <motion.tr variants={rowVariant} className="bg-[var(--sg-surface-2)] sticky top-[64px] z-[var(--z-sticky)]">
                    <td colSpan={4} className="py-2 px-4 font-sans text-[11px] font-semibold text-[var(--sg-text-4)] uppercase tracking-wider">
                      {group.name}
                    </td>
                  </motion.tr>
                  {group.features.map((feature, j) => (
                    <motion.tr variants={rowVariant} key={j} className="border-b border-[var(--sg-border)] hover:bg-[var(--sg-surface-2)] transition-colors">
                      <td className="py-4 px-4 font-sans text-[13px] text-[var(--sg-text-1)]">{feature.name}</td>
                      <td className="py-4 px-4">{renderCell(feature.starter)}</td>
                      <td className="py-4 px-4">{renderCell(feature.growth)}</td>
                      <td className="py-4 px-4">{renderCell(feature.enterprise)}</td>
                    </motion.tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </section>
  );
}
