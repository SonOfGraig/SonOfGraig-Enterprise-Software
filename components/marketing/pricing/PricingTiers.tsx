'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// Founder decision 2026-10-10: platform prices are not published during early
// access — each plan is quoted in rand on a call. The plans still show what
// differs between them. Support lines match the published response times
// (two business days); no hour-level SLAs until they can be honoured.
// Amber is permitted here (01-color: pricing / premium contexts).

type Tier = {
  name: string;
  blurb: string;
  cta: { label: string; href: string };
  featured?: boolean;
  includes: string[];
  excludes?: string[];
};

const TIERS: Tier[] = [
  {
    name: 'Starter',
    blurb: 'For teams piloting enterprise AI on real data.',
    cta: { label: 'Get a quote', href: '/contact?topic=sales' },
    includes: ['RAG Studio', '5 seats', '50 GB document storage', '500K tokens / month', 'PII scrubbing and audit log', 'Email support · 2 business days'],
    excludes: ['SSO / SAML', 'Custom SLA'],
  },
  {
    name: 'Growth',
    blurb: 'For enterprises running AI in production.',
    cta: { label: 'Apply for early access', href: '/early-access' },
    featured: true,
    includes: ['Every AI Dev Platform module as it ships', '25 seats', '500 GB document storage', '5M tokens / month', 'SSO — Entra ID, Okta, Google', 'Priority support', 'Exportable POPIA reports', 'API access and webhooks'],
  },
  {
    name: 'Enterprise',
    blurb: 'Custom contracts for large organisations.',
    cta: { label: 'Contact sales', href: '/contact?topic=sales' },
    includes: ['Everything in Growth', 'Further clusters as they launch', 'Unlimited seats', 'Dedicated, isolated infrastructure', 'On-premises option', 'Named contact', 'Bespoke DPA'],
  },
];

export function PricingTiers() {
  return (
    <div>
      <div className="grid items-stretch gap-[var(--sp-4)] lg:grid-cols-3">
        {TIERS.map((t, i) => (
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
                <span className="absolute -top-3 left-[var(--sp-8)] rounded-full bg-[var(--sg-amber)] px-3 py-1 text-label text-white shadow-sm">Early access</span>
              )}
              <h3 className="text-h3 text-[var(--sg-text-1)]">{t.name}</h3>
              <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-2)]">{t.blurb}</p>
              <div className="mt-[var(--sp-6)] flex h-14 items-baseline">
                <span className="font-display text-[34px] font-extrabold leading-none tracking-[-0.04em] text-[var(--sg-text-1)]">Quoted in rand</span>
              </div>
              <p className="font-mono text-[11px] text-[var(--sg-text-4)]">Agreed on a call · no FX exposure</p>
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
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="mt-[var(--sp-6)] text-center font-mono text-[11px] text-[var(--sg-text-4)]">Platform pricing is agreed with each early-access customer. Fixed-scope service prices are published below.</p>
    </div>
  );
}
