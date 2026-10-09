import type { Metadata } from 'next';
import { ArrowUpRight, Banknote, Code2, FileText, Home, MapPin, MessagesSquare, PenTool, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Timeline } from '@/components/ui/Timeline';
import { Reveal } from '@/components/fx/Reveal';

export const metadata: Metadata = {
  title: 'Careers — sonofgraig | Build enterprise AI from South Africa',
  description:
    'Open roles for engineers, AI specialists and designers building the AI Dev Platform. Pretoria-based with hybrid options, paid competitively in rand.',
  alternates: { canonical: '/careers' },
  openGraph: { title: 'Careers — sonofgraig', description: 'Build enterprise AI from South Africa.', type: 'website', url: '/careers', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

// Roles carried over from the previous careers page. The security role no
// longer claims af-south-1 / SOC 2 status (founder content rules, 2026-10-09).
const ROLES = [
  { title: 'Senior Full-Stack Engineer', team: 'Platform', location: 'Pretoria · Hybrid', type: 'Full-time', icon: Code2, body: 'Lead the Agent Builder interface and the multi-tenant architecture underneath the AI Dev Platform.' },
  { title: 'AI / ML Engineer', team: 'Intelligence', location: 'Remote (South Africa)', type: 'Full-time', icon: Sparkles, body: 'Design and tune RAG pipelines, embedding strategies, evaluation suites and the prompt orchestration layer.' },
  { title: 'Product Designer', team: 'Design', location: 'Johannesburg · Hybrid', type: 'Full-time', icon: PenTool, body: 'Turn complex enterprise workflows into interfaces people trust — and own the design system that holds them together.' },
  { title: 'Cloud Security Architect', team: 'Infrastructure', location: 'Remote (South Africa)', type: 'Contract', icon: ShieldCheck, body: 'Design the zero-trust foundation the platform runs on and lead our path towards formal security certification.' },
];

const WHY = [
  { icon: MapPin, title: 'Build it here', body: 'Serious AI infrastructure, built in South Africa for South African conditions — not adapted from somewhere else.' },
  { icon: UserCheck, title: 'Own real work', body: 'Small team, real production systems, your name on the decisions. No layers between you and the people using it.' },
  { icon: Banknote, title: 'Paid in rand, competitively', body: 'Offers benchmarked against the local market and paid in the currency you live in.' },
  { icon: Home, title: 'Hybrid by default', body: 'Pretoria and Johannesburg for in-person days; remote within South Africa where the role allows.' },
];

const PROCESS = [
  { when: 'Step 1', title: 'Send your CV', body: 'Email info@sonofgraig.com with the role in the subject and anything that shows how you work.', icon: <FileText /> },
  { when: 'Step 2', title: 'Conversation', body: 'A 30-minute call with the founder about the role, the work and what you want next.', icon: <MessagesSquare /> },
  { when: 'Step 3', title: 'Technical conversation', body: 'A walk through real work you have done — how you approached it and what you would change.', icon: <Code2 /> },
  { when: 'Step 4', title: 'Offer', body: 'A written offer in rand, with the reasoning behind it.', icon: <Sparkles /> },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero background: CareersHeroBackground from the 2026 site (blueprint search). */}
      <PageHero
        scene="blueprintSearch"
        eyebrow="Careers"
        title="Build enterprise AI"
        accent="from South Africa."
        lead="We hire slowly and carefully: people who want to build the infrastructure South African enterprises will run their AI on — and own the result."
        primary={{ label: 'See open roles', href: '#roles' }}
        secondary={{ label: 'How we hire', href: '#process' }}
      />

      <Section id="roles" tone="base" spacing="lg" background="hexField">
        <SectionHeader eyebrow="Open roles" title="Where you could fit." />
        <div className="grid gap-[var(--sp-4)] md:grid-cols-2">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 0.1} blur className="h-full">
              <Card padding="lg" interactive asChild className="group flex h-full flex-col">
                <a href={`mailto:info@sonofgraig.com?subject=${encodeURIComponent(`Application: ${r.title}`)}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-[var(--r-lg)] border border-[var(--sg-border)] bg-[var(--sg-surface-2)] text-[var(--sg-blue)] transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--sg-blue)] group-hover:text-white">
                      <r.icon size={22} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--sg-text-2)]">{r.type}</span>
                  </div>
                  <p className="text-label text-[var(--sg-text-4)] mt-[var(--sp-8)]">{r.team}</p>
                  <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-2)] transition-colors group-hover:text-[var(--sg-blue)]">{r.title}</h3>
                  <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] flex-1">{r.body}</p>
                  <div className="mt-[var(--sp-6)] flex items-center justify-between border-t border-[var(--sg-border)] pt-[var(--sp-4)]">
                    <span className="inline-flex items-center gap-1.5 text-body text-[var(--sg-text-3)]">
                      <MapPin size={14} aria-hidden="true" /> {r.location}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-[13px] font-medium text-[var(--sg-blue)]">
                      Apply <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider background="bioPulse">
        <SectionHeader eyebrow="Why sonofgraig" title="A small team building something that matters here." />
        <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} blur className="h-full">
              <FeatureCard icon={w.icon} title={w.title} body={w.body} index={`0${i + 1}`} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="process" tone="base" spacing="lg" divider background="missionBeams">
        <SectionHeader eyebrow="How we hire" title="Four steps, no surprises." align="center" />
        <Timeline items={PROCESS} />
      </Section>

      <CTABand scene="nebula"
        eyebrow="Don't see your role?"
        title="Tell us what you would build."
        body="We read every speculative application. Send your CV and a note to info@sonofgraig.com."
        primary={{ label: 'Email us', href: 'mailto:info@sonofgraig.com?subject=Speculative%20application' }}
        secondary={{ label: 'About sonofgraig', href: '/about' }}
      />
    </>
  );
}
