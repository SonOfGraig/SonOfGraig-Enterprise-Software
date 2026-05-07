import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Data Processing Agreement — SonOfGraig',
  description:
    'Standard Data Processing Agreement (DPA) for SonOfGraig enterprise customers — coming soon.',
  alternates: { canonical: '/dpa' },
  robots: { index: false, follow: true },
};

export default function DpaPage() {
  return (
    <UnderConstruction
      title="Data Processing Agreement"
      description="Our standard DPA covering POPIA Section 21 (Operator obligations), GDPR Article 28, and cross-border data transfer is being prepared. For early access customers, contact us for a draft DPA."
      relatedLinks={[
        { href: '/popia', label: 'POPIA compliance' },
        { href: '/security', label: 'Security overview' },
        { href: '/privacy-policy', label: 'Privacy policy' },
        { href: '/contact', label: 'Request DPA draft' },
      ]}
    />
  );
}
