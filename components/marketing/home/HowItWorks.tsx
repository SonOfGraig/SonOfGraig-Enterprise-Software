import Link from 'next/link';
import { ArrowRight, Database, Blocks, ShieldCheck } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Reveal } from '@/components/fx/Reveal';

const STEPS = [
  {
    icon: Database,
    title: 'Connect your data',
    body: 'Policies, contracts, manuals, registers and databases, indexed into one governed knowledge layer.',
  },
  {
    icon: Blocks,
    title: 'Build answers and agents',
    body: 'Use RAG Studio for cited answers and Agent Builder for workflows that act on them.',
  },
  {
    icon: ShieldCheck,
    title: 'Trace and govern',
    body: 'Every answer links to its source and every agent step is logged, ready for your Information Officer.',
  },
];

export function HowItWorks() {
  return (
    <Section tone="base" spacing="lg" divider background="assemblyLine">
      <SectionHeader
        eyebrow="How it works"
        title="AI is only useful when you can see where its answers came from."
      />
      <div className="grid gap-[var(--sp-4)] md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1} blur className="h-full">
            <FeatureCard icon={s.icon} title={s.title} body={s.body} index={`0${i + 1}`} />
          </Reveal>
        ))}
      </div>
      <Reveal
        delay={0.2}
        className="mt-[var(--sp-10)] pt-[var(--sp-8)] border-t border-[var(--sg-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--sp-4)]"
      >
        <p className="text-body text-[var(--sg-text-3)] max-w-[560px]">
          We are a South African company. Our POPIA Information Officer is named on our{' '}
          <Link href="/popia" className="text-[var(--sg-blue)] hover:underline">
            POPIA page
          </Link>
          , and the platform is being designed around the Act from the first line of code.
        </p>
        <Link
          href="/early-access"
          className="inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-[var(--sg-blue)] hover:gap-2.5 transition-all shrink-0"
        >
          Join early access <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
