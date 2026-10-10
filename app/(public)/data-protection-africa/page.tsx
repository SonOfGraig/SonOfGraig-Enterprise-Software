import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/fx/Reveal';
import { OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';
import { LAST_CHECKED, LAWS, OTHER_LAWS, REVIEWED } from '@/lib/data-protection/laws';

export const metadata: Metadata = {
  title: 'Data Protection Laws in Africa for AI Projects | sonofgraig',
  description:
    'POPIA, Nigeria’s NDPA, Kenya’s Data Protection Act, Ghana’s Act 843 and Egypt’s PDPL compared for AI projects: registration, breach deadlines, transfers and automated decisions.',
  alternates: { canonical: '/data-protection-africa' },
  openGraph: {
    images: OG_IMAGES,
    title: 'Data protection laws in Africa, for AI projects',
    description: 'Five African data-protection laws compared for teams building with AI.',
    type: 'website',
    url: '/data-protection-africa',
  },
  robots: REVIEWED ? ROBOTS_INDEX : { index: false, follow: true },
};

const COLUMNS = ['Registration', 'Breach notification', 'Cross-border transfers'] as const;

function factFor(slug: string, column: (typeof COLUMNS)[number]) {
  const law = LAWS.find((l) => l.slug === slug)!;
  const f = law.facts.find((x) => x.label === column) ?? (column === 'Registration' ? law.facts.find((x) => x.label === 'Licensing') : undefined);
  return f?.value ?? '—';
}

export default function DataProtectionAfricaPage() {
  return (
    <>
      <PageHero
        scene="hexField"
        eyebrow={`Africa data protection · Checked ${LAST_CHECKED}`}
        title="Building AI across Africa?"
        accent="Know the law in each market."
        lead="Five of the continent’s data-protection laws, compared for teams putting AI into production: who must register, how fast you must report a breach, and when data can leave the country."
        primary={{ label: 'Compare the laws', href: '#compare' }}
        secondary={{ label: 'Talk to us', href: '/contact' }}
      />

      <Section id="compare" tone="base" spacing="lg" background="dotMatrix">
        <SectionHeader eyebrow="At a glance" title="Five laws, side by side." />
        <Reveal>
          <Card padding="none" className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="border-b border-[var(--sg-border)]">
                  {['Country', ...COLUMNS].map((h) => (
                    <th key={h} className="px-[var(--sp-6)] py-[var(--sp-4)] text-label text-[var(--sg-text-4)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LAWS.map((l) => (
                  <tr key={l.slug} className="border-b border-[var(--sg-border)] align-top last:border-0">
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)]">
                      <Link href={`/data-protection-africa/${l.slug}`} className="group">
                        <span className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)] group-hover:text-[var(--sg-blue)]">
                          <span aria-hidden="true">{l.flag}</span> {l.country}
                        </span>
                        <span className="block font-mono text-[11px] text-[var(--sg-text-4)] mt-1">{l.shortName}</span>
                      </Link>
                    </td>
                    {COLUMNS.map((c) => (
                      <td key={c} className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-3)]">{factFor(l.slug, c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider background="modularLattice">
        <SectionHeader eyebrow="Country guides" title="What each law means for AI." />
        <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-3">
          {LAWS.map((l, i) => (
            <Reveal key={l.slug} delay={(i % 3) * 0.06} className="h-full">
              <Card padding="lg" interactive asChild className="group flex h-full flex-col">
                <Link href={`/data-protection-africa/${l.slug}`}>
                  <span className="text-[28px]" aria-hidden="true">{l.flag}</span>
                  <h3 className="text-h3 mt-[var(--sp-3)] text-[var(--sg-text-1)] group-hover:text-[var(--sg-blue)]">{l.country}</h3>
                  <p className="font-mono text-[11px] text-[var(--sg-text-4)] mt-1">{l.law}</p>
                  <p className="text-body mt-[var(--sp-3)] flex-1 text-[var(--sg-text-3)]">{l.summary}</p>
                  <span className="mt-[var(--sp-4)] inline-flex items-center gap-1 font-sans text-[14px] font-medium text-[var(--sg-blue)]">
                    Read the guide <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-[var(--sp-12)]">
          <p className="text-label text-[var(--sg-text-4)]">Also in force</p>
          <ul className="mt-[var(--sp-3)] grid gap-x-[var(--sp-6)] gap-y-[var(--sp-2)] sm:grid-cols-2">
            {OTHER_LAWS.map(([c, law]) => (
              <li key={c} className="text-body text-[var(--sg-text-3)]">
                <span className="font-semibold text-[var(--sg-text-1)]">{c}</span> — {law}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-[var(--sp-10)] max-w-[720px] text-[13px] text-[var(--sg-text-4)]">
          These are plain-language summaries to help plan AI projects, checked in {LAST_CHECKED}. They are not legal advice. Laws and
          regulator guidance change, so confirm with local counsel before relying on them.
        </p>
      </Section>

      <CTABand
        scene="tacticalCommand"
        eyebrow="Multi-country AI"
        title="Deploying AI in more than one African market?"
        body="We design RAG and agent systems that keep personal information where each law needs it, with the audit trail regulators ask for."
        primary={{ label: 'Book an AI governance audit', href: '/services/ai-governance-audit' }}
        secondary={{ label: 'Talk to us', href: '/contact' }}
      />
    </>
  );
}
