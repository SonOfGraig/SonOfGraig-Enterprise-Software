import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Data & Analytics OS — SonOfGraig',
  description:
    'Analytics Studio, Data Pipelines, and Workflow Engine. Embedded BI with no-SQL access. POPIA data lineage built in.',
  alternates: { canonical: '/platform/data-analytics' },
  robots: { index: false, follow: true },
};

export default function DataAnalyticsPage() {
  return (
    <UnderConstruction
      title="Data & Analytics OS"
      description="Analytics Studio for embedded BI, Data Pipelines for visual ETL/ELT with 200+ connectors, and Workflow Engine for cross-system automation. POPIA data lineage tracked end-to-end."
      eta="Q2 2027"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/services/rag-knowledge-base-setup', label: 'RAG Knowledge Base' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
