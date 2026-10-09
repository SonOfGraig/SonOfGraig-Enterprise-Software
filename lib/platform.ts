import type { SceneName } from '@/components/fx/SceneBackground';

// The five product clusters (systemdesign/13-clusters.md). Only the AI Dev
// Platform is in build; the others are planned and carry NO dates (founder
// decision, 2026-10-09). Module lists describe intent, not availability.

export type PlannedCluster = {
  slug: string;
  name: string;
  n: string;
  tagline: string;
  lead: string;
  scene: SceneName;
  modules: { name: string; body: string }[];
  videos: { basename: string; caption: string; label: string }[];
  /** A service available today that covers the same ground. */
  today?: { label: string; href: string };
};

export const AI_DEV_MODULES = [
  {
    id: 'rag-studio',
    name: 'RAG Studio',
    status: 'Early access',
    video: 'rag-studio',
    lead: 'Connect company documents and get answers that cite the exact passage they came from.',
    points: ['Connectors for Drive, SharePoint, Notion and S3', 'Hybrid retrieval: BM25 plus dense embeddings', 'Citations on every answer, lineage on every chunk', 'Ragas evaluation gates before each release'],
  },
  {
    id: 'agent-builder',
    name: 'Agent Builder',
    status: 'In development',
    video: 'agent-builder',
    lead: 'Compose multi-agent workflows from prompts, tools and models — with a trace of every step.',
    points: ['Visual canvas for prompts, tools and models', 'Human approval gates on regulated actions', 'Replayable execution traces', 'Templates from real client deployments'],
  },
  {
    id: 'governance-hub',
    name: 'Governance Hub',
    status: 'Planned',
    video: 'governance-hub',
    lead: 'POPIA reporting, bias checks and explainability for the AI systems your teams run.',
    points: ['POPIA processing records generated from real usage', 'Bias metrics across protected groups', 'Per-decision explanations (SHAP)', 'Drift monitoring with alerts'],
  },
  {
    id: 'ml-ops',
    name: 'ML Ops',
    status: 'Planned',
    video: null,
    lead: 'Evaluate, fine-tune and version models, with results you can compare and reproduce.',
    points: ['Versioned datasets and model artefacts', 'Side-by-side evaluation runs', 'Fine-tuning jobs with cost estimates in rand', 'One-click promotion with rollback'],
  },
] as const;

export const PLANNED_CLUSTERS: PlannedCluster[] = [
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    n: '02',
    tagline: 'Infrastructure, pipelines, security posture and cloud cost — in one console.',
    lead: 'The second cluster we plan to build. Today, the same work is delivered as our Cloud Architecture & DevOps service.',
    scene: 'modularLattice',
    modules: [
      { name: 'Cloud Console', body: 'A single view across accounts and regions, with cost attributed to teams.' },
      { name: 'Pipeline Builder', body: 'Visual CI/CD on GitHub Actions and Terraform.' },
      { name: 'Security Posture', body: 'Continuous checks against a zero-trust baseline.' },
      { name: 'FinOps Dashboard', body: 'Budgets, anomalies and forecasts in rand.' },
    ],
    videos: [
      { basename: 'cloud-console', label: 'Cloud Console', caption: 'A control plane with region map, cost gauge and live activity log.' },
      { basename: 'security-posture', label: 'Security Posture', caption: 'A posture score with a streaming log of policy events.' },
    ],
    today: { label: 'Cloud Architecture & DevOps service', href: '/services/cloud-architecture' },
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    n: '03',
    tagline: 'Pipelines, dashboards and automation with lineage you can hand to legal.',
    lead: 'The third cluster we plan to build: data movement, analysis and automation with POPIA-aware masking built in.',
    scene: 'dotMatrix',
    modules: [
      { name: 'Data Pipelines', body: 'Visual ETL/ELT with masking and lineage.' },
      { name: 'Analytics Studio', body: 'Embedded dashboards without writing SQL.' },
      { name: 'Workflow Engine', body: 'Triggers, actions, branches and delays across your tools.' },
    ],
    videos: [
      { basename: 'data-pipeline', label: 'Data Pipelines', caption: 'Sources flow through masking and transforms into a warehouse, with lineage.' },
      { basename: 'analytics-studio', label: 'Analytics Studio', caption: 'KPI cards and drill-through charts built from live connectors.' },
      { basename: 'workflow-engine', label: 'Workflow Engine', caption: 'A CRM trigger routed through enrichment, scoring, a branch and a deal sink.' },
    ],
  },
  {
    slug: 'creative-xr',
    name: 'Creative & XR',
    n: '04',
    tagline: 'Design systems, brand tooling and spatial experiences.',
    lead: 'A planned cluster built on our design and immersive work. Design and XR projects are available today as bespoke engagements.',
    scene: 'starfield',
    modules: [
      { name: 'Design System Generator', body: 'Component libraries generated from brand tokens.' },
      { name: 'Brand Studio', body: 'On-brand assets with guardrails.' },
      { name: 'XR Builder', body: 'No-code AR/VR experiences for training.' },
    ],
    videos: [],
  },
  {
    slug: 'dev-platform',
    name: 'Dev Platform',
    n: '05',
    tagline: 'Low-code apps, IoT and mobile on one foundation.',
    lead: 'A planned cluster for building and running applications. App and mobile development is available today as bespoke engagements.',
    scene: 'matrixRain',
    modules: [
      { name: 'App Builder', body: 'Low-code enterprise applications.' },
      { name: 'IoT Platform', body: 'Device management and data ingestion.' },
      { name: 'Mobile', body: 'Shared components for iOS and Android.' },
    ],
    videos: [],
  },
];

export function getCluster(slug: string) {
  const c = PLANNED_CLUSTERS.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown cluster: ${slug}`);
  return c;
}
