import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-[var(--sp-1)] rounded-[var(--r-full)] px-[8px] py-[3px] font-sans text-[11px] font-medium tracking-[0.03em] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sg-blue)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        blue: 'bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]',
        success: 'bg-[var(--sg-success-bg)] text-[var(--sg-success)]',
        warn: 'bg-[var(--sg-warn-bg)] text-[var(--sg-warn)]',
        danger: 'bg-[var(--sg-danger-bg)] text-[var(--sg-danger)]',
        amber: 'bg-[rgba(249,115,22,0.1)] text-[var(--sg-amber)]',
        neutral: 'bg-[var(--sg-surface-2)] text-[var(--sg-text-3)]',
        default: 'bg-[var(--sg-surface-2)] text-[var(--sg-text-1)]', // Keep for backward compatibility
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  pulse?: boolean;
}

function Badge({ className, variant, dot, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span 
          className={cn(
            "w-[5px] h-[5px] rounded-full bg-current shrink-0",
            pulse && "animate-pulse-dot"
          )} 
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
