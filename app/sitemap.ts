import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

// Routes are enumerated explicitly so the sitemap stays deterministic and we
// can tune priority/changeFrequency per page. Add new public routes here.
// Dynamic /blog/[slug] entries are appended from the typed posts manifest
// in lib/blog/.
const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/platform', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/platform/ai-dev-platform', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/platform/cloud-devops', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/platform/data-analytics', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/platform/creative-xr', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pricing', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/early-access', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/security', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/changelog', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-agent-implementation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-governance-audit', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/cloud-architecture', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/rag-knowledge-base-setup', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/popia', changeFrequency: 'yearly', priority: 0.4 },
  // NOTE: the following are intentionally EXCLUDED because each is currently
  // an `UnderConstruction` stub with `robots: { index: false }`. Listing a
  // noindex page in the sitemap is a contradictory signal Google reports as
  // a Coverage error. When real content lands on any of these, flip the page
  // to `index: true` and re-add it here:
  //   /roadmap /partners /press /status /sdk-docs /api-reference
  //   /sitemap /terms /dpa /trademarks /platform/dev-platform /platform/timeline
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.dateModified}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
