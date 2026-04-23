import { BlogHero } from '@/components/marketing/blog/BlogHero';
import { ArticleGrid, Article } from '@/components/marketing/blog/ArticleGrid';
import { CTASection } from '@/components/marketing/home/CTASection';

const mockArticles: Article[] = [
  {
    slug: 'why-we-are-building-an-enterprise-ai-platform',
    title: 'Why we are building an enterprise AI platform in Africa',
    excerpt: 'After delivering 18 enterprise AI projects, we noticed the same architectural patterns repeating. Here is why we decided to productise them.',
    category: 'Strategy',
    date: 'Oct 12, 2025',
    readTime: 6
  },
  {
    slug: 'rag-studio-architecture',
    title: 'The architecture behind RAG Studio',
    excerpt: 'A deep dive into the hybrid retrieval system and evaluation framework powering our first platform product.',
    category: 'Engineering',
    date: 'Nov 04, 2025',
    readTime: 8
  },
  {
    slug: 'popia-compliance-in-ai',
    title: 'Navigating POPIA compliance for enterprise AI',
    excerpt: 'How we designed our data ingestion pipelines to ensure compliance with South African data privacy laws from day one.',
    category: 'Compliance',
    date: 'Nov 18, 2025',
    readTime: 5
  },
  {
    slug: 'agent-builder-preview',
    title: 'First look: Agent Builder canvas',
    excerpt: 'A sneak peek at the visual orchestration interface for building autonomous AI agents.',
    category: 'Product',
    date: 'Dec 02, 2025',
    readTime: 4
  },
  {
    slug: 'transitioning-from-services',
    title: 'The services-to-software transition playbook',
    excerpt: 'How we are balancing ongoing client delivery with building our core platform IP.',
    category: 'Transition',
    date: 'Jan 15, 2026',
    readTime: 7
  }
];

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <ArticleGrid articles={mockArticles} />
      <CTASection />
    </>
  );
}
