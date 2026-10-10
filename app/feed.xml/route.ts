import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo';

// RSS 2.0 feed of Insights articles, newest first. Feeds readers and search
// engines, and the fortnightly newsletter digest on the T110 reads it to draft
// each issue (~/listmonk/digest.py).
export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc822 = (iso: string) => new Date(`${iso}T08:00:00+02:00`).toUTCString();

export function GET() {
  const posts = [...getAllPosts()].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.datePublished)}</pubDate>
      <category>${esc(p.category)}</category>
      <dc:creator>${esc(p.author.name)}</dc:creator>
      <description>${esc(p.excerpt)}</description>
      <enclosure url="${SITE_URL}/blog/og/${p.slug}.png" type="image/png" length="0" />
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>sonofgraig Insights</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Enterprise AI, RAG, agents and POPIA — written by the people building the AI Dev Platform in South Africa.</description>
    <language>en-za</language>
    <lastBuildDate>${posts[0] ? rfc822(posts[0].dateModified) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600' } });
}
