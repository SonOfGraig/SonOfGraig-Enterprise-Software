import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';

export function EarlyAccessHero() {
  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        
        <div className="text-label text-[var(--sg-amber)] mb-2">FOUNDING CUSTOMER PROGRAMME</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] max-w-[720px] mx-auto mb-6">
          Be one of five companies that build this platform with us.
        </h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto mb-[var(--sp-8)]">
          5 pilot slots. First year 70% discounted. Direct access to the founding team. Your use case shapes the product features.
        </p>

        <div className="max-w-[320px] mx-auto mb-[var(--sp-10)]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-sans text-[13px] font-semibold text-[var(--sg-text-1)]">3 of 5 slots remaining</span>
          </div>
          <ProgressBar value={60} variant="blue" />
        </div>

        <div className="flex justify-center gap-[var(--sp-3)]">
          <Button variant="cta" size="lg" asChild>
            <Link href="#application-form">Apply now</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="#benefits">Learn about the programme</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
