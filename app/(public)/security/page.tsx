import type { Metadata } from 'next';
import { SECURITY_HTML } from '@/components/marketing/security/securityHtml';
import { SecurityEnhancer } from '@/components/marketing/security/SecurityEnhancer';
import { faqPageJsonLd, OG_IMAGES } from '@/lib/seo';
import '@/components/marketing/security/security.css';

export const metadata: Metadata = {
  title: 'Security & trust — sonofgraig | Honest status of every control',
  description:
    'How sonofgraig protects data: residency, encryption, tenant isolation, PII scrubbing and audit logs, with the real status of every control.',
  alternates: { canonical: '/security' },
  openGraph: { images: OG_IMAGES, title: 'Security & trust — sonofgraig', description: 'Every control with its real status.', type: 'website', url: '/security', locale: 'en_ZA' },
  robots: { index: true, follow: true },
};

// The founder's preferred layout: the original trust-centre page (sticky
// section tabs, status strip, pillar cards, layered architecture, control
// catalogue, doc-style text), restored 2026-10-09 with an honesty pass —
// every control carries its real status (In place / In build / Designed /
// Planned), the sub-processor list is the real one, and breach notification
// follows POPIA s22 ("as soon as reasonably possible"), not a 72-hour rule.

const strip = (h: string) =>
  h.replace(/<[^>]+>/g, '').replace(/&rsquo;/g, '’').replace(/&mdash;/g, '—').replace(/&ldquo;|&rdquo;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

// FAQ JSON-LD is derived from the markup so the two can never drift apart.
const FAQS = Array.from(
  SECURITY_HTML.matchAll(/<summary class="faq-q">([\s\S]*?)<span[\s\S]*?<div class="faq-a">([\s\S]*?)<\/div>/g),
  (m) => ({ q: strip(m[1]), a: strip(m[2]) }),
);

export default function SecurityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd('/security', FAQS)) }} />
      <div id="security-root" className="lp-security-root" dangerouslySetInnerHTML={{ __html: SECURITY_HTML }} />
      <SecurityEnhancer rootId="security-root" />
    </>
  );
}
