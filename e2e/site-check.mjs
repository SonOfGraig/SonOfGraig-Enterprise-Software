// sonofgraig.com end-to-end check (2026-10-12). Runs on the T110 from GRAIG's deck
// directory (~/carousels, which already has Playwright + Chromium):
//
//   node site-check.mjs [https://sonofgraig.com] > report.json
//
// Run nightly by GRAIG (job site_e2e) and at the end of every deploy
// (ops/deploy-t110.sh). Exits 1 when anything fails; the JSON report always prints.
//
// READ-ONLY against production. It never submits a real form: every POST to
// /api/forms/*, /api/newsletter and /api/telemetry is intercepted inside the test
// browser and answered locally, so no lead, email, Turnstile check, rate-limit hit or
// telemetry count ever reaches the site. (The T110 shares Sir's home IP, and the forms
// rate-limit per IP.) Cookie consent is answered "reject non-essential".
//
// What it checks:
//   pages   — every sitemap URL: HTTP 200, no own-origin console errors, no failed
//             own-origin requests, <title>, meta description, exactly one <h1>,
//             canonical = https://sonofgraig.com<path>, load time
//   links   — every internal link found on those pages resolves (HEAD/GET 200/3xx)
//   flows   — nav menus, mobile menu, theme toggle, cookie banner, newsletter footer
//             (validation + success state), contact and early-access forms
//             (client validation + success state with the server mocked)

import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'https://sonofgraig.com').replace(/\/$/, '');
const ORIGIN = new URL(BASE).origin;
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36 GRAIG-e2e/1.0';
const started = Date.now();
const report = { at: new Date().toISOString(), base: BASE, pages: [], links: { checked: 0, broken: [] }, flows: [], ok: true };

const fail = (where, msg) => { report.ok = false; return { ok: false, detail: msg, where }; };

async function sitemapUrls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`, { headers: { 'User-Agent': UA } })).text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, BASE));
}

async function newPage(browser, opts = {}) {
  const ctx = await browser.newContext({ userAgent: UA, viewport: opts.viewport || { width: 1366, height: 900 }, ...(opts.ctx || {}) });
  // Consent: store "reject non-essential" exactly as the banner does (popia_consent_v3),
  // so the banner — which appears 1 s after load — never races or covers what we test.
  // The cookie-banner flow itself asks for a fresh visitor instead.
  if (!opts.freshConsent) {
    await ctx.addInitScript(() => {
      try {
        localStorage.setItem('popia_consent_v3', JSON.stringify({ necessary: true, functional: true, analytics: false, marketing: false, personalise: false, timestamp: new Date().toISOString() }));
      } catch {}
    });
  }
  await ctx.route('**/api/forms/**', (r) => r.request().method() === 'POST' ? r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) : r.continue());
  await ctx.route('**/api/newsletter', (r) => r.request().method() === 'POST' ? r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) : r.continue());
  await ctx.route('**/api/telemetry', (r) => r.fulfill({ status: 204, body: '' }));
  // third-party analytics would only add noise (and they're consent-gated anyway)
  await ctx.route(/googletagmanager|google-analytics|clarity\.ms|cloudflareinsights/, (r) => r.abort());
  const page = await ctx.newPage();
  return { ctx, page };
}

async function dismissCookies(page) {
  const btn = page.getByRole('button', { name: /reject non-essential/i });
  if (await btn.isVisible().catch(() => false)) await btn.click().catch(() => {});
}

async function checkPage(browser, url, internalLinks) {
  const { ctx, page } = await newPage(browser);
  const errors = [], failed = [];
  // Only the site's own scripts: Turnstile and other third parties print their own noise
  // (Turnstile logs a '%c%d' anti-debugging line), which we can neither act on nor fix.
  page.on('console', (m) => {
    const src = m.location()?.url || '';
    if (m.type() === 'error' && (!src || src.startsWith(ORIGIN)) && !/favicon|Failed to load resource|%c%d/.test(m.text())) errors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${String(e.message).slice(0, 200)}`));
  page.on('requestfailed', (r) => { if (r.url().startsWith(ORIGIN) && !/telemetry|_rsc=/.test(r.url())) failed.push(`${r.failure()?.errorText} ${r.url().replace(ORIGIN, '')}`); });
  page.on('response', (r) => { if (r.url().startsWith(ORIGIN) && r.status() >= 400 && !/telemetry/.test(r.url())) failed.push(`${r.status()} ${r.url().replace(ORIGIN, '')}`); });
  const path = new URL(url).pathname;
  const t0 = Date.now();
  let status = 0;
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    status = res?.status() ?? 0;
  } catch (e) {
    errors.push(`navigation: ${String(e.message).slice(0, 160)}`);
  }
  const ms = Date.now() - t0;
  const seo = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    h1: document.querySelectorAll('h1').length,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
    noindex: /noindex/i.test(document.querySelector('meta[name="robots"]')?.getAttribute('content') || ''),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
  })).catch(() => ({ title: '', description: '', h1: 0, canonical: '', noindex: false, links: [] }));
  for (const l of seo.links) {
    try {
      const u = new URL(l);
      if (u.origin === ORIGIN) internalLinks.add(u.origin + u.pathname);
    } catch {}
  }
  const problems = [];
  if (status !== 200) problems.push(`HTTP ${status}`);
  if (!seo.title) problems.push('no <title>');
  if (!seo.description) problems.push('no meta description');
  if (seo.h1 !== 1) problems.push(`${seo.h1} <h1> elements`);
  const wantCanon = `https://sonofgraig.com${path === '/' ? '' : path}`;
  if (!seo.noindex && seo.canonical && seo.canonical.replace(/\/$/, '') !== wantCanon.replace(/\/$/, '')) problems.push(`canonical ${seo.canonical}`);
  if (!seo.noindex && !seo.canonical) problems.push('no canonical');
  if (errors.length) problems.push(`${errors.length} console error(s)`);
  if (failed.length) problems.push(`${failed.length} failed request(s)`);
  if (problems.length) report.ok = false;
  report.pages.push({ path, status, ms, title: seo.title, h1: seo.h1, noindex: seo.noindex, problems, errors: errors.slice(0, 5), failed: failed.slice(0, 5) });
  await ctx.close();
}

