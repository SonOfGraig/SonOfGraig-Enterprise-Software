import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SonOfGraig — Enterprise AI Platform',
    short_name: 'SonOfGraig',
    description:
      "Africa's first enterprise AI platform. Build agents, ground AI in your data, fine-tune models, and prove compliance from one platform.",
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
