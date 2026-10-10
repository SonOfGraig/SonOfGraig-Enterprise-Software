import { getAllPosts } from '@/lib/blog';

// Google News sitemap: only articles published in the last 2 days belong here
// (Google's rule). Older posts stay in /sitemap.xml. Listed in robots.ts.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonofgraig.com';
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const revalidate = 3600;

export function GET() {
  const now = Date.now();
  const recent = getAllPosts().filter((p) => {
    const t = new Date(`${p.datePublished}T08:00:00+02:00`).getTime();
    return t <= now && now - t <= TWO_DAYS_MS;
  });

  const items = recent
    .map(
      (p) => `  <url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <news:news>
      <news:publication><news:name>sonofgraig Insights</news:name><news:language>en</news:language></news:publication>
      <news:publication_date>${p.datePublished}T08:00:00+02:00</news:publication_date>
      <news:title>${xml(p.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600' },
  });
}
