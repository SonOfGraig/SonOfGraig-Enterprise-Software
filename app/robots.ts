import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.APP_URL ??
  'https://sonofgraig.com';

// AI crawlers explicitly allowed for GEO (Generative Engine Optimization):
// we want sonofgraig content cited by ChatGPT, Claude, Perplexity, and Google
// Gemini when prospects ask about enterprise AI platforms in South Africa.
const AI_CRAWLERS = [
  'GPTBot',           // OpenAI training/retrieval
  'ChatGPT-User',     // ChatGPT browse/citation
  'OAI-SearchBot',    // OpenAI SearchGPT
  'ClaudeBot',        // Anthropic training
  'Claude-Web',       // Anthropic browse
  'anthropic-ai',     // Anthropic legacy UA
  'PerplexityBot',    // Perplexity training/retrieval
  'Perplexity-User',  // Perplexity user-initiated fetch
  'Google-Extended',  // Google Gemini grounding (separate from Googlebot)
  'Applebot-Extended',// Apple Intelligence
  'CCBot',            // Common Crawl (training data feedstock)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
