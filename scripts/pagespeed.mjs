#!/usr/bin/env node
/**
 * scripts/pagespeed.mjs
 *
 * Zero-dependency PageSpeed Insights (Lighthouse) audit runner.
 * Calls the Google PageSpeed Insights API v5 for one or more URLs across both
 * mobile and desktop strategies and prints the category scores + key Core Web
 * Vitals as a compact table.
 *
 * SETUP (one-time):
 *   1. Enable the API on the GCP project:
 *        gcloud services enable pagespeedonline.googleapis.com \
 *          --project=gen-lang-client-0731037145
 *   2. Create an API key (Console → APIs & Services → Credentials → Create API
 *      key), ideally restricted to "PageSpeed Insights API".
 *   3. Put it in .env.local (never committed):  PAGESPEED_API_KEY=AIza...
 *      The key is optional — the API works unauthenticated at a low quota — but
 *      a key raises the rate limit and is recommended for repeat runs.
 *
 * USAGE:
 *   node scripts/pagespeed.mjs https://sonofgraig.com
 *   node scripts/pagespeed.mjs https://sonofgraig.com/platform /pricing /about
 *   npm run audit:speed -- https://sonofgraig.com/platform
 *
 * Bare paths (starting with "/") are resolved against DEFAULT_ORIGIN.
 * With no URL args, audits a sensible default set of key pages.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DEFAULT_ORIGIN = 'https://sonofgraig.com';
const STRATEGIES = ['mobile', 'desktop'];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

const DEFAULT_TARGETS = [
  '/',
  '/platform',
  '/pricing',
  '/services',
  '/about',
  '/early-access',
];

// --- Load PAGESPEED_API_KEY from env or .env.local (no dotenv dependency) ---
function loadApiKey() {
  if (process.env.PAGESPEED_API_KEY) return process.env.PAGESPEED_API_KEY;
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const envPath = join(here, '..', '.env.local');
    const raw = readFileSync(envPath, 'utf8');
    const match = raw.match(/^PAGESPEED_API_KEY\s*=\s*(.+)$/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, '');
  } catch {
    /* no .env.local — proceed unauthenticated */
  }
  return null;
}

function resolveUrl(arg) {
  if (arg.startsWith('http://') || arg.startsWith('https://')) return arg;
  if (arg.startsWith('/')) return `${DEFAULT_ORIGIN}${arg}`;
  return `https://${arg}`;
}

function fmtScore(v) {
  if (v == null) return '  -';
  const pct = Math.round(v * 100);
  return String(pct).padStart(3, ' ');
}

async function audit(url, strategy, apiKey) {
  const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  api.searchParams.set('url', url);
  api.searchParams.set('strategy', strategy);
  for (const c of CATEGORIES) api.searchParams.append('category', c);
  if (apiKey) api.searchParams.set('key', apiKey);

  const res = await fetch(api);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} — ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const cats = data.lighthouseResult?.categories ?? {};
  const audits = data.lighthouseResult?.audits ?? {};
  return {
    performance: cats.performance?.score,
    accessibility: cats.accessibility?.score,
    bestPractices: cats['best-practices']?.score,
    seo: cats.seo?.score,
    lcp: audits['largest-contentful-paint']?.displayValue ?? '-',
    cls: audits['cumulative-layout-shift']?.displayValue ?? '-',
    tbt: audits['total-blocking-time']?.displayValue ?? '-',
  };
}

async function main() {
  const apiKey = loadApiKey();
  const args = process.argv.slice(2);
  const targets = (args.length ? args : DEFAULT_TARGETS).map(resolveUrl);

  console.log(
    `\nPageSpeed Insights — ${targets.length} URL(s) × ${STRATEGIES.length} strategies` +
      `${apiKey ? ' (authenticated)' : ' (unauthenticated — low quota)'}\n`,
  );
  console.log(
    'URL'.padEnd(46) +
      'STRAT'.padEnd(9) +
      'PERF ACC  BP  SEO   LCP / CLS / TBT',
  );
  console.log('-'.repeat(96));

  let anyFail = false;
  for (const url of targets) {
    for (const strategy of STRATEGIES) {
      const short = url.replace(DEFAULT_ORIGIN, '') || '/';
      try {
        const r = await audit(url, strategy, apiKey);
        console.log(
          short.padEnd(46) +
            strategy.padEnd(9) +
            `${fmtScore(r.performance)} ${fmtScore(r.accessibility)} ${fmtScore(r.bestPractices)} ${fmtScore(r.seo)}   ` +
            `${r.lcp} / ${r.cls} / ${r.tbt}`,
        );
      } catch (err) {
        anyFail = true;
        console.log(`${short.padEnd(46)}${strategy.padEnd(9)}ERROR — ${err.message}`);
      }
    }
  }
  console.log(
    '\nScores are 0–100 (higher is better). PERF=Performance, ACC=Accessibility, ' +
      'BP=Best Practices, SEO=SEO.\nNote: scores are measured from Google\'s servers ' +
      '(US region) — SA visitors typically see faster real-world metrics.\n',
  );
  if (anyFail) process.exitCode = 1;
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
