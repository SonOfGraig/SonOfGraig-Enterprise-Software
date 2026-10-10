import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { SERVICES } from '@/lib/services';
import { SERVICE_ICONS } from '@/components/marketing/services/serviceIcons';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/fx/Reveal';
import { ExplainerVideo } from '@/components/marketing/_shared/ExplainerVideo';
import { explainerSources } from '@/lib/assets';

// Same source as the service pages — never re-type service copy here.
const services = SERVICES.map((s) => ({
  icon: SERVICE_ICONS[s.slug],
  category: s.category,
  title: s.title,
  href: `/services/${s.slug}`,
  description: s.summary,
  features: s.deliverables.slice(0, 3),
  price: s.price,
  meta: s.meta,
}));

export function ServicesGrid() {
  return (
    <Section tone="base" spacing="lg" divider background="dataShards">
      <SectionHeader
        eyebrow="Available now"
        title="Expert delivery while the platform is built."
        description="Every project follows the same architecture as the AI Dev Platform. Fixed scope, fixed price, defined outcome."
        action={
          <Button variant="secondary" size="md" asChild>
            <Link href="/services">All services</Link>
          </Button>
        }
      />

      {/* Delivery in practice — explainers of the kind of systems we build for clients. */}
      <div className="grid gap-[var(--sp-6)] md:grid-cols-2 mb-[var(--sp-10)]">
        {[
          { video: 'workflow-engine', label: 'Workflow automation', caption: 'A CRM trigger routed through enrichment, scoring, a branch and a deal sink.', body: 'Triggers, actions, branches and delays — scheduled or event-driven automations wired into the tools you already use.' },
          { video: 'cloud-console', label: 'Cloud architecture', caption: 'A multi-cloud control plane with region map, cost gauge and live activity log.', body: 'Infrastructure as code with cost guardrails, observability and a live activity log your team can actually read.' },
        ].map((d, i) => (
          <Reveal key={d.video} delay={i * 0.1} blur>
            <ExplainerVideo light={explainerSources(d.video)} dark={explainerSources(`${d.video}-dark`)} caption={d.caption} />
            <p className="text-label text-[var(--sg-blue)] mt-[var(--sp-4)]">{d.label}</p>
            <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-2)]">{d.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-[var(--sp-4)] md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.1} blur className="h-full">
            <ServiceCard {...s} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-[var(--sp-6)]">
        <Card padding="md" className="flex flex-col sm:flex-row sm:items-center justify-between gap-[var(--sp-4)] border-[var(--sg-blue-border)]">
          <div className="flex items-start gap-[var(--sp-4)]">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">A fast track into the platform</p>
              <p className="text-body text-[var(--sg-text-3)] mt-1 max-w-[560px]">
                Every project client gets a fast track into AI Dev Platform early access, and your implementation becomes a platform template.
              </p>
            </div>
          </div>
          <Button variant="primary" size="md" className="shrink-0" asChild>
            <Link href="/contact">Start a project</Link>
          </Button>
        </Card>
      </Reveal>
    </Section>
  );
}
