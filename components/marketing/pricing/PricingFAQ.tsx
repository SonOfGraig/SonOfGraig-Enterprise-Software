'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RevealSection, revealVariants } from '@/components/ui/RevealSection';
import { motion } from 'framer-motion';

export function PricingFAQ() {
  const faqs = [
    {
      q: 'When will the platform be available?',
      a: 'The platform is currently in active development. We anticipate launching RAG Studio to early access customers in Q4 2026, followed by Agent Builder in Q1 2027.'
    },
    {
      q: 'What currencies do you accept?',
      a: 'We bill exclusively in South African Rand (ZAR) to protect our local customers from foreign exchange volatility. Enterprise customers may request USD billing if preferred.'
    },
    {
      q: 'What is included in the early access programme?',
      a: 'Early access customers receive a significant discount on their first year, direct access to our product team, and the ability to influence the product roadmap.'
    },
    {
      q: 'Do you offer a free trial?',
      a: 'We will offer a 14-day free trial on the Starter and Growth plans once the platform reaches general availability. For early access, we provide guided pilot programmes.'
    },
    {
      q: 'What does POPIA compliance mean for our data?',
      a: 'It means our infrastructure, data processing agreements, and security controls are designed specifically to meet the requirements of the Protection of Personal Information Act. We provide documentation to support your own compliance audits.'
    },
    {
      q: 'Can we keep our data in South Africa?',
      a: 'Yes. Our default deployment region is AWS af-south-1 (Cape Town). Enterprise customers can also opt for on-premises deployment or specific data residency guarantees.'
    },
    {
      q: 'What happens to our service projects when the platform ships?',
      a: 'If we build a custom solution for you today, it is designed using the same architecture as our future platform. When the platform ships, your solution can be seamlessly migrated, and you will receive platform founding credits.'
    },
    {
      q: 'Is there a long-term contract?',
      a: 'Starter and Growth plans are available on month-to-month or annual terms (with a 20% discount). Enterprise plans typically require an annual commitment.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-[var(--sp-16)]">
      <div className="max-w-[800px] mx-auto px-8">
        <h2 className="text-h2 text-[var(--sg-text-1)] mb-[var(--sp-8)] text-center">Frequently asked questions</h2>
        
        <RevealSection className="border-t border-[var(--sg-border)]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div variants={revealVariants.child} key={i} className="border-b border-[var(--sg-border)]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center py-[var(--sp-5)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sg-blue)] rounded-sm"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={16} 
                    strokeWidth={1.5} 
                    className={`text-[var(--sg-text-4)] shrink-0 transition-transform duration-[250ms] ease-[var(--ease-out)] ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className="grid transition-all duration-[250ms] ease-[var(--ease-out)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="font-sans text-[14px] text-[var(--sg-text-3)] leading-[1.65] pb-[var(--sp-5)] pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </RevealSection>
      </div>
    </section>
  );
}
