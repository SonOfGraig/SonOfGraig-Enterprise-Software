import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Status — SonOfGraig',
  description:
    'Live platform status, incident history, and uptime SLA reporting — coming soon.',
  alternates: { canonical: '/status' },
  robots: { index: false, follow: true },
};

export default function StatusPage() {
  return (
    <UnderConstruction
      title="System Status"
      description="A public status page with live component health, incident history, and uptime SLA reporting will launch alongside the first product. For platform incidents during the build phase, follow our changelog."
      eta="Q4 2026"
      relatedLinks={[
        { href: '/changelog', label: 'Changelog' },
        { href: '/security', label: 'Security overview' },
        { href: '/contact', label: 'Report an issue' },
      ]}
    />
  );
}
