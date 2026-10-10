import type { MetadataRoute } from 'next';

// Every indexable static page, once. app/sitemap.ts (XML, for crawlers) and
// app/(public)/sitemap/page.tsx (HTML, for people) both read this list, so
// they cannot drift apart. Blog posts are added from lib/blog by each.
//
// Only indexable pages belong here: a noindex page in the XML sitemap is a
// contradictory signal.

export type SiteRoute = {
  path: string;
  label: string;
  group: 'Product' | 'Services' | 'Company' | 'Trust & legal';
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

export const ROUTES: SiteRoute[] = [
  { path: '/', label: 'Home', group: 'Company', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/platform', label: 'Platform overview', group: 'Product', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/platform/ai-dev-platform', label: 'AI Dev Platform', group: 'Product', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/platform/cloud-devops', label: 'Cloud & DevOps (planned)', group: 'Product', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/platform/data-analytics', label: 'Data & Analytics (planned)', group: 'Product', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/platform/creative-xr', label: 'Creative & XR (planned)', group: 'Product', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/platform/dev-platform', label: 'Dev Platform (planned)', group: 'Product', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pricing', label: 'Pricing', group: 'Product', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/early-access', label: 'Early access', group: 'Product', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/changelog', label: 'Changelog', group: 'Product', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/services', label: 'All services', group: 'Services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-agent-implementation', label: 'AI Agent Implementation', group: 'Services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/rag-knowledge-base-setup', label: 'RAG Knowledge Base Setup', group: 'Services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/cloud-architecture', label: 'Cloud Architecture & DevOps', group: 'Services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-governance-audit', label: 'AI Governance & Ethics Audit', group: 'Services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', label: 'About', group: 'Company', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', label: 'Insights', group: 'Company', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/press', label: 'Press & media kit', group: 'Company', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', label: 'Contact', group: 'Company', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/sitemap', label: 'Sitemap', group: 'Company', changeFrequency: 'monthly', priority: 0.2 },
  { path: '/security', label: 'Security & trust', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/data-protection-africa', label: 'Africa data-protection laws for AI', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/data-protection-africa/south-africa', label: 'South Africa (POPIA) for AI', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/data-protection-africa/nigeria', label: 'Nigeria (NDPA) for AI', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/data-protection-africa/kenya', label: 'Kenya (DPA) for AI', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/data-protection-africa/ghana', label: 'Ghana (Act 843) for AI', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/data-protection-africa/egypt', label: 'Egypt (PDPL) for AI', group: 'Trust & legal', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/popia', label: 'POPIA statement', group: 'Trust & legal', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/privacy-policy', label: 'Privacy policy', group: 'Trust & legal', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/paia', label: 'PAIA manual', group: 'Trust & legal', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', label: 'Terms of use', group: 'Trust & legal', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/dpa', label: 'Data Processing Agreement', group: 'Trust & legal', changeFrequency: 'yearly', priority: 0.4 },
];
