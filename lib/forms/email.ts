// Resend client + the emails each form sends. The look lives in lib/email/
// (kit + templates); this file decides who gets what, and what it says.
// build*() are pure (no sending) so /email-preview can render them.

import { Resend } from 'resend';
import { esc, SITE } from '../email/kit';
import { customerReply, teamLead, type Rendered } from '../email/templates';
import type {
  EarlyAccessSubmission,
  ContactSubmission,
  WaitlistSubmission,
  ContactTopic,
} from './schemas';

let _resend: Resend | null = null;
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

// Resend's SDK returns { data, error } on failure rather than throwing. We
// must inspect both and re-throw so the form handler returns a 500 instead
// of silently 200-ing with no actual email sent.
async function sendOrThrow(
  resend: Resend,
  payload: Parameters<Resend['emails']['send']>[0],
  context: string,
): Promise<string | undefined> {
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    console.error(`[resend] ${context} failed`, {
      name: error.name,
      message: error.message,
      to: (payload as { to?: string | string[] }).to,
    });
    throw new Error(`resend ${context}: ${error.message ?? error.name}`);
  }
  return data?.id;
}

const FROM = process.env.RESEND_FROM_EMAIL ?? 'sonofgraig <noreply@sonofgraig.com>';

// ───────────────────────────────────────────────────────────────────────────
// Topic-based routing for contact form
// ───────────────────────────────────────────────────────────────────────────
// Topic value → (mailbox, human-readable label, autoreply tag)
const CONTACT_ROUTING: Record<
  ContactTopic,
  { to: string; cc?: string; label: string; tagline: string; replyWithin?: string }
> = {
  sales: { to: 'sales@sonofgraig.com', label: 'Sales — platform subscription', tagline: 'a real person from sales' },
  'service-rag': { to: 'sales@sonofgraig.com', label: 'Service — RAG Knowledge Base Setup', tagline: 'our services team' },
  'service-agent': { to: 'sales@sonofgraig.com', label: 'Service — AI Agent Implementation', tagline: 'our services team' },
  'service-cloud': { to: 'sales@sonofgraig.com', label: 'Service — Cloud Architecture Setup', tagline: 'our services team' },
  'service-popia': { to: 'sales@sonofgraig.com', label: 'Service — POPIA Audit', tagline: 'our services team' },
  'service-data': { to: 'sales@sonofgraig.com', label: 'Service — Data Analytics', tagline: 'our services team' },
  support: { to: 'info@sonofgraig.com', label: 'Existing-customer support', tagline: 'a real person from support' },
  popia: { to: 'tumiso@sonofgraig.com', label: 'POPIA / data subject request', tagline: 'the POPIA Information Officer (Tumiso)', replyWithin: '10 business days' },
  security: { to: 'tumiso@sonofgraig.com', label: 'Security disclosure', tagline: 'the founder personally', replyWithin: '1 business day' },
  partner: { to: 'sales@sonofgraig.com', cc: 'tumiso@sonofgraig.com', label: 'Partnership / reseller enquiry', tagline: 'the partnerships team' },
  press: { to: 'tumiso@sonofgraig.com', label: 'Press / analyst enquiry', tagline: 'the founder personally' },
  other: { to: 'info@sonofgraig.com', label: 'General enquiry', tagline: 'a real person' },
};

// ───────────────────────────────────────────────────────────────────────────
// Builders (pure) and senders
// ───────────────────────────────────────────────────────────────────────────

type Mail = Rendered & { to: string; cc?: string; replyTo?: string; subject: string };
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

export function buildEarlyAccess(s: EarlyAccessSubmission): { notification: Mail; autoReply: Mail } {
  const clusters = s.clusters.join(', ');
  const subject = `New early-access application — ${s.name} (${s.company})`;
  const notification: Mail = {
    to: 'info@sonofgraig.com',
    cc: 'tumiso@sonofgraig.com',
    replyTo: s.email,
    subject,
    ...teamLead({
      subject,
      preheader: `${s.name}, ${s.role} at ${s.company}, applied for early access.`,
      form: 'Early access',
      tags: [
        { label: s.sector },
        { label: s.size },
        ...(s.nda ? [{ label: 'NDA requested', tone: 'warn' as const }] : []),
      ],
      name: s.name,
      company: s.company,
      role: s.role,
      email: s.email,
      phone: s.phone || undefined,
      details: [
        ['Clusters', clusters],
        ['Timeline', s.timeline || 'Not specified'],
        ['Sector', s.sector],
        ['Organisation size', s.size],
        ['Identity provider', s.idp || 'Not specified'],
        ['NDA', s.nda ? 'Yes — send a mutual NDA before the call' : 'No'],
      ],
      message: { label: 'Use case', text: s.usecase },
    }),
  };

  const replySubject = 'Your sonofgraig early-access application is in';
  const autoReply: Mail = {
    to: s.email,
    subject: replySubject,
    ...customerReply({
      subject: replySubject,
      preheader: 'Tumiso reads every application personally and replies within 2 business days.',
      status: 'Application received',
      headline: `Thanks, ${firstName(s.name)}. You're on Tumiso's desk.`,
      intro: `Your application for early access to the <strong>AI Dev Platform</strong> for <strong>${esc(s.company)}</strong> is in. It goes to our founder, not a queue or a CRM bot.`,
      next: [
        { title: 'Read personally', body: 'Tumiso reviews your use case and the clusters you picked.' },
        { title: 'A reply within 2 business days', body: "Either a discovery-call slot, or honest feedback if it isn't the right fit. We don't ghost applications." },
        ...(s.nda ? [{ title: 'A mutual NDA first', body: 'You asked for one — it arrives before the discovery call.' }] : []),
        { title: "Straight talk on what's live", body: "If a cluster you chose is still planned, we'll say exactly what exists today." },
      ],
      summary: [
        ['Organisation', s.company],
        ['Your role', s.role],
        ['Clusters', clusters],
        ['Timeline', s.timeline || 'Not specified'],
      ],
      ctas: [
        { label: 'Read Insights while you wait', href: `${SITE}/blog` },
        { label: 'Explore the platform', href: `${SITE}/platform` },
      ],
      note: 'Anything time-sensitive? Reply to this email — it reaches a person.',
    }),
  };
  return { notification, autoReply };
}

