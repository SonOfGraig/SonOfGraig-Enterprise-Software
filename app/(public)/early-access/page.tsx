import type { Metadata } from 'next';
import { LegacyShell } from '../_shared/LegacyShell';
import { loadLegacyHtml } from '../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'Early Access — SonOfGraig | Founding Customer Programme',
  description:
    'Apply to the SonOfGraig founding customer programme. 5 slots available. 70% off first year on Growth — R5,999/month instead of R19,999/month. Direct founding-team access. Your real-world use case shapes the product roadmap. Available before RAG Studio GA in Q4 2026.',
  alternates: { canonical: '/early-access' },
  openGraph: {
    title: 'Early Access — SonOfGraig',
    description:
      'Founding customer programme · 5 slots available · 70% off first year · direct founding-team access.',
    type: 'website',
    url: '/early-access',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function EarlyAccessPage() {
  const html = await loadLegacyHtml('early-access');
  return <LegacyShell html={html} scope="lp-early-access" />;
}
