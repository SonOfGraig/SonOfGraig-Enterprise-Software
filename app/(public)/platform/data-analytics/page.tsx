import type { Metadata } from 'next';
import { ROBOTS_INDEX } from '@/lib/seo';
import { getCluster } from '@/lib/platform';
import { PlannedClusterPage } from '@/components/marketing/platform/PlannedClusterPage';

const cluster = getCluster('data-analytics');

export const metadata: Metadata = {
  title: `Data & Analytics (planned) — sonofgraig`,
  description: `${cluster.tagline} A planned product cluster from sonofgraig, the South African enterprise AI company.`,
  alternates: { canonical: '/platform/data-analytics' },
  robots: ROBOTS_INDEX,
};

export default function DataAnalyticsPage() {
  return <PlannedClusterPage cluster={cluster} />;
}