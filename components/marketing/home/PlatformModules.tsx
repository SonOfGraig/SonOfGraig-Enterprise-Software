import { Section, SectionHeader } from '@/components/ui/Section';
import { RagStudioDemo } from './RagStudioDemo';

// The AI Dev Platform is the product (13-clusters.md, cluster ①); RAG Studio,
// Agent Builder, Governance Hub and ML Ops are its modules.
export function PlatformModules() {
  return (
    <Section tone="base" spacing="lg" id="platform" background="componentsLattice">
      <SectionHeader
        eyebrow="Our first product"
        title="The AI Dev Platform."
        description="Four modules on one data layer, one audit trail and one set of access controls — so every answer and every agent action can be traced back to its source."
      />
      <RagStudioDemo />
    </Section>
  );
}
