import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'About Our Ads — SonOfGraig',
  description:
    'How SonOfGraig uses advertising and analytics technology — coming soon.',
  alternates: { canonical: '/about-ads' },
  robots: { index: false, follow: true },
};

export default function AboutAdsPage() {
  return (
    <UnderConstruction
      title="About Our Ads"
      description="A plain-language explanation of how SonOfGraig uses advertising and analytics technology, your privacy options, and the controls available to you. Coming alongside our marketing site launch."
      relatedLinks={[
        { href: '/privacy-policy', label: 'Privacy policy' },
        { href: '/popia', label: 'POPIA compliance' },
      ]}
    />
  );
}
