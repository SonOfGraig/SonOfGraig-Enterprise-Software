import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Roadmap — SonOfGraig',
  description:
    'Public product and platform roadmap for SonOfGraig — coming soon.',
  alternates: { canonical: '/roadmap' },
  robots: { index: false, follow: true },
};

export default function RoadmapPage() {
  return (
    <UnderConstruction
      title="Roadmap"
      description="Our public product and platform roadmap is being prepared. Sign up for early access to receive direct updates."
      eta="Q3 2026"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/changelog', label: 'Changelog' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
