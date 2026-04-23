import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

export function POPIAHero() {
  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="text-label text-[var(--sg-blue)] mb-2">POPIA COMPLIANCE</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] max-w-[800px] mb-6">
          How SonOfGraig processes and protects your personal information.
        </h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[700px] mb-[var(--sp-10)]">
          This page documents our compliance with the Protection of Personal Information Act 4 of 2013 (POPIA). It is written for your legal and procurement teams, not for marketing purposes.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[var(--sp-4)]">
          <Button variant="secondary" size="lg">
            <Download size={16} strokeWidth={1.5} className="mr-2" />
            Download POPIA statement (PDF)
          </Button>
          <div className="font-mono text-[12px] text-[var(--sg-text-4)]">
            Last reviewed: 14 April 2026
          </div>
        </div>
      </div>
    </section>
  );
}
