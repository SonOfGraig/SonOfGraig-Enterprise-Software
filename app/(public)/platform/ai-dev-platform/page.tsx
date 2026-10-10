import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section } from '@/components/ui/Section';
import { RagStudioDemo } from '@/components/marketing/home/RagStudioDemo';
import { ModuleRows, ArchitectureSection, StackSection } from '@/components/marketing/platform/PlatformSections';
import { SITE_URL, ORG_ID, breadcrumbJsonLd, OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Dev Platform: RAG Studio & Agent Builder | sonofgraig',
  description:
    'Enterprise AI built in South Africa: cited answers with RAG Studio, traceable agents with Agent Builder, and POPIA governance, on one audit trail.',
  alternates: { canonical: '/platform/ai-dev-platform' },
  openGraph: { images: OG_IMAGES, title: 'The AI Dev Platform', description: 'Four modules, one audit trail.', type: 'website', url: '/platform/ai-dev-platform', locale: 'en_ZA' },
  robots: ROBOTS_INDEX,
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
      <ArchitectureSection />
      <StackSection />
      <CTABand scene="globalSignals" title="Build on the AI Dev Platform from day one." body="Early-access teams get direct access to the people building it and a say in what ships next." />
    </>
  );
}