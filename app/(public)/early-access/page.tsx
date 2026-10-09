import type { Metadata } from 'next';
import { Check, CircleCheck, CircleX, FileSignature, MessagesSquare, Rocket, Send, Slack, TrendingDown, Users } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Timeline } from '@/components/ui/Timeline';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { EarlyAccessForm } from '@/components/marketing/early-access/EarlyAccessForm';
import { faqPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Early Access — sonofgraig | Founding Customer Programme',
  description:
    'Five founding-customer slots for the AI Dev Platform: 70% off year one on Growth (R5,999/month instead of R19,999), direct access to the founder and a say in the roadmap.',
  alternates: { canonical: '/early-access' },
  openGraph: { title: 'Early access — sonofgraig', description: 'Five founding slots. One platform you shape.', type: 'website', url: '/early-access', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

// Offer terms are the founder's. Removed from the legacy page (2026-10-09):
// dated programme timeline, slot/waitlist counters, SOC 2 dates, af-south-1
// residency claims, and the "two slots taken" FAQ that contradicted the hero.

const BENEFITS = [
  { icon: Users, eyebrow: 'Influence', title: 'Your use case shapes the roadmap', body: 'A quarterly roadmap call with the founder. What ships first is what solves your problems first — we will say in writing what we will and will not build.' },
  { icon: Slack, eyebrow: 'Access', title: 'A direct line to the founder', body: 'A shared Slack Connect channel with Tumiso, who built the first version of every module. Not a customer-success proxy.' },
  { icon: TrendingDown, eyebrow: 'Economics', title: '70% off year one, locked after', body: 'R5,999/month on Growth instead of R19,999 in year one, then 50% off (R9,999/month) locked for years two and three.' },
];

const COMPARE: [string, string, string][] = [
  ['Year-one Growth pricing', 'R19,999 / month', 'R5,999 / month · 70% off'],
  ['Years two and three', 'Standard list', 'R9,999 / month · 50% off, locked'],
  ['Account contact', 'Customer success team', 'The founder · Slack Connect'],
  ['Roadmap input', 'Customer surveys', 'Quarterly call, direct say'],
  ['Onboarding', 'Self-serve', 'Guided session with an engineer'],
  ['Service-fee credit', 'Not available', 'First 3 months credited'],
  ['Year-one commitment', '12 months', 'Month-to-month, no penalty'],
  ['Security & POPIA controls', 'Full', 'Identical — no concessions'],
];

const FIT = ['A South African mid-market or larger organisation', 'A real production use case, not a sandbox', 'POPIA is a board-level concern', 'A champion at director level or above', 'Teams that engage with software, not buzzwords'];
const NOT_FIT = ['You need a finished, generally available product now', 'You need SOC 2 Type II certification today — we do not hold it', 'Price is the only criterion', 'You cannot commit to quarterly roadmap calls'];

const STEPS = [
  { when: 'Day 1', title: 'Submit the application', body: 'It goes straight to the founder, not an intake queue. A confirmation email arrives within minutes.', icon: <Send /> },
  { when: 'Days 2–5', title: 'Discovery call', body: '45 minutes on fit, integrations, POPIA exposure and success criteria. NDA first if you want one. We will say so if it is not the right fit.', icon: <MessagesSquare /> },
  { when: 'Days 5–9', title: 'Founding agreement', body: 'Rand pricing locked, year-one cancel-anytime, three-year price protection and an optional case-study clause. Your legal team marks it up.', icon: <FileSignature /> },
  { when: 'Then', title: 'Onboarded and live', body: 'Your environment is provisioned, a guided onboarding session runs with the founder, and the Slack Connect channel opens.', icon: <Rocket /> },
];

const FAQS: FAQItem[] = [
  { q: 'The product is not generally available — why commit now?', a: 'You are committing to a founding relationship, not a finished product: 70% off year one, direct access to the people building it, and your requirements shaping the roadmap. Year one is month-to-month with no cancellation penalty, so the risk is time, not money.' },
  { q: 'What if we want to cancel in year one?', a: 'Year one is month-to-month with no penalty. From year two the standard 12-month commitment applies, at the locked 50% discount through year three, with 60 days’ notice of any change after that.' },
  { q: 'What is the actual saving?', a: 'Growth is R19,999/month. Founding customers pay R5,999/month in year one (R168,000 saved) and R9,999/month in years two and three (a further R240,000) — about R408,000 over three years, before any service-fee credit.' },
  { q: 'Can a services engagement convert?', a: 'Yes. If you have an active or recent sonofgraig service engagement, its implementation fee credits against your first three months of subscription. Mention it in the use-case field.' },
  { q: 'Who are the other founding customers?', a: 'We never disclose founding customers without their explicit consent — not even by sector. References can be arranged under NDA after a discovery call.' },
  { q: 'Is there a DPA?', a: 'Yes. Every founding customer signs our standard Data Processing Agreement covering processing activities, lawful basis, security controls, sub-processors and transfer mechanisms. Your legal team can mark it up.' },
  { q: 'What is the support commitment?', a: 'The founder, via Slack Connect, with critical issues typically answered within an hour in South African business hours and security incidents around the clock. It is written into your founding agreement.' },
  { q: 'What if sonofgraig fails or is acquired?', a: 'The founding agreement includes a data-export and runtime-egress clause: a defined window to export all your data and self-host. The build is funded by services revenue, not venture capital.' },
];

export default function EarlyAccessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/early-access', FAQS)) }} />
      <PageHero
        scene="templatesLattice"
        eyebrow="Founding customer programme"
        title="Five founding slots."
        accent="One platform you shape."
        lead="Five South African organisations get to be the ones the AI Dev Platform is built around: steep founding pricing, a direct line to the founder and a real say in what ships next."
        primary={{ label: 'Apply for a founding slot', href: '#apply' }}
        secondary={{ label: 'Talk to a person first', href: '/contact?topic=sales' }}
      >
        <div className="mx-auto max-w-[460px]">
          <Card variant="glass" padding="lg" className="text-left">
            <div className="relative z-[2]">
              <p className="text-label text-[var(--sg-blue)]">Founding pricing · Growth tier, year one</p>
              <p className="mt-[var(--sp-3)] flex items-baseline gap-[var(--sp-3)]">
                <span className="font-mono text-[15px] text-[var(--sg-text-4)] line-through">R19,999</span>
                <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.04em] text-[var(--sg-text-1)]">R5,999</span>
                <span className="text-body text-[var(--sg-text-3)]">/ month</span>
              </p>
              <ul className="mt-[var(--sp-5)] space-y-[var(--sp-2)]">
                {['70% off year one, month-to-month', '50% off locked for years two and three', 'Direct Slack Connect with the founder'].map((x) => (
                  <li key={x} className="flex items-center gap-[var(--sp-2)] text-body text-[var(--sg-text-2)]">
                    <Check size={15} aria-hidden="true" className="text-[var(--sg-blue)]" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </PageHero>

      <Section tone="base" spacing="lg" background="componentsLattice">
        <SectionHeader eyebrow="What founding customers get" title="Three benefits worth more than the discount." />
        <div className="grid gap-[var(--sp-4)] md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} blur className="h-full">
              <FeatureCard icon={b.icon} eyebrow={b.eyebrow} title={b.title} body={b.body} index={`0${i + 1}`} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider background="dotMatrix">
        <SectionHeader eyebrow="Founding vs standard" title="Same platform. Different relationship." />
        <Reveal>
          <Card padding="none" className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-[var(--sg-border)]">
                  <th className="px-[var(--sp-6)] py-[var(--sp-4)] text-label text-[var(--sg-text-4)]">Feature</th>
                  <th className="px-[var(--sp-6)] py-[var(--sp-4)] text-label text-[var(--sg-text-4)]">Standard</th>
                  <th className="px-[var(--sp-6)] py-[var(--sp-4)] text-label text-[var(--sg-blue)]">Founding</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([f, s, fd]) => (
                  <tr key={f} className="border-b border-[var(--sg-border)] last:border-0 transition-colors hover:bg-[var(--sg-surface-2)]">
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body font-medium text-[var(--sg-text-1)]">{f}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-3)]">{s}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body font-medium text-[var(--sg-text-1)]">{fd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider background="artifactsLattice">
        <SectionHeader eyebrow="Who qualifies" title="Five slots, awarded by fit." description="Not by application order. We look for use cases that will make the platform better for everyone after you." />
        <div className="grid gap-[var(--sp-4)] md:grid-cols-2">
          {[
            { title: 'Strong fit', items: FIT, icon: CircleCheck, tone: 'text-[var(--sg-success)]' },
            { title: 'Probably better elsewhere', items: NOT_FIT, icon: CircleX, tone: 'text-[var(--sg-text-4)]' },
          ].map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1} blur className="h-full">
              <Card padding="lg" className="h-full">
                <h3 className="text-h3 text-[var(--sg-text-1)]">{col.title}</h3>
                <ul className="mt-[var(--sp-6)] space-y-[var(--sp-3)]">
                  {col.items.map((x) => (
                    <li key={x} className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                      <col.icon size={16} aria-hidden="true" className={`mt-0.5 shrink-0 ${col.tone}`} /> {x}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider background="temporalFlux">
        <SectionHeader eyebrow="Application process" title="Four steps, about two weeks." align="center" />
        <Timeline items={STEPS} />
      </Section>

      <Section id="apply" tone="base" spacing="lg" divider background="spatialDisplacement">
        <div className="grid gap-[var(--sp-8)] lg:grid-cols-[1.5fr_1fr]">
          <Reveal blur>
            <Card padding="lg">
              <p className="text-label text-[var(--sg-blue)]">Apply</p>
              <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Founding-customer application.</h2>
              <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] mb-[var(--sp-8)]">It goes directly to the founder. You will hear back within two business days, whatever the outcome.</p>
              <EarlyAccessForm />
            </Card>
          </Reveal>
          <div className="space-y-[var(--sp-4)]">
            <Reveal delay={0.1} blur>
              <Card padding="lg" className="border-l-2 border-l-[var(--sg-blue)]">
                <blockquote className="font-display text-[18px] leading-[1.5] tracking-[-0.01em] text-[var(--sg-text-1)]">
                  “Five is enough to learn from. More would dilute the conversation.”
                </blockquote>
                <p className="font-mono text-[12px] text-[var(--sg-text-4)] mt-[var(--sp-4)]">— Tumiso Graig Ramaboya, founder</p>
              </Card>
            </Reveal>
            <Reveal delay={0.16} blur>
              <Card padding="lg">
                <h3 className="text-h3 text-[var(--sg-text-1)]">Already working with us?</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">
                  An active or recent services engagement credits against your first three months. Mention it in the use-case field.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow" background="acousticWaves">
        <SectionHeader eyebrow="Questions" title="What procurement, legal and finance ask first." align="center" />
        <Reveal>
          <FAQ items={FAQS} />
        </Reveal>
      </Section>

      <CTABand
        eyebrow="Not sure it fits?"
        title="Talk to a person before you apply."
        body="A 30-minute conversation will tell you honestly whether the founding programme, a services engagement or simply waiting is right for you."
        primary={{ label: 'Talk to us', href: '/contact?topic=sales' }}
        secondary={{ label: 'See the platform', href: '/platform/ai-dev-platform' }}
      />
    </>
  );
}
