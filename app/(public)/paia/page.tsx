import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/ui/Callout';

// PAIA manual (Promotion of Access to Information Act 2 of 2000, s51, as
// amended by POPIA s110). Approved and published by the founder 2026-10-10.
// Fees and forms are referenced to the PAIA Regulations rather than quoted, so
// the manual stays correct when the Regulator updates the fee schedule.

export const metadata: Metadata = {
  title: 'PAIA Manual — sonofgraig',
  description:
    'The sonofgraig PAIA manual: the records we hold, how to request access to them under the Promotion of Access to Information Act, and how we process personal information under POPIA.',
  alternates: { canonical: '/paia' },
  robots: { index: true, follow: true },
};

const VERSION = '1.0';
const EFFECTIVE = '10 October 2026';

const sections = [
  { id: 'introduction', label: '01 · Introduction' },
  { id: 'company', label: '02 · Company details' },
  { id: 'information-officer', label: '03 · Information Officer' },
  { id: 'guide', label: '04 · The Regulator’s PAIA guide' },
  { id: 'automatic', label: '05 · Records available without a request' },
  { id: 'legislation', label: '06 · Records kept under other laws' },
  { id: 'records', label: '07 · Records we hold' },
  { id: 'popia', label: '08 · Processing of personal information' },
  { id: 'request', label: '09 · How to request a record' },
  { id: 'refusal', label: '10 · Grounds for refusal' },
  { id: 'remedies', label: '11 · Remedies' },
  { id: 'availability', label: '12 · Availability of this manual' },
];

