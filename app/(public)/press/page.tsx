import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Press — SonOfGraig',
  description: 'Press kit, brand assets, and media enquiries — coming soon.',
  alternates: { canonical: '/press' },
  robots: { index: false, follow: true },
};

export default function PressPage() {
  return (
    <UnderConstruction
      title="Press"
      description="Our press kit, brand assets, and media enquiry channel are being prepared. For urgent media enquiries, please contact us directly."
      relatedLinks={[
        { href: '/about', label: 'About SonOfGraig' },
        { href: '/contact', label: 'Contact' },
      ]}
    />
  );
}
