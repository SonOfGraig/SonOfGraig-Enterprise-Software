import type { Metadata } from 'next';
import { LegacyShell } from '../_shared/LegacyShell';
import { loadLegacyHtml } from '../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'Security — SonOfGraig | Encryption, Access Control, POPIA Compliance',
  description:
    'How SonOfGraig secures the enterprise AI platform: TLS 1.3 in transit, AES-256 at rest, AWS af-south-1 residency, RBAC with row-level security, multi-factor authentication, immutable audit logs, PII scrubbing, and SOC 2 Type II in progress.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'Security — SonOfGraig',
    description:
      'Encryption, access control, audit logging, residency, and compliance posture for the SonOfGraig enterprise AI platform.',
    type: 'website',
    url: '/security',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function SecurityPage() {
  const html = await loadLegacyHtml('security');
  return <LegacyShell html={html} scope="lp-security" />;
}
