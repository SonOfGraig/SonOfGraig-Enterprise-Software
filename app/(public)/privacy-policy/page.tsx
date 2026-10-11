// Implements sonofgraig Design System v3.0 — see /systemdesign/README.md
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  FileText,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Lock,
  UserCheck,
} from 'lucide-react';
import { Callout } from '@/components/ui/Callout';
import { BackToTop } from '@/components/ui/BackToTop';
import { OG_IMAGES, ROBOTS_INDEX } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy — How sonofgraig Handles Your Data',
  description:
    'How sonofgraig collects, uses, shares, and protects your personal information under POPIA — including your data subject rights and how to exercise them.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: { images: OG_IMAGES,
    title: 'Privacy Policy — How sonofgraig Handles Your Data',
    description:
      'POPIA-aligned privacy notice for sonofgraig: lawful basis, retention, sub-processors, cross-border transfers, and your data subject rights.',
    type: 'article',
    url: '/privacy-policy',
  },
  robots: ROBOTS_INDEX,
};

const LAST_UPDATED = '1 May 2026';
const VERSION = '3.0';
const EFFECTIVE = '1 May 2026';

const sections = [
  { id: 'about', label: '01 · About this notice' },
  { id: 'who-we-are', label: '02 · Who we are' },
  { id: 'information-we-collect', label: '03 · Information we collect' },
  { id: 'lawful-basis', label: '04 · Lawful basis (POPIA s.11)' },
  { id: 'how-we-use', label: '05 · How we use information' },
  { id: 'sharing', label: '06 · Sharing & sub-processors' },
  { id: 'transfers', label: '07 · Cross-border transfers' },
  { id: 'retention', label: '08 · Data retention' },
  { id: 'rights', label: '09 · Your POPIA rights' },
  { id: 'cookies', label: '10 · Cookies & tracking' },
  { id: 'security', label: '11 · Security' },
  { id: 'children', label: "12 · Children's data" },
  { id: 'changes', label: '13 · Changes to this notice' },
  { id: 'contact', label: '14 · Contact our Information Officer' },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--sg-bg)' }}>
      {/* Hero */}
      <section className="border-b border-[var(--sg-border)]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-[var(--sp-16)] pb-[var(--sp-12)]">
          <div className="flex items-center gap-2 mb-[var(--sp-6)]">
            <span className="text-label text-[var(--sg-blue)]">Legal</span>
            <span className="text-[var(--sg-text-4)]" aria-hidden>·</span>
            <span className="text-label text-[var(--sg-text-3)]">Privacy Notice</span>
          </div>

          <h1 className="text-h1 text-[var(--sg-text-1)] mb-[var(--sp-5)]">
            Privacy Policy
          </h1>

          <p className="text-body-lg text-[var(--sg-text-2)] max-w-[680px] mb-[var(--sp-8)]">
            This notice explains what personal information sonofgraig collects,
            why we collect it, how long we keep it, who we share it with, and the rights you hold
            under the Protection of Personal Information Act, 2013 (POPIA).
          </p>

          <div className="flex flex-wrap items-center gap-[var(--sp-3)]">
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] border border-[var(--sg-blue-border)] text-code">
              v{VERSION}
            </span>
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] border border-[var(--sg-border)] text-code">
              Effective {EFFECTIVE}
            </span>
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] border border-[var(--sg-border)] text-code">
              Last updated {LAST_UPDATED}
            </span>
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] border border-[var(--sg-border)] text-code">
              POPIA
            </span>
          </div>
        </div>
      </section>

      {/* Body — sticky TOC + content */}
      <section className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-[var(--sp-12)] pb-[var(--sp-20)]">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-[var(--sp-12)]">
          {/* TOC */}
          <aside aria-label="On this page" className="lg:sticky lg:top-[88px] lg:self-start">
            <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-auto pr-[var(--sp-2)]">
              <div className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">
                On this page
              </div>
              <nav>
                <ul className="flex flex-col gap-[var(--sp-2)]">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] py-[var(--sp-1)] transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Long-form content */}
          <article className="sg-prose max-w-[760px]">
            {/* Quick links */}
            <Callout
              variant="info"
              label="Need a quick answer?"
              body="See section 09 for your POPIA data subject rights, section 14 for our Information Officer's contact details, or visit /popia for the formal regulatory statement."
            />

            <section id="about">
              <h2>01 · About this notice</h2>
              <p>
                sonofgraig (&ldquo;<strong>sonofgraig</strong>&rdquo;,
                &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;,
                &ldquo;<strong>our</strong>&rdquo;) is the responsible party for the personal
                information processed through this website, our enterprise platform, and any
                related services. This notice covers all visitors, prospects, customers,
                applicants, and any other natural or juristic person whose personal information
                we receive.
              </p>
              <p>
                For our formal POPIA Section 11 statement, the registered Information Officer,
                cookie categories, and the data subject rights request form, see{' '}
                <Link href="/popia">our POPIA page</Link>. This privacy policy is the
                plain-language companion to that document — where the two differ, the POPIA
                page prevails for regulatory matters.
              </p>
            </section>

            <section id="who-we-are">
              <h2>02 · Who we are</h2>
              <p>
                sonofgraig (SonOfGraig Digital Solutions (Pty) Ltd) is a South African
                enterprise software company, registered in KwaMhlanga, Mpumalanga, and operating
                from Pretoria. For customers of our platform and services, data residency is
                agreed in the Data Processing Agreement, with a South African region as the
                default.
              </p>
              <p>
                Our Information Officer is{' '}
                <strong>Tumiso Graig Ramaboya, Founder, CEO &amp; Information Officer</strong>. He is responsible
                for ensuring our compliance with POPIA, dealing with requests from data
                subjects, and working with the Information Regulator of South Africa where
                required. Contact details are in section 14.
              </p>
            </section>

            <section id="information-we-collect">
              <h2>03 · Information we collect</h2>
              <p>
                We only collect information we actually need. The categories below are the only
                personal information we process today:
              </p>
              <h3>3.1 Information you give us directly</h3>
              <ul>
                <li>
                  <strong>Identity &amp; contact</strong> — name, work email, phone, role,
                  company, country.
                </li>
                <li>
                  <strong>Account &amp; commercial</strong> — organisation name, billing
                  address, plan and billing-cycle preference. We do{' '}
                  <strong>not</strong> store full payment card numbers; payments are processed
                  by Stripe and tokenised at the point of capture.
                </li>
                <li>
                  <strong>Submissions</strong> — anything you choose to type into our contact,
                  early-access, waitlist, or data-subject-rights forms.
                </li>
                <li>
                  <strong>Content you upload</strong> — once you are a customer, the documents,
                  prompts, datasets, and configurations you load into the platform.
                </li>
              </ul>
              <h3>3.2 Information we collect automatically</h3>
              <ul>
                <li>
                  <strong>Device &amp; technical</strong> — IP address (anonymised within 24
                  hours for analytics), user-agent string, screen size, language, referrer.
                </li>
                <li>
                  <strong>Usage</strong> — pages visited, features used, time on page,
                  high-level navigation events. Used in aggregate, not joined to identity by
                  default.
                </li>
                <li>
                  <strong>Cookies &amp; similar</strong> — see section 10. You control which
                  categories are active via the consent banner.
                </li>
            </ul>
              <h3>3.3 Information from third parties</h3>
              <ul>
                <li>
                  <strong>Authentication providers</strong> — if you sign in with Google or
                  Microsoft, we receive your name, work email, and a stable identifier from
                  them; nothing else.
                </li>
                <li>
                  <strong>Enrichment</strong> — for prospective enterprise accounts we may
                  consult publicly available sources (your company website, LinkedIn) to
                  prepare for a sales conversation.
                </li>
              </ul>
            </section>

            <section id="lawful-basis">
              <h2>04 · Lawful basis (POPIA Section 11)</h2>
              <p>
                POPIA requires us to identify a lawful basis for every processing activity. We
                rely on the following bases:
              </p>
              <ul>
                <li>
                  <strong>Consent</strong> — for marketing communications, optional cookies,
                  and any processing not strictly necessary to deliver the service. Consent is
                  collected explicitly via opt-in checkboxes and the cookie banner, recorded
                  with a timestamp, and may be withdrawn at any time without penalty.
                </li>
                <li>
                  <strong>Performance of a contract</strong> — to provide, bill for, and
                  support our products under our customer agreement (e.g. account creation,
                  service delivery, customer success).
                </li>
                <li>
                  <strong>Legal obligation</strong> — to comply with tax, anti-money-laundering,
                  audit, and POPIA itself, including responding to lawful requests from
                  regulators.
                </li>
                <li>
                  <strong>Legitimate interest</strong> — to secure our platform, prevent fraud
                  and abuse, improve product quality, and operate normal business
                  communications. We weigh these interests against your privacy rights and stop
                  if your rights override.
                </li>
              </ul>
            </section>

            <section id="how-we-use">
              <h2>05 · How we use your information</h2>
              <ul>
                <li>To deliver, secure, and improve the sonofgraig platform and website.</li>
                <li>To respond to enquiries, demos, sales conversations, and support tickets.</li>
                <li>
                  To send service notifications (billing alerts, security advisories,
                  maintenance windows) — these are not optional while you have an account.
                </li>
                <li>
                  To send marketing communications where you have opted in. Every marketing
                  email contains a one-click unsubscribe; that link revokes consent immediately
                  for that channel.
                </li>
                <li>
                  To send the <strong>sonofgraig Insights</strong> newsletter if you subscribe. We
                  keep your email address, optional name, the topics you chose, where and when you
                  asked to subscribe, and when you confirmed by email (double opt-in). These are
                  stored on our own server in South Africa; issues are delivered through Resend. We do
                  not track whether you open an issue or which links you click. You can change
                  topics, unsubscribe, or ask us to delete your details from the link in every
                  issue.
                </li>
                <li>
                  To produce aggregated analytics about how the website and platform are used.
                  Aggregated and anonymised data is not personal information.
                </li>
                <li>
                  To meet legal, accounting, audit, and regulatory obligations under South
                  African law.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> sell personal information. We do <strong>not</strong>{' '}
                use customer content uploaded to the platform to train foundation models or
                publicly available models. Customer content remains yours.
              </p>
            </section>

            <section id="sharing">
              <h2>06 · Sharing &amp; sub-processors</h2>
              <p>
                We share personal information only with operators (sub-processors) acting on
                our behalf under written data processing agreements aligned to POPIA Section
                21. Current categories:
              </p>
              <ul>
                <li>
                  <strong>Website delivery and protection</strong> — Cloudflare (global edge
                  network): DNS, content delivery, firewall and DDoS protection.
                </li>
                <li>
                  <strong>Email delivery</strong> — Resend (United States), used to send form
                  submissions to our team, confirmation emails and consented newsletters.
                </li>
                <li>
                  <strong>Analytics</strong> — Cloudflare Web Analytics (global), which counts
                  page views without cookies or personal profiles; our own site measurement
                  (in South Africa), which counts, in aggregate only, the pages viewed and the
                  order they were viewed in, the referring website or campaign link, a country
                  code, the device type, which links and buttons were clicked, how far down a
                  page you scrolled and how long you were active on it, whether a form was
                  started or left unfinished (the name of the last field, never what you
                  typed), page-speed timings and whether the page&apos;s scripts and animations
                  worked. It uses no cookies, IP address or identifier; your browser keeps the
                  campaign you arrived from only until the tab closes. Behaviour and page views
                  are not measured when your browser sends Do Not Track or Global Privacy
                  Control. If you submit a form, how you found us (the campaign or referring
                  website, and your first page) is attached to that submission; and, only after
                  you accept
                  analytics cookies, Google Analytics (United States, IP anonymised) and
                  Microsoft Clarity (United States; heatmaps and session replays with typed text
                  masked).
                </li>
                <li>
                  <strong>Platform customers</strong> — the infrastructure and model providers
                  used to deliver the AI Dev Platform are listed in each customer&apos;s Data
                  Processing Agreement.
                </li>
              </ul>
              <p>
                A current, named list of sub-processors and their location is available on
                request from <a href="mailto:tumiso@sonofgraig.com">tumiso@sonofgraig.com</a>.
              </p>
              <p>
                We may also disclose information if required by a valid court order, subpoena,
                or other lawful instrument issued by a South African authority. Where the law
                permits, we will notify you before doing so.
              </p>
            </section>

            <section id="transfers">
              <h2>07 · Cross-border transfers</h2>
              <p>
                Our default is to keep South African personal information inside South Africa.
                Some sub-processors (for example, Stripe and Resend) operate from outside South
                Africa. Where a transfer is necessary, we rely on POPIA Section 72 — the
                recipient is bound to a comparable level of protection through a written
                processing agreement, or we obtain your explicit consent.
              </p>
              <p>
                If you use AI features that route to a foundation model provider (such as
                OpenAI, Anthropic, Google, or Mistral) under your own configuration, those
                requests will leave South Africa. We disclose every model provider we route to,
                you choose which providers are enabled at the project level, and you can
                disable any provider at any time.
              </p>
            </section>

            <section id="retention">
              <h2>08 · Data retention</h2>
              <p>
                We retain personal information only as long as necessary for the purpose it was
                collected for, plus any minimum period required by law. Indicative retention
                periods:
              </p>
              <ul>
                <li>
                  <strong>Account data</strong> — for the lifetime of the account, then 30 days
                  after closure for backup expiry.
                </li>
                <li>
                  <strong>Customer content (uploaded documents, prompts, datasets)</strong> —
                  retained while you are a customer; deleted within 30 days of account closure
                  unless you export it first.
                </li>
                <li>
                  <strong>Billing &amp; tax records</strong> — five years from the end of the
                  relevant tax year, as required by SARS.
                </li>
                <li>
                  <strong>Marketing contact data</strong> — until consent is withdrawn, then
                  immediately suppressed.
                </li>
                <li>
                  <strong>Security logs</strong> — twelve months, then automatic rotation.
                </li>
              </ul>
            </section>

            <section id="rights">
              <h2>09 · Your POPIA rights</h2>
              <p>
                Under POPIA you have the right to:
              </p>
              <ul>
                <li>
                  <strong>Access</strong> the personal information we hold about you.
                </li>
                <li>
                  <strong>Correction</strong> of inaccurate or out-of-date information.
                </li>
                <li>
                  <strong>Deletion</strong> of information we no longer have a lawful basis to
                  process.
                </li>
                <li>
                  <strong>Object</strong> to processing based on legitimate interest, including
                  for direct marketing.
                </li>
                <li>
                  <strong>Withdraw consent</strong> at any time for processing that relies on
                  consent.
                </li>
                <li>
                  <strong>Data portability</strong> — receive a structured, machine-readable
                  export of your account and content.
                </li>
                <li>
                  <strong>Lodge a complaint</strong> with the Information Regulator of South
                  Africa (
                  <a
                    href="https://inforegulator.org.za/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    inforegulator.org.za
                  </a>
                  ) if you believe we have not complied with POPIA.
                </li>
              </ul>
              <p>
                We respond to all data subject requests within{' '}
                <strong>10 business days</strong>. Submit yours through the form on{' '}
                <Link href="/popia#information-officer">our POPIA page</Link> or by emailing{' '}
                <a href="mailto:tumiso@sonofgraig.com">tumiso@sonofgraig.com</a>. We may ask
                for proof of identity to make sure we send your data to the right person.
              </p>
            </section>

            <section id="cookies">
              <h2>10 · Cookies &amp; tracking technologies</h2>
              <p>
                Our cookie banner asks you to opt in to five categories before any non-essential
                cookie is set:
              </p>
              <ul>
                <li>
                  <strong>Strictly necessary</strong> — session, security, theme. Always on.
                </li>
                <li>
                  <strong>Functional</strong> — remember non-essential preferences.{' '}
                  <em>Off by default.</em>
                </li>
                <li>
                  <strong>Analytics</strong> — aggregated, IP-anonymised usage measurement.{' '}
                  <em>Off by default.</em>
                </li>
                <li>
                  <strong>Marketing</strong> — not used on this website today. If we introduce
                  advertising measurement, it will be listed here and stay off by default.
                </li>
                <li>
                  <strong>Personalisation</strong> — content tailored to your role or industry.
                  <em> Off by default.</em>
                </li>
              </ul>
              <p>
                You can change these choices at any time using the &ldquo;Cookie
                preferences&rdquo; control in the cookie banner. Choices are recorded with a
                timestamp under the localStorage key <code>popia_consent_v3</code>.
              </p>
            </section>

            <section id="security">
              <h2>11 · Security</h2>
              <p>
                We use industry-standard administrative, physical, and technical safeguards
                including encryption in transit (TLS 1.2+), encryption at rest (AES-256),
                role-based access control, multi-factor authentication for staff,
                and spam and rate-limit protection on our forms. The AI Dev Platform is being
                built with organisation-scoped row-level security and audit logging. We do not
                currently hold SOC 2 or ISO 27001 certification; the current status of each
                control is published on our security page.
              </p>
              <p>
                If we ever experience a security breach involving your personal information, we
                will notify the Information Regulator and affected data subjects as soon as
                reasonably possible, in line with POPIA Section 22.
              </p>
            </section>

            <section id="children">
              <h2>12 · Children&rsquo;s data</h2>
              <p>
                The sonofgraig platform is sold to enterprises and is not directed at children
                under the age of 18. We do not knowingly collect personal information from
                children. If you believe a child has provided us with personal information,
                please contact our Information Officer and we will delete it.
              </p>
            </section>

            <section id="changes">
              <h2>13 · Changes to this notice</h2>
              <p>
                We may update this privacy policy as the platform evolves or as the law
                changes. The version number and &ldquo;Last updated&rdquo; date at the top of
                this page always reflect the current version. Material changes will be
                announced on the platform and, where appropriate, by email to account
                administrators at least 14 days before they take effect.
              </p>
              <p>
                Previous versions are available on request from{' '}
                <a href="mailto:tumiso@sonofgraig.com">tumiso@sonofgraig.com</a>.
              </p>
            </section>

            <section id="contact">
              <h2>14 · Contact our Information Officer</h2>
              <p>
                For any privacy question, complaint, or data subject request, contact our
                Information Officer:
              </p>

              <div className="not-prose card grid grid-cols-1 sm:grid-cols-2 gap-[var(--sp-5)] p-[var(--sp-6)] rounded-[var(--r-xl)] bg-[var(--sg-surface)] border border-[var(--sg-border)] mt-[var(--sp-6)]">
                <ContactItem
                  icon={<UserCheck size={16} strokeWidth={1.5} />}
                  label="Information Officer"
                  value="Tumiso Graig Ramaboya, Founder & CEO"
                />
                <ContactItem
                  icon={<Mail size={16} strokeWidth={1.5} />}
                  label="Email"
                  value={
                    <a
                      href="mailto:tumiso@sonofgraig.com"
                      className="text-[var(--sg-blue)] hover:text-[var(--sg-blue-dim)] transition-colors"
                    >
                      tumiso@sonofgraig.com
                    </a>
                  }
                />
                <ContactItem
                  icon={<Phone size={16} strokeWidth={1.5} />}
                  label="Phone"
                  value="+27 (0) 21 000 0000"
                />
                <ContactItem
                  icon={<MapPin size={16} strokeWidth={1.5} />}
                  label="Postal address"
                  value="9810 Moloto South Drive, Extension 8, KwaMhlanga, 1022, Mpumalanga, South Africa"
                />
              </div>

              <p className="mt-[var(--sp-6)]">
                You may also lodge a complaint directly with the{' '}
                <a
                  href="https://inforegulator.org.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Information Regulator of South Africa
                </a>
                . We would always rather try to resolve a concern first — please give us the
                chance to.
              </p>
            </section>

            {/* Cross-link footer */}
            <div className="not-prose mt-[var(--sp-16)] grid grid-cols-1 sm:grid-cols-3 gap-[var(--sp-4)]">
              <RelatedLink
                href="/popia"
                icon={<Shield size={20} strokeWidth={1.5} />}
                title="POPIA statement"
                body="Formal Section 11 statement, cookie categories, and data-subject-rights form."
              />
              <RelatedLink
                href="/contact"
                icon={<FileText size={20} strokeWidth={1.5} />}
                title="Contact us"
                body="General enquiries, partnerships, and sales conversations."
              />
              <RelatedLink
                href="/security"
                icon={<Lock size={20} strokeWidth={1.5} />}
                title="Security overview"
                body="Encryption, certifications, sub-processors, and incident response."
              />
            </div>
          </article>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[var(--sp-3)]">
      <div
        className="shrink-0 w-9 h-9 rounded-[var(--r-md)] flex items-center justify-center text-[var(--sg-blue)] border border-[var(--sg-border)]"
        style={{ background: 'var(--sg-surface-2)' }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-label text-[var(--sg-text-4)]">{label}</span>
        <span className="text-body text-[var(--sg-text-1)]">{value}</span>
      </div>
    </div>
  );
}

function RelatedLink({
  href,
  icon,
  title,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="card group block p-[var(--sp-5)] rounded-[var(--r-xl)] bg-[var(--sg-surface)] border border-[var(--sg-border)] hover:border-[var(--sg-border-md)] transition-colors"
    >
      <div className="flex items-center gap-[var(--sp-2)] text-[var(--sg-blue)] mb-[var(--sp-3)]">
        {icon}
      </div>
      <div className="text-h3 text-[var(--sg-text-1)] mb-[var(--sp-2)]">{title}</div>
      <p className="text-caption text-[var(--sg-text-3)] leading-relaxed mb-[var(--sp-4)]">
        {body}
      </p>
      <span className="inline-flex items-center gap-[var(--sp-1)] text-label text-[var(--sg-blue)]">
        Read more
        <ArrowRight
          size={12}
          strokeWidth={1.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
