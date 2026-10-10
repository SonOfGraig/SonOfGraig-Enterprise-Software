import { CalendarDays, MailCheck, ShieldCheck, Undo2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';
import { NewsletterSignup } from './NewsletterSignup';

// Shared sonofgraig Insights sign-up block: a brand panel (what you get, how we
// treat your inbox) beside the form. Used on articles and the Insights index.

const PROMISES = [
  { icon: CalendarDays, text: 'One issue every two weeks — no daily noise' },
  { icon: MailCheck, text: 'Double opt-in: nothing arrives until you confirm' },
  { icon: ShieldCheck, text: 'No open or click tracking; data kept in South Africa' },
  { icon: Undo2, text: 'Change topics or unsubscribe in one click' },
];

export function NewsletterCard({
  source,
  title = 'Get new articles by email.',
  className,
}: {
  source: 'article' | 'insights';
  title?: string;
  className?: string;
}) {
  return (
    <Card padding="none" className={cn('overflow-hidden', className)}>
      <div className="grid md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative border-b border-[var(--sg-border)] bg-[var(--sg-surface-2)] p-[var(--sp-6)] md:border-b-0 md:border-r md:p-[var(--sp-8)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: 'radial-gradient(120% 80% at 0% 0%, var(--sg-blue-glow), transparent 60%)' }}
          />
          <div className="relative">
            <div className="flex items-center gap-[var(--sp-3)]">
              <Logo className="h-9 w-10" />
              <div>
                <p className="font-display text-[15px] font-bold leading-none text-[var(--sg-text-1)]">
                  sonofgraig <span className="text-[var(--sg-blue)]">Insights</span>
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--sg-text-4)]">Fortnightly newsletter</p>
              </div>
            </div>
            <h3 className="text-h3 mt-[var(--sp-6)] text-[var(--sg-text-1)]">{title}</h3>
            <p className="text-body mt-[var(--sp-2)] text-[var(--sg-text-3)]">
              Practical writing on enterprise AI, RAG, agents and POPIA, from the team building the AI Dev Platform.
            </p>
            <ul className="mt-[var(--sp-6)] space-y-[var(--sp-3)]">
              {PROMISES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-[var(--sp-3)] text-[13px] leading-relaxed text-[var(--sg-text-2)]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]">
                    <Icon size={13} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-[var(--sp-6)] md:p-[var(--sp-8)]">
          <NewsletterSignup source={source} />
        </div>
      </div>
    </Card>
  );
}
