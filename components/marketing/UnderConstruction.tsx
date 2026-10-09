import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SceneBackground } from '@/components/fx/SceneBackground';
import { WordReveal } from '@/components/fx/WordReveal';

export interface UnderConstructionProps {
  /** Page title shown as <h1>. */
  title: string;
  /** Optional one-paragraph description. Falls back to a generic message. */
  description?: string;
  /**
   * Deprecated — no longer rendered. Ship dates were removed from the site
   * (founder decision, 2026-10-09); kept in the type so existing pages compile.
   */
  eta?: string;
  /** Optional list of related links shown beneath the CTAs. */
  relatedLinks?: { href: string; label: string }[];
}

/**
 * Shared placeholder for routes that are linked but not yet built
 * (design system v3.1: scene background, CSS entrance, raised buttons).
 * Server component. Pages using it should set robots index:false.
 */
export function UnderConstruction({ title, description, relatedLinks = [] }: UnderConstructionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-160px)] items-center justify-center overflow-hidden px-4 py-20 grain" style={{ background: 'var(--sg-bg)' }}>
      <SceneBackground scene="collisionBeams" />
      <div className="relative z-10 mx-auto max-w-[680px] text-center">
        <p className="reveal-up liquid-glass mx-auto inline-flex rounded-full px-3.5 py-1.5 text-label text-[var(--sg-blue)]">
          <span className="relative z-[2]">In preparation</span>
        </p>
        <h1 className="text-display text-[var(--sg-text-1)] mt-7 text-balance">
          <WordReveal text={title} delay={0.1} />
        </h1>
        <p className="reveal-up text-body-lg text-[var(--sg-text-3)] mt-6 text-balance" style={{ animationDelay: '0.45s' }}>
          {description ?? 'This page is being prepared. In the meantime, the links below will get you where you need to go.'}
        </p>
        <div className="reveal-up mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.6s' }}>
          <Button variant="primary" size="lg" className="rounded-full px-7" asChild>
            <Link href="/">
              <Home size={15} aria-hidden="true" /> Back home
            </Link>
          </Button>
          <Button variant="secondary" size="lg" className="rounded-full px-7" asChild>
            <Link href="/contact">
              Talk to us <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Button>
        </div>
        {relatedLinks.length > 0 && (
          <div className="reveal-up mt-12 border-t border-[var(--sg-border)] pt-8" style={{ animationDelay: '0.75s' }}>
            <p className="text-label text-[var(--sg-text-4)] mb-4">In the meantime</p>
            <div className="flex flex-wrap justify-center gap-2">
              {relatedLinks.map((link) => (
                <Button key={link.href} variant="secondary" size="sm" className="rounded-full px-4" asChild>
                  <Link href={link.href}>
                    {link.label} <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
