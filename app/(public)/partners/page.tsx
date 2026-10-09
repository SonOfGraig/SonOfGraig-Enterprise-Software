import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Partners — sonofgraig',
  description:
    'Partner programmes for system integrators, resellers, and technology partners — coming soon.',
  alternates: { canonical: '/partners' },
  robots: { index: false, follow: true },
};

export default function PartnersPage() {
  return (
    <UnderConstruction
      title="Partners"
      description="Our partner programmes for system integrators, resellers, and technology partners are launching alongside the platform."
      relatedLinks={[
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/contact', label: 'Contact us' },
      ]}
    />
  );
}
