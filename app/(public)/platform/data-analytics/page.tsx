import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title:
    'Data & Analytics OS — SonOfGraig | Analytics Studio, Data Pipelines, Workflow Engine',
  description:
    'The intelligence operations layer of the SonOfGraig platform. Visual ETL/ELT, embedded BI dashboards, and 500+ workflow integrations — with POPIA data lineage tracked from the first pipeline stage. Hosted in AWS af-south-1, ZAR-priced.',
  keywords: [
    'Data Analytics South Africa',
    'no-code ETL',
    'embedded BI',
    'workflow automation',
    'RPA',
    'document intelligence',
    'POPIA data lineage',
    'af-south-1',
    'hyper-automation',
    'process mining',
  ],
  alternates: { canonical: '/platform/data-analytics' },
  openGraph: {
    title: 'Data & Analytics OS — Cluster 03 — SonOfGraig',
    description:
      'Analytics, ETL, and automation in one platform. POPIA-native lineage. Hosted in af-south-1. ZAR-priced.',
    type: 'website',
    url: '/platform/data-analytics',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function DataAnalyticsPage() {
  const html = await loadLegacyHtml('platform', 'data-analytics');
  return <LegacyShell html={html} scope="lp-cluster-data" />;
}
