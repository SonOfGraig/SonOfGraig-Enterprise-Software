// sonofgraig email kit — the v4 "liquid glass" look, translated to what email
// clients actually render.
//
// Real glass (backdrop-filter blur) does not exist in email: Gmail, Outlook and
// Apple Mail all strip it. What carries the look instead:
//   • a soft brand gradient backdrop (bgcolor fallback for Outlook),
//   • a frosted-white card: translucent white over that gradient, a bright 1px
//     rim, a big soft blue-tinted shadow and 24px radius,
//   • glass "chips" and pill buttons with a blue gradient.
// Every rgba/gradient is declared AFTER a solid fallback, so clients that
// don't support it (Outlook desktop) get clean white cards and solid blue.
//
// Inline styles only — clients strip <style> blocks (the one <style> here is
// progressive: mobile padding and the web font, nothing depends on it).

import { SOCIAL_PROFILES } from '../social';

export const C = {
  blue: '#0B9EDE',
  blueDeep: '#065A82',
  blueBright: '#0EA5E9',
  ink: '#0D1117',
  text: '#1F2937',
  text2: '#374151',
  muted: '#6B7280',
  faint: '#9CA3AF',
  border: '#E5E7EB',
  rim: '#DCE7F2',
  tint: '#F3F8FD',
  success: '#16A34A',
};

const FONT_BODY = `Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`;
const FONT_DISPLAY = `Manrope,Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`;

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.APP_URL ?? 'https://sonofgraig.com';

export function esc(input: string): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const escLines = (s: string) => esc(s).replace(/\n/g, '<br/>');

// ── atoms ──────────────────────────────────────────────────────────────────

/** Small glass pill: eyebrow labels and tags. tone=blue|neutral|success|warn */
export function chip(label: string, tone: 'blue' | 'neutral' | 'success' | 'warn' = 'blue'): string {
  const t = {
    blue: ['#E6F4FC', 'rgba(11,158,222,0.10)', C.blueDeep, 'rgba(11,158,222,0.28)'],
    neutral: ['#F3F4F6', 'rgba(255,255,255,0.75)', C.text2, 'rgba(13,17,23,0.10)'],
    success: ['#E8F7EE', 'rgba(22,163,74,0.10)', '#15803D', 'rgba(22,163,74,0.28)'],
    warn: ['#FEF3E2', 'rgba(249,115,22,0.10)', '#B45309', 'rgba(249,115,22,0.30)'],
  }[tone];
  return `<span style="display:inline-block;background-color:${t[0]};background-color:${t[1]};color:${t[2]};border:1px solid ${t[3]};font-family:${FONT_BODY};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;line-height:1;padding:6px 11px;border-radius:999px;margin:0 6px 6px 0;">${esc(label)}</span>`;
}

