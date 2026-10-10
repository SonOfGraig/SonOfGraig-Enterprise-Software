// Shared SEO/JSON-LD helpers. The canonical site URL falls back to
// the legacy Cloud Run host so dev and preview deploys still produce
// resolvable @id values.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

export const ORG_ID = `${SITE_URL}#organization`;

/**
 * Default share image (app/opengraph-image.tsx, 1200×630). A page that sets
 * its own `openGraph` replaces the parent's object wholesale in Next.js, so it
 * must list images again or social previews come out blank.
 */
export const OG_IMAGES = [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'sonofgraig — enterprise AI software, built in South Africa' }];
export const WEBSITE_ID = `${SITE_URL}#website`;

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

// Parses ZAR prices written as "from R 95 000" or "R45 000" into a numeric
// string suitable for schema.org Offer.price. Returns null if no number found.
export function parseZarPrice(input: string): string | null {
  const match = input.match(/[\d\s]+/g);
  if (!match) return null;
  const digits = match.join('').replace(/\s+/g, '');
  return digits.length > 0 ? digits : null;
}

// ───────────────────────────────────────────────────────────────────────────
// AEO (Answer Engine Optimization) helpers
// ───────────────────────────────────────────────────────────────────────────

export type Faq = { q: string; a: string };

/**
 * FAQPage JSON-LD — the gold-standard structured-data type for featured
 * snippets, People-Also-Ask, voice-assistant lookups, and AI-assistant
 * citation. Each page should emit a *distinct* set of Q&A (Google flags
 * cross-page duplicates).
 *
 * @param pageUrlPath  Path of the page emitting the schema (e.g. "/platform")
 *                     so the @id is unique per page.
 * @param faqs         Topically-relevant questions for the page.
 */
export function faqPageJsonLd(pageUrlPath: string, faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${pageUrlPath}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

/**
 * Speakable JSON-LD — flags specific content fragments as "voice-assistant
 * read-aloud friendly". Used by Google Assistant when surfacing the page in
 * voice-search results. Supply CSS selectors (or XPath) that match the
 * elements containing the spoken passages.
 *
 * @param pageUrlPath  Page emitting the schema.
 * @param cssSelectors CSS selectors of the elements to read aloud.
 */
export function speakableJsonLd(pageUrlPath: string, cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${pageUrlPath}#speakable`,
    url: `${SITE_URL}${pageUrlPath}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}
