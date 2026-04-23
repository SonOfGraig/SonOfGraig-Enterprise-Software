import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressBarVariants = cva(
  'h-2 w-full overflow-hidden rounded-[var(--r-full)] bg-[var(--sg-surface-3)]',
  {
    variants: {
      variant: {
        default: 'bg-[var(--sg-surface-3)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const progressFillVariants = cva(
  'h-full w-full flex-1 transition-all duration-500 ease-in-out',
  {
    variants: {
      variant: {
        blue: 'bg-[var(--sg-blue)]',
        amber: 'bg-[var(--sg-amber)]',
        success: 'bg-[var(--sg-success)]',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  variant?: 'blue' | 'amber' | 'success';
}

export function ProgressBar({ className, value, variant = 'blue', ...props }: ProgressBarProps) {
  return (
    <div className={cn(progressBarVariants(), className)} {...props}>
      <div
        className={cn(progressFillVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
