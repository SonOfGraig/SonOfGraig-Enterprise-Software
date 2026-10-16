import raw from './public.json';

// Graig's public facts, exported by GRAIG himself:
//   C:\Jarvis\sonofgraig-jarvis\backend\app\content\entity.py  →  export_site()
// Only entries Tumiso approved in content/public/site.json are exported for a
// production build; a preview export may carry drafts, each flagged `draft`, and
// drafts are dropped here unless GRAIG_SHOW_DRAFTS=1 or this is `next dev`.
// Never edit public.json by hand — re-run the export.

export type GraigStep = { at: string | null; text: string };
export type GraigDemo = {
  slug: string;
  title: string;
  hook: string;
  date: string;
  minutes: number | null;
  steps: GraigStep[];
  links: { label: string; url: string }[];
  slides: string[];
  draft: boolean;
};
export type GraigChange = { date: string; headline: string; summary: string; draft: boolean };
export type GraigAccount = { name: string; handle: string; url: string };
export type GraigPublic = {
  generatedAt: string;
  ledger: { total: number; since: string };
  demo: GraigDemo | null;
  changelog: GraigChange[];
  accounts: GraigAccount[];
};

const showDrafts = process.env.NODE_ENV !== 'production' || process.env.GRAIG_SHOW_DRAFTS === '1';
const data = raw as GraigPublic;

export const graig: GraigPublic = {
  ...data,
  demo: data.demo && (showDrafts || !data.demo.draft) ? data.demo : null,
  changelog: data.changelog.filter((c) => showDrafts || !c.draft),
};

export const GRAIG_URL = 'https://graig.sonofgraig.com';

/** "2026-10-16" → "16 Oct 2026" */
export function longDate(iso: string) {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
