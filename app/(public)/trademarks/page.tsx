import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Trademarks — SonOfGraig',
  description:
    'SonOfGraig trademarks, brand guidelines, and acceptable usage — coming soon.',
  alternates: { canonical: '/trademarks' },
  robots: { index: false, follow: true },
};

export default function TrademarksPage() {
  return (
    <UnderConstruction
      title="Trademarks"
      description="Brand asset library, trademark registry, and acceptable-use guidelines for partners and press are being prepared."
      relatedLinks={[
        { href: '/about', label: 'About SonOfGraig' },
        { href: '/press', label: 'Press' },
        { href: '/contact', label: 'Contact' },
      ]}
    />
  );
}
