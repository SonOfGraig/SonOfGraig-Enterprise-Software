import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { Body } from './Body';

export const metadata: Metadata = {
  title: 'POPIA Compliance Statement — SonOfGraig',
  description:
    "How SonOfGraig protects your personal information under the Protection of Personal Information Act 4 of 2013 — Section 11 consent, Section 19 security, Section 22 notification, and Section 72 data residency.",
  alternates: { canonical: '/popia' },
  openGraph: {
    title: 'POPIA Compliance Statement — SonOfGraig',
    description:
      'How SonOfGraig protects your personal information under POPIA. Detailed compliance across all relevant sections of the Act.',
    type: 'website',
    url: '/popia',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

export default async function POPIAPage() {
  const html = await fs.readFile(
    path.join(process.cwd(), 'app', '(public)', 'popia', '_legacy.html'),
    'utf8',
  );
  return <Body html={html} />;
}
