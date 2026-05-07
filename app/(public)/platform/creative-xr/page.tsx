import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title:
    'Creative & XR Studio — SonOfGraig | Design Systems, Brand Studio, XR Builder',
  description:
    'The experience layer of the SonOfGraig platform. Auto-generated design systems, AI-powered brand asset creation, and no-code AR/VR experiences. Phase 3 cluster — scope defined, register early interest. Hosted in af-south-1, ZAR-priced.',
  keywords: [
    'design system generator South Africa',
    'brand studio',
    'XR builder',
    'AR VR enterprise',
    'WebXR',
    'accessibility checker WCAG',
    'generative brand AI',
    'Vision Pro',
    'Meta Quest',
    'POPIA',
  ],
  alternates: { canonical: '/platform/creative-xr' },
  openGraph: {
    title: 'Creative & XR Studio — Cluster 04 — SonOfGraig',
    description:
      'Design systems, brand asset AI, and AR/VR experiences in one platform. Hosted in af-south-1. ZAR-priced.',
    type: 'website',
    url: '/platform/creative-xr',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function CreativeXrPage() {
  const html = await loadLegacyHtml('platform', 'creative-xr');
  return <LegacyShell html={html} scope="lp-cluster-creative" />;
}
