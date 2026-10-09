import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { LabGallery } from '@/components/marketplace/LabFrame';

export const metadata: Metadata = {
  title: 'Interface Lab — sonofgraig | Interactive interface concepts',
  description: 'Live, interactive interface concepts from the sonofgraig design team — approval gates, tracers, encryption, agents and more. Try each one in your browser.',
  alternates: { canonical: '/lab' },
  openGraph: { title: 'Interface Lab — sonofgraig', description: 'Interactive interface concepts you can try in the browser.', type: 'website', url: '/lab', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

// The 2026 agency site's Marketplace components, kept as a living design lab.
// They are concepts: any figures inside them are illustrative, not metrics.
export default function LabPage() {
  return (
    <>
      <PageHero
        scene="componentsLattice"
        eyebrow="Interface Lab"
        title="Interfaces you can"
        accent="touch, not just see."
        lead="Interactive concepts from our design team — the craft behind every screen we build. Open any window and use it. Figures inside the concepts are illustrative."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'See the AI Dev Platform', href: '/platform/ai-dev-platform' }}
      />
      <Section tone="base" spacing="lg" background="templatesLattice">
        <SectionHeader eyebrow={`Components · 21 concepts`} title="Every window is live." description="Click the expand icon on any window to open it full size. Press Escape to close." />
        <LabGallery />
      </Section>
      <CTABand
        scene="neuralArchitecture"
        eyebrow="Design and build"
        title="Want an interface like these for your product?"
        body="We design and build production interfaces for enterprise software — with the same care as the concepts here."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'Our services', href: '/services' }}
      />
    </>
  );
}