/** Bulletproof pill button. variant=primary (blue gradient) | glass (outline). */
export function button(label: string, href: string, variant: 'primary' | 'glass' = 'primary'): string {
  if (variant === 'glass') {
    return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-table;margin:0 8px 8px 0;"><tr><td style="border-radius:999px;background-color:#FFFFFF;background-color:rgba(255,255,255,0.7);border:1px solid ${C.rim};">
      <a href="${esc(href)}" style="display:inline-block;padding:11px 20px;font-family:${FONT_BODY};font-size:14px;font-weight:600;color:${C.blueDeep};text-decoration:none;border-radius:999px;">${esc(label)}</a>
    </td></tr></table>`;
  }
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-table;margin:0 8px 8px 0;"><tr><td bgcolor="${C.blue}" style="border-radius:999px;background-color:${C.blue};background-image:linear-gradient(135deg,${C.blueBright} 0%,#0B78DE 100%);box-shadow:0 8px 20px -8px rgba(11,120,222,0.55);">
    <a href="${esc(href)}" style="display:inline-block;padding:12px 24px;font-family:${FONT_BODY};font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:999px;">${esc(label)}&nbsp;&rarr;</a>
  </td></tr></table>`;
}

export function h1(text: string): string {
  return `<h1 style="margin:14px 0 10px;font-family:${FONT_DISPLAY};font-size:28px;line-height:1.18;font-weight:800;letter-spacing:-0.03em;color:${C.ink};">${text}</h1>`;
}

export function lead(html: string): string {
  return `<p style="margin:0 0 24px;font-family:${FONT_BODY};font-size:16px;line-height:1.7;color:${C.text2};">${html}</p>`;
}

export function p(html: string, extra = ''): string {
  return `<p style="margin:0 0 14px;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${C.text};${extra}">${html}</p>`;
}

export function sectionLabel(text: string): string {
  return `<div style="margin:30px 0 12px;font-family:${FONT_BODY};font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:${C.muted};">${esc(text)}</div>`;
}

/** An inset glass panel inside the main card. */
export function panel(inner: string, pad = '18px 20px'): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;"><tr><td style="background-color:${C.tint};background-image:linear-gradient(180deg,#F7FBFE 0%,#EFF6FC 100%);border:1px solid ${C.rim};border-radius:16px;padding:${pad};">${inner}</td></tr></table>`;
}

/** Numbered "what happens next" steps. */
export function steps(items: Array<{ title: string; body: string }>): string {
  const rows = items
    .map(
      (s, i) => `<tr>
      <td style="width:40px;vertical-align:top;padding:0 0 ${i === items.length - 1 ? 0 : 18}px;">
        <div style="width:28px;height:28px;line-height:28px;text-align:center;border-radius:999px;background-color:${C.blue};background-image:linear-gradient(135deg,${C.blueBright},#0B78DE);color:#FFFFFF;font-family:${FONT_DISPLAY};font-size:13px;font-weight:800;">${i + 1}</div>
      </td>
      <td style="vertical-align:top;padding:3px 0 ${i === items.length - 1 ? 0 : 18}px;">
        <div style="font-family:${FONT_BODY};font-size:15px;font-weight:600;color:${C.ink};line-height:1.4;">${esc(s.title)}</div>
        <div style="font-family:${FONT_BODY};font-size:14px;color:${C.muted};line-height:1.6;margin-top:3px;">${s.body}</div>
      </td>
    </tr>`,
    )
    .join('');
  return panel(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows}</table>`, '20px 20px');
}

/** Label/value facts in two columns (stacks on mobile clients that honour the media query). */
export function facts(items: Array<[string, string]>): string {
  const cells = items.map(
    ([k, v]) => `<td class="sg-col" width="50%" style="vertical-align:top;padding:0 12px 16px 0;">
      <div style="font-family:${FONT_BODY};font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:${C.faint};">${esc(k)}</div>
      <div style="font-family:${FONT_BODY};font-size:14.5px;color:${C.ink};line-height:1.45;margin-top:4px;word-break:break-word;">${esc(v)}</div>
    </td>`,
  );
  let rows = '';
  for (let i = 0; i < cells.length; i += 2) rows += `<tr>${cells[i]}${cells[i + 1] ?? '<td class="sg-col" width="50%"></td>'}</tr>`;
  return panel(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows}</table>`, '18px 8px 4px 20px');
}

/** A quoted block of free text (a visitor's message). */
export function quote(label: string, text: string): string {
  return `${sectionLabel(label)}<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
    <td style="width:3px;background-color:${C.blue};background-image:linear-gradient(180deg,${C.blueBright},#0B78DE);border-radius:3px;"></td>
    <td style="padding:2px 0 2px 16px;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${C.text};">${escLines(text)}</td>
  </tr></table>`;
}

export function divider(): string {
  return `<div style="height:1px;line-height:1px;background-color:${C.rim};margin:28px 0;">&nbsp;</div>`;
}

