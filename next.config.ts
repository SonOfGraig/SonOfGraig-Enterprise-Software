import type {NextConfig} from 'next';

// Content Security Policy. We allow 'unsafe-inline' and 'unsafe-eval' for now
// because Next.js client bundles, motion/framer animations, and the Tailwind
// runtime require them. A stricter nonce-based CSP is a Phase D follow-up.
//
// Cloudflare Turnstile (https://challenges.cloudflare.com) is required for the
// /early-access and /contact forms. The widget loads a script and mounts an
// iframe; both directives need to allow that origin.
const csp = [
  "default-src 'self'",
  // Cloudflare Turnstile + Cloudflare Insights + Google Analytics (gtag).
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://*.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' https: data: blob:",
  // Marketing explainer videos are hosted on GCS (cheaper egress than Cloud Run).
  // Without this directive Chrome blocks every <video> source with a CSP violation.
  "media-src 'self' https://storage.googleapis.com blob:",
  "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https:",
  // Turnstile widget renders inside an iframe served from challenges.cloudflare.com.
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    scrollRestoration: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  // A stray package-lock.json in the user's home folder makes Next infer the
  // whole profile as the workspace root; pin it to this project.
  outputFileTracingRoot: __dirname,
  transpilePackages: ['motion'],
  poweredByHeader: false,
  // Dated roadmap pages were retired (founder decision, 2026-10-09: no ship
  // dates on the site). Permanent redirects keep old links and search results
  // landing somewhere useful.
  async redirects() {
    return [
      { source: '/platform/timeline', destination: '/platform', permanent: true },
      { source: '/roadmap', destination: '/platform', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify - file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
