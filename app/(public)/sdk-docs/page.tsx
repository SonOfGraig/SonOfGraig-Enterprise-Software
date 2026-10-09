import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'SDK Docs — sonofgraig',
  description:
    'TypeScript and Python SDK documentation for the sonofgraig platform — coming soon.',
  alternates: { canonical: '/sdk-docs' },
  robots: { index: false, follow: true },
};

export default function SdkDocsPage() {
  return (
    <UnderConstruction
      title="SDK Documentation"
      description="TypeScript and Python SDK documentation will ship with the first product release. Comprehensive examples, type definitions, and authentication patterns included."
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/api-reference', label: 'API reference' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
