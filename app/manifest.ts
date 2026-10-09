import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'sonofgraig — Enterprise Software Company',
    short_name: 'sonofgraig',
    // Aligned with SITE_DESCRIPTION in app/layout.tsx so manifest + Metadata API
    // present one entity story to crawlers and PWA installers.
    description:
      'sonofgraig is an enterprise software company headquartered in South Africa, building AI-native SaaS platforms — agents, RAG, fine-tuning, governance — for enterprise operations. POPIA-native, ZAR-priced.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0C10',
    theme_color: '#0B9EDE',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
