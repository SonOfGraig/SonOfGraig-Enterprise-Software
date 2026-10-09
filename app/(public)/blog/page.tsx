import type { Metadata } from 'next';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import type { Article } from '@/components/marketing/blog/ArticleGrid';
import { InsightsExplorer } from '@/components/marketing/blog/InsightsExplorer';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Insights — sonofgraig | Enterprise AI, POPIA & RAG in South Africa',
  description:
    'Technical writing from sonofgraig on POPIA-compliant enterprise AI in South Africa — RAG architecture, AI agents, governance and data residency.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Insights — sonofgraig', description: 'Technical guides on POPIA-compliant AI and enterprise AI in South Africa.', type: 'website', url: '/blog', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

function formatDisplayDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' });
}

export default function BlogPage() {
  const articles: Article[] = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: formatDisplayDate(p.datePublished),
    readTime: p.readingTime,
    heroImage: `/blog/og/${p.slug}.png`,
    heroAlt: p.heroAlt,
  }));

  return (
    <>
      <InsightsExplorer articles={articles} />
      <CTABand scene="knowledgeGraph"
        eyebrow="From reading to building"
        title="Want this applied to your organisation?"
        body="Every guide here comes from real delivery work. We can do the same for your data."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'Join early access', href: '/early-access' }}
      />
    </>
  );
}
