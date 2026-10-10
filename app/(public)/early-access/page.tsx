import type { Metadata } from 'next';
import { Check, CircleCheck, CircleX, FileSignature, Handshake, MessagesSquare, Rocket, Send, Slack, Users } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Timeline } from '@/components/ui/Timeline';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { EarlyAccessForm } from '@/components/marketing/early-access/EarlyAccessForm';
import { faqPageJsonLd, OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Early Access — sonofgraig | AI Dev Platform',
  description:
    'Early access to the AI Dev Platform is open: a direct line to the founder, a real say in the roadmap and guided onboarding. Pricing agreed with you, in rand.',
  alternates: { canonical: '/early-access' },
  openGraph: { images: OG_IMAGES, title: 'Early access — sonofgraig', description: 'Early access to the AI Dev Platform is open.', type: 'website', url: '/early-access', locale: 'en_ZA' },
  robots: ROBOTS_INDEX,
};

// Founder decision 2026-10-10: no slot limit and no published discount.
// Early access is simply open; pricing is agreed per customer, in rand.

const BENEFITS = [
  { icon: Users, eyebrow: 'Influence', title: 'Your use case shapes the roadmap', body: 'A regular roadmap call with the founder. What ships first is what solves your problems first — we will say in writing what we will and will not build.' },
  { icon: Slack, eyebrow: 'Access', title: 'A direct line to the founder', body: 'A shared channel with Tumiso, who built the first version of every module. Not a customer-success proxy.' },
  { icon: Handshake, eyebrow: 'Onboarding', title: 'Set up with you, not for you', body: 'A guided onboarding session with an engineer, on your documents and your integrations — so the first answers you see are useful ones.' },
];

const INCLUDES: [string, string][] = [
  ['Account contact', 'The founder, directly'],
  ['Roadmap input', 'Regular call, direct say in priorities'],
  ['Onboarding', 'Guided session with an engineer'],
  ['Pricing', 'Agreed with you, in rand — no FX exposure'],
  ['Security & POPIA controls', 'The same as every customer — no concessions'],
  ['Data Processing Agreement', 'Included; your legal team can mark it up'],
];

const FIT = ['A South African mid-market or larger organisation', 'A real production use case, not a sandbox', 'POPIA is a board-level concern', 'A champion at director level or above', 'Teams that engage with software, not buzzwords'];
const NOT_FIT = ['You need a finished, generally available product now', 'You need SOC 2 Type II certification today — we do not hold it', 'Price is the only criterion', 'You cannot make time for roadmap calls'];

const STEPS = [
  { when: 'Day 1', title: 'Submit the application', body: 'It goes straight to the founder, not an intake queue. A confirmation email arrives within minutes.', icon: <Send /> },
  { when: 'Within a week', title: 'Discovery call', body: '45 minutes on fit, integrations, POPIA exposure and success criteria. NDA first if you want one. We will say so if it is not the right fit.', icon: <MessagesSquare /> },
  { when: 'Next', title: 'Agreement', body: 'Scope, rand pricing and the Data Processing Agreement, agreed together. Your legal team marks it up.', icon: <FileSignature /> },
  { when: 'Then', title: 'Onboarded and live', body: 'Your environment is provisioned, a guided onboarding session runs with an engineer, and your direct channel with the founder opens.', icon: <Rocket /> },
];

const FAQS: FAQItem[] = [
  { q: 'The product is not generally available — why start now?', a: 'You get the people building it, and your requirements shape what ships first. Early access is a working relationship, not a finished product — and we will be straight about what exists today.' },
  { q: 'How much does it cost?', a: 'Pricing is agreed with each early-access customer, in rand, based on your use case and scale. We discuss it on the discovery call, before you commit to anything.' },
  { q: 'Is there a limit on places?', a: 'No fixed number. We take on organisations where the fit is right and we can give each one proper attention.' },
  { q: 'Who are the other early-access customers?', a: 'We never disclose customers without their explicit consent — not even by sector. References can be arranged under NDA after a discovery call.' },
  { q: 'Is there a DPA?', a: 'Yes. Every customer signs our standard Data Processing Agreement covering processing activities, lawful basis, security controls, sub-processors and transfer mechanisms. Your legal team can mark it up.' },
  { q: 'What is the support commitment?', a: 'A direct channel to the founder. Messages are answered within two business days, and security reports within one business day. Specifics go in your agreement.' },
  { q: 'What if sonofgraig fails or is acquired?', a: 'Your agreement includes a data-export clause: a defined window to export all your data. The build is funded by services revenue, not venture capital.' },
];

