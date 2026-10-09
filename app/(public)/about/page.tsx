import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import {
  FounderSection,
  ThesisSection,
  StrategySection,
  ClustersSection,
  StorySection,
  ValuesSection,
  CompanyFactsSection,
  AboutFAQSection,
} from '@/components/marketing/about/AboutSections';
import { faqPageJsonLd } from '@/lib/seo';
import { aboutFaqs } from '@/lib/seo/faqs';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

export const metadata: Metadata = {
  title: 'About — sonofgraig | South African Enterprise AI Company',
  description:
    'sonofgraig is a South African company turning 18 service lines into enterprise software, starting with the AI Dev Platform. POPIA-aligned and priced in rand.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About sonofgraig',
    description:
      'From services agency to enterprise software company — the sonofgraig story, founder and operating principles.',
    type: 'website',
    url: '/about',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: 'About sonofgraig',
  description:
    'How sonofgraig is turning 18 service lines into enterprise software, starting with the AI Dev Platform.',
  inLanguage: 'en-ZA',
  isPartOf: { '@id': `${SITE_URL}#website` },
  about: { '@id': `${SITE_URL}#organization` },
  mainEntity: { '@id': `${SITE_URL}#organization` },
};

// Person JSON-LD shares the same @id as the founder reference in the root
// Organization (#founder), so Google merges these into one rich entity.
const founderJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#founder`,
  name: 'Tumiso Graig Ramaboya',
  givenName: 'Tumiso',
  additionalName: 'Graig',
  familyName: 'Ramaboya',
  jobTitle: 'Founder, CEO & POPIA Information Officer',
  description:
    'AI engineer and founder of sonofgraig, building enterprise AI software from Pretoria, South Africa. Personally ships production RAG systems, AI agent implementations and POPIA compliance architecture for South African clients.',
  image: `${SITE_URL}/founder/tumiso-graig-ramaboya.jpg`,
  url: `${SITE_URL}/about#founder`,
  nationality: { '@type': 'Country', name: 'South Africa' },
  homeLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressCountry: 'ZA', addressRegion: 'Gauteng', addressLocality: 'Pretoria' },
  },
  worksFor: { '@id': `${SITE_URL}#organization` },
  founderOf: { '@id': `${SITE_URL}#organization` },
  knowsAbout: ['Enterprise AI', 'Retrieval Augmented Generation', 'AI Agents', 'POPIA compliance', 'AI governance', 'Cloud architecture'],
  sameAs: [
    'https://www.google.com/search?kgmid=/g/11yc6kh6h5&hl=en-ZA&q=Tumiso+Graig+Ramaboya',
    'https://za.linkedin.com/in/tumiso-graig-ramaboya-6a2b38314',
    'https://www.youtube.com/@TumisoGraig',
    'https://www.instagram.com/tumiso_graig/',
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/about', aboutFaqs)) }} />

      {/* Hero background: LiquidIntelligenceBackground, as on the 2026 site's About page. */}
      <PageHero
        scene="liquidIntelligence"
        eyebrow="About sonofgraig"
        title="Enterprise AI, built in the"
        accent="country that will use it."
        lead="A South African company turning eighteen service lines into enterprise software — starting with the AI Dev Platform, funded by the services we deliver today."
        primary={{ label: 'Meet the founder', href: '#founder' }}
        secondary={{ label: 'What we believe', href: '#values' }}
      />
      <FounderSection />
      <ThesisSection />
      <StrategySection />
      <ClustersSection />
      <StorySection />
      <ValuesSection />
      <CompanyFactsSection />
      <AboutFAQSection />
      <CTABand scene="starfield"
        eyebrow="Talk to a real person"
        title="Scoping a project, applying for early access, or just have a question?"
        body="The contact page routes you straight to the person who can answer. No call centre, no offshore intermediaries."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Join early access', href: '/early-access' }}
      />
    </>
  );
}
