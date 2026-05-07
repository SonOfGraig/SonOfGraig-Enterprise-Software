import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Dev Platform — SonOfGraig',
  description:
    'Low-code app builder, IoT platform, and Web3 tooling for enterprise developers. Phase 3 of the SonOfGraig platform.',
  alternates: { canonical: '/platform/dev-platform' },
  robots: { index: false, follow: true },
};

export default function DevPlatformPage() {
  return (
    <UnderConstruction
      title="Dev Platform"
      description="Low-code App Builder, IoT Platform, and Smart Contract IDE for enterprise developers. Phase 3 of the SonOfGraig platform — high-demand in South African enterprise but requires significant infrastructure investment."
      eta="2027+"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/services', label: 'Services' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
