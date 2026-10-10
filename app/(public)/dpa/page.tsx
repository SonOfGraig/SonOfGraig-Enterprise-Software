import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/ui/Callout';
import { LegalDoc } from '@/components/marketing/legal/LegalDoc';

// Summary of the standard Data Processing Agreement offered to platform and
// services customers. Approved by the founder 2026-10-10. The signed DPA is
// the binding document.

export const metadata: Metadata = {
  title: 'Data Processing Agreement (DPA) — sonofgraig',
  description: 'How sonofgraig processes personal information on your behalf under POPIA: roles, security, sub-processors, cross-border transfers, breaches and deletion.',
  alternates: { canonical: '/dpa' },
  robots: { index: true, follow: true },
};

const sections = [
  { id: 'overview', label: '01 · Overview' },
  { id: 'roles', label: '02 · Roles' },
  { id: 'instructions', label: '03 · Processing on your instructions' },
  { id: 'confidentiality', label: '04 · Confidentiality' },
  { id: 'security', label: '05 · Security measures' },
  { id: 'subprocessors', label: '06 · Sub-processors' },
  { id: 'transfers', label: '07 · Cross-border transfers' },
  { id: 'breaches', label: '08 · Security compromises' },
  { id: 'requests', label: '09 · Data subject requests' },
  { id: 'deletion', label: '10 · Return and deletion' },
  { id: 'audit', label: '11 · Information and audits' },
  { id: 'request', label: '12 · Request the DPA' },
];

export default function DpaPage() {
  return (
    <LegalDoc
      kind="Data Processing Agreement"
      title="Data Processing Agreement"
      intro={<p>A plain-language summary of the DPA every sonofgraig customer signs. The signed agreement is the binding document; your legal team can mark it up.</p>}
      chips={['v1.0', 'Effective 10 October 2026', 'POPIA ss 19–22, 72', 'GDPR Art. 28 aligned']}
      sections={sections}
    >
      <Callout variant="info" label="Summary" body="This page summarises the DPA. To receive the full agreement for your legal team, use the request route in section 12." />

      <section id="overview">
        <h2>01 · Overview</h2>
        <p>
          When you use the AI Dev Platform or engage us for a service, we may process personal information on your
          behalf — in the documents you connect, the questions your users ask and the records your workflows touch. The
          DPA sets out how we do that, in line with the Protection of Personal Information Act, 2013 (POPIA), and is
          aligned with Article 28 of the GDPR for customers with EU data subjects.
        </p>
      </section>

      <section id="roles">
        <h2>02 · Roles</h2>
        <p>
          You are the <strong>responsible party</strong>: you decide why and how personal information is processed. We
          are your <strong>operator</strong> under sections 20 and 21 of POPIA: we process it only for you, under the
          agreement. You remain responsible for having a lawful basis for the processing and for the information you
          choose to upload.
        </p>
      </section>

      <section id="instructions">
        <h2>03 · Processing on your instructions</h2>
        <p>
          We process personal information only to provide the platform or service you contracted for, and on your
          documented instructions. We do not use your data for our own purposes and never use it to train models shared
          with other customers. If an instruction appears to break the law, we tell you.
        </p>
      </section>

      <section id="confidentiality">
        <h2>04 · Confidentiality</h2>
        <p>Everyone at sonofgraig who can access your data is bound by confidentiality obligations, and access is limited to what their role needs.</p>
      </section>

      <section id="security">
        <h2>05 · Security measures</h2>
        <p>
          We maintain appropriate, reasonable technical and organisational measures under section 19 of POPIA, including
          encryption in transit and at rest, tenant isolation, access control, PII scrubbing before content reaches a
          model, and audit logging. The real status of each control — in place, in build, designed or planned — is on our{' '}
          <Link href="/security">security page</Link>, and the DPA lists the measures that apply to your deployment.
        </p>
      </section>

      <section id="subprocessors">
        <h2>06 · Sub-processors</h2>
        <p>
          We use sub-processors only under written terms that protect personal information at least as well as the DPA.
          The DPA lists them, including any model provider you approve, and we notify you in writing before adding or
          replacing one, so you can object.
        </p>
      </section>

      <section id="transfers">
        <h2>07 · Cross-border transfers</h2>
        <p>
          Your data is stored in a South African region by default. Where personal information leaves South Africa —
          typically the call to a language model you approve — it happens only on a lawful basis under section 72 of
          POPIA, after PII scrubbing where the design allows, and as documented in the DPA.
        </p>
      </section>

      <section id="breaches">
        <h2>08 · Security compromises</h2>
        <p>
          If we have reasonable grounds to believe your personal information has been accessed or acquired by an
          unauthorised person, we notify you immediately, as section 21(2) of POPIA requires, with the information you need
          to meet your own notification duties to the Information Regulator and data subjects under section 22.
        </p>
      </section>

      <section id="requests">
        <h2>09 · Data subject requests</h2>
        <p>
          We help you respond to data subjects who ask to access, correct or delete their personal information, and pass
          on to you any request we receive directly.
        </p>
      </section>

      <section id="deletion">
        <h2>10 · Return and deletion</h2>
        <p>
          When the agreement ends, we export your data to you in a standard format and then delete it from production
          systems within 30 days, with backups expiring after that. A deletion confirmation is available on request. Audit
          records may be kept in hashed form for the retention period the law requires.
        </p>
      </section>

      <section id="audit">
        <h2>11 · Information and audits</h2>
        <p>
          We make available the information you reasonably need to show compliance with POPIA, including answers to
          security questionnaires, and cooperate with reasonable audits on notice, as set out in the DPA.
        </p>
      </section>

      <section id="request">
        <h2>12 · Request the DPA</h2>
        <p>
          Email <a href="mailto:tumiso@sonofgraig.com?subject=DPA%20request">tumiso@sonofgraig.com</a> with your
          organisation name and we will send the full DPA for your legal team’s review. See also our{' '}
          <Link href="/popia">POPIA statement</Link>, <Link href="/privacy-policy">privacy policy</Link> and{' '}
          <Link href="/paia">PAIA manual</Link>.
        </p>
      </section>
    </LegalDoc>
  );
}
