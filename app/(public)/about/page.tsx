import type { Metadata } from 'next';
import { LegacyShell } from '../_shared/LegacyShell';
import { loadLegacyHtml } from '../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'About — SonOfGraig | South African Enterprise AI Platform',
  description:
    "SonOfGraig Digital Solutions: a South African enterprise AI platform converting 18 service capabilities into 5 SaaS clusters. POPIA-native, ZAR-priced, hosted in AWS af-south-1.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About SonOfGraig — Africa’s Enterprise AI Platform',
    description:
      'Service agency to enterprise software company — the SonOfGraig story, team, and operating principles.',
    type: 'website',
    url: '/about',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function AboutPage() {
  const html = await loadLegacyHtml('about');
  return <LegacyShell html={html} scope="lp-about" />;
}
