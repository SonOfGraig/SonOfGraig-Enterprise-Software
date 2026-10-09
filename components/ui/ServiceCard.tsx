import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CircleCheck } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

// Design system v3.1 — ported from the 2026 agency site's ServiceCard.tsx:
// large icon tile that fills with brand blue on hover, a meta badge, tight
// title, three verified features, and a full-width action at the foot.
// Rebuilt on Card (solid) + Button (raised) so it stays inside the system.

export interface ServiceCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  features: string[];
  /** e.g. "from R65,000" */
  price: string;
  /** e.g. "4–6 weeks · Fixed scope" */
  meta: string;
  href: string;
}

export function ServiceCard({ icon: Icon, category, title, description, features, price, meta, href }: ServiceCardProps) {
  return (
    <Card
      padding="none"
      className="group h-full flex flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out)] hover:border-[var(--sg-blue-border)] hover:shadow-[var(--shadow-lift-md)] hover:-translate-y-1"
    >
      <div className="p-[var(--sp-8)] flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex size-12 items-center justify-center rounded-[var(--r-lg)] bg-[var(--sg-surface-2)] border border-[var(--sg-border)] text-[var(--sg-blue)] transition-all duration-500 ease-[var(--ease-out)] group-hover:bg-[var(--sg-blue)] group-hover:text-white group-hover:border-transparent group-hover:shadow-[var(--btn-primary-shadow)]">
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--sg-text-2)]">
            {price}
          </span>
        </div>

        <p className="text-label text-[var(--sg-text-4)] mt-[var(--sp-8)]">{category}</p>
        <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-2)] transition-colors duration-300 group-hover:text-[var(--sg-blue)]">
          {title}
        </h3>
        <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] line-clamp-3">{description}</p>

        <ul className="mt-[var(--sp-6)] space-y-[var(--sp-3)]">
          {features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-[var(--sp-3)] font-sans text-[13px] text-[var(--sg-text-2)]">
              <CircleCheck size={16} strokeWidth={1.75} aria-hidden="true" className="text-[var(--sg-blue)] shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-[var(--sp-8)] pb-[var(--sp-8)]">
        <p className="font-sans text-[12px] text-[var(--sg-text-4)] mb-[var(--sp-3)]">{meta}</p>
        <Button variant="secondary" size="lg" className="w-full justify-between" asChild>
          <Link href={href}>
            Learn more<span className="sr-only"> about {title}</span>
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
