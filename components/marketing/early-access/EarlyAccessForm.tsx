'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CircleCheck, Lock } from 'lucide-react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Turnstile } from '@/components/ui/Turnstile';
import { cn } from '@/lib/utils';
import { issueMessage } from '@/lib/forms/issueMessage';

// Posts to /api/forms/early-access (lib/forms/schemas.ts → earlyAccessSchema).
// Field names match the schema; server validation is the authority.

const CLUSTERS = [
  { value: 'ai-dev', label: 'AI Dev Platform', note: 'In build' },
  { value: 'cloud-devops', label: 'Cloud & DevOps', note: 'Planned' },
  { value: 'data-analytics', label: 'Data & Analytics', note: 'Planned' },
  { value: 'creative-xr', label: 'Creative & XR', note: 'Planned' },
  { value: 'dev-platform', label: 'Dev Platform', note: 'Planned' },
  { value: 'not-sure', label: 'Not sure yet', note: '' },
];

const opts = (xs: string[]) => xs.map((x) => ({ value: x, label: x }));

export function EarlyAccessForm() {
  const [clusters, setClusters] = useState<string[]>(['ai-dev']);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const toggle = (v: string) => setClusters((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g = (k: string) => String(fd.get(k) ?? '');
    const body = {
      name: g('name'),
      role: g('role'),
      email: g('email'),
      phone: g('phone'),
      company: g('company'),
      sector: g('sector'),
      size: g('size'),
      idp: g('idp'),
      clusters,
      usecase: g('usecase'),
      timeline: g('timeline'),
      consent: fd.get('consent') === 'on',
      nda: fd.get('nda') === 'on',
      hp: g('hp'),
      turnstileToken: token ?? undefined,
    };
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/forms/early-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return setStatus('sent');
      if (data.error === 'validation' && data.issues) {
        const next: Record<string, string> = {};
        for (const [k, v] of Object.entries(data.issues as Record<string, string[]>)) next[k] = v?.[0];
        setErrors(next);
        setMessage(issueMessage(data.issues, ['name', 'role', 'email', 'phone', 'company', 'sector', 'size', 'idp', 'clusters', 'usecase', 'timeline', 'consent', 'nda'], 'sales@sonofgraig.com'));
      } else if (res.status === 429) {
        setMessage('Too many submissions from this connection. Please wait a few minutes, or email sales@sonofgraig.com.');
      } else if (String(data.error ?? '').startsWith('turnstile')) {
        setMessage('The spam check did not complete. Please try again.');
      } else {
        setMessage('Something went wrong. Please email sales@sonofgraig.com and we will pick it up from there.');
      }
      setStatus('error');
    } catch {
      setMessage('Could not reach the server. Please check your connection, or email sales@sonofgraig.com.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center py-[var(--sp-12)] text-center">
        <span className="grid size-14 place-items-center rounded-full bg-[var(--sg-success-bg)] text-[var(--sg-success)]">
          <CircleCheck size={28} aria-hidden="true" />
        </span>
        <h3 className="text-h3 text-[var(--sg-text-1)] mt-[var(--sp-6)]">Application received.</h3>
        <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-3)] max-w-[440px]">
          Tumiso reviews every application personally and replies within two business days — with a discovery-call slot or honest feedback if it is not the right fit.
        </p>
        <Button variant="secondary" size="md" className="mt-[var(--sp-6)]" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-[var(--sp-8)]">
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <fieldset className="space-y-[var(--sp-5)]">
        <legend className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">About you</legend>
        <div className="grid gap-[var(--sp-5)] sm:grid-cols-2">
          <Field label="Full name *" name="name" autoComplete="name" required error={errors.name} />
          <Field label="Role / title *" name="role" autoComplete="organization-title" required error={errors.role} />
          <Field label="Work email *" name="email" type="email" autoComplete="email" required error={errors.email} />
          <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
        </div>
      </fieldset>

      <fieldset className="space-y-[var(--sp-5)]">
        <legend className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">Your organisation</legend>
        <Field label="Organisation name *" name="company" autoComplete="organization" required error={errors.company} />
        <div className="grid gap-[var(--sp-5)] sm:grid-cols-3">
          <Field
            as="select"
            label="Sector *"
            name="sector"
            defaultValue=""
            required
            error={errors.sector}
            options={opts(['Legal services', 'Banking / financial services', 'Insurance', 'Healthcare / medical aid', 'Professional services / consulting', 'Retail / e-commerce', 'Manufacturing / industrial', 'Mining / energy / resources', 'Telecoms / media', 'Government / SOE / public sector', 'Education', 'Other'])}
          />
          <Field
            as="select"
            label="Organisation size *"
            name="size"
            defaultValue=""
            required
            error={errors.size}
            options={opts(['Mid-market · 50–500 staff', 'Enterprise · 500–5,000 staff', 'Large enterprise · 5,000+ staff', 'Government / public sector'])}
          />
          <Field
            as="select"
            label="Identity provider"
            name="idp"
            defaultValue=""
            options={opts(['Microsoft Entra ID', 'Okta', 'Google Workspace', 'JumpCloud', 'Other SAML 2.0', 'Not sure'])}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">Area of interest *</legend>
        <div className="grid gap-[var(--sp-2)] sm:grid-cols-3">
          {CLUSTERS.map((c) => {
            const on = clusters.includes(c.value);
            return (
              <label
                key={c.value}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-2 rounded-[var(--r-lg)] border px-[var(--sp-4)] py-[var(--sp-3)] transition-colors',
                  on ? 'border-[var(--sg-blue)] bg-[var(--sg-blue-glow)]' : 'border-[var(--sg-border-md)] bg-[var(--sg-bg)] hover:border-[var(--sg-border-str)]',
                )}
              >
                <span className="flex items-center gap-[var(--sp-3)]">
                  <input type="checkbox" checked={on} onChange={() => toggle(c.value)} className="size-4 accent-[var(--sg-blue)]" />
                  <span className="font-sans text-[13px] font-medium text-[var(--sg-text-1)]">{c.label}</span>
                </span>
                {c.note && <span className="font-mono text-[10px] text-[var(--sg-text-4)]">{c.note}</span>}
              </label>
            );
          })}
        </div>
        {errors.clusters && <p className="mt-2 text-[12px] text-[var(--sg-danger)]">{errors.clusters}</p>}
      </fieldset>

      <fieldset className="space-y-[var(--sp-5)]">
        <legend className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">Your use case</legend>
        <Field
          as="textarea"
          label="Tell us about your use case *"
          name="usecase"
          rows={6}
          required
          error={errors.usecase}
          description="At least 30 characters. Please don't paste personal information."
        />
        <Field
          as="select"
          label="When do you need to be live?"
          name="timeline"
          defaultValue=""
          options={opts(['As soon as possible', 'Within 3 months', 'Within 6 months', 'No fixed date'])}
        />
      </fieldset>

      <div className="space-y-[var(--sp-3)]">
        <label className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
          <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[var(--sg-blue)]" />
          <span>
            I consent to sonofgraig processing this application under the{' '}
            <Link href="/privacy-policy" className="text-[var(--sg-blue)] hover:underline">privacy policy</Link>, in line with POPIA. I can withdraw consent at any time. *
            {errors.consent && <span className="mt-1 block text-[12px] text-[var(--sg-danger)]">Consent is required.</span>}
          </span>
        </label>
        <label className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-3)]">
          <input type="checkbox" name="nda" className="mt-1 size-4 accent-[var(--sg-blue)]" />
          <span>Please send a mutual NDA before the discovery call.</span>
        </label>
      </div>

      {siteKey && <Turnstile onToken={setToken} />}
      {status === 'error' && (
        <p role="alert" className="rounded-[var(--r-lg)] border border-[var(--sg-danger-bd)] bg-[var(--sg-danger-bg)] px-[var(--sp-4)] py-[var(--sp-3)] text-body text-[var(--sg-danger)]">
          {message}
        </p>
      )}
      <div className="flex flex-col-reverse items-start gap-[var(--sp-4)] sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--sg-text-4)]">
          <Lock size={12} aria-hidden="true" /> Sent over TLS · emailed to the founder via Resend
        </p>
        <Button type="submit" variant="primary" size="lg" className="rounded-full px-8" loading={status === 'sending'}>
          Submit application
        </Button>
      </div>
    </form>
  );
}
