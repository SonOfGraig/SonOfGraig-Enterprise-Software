import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { BackToTop } from '@/components/ui/BackToTop';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SmoothScroll } from '@/components/fx/SmoothScroll';
import './globals.css'; // Global styles
import { OG_IMAGES } from '@/lib/seo';
import { SOCIAL_PROFILES, GOOGLE_BUSINESS_KG, CIPC_REG_NO } from '@/lib/social';

// v4: Manrope returns as the display face — it carried the brand on the
// 2026 agency site. Exposed under the old --font-sora variable so every
// existing font-display reference picks it up unchanged.
const sora = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

// SITE_URL drives canonical, OG, sitemap, robots, and JSON-LD @id values.
// Production: set NEXT_PUBLIC_SITE_URL=https://sonofgraig.com in .env.production.
// APP_URL is kept as a fallback for legacy Cloud Run deploys.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

// Description aligned with the locked entity-system one-sentence definition
// (sonofgraig SEO Entity System v1.0, Section 01 + Section 07) while keeping
// the AI-native product specificity that converts visitors.
// Kept within Google's 120–160 char meta-description window (was 203, truncated
// in SERPs). Lead keyword + entity name "sonofgraig" stay near the front.
const SITE_DESCRIPTION =
  'sonofgraig is an enterprise software company in South Africa building AI-native SaaS platforms — AI agents, RAG, governance. POPIA-native, ZAR-priced.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Child pages already include the brand in their titles, so no template here.
  // Title repositions to "Enterprise Software Company" per entity-system doc
  // so we have a chance of ranking on non-brand queries like
  // "software companies in South Africa". Brand stays title-cased visually
  // for human readability; structured-data uses the lowercase locked name.
  title: 'sonofgraig — Enterprise Software Company | AI-Native SaaS',
  description: SITE_DESCRIPTION,
  applicationName: 'sonofgraig',
  authors: [{ name: 'sonofgraig', url: SITE_URL }],
  creator: 'sonofgraig',
  publisher: 'sonofgraig',
  keywords: [
    // Brand (canonical lowercase + legacy variants people still search)
    'sonofgraig',
    'SonOfGraig',
    'SonOfGraig Digital Solutions',
    'son of graig',
    // Category (high-volume non-brand)
    'enterprise software company',
    'software company South Africa',
    'enterprise software South Africa',
    'SaaS company South Africa',
    'AI software company South Africa',
    'African software company',
    // Capabilities
    'enterprise AI platform',
    'AI-native SaaS',
    'LLM orchestration',
    'RAG pipelines',
    'AI agents',
    'fine-tuning',
    'AI governance',
    // Compliance / locality
    'POPIA compliance',
    'POPIA-compliant software',
    'ZAR pricing',
    'KwaMhlanga',
    'Pretoria',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: '/', types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'sonofgraig Insights' }] } },
  openGraph: { images: OG_IMAGES,
    type: 'website',
    siteName: 'sonofgraig',
    title: 'sonofgraig — Enterprise Software Company | AI-Native SaaS',
    description: SITE_DESCRIPTION,
    locale: 'en_ZA',
    url: '/',
  },
  // No title/description here: X falls back to each page's own og:title and
  // og:description. Setting them site-wide made every share show the homepage.
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
    // No X/Twitter account exists, so no @site/@creator handle is claimed.
  },
  // Full favicon registration — SVG primary (Google Search uses it),
  // apple-touch fallback PNG (iOS home screen + Google Search fallback),
  // and explicit shortcut/icon links so legacy SEO crawlers stop reporting
  // "no favicon" (audit Low-priority item).
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  category: 'technology',
};

