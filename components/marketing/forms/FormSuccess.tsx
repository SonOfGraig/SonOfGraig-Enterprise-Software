'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// What a visitor sees after any form succeeds — the on-page twin of the
// confirmation email (lib/email/templates.ts customerReply): the same status,
// the same numbered "what happens next" steps, and where the copy was sent.
// One liquid-glass card; the check draws itself unless reduced motion is on.

export type SuccessStep = { title: string; body: string };

export function FormSuccess({
  status,
  title,
  body,
  steps = [],
  email,
  actions = [],
  compact = false,
  className,
}: {
  status: string;
  title: string;
  body: string;
  steps?: SuccessStep[];
  /** where the confirmation went; shown so a typo is noticed now, not never */
  email?: string;
  actions?: Array<{ label: string; href: string }>;
  /** footer / inline use: no steps, smaller type */
  compact?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const draw = reduced ? { initial: false as const } : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 } };
  const rise = (i: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'liquid-glass relative overflow-hidden rounded-[28px] text-left',
        compact ? 'p-[var(--sp-5)]' : 'p-[var(--sp-6)] sm:p-[var(--sp-10)]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(90% 60% at 0% 0%, var(--sg-blue-glow), transparent 60%)' }}
      />
      <div className="relative">
        <div className={cn('flex items-center', compact ? 'gap-[var(--sp-3)]' : 'gap-[var(--sp-4)]')}>
          <span
            className={cn(
              'grid shrink-0 place-items-center rounded-full text-white shadow-[0_10px_24px_-10px_rgba(11,120,222,0.7)]',
              compact ? 'size-10' : 'size-14',
            )}
            style={{ background: 'linear-gradient(135deg, #0EA5E9, #0B78DE)' }}
          >
            <svg viewBox="0 0 24 24" className={compact ? 'size-5' : 'size-7'} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <motion.path d="M5 12.5l4.5 4.5L19 7.5" {...draw} />
            </svg>
          </span>
          <span className="inline-flex items-center rounded-full border border-[var(--sg-success-bd)] bg-[var(--sg-success-bg)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--sg-success)]">
            {status}
          </span>
        </div>

        <motion.h3 {...rise(0)} className={cn('mt-[var(--sp-5)] font-display font-extrabold tracking-tight text-[var(--sg-text-1)]', compact ? 'text-[18px]' : 'text-[26px] leading-tight sm:text-[30px]')}>
          {title}
        </motion.h3>
        <motion.p {...rise(1)} className={cn('mt-[var(--sp-2)] text-[var(--sg-text-3)]', compact ? 'text-[13px]' : 'text-body max-w-[560px]')}>
          {body}
        </motion.p>

        {!compact && steps.length > 0 && (
          <motion.ol {...rise(2)} className="mt-[var(--sp-6)] space-y-[var(--sp-2)]">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex items-start gap-[var(--sp-3)] rounded-[18px] border border-[var(--lg-rim)] bg-[var(--lg-fill-strong)] p-[var(--sp-4)] shadow-[inset_0_1px_0_var(--lg-edge)]"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full font-display text-[13px] font-extrabold text-white" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0B78DE)' }}>
                  {i + 1}
                </span>
                <span>
                  <span className="block font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">{s.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-relaxed text-[var(--sg-text-3)]">{s.body}</span>
                </span>
              </li>
            ))}
          </motion.ol>
        )}

        {email && (
          <motion.p {...rise(3)} className={cn('flex items-center gap-[var(--sp-2)] text-[var(--sg-text-3)]', compact ? 'mt-[var(--sp-3)] text-[12px]' : 'mt-[var(--sp-5)] text-[13px]')}>
            <MailCheck size={compact ? 14 : 16} aria-hidden="true" className="shrink-0 text-[var(--sg-blue)]" />
            <span>
              A copy is on its way to <strong className="font-semibold text-[var(--sg-text-1)]">{email}</strong>. Not there in a few minutes? Check spam.
            </span>
          </motion.p>
        )}

        {actions.length > 0 && (
          <motion.div {...rise(4)} className={cn('flex flex-wrap gap-[var(--sp-3)]', compact ? 'mt-[var(--sp-4)]' : 'mt-[var(--sp-8)]')}>
            {actions.map((a, i) => (
              <Button key={a.href} variant={i === 0 ? 'primary' : 'secondary'} size={compact ? 'sm' : 'lg'} className="rounded-full px-6" asChild>
                <Link href={a.href}>{a.label}</Link>
              </Button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
