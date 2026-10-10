import type { Metadata } from 'next';
import { ROBOTS_INDEX } from '@/lib/seo';
import Link from 'next/link';
import { LegalDoc } from '@/components/marketing/legal/LegalDoc';
import { CIPC_REG_NO } from '@/lib/social';

// Terms of use for the website. Approved by the founder 2026-10-10.
// Platform subscriptions and services are governed by their own signed
// agreements, not by these terms.

export const metadata: Metadata = {
  title: 'Terms of Use — sonofgraig',
  description: 'The terms that apply when you use the sonofgraig website: who we are, acceptable use, intellectual property, liability and South African law.',
  alternates: { canonical: '/terms' },
  robots: ROBOTS_INDEX,
};

const sections = [
  { id: 'about', label: '01 · About these terms' },
  { id: 'who-we-are', label: '02 · Who we are' },
  { id: 'use', label: '03 · Using this website' },
  { id: 'content', label: '04 · Information on this site' },
  { id: 'submissions', label: '05 · Forms and submissions' },
  { id: 'ip', label: '06 · Intellectual property & trademarks' },
  { id: 'links', label: '07 · Links to other websites' },
  { id: 'liability', label: '08 · Liability' },
  { id: 'privacy', label: '09 · Privacy' },
  { id: 'law', label: '10 · Governing law' },
  { id: 'changes', label: '11 · Changes' },
  { id: 'contact', label: '12 · Contact' },
];

export default function TermsPage() {
  return (
    <LegalDoc
      kind="Terms of Use"
      title="Terms of Use"
      intro={<p>The terms that apply when you use sonofgraig.com. Our platform and services are covered by separate, signed agreements.</p>}
      chips={['v1.0', 'Effective 10 October 2026', 'South African law']}
      sections={sections}
    >
      <section id="about">
        <h2>01 · About these terms</h2>
        <p>
          By using this website you agree to these terms. If you do not agree, please do not use the site. These terms
          cover the website only. If you subscribe to the AI Dev Platform or engage us for a service, the signed agreement
          for that subscription or engagement — including its Data Processing Agreement — governs instead, and takes
          precedence over these terms where they differ.
        </p>
      </section>

      <section id="who-we-are">
        <h2>02 · Who we are</h2>
        <ul>
          <li><strong>Legal name:</strong> SonOfGraig Digital Solutions (Pty) Ltd, trading as sonofgraig</li>
          <li><strong>Legal status:</strong> private company registered in South Africa</li>
          <li><strong>CIPC enterprise number:</strong> {CIPC_REG_NO}</li>
          <li><strong>Registered address:</strong> 9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga, 1022</li>
          <li><strong>Telephone:</strong> <a href="tel:+27696866024">+27 69 686 6024</a></li>
          <li><strong>Email:</strong> <a href="mailto:info@sonofgraig.com">info@sonofgraig.com</a></li>
        </ul>
      </section>

      <section id="use">
        <h2>03 · Using this website</h2>
        <p>You may use this website for lawful purposes. You must not:</p>
        <ul>
          <li>attempt to gain unauthorised access to the site, its servers or any connected system;</li>
          <li>interfere with the site’s operation, including through automated load, scraping that degrades service, or malicious code;</li>
          <li>submit false, misleading or unlawful information through our forms, or impersonate anyone;</li>
          <li>use the site to send unsolicited marketing or to collect other people’s personal information.</li>
        </ul>
        <p>
          Security researchers acting in good faith are welcome to report vulnerabilities as described on our{' '}
          <Link href="/security">security page</Link>.
        </p>
      </section>

      <section id="content">
        <h2>04 · Information on this site</h2>
        <p>
          We work to keep the website accurate, and every platform control is shown with its real status. Even so, the
          content is general information, not legal, compliance or professional advice for your situation. Product
          descriptions describe our plans and capabilities in good faith; what you receive is set out in your signed
          agreement. Published service prices are in rand and may change; a written quote is binding once accepted.
        </p>
      </section>

      <section id="submissions">
        <h2>05 · Forms and submissions</h2>
        <p>
          When you send us an enquiry or application, you confirm the information is yours to share and accurate. We use
          it to respond, as described in our <Link href="/privacy-policy">privacy policy</Link>. Please do not send
          confidential or special personal information through the website forms; we can arrange an NDA and a secure
          channel first.
        </p>
      </section>

      <section id="ip">
        <h2>06 · Intellectual property &amp; trademarks</h2>
        <p>
          The website, including its text, design, graphics, videos, code and the names <strong>sonofgraig</strong>,{' '}
          <strong>SonOfGraig</strong> and <strong>AI Dev Platform</strong> together with our logos, belongs to SonOfGraig
          Digital Solutions (Pty) Ltd or its licensors. You may view and share pages for personal or internal business use,
          and quote short extracts with attribution and a link. You may not copy, republish or use our names and logos in
          a way that suggests endorsement or a connection with us without written permission. Brand assets for media use
          are on our <Link href="/press">press page</Link>.
        </p>
        <p>Other product names on this site are the trademarks of their respective owners.</p>
      </section>

      <section id="links">
        <h2>07 · Links to other websites</h2>
        <p>
          We link to other sites for convenience and reference. We do not control them and are not responsible for their
          content or privacy practices.
        </p>
      </section>

      <section id="liability">
        <h2>08 · Liability</h2>
        <p>
          The website is provided “as is”. To the extent the law allows, we are not liable for any loss arising from your
          use of the website or reliance on its content, including loss caused by interruptions, errors or harmful code.
          Nothing in these terms limits any right you have that cannot lawfully be limited, including under the Consumer
          Protection Act 68 of 2008 where it applies to you, or our liability for gross negligence or wilful misconduct.
        </p>
      </section>

      <section id="privacy">
        <h2>09 · Privacy</h2>
        <p>
          Our <Link href="/privacy-policy">privacy policy</Link> and <Link href="/popia">POPIA statement</Link> explain how
          we handle personal information. Our <Link href="/paia">PAIA manual</Link> explains how to request records.
        </p>
      </section>

      <section id="law">
        <h2>10 · Governing law</h2>
        <p>
          These terms are governed by the laws of the Republic of South Africa, and the South African courts have
          jurisdiction over any dispute about them.
        </p>
      </section>

      <section id="changes">
        <h2>11 · Changes</h2>
        <p>We may update these terms. The version on this page applies from the date shown at the top.</p>
      </section>

      <section id="contact">
        <h2>12 · Contact</h2>
        <p>
          Questions about these terms: <a href="mailto:tumiso@sonofgraig.com?subject=Terms%20of%20use">tumiso@sonofgraig.com</a>.
        </p>
      </section>
    </LegalDoc>
  );
}
