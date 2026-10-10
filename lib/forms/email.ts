// Resend client + HTML email templates.
// Templates use inline styles — email clients strip <style> and external CSS.

import { Resend } from 'resend';
import { SOCIAL_PROFILES } from '../social';
import type {
  EarlyAccessSubmission,
  ContactSubmission,
  WaitlistSubmission,
  ContactTopic,
} from './schemas';

// Brand palette — must stay in sync with app/globals.css `--sg-*` tokens.
const SG_BLUE = '#0B9EDE';
const SG_BLUE_DEEP = '#065A82';
const SG_INK = '#0D1117';
const SG_TEXT = '#1F2937';
const SG_TEXT_MUTED_DARK = '#374151';
const SG_BORDER = '#E5E7EB';
const SG_MUTED = '#6B7280';
const SG_BG_SOFT = '#FAFBFC';

// Public contact + identity surfaces used in every signature & footer.
const ORG_LEGAL_NAME = 'sonofgraig Digital Solutions (Pty) Ltd';
const ORG_ADDRESS = '9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga 1022, South Africa';
const ORG_PHONE_DISPLAY = '+27 69 686 6024';
const ORG_PHONE_TEL = '+27696866024';
const SOCIAL_LINKS = SOCIAL_PROFILES.filter((p) => ['LinkedIn', 'Instagram', 'Facebook', 'GitHub'].includes(p.label));

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
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeMultiline(input: string): string {
  return escapeHtml(input).replace(/\n/g, '<br/>');
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;color:${SG_MUTED};font-size:13px;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:${SG_TEXT};font-size:14px;">${escapeHtml(value)}</td>
    </tr>
  `;
}

// ───────────────────────────────────────────────────────────────────────────
// Signature, disclaimer, social block — reusable across templates
// ───────────────────────────────────────────────────────────────────────────

function signatureBlock({
  name = 'Tumiso Graig Ramaboya',
  title = 'Founder, CEO &amp; POPIA Information Officer',
  brand = 'sonofgraig',
}: { name?: string; title?: string; brand?: string } = {}): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;border-top:1px solid ${SG_BORDER};padding-top:20px;">
      <tr>
        <td style="vertical-align:top;padding-right:16px;width:64px;">
          <img src="${SITE_URL}/email-logo" alt="" width="56" height="50" style="display:block;border:0;outline:none;text-decoration:none;" />
        </td>
        <td style="vertical-align:top;">
          <div style="font-size:15px;font-weight:700;color:${SG_INK};letter-spacing:-0.01em;">${escapeHtml(name)}</div>
          <div style="font-size:13px;color:${SG_TEXT_MUTED_DARK};line-height:1.5;margin-top:2px;">${title}</div>
          <div style="font-size:13px;color:${SG_MUTED};margin-top:6px;line-height:1.5;">${escapeHtml(brand)} &middot; <a href="${SITE_URL}" style="color:${SG_BLUE};text-decoration:none;">sonofgraig.com</a></div>
          <div style="font-size:13px;color:${SG_MUTED};line-height:1.5;">
            <a href="tel:${ORG_PHONE_TEL}" style="color:${SG_MUTED};text-decoration:none;">${ORG_PHONE_DISPLAY}</a>
            &middot;
            <a href="mailto:tumiso@sonofgraig.com" style="color:${SG_BLUE};text-decoration:none;">tumiso@sonofgraig.com</a>
          </div>
        </td>
      </tr>
    </table>
  `;
}

function socialBlock(): string {
  const items = SOCIAL_LINKS.map(
    ({ label, url }) =>
      `<a href="${url}" style="color:${SG_BLUE};text-decoration:none;font-size:12px;font-weight:600;padding:0 8px;">${label}</a>`,
  ).join('<span style="color:#D1D5DB;">|</span>');
  return `<div style="text-align:center;padding:14px 0 6px;">${items}</div>`;
}

