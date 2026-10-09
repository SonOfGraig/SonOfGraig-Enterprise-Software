import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'zero-trust-cloud-architecture-african-enterprise',
  title: 'Zero-Trust Cloud Architecture for Regulated African Enterprise',
  excerpt:
    'Zero-trust is widely cited and rarely implemented well. Here is what it means concretely on AWS af-south-1 — identity, network, and continuous attestation — with POPIA residency enforced at the boundary.',
  category: 'Engineering',
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  readingTime: 8,
  author: TUMISO,
  primaryKeyword: 'zero-trust AWS architecture',
  keywords: [
    'zero-trust cloud',
    'AWS landing zone af-south-1',
    'FinOps ZAR',
    'Terraform IaC',
    'POPIA cloud compliance',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover on zero-trust cloud architecture for regulated African enterprise, over a blue node-lattice motif.',
  bodyHtml: `
    <p class="lede">"Zero-trust" is one of the most cited and least implemented ideas in enterprise cloud. The slide is easy; the architecture is not. For regulated African enterprise the bar is higher still, because the design has to satisfy POPIA residency and produce continuous compliance evidence on top of the security model. This is what zero-trust means concretely on AWS af-south-1.</p>

    <h2 id="what-zero-trust-means">What zero-trust actually means</h2>
    <p class="answer-block">Zero-trust means no implicit trust is granted based on network location. Every request — between services, from a user, across accounts — is authenticated, authorised, and encrypted regardless of whether it originates "inside" the network. The old model trusted anything inside the perimeter; zero-trust treats the perimeter as already breached and verifies every hop. In practice it rests on three pillars: strong identity, segmented network, and continuous verification.</p>

    <h2 id="identity">Pillar 1: identity as the control plane</h2>
    <p>In a zero-trust design, identity replaces network location as the primary control. That means a multi-account AWS organisation with least-privilege IAM, short-lived credentials rather than long-lived keys, and every service-to-service call carrying a verifiable identity. The blast radius of a compromised credential is bounded by the principle that it could only ever do the narrow thing its role permitted.</p>

    <h2 id="network">Pillar 2: segmented network, encrypted everywhere</h2>
    <p>Network segmentation via VPC design, private subnets, and explicit egress control means a workload can only reach what it has been deliberately allowed to reach. Traffic is encrypted in transit end to end, not just at the edge. For POPIA specifically, egress control is also where residency is enforced: the network is configured so personal data physically cannot leave af-south-1 without an explicit, audited exception. Residency becomes a network property, not a policy hope.</p>

    <h2 id="attestation">Pillar 3: continuous compliance attestation</h2>
    <p class="answer-block">The difference between security and compliance is evidence over time. A zero-trust architecture for regulated enterprise must continuously attest that its controls hold — that data is encrypted, that it lives in af-south-1, that access is least-privilege — and produce that evidence on demand. Configuration drifts the moment it ships; without continuous attestation, you lose certification at the first audit. This is the leg most "zero-trust" implementations skip.</p>

    <h2 id="iac">Why all of this lives in code</h2>
    <p>None of the above is sustainable if it is click-configured. The architecture is defined in Terraform so it is reproducible, reviewable, and auditable — the infrastructure is a pull request, not a console session. CI/CD via GitHub Actions promotes changes through environments with the same controls at each stage. When the auditor asks "how is this configured," the answer is a versioned file, not a screenshot.</p>

    <h2 id="finops">FinOps in rand, because the bill is in dollars</h2>
    <p>Cloud bills arrive in USD; South African budgets are in ZAR. A zero-trust architecture for African enterprise is incomplete without FinOps that speaks rand — cost dashboards and anomaly detection denominated in the currency the CFO signs in. The currency logic is the same one we apply to product pricing, argued in <a href="/blog/why-we-price-enterprise-ai-in-rand">the rand-pricing piece</a>.</p>

    <h2 id="how-we-build">How we build it</h2>
    <p>Our <a href="/services/cloud-architecture">Cloud Architecture &amp; DevOps</a> engagement ships a zero-trust AWS landing zone in af-south-1 — Terraform IaC, GitHub Actions CI/CD, observability, FinOps in ZAR, and residency enforced at the IAM and VPC boundary. The residency detail is in <a href="/blog/aws-af-south-1-data-residency">the data residency explainer</a>, and our standing posture is on <a href="/security">the security page</a>.</p>
  `,
};

export default post;
