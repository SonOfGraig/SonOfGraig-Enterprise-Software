import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'RAG Knowledge Base Setup — SonOfGraig | Document Search Grounded in Your Data',
  description:
    'Stand up a production RAG knowledge base on your enterprise documents. SonOfGraig Services delivers ingestion pipelines, embeddings, retrieval, citations, evaluation, and POPIA-compliant audit logging — fixed scope, ZAR pricing.',
  alternates: { canonical: '/services/rag-knowledge-base-setup' },
  openGraph: {
    title: 'RAG Knowledge Base Setup — SonOfGraig Services',
    description:
      'Production RAG pipeline on your enterprise documents — ingestion, retrieval, citations, eval, POPIA-aligned audit logging.',
    type: 'website',
    url: '/services/rag-knowledge-base-setup',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function RagKnowledgeBaseSetupPage() {
  const html = await loadLegacyHtml('services', 'rag-knowledge-base-setup');
  return <LegacyShell html={html} scope="lp-svc-rag" />;
}
