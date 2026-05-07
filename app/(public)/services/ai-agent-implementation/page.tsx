import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'AI Agent Implementation — SonOfGraig | Production-Ready RAG + Agent Builder',
  description:
    'Fixed-scope, fixed-price AI agent implementation for South African enterprises. RAG knowledge base + Agent Builder, deployed in 6–10 weeks with PII scrubbing, audit logging, and POPIA compliance documentation. From R95,000 in ZAR.',
  alternates: { canonical: '/services/ai-agent-implementation' },
  openGraph: {
    title: 'AI Agent Implementation — SonOfGraig Services',
    description:
      'Production-ready RAG + Agent Builder, fixed scope, 6–10 week delivery. From R95,000.',
    type: 'website',
    url: '/services/ai-agent-implementation',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function AIAgentImplementationPage() {
  const html = await loadLegacyHtml('services', 'ai-agent-implementation');
  return <LegacyShell html={html} scope="lp-svc-ai-agent" />;
}
