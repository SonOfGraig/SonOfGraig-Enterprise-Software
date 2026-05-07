import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title:
    'Cloud & DevOps Suite — SonOfGraig | Cloud Console, Pipeline Builder, Security Posture, FinOps',
  description:
    'The infrastructure layer of the SonOfGraig platform. Multi-cloud control, CI/CD pipelines, zero-trust security, and FinOps cost management — POPIA Section 72 enforced at provisioning, hosted in AWS af-south-1. Cloud Console & Pipeline Builder Q2 2027, Security & FinOps Q3 2027.',
  keywords: [
    'Cloud DevOps South Africa',
    'multi-cloud console',
    'FinOps Dashboard',
    'Pipeline Builder',
    'Security Posture Manager',
    'POPIA Section 72',
    'af-south-1',
    'Kubernetes orchestration',
    'zero-trust',
  ],
  alternates: { canonical: '/platform/cloud-devops' },
  openGraph: {
    title: 'Cloud & DevOps Suite — Cluster 02 — SonOfGraig',
    description:
      'Multi-cloud control, CI/CD, zero-trust security, FinOps. POPIA-native. Hosted in af-south-1. ZAR-priced.',
    type: 'website',
    url: '/platform/cloud-devops',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function CloudDevopsPage() {
  const html = await loadLegacyHtml('platform', 'cloud-devops');
  return <LegacyShell html={html} scope="lp-cluster-cloud" />;
}