function disclaimerBlock(): string {
  return `
    <div style="margin-top:18px;padding-top:16px;border-top:1px solid ${SG_BORDER};color:${SG_MUTED};font-size:11px;line-height:1.55;">
      <p style="margin:0 0 8px;"><strong style="color:${SG_TEXT_MUTED_DARK};">Confidentiality.</strong> This email and any attachments may contain confidential information intended solely for the recipient. If you have received this in error, delete the message and notify
      <a href="mailto:tumiso@sonofgraig.com" style="color:${SG_BLUE};text-decoration:none;">tumiso@sonofgraig.com</a>.
      Onward distribution, copying or use without permission is prohibited.</p>
      <p style="margin:0 0 8px;"><strong style="color:${SG_TEXT_MUTED_DARK};">POPIA.</strong> ${escapeHtml(ORG_LEGAL_NAME)} processes personal information in accordance with the Protection of Personal Information Act, 2013 (Act No. 4 of 2013). Information Officer: Tumiso Graig Ramaboya. Data-subject requests:
      <a href="mailto:tumiso@sonofgraig.com" style="color:${SG_BLUE};text-decoration:none;">tumiso@sonofgraig.com</a>.</p>
      <p style="margin:0;color:${SG_MUTED};">${escapeHtml(ORG_LEGAL_NAME)} &middot; ${escapeHtml(ORG_ADDRESS)}</p>
    </div>
  `;
}

function shell({
  title,
  body,
  preheader,
  showHero = true,
  topic = 'default',
}: {
  title: string;
  body: string;
  preheader: string;
  showHero?: boolean;
  /** Selects per-inquiry banner art. See app/email-banner/route.tsx TOPIC_CONFIG. */
  topic?: string;
}): string {
  // Banner image — 600x200 PNG generated dynamically by /email-banner with
  // per-topic accent stripe + headline. Email clients fetch and cache by URL,
  // so each topic key is effectively a separate cached asset.
  const bannerUrl = `${SITE_URL}/email-banner?topic=${encodeURIComponent(topic)}`;
  const heroRow = showHero
    ? `
        <tr><td style="padding:0;background:${SG_INK};">
          <img src="${bannerUrl}" alt="sonofgraig &mdash; Enterprise software. African-engineered. Globally deployed." width="600" height="200" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;" />
        </td></tr>
      `
    : '';

  return `<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="light only"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#F4F4F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${SG_TEXT};-webkit-font-smoothing:antialiased;">
  <span style="display:none;color:transparent;height:0;overflow:hidden;font-size:0;line-height:0;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F4F4F7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#FFFFFF;border:1px solid ${SG_BORDER};border-radius:14px;overflow:hidden;max-width:600px;box-shadow:0 1px 3px rgba(13,17,23,0.05);">

        <!-- HEADER STRIP -->
        <tr><td style="background:${SG_INK};padding:16px 28px;color:#FFFFFF;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="vertical-align:middle;width:48px;padding-right:12px;">
                <img src="${SITE_URL}/email-logo" alt="sonofgraig" width="36" height="32" style="display:block;border:0;outline:none;text-decoration:none;" />
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:17px;font-weight:700;letter-spacing:-0.015em;color:#FFFFFF;">sonofgraig</span>
              </td>
              <td style="vertical-align:middle;text-align:right;font-size:11px;color:#9CA3AF;letter-spacing:0.04em;text-transform:uppercase;font-weight:600;">
                Enterprise Software &middot; ZA
              </td>
            </tr>
          </table>
        </td></tr>

        ${heroRow}

        <!-- BODY -->
        <tr><td style="padding:34px 28px 24px;">
          ${body}
          ${signatureBlock()}
        </td></tr>

        <!-- SOCIAL -->
        <tr><td style="background:${SG_BG_SOFT};border-top:1px solid ${SG_BORDER};padding:6px 28px;">
          ${socialBlock()}
        </td></tr>

        <!-- DISCLAIMER -->
        <tr><td style="background:${SG_BG_SOFT};padding:0 28px 22px;">
          ${disclaimerBlock()}
        </td></tr>

      </table>
      <div style="font-size:11px;color:${SG_MUTED};margin-top:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        You received this because a form was submitted on sonofgraig.com &middot; <a href="${SITE_URL}/privacy-policy" style="color:${SG_MUTED};">Privacy Policy</a>
      </div>
    </td></tr>
  </table>
</body></html>`;
}

