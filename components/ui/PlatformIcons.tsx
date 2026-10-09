import * as React from 'react';

/**
 * Platform cluster icons — the 5 isometric brand marks for the sonofgraig platform.
 * Use these wherever a cluster is referenced (cards, mega-menu, hero sections, etc.).
 *
 * Each icon is a flat-colour isometric prism in its cluster accent colour.
 * They are pure SVG (no dependencies) and inherit `width`/`height`/`className` props.
 */

export const AIDevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" {...props}>
    <title>AI Dev Platform</title>
    <polygon points="100,20 148,48 100,76 52,48" fill="#0B9EDE" />
    <polygon points="52,48 100,76 100,148 52,120" fill="#044E73" />
    <polygon points="100,76 148,48 148,120 100,148" fill="#044E73" />
  </svg>
);

export const CloudDevOpsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 190" {...props}>
    <title>Cloud &amp; DevOps Suite</title>
    <polygon points="100,110 136,130 100,150 64,130" fill="#C2530A" />
    <polygon points="64,130 100,150 100,170 64,150" fill="#7A3208" />
    <polygon points="100,150 136,130 136,150 100,170" fill="#7A3208" />
    <polygon points="100,75 122,88 100,100 78,88" fill="#EA580C" />
    <polygon points="78,88 100,100 100,115 78,103" fill="#922F06" />
    <polygon points="100,100 122,88 122,103 100,115" fill="#922F06" />
    <polygon points="100,44 116,53 100,62 84,53" fill="#F97316" />
    <polygon points="84,53 100,62 100,75 84,66" fill="#C2530A" />
    <polygon points="100,62 116,53 116,66 100,75" fill="#C2530A" />
  </svg>
);

export const DataAnalyticsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 190" {...props}>
    <title>Data &amp; Analytics OS</title>
    <polygon points="100,20 148,48 100,70 52,48" fill="#16A34A" />
    <polygon points="52,48 100,70 100,88 52,66" fill="#0D5C2E" />
    <polygon points="100,70 148,48 148,66 100,88" fill="#0D5C2E" />
    <line x1="40" y1="96" x2="160" y2="96" stroke="#16A34A" strokeWidth="4" />
    <polygon points="100,104 148,132 100,154 52,132" fill="#0F7A3C" />
    <polygon points="52,132 100,154 100,178 52,156" fill="#0D5C2E" />
    <polygon points="100,154 148,132 148,156 100,178" fill="#0D5C2E" />
  </svg>
);

export const CreativeXRIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" {...props}>
    <title>Creative &amp; XR Studio</title>
    <polygon points="100,160 148,132 100,104 52,132" fill="#7C3AED" />
    <polygon points="52,132 100,104 100,32 52,60" fill="#3B1A73" />
    <polygon points="100,104 148,132 148,60 100,32" fill="#3B1A73" />
  </svg>
);

export const DevPlatformIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" {...props}>
    <title>Dev Platform</title>
    <polygon points="110,10 158,38 110,66 62,38" fill="#6B7280" />
    <polygon points="48,54 96,82 96,154 48,126" fill="#374151" />
    <polygon points="124,82 172,54 172,126 124,154" fill="#4B5563" />
  </svg>
);

/**
 * Shared cluster metadata. Single source of truth for the 5 platform clusters.
 * Import this where you need to render cluster lists, dropdowns, or links.
 */
export interface PlatformCluster {
  slug: 'ai-dev-platform' | 'cloud-devops' | 'data-analytics' | 'creative-xr' | 'dev-platform';
  name: string;
  tagline: string;
  href: string;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3';
  accent: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const platformClusters: PlatformCluster[] = [
  {
    slug: 'ai-dev-platform',
    name: 'AI Dev Platform',
    tagline: 'Agents · RAG · Fine-Tuning · Governance',
    href: '/platform/ai-dev-platform',
    phase: 'Phase 1',
    accent: '#0B9EDE',
    icon: AIDevIcon,
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    tagline: 'IaC · CI/CD · Security · FinOps',
    href: '/platform/cloud-devops',
    phase: 'Phase 2',
    accent: '#F97316',
    icon: CloudDevOpsIcon,
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    tagline: 'Pipelines · BI · Automation',
    href: '/platform/data-analytics',
    phase: 'Phase 2',
    accent: '#16A34A',
    icon: DataAnalyticsIcon,
  },
  {
    slug: 'creative-xr',
    name: 'Creative & XR',
    tagline: 'Design · AR/VR · Brand AI',
    href: '/platform/creative-xr',
    phase: 'Phase 3',
    accent: '#7C3AED',
    icon: CreativeXRIcon,
  },
  {
    slug: 'dev-platform',
    name: 'Dev Platform',
    tagline: 'Low-code · IoT · Web3 · Mobile',
    href: '/platform/dev-platform',
    phase: 'Phase 3',
    accent: '#6B7280',
    icon: DevPlatformIcon,
  },
];

export const getCluster = (slug: PlatformCluster['slug']) =>
  platformClusters.find((c) => c.slug === slug)!;
