import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Terms of Use — SonOfGraig',
  description:
    'Terms of use governing the SonOfGraig website and platform — coming soon.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <UnderConstruction
      title="Terms of Use"
      description="The terms of use governing this website and the SonOfGraig platform are being finalised. For services engagements, individual master service agreements apply."
      relatedLinks={[
        { href: '/privacy-policy', label: 'Privacy policy' },
        { href: '/popia', label: 'POPIA compliance' },
        { href: '/dpa', label: 'Data Processing Agreement' },
      ]}
    />
  );
}
