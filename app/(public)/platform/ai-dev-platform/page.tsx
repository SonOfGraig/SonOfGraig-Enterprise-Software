import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { LabEmbed } from '@/components/marketplace/LabFrame';
import { Reveal } from '@/components/fx/Reveal';
import { RagStudioDemo } from '@/components/marketing/home/RagStudioDemo';
import { ModuleRows, ArchitectureSection, StackSection } from '@/components/marketing/platform/PlatformSections';
import { SITE_URL, ORG_ID, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Dev Platform — sonofgraig | RAG Studio, Agent Builder, Governance Hub, ML Ops',
  description:
    'The AI Dev Platform: cited answers with RAG Studio, traceable agents with Agent Builder, POPIA reporting with Governance Hub and reproducible models with ML Ops — on one audit trail.',
  alternates: { canonical: '/platform/ai-dev-platform' },
  openGraph: { title: 'The AI Dev Platform', description: 'Four modules, one audit trail.', type: 'website', url: '/platform/ai-dev-platform', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/platform/ai-dev-platform#software`,
  name: 'AI Dev Platform',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  publisher: { '@id': ORG_ID },
  description: 'Enterprise AI platform with RAG Studio, Agent Builder, Governance Hub and ML Ops on one data layer and audit trail. In early access.',
  url: `${SITE_URL}/platform/ai-dev-platform`,
};

export default function AIDevPlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Platform', path: '/platform' }, { name: 'AI Dev Platform', path: '/platform/ai-dev-platform' }])) }} />
      <PageHero
        scene="knowledgeGraph"
        eyebrow="AI Dev Platform · Early access"
        title="Four modules."
        accent="One audit trail."
        lead="RAG Studio for cited answers, Agent Builder for traceable workflows, Governance Hub for POPIA reporting and ML Ops for reproducible models — sharing one data layer and one set of access controls."
        primary={{ label: 'Join early access', href: '/early-access' }}
        secondary={{ label: 'See the modules', href: '#modules' }}
      >
        <RagStudioDemo />
      </PageHero>
      <ModuleRows />
      {/* Interface concepts from the 2026 Marketplace, chosen for what Agent Builder does. */}
      <Section tone="base" spacing="lg" divider background="bioPulse">
        <SectionHeader eyebrow="Try the ideas" title="Gates you approve. Traces you can follow." description="Agent Builder puts a person in the loop on regulated actions and records every step. These interactive concepts show the two ideas — use them." />
        <div className="grid gap-[var(--sp-6)] lg:grid-cols-2">
          <Reveal blur><LabEmbed slug="synaptic-gate" height={520} caption="Approval gate: nothing proceeds until access is granted." /></Reveal>
          <Reveal blur delay={0.1}><LabEmbed slug="neural-tracer" height={520} caption="Trace: follow a signal through every step." /></Reveal>
        </div>
      </Section>
      <ArchitectureSection />
      <StackSection />
      <CTABand scene="globalSignals" title="Build on the AI Dev Platform from day one." body="Early-access teams get direct access to the people building it and a say in what ships next." />
    </>
  );
}