// Topic-appropriate links for the auto-reply: a POPIA request or a security
// report gets the relevant policy page, not a marketing nudge.
function contactCtas(topic: ContactTopic): Array<{ label: string; href: string }> {
  if (topic === 'popia') return [{ label: 'Our POPIA commitments', href: `${SITE}/popia` }];
  if (topic === 'security') return [{ label: 'How we handle security', href: `${SITE}/security` }];
  if (topic === 'press') return [{ label: 'Press kit', href: `${SITE}/press` }];
  return [
    { label: 'Read Insights', href: `${SITE}/blog` },
    { label: 'See pricing', href: `${SITE}/pricing` },
  ];
}

export function buildContact(s: ContactSubmission): { notification: Mail; autoReply: Mail } {
  const route = CONTACT_ROUTING[s.topic];
  const within = route.replyWithin ?? '2 business days';
  const subject = `[${route.label}] ${s.name} (${s.company})`;
  const notification: Mail = {
    to: route.to,
    cc: route.cc,
    replyTo: s.email,
    subject,
    ...teamLead({
      subject,
      preheader: `${s.name} from ${s.company} — ${route.label}`,
      form: 'Contact',
      tags: [
        { label: route.label },
        ...(s.tier ? [{ label: s.tier }] : []),
        ...(s.newsletter ? [{ label: 'Wants Insights', tone: 'success' as const }] : []),
      ],
      name: s.name,
      company: s.company,
      email: s.email,
      phone: s.phone || undefined,
      details: [
        ['Topic', route.label],
        ['Company size', s.tier || 'Not specified'],
        ['Reply within', within],
        ['Newsletter', s.newsletter ? 'Yes (double opt-in sent)' : 'No'],
      ],
      message: { label: 'Message', text: s.message },
    }),
  };

  const replySubject = 'We received your sonofgraig enquiry';
  const autoReply: Mail = {
    to: s.email,
    subject: replySubject,
    ...customerReply({
      subject: replySubject,
      preheader: `${route.tagline} will reply within ${within}.`,
      status: 'Enquiry received',
      headline: `Thanks, ${firstName(s.name)}. We've got it.`,
      intro: `Your enquiry about <strong>${esc(route.label)}</strong> has gone to ${esc(route.tagline)}.`,
      next: [
        { title: 'Routed to the right person', body: `It's with ${route.tagline} — not a shared inbox.` },
        { title: `A reply within ${within}`, body: 'Business days are Monday to Friday, South African time.' },
        { title: 'Need it sooner?', body: 'Reply to this email. It lands in the same place.' },
      ],
      message: { label: 'Your message', text: s.message },
      ctas: contactCtas(s.topic),
      note: s.newsletter
        ? 'You also asked for sonofgraig Insights. Look out for a separate email asking you to confirm — nothing arrives until you do.'
        : undefined,
    }),
  };
  return { notification, autoReply };
}

export function buildWaitlist(s: WaitlistSubmission): { notification: Mail; autoReply: Mail } {
  const cluster = s.cluster ?? 'unspecified';
  const subject = `Waitlist — ${s.name} (${s.company}) — ${cluster}`;
  const notification: Mail = {
    to: 'info@sonofgraig.com',
    replyTo: s.email,
    subject,
    ...teamLead({
      subject,
      preheader: `Waitlist sign-up for ${cluster} from ${s.company}.`,
      form: 'Waitlist',
      tags: [{ label: cluster }],
      name: s.name,
      company: s.company,
      email: s.email,
      details: [
        ['Cluster', cluster],
        ['Company', s.company],
      ],
    }),
  };
  const replySubject = "You're on the sonofgraig waitlist";
  const autoReply: Mail = {
    to: s.email,
    subject: replySubject,
    ...customerReply({
      subject: replySubject,
      preheader: "We'll email you once, when access opens.",
      status: 'On the list',
      headline: `You're on the list, ${firstName(s.name)}.`,
      intro: `Thanks for joining the waitlist for <strong>${esc(cluster)}</strong>.`,
      next: [
        { title: 'One email when it opens', body: "No drip campaign in between — you'll hear from us when it's real." },
        { title: 'Early access first', body: 'Waitlisted teams are offered early access before public launch.' },
      ],
      ctas: [{ label: 'See the roadmap', href: `${SITE}/platform` }],
      note: 'Questions in the meantime? Just reply.',
    }),
  };
  return { notification, autoReply };
}

async function sendPair(pair: { notification: Mail; autoReply: Mail }, label: string) {
  const resend = getResend();
  return Promise.all([
    sendOrThrow(resend, { from: FROM, ...pair.notification }, `${label} notification`),
    sendOrThrow(resend, { from: FROM, ...pair.autoReply }, `${label} auto-reply`),
  ]);
}

export const sendEarlyAccessEmails = (s: EarlyAccessSubmission) => sendPair(buildEarlyAccess(s), 'early-access');
export const sendContactEmails = (s: ContactSubmission) => sendPair(buildContact(s), 'contact');
export const sendWaitlistEmails = (s: WaitlistSubmission) => sendPair(buildWaitlist(s), 'waitlist');
