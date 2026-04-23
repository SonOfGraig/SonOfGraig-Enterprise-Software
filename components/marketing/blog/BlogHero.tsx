'use client';

import { Field } from '@/components/ui/Field';
import { Search } from 'lucide-react';

export function BlogHero() {
  const categories = ['All', 'Strategy', 'Engineering', 'Compliance', 'Product', 'Transition'];

  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        <div className="text-label text-[var(--sg-blue)] mb-2">BUILD IN PUBLIC -- FOLLOW OUR JOURNEY</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] mb-6">Insights from the build.</h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto mb-[var(--sp-10)]">
          We document what we learn as we transition from a services agency to a software company. Real decisions, real tradeoffs, real progress.
        </p>

        <div className="max-w-[480px] mx-auto mb-[var(--sp-8)]">
          <Field 
            leadingIcon={<Search size={16} strokeWidth={1.5} />} 
            placeholder="Search insights" 
          />
        </div>

        <div className="flex justify-center gap-[var(--sp-2)] flex-wrap">
          {categories.map((category, i) => (
            <button
              key={category}
              className={`px-4 py-1.5 rounded-[var(--r-full)] font-sans text-[13px] font-medium transition-colors ${
                i === 0 
                  ? 'bg-[var(--sg-text-1)] text-[var(--sg-bg)]' 
                  : 'bg-[var(--sg-surface-2)] text-[var(--sg-text-2)] hover:bg-[var(--sg-surface-3)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
