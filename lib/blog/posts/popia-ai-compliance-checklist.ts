import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'popia-ai-compliance-checklist',
  title: "The Compliance Officer's Checklist for Deploying AI Under POPIA",
  excerpt:
    'A practical, section-by-section checklist for signing off an AI system under POPIA — lawful basis, security safeguards, cross-border transfers, and the audit evidence you will be asked to produce.',
  category: 'Compliance',
  datePublished: '2026-05-13',
  dateModified: '2026-05-13',
  readingTime: 8,
  author: TUMISO,
  primaryKeyword: 'POPIA AI compliance checklist',
  keywords: [
    'POPIA compliance checklist',
    'AI compliance South Africa',
    'POPIA Information Officer',
    'AI governance audit',
    'deploying AI under POPIA',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover with a POPIA AI compliance checklist for compliance officers, over a blue node-lattice motif.',
  faq: [
    {
      question: 'Who signs off an AI system under POPIA?',
      answer:
        'Accountability sits with the responsible party, operationalised through the registered Information Officer. In practice a compliance officer or DPO assembles the evidence — lawful basis, security safeguards, transfer grounds, and audit trail — and the Information Officer accepts the residual risk.',
    },
    {
      question: 'Does POPIA require a data protection impact assessment for AI?',
      answer:
        'POPIA does not use the GDPR term "DPIA," but the Regulator expects risk to be assessed and documented for higher-risk processing. For AI that makes or supports decisions about people, a documented impact assessment is the practical standard, covering bias, explainability, and the lawful basis.',
    },
    {
      question: 'What is the penalty for getting POPIA wrong?',
      answer:
        'POPIA provides for administrative fines up to R10 million and, for certain offences, criminal liability including imprisonment. Beyond penalties, the reputational and contractual fallout of a breach in a regulated sector is usually the larger cost.',
    },
  ],
  bodyHtml: `
    <p class="lede">Most AI projects stall not in engineering but at sign-off, when a compliance officer is asked to approve something they were not involved in designing. This checklist is written for that moment. It walks the POPIA obligations that an AI system has to satisfy, in the order you should check them, and names the evidence you will be asked to produce. It is general guidance, not legal advice.</p>

    <h2 id="lawful-basis">1. Lawful basis (Section 11)</h2>
    <p class="answer-block">Before anything else, establish the lawful basis for every piece of personal information the system processes — including training data, prompts, and retrieved documents. Section 11 requires processing to rest on a ground such as consent, contractual necessity, legal obligation, or legitimate interest. The checklist item: for each data flow, name the ground and the evidence for it. If you cannot name the ground, you cannot deploy.</p>

    <h2 id="purpose">2. Purpose specification and minimisation</h2>
    <p>POPIA requires that data be collected for a specific purpose and not used beyond it, and that you process the minimum necessary. For AI this bites hardest on prompts: systems routinely send a whole customer record when the task needs one field. The checklist item: confirm each inference sends only the data the task requires, and that the AI use was within the purpose the data was collected for.</p>

    <h2 id="security">3. Security safeguards (Section 19)</h2>
    <p class="answer-block">Section 19 requires appropriate technical and organisational measures to secure personal information — encryption in transit and at rest, access controls, and protection of any vector store or index that now holds embeddings of personal data. The checklist item: confirm the vector database, the document store, and the logs are encrypted, access-controlled, and in-region. Embeddings derived from personal data are themselves personal data.</p>

    <h2 id="cross-border">4. Cross-border transfers (Section 72)</h2>
    <p>If any personal information leaves South Africa — most commonly to an offshore model endpoint — Section 72 requires a ground: adequate-protection agreement, consent, or contractual necessity. The cleanest answer is to keep inference in-region so the question never arises. The checklist item: confirm where model inference runs, and if it is offshore, produce the transfer ground. Full detail is in <a href="/blog/popia-section-72-cross-border-ai">the Section 72 piece</a>.</p>

    <h2 id="bias">5. Bias, explainability, and automated decisions</h2>
    <p>Where the system makes or materially supports decisions about people, you need evidence that it has been tested for bias across protected groups and that individual decisions can be explained. In practice this means fairness metrics (e.g. Fairlearn) and per-prediction attribution (e.g. SHAP), documented. The checklist item: produce a bias report and an explainability artefact for each decisioning model.</p>

    <h2 id="audit">6. The audit trail</h2>
    <p class="answer-block">Finally, the system must be able to answer, after the fact, four questions in one query: who used what, on which data, with which model, under which lawful basis. If those cannot be answered, none of the items above can be proven when it matters. The checklist item: confirm the audit log captures all four per inference. This is what a Governance Hub exists to provide — see <a href="/blog/ai-governance-is-a-product-feature">the governance piece</a>.</p>

    <h2 id="how-we-help">Getting to sign-off faster</h2>
    <p>Our <a href="/services/ai-governance-audit">AI Governance &amp; Ethics Audit</a> runs this checklist against an existing or planned system, maps the gaps against Sections 11, 19, and 72, and produces a board-ready report signed by a registered Information Officer. The statutory background is in <a href="/blog/popia-sections-11-19-72-and-ai-architecture">the POPIA sections deep-dive</a>, and our standing posture is on <a href="/popia">the POPIA page</a>.</p>
  `,
};

export default post;
