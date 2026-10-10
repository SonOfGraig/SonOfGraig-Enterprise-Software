import type { Metadata } from 'next';
import { PhoneCall, FileSignature, Hammer, Gift } from 'lucide-react';
import { SERVICE_ICONS } from '@/components/marketing/services/serviceIcons';
import { PageHero } from '@/components/marketing/_shared/PageHero';
import { CTABand } from '@/components/marketing/_shared/CTABand';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Timeline } from '@/components/ui/Timeline';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { SERVICES } from '@/lib/services';
import { faqPageJsonLd, OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';
import { servicesFaqs } from '@/lib/seo/faqs';

export const metadata: Metadata = {
  title: 'Services — sonofgraig | Fixed-Scope Enterprise AI Engagements',
  description:
    'Four fixed-scope services for South African enterprises: AI agents, RAG knowledge bases, AI governance audits and cloud architecture. Priced in rand, POPIA-aligned.',
  alternates: { canonical: '/services' },
  openGraph: { images: OG_IMAGES,
    title: 'Services — sonofgraig',
    description: 'Four fixed-scope enterprise AI services for South African enterprises. Priced in rand, POPIA-aligned.',
    type: 'website',
    url: '/services',
    locale: 'en_ZA',
  },
  robots: ROBOTS_INDEX,
};

const STEPS = [
  { when: 'Step 1', title: 'Discovery call', body: 'A 30-minute scoping session. We diagnose the problem and recommend the right approach — including “you don’t need us”.', icon: <PhoneCall /> },
  { when: 'Step 2', title: 'Proposal and scope', body: 'A fixed-scope proposal with defined deliverables, timeline and price in rand. No surprises.', icon: <FileSignature /> },
  { when: 'Step 3', title: 'Build and deliver', body: 'Weekly updates while we build. Delivery includes full hand-over documentation, and the code lives in your repositories.', icon: <Hammer /> },
  { when: 'Step 4', title: 'Into the platform', body: 'Your project becomes a template for the AI Dev Platform, and you get a fast track into early access.', icon: <Gift /> },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/services', servicesFaqs)) }} />
      <PageHero
        scene="latticeTunnel"
        eyebrow="Services · Available now"
        title="Expert delivery while"
        accent="the platform is built."
        lead="Four fixed-scope engagements, priced in rand. Every project follows the same architecture as the AI Dev Platform — and the code is yours."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'How it works', href: '#process' }}
      />

      <Section tone="base" spacing="lg" background="webDevProbe">
        <SectionHeader eyebrow="Engagements" title="Pick the problem. We bring the playbook." />
        <div className="grid gap-[var(--sp-4)] md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1} blur className="h-full">
              <ServiceCard
                icon={SERVICE_ICONS[s.slug]}
                category={s.category}
                title={s.title}
                description={s.summary}
                features={s.deliverables.slice(0, 3)}
                price={s.price}
                meta={s.meta}
                href={`/services/${s.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="process" tone="base" spacing="lg" divider background="temporalFlux">
        <SectionHeader eyebrow="How it works" title="From first call to hand-over." align="center" />
        <Timeline items={STEPS} />
      </Section>

      <Section tone="base" spacing="lg" divider width="narrow" background="acousticWaves">
        <SectionHeader eyebrow="Questions" title="What buyers ask before they start." align="center" />
        <Reveal>
          <FAQ items={servicesFaqs.map((f) => ({ q: f.q, a: f.a }))} />
        </Reveal>
      </Section>

      <CTABand scene="dataShards"
        eyebrow="Fixed scope · ZAR pricing"
        title="Tell us what you are trying to do."
        body="You will hear back from a person within two business days — with a recommendation, not a sales sequence."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'See the platform', href: '/#platform' }}
      />
    </>
  );
}
