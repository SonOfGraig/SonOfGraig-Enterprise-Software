import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { NavLinks } from './NavLinks';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { AnnouncementBar } from '@/components/marketing/AnnouncementBar';
import { PageTransition } from './PageTransition';
import { MobileMenu } from './MobileMenu';
import { CookieBanner } from '@/components/marketing/CookieBanner';
import { SOCIAL_PROFILES } from '@/lib/social';
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup';

const linkClass =
  'text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors';

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--sg-bg)' }}>
      <AnnouncementBar />
      <CookieBanner />
      <header className="sticky top-0 h-[64px] bg-[var(--lg-fill-strong)] backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--lg-rim)] shadow-[inset_0_-1px_0_var(--lg-edge)] z-[var(--z-sticky)] flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex gap-2 items-start shrink-0">
            <Logo className="w-8 h-8" />
            <div className="flex flex-col pt-1">
              <span className="font-display font-bold text-[18px] text-[var(--sg-text-1)] tracking-tight leading-none">
                sonofgraig
              </span>
              <span className="hidden sm:block font-sans text-[10px] text-[var(--sg-blue)] uppercase tracking-wider mt-1">
                Enterprise Software Platform
              </span>
            </div>
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/early-access">Join early access</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </header>

      <PageTransition>
        {children}
      </PageTransition>

      <footer className="bg-[var(--sg-surface)] border-t border-[var(--sg-border)] pt-[var(--sp-16)] px-4 sm:px-8">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

            {/* Brand column */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 lg:pr-4">
              <div className="flex gap-2 items-start mb-4">
                <Logo className="w-6 h-6" />
                <div className="flex flex-col pt-0.5">
                  <div className="font-display font-bold text-[16px] text-[var(--sg-text-1)] leading-none">
                    Son<em className="not-italic text-[var(--sg-blue)]">Of</em>Graig
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-[var(--sg-text-3)] mb-6 leading-relaxed">
                Enterprise AI software, built in South Africa. Starting with the AI Dev Platform.
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Only claims that are true today — no SOC 2 / ISO 27001 / EU AI Act badges until we hold them. */}
                <span className="px-2 py-1 rounded bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] font-mono text-[10px] border border-[var(--sg-blue-border)]">POPIA</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] font-mono text-[10px] border border-[var(--sg-border)]">South African</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] font-mono text-[10px] border border-[var(--sg-border)]">ZAR</span>
              </div>
              <ul aria-label="sonofgraig elsewhere" className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {SOCIAL_PROFILES.map((p) => (
                  <li key={p.label}>
                    <a href={p.url} target="_blank" rel="noopener me" className={linkClass}>{p.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Products</h5>
              <ul className="space-y-3">
                <li><Link href="/platform/ai-dev-platform" className={linkClass}>AI Dev Platform</Link></li>
                <li><Link href="/platform/ai-dev-platform#rag-studio" className={linkClass}>RAG Studio</Link></li>
                <li><Link href="/platform/ai-dev-platform#agent-builder" className={linkClass}>Agent Builder</Link></li>
                <li><Link href="/platform/ai-dev-platform#governance-hub" className={linkClass}>Governance Hub</Link></li>
                <li><Link href="/platform/ai-dev-platform#ml-ops" className={linkClass}>ML Ops</Link></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Platform</h5>
              <ul className="space-y-3">
                <li><Link href="/platform" className={linkClass}>Overview</Link></li>
                <li><Link href="/early-access" className={linkClass}>Early access</Link></li>
                <li><Link href="/pricing" className={linkClass}>Pricing</Link></li>
                <li><Link href="/changelog" className={linkClass}>Changelog</Link></li>
                <li><Link href="/security" className={linkClass}>Security &amp; trust</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Services</h5>
              <ul className="space-y-3">
                <li><Link href="/services/ai-agent-implementation" className={linkClass}>AI Agent Setup</Link></li>
                <li><Link href="/services/rag-knowledge-base-setup" className={linkClass}>RAG Knowledge Base</Link></li>
                <li><Link href="/services/cloud-architecture" className={linkClass}>Cloud Architecture</Link></li>
                <li><Link href="/services/ai-governance-audit" className={linkClass}>AI Governance Audit</Link></li>
                <li><Link href="/services" className={linkClass}>All services</Link></li>
              </ul>
            </div>

            {/* Trust & legal */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Trust &amp; legal</h5>
              <ul className="space-y-3">
                <li><Link href="/security" className={linkClass}>Security overview</Link></li>
                <li><Link href="/popia" className={linkClass}>POPIA compliance</Link></li>
                <li><Link href="/data-protection-africa" className={linkClass}>Africa data laws</Link></li>
                <li><Link href="/paia" className={linkClass}>PAIA manual</Link></li>
                <li><Link href="/dpa" className={linkClass}>DPA</Link></li>
                <li><Link href="/terms" className={linkClass}>Terms of use</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Company</h5>
              <ul className="space-y-3">
                <li><Link href="/about" className={linkClass}>About</Link></li>
                <li><Link href="/blog" className={linkClass}>Insights</Link></li>
                <li><Link href="/contact" className={linkClass}>Contact</Link></li>
                <li><Link href="/press" className={linkClass}>Press</Link></li>
              </ul>
            </div>

          </div>

          {/* Newsletter */}
          <div className="border-t border-[var(--sg-border)] py-8 grid gap-[var(--sp-6)] md:grid-cols-[1fr_1.2fr] md:items-start">
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)]">sonofgraig Insights</h5>
              <p className="text-[13px] text-[var(--sg-text-3)] mt-2 leading-relaxed max-w-[360px]">
                Enterprise AI and POPIA, in your inbox every two weeks. Confirm by email; unsubscribe in one click.
              </p>
            </div>
            <NewsletterSignup variant="inline" source="footer" />
          </div>

          {/* Sitemap strip */}
          <div className="border-t border-[var(--sg-border)] py-4">
            <Link href="/sitemap" className="flex items-center gap-2 text-[11px] font-semibold text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] tracking-wider uppercase transition-colors w-fit">
              View Sitemap
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          {/* Bottom legal bar */}
          <div className="border-t border-[var(--sg-border)] py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[13px] text-[var(--sg-text-3)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M8 12a9 9 0 0 0 8 0"/></svg>
                English (South Africa)
              </div>
              <span className="text-[13px] text-[var(--sg-text-4)]">© sonofgraig {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/sitemap" className={linkClass}>Sitemap</Link>
              <Link href="/contact" className={linkClass}>Contact</Link>
              <Link href="/privacy-policy" className={linkClass}>Privacy</Link>
              <Link href="/terms" className={linkClass}>Terms of use</Link>
              <Link href="/popia" className={linkClass}>POPIA</Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