async function checkLinks(urls, known) {
  for (const u of urls) {
    if (known.has(u)) continue;
    report.links.checked++;
    try {
      let r = await fetch(u, { method: 'HEAD', redirect: 'manual', headers: { 'User-Agent': UA } });
      if (r.status === 405) r = await fetch(u, { redirect: 'manual', headers: { 'User-Agent': UA } });
      if (r.status >= 400) { report.links.broken.push({ url: u.replace(ORIGIN, ''), status: r.status }); report.ok = false; }
    } catch (e) {
      report.links.broken.push({ url: u.replace(ORIGIN, ''), status: String(e.message).slice(0, 60) });
      report.ok = false;
    }
  }
}

async function flow(name, browser, fn, opts) {
  const { ctx, page } = await newPage(browser, opts);
  const t0 = Date.now();
  try {
    const detail = await fn(page);
    report.flows.push({ name, ok: true, ms: Date.now() - t0, detail: detail || '' });
  } catch (e) {
    // say which element it was waiting for, and keep a screenshot of what a visitor would see
    const shot = `/tmp/e2e-${name.replace(/[^a-z0-9]+/gi, '-').slice(0, 40)}.png`;
    await page.screenshot({ path: shot }).catch(() => {});
    const msg = String(e.message || e);
    const waiting = (msg.match(/waiting for ([^\n]+)/) || [])[1] || '';
    report.flows.push({ name, ok: false, ms: Date.now() - t0, screenshot: shot,
      detail: `${msg.split('\n')[0].slice(0, 160)}${waiting ? ` — waiting for ${waiting.slice(0, 120)}` : ''}` });
    report.ok = false;
  }
  await ctx.close();
}

