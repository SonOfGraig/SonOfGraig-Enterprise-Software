import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Design system v3.1 — 08-cards.md. The three documented card types, encoded
// once so pages stop re-typing background/border/radius by hand.
//
//   solid  — default. Feature listings, product modules, tiers.
//   glass  — ONLY over visible content (imagery, the hero rays, a product
//            frame). Glass on a plain background must be `solid` instead.
//   metric — KPI values, with the 2px brand-span top edge.
//
// `interactive` adds the documented hover machine (lift + shadow + border).
// Leave it off for static cards: a card that lifts but does nothing is a lie.

const cardVariants = cva('relative rounded-[var(--r-xl)]', {
  variants: {
    variant: {
      solid: 'bg-[var(--sg-surface)] border border-[var(--sg-border)]',
      glass: 'liquid-glass',
      metric:
        'bg-[var(--sg-surface)] border border-[var(--sg-border)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-[var(--sg-blue)]',
    },
    padding: {
      none: '',
      sm: 'p-[var(--sp-4)]',
      md: 'p-[var(--sp-6)]',
      lg: 'p-[var(--sp-8)]',
    },
    interactive: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'solid', interactive: true, className: 'card cursor-pointer' },
    { variant: 'metric', interactive: true, className: 'card cursor-pointer' },
    { variant: 'glass', interactive: true, className: 'card-glass cursor-pointer' },
  ],
  defaultVariants: { variant: 'solid', padding: 'md', interactive: false },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Render as the child element (e.g. a Link) while keeping card styling. */
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} className={cn(cardVariants({ variant, padding, interactive }), className)} {...props}>
        {children}
      </Comp>
    );
  },
);
Card.displayName = 'Card';

/** 08-cards anatomy: eyebrow — `.text-label` in brand blue. */
export function CardEyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-label text-[var(--sg-blue)]', className)} {...props} />;
}

/** 08-cards anatomy: heading. `size="feature"` uses the h3 token for marketing sections. */
export function CardTitle({
  className,
  size = 'default',
  as: Tag = 'h3',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { size?: 'default' | 'feature'; as?: 'h2' | 'h3' | 'h4' }) {
  return (
    <Tag
      className={cn(
        size === 'feature'
          ? 'text-h3 text-[var(--sg-text-1)]'
          : 'font-sans text-[15px] font-semibold tracking-[-0.01em] text-[var(--sg-text-1)]',
        className,
      )}
      {...props}
    />
  );
}

/** 08-cards anatomy: body — `--sg-text-3`, 2–3 lines; link out if longer. */
export function CardBody({
  className,
  size = 'default',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { size?: 'default' | 'feature' }) {
  return (
    <p
      className={cn(
        size === 'feature' ? 'text-body text-[var(--sg-text-3)]' : 'font-sans text-[13px] leading-[1.6] text-[var(--sg-text-3)]',
        className,
      )}
      {...props}
    />
  );
}

/** Bottom row for tags/badges (max 2 per card) or a link. */
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-[var(--sp-6)] flex items-center gap-[var(--sp-2)]', className)} {...props} />;
}

export { cardVariants };
