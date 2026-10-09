import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardBody, CardEyebrow, CardFooter, CardTitle } from './Card';

// Design system v3.1 — 08-cards.md / 16-sections.md. A solid card at
// marketing ("feature") scale: icon tile, optional index or eyebrow, h3, body,
// optional link. Becomes interactive only when it has an href.

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  eyebrow?: string;
  /** Small mono marker top-right, e.g. "01". */
  index?: string;
  href?: string;
  linkLabel?: string;
}

export function FeatureCard({ icon: Icon, title, body, eyebrow, index, href, linkLabel = 'Learn more' }: FeatureCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        {/* 2026-site ServiceCard: the icon tile fills with brand blue on card hover. */}
        <span className="inline-flex size-10 items-center justify-center rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] border border-[var(--sg-blue-border)] transition-[background-color,color,transform,box-shadow] duration-500 ease-[var(--ease-out)] group-hover:bg-[var(--sg-blue)] group-hover:text-white group-hover:scale-105 group-hover:shadow-[var(--btn-primary-shadow)]">
          <Icon size={20} aria-hidden="true" />
        </span>
        {index && <span className="font-mono text-[12px] text-[var(--sg-text-4)]">{index}</span>}
      </div>
      {eyebrow && <CardEyebrow className="mt-[var(--sp-8)]">{eyebrow}</CardEyebrow>}
      <CardTitle size="feature" className={eyebrow ? 'mt-[var(--sp-2)]' : 'mt-[var(--sp-8)]'}>
        {title}
      </CardTitle>
      <CardBody size="feature" className="mt-[var(--sp-3)]">
        {body}
      </CardBody>
      {href && (
        <CardFooter className="text-[var(--sg-blue)] font-sans text-[13px] font-medium">
          {linkLabel} <ArrowRight size={14} aria-hidden="true" />
        </CardFooter>
      )}
    </>
  );

  if (href) {
    return (
      <Card padding="lg" interactive asChild className="group h-full flex flex-col">
        <Link href={href}>{content}</Link>
      </Card>
    );
  }
  return (
    <Card padding="lg" className="group h-full transition-[border-color] duration-300 hover:border-[var(--sg-blue-border)]">
      {content}
    </Card>
  );
}
