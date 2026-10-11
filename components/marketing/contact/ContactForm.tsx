'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Turnstile } from '@/components/ui/Turnstile';
import { FormSuccess } from '@/components/marketing/forms/FormSuccess';
// Type-only import: the schemas module pulls in zod, which must not ship to
// the browser. The server re-validates every value anyway.
import type { ContactTopic } from '@/lib/forms/schemas';
import { issueMessage } from '@/lib/forms/issueMessage';

// Posts to /api/forms/contact (lib/forms/schemas.ts → contactSchema). Field
// names match the schema exactly; server validation is the authority and its
// per-field issues are shown inline. Honeypot `hp` + Turnstile kept.

const TOPICS: { value: ContactTopic; label: string }[] = [
  { value: 'sales', label: 'Sales — platform or early access' },
  { value: 'service-rag', label: 'Service — RAG Knowledge Base Setup' },
  { value: 'service-agent', label: 'Service — AI Agent Implementation' },
  { value: 'service-cloud', label: 'Service — Cloud Architecture & DevOps' },
  { value: 'service-popia', label: 'Service — AI Governance & Ethics Audit' },
  { value: 'service-data', label: 'Service — Data & analytics' },
  { value: 'support', label: 'Existing-customer support' },
  { value: 'popia', label: 'POPIA / data subject request' },
  { value: 'security', label: 'Security disclosure' },
  { value: 'partner', label: 'Partnership / reseller' },
  { value: 'press', label: 'Press / analyst enquiry' },
  { value: 'other', label: 'Something else' },
];

// ?service=<slug> from a service page, ?interest=<cluster> from a planned cluster.
const SERVICE_TOPIC: Record<string, ContactTopic> = {
  'ai-agent-implementation': 'service-agent',
  'rag-knowledge-base-setup': 'service-rag',
  'cloud-architecture': 'service-cloud',
  'ai-governance-audit': 'service-popia',
};

type Errors = Partial<Record<string, string>>;

