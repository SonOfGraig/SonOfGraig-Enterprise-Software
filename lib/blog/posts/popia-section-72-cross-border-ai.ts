import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'popia-section-72-cross-border-ai',
  title: 'POPIA Section 72 and Cross-Border AI: Can You Legally Use OpenAI in South Africa?',
  excerpt:
    'Section 72 of POPIA governs sending personal information outside South Africa. Here is what it actually requires of an AI architecture that calls a US-hosted model — and the patterns that keep you compliant.',
  category: 'Compliance',
  datePublished: '2026-05-24',
  dateModified: '2026-05-24',
  readingTime: 9,
  author: TUMISO,
  primaryKeyword: 'POPIA Section 72 cross-border AI',
  keywords: [
    'POPIA Section 72',
    'cross-border data transfer South Africa',
    'using OpenAI in South Africa',
    'POPIA AI compliance',
    'data residency AI',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover on POPIA Section 72 and cross-border AI transfers, over a blue node-lattice motif.',
  faq: [
    {
      question: 'Does Section 72 ban using OpenAI or other US-hosted models?',
      answer:
        'No. Section 72 does not ban cross-border transfers; it conditions them. You may transfer personal information abroad if one of the listed grounds applies — for example the data subject consents, the transfer is necessary to perform a contract, or the recipient is bound by binding rules or contract clauses providing an adequate level of protection. The practical path is a data processing agreement with adequate-protection clauses plus data minimisation.',
    },
    {
      question: 'Is anonymising the data before the API call enough to avoid POPIA?',
      answer:
        'If data is genuinely de-identified so that no one can be re-identified, it falls outside POPIA. The bar is high: pseudonymisation (replacing names with tokens you can reverse) is not de-identification. True anonymisation that survives Section 72 review usually requires removing or generalising enough fields that re-identification is not reasonably possible.',
    },
    {
      question: 'Does hosting the model in af-south-1 remove the Section 72 question entirely?',
      answer:
        'For the inference step, yes — if the model runs in AWS af-south-1 and the data never leaves South Africa, there is no cross-border transfer to justify. That is why we design for in-region hosting wherever a suitable model exists. See our data residency explainer for what "hosted in South Africa" actually means.',
    },
  ],
  bodyHtml: `
    <p class="lede">The most common compliance question we get from South African enterprises is some version of "are we allowed to send our data to OpenAI?" The answer is more nuanced than yes or no, and it lives in Section 72 of the Protection of Personal Information Act. This piece explains what Section 72 requires, the grounds that make a cross-border transfer lawful, and the architectural patterns that keep an AI system on the right side of it. It is general guidance, not legal advice.</p>

    <h2 id="what-72-says">What Section 72 actually requires</h2>
    <p class="answer-block">Section 72 prohibits transferring personal information about a data subject to a third party in a foreign country unless one of several grounds applies: the recipient is subject to a law, binding corporate rules, or a binding agreement that provides an adequate level of protection; the data subject consents; the transfer is necessary to perform or conclude a contract in the data subject's interest; or the transfer benefits the data subject and consent is not reasonably practicable. The operative idea is adequacy of protection at the destination, not a prohibition on movement.</p>
    <p>For an AI system, the "transfer" is the moment a prompt containing personal information leaves South Africa for a model endpoint hosted elsewhere. That is the event Section 72 cares about. Everything in the architecture flows from deciding whether — and how — that event happens.</p>

    <h2 id="three-patterns">Three architectural patterns, three risk profiles</h2>
    <p>There are essentially three ways to design around Section 72, in descending order of cleanliness.</p>
    <p><strong>Pattern A — keep inference in-region.</strong> Run the model in AWS af-south-1 (or another South African facility) so the prompt never crosses a border. There is no cross-border transfer to justify, so Section 72 simply does not engage for the inference step. This is the pattern we design for; the reasoning is in <a href="/blog/aws-af-south-1-data-residency">the data residency explainer</a>.</p>
    <p><strong>Pattern B — transfer under an adequate-protection agreement.</strong> If a workload genuinely needs a model only available abroad, the transfer can be made lawful with a data processing agreement that binds the recipient to adequate protection, combined with strict data minimisation so only the fields the task requires ever leave. This is viable but adds contractual and audit overhead.</p>
    <p><strong>Pattern C — de-identify before transfer.</strong> If the data sent abroad is genuinely anonymised so re-identification is not reasonably possible, it is no longer personal information and Section 72 does not apply. The bar is high and easy to get wrong — tokenising names is not anonymisation.</p>

    <h2 id="minimisation">Data minimisation is the cheapest control you are not using</h2>
    <p>Whatever pattern you choose, sending less data is the highest-leverage control available. Most prompts carry far more personal information than the task needs — a whole customer record when the model only needs an account status, a full document when a single clause is in question. Minimising the payload reduces both the Section 72 surface and the blast radius of any leak. It is also free.</p>

    <h2 id="audit">What the audit trail has to show</h2>
    <p class="answer-block">Whatever you decide, you must be able to prove it after the fact. A defensible AI system logs, per inference: who initiated it, what data was included, which model and region served it, and the lawful basis for any cross-border element. If you cannot answer those four in one query, you have a logging system, not a compliance posture. This is exactly what a Governance Hub is for, as we argue in <a href="/blog/ai-governance-is-a-product-feature">the governance piece</a>.</p>

    <h2 id="how-we-help">How we help</h2>
    <p>Where a suitable in-region model exists, keeping inference in South Africa means Section 72 does not engage for the model call at all. Where a workload needs more, our <a href="/services/ai-governance-audit">AI Governance &amp; Ethics Audit</a> maps every transfer against Sections 11, 19, and 72 and produces a board-ready remediation roadmap signed by a registered Information Officer. The full statutory walkthrough is in <a href="/blog/popia-sections-11-19-72-and-ai-architecture">the POPIA sections deep-dive</a>, and how we handle personal information ourselves is on <a href="/popia">the POPIA page</a>.</p>
  `,
};

export default post;
