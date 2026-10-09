import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ui/Loader';

const buttonVariants = cva(
  'sg-btn inline-flex items-center justify-center whitespace-nowrap rounded-[var(--r-md)] text-[13px] font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sg-blue)] disabled:pointer-events-none disabled:opacity-50 relative',
  {
    variants: {
      variant: {
        // v3.1: raised (tactile) treatment — see .btn-raised-* in globals.css
        primary: 'btn-raised-primary',
        secondary: 'btn-raised-neutral',
        ghost: 'hover:bg-[var(--sg-surface-2)] text-[var(--sg-blue)] hover:text-[var(--sg-blue-dim)]',
        outline: 'border border-[var(--sg-blue)] text-[var(--sg-blue)] hover:bg-[var(--sg-blue-glow)]',
        cta: 'bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-white hover:opacity-90 shadow-sm',
        danger: 'bg-[var(--sg-danger)] text-white hover:bg-[var(--sg-danger-bd)]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-[14px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  success?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading, success, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }), success && "btn-success")}
        ref={ref}
        disabled={loading || success || props.disabled}
        {...props}
      >
        <span className={cn("inline-flex items-center justify-center gap-2 transition-opacity duration-200 ease-out", (loading || success) ? "opacity-0" : "opacity-100")}>
          {children}
        </span>
        {loading && !success && (
          <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-200">
            <Loader state="dots" />
          </div>
        )}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-50 duration-300 ease-spring">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
