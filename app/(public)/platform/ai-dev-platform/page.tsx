import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title:
    'AI Dev Platform — SonOfGraig | Agent Builder, RAG Studio, Fine-Tuning Ops, Governance Hub',
  description:
    'The intelligence layer of the SonOfGraig platform. Build, deploy, fine-tune, and govern enterprise AI from one POPIA-native environment hosted in AWS af-south-1. RAG Studio Q3 2026, Agent Builder Q4 2026, ML Ops & Governance Hub Q1 2027.',
  keywords: [
    'AI Dev Platform',
    'Agent Builder',
    'RAG Studio',
    'Fine-Tuning Ops',
    'Governance Hub',
    'enterprise AI South Africa',
    'POPIA AI',
    'autonomous agents',
    'retrieval augmented generation',
    'LLM platform',
    'ML Ops',
  ],
  alternates: { canonical: '/platform/ai-dev-platform' },
  openGraph: {
    title: 'AI Dev Platform — Cluster 01 — SonOfGraig',
    description:
      'One platform for autonomous agents, RAG, fine-tuning, and governance. POPIA-native. Hosted in af-south-1. ZAR-priced.',
    type: 'website',
    url: '/platform/ai-dev-platform',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function AiDevPlatformPage() {
  const html = await loadLegacyHtml('platform', 'ai-dev-platform');
  return <LegacyShell html={html} scope="lp-cluster-ai-dev" />;
}
