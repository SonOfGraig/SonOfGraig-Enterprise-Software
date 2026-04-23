import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AboutHero() {
  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        <div className="text-label text-[var(--sg-blue)] mb-2">OUR STORY</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] max-w-[800px] mx-auto mb-6">
          We are a company in honest transition.
        </h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto mb-[var(--sp-8)]">
          SonOfGraig started as a digital solutions agency delivering enterprise AI, cloud, and data projects. We were good at it. We are now converting that expertise into software -- building the platform we always wished existed for African enterprises.
        </p>
        <Button variant="outline" size="lg" asChild>
          <Link href="/platform">See what we are building</Link>
        </Button>
      </div>
    </section>
  );
}
