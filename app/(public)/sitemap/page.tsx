import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/fx/Reveal';
import { ROUTES, type SiteRoute } from '@/lib/routes';
import { getAllPosts } from '@/lib/blog';
import { OG_IMAGES } from '@/lib/seo';

// Human-readable sitemap, generated from the same list as /sitemap.xml.

export const metadata: Metadata = {
  title: 'Sitemap — Every Page on sonofgraig',
  description: 'Every page on sonofgraig.com in one place: the AI Dev Platform, services, pricing, Insights articles, company and trust pages.',
  alternates: { canonical: '/sitemap' },
  openGraph: { images: OG_IMAGES, title: 'Sitemap — sonofgraig', description: 'Every page on sonofgraig.com.', type: 'website', url: '/sitemap', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

const GROUPS: SiteRoute['group'][] = ['Product', 'Services', 'Company', 'Trust & legal'];

export default function SitemapPage() {
  const posts = getAllPosts();
  const columns = [
    ...GROUPS.map((g) => ({ title: g, links: ROUTES.filter((r) => r.group === g && r.path !== '/sitemap').map((r) => ({ href: r.path, label: r.label })) })),
    { title: 'Insights', links: posts.map((p) => ({ href: `/blog/${p.slug}`, label: p.title })) },
  ];
  return (
    <>
      <PageHero
        scene="spatialDisplacement"
        eyebrow="Sitemap"
        title="Every page,"
        accent="in one place."
        lead={`${ROUTES.length - 1 + posts.length} pages across the platform, services, company and Insights.`}
      />
      <Section tone="base" spacing="lg" background="modularLattice">
        <div className="grid gap-[var(--sp-4)] md:grid-cols-2 lg:grid-cols-3">
          {columns.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06} blur className={c.title === 'Insights' ? 'h-full md:col-span-2' : 'h-full'}>
              <Card padding="lg" className="h-full">
                <h2 className="text-h3 text-[var(--sg-text-1)]">{c.title}</h2>
                <ul className={c.title === 'Insights' ? 'mt-[var(--sp-5)] grid gap-x-[var(--sp-6)] gap-y-[var(--sp-3)] sm:grid-cols-2' : 'mt-[var(--sp-5)] space-y-[var(--sp-3)]'}>
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-body text-[var(--sg-text-2)] transition-colors hover:text-[var(--sg-blue)]">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
