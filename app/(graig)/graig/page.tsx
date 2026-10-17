import type { Metadata } from 'next';
import { GraigStage } from '@/components/graig/GraigStage';
import { GraigBar } from '@/components/graig/GraigChrome';
import { Changelog, Faq, FindHim, Hero, Merge, Original, Private, SECOND, Twin, Work } from '@/components/graig/GraigSections';
import { graig, GRAIG_URL } from '@/lib/graig/data';
import { ROBOTS_INDEX, faqPageJsonLd } from '@/lib/seo';
import { GRAIG_FAQ } from '@/components/graig/faq';
import './graig.css';

// Graig's own page. Served at https://graig.sonofgraig.com (next.config rewrites
// that host's "/" here), which is also its canonical URL: the entity root that
// every one of his social profiles points back to. It speaks about Graig only, so
// it has his own bar and closing line instead of the company nav and footer.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.APP_URL ?? 'https://sonofgraig.com';
const TITLE = 'Graig — the AI digital twin of Tumiso Graig Ramaboya';
const DESCRIPTION =
  'Graig is the AI digital twin of Tumiso Graig Ramaboya, founder of sonofgraig. He remembers with receipts, learns how Tumiso decides and works in public.';
// Absolute: this page is also served as a static copy on GitHub Pages, where a relative
// URL would resolve against the wrong host.
const OG = [{ url: `${GRAIG_URL}/graig/og.png`, width: 1200, height: 630, alt: 'Graig — Tumiso, extended. The AI digital twin of Tumiso Graig Ramaboya.' }];

export const metadata: Metadata = {
  metadataBase: new URL(GRAIG_URL),
  title: { absolute: TITLE },
  description: DESCRIPTION,
  applicationName: 'Graig',
  authors: [{ name: 'Tumiso Graig Ramaboya', url: `${SITE_URL}/about` }],
  creator: 'Tumiso Graig Ramaboya',
  publisher: 'sonofgraig',
  keywords: [
    'Graig', 'Graig AI', 'AI digital twin', 'digital twin of a person', 'cognitive digital twin', 'personal AI agent',
    'autonomous AI agent', 'Tumiso Graig Ramaboya', 'Tumiso Ramaboya', 'sonofgraig', 'AI that remembers',
    'decision ledger', 'building in public', 'AI in South Africa', 'voice AI assistant', 'hash-chained audit log',
  ],
  alternates: { canonical: `${GRAIG_URL}/`, languages: { 'en-ZA': `${GRAIG_URL}/` } },
  openGraph: {
    images: OG,
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    url: `${GRAIG_URL}/`,
    siteName: 'Graig',
    locale: 'en_ZA',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG[0].url] },
  robots: ROBOTS_INDEX,
  category: 'technology',
  manifest: `${GRAIG_URL}/graig/site.webmanifest`,
};

// Same @id scheme the previous entity root used (#graig), so search engines keep
// one entity across the move from GitHub Pages to this app.
const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${GRAIG_URL}/#profile`,
  url: GRAIG_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: 'en-ZA',
  primaryImageOfPage: { '@type': 'ImageObject', url: OG[0].url, width: 1200, height: 630 },
  // voice-first: point assistants at the lines meant to be read aloud
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#top h1', '#top .g-lede', '#faq h3'] },
  isPartOf: { '@id': `${SITE_URL}#website` },
  mainEntity: {
    '@type': 'Person',
    '@id': `${GRAIG_URL}/#graig`,
    name: 'Graig',
    alternateName: ['GRAIG', 'itsgraig', 'graigai'],
    description:
      'Graig is an autonomous AI digital twin of Tumiso Graig Ramaboya, founder of sonofgraig. He researches, writes, designs and publishes his own posts, and every claim he makes traces back to a source in a tamper-evident log.',
    disambiguatingDescription: 'Graig is an artificial intelligence — an autonomous software agent, not a human being.',
    url: GRAIG_URL,
    creator: {
      '@type': 'Person',
      '@id': `${SITE_URL}#founder`,
      name: 'Tumiso Graig Ramaboya',
      jobTitle: 'Founder, CEO & POPIA Information Officer',
      image: `${SITE_URL}/founder/tumiso-graig-ramaboya.jpg`,
      url: `${SITE_URL}/about#founder`,
      homeLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Pretoria', addressCountry: 'ZA' } },
      sameAs: [
        'https://za.linkedin.com/in/tumiso-graig-ramaboya-6a2b38314',
        'https://www.youtube.com/@TumisoGraig',
        'https://www.instagram.com/tumiso_graig/',
      ],
    },
    affiliation: { '@id': `${SITE_URL}#organization` },
    image: OG[0].url,
    knowsAbout: ['Artificial intelligence', 'Autonomous agents', 'Digital twins', 'Long-term memory for AI', 'Decision modelling', 'Provenance and auditability', 'Building in public'],
    sameAs: graig.accounts.map((a) => a.url),
  },
};

// The site itself, so search engines see graig.sonofgraig.com as one entity's home.
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${GRAIG_URL}/#website`,
  url: `${GRAIG_URL}/`,
  name: 'Graig',
  alternateName: 'Graig — AI digital twin',
  description: DESCRIPTION,
  inLanguage: 'en-ZA',
  about: { '@id': `${GRAIG_URL}/#graig` },
  publisher: { '@id': `${SITE_URL}#organization` },
};
const faqJsonLd = { ...faqPageJsonLd('/', GRAIG_FAQ), '@id': `${GRAIG_URL}/#faq` };

export default function GraigPage() {
  const first = graig.accounts.find((a) => a.name === 'Instagram') ?? graig.accounts[0];
  return (
    <div className="g-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <GraigStage />
      <GraigBar follow={first ? { label: 'Follow', href: first.url } : undefined} second={SECOND} hide={[...(graig.demo ? [] : ['work']), ...(graig.changelog.length ? [] : ['changelog'])]} />
      <main>
        <Hero />
        <Twin />
        <Merge />
        <Work />
        <Changelog />
        <Private />
        <Original />
        <Faq />
        <FindHim />
      </main>
    </div>
  );
}
