import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'aws-af-south-1-data-residency',
  title: 'Data Residency in AWS af-south-1: What "Hosted in South Africa" Actually Means',
  excerpt:
    '"Hosted in South Africa" is a claim worth interrogating. Here is what genuine in-region residency requires across compute, storage, model inference, logs, and backups — and where it usually leaks.',
  category: 'Compliance',
  datePublished: '2026-05-16',
  dateModified: '2026-05-16',
  readingTime: 7,
  author: TUMISO,
  primaryKeyword: 'AWS af-south-1 data residency',
  keywords: [
    'data residency South Africa',
    'AWS Cape Town region',
    'POPIA data residency',
    'in-region AI hosting',
    'af-south-1',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover explaining AWS af-south-1 data residency for South African AI, over a blue node-lattice motif.',
  faq: [
    {
      question: 'Where is AWS af-south-1 located?',
      answer:
        'af-south-1 is the AWS Africa (Cape Town) region, launched in 2020. Workloads provisioned there run on infrastructure physically located in South Africa, which is the basis for in-region data residency claims.',
    },
    {
      question: 'Does using af-south-1 automatically make me POPIA-compliant?',
      answer:
        'No. Region choice removes the cross-border transfer question for data kept in-region, but POPIA compliance also requires lawful processing (Section 11) and security safeguards (Section 19). Residency is necessary, not sufficient.',
    },
    {
      question: 'Do all AWS services exist in af-south-1?',
      answer:
        'Most core services do, but not every managed service or model endpoint is available in every region. Genuine residency means verifying that every component your workload touches — including model inference and logging — is available and configured in-region, rather than silently falling back to another region.',
    },
  ],
  bodyHtml: `
    <p class="lede">"Hosted in South Africa" appears on a lot of vendor pages. It is a claim worth interrogating, because residency is not a single switch — it is a property that has to hold across compute, storage, model inference, logs, backups, and every managed service in between. A system can be 95% in-region and still leak the 5% that matters. This is what genuine residency in AWS af-south-1 requires, and where it usually breaks.</p>

    <h2 id="the-region">What af-south-1 is</h2>
    <p class="answer-block">af-south-1 is the AWS Africa (Cape Town) region, opened in 2020. Resources provisioned there run on infrastructure physically located in South Africa. That physical location is what underpins a data residency claim and, for POPIA Section 72 purposes, means data kept in-region is never transferred across a border — so the cross-border-transfer question simply does not arise for that data.</p>

    <h2 id="where-it-leaks">Where residency quietly leaks</h2>
    <p>Most residency failures are not the primary database — that part teams get right. The leaks are in the components nobody puts on the architecture diagram:</p>
    <ul>
      <li><strong>Model inference.</strong> The database is in Cape Town but the LLM endpoint is in Virginia. Every prompt is a cross-border transfer. This is the most common leak in AI systems specifically.</li>
      <li><strong>Logs and traces.</strong> Application logs containing personal information shipped to a logging service in another region.</li>
      <li><strong>Backups and snapshots.</strong> Replicated to a second region for durability — sensible for availability, a residency breach if that region is offshore.</li>
      <li><strong>Managed-service fallback.</strong> A service unavailable in af-south-1 silently served from the nearest region.</li>
    </ul>
    <p>Genuine residency means auditing every one of these and confirming it stays in-region — or making the cross-border element lawful and documented under Section 72, as covered in <a href="/blog/popia-section-72-cross-border-ai">the Section 72 piece</a>.</p>

    <h2 id="inference-in-region">Keeping model inference in-region</h2>
    <p>For AI systems, the inference step is the residency battleground. The clean pattern is to run the model in af-south-1 so prompts never leave the country. That is why we design for in-region inference wherever a suitable model exists — it removes the single largest cross-border surface an AI workload has. Where a workload genuinely needs a model only available offshore, the transfer is minimised and made lawful by agreement rather than left implicit.</p>

    <h2 id="residency-not-compliance">Residency is necessary, not sufficient</h2>
    <p class="answer-block">Choosing af-south-1 removes the cross-border question, but it does not make a system POPIA-compliant on its own. POPIA still requires a lawful basis for processing (Section 11) and appropriate security safeguards (Section 19). Residency is one leg of a three-legged stool; the other two are covered in <a href="/blog/popia-sections-11-19-72-and-ai-architecture">the POPIA sections deep-dive</a>. Treating residency as the whole answer is a common and expensive mistake.</p>

    <h2 id="how-we-build">How we build for residency</h2>
    <p>The landing zones we build for clients default to af-south-1 primary, with compute, storage, inference, logs, and backups verified in-region, and residency enforced at the IAM and VPC boundary rather than left to convention. The full build is in <a href="/services/cloud-architecture">Cloud Architecture &amp; DevOps</a>, and the real status of our own platform controls is on <a href="/security">the security page</a>.</p>
  `,
};

export default post;
