// Typed contract for blog posts. One Post per file under ./posts/, exported as
// default. Adding/removing posts is a code change reviewed in PR — no CMS, no
// runtime fetch. See systemdesign/source-docs/SEO-content-adoption-plan.md.

export type Category =
  | 'Strategy'
  | 'Compliance'
  | 'Product'
  | 'Engineering'
  | 'Transition';

export type Author = {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  url: string;
};

/** Pre-built Remotion composition id from remotion/src/Root.tsx. */
export type CompositionId = string;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  /** ISO 8601 date — the visible publish date. */
  datePublished: string;
  /** ISO 8601 date — last meaningful content edit. Drives sitemap lastmod. */
  dateModified: string;
  /** Estimated reading time in minutes. */
  readingTime: number;
  author: Author;
  /** Primary SEO keyword the post is built around. */
  primaryKeyword: string;
  /** Supporting / fan-out keywords; not stuffed, but informs Article.keywords. */
  keywords: string[];
  /** Remotion composition id for the static hero still (light variant). */
  heroComposition: CompositionId;
  /** Remotion composition id for the mid-article motion graphic. Optional —
   *  when omitted, no inline <video> or VideoObject schema is rendered. */
  motionComposition?: CompositionId;
  /** Plain-language alt text for the hero. 100-125 chars. */
  heroAlt: string;
  /** HTML body, sanitised at author time. Rendered via dangerouslySetInnerHTML. */
  bodyHtml: string;
  /** Optional override for <title>. Defaults to `${title} | sonofgraig Insights`. */
  seoTitle?: string;
  /** Optional FAQ pairs surfaced as both UI section and FAQPage JSON-LD. */
  faq?: Array<{ question: string; answer: string }>;
};

/** Render-friendly format for the index list card. */
export type PostSummary = Pick<
  Post,
  'slug' | 'title' | 'excerpt' | 'category' | 'datePublished' | 'readingTime'
>;

/** Single source of truth for the founder author entity. Reused across posts. */
export const TUMISO: Author = {
  id: '#founder',
  name: 'Tumiso Graig Ramaboya',
  givenName: 'Tumiso',
  familyName: 'Ramaboya',
  jobTitle: 'Founder, CEO & POPIA Information Officer',
  url: 'https://za.linkedin.com/in/tumiso-graig-ramaboya-6a2b38314',
};
