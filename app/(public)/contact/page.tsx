import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRight, Briefcase, Clock, FileCheck2, Handshake, LifeBuoy, Mail, MailCheck, MapPin, MessagesSquare, PhoneCall,
  Route, ShieldAlert, ShieldCheck, UserCheck,
} from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Timeline } from '@/components/ui/Timeline';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { ContactForm } from '@/components/marketing/contact/ContactForm';
import { faqPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact — sonofgraig | Talk to a person, not a pipeline',
  description:
    'Six routes to a named person at sonofgraig: sales, support, security disclosure, POPIA, partnerships and careers. Pretoria-based team, published response times.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact sonofgraig', description: 'Talk to a person, not a sales pipeline.', type: 'website', url: '/contact', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

const ROUTES = [
  { icon: Briefcase, path: '01 · Procurement', title: 'Sales & subscriptions', sla: '2 business days', email: 'sales@sonofgraig.com', body: 'Early access, service engagements, fixed-scope quotes, B-BBEE and supplier on-boarding documents, ZAR invoicing.' },
  { icon: LifeBuoy, path: '02 · Customer success', title: 'Technical support', sla: '8 business hours', email: 'info@sonofgraig.com', body: 'For active customers and engagements: bugs, retrieval issues, ingestion errors, billing and account changes.' },
  { icon: ShieldAlert, path: '03 · Critical', title: 'Security disclosure', sla: '1 hour, 24/7', email: 'tumiso@sonofgraig.com', body: 'Vulnerability reports, suspected breaches and abuse. We credit good-faith research and do not retaliate against it.' },
  { icon: ShieldCheck, path: '04 · POPIA & legal', title: 'Information Officer', sla: '10 business days', email: 'tumiso@sonofgraig.com', body: 'Data subject access requests, complaints, consent withdrawal, PAIA requests and DPA queries.' },
  { icon: Handshake, path: '05 · Channel', title: 'Partnerships & press', sla: '5 business days', email: 'sales@sonofgraig.com', body: 'Implementation partners, integrations, resellers, and analyst or press enquiries.' },
  { icon: UserCheck, path: '06 · Build with us', title: 'Careers', sla: '5 business days', email: 'info@sonofgraig.com', body: 'Senior engineers and AI specialists. Pretoria-based with hybrid options, paid competitively in rand.' },
];

const INBOXES = [
  ['Sales & subscriptions', 'sales@sonofgraig.com'],
  ['Customer support', 'info@sonofgraig.com'],
  ['Security disclosure', 'tumiso@sonofgraig.com'],
  ['POPIA Information Officer', 'tumiso@sonofgraig.com'],
  ['Partnerships', 'sales@sonofgraig.com'],
  ['Press & analysts', 'tumiso@sonofgraig.com'],
  ['Billing & invoices', 'info@sonofgraig.com'],
  ['General enquiries', 'info@sonofgraig.com'],
];

const HOURS = [
  ['Monday – Thursday', '08:00 – 17:30'],
  ['Friday', '08:00 – 16:00'],
  ['Saturday', 'By appointment'],
  ['Sunday & SA public holidays', 'Closed'],
];

const STEPS = [
  { when: 'Immediately', title: 'Confirmation', body: 'An automated email confirms we have your message, with a copy of what you sent.', icon: <MailCheck /> },
  { when: 'Same day', title: 'Triage and routing', body: 'A person reads it and routes it to the right specialist. We only ask for clarification if routing is ambiguous.', icon: <Route /> },
  { when: 'Per the SLA', title: 'A specialist responds', body: 'A named person replies with substance — a proposed scope, a document, an answer.', icon: <MessagesSquare /> },
  { when: 'If relevant', title: 'Discovery call', body: 'For sales and services, a 30-minute call to confirm fit and timing. No obligation, no pricing pressure.', icon: <PhoneCall /> },
];

// Corrected from the legacy page: no claims that form data is stored in
// af-south-1 — the form is emailed via Resend (a US-based sub-processor).
const FAQS: FAQItem[] = [
  { q: 'Will I be added to a marketing sequence?', a: 'No. Your enquiry goes to the specialist for that topic and the conversation runs as long as it needs to. You only receive the newsletter if you tick the box, and you can unsubscribe with one click.' },
  { q: 'Can we sign an NDA first?', a: 'Yes. We can send our standard mutual NDA, or sign yours. Most enterprise processes need one before the discovery call, and we treat that as normal.' },
  { q: 'Where does the contact form send my data?', a: 'The form sends your message over TLS to our team inbox using Resend, our transactional email provider (a US-based sub-processor), and sends you a confirmation. We keep enquiries for follow-up and delete them on request. We do not share them for marketing.' },
  { q: 'Which meeting tools do you use?', a: 'Google Meet by default, and Teams or Zoom if your security team prefers. We never record without consent. In-person meetings in Pretoria, Johannesburg and Cape Town are possible with a week’s notice.' },
  { q: 'What if it is urgent and after hours?', a: 'Security disclosures to tumiso@sonofgraig.com are answered around the clock. Everything else is answered on the next business day in Pretoria.' },
  { q: 'Do you run a bug bounty?', a: 'We accept coordinated disclosure rather than a public bounty for now. Send reproducible steps and impact to tumiso@sonofgraig.com. Good-faith researchers are credited where appropriate.' },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/contact', FAQS)) }} />
      {/* Hero background: ContactHeroBackground from the 2026 site (signal grid). */}
      <PageHero
        scene="signalGrid"
        eyebrow="Contact"
        title="Talk to a person."
        accent="Not a sales pipeline."
        lead="Every enquiry is read by a person in Pretoria, routed to the right specialist and answered within the time shown below. No call centre, no offshore intermediaries."
        primary={{ label: 'Send a message', href: '#message' }}
        secondary={{ label: 'Email directly', href: '#inboxes' }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {[
            ['Security', '1 hour, 24/7'],
            ['Sales', '2 business days'],
            ['POPIA requests', '10 business days'],
          ].map(([k, v]) => (
            <span key={k} className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[13px]">
              <Clock size={13} aria-hidden="true" className="relative z-[2] text-[var(--sg-blue)]" />
              <span className="relative z-[2] text-[var(--sg-text-3)]">{k}</span>
              <span className="relative z-[2] font-medium text-[var(--sg-text-1)]">{v}</span>
            </span>
          ))}
        </div>
      </PageHero>

      <Section tone="base" spacing="lg" background="spatialDisplacement">
        <SectionHeader eyebrow="Choose your route" title="Six paths, each to a named specialist." description="If you are not sure which fits, use the form — we route it for you." />
        <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.08} blur className="h-full">
              <Card padding="lg" interactive asChild className="group flex h-full flex-col">
                <a href={`mailto:${r.email}?subject=${encodeURIComponent(r.title)}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-[var(--r-lg)] border border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] transition-all duration-500 group-hover:bg-[var(--sg-blue)] group-hover:text-white">
                      <r.icon size={20} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface-2)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--sg-text-2)]">{r.sla}</span>
                  </div>
                  <p className="text-label text-[var(--sg-text-4)] mt-[var(--sp-6)]">{r.path}</p>
                  <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-2)]">{r.title}</h3>
                  <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] flex-1">{r.body}</p>
                  <span className="mt-[var(--sp-6)] inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--sg-blue)]">
                    {r.email} <ArrowUpRight size={13} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="message" tone="base" spacing="lg" divider background="modularLattice">
        <div className="grid gap-[var(--sp-8)] lg:grid-cols-[1.4fr_1fr]">
          <Reveal blur>
            <Card padding="lg">
              <p className="text-label text-[var(--sg-blue)]">General enquiry</p>
              <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Send us a message.</h2>
              <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] mb-[var(--sp-8)]">A person reads every message. We reply by email unless you ask for a call.</p>
              <ContactForm />
            </Card>
          </Reveal>
          <div className="space-y-[var(--sp-4)]">
            <Reveal delay={0.1} blur>
              <Card padding="lg">
                <FileCheck2 size={20} aria-hidden="true" className="text-[var(--sg-blue)]" />
                <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-4)]">Procurement teams</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">Skip the form. The DPA, B-BBEE certificate, PAIA manual and security questionnaire answers are ready to send.</p>
                <Link href="/security" className="mt-[var(--sp-4)] inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--sg-blue)] hover:underline">
                  Trust centre <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </Card>
            </Reveal>
            <Reveal delay={0.16} blur>
              <Card padding="lg">
                <MapPin size={20} aria-hidden="true" className="text-[var(--sg-blue)]" />
                <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-4)]">Where we are</h3>
                <address className="text-body not-italic text-[var(--sg-text-2)] mt-[var(--sp-3)]">
                  SonOfGraig Digital Solutions (Pty) Ltd
                  <br />
                  9810 Moloto South Drive, Extension 8
                  <br />
                  KwaMhlanga, 1022, Mpumalanga
                </address>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">Team based in Pretoria · Africa/Johannesburg (UTC+02:00)</p>
                <dl className="mt-[var(--sp-4)] divide-y divide-[var(--sg-border)] border-t border-[var(--sg-border)]">
                  {HOURS.map(([d, h]) => (
                    <div key={d} className="flex justify-between py-2 text-body">
                      <dt className="text-[var(--sg-text-3)]">{d}</dt>
                      <dd className="font-mono text-[12px] text-[var(--sg-text-1)]">{h}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="inboxes" tone="base" spacing="lg" divider background="hexField">
        <SectionHeader eyebrow="Direct addresses" title="Every inbox we publish." description="Most procurement teams prefer email because audit trails matter. Every reply comes from a named person." />
        <Reveal>
          <Card padding="none" className="overflow-hidden">
            <ul className="grid sm:grid-cols-2">
              {INBOXES.map(([label, email]) => (
                <li key={label} className="border-b border-[var(--sg-border)] sm:[&:nth-child(odd)]:border-r">
                  <a href={`mailto:${email}`} className="group flex items-center justify-between gap-4 px-[var(--sp-6)] py-[var(--sp-4)] transition-colors hover:bg-[var(--sg-surface-2)]">
                    <span className="text-body text-[var(--sg-text-2)]">{label}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--sg-blue)]">
                      <Mail size={13} aria-hidden="true" /> {email}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider background="temporalFlux">
        <SectionHeader eyebrow="After you write" title="Four steps, no surprises." align="center" />
        <Timeline items={STEPS} />
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow" background="acousticWaves">
        <SectionHeader eyebrow="Questions" title="Before you send the email." align="center" />
        <Reveal>
          <FAQ items={FAQS} />
        </Reveal>
      </Section>

      <CTABand scene="sonarEcho"
        eyebrow="Still scoping?"
        title="Read first, write later."
        body="The Insights blog has technical guides on POPIA-compliant AI, RAG architecture and what enterprise procurement actually asks for."
        primary={{ label: 'Visit Insights', href: '/blog' }}
        secondary={{ label: 'Join early access', href: '/early-access' }}
      />
    </>
  );
}
