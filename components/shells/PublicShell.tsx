import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { NavLinks } from './NavLinks';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { AnnouncementBar } from '@/components/marketing/AnnouncementBar';
import { PageTransition } from './PageTransition';
import { MobileMenu } from './MobileMenu';
import { CookieBanner } from '@/components/marketing/CookieBanner';
import { QuickActionsSidebar } from './QuickActionsSidebar';

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--sg-bg)' }}>
      <AnnouncementBar />
      <CookieBanner />
      <header className="sticky top-0 h-[64px] bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--sg-border)] z-[var(--z-sticky)] flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex gap-2 items-start shrink-0">
            <Logo className="w-8 h-8" />
            <div className="flex flex-col pt-1">
              <span className="font-display font-bold text-[18px] text-[var(--sg-text-1)] tracking-tight leading-none">
                SonOfGraig
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
              <Link href="/waitlist">Join waitlist</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </header>

      <QuickActionsSidebar />

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
                Africa&apos;s first enterprise AI platform. Converting 18 service capabilities into 5 SaaS clusters.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] font-mono text-[10px] border border-[var(--sg-blue-border)]">SOC 2</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] font-mono text-[10px] border border-[var(--sg-blue-border)]">POPIA</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] font-mono text-[10px] border border-[var(--sg-border)]">ISO 27001</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] font-mono text-[10px] border border-[var(--sg-border)]">EU AI Act</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] font-mono text-[10px] border border-[var(--sg-border)]">af-south-1</span>
                <span className="px-2 py-1 rounded bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] font-mono text-[10px] border border-[var(--sg-border)]">ZAR</span>
              </div>
            </div>

            {/* Products */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Products</h5>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Agent Builder</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">RAG Studio</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">ML Ops</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Governance Hub</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Cloud Console</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Pipeline Builder</Link></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Platform</h5>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Overview</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Build timeline</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Early access</Link></li>
                <li><Link href="/pricing" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Pricing</Link></li>
                <li><Link href="/changelog" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Changelog</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Roadmap</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Services</h5>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">AI Agent Setup</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">RAG Knowledge Base</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Cloud Architecture</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">AI Governance Audit</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Data Analytics</Link></li>
              </ul>
            </div>

            {/* Developer & IT */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Developer & IT</h5>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">API reference</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">SDK docs</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Security overview</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">POPIA compliance</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">DPA</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Status page</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-4">Company</h5>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Insights</Link></li>
                <li><Link href="/careers" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Press</Link></li>
                <li><Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Partners</Link></li>
              </ul>
            </div>

          </div>

          {/* Sitemap strip */}
          <div className="border-t border-[var(--sg-border)] py-4">
            <Link href="#" className="flex items-center gap-2 text-[11px] font-semibold text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] tracking-wider uppercase transition-colors w-fit">
              View Sitemap
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          {/* Bottom legal bar */}
          <div className="border-t border-[var(--sg-border)] py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[13px] text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] cursor-pointer transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M8 12a9 9 0 0 0 8 0"/></svg>
                English (South Africa)
              </div>
              <span className="text-[13px] text-[var(--sg-text-4)]">© SonOfGraig {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Sitemap</Link>
              <Link href="/contact" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Contact</Link>
              <Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Privacy</Link>
              <Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Terms of use</Link>
              <Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">Trademarks</Link>
              <Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">POPIA</Link>
              <Link href="#" className="text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">About our ads</Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
