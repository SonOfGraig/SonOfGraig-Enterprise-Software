'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Turnstile } from '@/components/ui/Turnstile';
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
      if (res.ok && data.ok) return setStatus('sent');
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
      <div role="status" className={cn('flex items-start gap-[var(--sp-3)]', !inline && 'py-[var(--sp-2)]')}>
        <MailCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--sg-success)]" />
        <div>
          <p className="font-sans text-[15px] font-semibold text-[var(--sg-text-1)]">Check your inbox to confirm.</p>
          <p className="text-body text-[var(--sg-text-3)] mt-1">We sent a confirmation link. You are only subscribed once you click it.</p>
        </div>
      </div>
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
        <div className="flex flex-col gap-[var(--sp-2)] sm:flex-row">
          <div className="flex-1">
            <Field type="email" name="email" placeholder="Work email" aria-label="Email address" autoComplete="email" required error={errors.email} />
          </div>
          <Button type="submit" variant="primary" className="rounded-full px-6" loading={status === 'sending'}>Subscribe</Button>
        </div>
      ) : (
        <>
          <div className="grid gap-[var(--sp-4)] sm:grid-cols-2">
            <Field label="Work email *" type="email" name="email" autoComplete="email" required error={errors.email} />
            <Field label="Name (optional)" name="name" autoComplete="name" error={errors.name} />
          </div>
          <fieldset>
            <legend className="text-label text-[var(--sg-text-3)] mb-[var(--sp-3)]">What would you like?</legend>
            <div className="grid gap-[var(--sp-2)] sm:grid-cols-3">
              {TOPICS.map((t) => {
                const on = topics.includes(t.value);
                return (
                  <label
                    key={t.value}
                    className={cn(
                      'flex cursor-pointer items-start gap-[var(--sp-2)] rounded-[var(--r-lg)] border p-[var(--sp-3)] transition-colors',
                      on ? 'border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)]' : 'border-[var(--sg-border)] hover:border-[var(--sg-border-md)]',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setTopics((cur) => (on ? cur.filter((x) => x !== t.value) : [...cur, t.value]))}
                      className="mt-0.5 size-4 accent-[var(--sg-blue)]"
                    />
                    <span>
                      <span className="block font-sans text-[14px] font-medium text-[var(--sg-text-1)]">{t.label}</span>
                      <span className="block text-[12px] text-[var(--sg-text-4)]">{t.hint}</span>
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
