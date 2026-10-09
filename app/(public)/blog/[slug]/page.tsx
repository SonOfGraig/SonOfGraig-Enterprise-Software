import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Callout } from '@/components/ui/Callout';
import { SceneBackground } from '@/components/fx/SceneBackground';
import { FAQ } from '@/components/ui/FAQ';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SubscribeForm } from '@/components/marketing/blog/SubscribeForm';
import { getAllSlugs, getPost, getRelatedPosts } from '@/lib/blog';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, videoJsonLd } from '@/lib/blog/schema';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

function formatDisplayDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPost(slug);
  if (!article) return {};
  const canonical = `/blog/${article.slug}`;
  return {
    title: article.seoTitle ?? `${article.title} | sonofgraig Insights`,
    description: article.excerpt,
    alternates: { canonical },
    keywords: [article.primaryKeyword, ...article.keywords],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: canonical,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author.url],
      tags: [article.primaryKeyword, ...article.keywords],
      images: [
        {
          url: `/blog/og/${article.slug}.png`,
          width: 1200,
          height: 630,
          alt: article.heroAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [`/blog/og/${article.slug}.png`],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPost(slug);
  if (!article) notFound();

  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  const related = getRelatedPosts(article.slug, 2);

  const jsonLd = [
    articleJsonLd(article),
    breadcrumbJsonLd(article),
    faqJsonLd(article),
    // Only posts with a rendered motion graphic get VideoObject schema.
    article.motionComposition
      ? videoJsonLd({
          name: article.title,
          description: article.excerpt,
          slug: article.slug,
          // Motion compositions run 360 frames at 30fps (see remotion/src/Root.tsx).
          durationSeconds: 12,
        })
      : null,
  ].filter(Boolean);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="w-full pb-[var(--sp-16)]">
        {/* HEADER — over a quiet dot-matrix scene (design system v3.1). */}
        <div className="relative overflow-hidden pt-[var(--sp-16)] pb-[var(--sp-4)]">
          <SceneBackground scene="nebula" />
          <div className="relative z-10 max-w-[720px] mx-auto px-6 sm:px-8">
          <header className="mb-[var(--sp-10)] reveal-up">
            <div className="font-sans text-[12px] text-[var(--sg-text-4)] mb-6">
              <Link href="/blog" className="hover:text-[var(--sg-text-2)] transition-colors">Insights</Link> / {article.category} / {article.title}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-2)] font-sans text-[11px] font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="font-sans text-[12px] text-[var(--sg-text-4)]">
                {formatDisplayDate(article.datePublished)} · {article.readingTime} min read
              </span>
            </div>

            <h1 className="text-h1 text-[var(--sg-text-1)] mb-6">{article.title}</h1>
            <p className="text-body-lg text-[var(--sg-text-3)] leading-relaxed">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--sg-surface-2)] flex items-center justify-center font-sans text-[12px] font-semibold text-[var(--sg-text-2)]">
                TR
              </div>
              <div>
                <div className="font-sans text-[13px] font-semibold text-[var(--sg-text-1)]">{article.author.name}</div>
                <div className="font-sans text-[11px] text-[var(--sg-text-4)]">{article.author.jobTitle}</div>
              </div>
            </div>
          </header>
          </div>
        </div>
        <div className="max-w-[720px] mx-auto px-6 sm:px-8">

          {/* HERO IMAGE — rendered from the post's Remotion composition
              (remotion/src/compositions/BlogHero*.tsx) to /blog/og/{slug}.png. */}
          <figure className="mb-[var(--sp-10)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/blog/og/${article.slug}.png`}
              alt={article.heroAlt}
              width={1280}
              height={720}
              loading="eager"
              className="w-full h-auto rounded-[var(--r-lg)] border border-[var(--sg-border)]"
            />
          </figure>

          {/* ARTICLE BODY */}
          <div
            className="sg-prose"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          {/* MOTION GRAPHIC — branded explainer rendered from the post's Remotion
              motionComposition to /blog/motion/{slug}.mp4. Only rendered for posts
              that ship a motion asset; emitted as VideoObject JSON-LD above too. */}
          {article.motionComposition ? (
            <figure className="mt-[var(--sp-12)]">
              <video
                className="w-full h-auto rounded-[var(--r-lg)] border border-[var(--sg-border)]"
                poster={`/blog/og/${article.slug}.png`}
                controls
                muted
                loop
                playsInline
                preload="none"
              >
                <source src={`/blog/motion/${article.slug}.mp4`} type="video/mp4" />
              </video>
              <figcaption className="mt-3 font-sans text-[12px] text-[var(--sg-text-4)]">
                {article.heroAlt}
              </figcaption>
            </figure>
          ) : null}

          {/* FAQ */}
          {article.faq && article.faq.length > 0 ? (
            <section className="mt-[var(--sp-12)]">
              <h2 className="text-h2 text-[var(--sg-text-1)] mb-6">Frequently asked</h2>
              <FAQ items={article.faq.map(({ question, answer }) => ({ q: question, a: answer }))} />
            </section>
          ) : null}

          {/* FOOTER */}
          <footer className="mt-[var(--sp-16)] pt-[var(--sp-8)] border-t border-[var(--sg-border)]">
            <div className="flex items-center justify-between mb-[var(--sp-12)]">
              <div className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)]">Share this article</div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm" className="rounded-full px-4" asChild>
                  <a href={twitterShare} target="_blank" rel="noopener noreferrer">X</a>
                </Button>
                <Button variant="secondary" size="sm" className="rounded-full px-4" asChild>
                  <a href={linkedInShare} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </Button>
              </div>
            </div>

            <Callout
              variant="info"
              label="Subscribe to our build updates"
              body="Get notified when we publish new insights about our transition to a platform company."
              className="mb-[var(--sp-12)]"
            >
              <SubscribeForm />
            </Callout>

            {related.length > 0 ? (
              <div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-6">Related insights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--sp-4)]">
                  {related.map((r) => (
                    <Card key={r.slug} padding="md" interactive asChild className="group block">
                      <Link href={`/blog/${r.slug}`}>
                        <div className="text-label text-[var(--sg-text-4)] mb-2">{r.category}</div>
                        <h4 className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)] mb-2 group-hover:text-[var(--sg-blue)] transition-colors">{r.title}</h4>
                        <div className="font-mono text-[11px] text-[var(--sg-text-4)]">{formatDisplayDate(r.datePublished)}</div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
          </footer>
        </div>
      </article>
    </>
  );
}
