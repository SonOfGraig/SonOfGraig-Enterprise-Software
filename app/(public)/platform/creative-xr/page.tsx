import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Creative & XR Studio — SonOfGraig',
  description:
    'Design System Generator, Brand Studio, and XR Builder. AI-augmented creative tooling for enterprise design and immersive experiences.',
  alternates: { canonical: '/platform/creative-xr' },
  robots: { index: false, follow: true },
};

export default function CreativeXrPage() {
  return (
    <UnderConstruction
      title="Creative & XR Studio"
      description="Auto-generate component libraries from brand tokens, build AR/VR experiences without code, and orchestrate brand assets across channels. Phase 3 of the build, dependent on Phase 1+2 revenue."
      eta="2027+"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/services', label: 'Services' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
