import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'Cloud Architecture & DevOps — SonOfGraig | Zero-Trust on AWS af-south-1',
  description:
    'SonOfGraig Cloud Architecture & DevOps services: zero-trust AWS posture, Terraform IaC, GitHub Actions CI/CD, observability, FinOps cost controls, and POPIA Section 72 data residency by default. Fixed scope, ZAR pricing.',
  alternates: { canonical: '/services/cloud-architecture' },
  openGraph: {
    title: 'Cloud Architecture & DevOps — SonOfGraig Services',
    description:
      'Zero-trust AWS architecture in af-south-1 with IaC, CI/CD, observability, and POPIA-aligned residency.',
    type: 'website',
    url: '/services/cloud-architecture',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function CloudArchitecturePage() {
  const html = await loadLegacyHtml('services', 'cloud-architecture');
  return <LegacyShell html={html} scope="lp-svc-cloud" />;
}
