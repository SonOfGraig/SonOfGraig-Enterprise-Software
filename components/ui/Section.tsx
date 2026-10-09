import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/fx/Reveal';
import { SceneBackground, type SceneName } from '@/components/fx/SceneBackground';

// Design system v3.1 — 16-sections.md. Every marketing section shares one
// rhythm: a tone (surface level), vertical spacing, a content width, and the
// same header anatomy. Pages compose these instead of hand-setting padding.

const sectionVariants = cva('relative', {
  variants: {
    // Surface levels from 01-color.md, used in order — never skip a level.
    tone: {
      base: 'bg-[var(--sg-bg)]',
      surface: 'bg-[var(--sg-surface)]',
    },
    spacing: {
      md: 'py-[clamp(56px,8vw,96px)]',
      lg: 'py-[clamp(72px,11vw,128px)]',
    },
    divider: {
      true: 'border-t border-[var(--sg-border)]',
      false: '',
    },
  },
  defaultVariants: { tone: 'base', spacing: 'lg', divider: false },
});

const containerVariants = cva('mx-auto px-[var(--sp-4)] sm:px-[var(--sp-8)]', {
  variants: {
    width: {
      default: 'max-w-[1200px]',
      narrow: 'max-w-[880px]',
    },
  },
  defaultVariants: { width: 'default' },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants>,
    VariantProps<typeof containerVariants> {
  /** One animated canvas scene behind the content (ported from the 2026 site). */
  background?: SceneName;
}

export function Section({ className, tone, spacing, divider, width, background, children, style, ...props }: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ tone, spacing, divider }), background && 'overflow-hidden', className)}
      style={{ ['--scene-fade' as string]: tone === 'surface' ? 'var(--sg-surface)' : 'var(--sg-bg)', ...style }}
      {...props}
    >
      {background && <SceneBackground scene={background} />}
      <div className={cn(containerVariants({ width }), background && 'relative z-10')}>{children}</div>
    </section>
  );
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  /** Right-aligned slot on wide screens, e.g. a "View all" link. */
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = 'left', action, className }: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <Reveal
      className={cn(
        'mb-[var(--sp-12)] flex flex-col gap-[var(--sp-6)]',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-[680px]', centered && 'mx-auto')}>
        {eyebrow && <p className="text-label text-[var(--sg-blue)] mb-[var(--sp-4)]">{eyebrow}</p>}
        <h2 className="text-h2 text-[var(--sg-text-1)] text-balance">{title}</h2>
        {description && (
          <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)] text-balance">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export { sectionVariants, containerVariants };
