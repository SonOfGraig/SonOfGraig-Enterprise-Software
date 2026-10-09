import type { Metadata } from 'next';
import { getCluster } from '@/lib/platform';
import { PlannedClusterPage } from '@/components/marketing/platform/PlannedClusterPage';

const cluster = getCluster('cloud-devops');

export const metadata: Metadata = {
  title: `Cloud & DevOps (planned) — sonofgraig`,
  description: `{cluster.tagline} A planned sonofgraig product cluster.`,
  alternates: { canonical: '/platform/cloud-devops' },
  robots: { index: true, follow: true },
};

export default function CloudDevOpsPage() {
  return <PlannedClusterPage cluster={cluster} />;
}