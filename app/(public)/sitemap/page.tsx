import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Sitemap — sonofgraig',
  description:
    'A complete index of all pages on the sonofgraig enterprise AI platform — coming soon.',
  alternates: { canonical: '/sitemap' },
  robots: { index: false, follow: true },
};

export default function SitemapPage() {
  return (
    <UnderConstruction
      title="Sitemap"
      description="A complete page index is being prepared. In the meantime, browse our main sections below."
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/services', label: 'Services' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ]}
    />
  );
}
