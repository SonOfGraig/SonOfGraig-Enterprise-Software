import { ChangelogHero } from '@/components/marketing/changelog/ChangelogHero';
import { ChangelogEntries, ChangelogEntry } from '@/components/marketing/changelog/ChangelogEntries';
import { CTASection } from '@/components/marketing/home/CTASection';

const mockChangelog: ChangelogEntry[] = [
  {
    date: 'Oct 24, 2025',
    version: 'v0.9.2',
    title: 'RAG Studio Evaluation Framework',
    type: 'feature',
    items: [
      'Integrated Ragas for automated retrieval and generation evaluation.',
      'Added visual dashboard for tracking context precision and recall over time.',
      'New API endpoint for submitting ground truth datasets.'
    ]
  },
  {
    date: 'Oct 18, 2025',
    title: 'Design System v3.0 Rollout',
    type: 'design',
    items: [
      'Migrated all marketing pages to the new PublicShell layout.',
      'Standardized typography scale using Sora and Inter.',
      'Implemented strict color token usage (no hardcoded hex values).'
    ]
  },
  {
    date: 'Oct 10, 2025',
    version: 'v0.9.1',
    title: 'Document Ingestion Pipeline Fixes',
    type: 'fix',
    items: [
      'Resolved an issue where large PDFs would timeout during OCR processing.',
      'Fixed a memory leak in the SharePoint connector.',
      'Improved error messaging for unsupported file types.'
    ]
  },
  {
    date: 'Sep 28, 2025',
    title: 'AWS af-south-1 Migration',
    type: 'infra',
    items: [
      'Successfully migrated primary compute and vector databases to Cape Town region.',
      'Updated Terraform scripts to enforce data residency constraints.',
      'Achieved 40% reduction in latency for local queries.'
    ]
  },
  {
    date: 'Sep 15, 2025',
    title: 'Early Access Programme Launch',
    type: 'milestone',
    items: [
      'Opened applications for the Founding Customer Programme.',
      'Published the public roadmap and pricing structure.',
      'First pilot customer onboarded to Agent Builder.'
    ]
  }
];

export default function ChangelogPage() {
  return (
    <>
      <ChangelogHero />
      <ChangelogEntries entries={mockChangelog} />
      <CTASection />
    </>
  );
}
