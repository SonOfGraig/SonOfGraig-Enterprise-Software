import type { SceneName } from '@/components/fx/SceneBackground';
import type { FAQItem } from '@/components/ui/FAQ';

// Single source for the four fixed-scope services. Pages, the services index,
// JSON-LD and the homepage grid read from here.
//
// Content rules (founder, 2026-10-09): no ship dates; claims must be true
// today. Deploying a CLIENT's stack into AWS af-south-1 is a real deliverable
// (their account, Cape Town region) and stays; claims about where data goes
// are scoped to what the client's chosen model provider allows.

export type Signature = 'terminal' | 'costRadar' | 'residencyMap' | 'canaryRouter' | 'ragDemo';

export type Service = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  body: string;
  price: string;
  priceZar: number;
  meta: string;
  scene: SceneName;
  /** One distinct background per section, so no two sections on the page share a scene. */
  backdrops: { deliverables: SceneName; signatures: SceneName[]; stack: SceneName; faq: SceneName; cta: SceneName };
  video: { basename: string; caption: string };
  deliverables: string[];
  outcomes: string[];
  stack: string[];
  feedsInto: { module: string; description: string };
  /** Ported interactive visuals from the 2026 agency site, in page order. */
  signatures: Signature[];
  /** Lines for the TerminalStream signature. */
  terminal?: { title: string; lines: string[] };
  faqs: FAQItem[];
};