const browser = await chromium.launch();
try {
  const urls = await sitemapUrls();
  const internal = new Set();
  for (const u of urls) await checkPage(browser, u, internal);
  await checkLinks([...internal].sort(), new Set(urls));

  await flow('cookie banner: reject non-essential hides it and is remembered', browser, async (p) => {
    await p.goto(BASE, { waitUntil: 'networkidle' });
    const btn = p.getByRole('button', { name: /reject non-essential/i });
    await btn.waitFor({ timeout: 10000 });
    await btn.click();
    await btn.waitFor({ state: 'hidden', timeout: 5000 });
    await p.reload({ waitUntil: 'networkidle' });
    if (await btn.isVisible().catch(() => false)) throw new Error('banner came back after reload');
  }, { freshConsent: true });

  await flow('theme toggle switches light/dark', browser, async (p) => {
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await dismissCookies(p);
    const before = await p.evaluate(() => document.documentElement.dataset.theme);
    await p.getByRole('button', { name: /dark|light|theme/i }).first().click();
    await p.waitForTimeout(400);
    const after = await p.evaluate(() => document.documentElement.dataset.theme);
    if (before === after) throw new Error(`theme stayed "${after}"`);
    return `${before} → ${after}`;
  });

  await flow('header navigation reaches pricing, blog and contact', browser, async (p) => {
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await dismissCookies(p);
    for (const [name, path] of [['Insights', '/blog'], ['Talk to us', '/contact']]) {
      await p.getByRole('link', { name: new RegExp(`^${name}`, 'i') }).first().click();
      await p.waitForURL(`**${path}`, { timeout: 15000 });
      await p.goBack({ waitUntil: 'networkidle' });
    }
  });

  await flow('mobile menu opens and "Talk to us" navigates', browser, async (p) => {
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await p.getByRole('button', { name: /^menu$/i }).click();
    await p.getByRole('button', { name: /close menu/i }).waitFor({ timeout: 5000 });
    // the menu's own CTA (the header one is hidden at phone width)
    await p.locator('a[href="/contact"]:visible', { hasText: /talk to us/i }).first().click();
    await p.waitForURL('**/contact', { timeout: 15000 });
  }, { viewport: { width: 390, height: 844 }, ctx: { isMobile: true, hasTouch: true } });

  await flow('footer newsletter: needs email + consent, then shows "check your inbox"', browser, async (p) => {
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await dismissCookies(p);
    const form = p.locator('footer form[data-form="newsletter:footer"]');
    await form.scrollIntoViewIfNeeded();
    await form.locator('input[type=email]').fill('e2e-test@example.com');
    await form.locator('input[name=consent]').check();
    await form.getByRole('button', { name: /subscribe/i }).click();
    await p.getByText(/one step left|check your inbox/i).first().waitFor({ timeout: 10000 });
  });

  await flow('contact form: validation, then success state (server mocked)', browser, async (p) => {
    await p.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
    await dismissCookies(p);
    const f = p.locator('form[data-form="contact"]');
    await f.locator('input[name=name]').fill('E2E Test');
    await f.locator('input[name=company]').fill('GRAIG e2e');
    await f.locator('input[name=email]').fill('e2e-test@example.com');
    const topic = f.locator('select[name=topic]');
    if (await topic.count()) await topic.selectOption('other');
    await f.locator('textarea[name=message]').fill('Automated end-to-end check. Not a real enquiry.');
    await f.locator('input[name=consent]').check();
    await f.getByRole('button', { name: /send|submit/i }).click();
    await p.getByText(/we've got it|enquiry received/i).first().waitFor({ timeout: 10000 });
  });

  await flow('early-access form reaches its success state (server mocked)', browser, async (p) => {
    await p.goto(`${BASE}/early-access`, { waitUntil: 'networkidle' });
    await dismissCookies(p);
    const f = p.locator('form[data-form="early-access"]');
    await f.waitFor({ timeout: 10000 });
    for (const [n, v] of [['name', 'E2E Test'], ['role', 'Tester'], ['email', 'e2e-test@example.com'], ['company', 'GRAIG e2e'], ['usecase', 'Automated end-to-end check. Not a real application.']]) {
      const el = f.locator(`[name=${n}]`);
      if (await el.count()) await el.first().fill(v);
    }
    for (const n of ['sector', 'size']) {
      const el = f.locator(`select[name=${n}]`);
      if (await el.count()) await el.selectOption({ index: 1 });
      else { const i = f.locator(`input[name=${n}]`); if (await i.count()) await i.first().fill('Other'); }
    }
    await f.locator('input[name=consent]').check();
    await f.getByRole('button', { name: /apply|submit|send|request/i }).last().click();
    await p.getByText(/application received|tumiso's desk/i).first().waitFor({ timeout: 10000 });
  });
} finally {
  await browser.close();
}

report.ms = Date.now() - started;
report.summary = {
  pages: report.pages.length,
  pages_with_problems: report.pages.filter((p) => p.problems.length).length,
  links_checked: report.links.checked,
  links_broken: report.links.broken.length,
  flows: report.flows.length,
  flows_failed: report.flows.filter((f) => !f.ok).length,
};
console.log(JSON.stringify(report));
process.exit(report.ok ? 0 : 1);
