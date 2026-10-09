'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Design system v3.1 — ported from the 2026 agency site's ServiceFAQ.tsx.
// Rows lift to the open state with a brand border; the chevron turns; the
// answer opens with a height transition into a blue-ruled panel.
// Answers stay in the DOM (grid-rows 0fr→1fr) so crawlers and FAQPage JSON-LD
// see the same text, and the transition needs no JS measuring.

export type FAQItem = { q: string; a: string };

export function FAQ({ items, defaultOpen = 0 }: { items: FAQItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="space-y-[var(--sp-3)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;
        return (
          <div
            key={item.q}
            className={cn(
              'rounded-[var(--r-xl)] border bg-[var(--sg-surface)] transition-[border-color,box-shadow] duration-500 ease-[var(--ease-out)]',
              isOpen ? 'border-[var(--sg-blue-border)] shadow-[var(--shadow-lift-md)]' : 'border-[var(--sg-border)] hover:border-[var(--sg-border-md)]',
            )}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-[var(--sp-4)] text-left px-[var(--sp-6)] py-[var(--sp-5)] rounded-[var(--r-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sg-blue)]"
              >
                <span className={cn('font-sans text-[15px] font-semibold transition-colors duration-300', isOpen ? 'text-[var(--sg-blue)]' : 'text-[var(--sg-text-1)]')}>
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={cn('shrink-0 transition-transform duration-500 ease-[var(--ease-out)]', isOpen ? 'rotate-180 text-[var(--sg-blue)]' : 'text-[var(--sg-text-4)]')}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn('grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden">
                <div className="mx-[var(--sp-6)] mb-[var(--sp-6)] border-l-2 border-[var(--sg-blue-border)] pl-[var(--sp-5)] text-body text-[var(--sg-text-2)]">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