interface NotificationArgs {
  to: string;
  cc?: string;
  replyTo: string;
  subject: string;
  preheader: string;
  heading: string;
  fields: Array<[label: string, value: string]>;
  multilineFields?: Array<[label: string, value: string]>;
  topic?: string;
}

function buildNotification({
  to,
  cc,
  replyTo,
  subject,
  preheader,
  heading,
  fields,
  multilineFields,
  topic,
}: NotificationArgs) {
  const rows = fields.map(([l, v]) => row(l, v)).join('');
  const multiline = (multilineFields ?? [])
    .map(
      ([l, v]) => `
    <div style="margin-top:24px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:${SG_MUTED};font-weight:600;margin-bottom:6px;">${escapeHtml(l)}</div>
      <div style="font-size:14px;color:${SG_TEXT};line-height:1.6;background:#FAFBFC;border:1px solid ${SG_BORDER};border-radius:8px;padding:14px;">${escapeMultiline(v)}</div>
    </div>`,
    )
    .join('');

  const html = shell({
    title: subject,
    preheader,
    topic,
    body: `
      <div style="margin-bottom:8px;display:inline-block;background:${SG_BLUE}1A;color:${SG_BLUE_DEEP};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">New submission</div>
      <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:${SG_INK};letter-spacing:-0.025em;line-height:1.25;">${escapeHtml(heading)}</h1>
      <p style="margin:0 0 26px;color:${SG_MUTED};font-size:13px;">Submitted ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg', dateStyle: 'long', timeStyle: 'short' })} SAST</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${SG_BG_SOFT};border:1px solid ${SG_BORDER};border-radius:10px;padding:14px 18px;">
        ${rows}
      </table>
      ${multiline}
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
        <tr>
          <td style="background:${SG_BLUE};border-radius:9px;">
            <a href="mailto:${escapeHtml(replyTo)}" style="display:inline-block;color:#FFFFFF;text-decoration:none;padding:11px 22px;font-weight:600;font-size:14px;letter-spacing:0.01em;">Reply to submitter &rarr;</a>
          </td>
        </tr>
      </table>
    `,
  });

  return { to, cc, replyTo, subject, html };
}

interface AutoReplyArgs {
  to: string;
  subject: string;
  preheader: string;
  heading: string;
  body: string;
  topic?: string;
}

function buildAutoReply({
  to,
  subject,
  preheader,
  heading,
  body,
  topic,
}: AutoReplyArgs) {
  // shell() now appends the founder signature block automatically — the body
  // here is just the personal message; no manual sign-off needed.
  const html = shell({
    title: subject,
    preheader,
    topic,
    body: `
      <h1 style="margin:0 0 18px;font-size:24px;font-weight:700;color:${SG_INK};letter-spacing:-0.025em;line-height:1.25;">${escapeHtml(heading)}</h1>
      <div style="font-size:15.5px;line-height:1.75;color:${SG_TEXT};">${escapeMultiline(body)}</div>
    `,
  });
  return { to, subject, html };
}

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
// Senders
// ───────────────────────────────────────────────────────────────────────────

