import type { Metadata } from 'next';
import { LegacyShell } from '../../_shared/LegacyShell';
import { loadLegacyHtml } from '../../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'AI Governance & Ethics Audit — SonOfGraig | POPIA Sections 11, 19, 72',
  description:
    'SonOfGraig AI Governance & Ethics Audit: gap analysis of existing AI systems against POPIA Sections 11, 19 and 72. Data flow mapping, bias detection, prioritised remediation roadmap, and a board-ready compliance summary. Fixed scope, ZAR pricing.',
  alternates: { canonical: '/services/ai-governance-audit' },
  openGraph: {
    title: 'AI Governance & Ethics Audit — SonOfGraig Services',
    description:
      'Audit existing AI systems against POPIA. Gap analysis, remediation roadmap, board-ready summary.',
    type: 'website',
    url: '/services/ai-governance-audit',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function AIGovernanceAuditPage() {
  const html = await loadLegacyHtml('services', 'ai-governance-audit');
  return <LegacyShell html={html} scope="lp-svc-governance" />;
}
