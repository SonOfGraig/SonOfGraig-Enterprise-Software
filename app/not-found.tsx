import type { Metadata } from 'next';
import Link from 'next/link';

// Custom 404 — branded, useful, keeps visitors on the site. Replaces the
// default Next.js "This page could not be found" minimal page. Designed
// to match the home hero visual language and surface the highest-intent
// next steps (Platform, Pricing, Contact, Early access).
//
// `not-found.tsx` is the App Router convention — Next.js auto-renders this
// for any unmatched route.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

export const metadata: Metadata = {
  title: 'Page not found — sonofgraig',
  description:
    "The page you're looking for has moved or never existed. Jump back to the platform overview, pricing, or contact a real person.",
  alternates: { canonical: '/404' },
  robots: { index: false, follow: true },
};

const NEXT_STEPS = [
  {
    label: 'Platform overview',
    href: '/platform',
    desc: 'Five SaaS clusters · POPIA-native · ZAR-priced',
  },
  {
    label: 'Early Access',
    href: '/early-access',
    desc: 'Five founding-customer slots · 70% off year one',
  },
  {
    label: 'Pricing',
    href: '/pricing',
    desc: 'From R4,999/month · No FX exposure',
  },
  {
    label: 'Contact',
    href: '/contact',
    desc: 'Sales, support, POPIA, security disclosure',
  },
];

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        background:
          'radial-gradient(circle at 80% 20%, rgba(11,158,222,0.10) 0%, transparent 50%), radial-gradient(circle at 20% 90%, rgba(4,78,115,0.10) 0%, transparent 50%)',
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, monospace)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--sg-blue, #0B9EDE)',
            marginBottom: '16px',
          }}
        >
          Error 404 · Route not found
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display, system-ui)',
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--sg-text-1, #0D1117)',
            margin: '0 0 18px',
          }}
        >
          That page isn&apos;t built yet — or it moved.
        </h1>

        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.65,
            color: 'var(--sg-text-3, #6B7280)',
            margin: '0 0 36px',
            maxWidth: '560px',
          }}
        >
          This page does not exist — or does not exist yet. We are building the AI Dev Platform in public, and the links below will get you where you need to go.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            marginBottom: '36px',
          }}
        >
          {NEXT_STEPS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              style={{
                display: 'block',
                padding: '18px 20px',
                border: '1px solid var(--sg-border, rgba(0,0,0,0.07))',
                borderRadius: '12px',
                background: 'var(--sg-bg, #FFFFFF)',
                textDecoration: 'none',
                transition: 'border-color 160ms ease, transform 160ms ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans, system-ui)',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--sg-text-1, #0D1117)',
                  marginBottom: '6px',
                  letterSpacing: '-0.01em',
                }}
              >
                {s.label} →
              </div>
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--sg-text-3, #6B7280)',
                }}
              >
                {s.desc}
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            fontSize: '13px',
            color: 'var(--sg-text-4, #9CA3AF)',
          }}
        >
          Hit something that should exist?{' '}
          <a
            href="mailto:tumiso@sonofgraig.com"
            style={{
              color: 'var(--sg-blue, #0B9EDE)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            tumiso@sonofgraig.com
          </a>{' '}
          — the founder reads every email personally. Tell us the URL you typed and what you expected.
        </div>

        <div
          style={{
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid var(--sg-border, rgba(0,0,0,0.07))',
            fontSize: '12px',
            color: 'var(--sg-text-4, #9CA3AF)',
            lineHeight: 1.6,
          }}
        >
          <Link
            href="/"
            style={{
              color: 'var(--sg-blue, #0B9EDE)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← Back to sonofgraig.com
          </Link>{' '}
          · <Link href={`${SITE_URL}/sitemap`} style={{ color: 'inherit' }}>Full sitemap</Link>
        </div>
      </div>
    </div>
  );
}
