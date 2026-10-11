import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildContact, buildEarlyAccess, buildWaitlist } from '@/lib/forms/email';
import type { ContactSubmission, EarlyAccessSubmission, WaitlistSubmission } from '@/lib/forms/schemas';

// Development-only gallery of every email the site and listmonk send, with
// sample data: /email-preview?m=<name>. 404 in production.

const ea = {
  name: 'Naledi Mokoena', role: 'Head of Data', email: 'naledi@example.co.za', phone: '082 555 0134',
  company: 'Khula Financial Services', sector: 'Financial services', size: '200–1,000 employees',
  idp: 'Microsoft Entra ID', clusters: ['AI Dev Platform', 'Data & Analytics'], usecase:
    'We want a RAG assistant over 12 years of credit policy documents that our risk team can trust — every answer cited, and nothing leaving South Africa.\n\nPilot with 40 analysts in Q1.',
  timeline: 'Next quarter', nda: true, consent: true, hp: '',
} as unknown as EarlyAccessSubmission;

const contact = {
  name: 'Sipho Dlamini', company: 'Mpumalanga Logistics', email: 'sipho@example.co.za', phone: '+27 72 555 0199',
  topic: 'service-rag', tier: '50–200 employees', newsletter: true, consent: true, hp: '',
  message: "Hi — we'd like a quote for setting up a knowledge base over our SOPs and contracts. Around 3,000 documents, mostly PDF. Can you do an on-site workshop in Nelspruit?",
} as unknown as ContactSubmission;

const waitlist = { name: 'Ayesha Patel', email: 'ayesha@example.com', company: 'Lumen Studio', cluster: 'Creative & XR', hp: '' } as unknown as WaitlistSubmission;

// listmonk templates use Go template syntax; fill the few tags they use.
function listmonk(file: string, content = '') {
  const dir = join(process.cwd(), 'ops', 'listmonk');
  let base = readFileSync(join(dir, 'brand', 'email-templates', 'base.html'), 'utf8');
  const body = readFileSync(join(dir, file), 'utf8');
  const header = base.split('{{ define "header" }}')[1].split('{{ end }}')[0];
  const footer = base.split('{{ define "footer" }}')[1].split('{{ end }}')[0];
  base = body
    .replace(/{{ define "[^"]+" }}/, '')
    .replace(/{{ end }}\s*$/, '')
    .replace('{{ template "header" . }}', header)
    .replace(/{{ template "footer" \.? ?}}/, footer)
    .replace('{{ template "content" . }}', content);
  return base
    .replace(/{{ range[^}]*}}([\s\S]*?){{ end }}{{ end }}/g, '<li style="margin:0 0 6px;"><strong>sonofgraig Insights</strong></li>')
    .replace(/{{ \.Campaign\.Subject }}/g, 'Why RAG beats fine-tuning for regulated teams')
    .replace(/{{ \.Subscriber\.FirstName }}/g, 'Naledi')
    .replace(/{{[^}]*}}/g, '#');
}

const ISSUE = `<h1>Why RAG beats fine-tuning for regulated teams</h1><p>Most South African enterprises we speak to start with the same question…</p><h2>In this issue</h2><ul><li>Citations as a compliance control</li><li>POPIA and where your embeddings live</li></ul><p><a class="button" href="#">Read the article</a></p>`;

// listmonk public pages: the shell from brand/public/templates/index.html with
// listmonk's base stylesheet + our custom.css inlined (the site's CSP blocks
// loading them from lists.sonofgraig.com here).
async function listmonkPage(inner: string) {
  const dir = join(process.cwd(), 'ops', 'listmonk', 'brand');
  const shell = readFileSync(join(dir, 'public', 'templates', 'index.html'), 'utf8');
  const header = shell.split('{{ define "header" }}')[1].split('{{ end }}')[0];
  const footer = shell.split('{{ define "footer" }}')[1].split('{{ end }}')[0];
  let base = '';
  try {
    base = await (await fetch('https://lists.sonofgraig.com/public/static/style.css', { cache: 'force-cache' })).text();
  } catch {
    /* preview without listmonk's base styles */
  }
  const custom = readFileSync(join(dir, 'custom.css'), 'utf8').replace(/@import url\([^)]*\);/, '');
  return (header + inner + footer)
    .replace(/<link[^>]+stylesheet[^>]*>/g, '')
    .replace('</head>', `<style>${base}</style><style>${custom}</style></head>`)
    .replace(/{{ \.Data\.Title }}/g, 'Manage subscription')
    .replace(/{{[^}]*}}/g, '');
}

const PAGES: Record<string, () => Promise<string>> = {
  'listmonk-page-confirmed': () => listmonkPage('<h2>You are subscribed</h2><div>Thanks — your subscription to sonofgraig Insights is confirmed. The next issue lands within two weeks.</div>'),
  'listmonk-page-manage': () => listmonkPage(`<h2>Manage your subscription</h2><p>Choose what you'd like from sonofgraig.</p>
    <form><ul class="lists">
      <li><input id="a" type="checkbox" checked><label for="a">sonofgraig Insights</label></li>
      <li><input id="b" type="checkbox"><label for="b">AI Dev Platform updates</label></li>
      <li><input id="c" type="checkbox" checked><label for="c">POPIA &amp; AI governance</label></li>
    </ul><p><input type="email" placeholder="you@company.co.za"></p>
    <p><button class="button" type="button">Save</button> <a class="button button-outline" href="#">Unsubscribe from all</a></p></form>`),
};

const MAILS: Record<string, () => string> = {
  'early-access-customer': () => buildEarlyAccess(ea).autoReply.html,
  'early-access-team': () => buildEarlyAccess(ea).notification.html,
  'contact-customer': () => buildContact(contact).autoReply.html,
  'contact-team': () => buildContact(contact).notification.html,
  'contact-popia-customer': () => buildContact({ ...contact, topic: 'popia', newsletter: false } as ContactSubmission).autoReply.html,
  'waitlist-customer': () => buildWaitlist(waitlist).autoReply.html,
  'waitlist-team': () => buildWaitlist(waitlist).notification.html,
  'listmonk-optin': () => listmonk('brand/email-templates/subscriber-optin.html'),
  'listmonk-issue': () => listmonk('template.html', ISSUE),
};

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') return new NextResponse(null, { status: 404 });
  const m = req.nextUrl.searchParams.get('m');
  const html = m && MAILS[m] ? MAILS[m]() : m && PAGES[m] ? await PAGES[m]() : null;
  if (html) return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  const links = [...Object.keys(MAILS), ...Object.keys(PAGES)].map((k) => `<li><a href="?m=${k}">${k}</a></li>`).join('');
  return new NextResponse(`<!doctype html><title>Email previews</title><ul style="font:15px system-ui;line-height:2">${links}</ul>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
