import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function ServicesHero() {
  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        <div className="text-label text-[var(--sg-blue)] mb-2">EXPERT DELIVERY -- WHILE THE PLATFORM IS BUILT</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] max-w-[720px] mx-auto mb-6">
          Enterprise AI delivered as a project, today.
        </h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto mb-[var(--sp-10)]">
          Every service follows the same architecture and approach as our future platform. Fixed scope. Fixed price. Defined outcome.
        </p>

        <div className="flex justify-center gap-[var(--sp-3)]">
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">Start a project</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/platform">See the platform roadmap</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
