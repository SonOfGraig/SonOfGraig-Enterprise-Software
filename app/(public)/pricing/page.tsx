import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { Body } from './Body';

export const metadata: Metadata = {
  title: 'Pricing — SonOfGraig Enterprise AI Platform | ZAR Pricing, No FX Risk',
  description:
    'SonOfGraig pricing in ZAR. Enterprise AI platform subscriptions from R4,999/month — no FX exposure. RAG Studio, Agent Builder, Governance Hub. POPIA-native. Hosted in South Africa. Founding customer programme: 5 slots, 70% off first year.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — SonOfGraig Enterprise AI Platform',
    description:
      'Enterprise AI platform pricing in ZAR. From R4,999/month. No FX risk. POPIA-native. Hosted in South Africa.',
    type: 'website',
    url: '/pricing',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function PricingPage() {
  const html = await fs.readFile(
    path.join(process.cwd(), 'app', '(public)', 'pricing', '_legacy.html'),
    'utf8',
  );
  return <Body html={html} />;
}
