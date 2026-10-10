import type { Metadata } from 'next';
import { getCluster } from '@/lib/platform';
import { PlannedClusterPage } from '@/components/marketing/platform/PlannedClusterPage';

const cluster = getCluster('creative-xr');

export const metadata: Metadata = {
  title: `Creative & XR (planned) — sonofgraig`,
  description: `${cluster.tagline} A planned product cluster from sonofgraig, the South African enterprise AI company.`,
  alternates: { canonical: '/platform/creative-xr' },
  robots: { index: true, follow: true },
};

export default function CreativeXRPage() {
  return <PlannedClusterPage cluster={cluster} />;
}