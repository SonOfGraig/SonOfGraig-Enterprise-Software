'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// Tier prices are the founder's (effective April 2026). Inclusions describe
// the AI Dev Platform — the only product in build — instead of the legacy
// "1 / 3 / all 5 clusters". Annual billing: 20% off, per the legacy page.
// Amber is permitted here (01-color: pricing / premium contexts).

type Tier = {
  name: string;
  monthly: number | null;
  blurb: string;
  cta: { label: string; href: string };
  featured?: boolean;
  includes: string[];
  excludes?: string[];
  note?: string;
};

const TIERS: Tier[] = [
  {
    name: 'Starter',
    monthly: 4999,
    blurb: 'For teams piloting enterprise AI on real data.',
    cta: { label: 'Talk to us', href: '/contact?topic=sales' },
    includes: ['RAG Studio', '5 seats', '50 GB document storage', '500K tokens / month', 'PII scrubbing and audit log', 'Email support · 2 business days'],
    excludes: ['SSO / SAML', 'Custom SLA'],
    note: 'Add-ons: seats R400/month · storage R200 per 10 GB · tokens R80 per 100K.',
  },
  {
    name: 'Growth',
    monthly: 19999,
    blurb: 'For enterprises running AI in production.',
    cta: { label: 'Apply as a founding customer', href: '/early-access' },
    featured: true,
    includes: ['Every AI Dev Platform module as it ships', '25 seats', '500 GB document storage', '5M tokens / month', 'SSO — Entra ID, Okta, Google', 'Priority support · 4-hour response', 'Exportable POPIA reports', 'API access and webhooks'],
    note: 'Founding customers: R5,999/month in year one. By application.',
  },
  {
    name: 'Enterprise',
    monthly: null,
    blurb: 'Custom contracts for large organisations.',
    cta: { label: 'Contact sales', href: '/contact?topic=sales' },
    includes: ['Everything in Growth', 'Further clusters as they launch', 'Unlimited seats', 'Dedicated, isolated infrastructure', 'On-premises option', 'Named contact · 1-hour response', 'Bespoke DPA'],
  },
];

const fmt = (n: number) => `R${n.toLocaleString('en-ZA').replace(/ |\s/g, ',')}`;

export function PricingTiers() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div role="radiogroup" aria-label="Billing period" className="mx-auto flex w-fit rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface-2)] p-1 shadow-[inset_0_1px_2px_rgba(13,17,23,.06)]">
        {[
          { v: false, label: 'Monthly' },
          { v: true, label: 'Annual · save 20%' },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={annual === o.v}
            onClick={() => setAnnual(o.v)}
            className={cn('rounded-full px-5 py-2 font-sans text-[13px] font-medium transition-colors', annual === o.v ? 'btn-raised-primary' : 'text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]')}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-[var(--sp-10)] grid items-stretch gap-[var(--sp-4)] lg:grid-cols-3">
        {TIERS.map((t, i) => {
          const price = t.monthly == null ? null : annual ? Math.round(t.monthly * 0.8) : t.monthly;
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Card
                padding="lg"
                className={cn(
                  'pricing-card relative flex h-full flex-col',
                  t.featured && 'border-[var(--sg-amber)] shadow-[0_18px_48px_-18px_rgba(249,115,22,.45)] lg:-translate-y-2',
                )}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-[var(--sp-8)] rounded-full bg-[var(--sg-amber)] px-3 py-1 text-label text-white shadow-sm">Most popular</span>
                )}
                <h3 className="text-h3 text-[var(--sg-text-1)]">{t.name}</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-2)]">{t.blurb}</p>
                <div className="mt-[var(--sp-6)] flex h-14 items-baseline gap-2">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${t.name}-${annual}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-[44px] font-extrabold leading-none tracking-[-0.04em] text-[var(--sg-text-1)]"
                    >
                      {price == null ? 'Custom' : fmt(price)}
                    </motion.span>
                  </AnimatePresence>
                  {price != null && <span className="text-body text-[var(--sg-text-3)]">/ month</span>}
                </div>
                <p className="font-mono text-[11px] text-[var(--sg-text-4)]">
                  {price == null ? 'Annual contract · negotiated in ZAR' : annual ? 'Billed annually · ZAR' : 'Billed monthly · ZAR'}
                </p>
                <Button variant={t.featured ? 'primary' : 'secondary'} size="lg" className="mt-[var(--sp-6)] w-full rounded-full" asChild>
                  <Link href={t.cta.href}>{t.cta.label}</Link>
                </Button>
                <ul className="mt-[var(--sp-8)] flex-1 space-y-[var(--sp-3)] border-t border-[var(--sg-border)] pt-[var(--sp-6)]">
                  {t.includes.map((x) => (
                    <li key={x} className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--sg-blue)]" /> {x}
                    </li>
                  ))}
                  {t.excludes?.map((x) => (
                    <li key={x} className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-4)]">
                      <Minus size={16} aria-hidden="true" className="mt-0.5 shrink-0" /> {x}
                    </li>
                  ))}
                </ul>
                {t.note && <p className="mt-[var(--sp-6)] rounded-[var(--r-lg)] bg-[var(--sg-surface-2)] px-[var(--sp-4)] py-[var(--sp-3)] text-[12px] text-[var(--sg-text-3)]">{t.note}</p>}
              </Card>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-[var(--sp-6)] text-center font-mono text-[11px] text-[var(--sg-text-4)]">Prices effective April 2026, reviewed annually. Annual pricing is locked for the contract term.</p>
    </div>
  );
}
