'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { WordReveal } from '@/components/fx/WordReveal';
import { smoothScrollTo } from '@/lib/scroll';
import { ArticleGrid, type Article } from './ArticleGrid';
import { NewsletterCard } from '@/components/marketing/newsletter/NewsletterCard';
import s from './InsightsExplorer.module.css';

// Insights page = the 2026 site's Marketplace hero (MarketplacePage.tsx):
// six columns of images scrolling up and down behind a glass search, the
// headline fading and lifting as you scroll away. The tiles here are our own
// article stills and explainer posters — no stock imagery. The hero search
// filters the article grid below.

type Tile = { src: string; label: string; href?: string };

const POSTERS = ['rag-studio', 'agent-builder', 'governance-hub', 'security-posture', 'data-pipeline', 'analytics-studio', 'cloud-console', 'workflow-engine', 'platform-compounding', 'services-to-saas', 'cluster-funnel'];

function Column({ tiles, duration, down }: { tiles: Tile[]; duration: number; down: boolean }) {
  // Doubled list + translate -50% = a seamless loop (same as the original).
  return (
    <div className={s.col}>
      <div className={s.track} style={{ animationDuration: `${duration}s`, animationDirection: down ? 'reverse' : 'normal' }}>
        {[...tiles, ...tiles].map((t, i) => (
          <div key={`${t.src}-${i}`} className={s.tile}>
            {/* Decorative wall: small resized images, never the LCP element. */}
            <Image src={t.src} alt="" fill sizes="(min-width: 1100px) 220px, (min-width: 768px) 33vw, 50vw" quality={60} />
            <span className={s.tileLabel}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InsightsExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0]);

  const columns = useMemo(() => {
    const tiles: Tile[] = [
      ...articles.map((a) => ({ src: a.heroImage, label: a.category })),
      ...POSTERS.map((p) => ({ src: `/poster/${p}.jpg`, label: 'Explainer' })),
    ];
    const cols: Tile[][] = [[], [], [], [], [], []];
    tiles.forEach((t, i) => cols[i % 6].push(t));
    return cols;
  }, [articles]);

  return (
    <>
      <section ref={heroRef} className={s.hero}>
        <div className={s.columns} aria-hidden="true">
          {columns.map((tiles, i) => (
            <Column key={i} tiles={tiles} duration={140 + i * 30} down={i % 2 === 1} />
          ))}
        </div>
        <div className={s.wash} aria-hidden="true" />

        <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center px-4 text-center">
          <p className="reveal-up liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-label text-[var(--sg-text-2)]">
            <span className="relative z-[2] size-1.5 rounded-full bg-[var(--sg-blue)]" />
            <span className="relative z-[2]">Insights · {articles.length} articles</span>
          </p>
          <h1 className="text-hero text-[var(--sg-text-1)] mt-7 text-balance [text-shadow:0_2px_24px_var(--sg-bg)]">
            <WordReveal text="Notes from building" delay={0.1} className="block" />{' '}
            <WordReveal text="enterprise AI." delay={0.35} wordClassName="shimmer-text" className="block" />
          </h1>
          <p className="reveal-up mt-6 max-w-[620px] text-balance font-sans text-[17px] font-medium leading-[1.6] text-[var(--sg-text-2)] md:text-[19px] [text-shadow:0_1px_16px_var(--sg-bg)]" style={{ animationDelay: '0.6s' }}>
            Technical guides on POPIA-compliant AI, RAG architecture, agents and what enterprise procurement actually asks — written by the people building the platform.
          </p>
          <form
            role="search"
            className={`reveal-up ${s.search}`}
            style={{ animationDelay: '0.75s' }}
            onSubmit={(e) => {
              e.preventDefault();
              if (gridRef.current) smoothScrollTo(gridRef.current, { offset: -96 });
            }}
          >
            <Search size={18} aria-hidden="true" className={s.searchIcon} />
            <label htmlFor="insights-search" className="sr-only">Search articles</label>
            <input
              id="insights-search"
              type="search"
              placeholder="Search articles — POPIA, RAG, agents…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </form>
        </motion.div>
      </section>

      <Section tone="base" spacing="lg" background="resourcesLattice" className="border-t border-[var(--sg-border)]">
        <div ref={gridRef}>
          <ArticleGrid articles={articles} query={query} />
        </div>
        <NewsletterCard source="insights" className="mx-auto mt-[var(--sp-16)] max-w-[960px]" />
      </Section>
    </>
  );
}