export const SERVICES: Service[] = [
  {
    slug: 'ai-agent-implementation',
    category: 'AI & Intelligence',
    title: 'AI Agent Implementation',
    summary: 'Production agents on your data, with a human in the loop where it matters.',
    body: 'We design, build and deploy AI agents with LangGraph and Composio — the same stack behind the AI Dev Platform’s Agent Builder. Every project ships with a full execution trace, approval gates on regulated actions and the integrations your team actually uses.',
    price: 'from R95,000',
    priceZar: 95000,
    meta: '6–10 weeks · Fixed scope · ZAR pricing',
    scene: 'webDevProbe',
    backdrops: { deliverables: 'componentsLattice', signatures: ['bioPulse', 'modularLattice'], stack: 'knowledgeGraph', faq: 'acousticWaves', cta: 'starfield' },
    video: { basename: 'agent-builder', caption: 'An agent routes a prompt through tools and a model, and returns a traced response.' },
    deliverables: [
      'Agent workflow design and diagram',
      'LangGraph and Composio stack deployed in your cloud account',
      'Integrations wired to your systems',
      'Full execution trace and audit log for every run',
      'Human-in-the-loop gates on regulated actions',
      'POPIA documentation for the processing the agent performs',
      'Hand-over and on-call training for your team',
    ],
    outcomes: [
      'A live agent handling real work, not a demo',
      'A clean hand-over so your engineers own the system',
      'An audit pack ready for compliance review',
      'A path to production for the next agents in weeks',
    ],
    stack: ['LangGraph', 'Composio', 'Claude / GPT / Llama', 'Postgres + pgvector', 'Langfuse'],
    feedsInto: { module: 'Agent Builder', description: 'Every agent we build becomes a template in Agent Builder, and services clients get free early access.' },
    signatures: ['terminal', 'canaryRouter'],
    terminal: {
      title: 'agent-run · trace',
      lines: [
        'run 7f3a · intent: "refund request for order 10442"',
        'tool.crm.lookup(order=10442) → customer verified',
        'tool.policy.search("refund window") → 3 passages, cited',
        'model.reason → eligible: 14 days, within 30-day window',
        'gate.human_approval required: amount > R5,000',
        'approved by ops@client · 00:41 after request',
        'tool.payments.refund(10442) → done · trace stored',
      ],
    },
    faqs: [
      { q: 'Which model do the agents use?', a: 'The one that fits your data policy. We have shipped on Claude, GPT and open models; regulated workloads can run on a model hosted in your own account so prompts never leave it.' },
      { q: 'Who owns the code?', a: 'You do. The agents, infrastructure code and prompts are committed to your Git repository. There is no lock-in to sonofgraig.' },
      { q: 'How do approval gates work?', a: 'Any action you mark as regulated — payments, account changes, outbound messages — pauses the run and waits for a named person to approve it. The approval is recorded in the trace.' },
    ],
  },
  {
    slug: 'rag-knowledge-base-setup',
    category: 'AI & Intelligence',
    title: 'RAG Knowledge Base Setup',
    summary: 'Ground every AI answer in your documents, with sources you can defend.',
    body: 'We ingest your documents, wire up hybrid retrieval (BM25 plus dense embeddings on self-hosted Qdrant) and deliver an evaluation harness with Ragas. Every answer cites its sources, and every chunk has a lineage trail back to the file it came from.',
    price: 'from R65,000',
    priceZar: 65000,
    meta: '4–6 weeks · Fixed scope · ZAR pricing',
    scene: 'spatialDisplacement',
    backdrops: { deliverables: 'resourcesLattice', signatures: ['knowledgeGraph', 'nebula'], stack: 'dotMatrix', faq: 'acousticWaves', cta: 'latticeTunnel' },
    video: { basename: 'rag-studio', caption: 'Documents become a searchable index, and every answer cites its source.' },
    deliverables: [
      'Ingestion from Google Drive, SharePoint, Notion and S3',
      'Self-hosted Qdrant vector store in your cloud region',
      'Hybrid retrieval (BM25 plus dense embeddings)',
      'Source citation rendered on every answer',
      'Ragas evaluation harness with regression tests',
      'POPIA audit log and PII masking policies',
      'A chat interface or an API — your choice',
    ],
    outcomes: [
      'An “ask anything” tool staff actually trust',
      'Every answer traceable to the source paragraph',
      'Documents stay in your South African cloud region; model calls go to a provider you approve',
      'An evaluation suite that catches regressions before production',
    ],
    stack: ['LlamaIndex', 'Qdrant (self-hosted)', 'BM25 + dense', 'Ragas', 'Claude / GPT / Llama'],
    feedsInto: { module: 'RAG Studio', description: 'Every RAG system we ship becomes a template in RAG Studio, and services clients get free early access.' },
    signatures: ['ragDemo', 'terminal'],
    terminal: {
      title: 'ingest · eval',
      lines: [
        'connect sharepoint://policies → 1,284 files found',
        'parse + chunk → 11,615 chunks · PII masked: 342 fields',
        'embed (bge) + BM25 index → qdrant collection "policies"',
        'ragas eval · 120 golden questions',
        'faithfulness 0.94 · answer relevancy 0.91 · context recall 0.89',
        'regression gate: passed (baseline 0.90)',
        'deploy → chat + API live · lineage stored per chunk',
      ],
    },
    faqs: [
      { q: 'What happens when the documents do not contain the answer?', a: 'The system says so. Answers are written only from retrieved passages, and an empty retrieval produces “I could not find that in your documents” rather than a guess.' },
      { q: 'How is quality measured?', a: 'With a Ragas evaluation suite built from questions your team writes. It runs before every release, and a drop below the agreed baseline blocks the deploy.' },
      { q: 'Where does our data live?', a: 'Documents, embeddings and logs live in a cloud account and region you choose — a South African region by default. Model calls go to the provider you approve, and we document that flow for your POPIA records.' },
    ],
  },
  {
    slug: 'cloud-architecture',
    category: 'Infrastructure',
    title: 'Cloud Architecture & DevOps',
    summary: 'Zero-trust cloud, residency by default, production-grade in weeks.',
    body: 'We design and ship the cloud foundation African enterprises need: Terraform-managed, residency enforced at the network boundary, priced in rand. CI/CD on day one, observability on day two and cost guardrails before week six.',
    price: 'from R120,000',
    priceZar: 120000,
    meta: '6–10 weeks · Fixed scope · ZAR pricing',
    scene: 'dataShards',
    backdrops: { deliverables: 'modularLattice', signatures: ['assemblyLine', 'perspectiveFloor', 'spatialDisplacement', 'hexField'], stack: 'dotMatrix', faq: 'acousticWaves', cta: 'globalSignals' },
    video: { basename: 'cloud-console', caption: 'A control plane with region map, cost gauge and live activity log.' },
    deliverables: [
      'AWS landing zone in af-south-1 with a multi-account organisation',
      'Terraform modules committed to your GitHub',
      'GitHub Actions CI/CD with environment promotions',
      'Kubernetes (EKS) and a Helm chart catalogue',
      'Prometheus and Grafana observability',
      'Data-residency policy enforced at IAM and VPC level',
      'FinOps cost dashboards with anomaly alerts',
      'A runbook for every alert',
    ],
    outcomes: [
      'A reproducible platform your team can extend',
      'A POPIA evidence pack ready for the first audit',
      'Spend predictable enough to forecast quarterly',
      'Deploys that take minutes, not hours',
    ],
    stack: ['Terraform', 'GitHub Actions', 'EKS + Helm', 'Prometheus + Grafana', 'AWS Organizations'],
    feedsInto: { module: 'Cloud & DevOps cluster', description: 'Every landing zone we ship informs the planned Cloud & DevOps product cluster.' },
    signatures: ['terminal', 'residencyMap', 'costRadar', 'canaryRouter'],
    terminal: {
      title: 'terraform apply',
      lines: [
        'terraform init -backend-config=prod.hcl',
        'plan: 42 to add, 0 to change, 0 to destroy',
        'module.vpc.aws_vpc.main: Creating… [af-south-1]',
        'module.eks.aws_eks_cluster.prod: Creating…',
        'aws_rds_cluster.primary: Creating… encrypted at rest',
        'module.waf.aws_wafv2_web_acl.edge: Creating…',
        'Apply complete! Resources: 42 added, 0 changed, 0 destroyed.',
      ],
    },
    faqs: [
      { q: 'Do we have to use AWS?', a: 'No. AWS af-south-1 is our default because it is in Cape Town, but the same patterns ship on Azure (South Africa North) and Google Cloud. Terraform keeps the design portable.' },
      { q: 'Who runs it after hand-over?', a: 'Your team. Everything is code in your repositories with runbooks for every alert. We offer optional support, but the platform does not depend on us.' },
      { q: 'How do you keep costs under control?', a: 'Budgets and anomaly alerts are part of the build, not an afterthought, and every resource is tagged to a team so spend is attributable from day one.' },
    ],
  },
  {
    slug: 'ai-governance-audit',
    category: 'Compliance',
    title: 'AI Governance & Ethics Audit',
    summary: 'Make your AI explainable, fair and POPIA-ready, with a board-room report at the end.',
    body: 'We audit your existing AI systems against POPIA sections 11, 19 and 72: bias detection with Fairlearn, SHAP explainability, EU AI Act risk classification, and a prioritised remediation plan signed by our Information Officer.',
    price: 'from R45,000',
    priceZar: 45000,
    meta: '3–4 weeks · Fixed scope · ZAR pricing',
    scene: 'sonarEcho',
    backdrops: { deliverables: 'hexField', signatures: ['collisionBeams', 'matrixRain'], stack: 'dotMatrix', faq: 'acousticWaves', cta: 'tacticalCommand' },
    video: { basename: 'governance-hub', caption: 'POPIA reporting with bias, drift and explainability checks (illustrative values).' },
    deliverables: [
      'Algorithmic bias audit with Fairlearn across protected groups',
      'SHAP explainability reports for each production model',
      'POPIA sections 11, 19 and 72 gap analysis',
      'EU AI Act risk classification per system',
      'Data-flow map with a PII inventory',
      'Remediation plan prioritised by effort and risk',
      'Board-ready summary signed by our Information Officer',
    ],
    outcomes: [
      'A clear, evidenced answer to “are we POPIA-compliant?”',
      'A plain-language explainability report for non-technical stakeholders',
      'A remediation backlog your engineers can ship',
      'An audit trail you can hand to a regulator',
    ],
    stack: ['Fairlearn', 'SHAP', 'Evidently', 'Langfuse', 'POPIA s11 / 19 / 72', 'EU AI Act'],
    feedsInto: { module: 'Governance Hub', description: 'Every audit we run becomes a check in Governance Hub, and services clients get free early access.' },
    signatures: ['residencyMap', 'terminal'],
    terminal: {
      title: 'audit · fairness + explainability',
      lines: [
        'load model credit_scoring_v3 · 48,210 decisions',
        'fairlearn.MetricFrame(by=["gender","race","age_band"])',
        'demographic parity diff: 0.031 (threshold 0.05) · pass',
        'equalized odds diff: 0.072 (threshold 0.05) · FLAG',
        'shap.TreeExplainer → top drivers: income, tenure, arrears',
        'popia s72 · transborder flow found: model API (US) · DPA required',
        'report → 6 findings · 2 high · signed by Information Officer',
      ],
    },
    faqs: [
      { q: 'Will the audit recommend your products?', a: 'Not by design. “Your system is fine” is as valid an outcome as “replace it”, and most audits do not end in a product sale.' },
      { q: 'What do we need to provide?', a: 'Access to the model or its decision logs, the data dictionary, and an hour with the people who own the system. We work read-only.' },
      { q: 'Is this a legal opinion?', a: 'No. It is a technical and compliance audit. Where findings have legal implications we say so, and you can take the report to your legal counsel.' },
    ],
  },
];

export function getService(slug: string) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}
