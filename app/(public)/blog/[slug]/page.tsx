import { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/ui/Callout';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

// Mock data fetcher
async function getArticle(slug: string) {
  return {
    slug,
    title: 'Why we are building an enterprise AI platform in Africa',
    excerpt: 'After delivering 18 enterprise AI projects, we noticed the same architectural patterns repeating. Here is why we decided to productise them.',
    category: 'Strategy',
    date: 'Oct 12, 2025',
    readTime: 6,
    content: `
      <p>For the past three years, SonOfGraig has operated as a specialized services firm, delivering complex AI, cloud, and data solutions for large South African enterprises. We've built everything from autonomous customer support agents to secure, on-premises RAG systems.</p>
      
      <h2>The repeating pattern</h2>
      <p>Across these 18 major projects, we noticed something: 80% of the underlying architecture was identical. Every enterprise needed:</p>
      <ul>
        <li>Secure document ingestion pipelines</li>
        <li>Hybrid semantic and keyword retrieval</li>
        <li>Strict access controls and audit logging</li>
        <li>POPIA compliance guarantees</li>
      </ul>
      
      <blockquote>
        "We realized we weren't just building custom solutions; we were repeatedly building the same foundational AI infrastructure."
      </blockquote>
      
      <h3>The decision to productise</h3>
      <p>Instead of continuing to charge for custom builds of the same infrastructure, we decided to extract these patterns into a unified platform. This allows us to offer the same enterprise-grade capabilities at a fraction of the cost and deployment time.</p>
      
      <p>Our transition from a services agency to a software company isn't an overnight pivot. It's a deliberate evolution funded by our ongoing project work. We are building the platform we wished we had when we started.</p>
      
      <pre><code>// Example of our unified ingestion API
const pipeline = new IngestionPipeline({
  source: 'sharepoint',
  chunking: 'semantic',
  embeddingModel: 'text-embedding-3-large'
});

await pipeline.run();</code></pre>
    `
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);
  return {
    title: `${article.title} | SonOfGraig Insights`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  const siteUrl =
    process.env.APP_URL ??
    'https://sonofgraig-enterprise-179668402458.africa-south1.run.app';
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  return (
    <article className="w-full py-[var(--sp-16)]">
      <div className="max-w-[720px] mx-auto px-8">
        
        {/* HEADER */}
        <header className="mb-[var(--sp-10)]">
          <div className="font-sans text-[12px] text-[var(--sg-text-4)] mb-6">
            <Link href="/blog" className="hover:text-[var(--sg-text-2)] transition-colors">Insights</Link> / {article.category} / {article.title}
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-2)] font-sans text-[11px] font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="font-sans text-[12px] text-[var(--sg-text-4)]">
              {article.date} · {article.readTime} min read
            </span>
          </div>

          <h1 className="text-h1 text-[var(--sg-text-1)] mb-6">{article.title}</h1>
          <p className="text-body-lg text-[var(--sg-text-3)] leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* ARTICLE BODY */}
        <div 
          className="sg-prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* FOOTER */}
        <footer className="mt-[var(--sp-16)] pt-[var(--sp-8)] border-t border-[var(--sg-border)]">
          <div className="flex items-center justify-between mb-[var(--sp-12)]">
            <div className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)]">Share this article</div>
            <div className="flex items-center gap-4">
              <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-blue)] transition-colors">Twitter/X</a>
              <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-blue)] transition-colors">LinkedIn</a>
            </div>
          </div>

          <Callout 
            variant="info" 
            label="Subscribe to our build updates" 
            body="Get notified when we publish new insights about our transition to a platform company."
            className="mb-[var(--sp-12)]"
          >
            <form className="flex gap-2 mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1">
                <Field type="email" placeholder="Email address" aria-label="Email address" />
              </div>
              <Button variant="primary">Subscribe</Button>
            </form>
          </Callout>

          <div>
            <h3 className="text-h3 text-[var(--sg-text-1)] mb-6">Related insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--sp-4)]">
              {/* Mock related articles */}
              <Link href="/blog/rag-studio-architecture" className="block group">
                <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-lg)] p-[var(--sp-5)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <div className="font-sans text-[11px] font-semibold text-[var(--sg-text-4)] uppercase tracking-wider mb-2">Engineering</div>
                  <h4 className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)] mb-2 group-hover:text-[var(--sg-blue)] transition-colors">The architecture behind RAG Studio</h4>
                  <div className="font-sans text-[12px] text-[var(--sg-text-4)]">Nov 04, 2025</div>
                </div>
              </Link>
              <Link href="/blog/transitioning-from-services" className="block group">
                <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-lg)] p-[var(--sp-5)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <div className="font-sans text-[11px] font-semibold text-[var(--sg-text-4)] uppercase tracking-wider mb-2">Transition</div>
                  <h4 className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)] mb-2 group-hover:text-[var(--sg-blue)] transition-colors">The services-to-software transition playbook</h4>
                  <div className="font-sans text-[12px] text-[var(--sg-text-4)]">Jan 15, 2026</div>
                </div>
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </article>
  );
}
