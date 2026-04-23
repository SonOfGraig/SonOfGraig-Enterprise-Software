import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
}

export function ArticleGrid({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const standard = articles.slice(1);

  return (
    <section className="w-full pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-4)]">
          
          {/* FEATURED ARTICLE */}
          <Link href={`/blog/${featured.slug}`} className="md:col-span-2 block group">
            <div className="h-full bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden">
              <div className="h-[160px] bg-[var(--sg-surface-2)] w-full" />
              <div className="p-[var(--sp-6)] flex flex-col flex-1">
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-2)] font-sans text-[11px] font-semibold uppercase tracking-wider">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-h2 text-[var(--sg-text-1)] mb-3 group-hover:text-[var(--sg-blue)] transition-colors">{featured.title}</h2>
                <p className="text-body text-[var(--sg-text-3)] mb-6 flex-1">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--sg-border)]">
                  <div className="font-sans text-[12px] text-[var(--sg-text-4)]">
                    {featured.date} · {featured.readTime} min read
                  </div>
                  <div className="flex items-center gap-2 font-sans text-[13px] font-medium text-[var(--sg-text-2)] group-hover:text-[var(--sg-blue)] transition-colors">
                    Read article <ArrowRight size={14} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* STANDARD ARTICLES */}
          {standard.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
              <div className="h-full bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] transition-all duration-200 ease-out group-hover:-translate-y-[1px] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden">
                <div className="h-[120px] bg-[var(--sg-surface-2)] w-full" />
                <div className="p-[var(--sp-5)] flex flex-col flex-1">
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-2)] font-sans text-[11px] font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-h3 text-[var(--sg-text-1)] mb-2 group-hover:text-[var(--sg-blue)] transition-colors">{article.title}</h3>
                  <p className="text-caption text-[var(--sg-text-3)] mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="font-sans text-[12px] text-[var(--sg-text-4)] mt-auto pt-4 border-t border-[var(--sg-border)]">
                    {article.date} · {article.readTime} min read
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* Pagination Placeholder */}
        <div className="flex justify-center items-center gap-2 mt-[var(--sp-12)]">
          <button className="w-8 h-8 rounded-[var(--r-md)] border border-[var(--sg-border)] flex items-center justify-center text-[var(--sg-text-4)] disabled:opacity-50" disabled>
            &lt;
          </button>
          <button className="w-8 h-8 rounded-[var(--r-md)] bg-[var(--sg-text-1)] text-[var(--sg-bg)] font-sans text-[13px] font-medium flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 rounded-[var(--r-md)] border border-[var(--sg-border)] text-[var(--sg-text-2)] hover:bg-[var(--sg-surface-2)] font-sans text-[13px] font-medium flex items-center justify-center transition-colors">
            2
          </button>
          <button className="w-8 h-8 rounded-[var(--r-md)] border border-[var(--sg-border)] text-[var(--sg-text-2)] hover:bg-[var(--sg-surface-2)] font-sans text-[13px] font-medium flex items-center justify-center transition-colors">
            3
          </button>
          <span className="text-[var(--sg-text-4)] px-1">...</span>
          <button className="w-8 h-8 rounded-[var(--r-md)] border border-[var(--sg-border)] flex items-center justify-center text-[var(--sg-text-2)] hover:bg-[var(--sg-surface-2)] transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
