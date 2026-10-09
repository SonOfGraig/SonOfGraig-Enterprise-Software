import { Section, SectionHeader } from '@/components/ui/Section';
import { VideoTabs } from '@/components/ui/VideoTabs';
import { Reveal } from '@/components/fx/Reveal';

// The AI Dev Platform's module explainers (Remotion renders in /public/video).
export function PlatformInMotion() {
  return (
    <Section tone="base" spacing="lg" divider width="narrow" background="nebula">
      <SectionHeader
        eyebrow="The platform in motion"
        title="See each module at work."
        description="Short explainers of how the AI Dev Platform's modules behave — no voice-over, no sales pitch."
        align="center"
      />
      <Reveal blur>
        <VideoTabs
          tabs={[
            {
              label: 'RAG Studio',
              video: 'rag-studio',
              caption: 'RAG Studio: documents become a searchable index, and every answer cites its source.',
              blurb: 'Contracts, policies, CRM exports and wikis become one hybrid-searchable index. Every answer arrives with the passages it came from.',
            },
            {
              label: 'Agent Builder',
              video: 'agent-builder',
              caption: 'Agent Builder: prompt, tool, model and response nodes on a visual canvas, with a captured trace.',
              blurb: 'Compose agents from prompts, tools and models on a canvas. Every run leaves a trace you can replay step by step.',
            },
            {
              label: 'Governance Hub',
              video: 'governance-hub',
              caption: 'Governance Hub: POPIA reporting with bias, drift and explainability checks (illustrative values).',
              blurb: 'POPIA reporting, bias and drift checks, and explainability coverage for the AI systems you run. Values shown are illustrative.',
            },
          ]}
        />
      </Reveal>
    </Section>
  );
}
