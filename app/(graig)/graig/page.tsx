import type { Metadata } from 'next';
import { GraigStage } from '@/components/graig/GraigStage';
import { GraigBar } from '@/components/graig/GraigChrome';
import { Changelog, FindHim, Hero, Merge, Original, Private, Twin, Work } from '@/components/graig/GraigSections';
import { graig, GRAIG_URL } from '@/lib/graig/data';
import { OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';
import './graig.css';

// Graig's own page. Served at https://graig.sonofgraig.com (next.config rewrites
// that host's "/" here), which is also its canonical URL: the entity root that
// every one of his social profiles points back to. It speaks about Graig only, so
// it has his own bar and closing line instead of the company nav and footer.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.APP_URL ?? 'https://sonofgraig.com';
const DESCRIPTION =
  'Graig is the AI digital twin of Tumiso Graig Ramaboya. He remembers with receipts, learns how Tumiso decides, and works in public every day.';

export const metadata: Metadata = {
  title: { absolute: 'Graig — AI digital twin of Tumiso Graig Ramaboya' },
  description: DESCRIPTION,
  alternates: { canonical: GRAIG_URL },
  openGraph: {
    images: OG_IMAGES,
    title: 'Graig — AI digital twin of Tumiso Graig Ramaboya',
    description: DESCRIPTION,
    type: 'profile',
    url: GRAIG_URL,
    locale: 'en_ZA',
  },
  robots: ROBOTS_INDEX,
};

// Same @id scheme the previous entity root used (#graig), so search engines keep
// one entity across the move from GitHub Pages to this app.
const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${GRAIG_URL}/#profile`,
  url: GRAIG_URL,
  name: 'Graig — AI digital twin of Tumiso Graig Ramaboya',
  inLanguage: 'en-ZA',
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
    knowsAbout: ['Artificial intelligence', 'Autonomous agents', 'Provenance and auditability', 'Digital twins'],
    sameAs: graig.accounts.map((a) => a.url),
  },
};

export default function GraigPage() {
  const first = graig.accounts.find((a) => a.name === 'Instagram') ?? graig.accounts[0];
  return (
    <div className="g-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      <GraigStage />
      <GraigBar follow={first ? { label: 'Follow', href: first.url } : undefined} />
      <main>
        <Hero />
        <Twin />
        <Merge />
        <Work />
        <Changelog />
        <Private />
        <Original />
        <FindHim />
      </main>
    </div>
  );
}
