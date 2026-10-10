import type {NextConfig} from 'next';

// Content Security Policy. 'unsafe-inline' stays for scripts because Next's
// hydration payload, next-themes' no-flash script and gtag are inline; a
// nonce-based CSP would force every page to render dynamically. 'unsafe-eval'
// is only needed by the dev server (React Refresh), so production omits it.
//
// Cloudflare Turnstile (https://challenges.cloudflare.com) is required for the
// /early-access and /contact forms. The widget loads a script and mounts an
// iframe; both directives need to allow that origin.
const isDev = process.env.NODE_ENV !== 'production';
const csp = [
  "default-src 'self'",
  // Cloudflare Turnstile + Cloudflare Insights + Google Analytics (gtag).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com https://static.cloudflareinsights.com https://*.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' https: data: blob:",
  // Explainer videos are served from /public (same origin).
  "media-src 'self' blob:",
  // Only the services the site actually talks to — no blanket https:.
  "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
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
    // Inline the (small, ~30 KB) stylesheet into the HTML so first paint
    // doesn't wait on three render-blocking CSS requests (flagged by SEO
    // audit 2026-10-10, est. 0.5 s).
    inlineCss: true,
  },
  // No remote image hosts: the optimiser only ever processes our own /public
  // files, so it cannot be pointed at attacker-supplied images.
  images: {
    remotePatterns: [],
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
      // One canonical origin: https://sonofgraig.com. Behind the Cloudflare
      // Tunnel the app sees the visitor's Host header and, in CF-Visitor, the
      // scheme they used — so www and plain-http requests get a single 308.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sonofgraig.com' }],
        destination: 'https://sonofgraig.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'cf-visitor', value: '.*"scheme":"http".*' }],
        destination: 'https://sonofgraig.com/:path*',
        permanent: true,
      },
      { source: '/platform/timeline', destination: '/platform', permanent: true },
      { source: '/roadmap', destination: '/platform', permanent: true },
      // Not hiring yet (founder, 2026-10-10): old careers links land on About.
      { source: '/careers', destination: '/about', permanent: false },
      // Placeholder pages retired (founder, 2026-10-10): nothing real to show
      // yet, so each lands on its closest live page.
      { source: '/api-reference', destination: '/platform/ai-dev-platform', permanent: false },
      { source: '/sdk-docs', destination: '/platform/ai-dev-platform', permanent: false },
      { source: '/status', destination: '/changelog', permanent: false },
      { source: '/partners', destination: '/contact?topic=partner', permanent: false },
      { source: '/trademarks', destination: '/terms', permanent: false },
      { source: '/about-ads', destination: '/privacy-policy#cookies', permanent: false },
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
