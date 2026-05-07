import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Build Timeline — SonOfGraig Platform',
  description:
    'The detailed build timeline for the SonOfGraig enterprise AI platform — coming soon.',
  alternates: { canonical: '/platform/timeline' },
  robots: { index: false, follow: true },
};

export default function PlatformTimelinePage() {
  return (
    <UnderConstruction
      title="Build Timeline"
      description="A milestone-by-milestone view of the platform build — Phase 1 (services + AI Dev Platform), Phase 2 (Cloud, DevOps, Data, Analytics), Phase 3 (Creative XR, Dev Platform). Detailed page coming alongside the public roadmap."
      eta="Q3 2026"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/roadmap', label: 'Roadmap' },
        { href: '/changelog', label: 'Changelog' },
      ]}
    />
  );
}
