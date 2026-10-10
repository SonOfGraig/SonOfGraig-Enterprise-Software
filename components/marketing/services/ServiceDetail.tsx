import Link from 'next/link';
import { ArrowRight, CircleCheck, Layers, Target } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { ExplainerVideo } from '@/components/marketing/_shared/ExplainerVideo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { TerminalStream } from '@/components/fx/interactive/TerminalStream';
import { CostRadar } from '@/components/fx/interactive/CostRadar';
import { ResidencyMap } from '@/components/fx/interactive/ResidencyMap';
import { CanaryRouter } from '@/components/fx/interactive/CanaryRouter';
import { RagStudioDemo } from '@/components/marketing/home/RagStudioDemo';
import { explainerSources } from '@/lib/assets';
import type { Service, Signature } from '@/lib/services';

// Template for every fixed-scope service page (design system v3.1). Each
// service picks its hero scene and its "signature" interactives — the deep
// visuals ported from the 2026 agency site's service pages.

function SignatureBlock({ kind, service }: { kind: Signature; service: Service }) {
  switch (kind) {
    case 'terminal':
      return service.terminal ? (
        <div className="grid items-center gap-[var(--sp-10)] lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-label text-[var(--sg-blue)]">What a run looks like</p>
            <h3 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Every step on the record.</h3>
            <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
              This is the kind of trace your team gets from day one — readable by an engineer and auditable by compliance.
            </p>
          </div>
          <TerminalStream title={service.terminal.title} lines={service.terminal.lines} />
        </div>
      ) : null;
    case 'costRadar':
      return <CostRadar />;
    case 'residencyMap':
      return <ResidencyMap />;
    case 'canaryRouter':
      return service.slug === 'ai-agent-implementation' ? (
        <CanaryRouter stableLabel="Agent · prompt v4" canaryLabel="Agent · prompt v5" />
      ) : (
        <CanaryRouter />
      );
    case 'ragDemo':
      return (
        <div>
          <SectionHeader eyebrow="Try the pattern" title="Answers with their sources attached." align="center" />
          <RagStudioDemo />
        </div>
      );
  }
}

export function ServiceDetail({ service }: { service: Service }) {
  const s = service;
  return (
    <>
      <PageHero
        scene={s.scene}
        eyebrow={s.category}
        title={s.title}
        lead={`${s.summary} ${s.body}`}
        primary={{ label: 'Start this project', href: `/contact?service=${s.slug}` }}
        secondary={{ label: 'What you get', href: '#deliverables' }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <span className="liquid-glass rounded-full px-4 py-1.5 font-mono text-[13px] text-[var(--sg-text-1)]">
            <span className="relative z-[2]">{s.price}</span>
          </span>
          <span className="liquid-glass rounded-full px-4 py-1.5 font-sans text-[13px] text-[var(--sg-text-2)]">
            <span className="relative z-[2]">{s.meta}</span>
          </span>
        </div>
      </PageHero>

      <Section tone="base" spacing="md" width="narrow">
        <Reveal blur>
          <ExplainerVideo
            light={explainerSources(s.video.basename)}
            dark={explainerSources(`${s.video.basename}-dark`)}
            caption={s.video.caption}
          />
        </Reveal>
      </Section>

      <Section id="deliverables" tone="base" spacing="lg" divider background={s.backdrops.deliverables}>
        <SectionHeader eyebrow="Fixed scope" title="What you get, and what changes after." />
        <div className="grid gap-[var(--sp-4)] lg:grid-cols-[1.15fr_1fr]">
          <Reveal blur className="h-full">
            <Card padding="lg" className="h-full">
              <div className="flex items-center gap-[var(--sp-3)]">
                <Layers size={18} aria-hidden="true" className="text-[var(--sg-blue)]" />
                <h3 className="text-h3 text-[var(--sg-text-1)]">Deliverables</h3>
              </div>
              <ul className="mt-[var(--sp-6)] space-y-[var(--sp-3)]">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                    <CircleCheck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--sg-blue)]" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <div className="grid gap-[var(--sp-4)]">
            {s.outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 0.06} blur>
                <Card padding="md" className="flex items-start gap-[var(--sp-4)] transition-colors hover:border-[var(--sg-blue-border)]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]">
                    <Target size={16} aria-hidden="true" />
                  </span>
                  <p className="font-sans text-[15px] font-medium leading-snug text-[var(--sg-text-1)]">{o}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {s.signatures.map((kind, i) => (
        <Section key={kind} tone="base" spacing="lg" divider background={s.backdrops.signatures[i % s.backdrops.signatures.length]}>
          <Reveal blur>
            <SignatureBlock kind={kind} service={s} />
          </Reveal>
        </Section>
      ))}

      <Section tone="base" spacing="lg" divider background={s.backdrops.stack}>
        <div className="grid gap-[var(--sp-6)] lg:grid-cols-2">
          <Reveal>
            <p className="text-label text-[var(--sg-blue)]">The stack</p>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Open, standard, yours.</h2>
            <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
              Everything ships as code in your repositories, on components your team can hire for.
            </p>
            <ul className="mt-[var(--sp-6)] flex flex-wrap gap-[var(--sp-2)]">
              {s.stack.map((t) => (
                <li key={t} className="rounded-full border border-[var(--sg-border-md)] bg-[var(--sg-surface)] px-3 py-1 font-mono text-[12px] text-[var(--sg-text-2)]">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} blur>
            <Card padding="lg" interactive asChild className="group block border-[var(--sg-blue-border)]">
              <Link href="/#platform">
                <p className="text-label text-[var(--sg-blue)]">Feeds the AI Dev Platform</p>
                <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-3)]">{s.feedsInto.module}</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">{s.feedsInto.description}</p>
                <span className="mt-[var(--sp-6)] inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--sg-blue)]">
                  See the platform <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow" background={s.backdrops.faq}>
        <SectionHeader eyebrow="Questions" title={`About ${s.title}`} align="center" />
        <Reveal>
          <FAQ items={s.faqs} />
        </Reveal>
      </Section>

      <CTABand
        eyebrow={`${s.price} · ${s.meta.split(' · ')[0]}`}
        title={`Ready to scope your ${s.title.toLowerCase()} project?`}
        body="Tell us what you are trying to do. You will hear back from a person within two business days."
        primary={{ label: 'Start this project', href: `/contact?service=${s.slug}` }}
        secondary={{ label: 'All services', href: '/services' }}
        scene={s.backdrops.cta}
      />
    </>
  );
}
