import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'AI Dev Platform — SonOfGraig',
  description:
    'The intelligence layer of the SonOfGraig platform: Agent Builder, RAG Studio, Fine-Tuning Ops, and Governance Hub. POPIA-native, hosted in af-south-1.',
  alternates: { canonical: '/platform/ai-dev-platform' },
  robots: { index: false, follow: true },
};

export default function AiDevPlatformPage() {
  return (
    <UnderConstruction
      title="AI Dev Platform"
      description="Build, deploy, fine-tune, and govern enterprise AI from one POPIA-native environment. RAG Studio (Q3 2026), Agent Builder (Q4 2026), ML Ops & Governance Hub (Q1 2027). Detailed product page coming alongside the Phase 1 build."
      eta="Q3 2026"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/services/ai-agent-implementation', label: 'AI Agent Implementation' },
        { href: '/services/rag-knowledge-base-setup', label: 'RAG Knowledge Base' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
