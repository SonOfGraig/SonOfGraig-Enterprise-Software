import type { Metadata } from 'next';
import { LegacyShell } from '../_shared/LegacyShell';
import { loadLegacyHtml } from '../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'Contact — SonOfGraig | Sales, Support, Security, POPIA',
  description:
    'Contact SonOfGraig for enterprise AI sales, technical support, security disclosure, POPIA queries, partnerships, or careers. Sales response within 2 business days. Security response within 1 hour. Hosted in Pretoria, South Africa.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — SonOfGraig',
    description:
      'Enterprise sales, technical support, security disclosure, POPIA, partnerships, careers.',
    type: 'website',
    url: '/contact',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function ContactPage() {
  const html = await loadLegacyHtml('contact');
  return <LegacyShell html={html} scope="lp-contact" />;
}
