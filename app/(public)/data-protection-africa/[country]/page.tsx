import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { faqPageJsonLd, OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';
import { getLaw, LAST_CHECKED, LAWS, REVIEWED } from '@/lib/data-protection/laws';

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LAWS.map((l) => ({ country: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getLaw((await params).country);
  if (!l) return {};
  const path = `/data-protection-africa/${l.slug}`;
  const description = `${l.law} explained for AI teams: registration, breach notification, cross-border transfers, automated decisions and penalties in ${l.country}.`;
  return {
    title: `${l.shortName} for AI Projects: ${l.country} Data Protection Guide | sonofgraig`,
    description,
    alternates: { canonical: path },
    openGraph: { images: OG_IMAGES, title: `${l.shortName} for AI projects — ${l.country}`, description, type: 'article', url: path },
    robots: REVIEWED ? ROBOTS_INDEX : { index: false, follow: true },
  };
}

export default async function CountryLawPage({ params }: Props) {
  const l = getLaw((await params).country);
  if (!l) notFound();
  const path = `/data-protection-africa/${l.slug}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(path, l.faqs)) }} />
      <PageHero
        scene="hexField"
        eyebrow={`${l.country} · ${l.shortName} · Checked ${LAST_CHECKED}`}
        title="Data protection for AI projects"
        accent={`in ${l.country}.`}
        lead={l.summary}
        primary={{ label: 'What it means for AI', href: '#ai' }}
        secondary={{ label: 'All African laws', href: '/data-protection-africa' }}
      />

      <Section tone="base" spacing="lg" width="narrow" background="acousticWaves">
        <Reveal>
          <Card padding="lg">
            <dl className="grid gap-[var(--sp-5)] sm:grid-cols-2">
              {[
                ['Law', l.law],
                ['Regulator', l.regulator],
                ['Status', l.inForce],
                ['Short name', l.shortName],
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
        <SectionHeader eyebrow="Key obligations" title="What the law requires." />
        <div className="grid gap-[var(--sp-3)] sm:grid-cols-2">
          {l.facts.map((f, i) => (
            <Reveal key={f.label} delay={(i % 2) * 0.06} className="h-full">
              <Card padding="md" className="h-full">
                <p className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">{f.label}</p>
                <p className="text-body text-[var(--sg-text-3)] mt-1">{f.value}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="ai" tone="base" spacing="lg" divider background="modularLattice">
        <SectionHeader eyebrow="For AI teams" title={`Putting AI into production in ${l.country}.`} />
        <Reveal>
          <Card padding="lg">
            <ul className="space-y-[var(--sp-4)]">
              {l.ai.map((t) => (
                <li key={t} className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow">
        <SectionHeader eyebrow="FAQ" title="Common questions." />
        <FAQ items={l.faqs} />
        <p className="mt-[var(--sp-10)] text-[13px] text-[var(--sg-text-4)]">
          Plain-language summary checked in {LAST_CHECKED}. Not legal advice — laws and regulator guidance change, so confirm with
          counsel in {l.country}.
        </p>
        <Link
          href="/data-protection-africa"
          className="mt-[var(--sp-6)] inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-[var(--sg-blue)] hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Compare all African data-protection laws
        </Link>
      </Section>

      <CTABand
        scene="tacticalCommand"
        eyebrow={`${l.shortName} and AI`}
        title={`Building AI that has to satisfy ${l.shortName}?`}
        body="We design RAG and agent systems with data minimisation, residency and an audit trail built in from day one."
        primary={{ label: 'Book an AI governance audit', href: '/services/ai-governance-audit' }}
        secondary={{ label: 'Talk to us', href: '/contact' }}
      />
    </>
  );
}
