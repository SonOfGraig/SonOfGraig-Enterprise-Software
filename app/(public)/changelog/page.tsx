import type { Metadata } from 'next';
import { LegacyShell } from '../_shared/LegacyShell';
import { loadLegacyHtml } from '../_shared/loadLegacy';
import './_legacy.css';

export const metadata: Metadata = {
  title: 'Changelog — SonOfGraig',
  description:
    'The SonOfGraig changelog. Platform releases, service-level updates, security advisories, and policy changes — all in one timeline. Updated continuously as the AI Dev Platform progresses through Phase 1.',
  alternates: { canonical: '/changelog' },
  openGraph: {
    title: 'Changelog — SonOfGraig',
    description:
      'Platform releases, service updates, security advisories, and policy changes — all in one timeline.',
    type: 'website',
    url: '/changelog',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function ChangelogPage() {
  const html = await loadLegacyHtml('changelog');
  return <LegacyShell html={html} scope="lp-changelog" />;
}
