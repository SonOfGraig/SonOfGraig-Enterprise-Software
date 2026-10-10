import type { Metadata } from 'next';
import { SITE_URL, ORG_ID, breadcrumbJsonLd, faqPageJsonLd, OG_IMAGES } from '@/lib/seo';
import type { Service } from '@/lib/services';

export function serviceMetadata(s: Service): Metadata {
  const path = `/services/${s.slug}`;
  return {
    title: `${s.title} in South Africa | sonofgraig`,
    description: `${s.summary} ${s.price}, ${s.meta.split(' · ')[0]}. POPIA-aligned delivery from a South African team.`,
    alternates: { canonical: path },
    openGraph: { images: OG_IMAGES, title: `${s.title} — sonofgraig Services`, description: s.summary, type: 'website', url: path, locale: 'en_ZA' },
    robots: { index: true, follow: true },
  };
}

export function ServiceJsonLd({ service: s }: { service: Service }) {
  const path = `/services/${s.slug}`;
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name: s.title,
    serviceType: s.title,
    category: s.category,
    description: `${s.summary} ${s.body}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Place', name: 'Africa' },
    ],
    url: `${SITE_URL}${path}`,
    offers: {
      '@type': 'Offer',
      price: String(s.priceZar),
      priceCurrency: 'ZAR',
      priceSpecification: { '@type': 'PriceSpecification', price: String(s.priceZar), priceCurrency: 'ZAR', valueAddedTaxIncluded: false },
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${path}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Deliverables',
      itemListElement: s.deliverables.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
  };
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: s.title, path },
  ]);
  const faq = faqPageJsonLd(path, s.faqs.map((f) => ({ q: f.q, a: f.a })));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
