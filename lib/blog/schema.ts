// JSON-LD builders for blog content. Article + BreadcrumbList + (optional)
// VideoObject + FAQPage. All builders reference the existing Organization and
// founder Person @ids declared in app/layout.tsx so the entity graph stays
// connected (Google KG, Wikipedia link, sameAs hops).

import type { Post } from './types';

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.APP_URL ??
    'https://sonofgraig.com'
  );
}

export function articleJsonLd(post: Post) {
  const SITE_URL = siteUrl();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = `${SITE_URL}/blog/og/${post.slug}.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [ogImage],
    url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: 'en-ZA',
    articleSection: post.category,
    keywords: [post.primaryKeyword, ...post.keywords].join(', '),
    wordCount: estimateWordCount(post.bodyHtml),
    author: { '@id': `${SITE_URL}${post.author.id}` },
    publisher: { '@id': `${SITE_URL}#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${SITE_URL}#website` },
  };
}

export function breadcrumbJsonLd(post: Post) {
  const SITE_URL = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Insights', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 2, name: post.category, item: `${SITE_URL}/blog?category=${encodeURIComponent(post.category)}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };
}

export function faqJsonLd(post: Post) {
  if (!post.faq || post.faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/** Used when a Remotion motion graphic is embedded in the post body. */
export function videoJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  durationSeconds: number;
}) {
  const SITE_URL = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: `${SITE_URL}/blog/og/${opts.slug}.png`,
    contentUrl: `${SITE_URL}/blog/motion/${opts.slug}.mp4`,
    duration: `PT${opts.durationSeconds}S`,
    uploadDate: new Date().toISOString().split('T')[0],
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

function estimateWordCount(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
}
