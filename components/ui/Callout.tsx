'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';

const calloutVariants = cva(
  'flex items-start gap-3 rounded-[var(--r-lg)] p-[var(--sp-4)] border',
  {
    variants: {
      variant: {
        info: 'bg-[var(--sg-blue-glow)] border-[var(--sg-blue-border)] text-[var(--sg-blue)]',
        success: 'bg-[var(--sg-success-bg)] border-[var(--sg-success-bd)] text-[var(--sg-success)]',
        warn: 'bg-[var(--sg-warn-bg)] border-[var(--sg-warn-bd)] text-[var(--sg-warn)]',
        danger: 'bg-[var(--sg-danger-bg)] border-[var(--sg-danger-bd)] text-[var(--sg-danger)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

interface CalloutProps extends Omit<HTMLMotionProps<"div">, "children">, VariantProps<typeof calloutVariants> {
  label: string;
  body?: string;
  children?: React.ReactNode;
}

const icons = {
  info: Info,
  success: CheckCircle2,
  warn: AlertTriangle,
  danger: XCircle,
};

export function Callout({ className, variant = 'info', label, body, children, ...props }: CalloutProps) {
  const Icon = icons[variant || 'info'];
  const reduced = useReducedMotion();

  return (
    <motion.div 
      initial={{ opacity: 0, x: reduced ? 0 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(calloutVariants({ variant }), className)} 
      role="status" 
      {...props}
    >
      <Icon size={16} strokeWidth={2} className="shrink-0 mt-[2px]" />
      <div className="flex flex-col gap-1 w-full">
        <div className="font-sans text-[13px] font-semibold">{label}</div>
        {body && (
          <div className="font-sans text-[13px] text-[var(--sg-text-2)] leading-relaxed">
            {body}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}
