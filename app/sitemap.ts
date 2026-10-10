import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { ROUTES } from '@/lib/routes';
import { publishedNews } from '@/lib/news';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

// Static pages come from lib/routes.ts (shared with the HTML /sitemap page);
// /blog/[slug] entries are appended from the typed posts manifest in lib/blog.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.dateModified}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const news = publishedNews();
  const newsEntries: MetadataRoute.Sitemap = news.length
    ? [
        { url: `${SITE_URL}/newsroom`, lastModified: new Date(`${news[0].date}T00:00:00Z`), changeFrequency: 'weekly', priority: 0.7 },
        ...news.map((n) => ({
          url: `${SITE_URL}/newsroom/${n.slug}`,
          lastModified: new Date(`${n.date}T00:00:00Z`),
          changeFrequency: 'yearly' as const,
          priority: 0.6,
        })),
      ]
    : [];

  return [...staticEntries, ...blogEntries, ...newsEntries];
}
