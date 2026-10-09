import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, Banknote, Building2, CircleCheck, CircleDashed, Code2, Compass, FileText,
  Flag, Handshake, Landmark, Layers, MapPin, Rocket, Scale, ShieldCheck, Sparkles, Users,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/fx/Reveal';
import { ExplainerVideo } from '@/components/marketing/_shared/ExplainerVideo';
import { explainerSources } from '@/lib/assets';
import { aboutFaqs } from '@/lib/seo/faqs';

function Explainer({ name, caption }: { name: string; caption: string }) {
  return <ExplainerVideo light={explainerSources(name)} dark={explainerSources(`${name}-dark`)} caption={caption} />;
}

// ── 01 Founder ────────────────────────────────────────────────────────────
export function FounderSection() {
  return (
    <Section id="founder" tone="base" spacing="lg" background="nebula">
      <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-[var(--sp-12)] items-center">
        <Reveal blur>
          <figure className="group relative overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder/tumiso-graig-ramaboya.jpg"
              alt="Tumiso Graig Ramaboya, founder and CEO of sonofgraig"
              className="absolute inset-0 size-full object-cover grayscale-[35%] transition-[filter,transform] duration-700 ease-[var(--ease-out)] group-hover:grayscale-0 group-hover:scale-[1.03]"
            />
            {/* Glass is legitimate here: it sits over the photograph. */}
            <figcaption className="absolute left-4 right-4 bottom-4 liquid-glass rounded-[var(--r-xl)] px-5 py-4">
              <p className="relative z-[2] font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">Tumiso Graig Ramaboya</p>
              <p className="relative z-[2] font-sans text-[12px] text-[var(--sg-text-2)] mt-0.5">Founder, CEO &amp; POPIA Information Officer · Pretoria</p>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-label text-[var(--sg-blue)]">01 · Founder</p>
          <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">A real name, a real signature.</h2>
          <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">
            Tumiso founded sonofgraig to build a serious enterprise AI platform from inside South Africa — for South African
            regulatory conditions, in the currency South African enterprises actually budget in. He has personally delivered
            production RAG systems, AI agent implementations and POPIA compliance architecture for South African clients.
          </p>
          <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
            As the company&apos;s Information Officer, he signs its POPIA posture personally. That is not delegated. Every
            architectural decision in the platform is owned by a person you can email.
          </p>
          <Card padding="lg" className="mt-[var(--sp-8)] border-l-2 border-l-[var(--sg-blue)]">
            <blockquote className="font-display text-[19px] leading-[1.5] tracking-[-0.01em] text-[var(--sg-text-1)]">
              “A services firm sells expertise once per client. A software company sells the same capability to thousands of
              clients at once. Every service we have delivered is a repeatable pattern — and every repeatable pattern is a
              product waiting to be built.”
            </blockquote>
            <p className="font-mono text-[12px] text-[var(--sg-text-4)] mt-[var(--sp-4)]">— SaaS Transformation Strategy, v1.0 · TGR</p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

// ── 02 Thesis: from hours to access ──────────────────────────────────────
const NOW = ['Project-based invoicing', 'Human-delivered bespoke work', 'Headcount-constrained scaling'];
const NEXT = ['Subscription and usage-based pricing', 'Dashboard- and API-accessed software', 'Infrastructure-constrained scaling'];

export function ThesisSection() {
  return (
    <Section id="thesis" tone="base" spacing="lg" divider background="acousticWaves">
      <SectionHeader
        eyebrow="02 · The thesis"
        title="From hours to access."
        description="sonofgraig began as a digital services agency: eighteen service lines, sold as bespoke projects. That model has a ceiling. The transformation changes the unit of value — each service line becomes product logic inside a platform."
      />
      <Reveal blur>
        <Explainer name="services-to-saas" caption="Services billed by the hour turn into recurring platform access." />
      </Reveal>
      <div className="grid md:grid-cols-2 gap-[var(--sp-4)] mt-[var(--sp-6)]">
        {[
          { label: 'Where we started', title: 'A services agency', items: NOW, icon: CircleDashed },
          { label: 'Where we are going', title: 'A software company', items: NEXT, icon: CircleCheck },
        ].map((col, i) => (
          <Reveal key={col.title} delay={i * 0.1} blur className="h-full">
            <Card padding="lg" className="h-full">
              <p className="text-label text-[var(--sg-text-4)]">{col.label}</p>
              <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-2)]">{col.title}</h3>
              <ul className="mt-[var(--sp-6)] space-y-[var(--sp-3)]">
                {col.items.map((it) => (
                  <li key={it} className="flex items-center gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
                    <col.icon size={16} aria-hidden="true" className={i ? 'text-[var(--sg-blue)]' : 'text-[var(--sg-text-4)]'} />
                    {it}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 03 Strategy: beachhead, then compound ────────────────────────────────
export function StrategySection() {
  return (
    <Section id="parallel" tone="base" spacing="lg" divider background="modularLattice">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-[var(--sp-12)] items-center">
        <Reveal>
          <p className="text-label text-[var(--sg-blue)]">03 · The strategy</p>
          <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">Build a beachhead, then compound.</h2>
          <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">
            Google did not start as a search company that decided to build software — it was always building platforms.
            Search was the beachhead; then Gmail, Drive, Cloud and Android. Each product created gravity for the next.
          </p>
          <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
            Our beachhead is the AI Dev Platform. Services revenue funds the build; every engagement adds patterns the
            platform can reuse. A services business grows in a straight line. A platform compounds.
          </p>
        </Reveal>
        <Reveal blur delay={0.1}>
          <Explainer name="platform-compounding" caption="Services revenue grows linearly; platform revenue compounds." />
        </Reveal>
      </div>
    </Section>
  );
}

// ── 04 Clusters: 18 → 5 ──────────────────────────────────────────────────
const CLUSTERS = [
  { n: '01', name: 'AI Dev Platform', note: 'Agents, RAG, governance, ML Ops', status: 'Active build' },
  { n: '02', name: 'Cloud & DevOps', note: 'Infrastructure as code, CI/CD, security, FinOps', status: 'Planned' },
  { n: '03', name: 'Data & Analytics', note: 'Pipelines, BI, automation', status: 'Planned' },
  { n: '04', name: 'Creative & XR', note: 'Design systems, brand, AR/VR', status: 'Planned' },
  { n: '05', name: 'Dev Platform', note: 'Low-code, IoT, mobile', status: 'Planned' },
];

export function ClustersSection() {
  return (
    <Section id="clusters" tone="base" spacing="lg" divider background="knowledgeGraph">
      <SectionHeader
        eyebrow="04 · The plan"
        title="Eighteen service lines become five product clusters."
        description="Grouped by the value they deliver, the infrastructure they share and the buyer they serve. Each cluster must stand alone as a business and be worth more alongside the others. We build them one at a time — starting with the AI Dev Platform."
      />
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-[var(--sp-6)] items-start">
        <Reveal blur>
          <Explainer name="cluster-funnel" caption="Eighteen service lines flow into five SaaS clusters." />
        </Reveal>
        <Reveal delay={0.1}>
          <Card padding="none" className="overflow-hidden">
            <ul className="divide-y divide-[var(--sg-border)]">
              {CLUSTERS.map((c, i) => (
                <li key={c.n} className="group flex items-center gap-[var(--sp-4)] px-[var(--sp-6)] py-[var(--sp-4)] transition-colors hover:bg-[var(--sg-surface-2)]">
                  <span className="font-mono text-[12px] text-[var(--sg-text-4)] w-6">{c.n}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-sans text-[14px] font-semibold ${i === 0 ? 'text-[var(--sg-blue)]' : 'text-[var(--sg-text-1)]'}`}>{c.name}</p>
                    <p className="font-sans text-[12px] text-[var(--sg-text-3)] truncate">{c.note}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-[var(--r-sm)] border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      i === 0
                        ? 'border-[var(--sg-success-bd)] bg-[var(--sg-success-bg)] text-[var(--sg-success)]'
                        : 'border-[var(--sg-border)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)]'
                    }`}
                  >
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

// ── 05 Story so far (Chronos timeline) — past and present only ───────────
const STORY: TimelineItem[] = [
  { when: '2 Mar 2025', title: 'Company registered', body: 'SonOfGraig Digital Solutions (Pty) Ltd registered in KwaMhlanga, Mpumalanga.', icon: <Flag /> },
  { when: '2025', title: 'A services agency', body: 'Eighteen service lines delivering AI, cloud, data and design projects for South African clients.', icon: <Users /> },
  { when: 'Apr 2026', title: 'The SaaS transformation', body: 'The SaaS Transformation Strategy maps the eighteen service lines onto five product clusters.', icon: <Compass /> },
  { when: 'Now', title: 'Building the AI Dev Platform', body: 'RAG Studio is open for early access and Agent Builder is in development. Services continue and fund the build.', icon: <Rocket />, current: true },
];

export function StorySection() {
  return (
    <Section id="story" tone="base" spacing="lg" divider background="temporalFlux">
      <SectionHeader eyebrow="05 · The story so far" title="Where we have come from." align="center" />
      <Timeline items={STORY} />
    </Section>
  );
}

// ── 06 Convictions ───────────────────────────────────────────────────────
const VALUES = [
  { icon: Banknote, title: 'ZAR pricing removes FX risk', body: 'Our costs are in rand, so our prices are in rand. Your software budget does not move when the currency does.' },
  { icon: ShieldCheck, title: 'POPIA is architecture, not a checkbox', body: 'Compliance designed in is cheaper to run than compliance bolted on: PII scrubbing in middleware, audit logs that cannot be deleted.' },
  { icon: MapPin, title: 'Local AI deserves local builders', body: 'AI for South African enterprises should be built by people who understand both the technology and the regulatory regime.' },
  { icon: Sparkles, title: 'Build in public, including failures', body: 'Phase status is visible and delays are explained. We publish what we learn moving from agency to software company.' },
  { icon: Code2, title: 'Customers own their source code', body: 'Every engagement ships infrastructure and application code into your Git — no lock-in. The relationship stays voluntary.' },
  { icon: Scale, title: 'Independent audits stay independent', body: '“Your existing system is fine” is as valid an audit outcome as “replace it”. Most audits do not end in a product sale.' },
];

export function ValuesSection() {
  return (
    <Section id="values" tone="base" spacing="lg" divider background="missionBeams">
      <SectionHeader
        eyebrow="06 · What we believe"
        title="Six convictions that shape every decision."
        description="Operating principles that decide what we ship, who we hire, how we price and what we say no to. Each has a cost, and we accept it."
      />
      <div className="grid gap-[var(--sp-4)] sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={(i % 3) * 0.08} blur className="h-full">
            <FeatureCard icon={v.icon} title={v.title} body={v.body} index={`0${i + 1}`} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 07 Company facts ─────────────────────────────────────────────────────
// Statements kept as the founder wrote them, except: production region and
// certification posture are stated as they are today (no af-south-1 / SOC 2 claims).
const FACTS: { icon: typeof Building2; k: string; v: string; sub?: string }[] = [
  { icon: Building2, k: 'Legal name', v: 'SonOfGraig Digital Solutions (Pty) Ltd', sub: 'Trading as sonofgraig' },
  { icon: Users, k: 'Founder & CEO', v: 'Tumiso Graig Ramaboya', sub: 'Also Information Officer' },
  { icon: MapPin, k: 'Registered office', v: '9810 Moloto South Drive, Ext 8', sub: 'KwaMhlanga, Mpumalanga, 1022' },
  { icon: Landmark, k: 'Operating base', v: 'Pretoria, South Africa', sub: 'UTC+02:00' },
  { icon: BadgeCheck, k: 'CIPC', v: 'Registered', sub: 'Companies and Intellectual Property Commission' },
  { icon: BadgeCheck, k: 'B-BBEE', v: 'Certified', sub: 'Certificate available on request' },
  { icon: ShieldCheck, k: 'Information Regulator', v: 'Information Officer registered', sub: 'inforegulator.org.za' },
  { icon: FileText, k: 'PAIA manual', v: 'Available on request', sub: 'Promotion of Access to Information Act' },
  { icon: Layers, k: 'Data residency', v: 'Confirmed per engagement', sub: 'Stated in each Data Processing Agreement' },
  { icon: ShieldCheck, k: 'Certifications', v: 'POPIA-aligned', sub: 'No SOC 2 or ISO 27001 certification held yet' },
  { icon: Banknote, k: 'Pricing currency', v: 'South African rand (ZAR)', sub: 'No FX pass-through' },
  { icon: FileText, k: 'DPA', v: 'Pre-signed DPA', sub: 'sonofgraig.com/dpa' },
];

const AUDIENCES = [
  { icon: FileText, title: 'For procurement', body: 'B-BBEE and CIPC certificates, the pre-signed DPA, PAIA manual and an information-security questionnaire — ready to send.', href: '/security', link: 'Trust centre' },
  { icon: Handshake, title: 'For directors', body: 'Partnerships, board-to-board introductions and analyst briefings go directly to the founder under NDA.', href: '/contact', link: 'Contact the founder' },
  { icon: Banknote, title: 'For investors', body: 'Privately held, no external venture capital to date. Services revenue funds the build. We will update this honestly when that changes.', href: '/contact', link: 'Get in touch' },
];

export function CompanyFactsSection() {
  return (
    <Section id="company" tone="base" spacing="lg" divider background="perspectiveFloor">
      <SectionHeader
        eyebrow="07 · Company facts"
        title="Everything procurement asks for, in one place."
        description={
          <>
            For certificates or attestations, email{' '}
            <a href="mailto:tumiso@sonofgraig.com" className="text-[var(--sg-blue)] hover:underline">tumiso@sonofgraig.com</a>.
          </>
        }
      />
      <Reveal>
        <Card padding="none" className="overflow-hidden">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.k} className="flex gap-[var(--sp-3)] p-[var(--sp-5)] border-b border-[var(--sg-border)] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
                <f.icon size={16} aria-hidden="true" className="text-[var(--sg-blue)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <dt className="text-label text-[var(--sg-text-4)]">{f.k}</dt>
                  <dd className="font-sans text-[14px] font-medium text-[var(--sg-text-1)] mt-1">{f.v}</dd>
                  {f.sub && <dd className="font-sans text-[12px] text-[var(--sg-text-3)] mt-0.5">{f.sub}</dd>}
                </div>
              </div>
            ))}
          </dl>
        </Card>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-[var(--sp-4)] mt-[var(--sp-6)]">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08} blur className="h-full">
            <Card padding="lg" interactive asChild className="group h-full flex flex-col">
              <Link href={a.href}>
                <a.icon size={20} aria-hidden="true" className="text-[var(--sg-blue)]" />
                <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-6)]">{a.title}</h3>
                <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] flex-1">{a.body}</p>
                <span className="mt-[var(--sp-6)] inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--sg-blue)]">
                  {a.link} <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 08 FAQ ───────────────────────────────────────────────────────────────
export function AboutFAQSection() {
  return (
    <Section id="faq" tone="base" spacing="lg" divider width="narrow" background="dotMatrix">
      <SectionHeader eyebrow="08 · FAQ" title="Questions buyers and journalists ask first." align="center" />
      <Reveal>
        <FAQ items={aboutFaqs.map((f) => ({ q: f.q, a: f.a }))} />
      </Reveal>
    </Section>
  );
}
