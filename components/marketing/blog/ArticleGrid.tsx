'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Design system v3.1 — Insights grid. Category filter (raised segmented
// control), a featured first article, and cards that resolve in from a blur
// (2026-site entrance). The old non-functional pagination bar is gone.

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  /** Per-post hero still, rendered to /blog/og/{slug}.png. */
  heroImage: string;
  heroAlt: string;
}

function ArticleCard({ a, featured = false }: { a: Article; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--sg-blue-border)] hover:shadow-[var(--shadow-lift-md)]',
        featured && 'lg:flex-row',
      )}
    >
      <div className={cn('relative overflow-hidden bg-[var(--sg-surface-2)]', featured ? 'aspect-video lg:aspect-auto lg:w-3/5' : 'aspect-video')}>
        {/* next/image serves resized AVIF/WebP instead of the 1200×630 PNG (~216 KB each). */}
        <Image
          src={a.heroImage}
          alt={a.heroAlt}
          fill
          sizes={featured ? '(min-width: 1024px) 640px, 100vw' : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <div className={cn('flex flex-1 flex-col p-[var(--sp-6)]', featured && 'lg:p-[var(--sp-10)]')}>
        <span className="w-fit rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface-2)] px-2.5 py-0.5 text-label text-[var(--sg-text-3)]">{a.category}</span>
        {featured ? (
          <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] transition-colors group-hover:text-[var(--sg-blue)]">{a.title}</h2>
        ) : (
          <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-4)] transition-colors group-hover:text-[var(--sg-blue)]">{a.title}</h3>
        )}
        <p className={cn('text-[var(--sg-text-3)] mt-[var(--sp-3)] flex-1', featured ? 'text-body-lg' : 'text-body line-clamp-3')}>{a.excerpt}</p>
        <div className="mt-[var(--sp-6)] flex items-center justify-between border-t border-[var(--sg-border)] pt-[var(--sp-4)]">
          <span className="font-mono text-[11px] text-[var(--sg-text-4)]">
            {a.date} · {a.readTime} min
          </span>
          <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--sg-blue)]">
            Read <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleGrid({ articles, query = '' }: { articles: Article[]; /** Free-text search from the Insights hero. */ query?: string }) {
  const reduced = useReducedMotion();
  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const [cat, setCat] = useState('All');
  const q = query.trim().toLowerCase();
  const shown = articles.filter(
    (a) => (cat === 'All' || a.category === cat) && (!q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q)),
  );
  if (articles.length === 0) return null;
  const [featured, ...rest] = shown;

  return (
    <div>
      <div role="tablist" aria-label="Filter by category" className="mx-auto mb-[var(--sp-10)] flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface-2)] p-1 shadow-[inset_0_1px_2px_rgba(13,17,23,.06)] sm:rounded-full">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            type="button"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={cn('rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-colors', cat === c ? 'btn-raised-primary' : 'text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]')}
          >
            {c}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={`${cat}|${q}`} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          {!featured && (
            <p className="py-[var(--sp-16)] text-center text-body text-[var(--sg-text-3)]">
              No articles match &ldquo;{query.trim()}&rdquo;. Try a broader word, or pick another category.
            </p>
          )}
          {featured && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArticleCard a={featured} featured />
            </motion.div>
          )}
          <div className="mt-[var(--sp-4)] grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ArticleCard a={a} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
