import Link from 'next/link';
import { Construction, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface UnderConstructionProps {
  /** Page title shown as <h1>. */
  title: string;
  /** Optional one-paragraph description. Falls back to a generic message. */
  description?: string;
  /** Optional ETA badge, e.g. "Q3 2026". Renders amber "ETA <eta>" pill. */
  eta?: string;
  /** Optional list of related links shown beneath the CTAs. */
  relatedLinks?: { href: string; label: string }[];
}

/**
 * Shared placeholder for routes that are linked but not yet built.
 * Server component — safe to use from any page.tsx.
 *
 * Pages using this component should set `robots: { index: false, follow: true }`
 * in their metadata so search engines don't index empty stubs.
 */
export function UnderConstruction({
  title,
  description,
  eta,
  relatedLinks = [],
}: UnderConstructionProps) {
  return (
    <section className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-20">
      <div className="max-w-[640px] mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] mb-6">
          <Construction
            size={28}
            strokeWidth={1.5}
            className="text-[var(--sg-blue)]"
          />
        </div>

        {eta && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sg-warn-bg)] border border-[var(--sg-warn-bd)] text-[11px] font-mono uppercase tracking-wider text-[var(--sg-amber)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--sg-amber)]" />
            ETA {eta}
          </div>
        )}

        <h1 className="font-display text-[36px] font-bold tracking-tight text-[var(--sg-text-1)] mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-[16px] text-[var(--sg-text-3)] leading-relaxed mb-8">
          {description ??
            "This page is under construction. We're working on it — check back soon."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button variant="primary" size="md" asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <Home size={14} strokeWidth={1.75} />
              Back home
            </Link>
          </Button>
          <Button variant="secondary" size="md" asChild>
            <Link
              href="/early-access"
              className="inline-flex items-center gap-2"
            >
              Join early access
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </Button>
        </div>

        {relatedLinks.length > 0 && (
          <div className="border-t border-[var(--sg-border)] pt-8">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--sg-text-4)] mb-4">
              In the meantime
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--sg-surface-2)] border border-[var(--sg-border)] text-[12px] text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] hover:border-[var(--sg-border-md)] transition-colors"
                >
                  {link.label}
                  <ArrowRight size={12} strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
