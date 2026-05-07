import type { Metadata } from 'next';
import { UnderConstruction } from '@/components/marketing/UnderConstruction';

export const metadata: Metadata = {
  title: 'Cloud & DevOps Suite — SonOfGraig',
  description:
    'Cloud Console, Pipeline Builder, Security Posture, and FinOps Dashboard. Zero-trust multi-cloud control with POPIA residency built in.',
  alternates: { canonical: '/platform/cloud-devops' },
  robots: { index: false, follow: true },
};

export default function CloudDevopsPage() {
  return (
    <UnderConstruction
      title="Cloud & DevOps Suite"
      description="Multi-cloud management, CI/CD pipelines, infrastructure-as-code, and FinOps from one console. Zero-trust by default, POPIA-native residency controls. Ships in Phase 2."
      eta="Q2 2027"
      relatedLinks={[
        { href: '/platform', label: 'Platform overview' },
        { href: '/services/cloud-architecture', label: 'Cloud Architecture services' },
        { href: '/early-access', label: 'Early access' },
      ]}
    />
  );
}
