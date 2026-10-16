import type { Metadata } from 'next';
import Image from 'next/image';
import { Download, Mail } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/fx/Reveal';
import { OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';
import { SOCIAL_PROFILES, CIPC_REG_NO } from '@/lib/social';
import { BOILERPLATE_LONG, BOILERPLATE_SHORT } from '@/lib/press';

// Press kit (founder decision 2026-10-10: keep Press). Only verifiable facts:
// founding date, registration, location, founder and current product status.

export const metadata: Metadata = {
  title: 'Press & Media Kit | sonofgraig',
  description: 'Press resources for sonofgraig: company boilerplate, fact sheet, founder bio and photo, logo, and the media contact for interviews and enquiries.',
  alternates: { canonical: '/press' },
  openGraph: { images: OG_IMAGES, title: 'Press — sonofgraig', description: 'Boilerplate, fact sheet, founder bio and brand assets.', type: 'website', url: '/press', locale: 'en_ZA' },
  robots: ROBOTS_INDEX,
};


const FACTS: [string, string][] = [
  ['Legal name', 'SonOfGraig Digital Solutions (Pty) Ltd'],
  ['Brand', 'sonofgraig (written in lowercase)'],
  ['Founded', '2 March 2025'],
  ['Founder & CEO', 'Tumiso Graig Ramaboya'],
  ['Headquarters', 'KwaMhlanga, Mpumalanga (registered) · Pretoria (operations)'],
  ['CIPC enterprise number', CIPC_REG_NO],
  ['First product', 'AI Dev Platform — in early access'],
  ['Also offers', 'Fixed-scope AI, cloud and AI governance services, priced in ZAR'],
];

function Copyable({ label, text }: { label: string; text: string }) {
  return (
    <Card padding="lg" className="h-full">
      <p className="text-label text-[var(--sg-blue)]">{label}</p>
      <p className="text-body text-[var(--sg-text-2)] mt-[var(--sp-4)] select-all">{text}</p>
      <p className="font-mono text-[11px] text-[var(--sg-text-4)] mt-[var(--sp-4)]">{text.split(/\s+/).length} words · free to quote</p>
    </Card>
  );
}

export default function PressPage() {
  return (
    <>
      <PageHero
        scene="missionBeams"
        eyebrow="Press & media"
        title="Writing about sonofgraig?"
        accent="Start here."
        lead="Boilerplate, a fact sheet, the founder’s bio and photo, and our logo — plus a direct line to the founder for interviews."
        primary={{ label: 'Email the founder', href: 'mailto:tumiso@sonofgraig.com?subject=Media%20enquiry' }}
        secondary={{ label: 'Fact sheet', href: '#facts' }}
      />

      <Section tone="base" spacing="lg" background="acousticWaves">
        <SectionHeader eyebrow="Boilerplate" title="About sonofgraig, ready to paste." />
        <div className="grid gap-[var(--sp-4)] lg:grid-cols-[1fr_1.4fr]">
          <Reveal blur className="h-full"><Copyable label="Short (40 words)" text={BOILERPLATE_SHORT} /></Reveal>
          <Reveal blur delay={0.08} className="h-full"><Copyable label="Long" text={BOILERPLATE_LONG} /></Reveal>
        </div>
      </Section>

      <Section id="facts" tone="base" spacing="lg" divider background="dotMatrix">
        <SectionHeader eyebrow="Fact sheet" title="The verifiable facts." />
        <Reveal>
          <Card padding="none" className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left">
              <tbody>
                {FACTS.map(([k, v]) => (
                  <tr key={k} className="border-b border-[var(--sg-border)] last:border-0">
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body font-medium text-[var(--sg-text-1)] w-[38%]">{k}</td>
                    <td className="px-[var(--sp-6)] py-[var(--sp-4)] text-body text-[var(--sg-text-2)]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Reveal>
      </Section>

      <Section tone="base" spacing="lg" divider background="bioPulse">
        <div className="grid items-start gap-[var(--sp-10)] lg:grid-cols-[320px_1fr]">
          <Reveal blur>
            <figure className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)]">
              <Image src="/founder/tumiso-graig-ramaboya.jpg" alt="Tumiso Graig Ramaboya, founder and CEO of sonofgraig" width={800} height={800} sizes="320px" className="h-auto w-full" />
              <figcaption className="flex items-center justify-between gap-3 px-[var(--sp-4)] py-[var(--sp-3)]">
                <span className="text-[13px] text-[var(--sg-text-3)]">Founder photo</span>
                <a href="/founder/tumiso-graig-ramaboya.jpg" download className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--sg-blue)]">
                  <Download size={14} aria-hidden="true" /> Download
                </a>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-label text-[var(--sg-blue)]">Founder bio</p>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Tumiso Graig Ramaboya</h2>
            <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-4)]">
              Tumiso Graig Ramaboya is the founder, CEO and POPIA Information Officer of sonofgraig. A software engineer and AI
              integration architect, he specialises in LLM orchestration, retrieval-augmented generation (RAG) pipelines and
              high-concurrency web architecture, and has delivered production RAG systems, AI agent implementations and POPIA
              compliance architecture for South African clients. He founded sonofgraig in 2025 to build enterprise AI software
              from inside South Africa, for South African regulatory conditions.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider background="componentsLattice">
        <SectionHeader eyebrow="Brand" title="Logo and how to write the name." />
        <div className="grid gap-[var(--sp-4)] md:grid-cols-2">
          <Reveal blur className="h-full">
            <Card padding="lg" className="flex h-full flex-col items-start gap-[var(--sp-6)]">
              <div className="grid size-24 place-items-center rounded-[var(--r-xl)] border border-[var(--sg-border)] bg-[var(--sg-surface-2)]">
                <Image src="/icon.svg" alt="sonofgraig logo mark" width={56} height={56} unoptimized />
              </div>
              <a href="/icon.svg" download="sonofgraig-logo.svg" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--sg-blue)]">
                <Download size={15} aria-hidden="true" /> Logo mark (SVG)
              </a>
            </Card>
          </Reveal>
          <Reveal blur delay={0.08} className="h-full">
            <Card padding="lg" className="h-full">
              <ul className="space-y-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                <li><strong className="text-[var(--sg-text-1)]">sonofgraig</strong> — the brand, always lowercase, one word.</li>
                <li><strong className="text-[var(--sg-text-1)]">SonOfGraig Digital Solutions (Pty) Ltd</strong> — the legal entity, for formal references.</li>
                <li><strong className="text-[var(--sg-text-1)]">AI Dev Platform</strong> — the product; RAG Studio, Agent Builder, Governance Hub and ML Ops are its modules.</li>
                <li>Please do not alter, recolour or animate the logo mark.</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow" background="nebula">
        <SectionHeader eyebrow="Media contact" title="Talk to the founder directly." align="center" />
        <Reveal>
          <Card padding="lg" className="text-center">
            <a href="mailto:tumiso@sonofgraig.com?subject=Media%20enquiry" className="inline-flex items-center gap-2 font-sans text-[17px] font-semibold text-[var(--sg-blue)]">
              <Mail size={18} aria-hidden="true" /> tumiso@sonofgraig.com
            </a>
            <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">Interviews, comment and analyst briefings. Replies within two business days.</p>
            <ul className="mt-[var(--sp-6)] flex flex-wrap justify-center gap-x-5 gap-y-2">
              {SOCIAL_PROFILES.map((p) => (
                <li key={p.label}>
                  <a href={p.url} target="_blank" rel="noopener me" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]">{p.label}</a>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Section>

      <CTABand
        scene="perspectiveFloor"
        eyebrow="See it for yourself"
        title="A walkthrough of the AI Dev Platform for your story."
        body="We can show the platform on a call — what works today, and what is still in build."
        primary={{ label: 'Request a briefing', href: 'mailto:tumiso@sonofgraig.com?subject=Press%20briefing' }}
        secondary={{ label: 'About sonofgraig', href: '/about' }}
      />
    </>
  );
}
