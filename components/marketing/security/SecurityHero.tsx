import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import Link from 'next/link';

export function SecurityHero() {
  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        <div className="text-label text-[var(--sg-blue)] mb-2">SECURITY & TRUST</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] max-w-[800px] mx-auto mb-6">
          Enterprise-grade security, built in from day one.
        </h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto mb-[var(--sp-10)]">
          Every architectural decision at SonOfGraig starts with security. Here is exactly what we do and how we do it.
        </p>

        <div className="flex justify-center gap-[var(--sp-3)]">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/security-overview.pdf" target="_blank" className="flex items-center gap-2">
              <Download size={16} strokeWidth={1.5} />
              Download security overview
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/contact?subject=security">Contact security team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
