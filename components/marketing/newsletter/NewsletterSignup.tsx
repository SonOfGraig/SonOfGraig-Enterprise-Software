'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Check, Mail } from 'lucide-react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Turnstile } from '@/components/ui/Turnstile';
import { FormSuccess } from '@/components/marketing/forms/FormSuccess';
import { issueMessage } from '@/lib/forms/issueMessage';
import { cn } from '@/lib/utils';

// sonofgraig Insights sign-up (posts to /api/newsletter → listmonk, double
// opt-in). "card" shows topics + name; "inline" is the compact footer row
// (Insights articles only). Turnstile loads only once someone starts typing,
// so pages without sign-ups never pay for the widget script.

type Topic = 'insights' | 'platform' | 'governance';
const TOPICS: { value: Topic; label: string; hint: string }[] = [
  { value: 'insights', label: 'Insights articles', hint: 'Enterprise AI, RAG and agents — fortnightly' },
  { value: 'platform', label: 'AI Dev Platform updates', hint: 'What has shipped, when it ships' },
  { value: 'governance', label: 'POPIA & AI governance', hint: 'Practical briefings for compliance and IT' },
];

export function NewsletterSignup({ variant = 'card', source }: { variant?: 'card' | 'inline'; source: 'article' | 'insights' | 'footer' }) {
  const [topics, setTopics] = useState<Topic[]>(['insights']);
  const [armed, setArmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const onToken = useCallback((t: string | null) => setToken(t), []);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const inline = variant === 'inline';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(fd.get('email') ?? ''),
          name: String(fd.get('name') ?? ''),
          topics: inline ? ['insights'] : topics,
          consent: fd.get('consent') === 'on',
          source,
          hp: String(fd.get('hp') ?? ''),
          turnstileToken: token ?? undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSentTo(String(fd.get('email') ?? ''));
        return setStatus('sent');
      }
      if (data.error === 'validation' && data.issues) {
        const next: Partial<Record<string, string>> = {};
        for (const [k, v] of Object.entries(data.issues as Record<string, string[]>)) next[k] = v?.[0];
        setErrors(next);
        setMessage(issueMessage(data.issues, ['email', 'name', 'topics', 'consent'], 'tumiso@sonofgraig.com'));
      } else if (res.status === 429) {
        setMessage('Too many attempts from this connection. Please try again in a few minutes.');
      } else if (String(data.error ?? '').startsWith('turnstile')) {
        setMessage(armed && siteKey && !token ? 'Please complete the spam check below, then subscribe.' : 'The spam check did not complete. Please try again.');
      } else {
        setMessage('Something went wrong. Please try again, or email tumiso@sonofgraig.com.');
      }
      setStatus('error');
    } catch {
      setMessage('Could not reach the server. Please check your connection.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <FormSuccess
        compact={inline}
        status="Check your inbox"
        title="One step left — confirm by email."
        body="We've sent you a confirmation link. You're only subscribed once you tap it."
        steps={[
          { title: 'Open the email from sonofgraig Insights', body: 'It usually arrives within a minute. Check spam if it hasn’t.' },
          { title: 'Tap “Yes, subscribe me”', body: 'Until you do, we send you nothing at all.' },
          { title: 'Your first issue within two weeks', body: 'Practical enterprise AI and POPIA writing. Unsubscribe in one click.' },
        ]}
        email={sentTo ?? undefined}
      />
    );
  }

  const consentLabel = (
    <span>
      Email me sonofgraig Insights. I can unsubscribe at any time; see the{' '}
      <Link href="/privacy-policy" className="text-[var(--sg-blue)] hover:underline">privacy policy</Link>.
    </span>
  );

  return (
    <form onSubmit={onSubmit} noValidate onFocusCapture={() => setArmed(true)} className={inline ? 'space-y-[var(--sp-3)]' : 'space-y-[var(--sp-5)]'}>
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {inline ? (
        <div>
          {/* One glass pill: the field and the button live inside it. */}
          <div
            className={cn(
              'liquid-glass liquid-glass-strong flex items-center gap-[var(--sp-2)] rounded-full p-1.5 pl-[var(--sp-5)] transition-shadow focus-within:shadow-[0_0_0_4px_var(--sg-blue-glow)]',
              errors.email && 'border-[var(--sg-danger-bd)]',
            )}
          >
            <Mail size={16} aria-hidden="true" className="shrink-0 text-[var(--sg-text-4)]" />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Work email"
              aria-label="Email address"
              aria-invalid={errors.email ? true : undefined}
              className="min-w-0 flex-1 bg-transparent py-2 font-sans text-[14px] text-[var(--sg-text-1)] placeholder:text-[var(--sg-text-4)] focus:outline-none"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0 rounded-full px-5" loading={status === 'sending'}>
              Subscribe
            </Button>
          </div>
          {errors.email && <p className="mt-1.5 pl-[var(--sp-5)] text-[12px] text-[var(--sg-danger)]">{errors.email}</p>}
        </div>
      ) : (
        <>
          <div className="grid gap-[var(--sp-4)] sm:grid-cols-2">
            <Field label="Work email *" type="email" name="email" autoComplete="email" required error={errors.email} />
            <Field label="Name (optional)" name="name" autoComplete="name" error={errors.name} />
          </div>
          <fieldset>
            <legend className="text-label text-[var(--sg-text-3)] mb-[var(--sp-3)]">What would you like?</legend>
            <div className="grid gap-[var(--sp-2)]">
              {TOPICS.map((t) => {
                const on = topics.includes(t.value);
                return (
                  <label
                    key={t.value}
                    className={cn(
                      'group flex cursor-pointer items-center gap-[var(--sp-3)] rounded-[18px] border p-[var(--sp-3)] pr-[var(--sp-4)] shadow-[inset_0_1px_0_var(--lg-edge)] transition-all',
                      on
                        ? 'border-[var(--sg-blue-border)] bg-[color-mix(in_srgb,var(--sg-blue)_8%,var(--lg-fill-strong))]'
                        : 'border-[var(--lg-rim)] bg-[var(--lg-fill-strong)] hover:border-[var(--sg-border-md)]',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setTopics((cur) => (on ? cur.filter((x) => x !== t.value) : [...cur, t.value]))}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sg-blue)]',
                        on ? 'border-transparent text-white' : 'border-[var(--sg-border-md)] text-transparent',
                      )}
                      style={on ? { background: 'linear-gradient(135deg, #0EA5E9, #0B78DE)' } : undefined}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-[14px] font-semibold text-[var(--sg-text-1)]">{t.label}</span>
                      <span className="block text-[12.5px] text-[var(--sg-text-4)]">{t.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.topics && <p className="mt-2 text-[12px] text-[var(--sg-danger)]">{errors.topics}</p>}
          </fieldset>
        </>
      )}

      <label className={cn('flex items-start gap-[var(--sp-3)] text-[var(--sg-text-3)]', inline ? 'text-[12px]' : 'text-body')}>
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-[var(--sg-blue)]" />
        {consentLabel}
      </label>
      {errors.consent && <p className="text-[12px] text-[var(--sg-danger)]">{errors.consent}</p>}

      {armed && siteKey && <Turnstile onToken={onToken} />}

      {status === 'error' && (
        <p role="alert" className="rounded-[var(--r-lg)] border border-[var(--sg-danger-bd)] bg-[var(--sg-danger-bg)] px-[var(--sp-4)] py-[var(--sp-3)] text-body text-[var(--sg-danger)]">
          {message}
        </p>
      )}

      {!inline && (
        <Button type="submit" variant="primary" size="lg" className="rounded-full px-8" loading={status === 'sending'}>
          Subscribe
        </Button>
      )}
    </form>
  );
}
