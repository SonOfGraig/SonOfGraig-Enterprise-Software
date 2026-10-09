import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { VideoTabs } from '@/components/ui/VideoTabs';
import { Reveal } from '@/components/fx/Reveal';
import type { PlannedCluster } from '@/lib/platform';
import { StatusBadge } from './PlatformSections';
import type { SceneName } from '@/components/fx/SceneBackground';

// Section and closing-band scenes per cluster, so no two cluster pages look alike.
const BACKDROPS: Record<string, { video: SceneName; modules: SceneName; cta: SceneName }> = {
  'cloud-devops': { video: 'perspectiveFloor', modules: 'assemblyLine', cta: 'dataShards' },
  'data-analytics': { video: 'hexField', modules: 'spatialDisplacement', cta: 'globalSignals' },
  'creative-xr': { video: 'nebula', modules: 'templatesLattice', cta: 'liquidIntelligence' },
  'dev-platform': { video: 'webDevProbe', modules: 'componentsLattice', cta: 'neuralArchitecture' },
};

// Template for a planned (not yet in build) product cluster. States plainly
// that it is planned, shows intent, and points to what is available today.
export function PlannedClusterPage({ cluster: c }: { cluster: PlannedCluster }) {
  const bg = BACKDROPS[c.slug] ?? { video: 'nebula', modules: 'dotMatrix', cta: 'latticeTunnel' };
  return (
    <>
      <PageHero
        scene={c.scene}
        eyebrow={`Cluster ${c.n} · Planned`}
        title={c.name}
        lead={`${c.tagline} ${c.lead}`}
        primary={{ label: 'Register interest', href: `/contact?interest=${c.slug}` }}
        secondary={c.today ? { label: 'Available today', href: c.today.href } : { label: 'See the AI Dev Platform', href: '/platform/ai-dev-platform' }}
      />

      {c.videos.length > 0 && (
        <Section tone="base" spacing="lg" width="narrow" background={bg.video}>
          <SectionHeader eyebrow="Concept" title="What we intend to build." description="Explainers of the planned modules. These describe intent, not a shipped product." align="center" />
          <Reveal blur>
            <VideoTabs tabs={c.videos.map((v) => ({ label: v.label, video: v.basename, caption: v.caption, blurb: v.caption }))} />
          </Reveal>
        </Section>
      )}

      <Section tone="base" spacing="lg" divider background={bg.modules}>
        <SectionHeader eyebrow="Planned modules" title={`Inside ${c.name}.`} />
        <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-4">
          {c.modules.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} blur className="h-full">
              <Card padding="lg" className="h-full">
                <StatusBadge status="Planned" />
                <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-6)]">{m.name}</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)]">{m.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        {c.today && (
          <Reveal delay={0.1} className="mt-[var(--sp-6)]">
            <Card padding="md" interactive asChild className="group flex flex-col justify-between gap-[var(--sp-4)] border-[var(--sg-blue-border)] sm:flex-row sm:items-center">
              <Link href={c.today.href}>
                <span>
                  <span className="text-label text-[var(--sg-blue)]">Available today</span>
                  <span className="mt-1 block font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">{c.today.label}</span>
                </span>
                <ArrowRight size={18} aria-hidden="true" className="text-[var(--sg-blue)] transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          </Reveal>
        )}
      </Section>

      <CTABand
        eyebrow={`${c.name} · Planned`}
        title="Want this sooner? Tell us what you would use it for."
        body="Real use cases decide what we build next. You will hear back from a person."
        primary={{ label: 'Register interest', href: `/contact?interest=${c.slug}` }}
        secondary={{ label: 'See the AI Dev Platform', href: '/platform/ai-dev-platform' }}
        scene={bg.cta}
      />
    </>
  );
}
