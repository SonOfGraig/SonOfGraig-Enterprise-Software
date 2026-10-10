import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Eye, FilePen, Mail, Scale, ShieldCheck, Trash2, UserX } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { faqPageJsonLd, OG_IMAGES } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'POPIA Statement & Your Data Rights | sonofgraig',
  description:
    'How sonofgraig collects, uses, shares and protects personal information under the Protection of Personal Information Act 4 of 2013, and how to exercise your rights.',
  alternates: { canonical: '/popia' },
  openGraph: { images: OG_IMAGES, title: 'POPIA statement — sonofgraig', description: 'How we handle personal information under POPIA.', type: 'website', url: '/popia', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

// Rebuilt 2026-10-09 to describe processing as it actually happens today.
// The legacy statement marked platform controls (RLS, PII scrubbing, audit
// logs, SOC 2) as "Active" and claimed af-south-1 residency for all data.
// NEEDS REVIEW by the Information Officer / legal adviser before launch.
const UPDATED = '9 October 2026';

const CONDITIONS = [
  ['Accountability', 's 8', 'Our Information Officer is accountable for compliance.'],
  ['Processing limitation', 'ss 9–12', 'We collect only what a specific, lawful purpose needs.'],
  ['Purpose specification', 'ss 13–14', 'We tell you why we collect information, and keep it no longer than needed.'],
  ['Further processing limitation', 's 15', 'We do not reuse information for incompatible purposes.'],
  ['Information quality', 's 16', 'We take reasonable steps to keep information accurate.'],
  ['Openness', 'ss 17–18', 'Our PAIA manual is available, and this statement explains our processing.'],
  ['Security safeguards', 'ss 19–22', 'We protect information and notify breaches.'],
  ['Data subject participation', 'ss 23–25', 'You can access, correct and delete your information.'],
];

const COLLECTION: [string, string, string, string][] = [
  ['Website visitors', 'Request metadata (IP address, browser) handled by our edge provider. Analytics data only if you accept analytics cookies.', 'Security; analytics with consent', 'Analytics: up to 14 months in Google Analytics'],
  ['Contact and early-access forms', 'Name, work email, company, role, phone (optional) and your message.', 'Responding to your enquiry or application', 'For the relationship plus 3 years, or until you ask us to delete it'],
  ['Customers (when the platform is available)', 'Account details, billing contacts, and documents your users upload.', 'Delivering the contracted service', 'As set in your contract and DPA'],
];

const TRANSFERS: [string, string, string][] = [
  ['Cloudflare', 'Global edge network', 'Delivers and protects this website. Sees request metadata.'],
  ['Resend', 'United States', 'Emails form submissions to our team and sends your confirmation.'],
  ['Google Analytics', 'United States', 'Website analytics — only after you accept analytics cookies.'],
];

const RIGHTS = [
  { icon: Eye, title: 'Access', body: 'Ask whether we hold your personal information and for a copy of it (s 23).' },
  { icon: FilePen, title: 'Correction', body: 'Ask us to correct inaccurate or out-of-date information (s 24).' },
  { icon: Trash2, title: 'Deletion', body: 'Ask us to delete information we no longer have a lawful reason to keep (s 24).' },
  { icon: UserX, title: 'Objection', body: 'Object to processing based on legitimate interest, or to direct marketing (s 11(3)).' },
  { icon: ShieldCheck, title: 'Withdraw consent', body: 'Withdraw consent at any time; it does not affect processing already done (s 11(2)(b)).' },
  { icon: Scale, title: 'Complain', body: 'Complain to the Information Regulator if you are not satisfied with our response (s 74).' },
];

const FAQS: FAQItem[] = [
  { q: 'Who is responsible for my information?', a: 'SonOfGraig Digital Solutions (Pty) Ltd is the responsible party. Our Information Officer is Tumiso Graig Ramaboya, registered with the Information Regulator, at tumiso@sonofgraig.com.' },
  { q: 'Does my information leave South Africa?', a: 'Some of it can. When you submit a form, it is emailed to us through Resend (United States). If you accept analytics cookies, usage data goes to Google Analytics (United States). These transfers rely on the providers’ data protection terms and, for analytics, your consent, as POPIA section 72 allows.' },
  { q: 'How quickly do you respond to requests?', a: 'Within 10 business days for most requests. If a request is complex we will tell you, with reasons, within that time.' },
  { q: 'Do you sell personal information?', a: 'No. We do not sell or rent personal information, and we do not share it with third parties for their own marketing.' },
];

export default function POPIAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/popia', FAQS)) }} />
      <PageHero
        scene="hexField"
        eyebrow={`POPIA statement · Updated ${UPDATED}`}
        title="Your personal information,"
        accent="handled in plain sight."
        lead="How SonOfGraig Digital Solutions (Pty) Ltd collects, uses, shares and protects personal information under the Protection of Personal Information Act 4 of 2013 — and how to exercise your rights."
        primary={{ label: 'Make a request', href: 'mailto:tumiso@sonofgraig.com?subject=POPIA%20request' }}
        secondary={{ label: 'Your rights', href: '#rights' }}
      />

      <Section tone="base" spacing="lg" width="narrow" background="acousticWaves">
        <Reveal>
          <Card padding="lg">
            <dl className="grid gap-[var(--sp-5)] sm:grid-cols-2">
              {[
                ['Responsible party', 'SonOfGraig Digital Solutions (Pty) Ltd'],
                ['Information Officer', 'Tumiso Graig Ramaboya · registered with the Information Regulator'],
                ['Contact', 'tumiso@sonofgraig.com'],
                ['Applies to', 'sonofgraig.com, our services, and the AI Dev Platform when it is available'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-label text-[var(--sg-text-4)]">{k}</dt>
                  <dd className="text-body text-[var(--sg-text-1)] mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider background="dotMatrix">
        <SectionHeader eyebrow="Chapter 3" title="Eight conditions for lawful processing." />
        <div className="grid gap-[var(--sp-3)] sm:grid-cols-2">
          {CONDITIONS.map(([t, s, b], i) => (
            <Reveal key={t} delay={(i % 2) * 0.06}>
              <Card padding="md" className="flex h-full gap-[var(--sp-4)]">
                <span className="font-mono text-[12px] text-[var(--sg-blue)] w-6 shrink-0 pt-0.5">{i + 1}</span>
                <div>
                  <p className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">
                    {t} <span className="font-mono text-[11px] font-normal text-[var(--sg-text-4)]">{s}</span>
                  </p>
                  <p className="text-body text-[var(--sg-text-3)] mt-1">{b}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider background="modularLattice">
        <SectionHeader
          eyebrow="Section 11"
          title="Why we process information."
          description="We rely on consent for analytics cookies and marketing email, on contract to deliver services to customers, on legitimate interest for security and responding to enquiries you send us, and on legal obligation for tax and financial records."
        />
        <SectionHeader eyebrow="Sections 13–14" title="What we collect, why, and for how long." />
        <Reveal>
          <Card padding="none" className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-[var(--sg-border)]">
                  {['Who', 'What', 'Why', 'How long'].map((h) => (
                    <th key={h} className="px-[var(--sp-6)] py-[var(--sp-4)] text-label text-[var(--sg-text-4)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COLLECTION.map((r) => (
                  <tr key={r[0]} className="border-b border-[var(--sg-border)] align-top last:border-0">
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body font-medium text-[var(--sg-text-1)]">{r[0]}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-2)]">{r[1]}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-3)]">{r[2]}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-3)]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>
        <p className="mt-[var(--sp-4)] text-body text-[var(--sg-text-3)]">
          We do not intentionally collect special personal information (s 26) or children’s information (s 34) through this website.
        </p>
      </Section>

      <Section tone="base" spacing="lg" divider background="spatialDisplacement">
        <div className="grid gap-[var(--sp-6)] lg:grid-cols-2">
          <Reveal>
            <p className="text-label text-[var(--sg-blue)]">Sections 19–22</p>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Security and breach notification.</h2>
            <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
              This website uses TLS on every page, spam protection and rate limits on forms, and sends enquiries only to named team inboxes. The AI Dev Platform is being built with encryption at rest, tenant isolation, PII scrubbing before AI processing and an append-only audit log; the security page shows the status of each control.
            </p>
            <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
              If we have reasonable grounds to believe your personal information has been accessed by an unauthorised person, we will notify the Information Regulator and you as soon as reasonably possible after discovery, as section 22 requires.
            </p>
            <Link href="/security" className="mt-[var(--sp-6)] inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-[var(--sg-blue)] hover:underline">
              Security and control status <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} blur>
            <Card padding="lg">
              <p className="text-label text-[var(--sg-blue)]">Section 72 · transborder flows</p>
              <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Where information can go.</h3>
              <ul className="mt-[var(--sp-6)] divide-y divide-[var(--sg-border)]">
                {TRANSFERS.map(([n, w, p]) => (
                  <li key={n} className="py-[var(--sp-3)]">
                    <p className="flex items-baseline justify-between gap-4">
                      <span className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)]">{n}</span>
                      <span className="font-mono text-[11px] text-[var(--sg-text-4)]">{w}</span>
                    </p>
                    <p className="text-body text-[var(--sg-text-3)] mt-1">{p}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="rights" tone="base" spacing="lg" divider background="knowledgeGraph">
        <SectionHeader eyebrow="Sections 23–25" title="Your rights." description="Email the Information Officer to use any of them. We respond within 10 business days." />
        <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-3">
          {RIGHTS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.08} blur className="h-full">
              <FeatureCard icon={r.icon} title={r.title} body={r.body} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-[var(--sp-6)]">
          <Card padding="md" interactive asChild className="group flex items-center justify-between gap-4 border-[var(--sg-blue-border)]">
            <a href="mailto:tumiso@sonofgraig.com?subject=POPIA%20request">
              <span className="inline-flex items-center gap-3">
                <Mail size={18} aria-hidden="true" className="text-[var(--sg-blue)]" />
                <span className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">tumiso@sonofgraig.com</span>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" className="text-[var(--sg-blue)]" />
            </a>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow" background="nebula">
        <SectionHeader eyebrow="Questions" title="Common POPIA questions." align="center" />
        <Reveal>
          <FAQ items={FAQS} />
        </Reveal>
      </Section>

      <CTABand scene="tacticalCommand"
        eyebrow="Information Officer"
        title="Questions about your information?"
        body="Write to the Information Officer directly. Responses are signed by him personally."
        primary={{ label: 'Email the Information Officer', href: 'mailto:tumiso@sonofgraig.com?subject=POPIA' }}
        secondary={{ label: 'Security & trust', href: '/security' }}
      />
    </>
  );
}
