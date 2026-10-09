import type { Metadata } from 'next';
import { getCluster } from '@/lib/platform';
import { PlannedClusterPage } from '@/components/marketing/platform/PlannedClusterPage';

const cluster = getCluster('dev-platform');

export const metadata: Metadata = {
  title: `Dev Platform (planned) — sonofgraig`,
  description: `{cluster.tagline} A planned sonofgraig product cluster.`,
  alternates: { canonical: '/platform/dev-platform' },
  robots: { index: true, follow: true },
};

export default function DevPlatformPage() {
  return <PlannedClusterPage cluster={cluster} />;
}