export async function sendEarlyAccessEmails(s: EarlyAccessSubmission) {
  const resend = getResend();

  const clusters = s.clusters.join(', ');
  const fields: Array<[string, string]> = [
    ['Name', s.name],
    ['Role', s.role],
    ['Email', s.email],
    ['Phone', s.phone || '(not provided)'],
    ['Organisation', s.company],
    ['Sector', s.sector],
    ['Size', s.size],
    ['Identity provider', s.idp || '(not specified)'],
    ['Clusters of interest', clusters],
    ['Timeline', s.timeline || '(not specified)'],
    ['NDA requested', s.nda ? 'Yes — send mutual NDA before discovery call' : 'No'],
  ];

  const notification = buildNotification({
    to: 'info@sonofgraig.com',
    cc: 'tumiso@sonofgraig.com',
    replyTo: s.email,
    subject: `🚀 Early Access — ${s.name} (${s.company})`,
    preheader: `${s.name} from ${s.company} just applied for early access.`,
    heading: 'New early-access application',
    fields,
    multilineFields: [['Use case', s.usecase]],
    topic: 'early-access',
  });

  const ndaLine = s.nda
    ? '\n\nYou ticked the NDA box — we will send a mutual NDA before the discovery call. Allow about an hour for it to land.'
    : '';

  const autoReply = buildAutoReply({
    to: s.email,
    subject: 'We received your sonofgraig early-access application',
    preheader:
      "Thanks — Tumiso will respond personally within 2 business days.",
    heading: `Thanks, ${s.name.split(' ')[0]}.`,
    topic: 'early-access',
    body: `Your application for early access to the sonofgraig AI Dev Platform is in.

Here's what happens next:

• Tumiso (founder) reviews your application personally — not a queue, not a CRM bot.
• You'll hear back within 2 business days from Pretoria with either a discovery-call slot or honest feedback if the programme isn't the right fit. We don't ghost applications.
• If your cluster of interest is still planned, we'll be straight about what exists today and what doesn't.${ndaLine}

If anything is time-sensitive, reply directly to this email — it lands in front of a real person.`,
  });

  return Promise.all([
    sendOrThrow(resend, { from: FROM, ...notification }, 'early-access notification'),
    sendOrThrow(resend, { from: FROM, ...autoReply }, 'early-access auto-reply'),
  ]);
}

export async function sendContactEmails(s: ContactSubmission) {
  const resend = getResend();
  const route = CONTACT_ROUTING[s.topic];

  const fields: Array<[string, string]> = [
    ['Name', s.name],
    ['Company', s.company],
    ['Email', s.email],
    ['Phone', s.phone || '(not provided)'],
    ['Topic', route.label],
    ['Company size', s.tier || '(not specified)'],
    ['Newsletter signup', s.newsletter ? 'Yes' : 'No'],
  ];

  const notification = buildNotification({
    to: route.to,
    cc: route.cc,
    replyTo: s.email,
    subject: `[${route.label}] ${s.name} (${s.company})`,
    preheader: `${s.name} from ${s.company} — ${route.label}`,
    heading: 'New enquiry',
    fields,
    multilineFields: [['Message', s.message]],
    topic: s.topic,
  });

  const autoReply = buildAutoReply({
    to: s.email,
    subject: 'We received your sonofgraig enquiry',
    preheader: `${route.tagline} will respond within ${route.replyWithin ?? '2 business days'}.`,
    heading: `Thanks, ${s.name.split(' ')[0]}.`,
    topic: s.topic,
    body: `Your enquiry — "${route.label}" — has been routed to ${route.tagline}. You'll hear back within ${route.replyWithin ?? '2 business days'} from Pretoria.

If anything is urgent, reply directly to this email.`,
  });

  return Promise.all([
    sendOrThrow(resend, { from: FROM, ...notification }, 'contact notification'),
    sendOrThrow(resend, { from: FROM, ...autoReply }, 'contact auto-reply'),
  ]);
}

export async function sendWaitlistEmails(s: WaitlistSubmission) {
  const resend = getResend();
  const clusterLabel = s.cluster ?? 'unspecified';

  const notification = buildNotification({
    to: 'info@sonofgraig.com',
    replyTo: s.email,
    subject: `Waitlist — ${s.name} (${s.company}) — ${clusterLabel}`,
    preheader: `Waitlist signup for ${clusterLabel} from ${s.company}.`,
    heading: 'New waitlist signup',
    fields: [
      ['Name', s.name],
      ['Email', s.email],
      ['Company', s.company],
      ['Cluster', clusterLabel],
    ],
    topic: 'waitlist',
  });

  const autoReply = buildAutoReply({
    to: s.email,
    subject: "You're on the sonofgraig waitlist",
    preheader: "We'll email you when access opens.",
    heading: `You're on the list, ${s.name.split(' ')[0]}.`,
    topic: 'waitlist',
    body: `Thanks for joining the sonofgraig waitlist for ${clusterLabel}.

We'll email you when access opens. Reply directly to this email if anything is urgent.`,
  });

  return Promise.all([
    sendOrThrow(resend, { from: FROM, ...notification }, 'waitlist notification'),
    sendOrThrow(resend, { from: FROM, ...autoReply }, 'waitlist auto-reply'),
  ]);
}
