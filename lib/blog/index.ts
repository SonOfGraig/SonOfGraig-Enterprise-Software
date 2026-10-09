// Single source of truth for blog content. Pages and the sitemap pull from here.
// Adding a new post: drop a TS module under ./posts/, export it default, import
// it below, register it in POSTS, sorted newest-first by datePublished.

import type { Post, PostSummary } from './types';

import pillarAfricaPlatform from './posts/why-africa-needs-its-own-enterprise-ai-platform';
import popiaSections from './posts/popia-sections-11-19-72-and-ai-architecture';
import fourPillars from './posts/four-pillar-ai-dev-platform';
import ragVsFineTuning from './posts/rag-vs-fine-tuning-when-to-ground-vs-train';
import popiaSection72 from './posts/popia-section-72-cross-border-ai';
import pricingInRand from './posts/why-we-price-enterprise-ai-in-rand';
import productionAgents from './posts/building-production-ai-agents-langgraph';
import dataResidency from './posts/aws-af-south-1-data-residency';
import popiaChecklist from './posts/popia-ai-compliance-checklist';
import servicesToSaas from './posts/services-to-saas-agency-to-platform';
import ragEvaluation from './posts/rag-evaluation-defensible-citations';
import zeroTrustCloud from './posts/zero-trust-cloud-architecture-african-enterprise';
import governanceFeature from './posts/ai-governance-is-a-product-feature';

const POSTS: Post[] = [
  pillarAfricaPlatform,
  popiaSections,
  fourPillars,
  ragVsFineTuning,
  popiaSection72,
  pricingInRand,
  productionAgents,
  dataResidency,
  popiaChecklist,
  servicesToSaas,
  ragEvaluation,
  zeroTrustCloud,
  governanceFeature,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getAllPosts(): Post[] {
  return POSTS;
}

export function getAllSummaries(): PostSummary[] {
  return POSTS.map(({ slug, title, excerpt, category, datePublished, readingTime }) => ({
    slug,
    title,
    excerpt,
    category,
    datePublished,
    readingTime,
  }));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getRelatedPosts(slug: string, limit = 2): PostSummary[] {
  const current = getPost(slug);
  if (!current) return [];
  return POSTS
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aCat = a.category === current.category ? 0 : 1;
      const bCat = b.category === current.category ? 0 : 1;
      if (aCat !== bCat) return aCat - bCat;
      return a.datePublished < b.datePublished ? 1 : -1;
    })
    .slice(0, limit)
    .map(({ slug, title, excerpt, category, datePublished, readingTime }) => ({
      slug,
      title,
      excerpt,
      category,
      datePublished,
      readingTime,
    }));
}
