import { CalendarDays, MailCheck, ShieldCheck, Undo2 } from 'lucide-react';
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
    // Liquid glass over a soft brand glow, so the frosting has something to
    // frost: the panel on the left is tinted, the form side is clear glass.
    <div className={cn('relative isolate', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 opacity-80 blur-2xl"
        style={{ background: 'radial-gradient(50% 60% at 20% 30%, rgba(14,165,233,0.22), transparent 70%), radial-gradient(45% 55% at 85% 70%, rgba(99,102,241,0.16), transparent 70%)' }}
      />
      <div className="liquid-glass overflow-hidden rounded-[32px]">
      <div className="grid md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative border-b border-[var(--lg-rim)] p-[var(--sp-6)] md:border-b-0 md:border-r md:p-[var(--sp-10)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(120% 80% at 0% 0%, var(--sg-blue-glow), transparent 65%)' }}
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
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-[var(--lg-rim)] bg-[var(--lg-fill-strong)] text-[var(--sg-blue)] shadow-[inset_0_1px_0_var(--lg-edge)]">
                    <Icon size={13} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-[var(--sp-6)] md:p-[var(--sp-10)]">
          <NewsletterSignup source={source} />
        </div>
      </div>
      </div>
    </div>
  );
}
