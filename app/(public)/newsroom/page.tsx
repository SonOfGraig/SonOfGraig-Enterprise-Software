import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Mail, Rss } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/fx/Reveal';
import { OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';
import { formatNewsDate, publishedNews } from '@/lib/news';
import { MEDIA_CONTACT } from '@/lib/press';

const hasNews = publishedNews().length > 0;

export const metadata: Metadata = {
  title: 'Newsroom — Company News & Announcements | sonofgraig',
  description: 'Official announcements from sonofgraig, the South African enterprise AI software company: product news, company updates and press releases.',
  alternates: { canonical: '/newsroom', types: { 'application/rss+xml': [{ url: '/newsroom/feed.xml', title: 'sonofgraig Newsroom' }] } },
  openGraph: { images: OG_IMAGES, title: 'sonofgraig Newsroom', description: 'Company news and announcements.', type: 'website', url: '/newsroom', locale: 'en_ZA' },
  // An empty newsroom is thin content; index it once the first release is out.
  robots: hasNews ? ROBOTS_INDEX : { index: false, follow: true },
};

export default function NewsroomPage() {
  const news = publishedNews();
  return (
    <>
      <PageHero
        scene="missionBeams"
        eyebrow="Newsroom"
        title="News from"
        accent="sonofgraig."
        lead="Official announcements: product news, company updates and press releases. For background, boilerplate and the logo, see the press kit."
        primary={{ label: 'Press kit', href: '/press' }}
        secondary={{ label: 'RSS feed', href: '/newsroom/feed.xml' }}
      />

      <Section tone="base" spacing="lg" background="dotMatrix">
        <div className="grid gap-[var(--sp-8)] lg:grid-cols-[1fr_320px]">
          <div className="space-y-[var(--sp-4)]">
            {news.length === 0 && (
              <Card padding="lg">
                <p className="text-label text-[var(--sg-blue)]">Coming soon</p>
                <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-3)]">
                  Our first announcement is on its way. Subscribe to the RSS feed or sonofgraig Insights to hear when it lands.
                </p>
              </Card>
            )}
            {news.map((n, i) => (
              <Reveal key={n.slug} delay={Math.min(i, 4) * 0.05}>
                <Card padding="lg" interactive asChild className="group block">
                  <Link href={`/newsroom/${n.slug}`}>
                    <p className="font-mono text-[12px] text-[var(--sg-text-4)]">
                      <time dateTime={n.date}>{formatNewsDate(n.date)}</time> · {n.category}
                    </p>
                    <h2 className="text-h3 mt-[var(--sp-2)] text-[var(--sg-text-1)] group-hover:text-[var(--sg-blue)] transition-colors">{n.title}</h2>
                    <p className="text-body mt-[var(--sp-2)] text-[var(--sg-text-3)]">{n.summary}</p>
                    <span className="mt-[var(--sp-4)] inline-flex items-center gap-1 font-sans text-[14px] font-medium text-[var(--sg-blue)]">
                      Read the release <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-[var(--sp-4)]">
            <Card padding="lg">
              <p className="text-label text-[var(--sg-text-4)]">Media contact</p>
              <p className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)] mt-[var(--sp-3)]">{MEDIA_CONTACT.name}</p>
              <p className="text-body text-[var(--sg-text-3)]">{MEDIA_CONTACT.role}</p>
              <a href={`mailto:${MEDIA_CONTACT.email}?subject=Media%20enquiry`} className="mt-[var(--sp-3)] inline-flex items-center gap-1.5 text-body text-[var(--sg-blue)] hover:underline">
                <Mail size={14} aria-hidden="true" /> {MEDIA_CONTACT.email}
              </a>
              <p className="text-body text-[var(--sg-text-3)] mt-1">{MEDIA_CONTACT.phone}</p>
            </Card>
            <Card padding="lg">
              <p className="text-label text-[var(--sg-text-4)]">Follow the news</p>
              <a href="/newsroom/feed.xml" className="mt-[var(--sp-3)] inline-flex items-center gap-1.5 text-body text-[var(--sg-blue)] hover:underline">
                <Rss size={14} aria-hidden="true" /> Newsroom RSS feed
              </a>
              <Link href="/blog" className="mt-[var(--sp-2)] flex items-center gap-1.5 text-body text-[var(--sg-blue)] hover:underline">
                <ArrowUpRight size={14} aria-hidden="true" /> Insights articles
              </Link>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
