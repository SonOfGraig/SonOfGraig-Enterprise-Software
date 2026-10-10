import { publishedNews, releaseTime } from '@/lib/news';

// RSS 2.0 feed of published Newsroom releases — the feed to add as a section
// in Google News Publisher Center (and Flipboard, Feedly, openPR, …).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonofgraig.com';
const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const dynamic = 'force-static';

export function GET() {
  const items = publishedNews()
    .map(
      (n) => `    <item>
      <title>${xml(n.title)}</title>
      <link>${SITE_URL}/newsroom/${n.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/newsroom/${n.slug}</guid>
      <pubDate>${new Date(releaseTime(n.date)).toUTCString()}</pubDate>
      <category>${xml(n.category)}</category>
      <dc:creator>sonofgraig</dc:creator>
      <description>${xml(n.summary)}</description>
      <content:encoded><![CDATA[${n.body.map((p) => `<p>${xml(p)}</p>`).join('')}]]></content:encoded>
    </item>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>sonofgraig Newsroom</title>
    <link>${SITE_URL}/newsroom</link>
    <atom:link href="${SITE_URL}/newsroom/feed.xml" rel="self" type="application/rss+xml" />
    <description>Official announcements from sonofgraig, the South African enterprise AI software company.</description>
    <language>en-za</language>
    <image><url>${SITE_URL}/apple-icon</url><title>sonofgraig Newsroom</title><link>${SITE_URL}/newsroom</link></image>
${items}
  </channel>
</rss>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600' },
  });
}