export function ContactForm() {
  const [topic, setTopic] = useState<ContactTopic | ''>('');
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState<{ email: string; topic: ContactTopic; newsletter: boolean } | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const svc = q.get('service');
    if (svc && SERVICE_TOPIC[svc]) setTopic(SERVICE_TOPIC[svc]);
    else if (q.get('interest')) setTopic('sales');
    const t = q.get('topic');
    if (t && TOPICS.some((x) => x.value === t)) setTopic(t as ContactTopic);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get('name') ?? ''),
      company: String(fd.get('company') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      topic: String(fd.get('topic') ?? ''),
      tier: String(fd.get('tier') ?? ''),
      message: String(fd.get('message') ?? ''),
      consent: fd.get('consent') === 'on',
      newsletter: fd.get('newsletter') === 'on',
      hp: String(fd.get('hp') ?? ''),
      turnstileToken: token ?? undefined,
    };
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/forms/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSent({ email: body.email, topic: body.topic as ContactTopic, newsletter: body.newsletter });
        setStatus('sent');
        return;
      }
      if (data.error === 'validation' && data.issues) {
        const next: Errors = {};
        for (const [k, v] of Object.entries(data.issues as Record<string, string[]>)) next[k] = v?.[0];
        setErrors(next);
        setMessage(issueMessage(data.issues, ['name', 'company', 'email', 'phone', 'topic', 'tier', 'message', 'consent', 'newsletter'], 'info@sonofgraig.com'));
      } else if (res.status === 429) {
        setMessage('Too many messages from this connection. Please wait a few minutes, or email info@sonofgraig.com.');
      } else if (String(data.error ?? '').startsWith('turnstile')) {
        setMessage('The spam check did not complete. Please try again.');
      } else {
        setMessage('Something went wrong sending your message. Please email info@sonofgraig.com directly.');
      }
      setStatus('error');
    } catch {
      setMessage('Could not reach the server. Please check your connection, or email info@sonofgraig.com.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    // Same promises as the confirmation email (lib/forms/email.ts CONTACT_ROUTING).
    const within = sent?.topic === 'popia' ? '10 business days' : sent?.topic === 'security' ? '1 business day' : '2 business days';
    const label = TOPICS.find((t) => t.value === sent?.topic)?.label ?? 'your enquiry';
    return (
      <FormSuccess
        status="Enquiry received"
        title="Thanks — we've got it."
        body={`Your message about “${label}” has gone straight to the right person on the team.`}
        steps={[
          { title: 'Routed to the right person', body: 'Not a shared inbox, and not a bot.' },
          { title: `A reply within ${within}`, body: 'Business days are Monday to Friday, South African time.' },
          sent?.newsletter
            ? { title: 'Confirm your Insights subscription', body: 'A separate email asks you to confirm. Nothing arrives until you do.' }
            : { title: 'Need it sooner?', body: 'Reply to the confirmation email — it lands in the same place.' },
        ]}
        email={sent?.email}
        actions={[
          { label: 'Read Insights', href: '/blog' },
          { label: 'Back to home', href: '/' },
        ]}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-[var(--sp-5)]">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="grid gap-[var(--sp-5)] sm:grid-cols-2">
        <Field label="Full name *" name="name" autoComplete="name" required error={errors.name} />
        <Field label="Company *" name="company" autoComplete="organization" required error={errors.company} />
        <Field label="Work email *" name="email" type="email" autoComplete="email" required error={errors.email} description="So we can reply." />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" error={errors.phone} description="Only if you want a call back." />
      </div>
      <div className="grid gap-[var(--sp-5)] sm:grid-cols-2">
        <Field
          as="select"
          label="What is this about? *"
          name="topic"
          required
          value={topic}
          onChange={(e) => setTopic(e.target.value as ContactTopic)}
          error={errors.topic}
          options={TOPICS}
        />
        <Field
          as="select"
          label="Company size (optional)"
          name="tier"
          defaultValue=""
          options={[
            { value: 'startup', label: 'Startup · under 50 staff' },
            { value: 'mid', label: 'Mid-market · 50–500 staff' },
            { value: 'enterprise', label: 'Enterprise · 500–5,000 staff' },
            { value: 'large', label: 'Large enterprise · 5,000+ staff' },
            { value: 'public', label: 'Government / public sector' },
          ]}
        />
      </div>
      <Field
        as="textarea"
        label="Tell us what you need *"
        name="message"
        rows={6}
        required
        error={errors.message}
        description="At least 30 characters. Please don't paste personal information — for POPIA-sensitive matters email tumiso@sonofgraig.com."
      />
      <label className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-2)]">
        <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[var(--sg-blue)]" />
        <span>
          I consent to sonofgraig processing this enquiry under the{' '}
          <Link href="/privacy-policy" className="text-[var(--sg-blue)] hover:underline">privacy policy</Link>, in line with POPIA. I can withdraw consent at any time by emailing the Information Officer. *
          {errors.consent && <span className="mt-1 block text-[12px] text-[var(--sg-danger)]">Consent is required to send this message.</span>}
        </span>
      </label>
      <label className="flex items-start gap-[var(--sp-3)] text-body text-[var(--sg-text-3)]">
        <input type="checkbox" name="newsletter" className="mt-1 size-4 accent-[var(--sg-blue)]" />
        <span>Send me the Insights newsletter — technical guides on POPIA and enterprise AI. Unsubscribe with one click.</span>
      </label>
      {siteKey && <Turnstile onToken={setToken} />}
      {status === 'error' && (
        <p role="alert" className="rounded-[var(--r-lg)] border border-[var(--sg-danger-bd)] bg-[var(--sg-danger-bg)] px-[var(--sp-4)] py-[var(--sp-3)] text-body text-[var(--sg-danger)]">
          {message}
        </p>
      )}
      <div className="flex flex-col-reverse items-start gap-[var(--sp-4)] pt-[var(--sp-2)] sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--sg-text-4)]">
          <Lock size={12} aria-hidden="true" /> Sent over TLS · emailed to our team via Resend
        </p>
        <Button type="submit" variant="primary" size="lg" className="rounded-full px-8" loading={status === 'sending'}>
          Send message
        </Button>
      </div>
    </form>
  );
}