export default function EarlyAccessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/early-access', FAQS)) }} />
      <PageHero
        scene="templatesLattice"
        eyebrow="AI Dev Platform · Early access"
        title="Early access is open."
        accent="Help shape the platform."
        lead="Work with the people building the AI Dev Platform: a direct line to the founder, a real say in what ships next, and onboarding on your own data."
        primary={{ label: 'Apply for early access', href: '#apply' }}
        secondary={{ label: 'Talk to a person first', href: '/contact?topic=sales' }}
      >
        <div className="mx-auto max-w-[460px]">
          <Card variant="glass" padding="lg" className="text-left">
            <div className="relative z-[2]">
              <p className="text-label text-[var(--sg-blue)]">What early access includes</p>
              <ul className="mt-[var(--sp-4)] space-y-[var(--sp-2)]">
                {['A direct line to the founder', 'A real say in the roadmap', 'Guided onboarding on your data', 'Pricing agreed with you, in rand'].map((x) => (
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
        <SectionHeader eyebrow="What you get" title="Built around how you work." />
        <div className="grid gap-[var(--sp-4)] md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} blur className="h-full">
              <FeatureCard icon={b.icon} eyebrow={b.eyebrow} title={b.title} body={b.body} index={`0${i + 1}`} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider background="dotMatrix">
        <SectionHeader eyebrow="The details" title="What early access includes." />
        <Reveal>
          <Card padding="none" className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left">
              <tbody>
                {INCLUDES.map(([f, v]) => (
                  <tr key={f} className="border-b border-[var(--sg-border)] last:border-0 transition-colors hover:bg-[var(--sg-surface-2)]">
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body font-medium text-[var(--sg-text-1)]">{f}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-2)]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider background="artifactsLattice">
        <SectionHeader eyebrow="Who it suits" title="Chosen by fit." description="We look for use cases that will make the platform better for everyone after you." />
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
        <SectionHeader eyebrow="How it works" title="From application to onboarding." align="center" />
        <Timeline items={STEPS} />
      </Section>

      <Section id="apply" tone="base" spacing="lg" divider background="spatialDisplacement">
        <div className="grid gap-[var(--sp-8)] lg:grid-cols-[1.5fr_1fr]">
          <Reveal blur>
            <Card padding="lg">
              <p className="text-label text-[var(--sg-blue)]">Apply</p>
              <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Early-access application.</h2>
              <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] mb-[var(--sp-8)]">It goes directly to the founder. You will hear back within two business days, whatever the outcome.</p>
              <EarlyAccessForm />
            </Card>
          </Reveal>
          <div className="space-y-[var(--sp-4)]">
            <Reveal delay={0.1} blur>
              <Card padding="lg" className="border-l-2 border-l-[var(--sg-blue)]">
                <blockquote className="font-display text-[18px] leading-[1.5] tracking-[-0.01em] text-[var(--sg-text-1)]">
                  “We would rather build with a few teams properly than with many badly.”
                </blockquote>
                <p className="font-mono text-[12px] text-[var(--sg-text-4)] mt-[var(--sp-4)]">— Tumiso Graig Ramaboya, founder</p>
              </Card>
            </Reveal>
            <Reveal delay={0.16} blur>
              <Card padding="lg">
                <h3 className="text-h3 text-[var(--sg-text-1)]">Already working with us?</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">
                  Mention your services engagement in the use-case field — it helps us pick up where the project left off.
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
        body="A 30-minute conversation will tell you honestly whether early access, a services engagement or simply waiting is right for you."
        primary={{ label: 'Talk to us', href: '/contact?topic=sales' }}
        secondary={{ label: 'See the platform', href: '/platform/ai-dev-platform' }}
      />
    </>
  );
}
