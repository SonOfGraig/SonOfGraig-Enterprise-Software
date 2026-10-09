import Link from 'next/link';
import { ArrowRight, CircleCheck, Database, FileClock, KeyRound } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Reveal } from '@/components/fx/Reveal';
import { TerminalStream } from '@/components/fx/interactive/TerminalStream';
import { TechRadar } from '@/components/fx/interactive/TechRadar';
import { ExplainerVideo } from '@/components/marketing/_shared/ExplainerVideo';
import { explainerSources } from '@/lib/assets';
import { AI_DEV_MODULES, PLANNED_CLUSTERS } from '@/lib/platform';
import { cn } from '@/lib/utils';

const STATUS_TONE: Record<string, string> = {
  'Early access': 'border-[var(--sg-success-bd)] bg-[var(--sg-success-bg)] text-[var(--sg-success)]',
  'In development': 'border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]',
  Planned: 'border-[var(--sg-border)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)]',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex rounded-[var(--r-sm)] border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', STATUS_TONE[status] ?? STATUS_TONE.Planned)}>
      {status}
    </span>
  );
}

// ── The four modules, alternating media / copy ───────────────────────────
export function ModuleRows() {
  return (
    <Section id="modules" tone="base" spacing="lg" background="componentsLattice">
      <SectionHeader eyebrow="Modules" title="Four modules, one platform." description="Each module stands on its own and shares the same data layer, audit trail and access controls." />
      <div className="space-y-[var(--sp-20)]">
        {AI_DEV_MODULES.map((m, i) => (
          <div key={m.id} id={m.id} className="grid scroll-mt-24 items-center gap-[var(--sp-10)] lg:grid-cols-2">
            <Reveal blur className={cn(i % 2 === 1 && 'lg:order-2')}>
              {m.video ? (
                <ExplainerVideo light={explainerSources(m.video)} dark={explainerSources(`${m.video}-dark`)} caption={`${m.name}: ${m.lead}`} />
              ) : (
                <TerminalStream
                  title="ml-ops · evaluation run"
                  lines={[
                    'dataset contracts-qa@v7 · 1,200 examples',
                    'candidates: base-model, ft-2026-09, ft-2026-10',
                    'eval faithfulness · relevance · cost per 1k answers (ZAR)',
                    'ft-2026-10: faithfulness 0.93 (+0.04) · R0.82 / 1k answers',
                    'promote ft-2026-10 → staging · rollback point saved',
                  ]}
                />
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-[var(--sp-3)]">
                <span className="font-mono text-[12px] text-[var(--sg-text-4)]">0{i + 1}</span>
                <StatusBadge status={m.status} />
              </div>
              <h3 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">{m.name}</h3>
              <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">{m.lead}</p>
              <ul className="mt-[var(--sp-6)] space-y-[var(--sp-3)]">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                    <CircleCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--sg-blue)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Shared foundation, on the ported NeuralArchitecture scene ────────────
export function ArchitectureSection() {
  const pillars = [
    { icon: Database, title: 'One data layer', body: 'Documents, embeddings and records live once, in your region, and every module reads from the same place.' },
    { icon: FileClock, title: 'One audit trail', body: 'Answers, agent steps and approvals are written to an append-only log your Information Officer can query.' },
    { icon: KeyRound, title: 'One set of access controls', body: 'Who can read which collection, run which tool and approve which action is defined once and enforced everywhere.' },
  ];
  return (
    <Section tone="base" spacing="lg" divider background="neuralArchitecture">
      <SectionHeader
        eyebrow="Architecture"
        title="Built on one foundation, not four products glued together."
        description="Move your cursor through the network: the modules are nodes on a shared layer, not islands."
      />
      <div className="grid gap-[var(--sp-4)] md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} blur className="h-full">
            <FeatureCard icon={p.icon} title={p.title} body={p.body} index={`0${i + 1}`} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function StackSection() {
  return (
    <Section tone="base" spacing="lg" divider background="hexField">
      <SectionHeader eyebrow="The stack" title="Open components your team can hire for." description="Hover a blip to see what each part does." />
      <Reveal blur>
        <TechRadar />
      </Reveal>
    </Section>
  );
}

// ── Planned clusters (no dates) ──────────────────────────────────────────
export function PlannedClustersGrid() {
  return (
    <Section tone="base" spacing="lg" divider background="spatialDisplacement">
      <SectionHeader
        eyebrow="After the AI Dev Platform"
        title="Four more clusters, built one at a time."
        description="The AI Dev Platform comes first. These are planned, and we will not put dates on them until we can keep them."
      />
      <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-4">
        {PLANNED_CLUSTERS.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08} blur className="h-full">
            <Card padding="lg" interactive asChild className="group flex h-full flex-col">
              <Link href={`/platform/${c.slug}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[var(--sg-text-4)]">{c.n}</span>
                  <StatusBadge status="Planned" />
                </div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-6)]">{c.name}</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] flex-1">{c.tagline}</p>
                <span className="mt-[var(--sp-6)] inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--sg-blue)]">
                  Learn more <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
