import type { Metadata } from 'next';
import { Compass, Flag, Palette, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';

export const metadata: Metadata = {
  title: 'Changelog — sonofgraig | What we shipped',
  description: 'What sonofgraig has shipped and changed, newest first. Only things that actually happened.',
  alternates: { canonical: '/changelog' },
  openGraph: { title: 'Changelog — sonofgraig', description: 'What we shipped, as we shipped it.', type: 'website', url: '/changelog', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

// Rebuilt 2026-10-09 with verifiable entries only. The legacy changelog
// reported releases (e.g. "RAG Studio GA, Dec 2025"), a signed founding
// customer, a SOC 2 audit and a security advisory that contradict the rest of
// the site and could not be verified. It remains in git history; restore any
// entry the founder confirms. Rule: past and present only — never future dates.
const ENTRIES: TimelineItem[] = [
  {
    when: '9 Oct 2026',
    title: 'New website and design system v3.1',
    body: 'A rebuilt sonofgraig.com: the AI Dev Platform as our one product, motion and backgrounds ported from our 2026 agency site, raised buttons, and an honesty pass that removed ship dates and every claim we cannot back up today.',
    icon: <Sparkles />,
    current: true,
  },
  {
    when: 'Apr 2026',
    title: 'Design system v3.0',
    body: 'A full rebuild from the agency-era look: light and dark themes, a single brand blue with amber reserved for pricing, and a governed component library.',
    icon: <Palette />,
  },
  {
    when: 'Apr 2026',
    title: 'SaaS Transformation Strategy v1.0',
    body: 'The plan that maps eighteen service lines onto five product clusters, starting with the AI Dev Platform.',
    icon: <Compass />,
  },
  {
    when: '2 Mar 2025',
    title: 'SonOfGraig Digital Solutions registered',
    body: 'The company is registered in KwaMhlanga, Mpumalanga.',
    icon: <Flag />,
  },
];

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        scene="globalSignals"
        eyebrow="Changelog"
        title="What we shipped,"
        accent="as we shipped it."
        lead="Releases, policy changes and milestones, newest first. Only things that have actually happened — no announcements of things still to come."
        primary={{ label: 'Follow the platform', href: '/platform/ai-dev-platform' }}
        secondary={{ label: 'Read Insights', href: '/blog' }}
      />
      <Section tone="base" spacing="lg" background="temporalFlux">
        <SectionHeader eyebrow="Log" title="Newest first." align="center" />
        <Timeline items={ENTRIES} />
      </Section>
      <CTABand scene="assemblyLine"
        eyebrow="Build in public"
        title="Want to shape what goes in the next entry?"
        body="Founding customers set the priorities for what ships next."
        primary={{ label: 'Join early access', href: '/early-access' }}
        secondary={{ label: 'Talk to us', href: '/contact' }}
      />
    </>
  );
}
