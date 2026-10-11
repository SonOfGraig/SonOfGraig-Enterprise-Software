// The two email shapes every form sends, built from lib/email/kit.ts:
//   customerReply — what the visitor receives (reassurance + next steps)
//   teamLead      — the lead card the team receives (act on it in one tap)
// Each returns { html, text }: the plain-text part helps deliverability and is
// what some clients (and screen readers) show.

import { C, LEGAL, SITE, button, chip, esc, facts, h1, layout, lead, p, quote, sectionLabel, signature, socialLinks, steps } from './kit';

export type Rendered = { html: string; text: string };

type Step = { title: string; body: string };
type Cta = { label: string; href: string };

export function customerReply(a: {
  subject: string;
  preheader: string;
  status: string;
  headline: string;
  intro: string; // trusted HTML (callers escape user values)
  next: Step[];
  summary?: Array<[string, string]>;
  message?: { label: string; text: string };
  ctas?: Cta[];
  note?: string; // trusted HTML
}): Rendered {
  const body = `
    ${chip(a.status, 'success')}
    ${h1(esc(a.headline))}
    ${lead(a.intro)}
    ${sectionLabel('What happens next')}
    ${steps(a.next.map((s) => ({ title: s.title, body: esc(s.body) })))}
    ${a.summary?.length ? `${sectionLabel('What you sent us')}${facts(a.summary)}` : ''}
    ${a.message ? quote(a.message.label, a.message.text) : ''}
    ${a.ctas?.length ? `<div style="margin-top:28px;">${a.ctas.map((c, i) => button(c.label, c.href, i ? 'glass' : 'primary')).join('')}</div>` : ''}
    ${a.note ? `<div style="margin-top:18px;">${p(a.note, `font-size:14px;color:${C.muted};`)}</div>` : ''}
    ${signature()}
  `;
  const footer = `
    ${socialLinks()}<br/><br/>
    You're getting this one-off reply because you used a form on <a href="${SITE}" style="color:${C.muted};">sonofgraig.com</a>. It doesn't add you to any mailing list.<br/>
    We handle your details under POPIA &middot; <a href="${SITE}/privacy-policy" style="color:${C.muted};">Privacy policy</a><br/>
    ${LEGAL}`;
  const html = layout({ title: a.subject, preheader: a.preheader, body, footer });

  const text = [
    a.headline,
    '',
    stripTags(a.intro),
    '',
    'WHAT HAPPENS NEXT',
    ...a.next.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`),
    ...(a.summary?.length ? ['', 'WHAT YOU SENT US', ...a.summary.map(([k, v]) => `${k}: ${v}`)] : []),
    ...(a.message ? ['', a.message.label.toUpperCase(), a.message.text] : []),
    ...(a.ctas?.length ? ['', ...a.ctas.map((c) => `${c.label}: ${c.href}`)] : []),
    ...(a.note ? ['', stripTags(a.note)] : []),
    '',
    '— Tumiso Graig Ramaboya, Founder & CEO, sonofgraig',
    'tumiso@sonofgraig.com · https://sonofgraig.com',
  ].join('\n');
  return { html, text };
}

/** South African numbers → wa.me form (27…), or null if it doesn't look like a phone. */
function whatsapp(phone: string): string | null {
  const d = phone.replace(/[^\d+]/g, '');
  if (d.length < 9) return null;
  const n = d.startsWith('+') ? d.slice(1) : d.startsWith('0') ? `27${d.slice(1)}` : d;
  return /^\d{10,15}$/.test(n) ? `https://wa.me/${n}` : null;
}

export function teamLead(a: {
  subject: string;
  preheader: string;
  form: string; // "Early access", "Contact", "Waitlist"
  tags: Array<{ label: string; tone?: 'blue' | 'neutral' | 'success' | 'warn' }>;
  name: string;
  company: string;
  role?: string;
  email: string;
  phone?: string;
  details: Array<[string, string]>;
  message?: { label: string; text: string };
}): Rendered {
  const first = a.name.split(' ')[0] || a.name;
  const when = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg', dateStyle: 'medium', timeStyle: 'short' });
  const wa = a.phone ? whatsapp(a.phone) : null;
  const reply = `mailto:${a.email}?subject=${encodeURIComponent(`Re: ${a.subject.replace(/^[^\w]*\s*/, '')}`)}`;
  const body = `
    <div>${chip(`New lead · ${a.form}`, 'blue')}${a.tags.map((t) => chip(t.label, t.tone ?? 'neutral')).join('')}</div>
    ${h1(`${esc(a.name)} <span style="color:${C.muted};font-weight:700;">&middot; ${esc(a.company)}</span>`)}
    ${lead(`${a.role ? `${esc(a.role)} &middot; ` : ''}<a href="mailto:${esc(a.email)}" style="color:${C.blue};text-decoration:none;">${esc(a.email)}</a>${a.phone ? ` &middot; ${esc(a.phone)}` : ''}<br/><span style="font-size:13px;color:${C.faint};">Submitted ${esc(when)} SAST</span>`)}
    <div style="margin:-6px 0 6px;">
      ${button(`Reply to ${first}`, reply)}
      ${a.phone ? button('Call', `tel:${a.phone.replace(/[^\d+]/g, '')}`, 'glass') : ''}
      ${wa ? button('WhatsApp', wa, 'glass') : ''}
    </div>
    ${sectionLabel('Details')}
    ${facts(a.details)}
    ${a.message ? quote(a.message.label, a.message.text) : ''}
  `;
  const footer = `Lead from the ${esc(a.form.toLowerCase())} form on sonofgraig.com &middot; replying goes straight to ${esc(a.email)}<br/>${LEGAL}`;
  const html = layout({ title: a.subject, preheader: a.preheader, body, footer });
  const text = [
    `New lead · ${a.form} — ${a.name} (${a.company})`,
    `${a.email}${a.phone ? ` · ${a.phone}` : ''}`,
    `Submitted ${when} SAST`,
    '',
    ...a.details.map(([k, v]) => `${k}: ${v}`),
    ...(a.message ? ['', a.message.label.toUpperCase(), a.message.text] : []),
  ].join('\n');
  return { html, text };
}

function stripTags(html: string) {
  return html
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/&rarr;/g, '→')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
