import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { Body } from './Body';

export const metadata: Metadata = {
  title: 'Platform — SonOfGraig | 5 Enterprise AI Clusters, One Unified Subscription',
  description:
    "SonOfGraig's enterprise AI platform: 5 SaaS clusters — AI Dev Platform, Cloud & DevOps, Data & Analytics, Creative & XR, and Dev Platform. POPIA-native, ZAR-priced, hosted in AWS af-south-1. RAG Studio and Agent Builder shipping Q3 2026.",
  alternates: { canonical: '/platform' },
  openGraph: {
    title: 'SonOfGraig Platform — 5 Enterprise AI Clusters',
    description:
      "Africa's first enterprise AI platform. 5 SaaS clusters. POPIA-native. ZAR-priced. AWS af-south-1.",
    type: 'website',
    url: '/platform',
  },
  robots: { index: true, follow: true },
};

export default async function PlatformPage() {
  const html = await fs.readFile(
    path.join(process.cwd(), 'app', '(public)', 'platform', '_legacy.html'),
    'utf8',
  );
  return <Body html={html} />;
}
