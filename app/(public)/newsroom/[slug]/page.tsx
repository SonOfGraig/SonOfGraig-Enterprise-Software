import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { breadcrumbJsonLd, OG_IMAGES, ORG_ID, ROBOTS_INDEX, SITE_URL } from '@/lib/seo';
import { formatNewsDate, getRelease, NEWS, releaseTime } from '@/lib/news';
import { BOILERPLATE_LONG, MEDIA_CONTACT } from '@/lib/press';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = getRelease((await params).slug);
  if (!n) return {};
  const path = `/newsroom/${n.slug}`;
  return {
    title: `${n.title} | sonofgraig Newsroom`,
    description: n.summary,
    alternates: { canonical: path },
    openGraph: {
      images: OG_IMAGES,
      title: n.title,
      description: n.summary,
      type: 'article',
      url: path,
      publishedTime: releaseTime(n.date),
      locale: 'en_ZA',
    },
    robots: n.published ? ROBOTS_INDEX : { index: false, follow: false },
  };
}

export default async function ReleasePage({ params }: Props) {
  const n = getRelease((await params).slug);
  if (!n) notFound();
  const path = `/newsroom/${n.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: n.title,
      description: n.summary,
      datePublished: releaseTime(n.date),
      dateModified: releaseTime(n.date),
      mainEntityOfPage: `${SITE_URL}${path}`,
      image: [`${SITE_URL}/opengraph-image`],
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      articleSection: n.category,
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Newsroom', path: '/newsroom' },
      { name: n.title, path },
    ]),
  ];

  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Section tone="base" spacing="lg" width="narrow" className="pt-[var(--sp-16)]">
        {!n.published && (
          <p role="note" className="mb-[var(--sp-6)] rounded-[var(--r-lg)] border border-[var(--sg-warn)] bg-[var(--sg-surface-2)] px-[var(--sp-4)] py-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
            <strong>Draft for review.</strong> This release is not published: it is hidden from search, feeds and the newsroom list.
          </p>
        )}
        <Link href="/newsroom" className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[var(--sg-text-3)] hover:text-[var(--sg-blue)]">
          <ArrowLeft size={14} aria-hidden="true" /> Newsroom
        </Link>
        <p className="text-label text-[var(--sg-blue)] mt-[var(--sp-8)]">{n.category}</p>
        <h1 className="text-h1 mt-[var(--sp-3)] text-[var(--sg-text-1)] text-balance">{n.title}</h1>
        <p className="text-body-lg mt-[var(--sp-4)] text-[var(--sg-text-3)]">{n.summary}</p>
        <p className="font-mono text-[12px] mt-[var(--sp-6)] text-[var(--sg-text-4)]">
          <time dateTime={releaseTime(n.date)}>{formatNewsDate(n.date)}</time> · For immediate release
        </p>

        <div className="mt-[var(--sp-8)] space-y-[var(--sp-5)] border-t border-[var(--sg-border)] pt-[var(--sp-8)]">
          {n.body.map((p, i) => (
            <p key={i} className="text-body-lg text-[var(--sg-text-2)] leading-relaxed">
              {i === 0 && <strong className="text-[var(--sg-text-1)]">{n.dateline}, {formatNewsDate(n.date)} — </strong>}
              {p}
            </p>
          ))}

          {n.quote && (
            <blockquote className="my-[var(--sp-8)] border-l-2 border-[var(--sg-blue)] pl-[var(--sp-6)]">
              <p className="font-display text-[20px] leading-snug text-[var(--sg-text-1)]">“{n.quote.text}”</p>
              <footer className="text-body mt-[var(--sp-3)] text-[var(--sg-text-3)]">
                — {n.quote.name}, {n.quote.role}
              </footer>
            </blockquote>
          )}
        </div>

        {n.links && n.links.length > 0 && (
          <div className="mt-[var(--sp-8)] flex flex-wrap gap-[var(--sp-4)]">
            {n.links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 font-sans text-[15px] font-medium text-[var(--sg-blue)] hover:underline">
                {l.label} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}

        <Card padding="lg" className="mt-[var(--sp-12)]">
          <p className="text-label text-[var(--sg-text-4)]">About sonofgraig</p>
          <p className="text-body text-[var(--sg-text-2)] mt-[var(--sp-3)]">{BOILERPLATE_LONG}</p>
          <p className="text-label text-[var(--sg-text-4)] mt-[var(--sp-6)]">Media contact</p>
          <p className="text-body text-[var(--sg-text-2)] mt-[var(--sp-2)]">
            {MEDIA_CONTACT.name}, {MEDIA_CONTACT.role} ·{' '}
            <a href={`mailto:${MEDIA_CONTACT.email}`} className="text-[var(--sg-blue)] hover:underline">{MEDIA_CONTACT.email}</a> · {MEDIA_CONTACT.phone}
          </p>
          <Link href="/press" className="mt-[var(--sp-4)] inline-flex items-center gap-1 font-sans text-[14px] font-medium text-[var(--sg-blue)] hover:underline">
            Press kit and logo <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </Card>
      </Section>
    </>
  );
}