/** Founder sign-off. */
export function signature(): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:30px;"><tr>
    <td style="vertical-align:middle;padding-right:14px;">
      <div style="width:46px;height:46px;border-radius:14px;background-color:#FFFFFF;border:1px solid ${C.rim};text-align:center;">
        <img src="${SITE}/email-logo" alt="" width="30" height="27" style="display:inline-block;margin-top:9px;border:0;" />
      </div>
    </td>
    <td style="vertical-align:middle;font-family:${FONT_BODY};">
      <div style="font-size:15px;font-weight:700;color:${C.ink};letter-spacing:-0.01em;">Tumiso Graig Ramaboya</div>
      <div style="font-size:13px;color:${C.muted};line-height:1.5;">Founder &amp; CEO, sonofgraig &middot; <a href="mailto:tumiso@sonofgraig.com" style="color:${C.blue};text-decoration:none;">tumiso@sonofgraig.com</a></div>
    </td>
  </tr></table>`;
}

// ── the frame ──────────────────────────────────────────────────────────────

export type LayoutArgs = {
  title: string;
  preheader: string;
  /** small label above the card, e.g. "Insights" — the wordmark suffix */
  product?: string;
  body: string;
  /** small print under the card (why you got this, unsubscribe, etc.) */
  footer: string;
  /** narrower card for short transactional notes */
  width?: 560 | 600;
};

export function layout({ title, preheader, product, body, footer, width = 600 }: LayoutArgs): string {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="x-apple-disable-message-reformatting"/>
<meta name="color-scheme" content="light only"/>
<meta name="supported-color-schemes" content="light"/>
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet"/>
<style>
  @media (max-width:620px){
    .sg-pad{padding:28px 22px !important}
    .sg-outer{padding:20px 10px !important}
    .sg-col{display:block !important;width:100% !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#EDF4FB;-webkit-font-smoothing:antialiased;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${esc(preheader)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</span>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#EDF4FB" style="background-color:#EDF4FB;background-image:radial-gradient(120% 70% at 0% 0%,#D6ECFB 0%,rgba(214,236,251,0) 60%),radial-gradient(90% 60% at 100% 10%,#E4E6FF 0%,rgba(228,230,255,0) 55%),linear-gradient(180deg,#EEF5FC 0%,#F6F8FB 100%);">
  <tr><td align="center" class="sg-outer" style="padding:36px 16px 40px;">

    <!-- brand -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:${width}px;">
      <tr><td style="padding:0 6px 18px;">
        <a href="${SITE}" style="text-decoration:none;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
            <td style="vertical-align:middle;padding-right:10px;"><img src="${SITE}/email-logo" alt="sonofgraig" width="32" height="29" style="display:block;border:0;"/></td>
            <td style="vertical-align:middle;font-family:${FONT_DISPLAY};font-size:18px;font-weight:800;letter-spacing:-0.02em;color:${C.ink};">sonofgraig${product ? ` <span style="color:${C.blue};font-weight:700;">${esc(product)}</span>` : ''}</td>
          </tr></table>
        </a>
      </td></tr>
    </table>

    <!-- glass card -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:${width}px;border-collapse:separate;">
      <tr><td class="sg-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;background-color:rgba(255,255,255,0.86);border:1px solid #FFFFFF;border-radius:24px;box-shadow:0 1px 2px rgba(13,17,23,0.04),0 18px 40px -16px rgba(6,90,130,0.22),0 40px 80px -40px rgba(13,17,23,0.18);padding:38px 40px;">
        ${body}
      </td></tr>
    </table>

    <!-- small print -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:${width}px;">
      <tr><td style="padding:22px 12px 0;text-align:center;font-family:${FONT_BODY};font-size:12px;line-height:1.65;color:${C.muted};">
        ${footer}
      </td></tr>
    </table>

  </td></tr>
</table>
</body></html>`;
}

const SOCIAL = SOCIAL_PROFILES.filter((x) => ['LinkedIn', 'Instagram', 'Facebook', 'GitHub'].includes(x.label));

export function socialLinks(): string {
  return SOCIAL
    .map(({ label, url }) => `<a href="${esc(url)}" style="color:${C.blueDeep};text-decoration:none;font-weight:600;">${esc(label)}</a>`)
    .join(`<span style="color:${C.faint};">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>`);
}

export const LEGAL =
  'sonofgraig Digital Solutions (Pty) Ltd &middot; CIPC K2025188095 &middot; KwaMhlanga, Mpumalanga, South Africa';