export default function PaiaPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--sg-bg)' }}>
      <section className="border-b border-[var(--sg-border)]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-[var(--sp-16)] pb-[var(--sp-12)]">
          <div className="flex items-center gap-2 mb-[var(--sp-6)]">
            <span className="text-label text-[var(--sg-blue)]">Legal</span>
            <span className="text-[var(--sg-text-4)]" aria-hidden>·</span>
            <span className="text-label text-[var(--sg-text-3)]">PAIA Manual</span>
          </div>
          <h1 className="text-h1 text-[var(--sg-text-1)] mb-[var(--sp-5)]">PAIA Manual</h1>
          <p className="text-body-lg text-[var(--sg-text-2)] max-w-[680px] mb-[var(--sp-8)]">
            Prepared under section 51 of the Promotion of Access to Information Act, 2000 (PAIA). It explains which
            records sonofgraig holds, how you can ask for them, and how we process personal information under the
            Protection of Personal Information Act, 2013 (POPIA).
          </p>
          <div className="flex flex-wrap items-center gap-[var(--sp-3)]">
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] border border-[var(--sg-blue-border)] text-code">v{VERSION}</span>
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] border border-[var(--sg-border)] text-code">Effective {EFFECTIVE}</span>
            <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] border border-[var(--sg-border)] text-code">PAIA s51 · POPIA</span>
          </div>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-[var(--sp-12)] pb-[var(--sp-20)]">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-[var(--sp-12)]">
          <aside aria-label="On this page" className="lg:sticky lg:top-[88px] lg:self-start">
            <div className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">On this page</div>
            <nav>
              <ul className="flex flex-col gap-[var(--sp-2)]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] py-[var(--sp-1)] transition-colors">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="sg-prose max-w-[760px]">
            <Callout
              variant="info"
              label="Making a request"
              body="Send requests to our Information Officer (section 03). Section 09 explains the procedure, forms and fees."
            />

            <section id="introduction">
              <h2>01 · Introduction</h2>
              <p>
                PAIA gives effect to the constitutional right of access to information held by another person where that
                information is needed to exercise or protect a right. This manual describes the records held by
                SonOfGraig Digital Solutions (Pty) Ltd, trading as <strong>sonofgraig</strong>, and the procedure for
                requesting access to them. It also sets out the information POPIA requires about how we process personal
                information.
              </p>
            </section>

            <section id="company">
              <h2>02 · Company details</h2>
              <ul>
                <li><strong>Registered name:</strong> SonOfGraig Digital Solutions (Pty) Ltd</li>
                <li><strong>Trading as:</strong> sonofgraig</li>
                <li><strong>CIPC enterprise number:</strong> K2025188095</li>
                <li><strong>Registered address:</strong> 9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga, 1022</li>
                <li><strong>Operations:</strong> Pretoria, Gauteng</li>
                <li><strong>Telephone:</strong> <a href="tel:+27696866024">+27 69 686 6024</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@sonofgraig.com">info@sonofgraig.com</a></li>
                <li><strong>Website:</strong> <Link href="/">sonofgraig.com</Link></li>
              </ul>
            </section>

            <section id="information-officer">
              <h2>03 · Information Officer</h2>
              <p>
                Requests under this manual go to the head of the company, who is also the Information Officer registered
                with the Information Regulator:
              </p>
              <ul>
                <li><strong>Name:</strong> Tumiso Graig Ramaboya, Founder, CEO &amp; Information Officer</li>
                <li><strong>Email:</strong> <a href="mailto:tumiso@sonofgraig.com?subject=PAIA%20request">tumiso@sonofgraig.com</a></li>
                <li><strong>Postal and physical address:</strong> as in section 02</li>
              </ul>
            </section>

            <section id="guide">
              <h2>04 · The Regulator’s PAIA guide</h2>
              <p>
                Section 10 of PAIA requires the Information Regulator to publish a guide on how to use the Act. It is
                available in each official language from the Information Regulator (
                <a href="https://inforegulator.org.za" rel="noopener noreferrer">inforegulator.org.za</a>), and we will
                provide a copy on request.
              </p>
            </section>

            <section id="automatic">
              <h2>05 · Records available without a request</h2>
              <p>The following are available to anyone without a formal PAIA request:</p>
              <ul>
                <li>Everything published on this website, including our <Link href="/privacy-policy">privacy policy</Link>, <Link href="/popia">POPIA statement</Link> and <Link href="/security">security page</Link></li>
                <li>Product and service descriptions, published service prices and marketing material</li>
                <li>Articles published on our <Link href="/blog">Insights</Link> pages</li>
              </ul>
            </section>

            <section id="legislation">
              <h2>06 · Records kept under other laws</h2>
              <p>Where applicable to us, we keep records in terms of, among others:</p>
              <ul>
                <li>Companies Act 71 of 2008</li>
                <li>Income Tax Act 58 of 1962 and Tax Administration Act 28 of 2011</li>
                <li>Basic Conditions of Employment Act 75 of 1997 and Labour Relations Act 66 of 1995</li>
                <li>Unemployment Insurance Act 63 of 2001 and Compensation for Occupational Injuries and Diseases Act 130 of 1993</li>
                <li>Skills Development Levies Act 9 of 1999</li>
                <li>Broad-Based Black Economic Empowerment Act 53 of 2003</li>
                <li>Electronic Communications and Transactions Act 25 of 2002</li>
                <li>Protection of Personal Information Act 4 of 2013</li>
              </ul>
            </section>

            <section id="records">
              <h2>07 · Records we hold</h2>
              <ul>
                <li><strong>Company records:</strong> incorporation documents, registers, resolutions and statutory returns</li>
                <li><strong>Financial and tax records:</strong> accounting records, invoices, bank records and tax returns</li>
                <li><strong>Client records:</strong> enquiries, proposals, agreements, Data Processing Agreements and project correspondence</li>
                <li><strong>Supplier records:</strong> agreements with, and correspondence from, service providers</li>
                <li><strong>Personnel records:</strong> contracts and records relating to anyone who works with us</li>
                <li><strong>Technical records:</strong> system documentation, security logs and audit logs</li>
                <li><strong>Compliance records:</strong> POPIA records, consent records and B-BBEE documentation</li>
              </ul>
            </section>

            <section id="popia">
              <h2>08 · Processing of personal information</h2>
              <p>
                <strong>Purpose.</strong> We process personal information to answer enquiries and early-access
                applications, deliver services and the platform to customers, meet legal and tax obligations, keep our
                systems secure, and — only with consent — send our newsletter and run website analytics.
              </p>
              <p><strong>Categories of data subjects and information.</strong></p>
              <ul>
                <li>Website visitors — usage data, collected only with analytics consent</li>
                <li>Prospects and enquirers — name, company, role, email, phone and the content of their message</li>
                <li>Customers and their users — contact details, account data and the documents they choose to process</li>
                <li>Suppliers — contact and banking details</li>
                <li>People who work with us — contract, contact and payment details</li>
              </ul>
              <p>
                <strong>Recipients.</strong> Only the service providers that help us operate, under written terms:
                Cloudflare (website delivery and security), Resend (email delivery) and Google Analytics (with consent).
                Platform customers see their own sub-processors, including any model provider they approve, in their Data
                Processing Agreement.
              </p>
              <p>
                <strong>Cross-border transfers.</strong> Some of these providers process information outside South
                Africa. Such transfers are made under section 72 of POPIA — see section 07 of our{' '}
                <Link href="/privacy-policy#transfers">privacy policy</Link>.
              </p>
              <p>
                <strong>Security measures.</strong> Encryption in transit, access controls, rate limiting and spam
                protection on forms, and the controls listed with their real status on our{' '}
                <Link href="/security">security page</Link>.
              </p>
            </section>

            <section id="request">
              <h2>09 · How to request a record</h2>
              <ol>
                <li>Complete <strong>Form 2</strong> (Request for Access to Record) prescribed in the PAIA Regulations, available from the Information Regulator’s website or from us on request.</li>
                <li>Send it to the Information Officer at the address in section 03. Give enough detail for us to identify the record, say how you want access (copy, inspection or electronic), and state the right you want to exercise or protect.</li>
                <li>If you request a record on behalf of someone else, include proof of your authority.</li>
                <li>A request fee, and an access fee if the request succeeds, may be payable at the rates set in the PAIA Regulations. We tell you what applies before any fee is due. Requesters asking for their own personal information do not pay the request fee.</li>
                <li>We decide within 30 days of receiving a complete request and notify you on Form 3. The period can be extended once, by up to 30 days, in the circumstances the Act allows; we tell you if so and why.</li>
              </ol>
              <p>
                Requests for your own personal information under POPIA can also be made directly — see the rights section
                of our <Link href="/popia">POPIA statement</Link>.
              </p>
            </section>

            <section id="refusal">
              <h2>10 · Grounds for refusal</h2>
              <p>
                Access may be refused on the grounds set out in Chapter 4 of Part 3 of PAIA, including to protect the
                privacy of third parties, commercial information of third parties or of sonofgraig, confidential
                information, the safety of people and property, records privileged from production in legal proceedings,
                and research information. Where only part of a record is protected, we give access to the rest.
              </p>
            </section>

            <section id="remedies">
              <h2>11 · Remedies</h2>
              <p>
                sonofgraig has no internal appeal procedure. If you are unhappy with a decision, you may complain to the
                Information Regulator within 180 days of the decision, or apply to court. Information Regulator:{' '}
                <a href="https://inforegulator.org.za" rel="noopener noreferrer">inforegulator.org.za</a>.
              </p>
            </section>

            <section id="availability">
              <h2>12 · Availability of this manual</h2>
              <p>
                This manual is published at <Link href="/paia">sonofgraig.com/paia</Link> and is available free of charge
                from the Information Officer on request. We update it when our records or processing change.
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
