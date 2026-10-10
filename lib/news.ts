// sonofgraig Newsroom — dated company announcements (press releases).
// Source for /newsroom, /newsroom/[slug], /newsroom/feed.xml and the Google
// News sitemap. Insights (/blog) is evergreen writing; this is news.
//
// A release with `published: false` is a draft: reachable at its URL for
// review (noindex, with a draft banner) but left out of listings, feeds and
// sitemaps. Set `published: true` and the real `date` when Tumiso approves it.

export type NewsRelease = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD), the release date shown in the dateline. */
  date: string;
  dateline: string;
  category: 'Announcement' | 'Product' | 'Company' | 'Partnership';
  summary: string;
  body: string[];
  quote?: { text: string; name: string; role: string };
  links?: { label: string; href: string }[];
  published: boolean;
};

export const NEWS: NewsRelease[] = [
  {
    slug: 'africa-data-protection-guide-for-ai',
    title: 'sonofgraig publishes free guide to Africa’s data-protection laws for AI projects',
    date: '2026-10-10',
    dateline: 'KWAMHLANGA, South Africa',
    category: 'Announcement',
    summary:
      'A plain-language comparison of POPIA, Nigeria’s NDPA, Kenya’s Data Protection Act, Ghana’s Act 843 and Egypt’s PDPL for teams putting AI into production across the continent.',
    body: [
      'sonofgraig, a South African enterprise AI software company, has published a free, plain-language guide comparing five African data-protection laws for teams putting AI into production: South Africa’s Protection of Personal Information Act (POPIA), the Nigeria Data Protection Act 2023, Kenya’s Data Protection Act 2019, Ghana’s Data Protection Act 2012 (Act 843) and Egypt’s Personal Data Protection Law No. 151 of 2020.',
      'For each country, the guide sets out who must register with the regulator, how quickly a breach must be reported, when personal information may leave the country — including when it is sent to an AI model hosted overseas — and the rules on decisions made solely by automated systems.',
      'The differences are material for any company deploying AI in more than one market. Nigeria and Kenya require certain breaches to be reported to the regulator within 72 hours; Egypt requires a licence before personal data is transferred abroad; South Africa’s POPIA requires notification as soon as reasonably possible and sets conditions on transborder flows in section 72.',
      'Each country page closes with practical steps for AI teams, such as documenting the legal basis for sending prompts to an offshore model, running impact assessments before profiling customers, and keeping a human in the loop for consequential automated decisions.',
      'The guide is free to read without signing up and will be updated as laws and regulator guidance change. It is a planning aid, not legal advice.',
    ],
    quote: {
      text: 'Almost every AI project we scope runs into the same question: can we send customer data to a model hosted overseas? Across Africa, the answer changes at every border. We have written down what we check for our clients so any team can start from the same baseline.',
      name: 'Tumiso Graig Ramaboya',
      role: 'Founder and CEO, sonofgraig',
    },
    links: [
      { label: 'Read the guide', href: '/data-protection-africa' },
      { label: 'AI governance audit', href: '/services/ai-governance-audit' },
    ],
    published: true, // approved by Tumiso 2026-10-10
  },
];

export const publishedNews = () =>
  NEWS.filter((n) => n.published).sort((a, b) => b.date.localeCompare(a.date));

export const getRelease = (slug: string) => NEWS.find((n) => n.slug === slug);

/** Release time used in feeds and structured data: 08:00 SAST on the release date. */
export const releaseTime = (date: string) => `${date}T08:00:00+02:00`;

export const formatNewsDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
