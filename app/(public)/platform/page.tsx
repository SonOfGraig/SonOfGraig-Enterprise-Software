import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/fx/Reveal';
import { AIDevHeroCard } from '@/components/marketing/home/AIDevHeroCard';
import { PlatformInMotion } from '@/components/marketing/home/PlatformInMotion';
import { PlannedClustersGrid } from '@/components/marketing/platform/PlatformSections';
import { ExplainerVideo } from '@/components/marketing/_shared/ExplainerVideo';
import { explainerSources } from '@/lib/assets';
import { OG_IMAGES } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Platform — sonofgraig | The AI Dev Platform and what comes next',
  description:
    'The sonofgraig platform starts with the AI Dev Platform — RAG Studio, Agent Builder, Governance Hub and ML Ops on one audit trail. Four more clusters are planned.',
  alternates: { canonical: '/platform' },
  openGraph: { images: OG_IMAGES, title: 'The sonofgraig platform', description: 'The AI Dev Platform first; four more clusters planned.', type: 'website', url: '/platform', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        scene="perspectiveFloor"
        eyebrow="The platform"
        title="One platform,"
        accent="built one cluster at a time."
        lead="We start with the AI Dev Platform: cited answers, traceable agents and governance on one foundation. Every services project we deliver makes it better."
        primary={{ label: 'Explore the AI Dev Platform', href: '/platform/ai-dev-platform' }}
        secondary={{ label: 'Join early access', href: '/early-access' }}
      />
      <Section tone="base" spacing="lg" background="artifactsLattice">
        <SectionHeader eyebrow="Our first product" title="The AI Dev Platform." description="Four modules on one data layer, one audit trail and one set of access controls." />
        <AIDevHeroCard />
      </Section>
      <PlatformInMotion />
      <PlannedClustersGrid />
      <Section tone="base" spacing="lg" divider width="narrow" background="acousticWaves">
        <SectionHeader eyebrow="How it is funded" title="Services build the platform." description="Every fixed-scope engagement leaves behind a pattern the platform can reuse — and the revenue that pays for the build." align="center" />
        <Reveal blur>
          <ExplainerVideo light={explainerSources('services-to-saas')} dark={explainerSources('services-to-saas-dark')} caption="Services billed by the hour turn into recurring platform access." />
        </Reveal>
      </Section>
      <CTABand scene="starfield" title="Be one of the first teams on the AI Dev Platform." body="Early-access teams shape the roadmap and work directly with the people building it." />
    </>
  );
}