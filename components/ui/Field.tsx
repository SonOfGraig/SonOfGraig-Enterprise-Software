'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label?: string;
  error?: string;
  description?: string;
  type?: string;
  as?: 'input' | 'textarea' | 'select';
  options?: { label: string; value: string }[];
  leadingIcon?: React.ReactNode;
  rows?: number;
}

export const Field = React.forwardRef<any, FieldProps>(
  ({ className, label, error, description, id, type, as, options, leadingIcon, children, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;
    const elementType = as || (type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input');
    const reduced = useReducedMotion();

    const isSuccess = props['aria-invalid'] === false && !error && props.value;

    const baseClasses = cn(
      'sg-input flex w-full rounded-[var(--r-md)] border border-[var(--sg-border-md)] bg-[var(--sg-bg)] px-3 py-2 text-[14px] font-sans text-[var(--sg-text-1)] transition-colors',
      'placeholder:text-[var(--sg-text-4)]',
      'focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50',
      error && 'error',
      isSuccess && 'success',
      leadingIcon && 'pl-10',
      className
    );

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-label text-[var(--sg-text-2)]">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {leadingIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sg-text-4)]">
              {leadingIcon}
            </div>
          )}
          {elementType === 'input' && (
            <input suppressHydrationWarning
              id={inputId}
              ref={ref}
              type={type}
              className={cn('h-10', baseClasses)}
              aria-describedby={cn(description && descriptionId, error && errorId) || undefined}
              aria-invalid={!!error}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          {elementType === 'textarea' && (
            <textarea
              id={inputId}
              ref={ref}
              className={cn('min-h-[80px] resize-y', baseClasses)}
              aria-describedby={cn(description && descriptionId, error && errorId) || undefined}
              aria-invalid={!!error}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          )}
          {elementType === 'select' && (
            <select
              id={inputId}
              ref={ref}
              className={cn('h-10 appearance-none', baseClasses)}
              aria-describedby={cn(description && descriptionId, error && errorId) || undefined}
              aria-invalid={!!error}
              {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
              {children || (
                <>
                  <option value="" disabled>Select an option</option>
                  {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </>
              )}
            </select>
          )}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: reduced ? 0 : 8, y: '-50%' }}
                animate={{ opacity: 1, x: 0, y: '-50%' }}
                exit={{ opacity: 0, scale: 0.8, y: '-50%' }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute right-3 top-1/2 text-[var(--sg-success)] pointer-events-none"
              >
                <Check size={16} strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {description && !error && (
          <p id={descriptionId} className="text-[12px] font-sans text-[var(--sg-text-3)]">
            {description}
          </p>
        )}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p id={errorId} className="text-[12px] font-sans text-[var(--sg-danger)] pt-1">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Field.displayName = 'Field';