// Organization is dual-typed as LocalBusiness + ProfessionalService so Google
// picks up the software-company classification AND the registered-office signal
// (KwaMhlanga, Mpumalanga). Aligned with sonofgraig SEO Entity System v1.0
// (Section 01 locked facts + Section 07 schema spec). The locked entity name
// is the lowercase "sonofgraig"; alternateName covers brand/legacy forms.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}#organization`,
  name: 'sonofgraig',
  legalName: 'SonOfGraig Digital Solutions (Pty) Ltd',
  // Legacy capitalisations kept as alternateName so Google associates them
  // with the canonical lowercase entity — searches for "SonOfGraig" or
  // "SonOfGraig Digital Solutions" resolve to the same Knowledge Graph node.
  alternateName: ['SonOfGraig', 'SonOfGraig Digital Solutions', 'Son Of Graig'],
  // Wikipedia software-company class is the strongest "what kind of company"
  // signal short of a full Wikidata link (Q-item TBD per doc Section 08 wk2).
  additionalType: 'https://en.wikipedia.org/wiki/Software_company',
  // NAICS 511210 = Software Publishers (closest US-equivalent classification
  // Google understands for entity-graph reasoning). ISIC 5820 = same.
  naics: '511210',
  isicV4: '5820',
  foundingDate: '2025-03-02',
  slogan: 'Enterprise software. African-engineered. Globally deployed.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon.svg`,
  },
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  founder: {
    '@type': 'Person',
    '@id': `${SITE_URL}#founder`,
    name: 'Tumiso Graig Ramaboya',
    givenName: 'Tumiso',
    additionalName: 'Graig',
    familyName: 'Ramaboya',
    jobTitle: 'Founder, CEO & POPIA Information Officer',
    nationality: { '@type': 'Country', name: 'South Africa' },
    worksFor: { '@id': `${SITE_URL}#organization` },
    sameAs: [
      'https://www.google.com/search?kgmid=/g/11yc6kh6h5&hl=en-ZA&q=Tumiso+Graig+Ramaboya',
      'https://za.linkedin.com/in/tumiso-graig-ramaboya-6a2b38314',
      'https://www.youtube.com/@TumisoGraig',
      'https://www.instagram.com/tumiso_graig/',
    ],
  },
  // Registered office address — operations run from Pretoria (see /about FAQ).
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9810 Moloto South Drive, Extension 8',
    addressLocality: 'KwaMhlanga',
    addressRegion: 'Mpumalanga',
    postalCode: '1022',
    addressCountry: 'ZA',
  },
  telephone: '+27696866024',
  email: 'info@sonofgraig.com',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@sonofgraig.com',
      telephone: '+27696866024',
      areaServed: ['ZA', 'Africa'],
      availableLanguage: ['en'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@sonofgraig.com',
      areaServed: ['ZA', 'Africa'],
      availableLanguage: ['en'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'POPIA Information Officer',
      email: 'tumiso@sonofgraig.com',
      areaServed: 'ZA',
      availableLanguage: ['en'],
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'South Africa' },
    { '@type': 'Place', name: 'Africa' },
  ],
  // Expanded per entity-system doc Sections 03 + 07 — covers every cluster
  // capability so the Knowledge Graph associates sonofgraig with the full
  // taxonomy of enterprise software topics.
  knowsAbout: [
    'Enterprise Software',
    'SaaS',
    'Artificial Intelligence',
    'AI-Native SaaS',
    'LLM Orchestration',
    'Retrieval Augmented Generation',
    'AI Agents',
    'Fine-Tuning Operations',
    'AI Governance',
    'POPIA compliance',
    'Cloud Architecture',
    'DevOps',
    'Data Analytics',
    'Data Governance',
    'Cybersecurity',
    'UI/UX Design',
    'Hyper-Automation',
    'Spatial Computing',
  ],
  // Every official profile plus the Google Business Profile entity, so search
  // engines merge them into one Knowledge Graph node (lib/social.ts).
  sameAs: [...SOCIAL_PROFILES.map((p) => p.url), GOOGLE_BUSINESS_KG],
  identifier: { '@type': 'PropertyValue', propertyID: 'CIPC enterprise number', value: CIPC_REG_NO },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: 'sonofgraig',
  description: SITE_DESCRIPTION,
  inLanguage: 'en-ZA',
  publisher: { '@id': `${SITE_URL}#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          // JSON.stringify is XSS-safe here because the object is a server-side constant.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} storageKey="sg-theme">
          <SmoothScroll />
          {children}
          <BackToTop />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
