// Where this visit came from — kept for the tab's lifetime in sessionStorage
// (not a cookie; gone when the tab closes; never an identifier). Captured on
// the first page of a visit:
//   • a tagged link (?utm_source=linkedin&utm_medium=social&utm_campaign=…)
//     → tagged: true, so it counts towards that campaign
//   • otherwise the referring site (google.com, linkedin.com) or "(direct)"
// Forms send it with a submission so a lead says how it found us, and the
// telemetry counts views and conversions per campaign.

export type Attribution = {
  source: string;
  medium: string;
  campaign?: string;
  /** first page of the visit */
  landing: string;
  tagged: boolean;
};

const KEY = 'sg-attr';
const clean = (v: string | null, max = 60) => (v ?? '').replace(/[^\w .:/-]/g, '').trim().slice(0, max);

export function captureAttribution(): Attribution | null {
  try {
    const existing = sessionStorage.getItem(KEY);
    if (existing) return JSON.parse(existing) as Attribution;
    const q = new URLSearchParams(location.search);
    const landing = location.pathname.slice(0, 200);
    let a: Attribution;
    if (q.get('utm_source')) {
      a = {
        source: clean(q.get('utm_source')) || 'unknown',
        medium: clean(q.get('utm_medium')) || 'unknown',
        campaign: clean(q.get('utm_campaign'), 80) || undefined,
        landing,
        tagged: true,
      };
    } else {
      let host = '';
      try {
        host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
      } catch {
        host = '';
      }
      const external = host && host !== location.hostname.replace(/^www\./, '');
      a = { source: external ? host : '(direct)', medium: external ? 'referral' : 'direct', landing, tagged: false };
    }
    sessionStorage.setItem(KEY, JSON.stringify(a));
    return a;
  } catch {
    return null; // storage blocked: attribution is a nice-to-have
  }
}

export function getAttribution(): Attribution | null {
  try {
    const v = sessionStorage.getItem(KEY);
    return v ? (JSON.parse(v) as Attribution) : null;
  } catch {
    return null;
  }
}

/** "linkedin / social / insights-2026-10" — only for tagged visits. */
export function campaignKey(a: Attribution | null): string | undefined {
  if (!a?.tagged) return undefined;
  return `${a.source} / ${a.medium} / ${a.campaign ?? '-'}`;
}
