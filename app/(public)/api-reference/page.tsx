import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'API Reference — SonOfGraig',
  description:
    'Developer API reference for the SonOfGraig enterprise AI platform — coming soon.',
  alternates: { canonical: '/api-reference' },
  robots: { index: false, follow: true },
};

export default function ApiReferencePage() {
  return (
    <UnderConstruction
      title="API Reference"
      description="Our developer API documentation is in active preparation alongside the platform build. Expect REST and GraphQL references, OpenAPI specs, and authentication guides."
      eta="Q4 2026"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/sdk-docs', label: 'SDK docs' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
