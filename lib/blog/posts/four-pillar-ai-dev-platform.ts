import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'four-pillar-ai-dev-platform',
  title: 'RAG, Agents, Fine-Tuning, Governance: The Four Pillars of an Enterprise AI Dev Platform',
  seoTitle: 'Four Pillars of an Enterprise AI Dev Platform | sonofgraig',
  excerpt:
    'When buyers ask "is your AI platform a RAG product or an agent product?" the answer is yes. Here is why all four pillars belong on one platform and how to choose between them per workload.',
  category: 'Product',
  datePublished: '2026-05-29',
  dateModified: '2026-05-29',
  readingTime: 9,
  author: TUMISO,
  primaryKeyword: 'enterprise AI development platform',
  keywords: [
    'RAG vs fine-tuning',
    'AI agent platform enterprise',
    'AI governance hub',
    'RAG Studio',
    'Agent Builder',
    'AI Dev Platform',
  ],
  heroComposition: 'BlogHeroPlatform',
  motionComposition: 'PlatformCompoundingLight',
  heroAlt:
    'Four-column platform diagram showing RAG Studio, Agent Builder, Fine-Tuning Ops, and Governance Hub sharing a common identity, observability, and audit base layer.',
  bodyHtml: `
    <p class="lede">The fastest way to misjudge an enterprise AI platform is to evaluate it by its loudest feature. Buyers learn the categories — RAG, agents, fine-tuning, governance — and then ask the vendor to pick one. The honest answer is that a serious enterprise stack needs all four, because each one solves a problem the others cannot. This piece walks through what each pillar is for, how they share a base layer, and how to decide which one a given workload starts on.</p>

    <h2 id="pillar-1">Pillar 1: RAG Studio — grounding output in your own documents</h2>
    <p class="answer-block">Retrieval-Augmented Generation grounds a language model's response in a specific corpus of documents that the model never trained on. The model retrieves the relevant passages at query time, includes them in the prompt, and is instructed to answer only from what it retrieved. RAG is the lowest-risk way to put generative AI into an enterprise workflow because it solves the hallucination problem at the retrieval layer rather than asking the model to be careful.</p>
    <p>The technical work is not the prompting — it is the retrieval. Hybrid search (lexical + dense vector) outperforms either method alone on enterprise documents because exact-string matching catches policy numbers, case IDs, and proper nouns that semantic search misses, while semantic search catches paraphrases. A reranker on top of the hybrid index lifts answer quality further, particularly for long-context queries.</p>
    <p>Use RAG when the source of truth is documents (policy manuals, contracts, claim files, case law, knowledge base articles, internal wikis) and the cost of a wrong answer is high enough that "trained on similar things" is not good enough. Our managed product is <a href="/platform/ai-dev-platform">RAG Studio</a>, and the services equivalent is <a href="/services/rag-knowledge-base-setup">RAG Knowledge Base Setup</a>.</p>

    <h2 id="pillar-2">Pillar 2: Agent Builder — orchestrating multi-step work</h2>
    <p class="answer-block">An AI agent is a workflow that loops: the language model proposes a tool call, a tool runs, the result feeds back into the model, the model proposes the next step, and the loop terminates on a stop condition. Agents are the right pattern when the work has multiple steps that depend on each other and on external systems — pulling a customer record, checking eligibility, drafting a response, filing the outcome. RAG answers one question; an agent completes a task.</p>
    <p>Production agents need three things RAG does not. They need a typed tool catalogue so the model cannot call a tool with malformed arguments. They need a stop condition that does not depend on the model's discretion — a hard step budget and a human-in-the-loop gate for irreversible actions. And they need replayability: the entire trace of (prompt, tool call, result) tuples persisted so a failure can be reproduced, a regression can be debugged, and an audit query can be answered.</p>
    <p>Use agents when the workflow is genuinely multi-step and the cost of building one-off integrations between systems exceeds the cost of letting a model orchestrate them. Our managed product is <a href="/platform/ai-dev-platform">Agent Builder</a>; the services equivalent is <a href="/services/ai-agent-implementation">AI Agent Implementation</a>.</p>

    <h2 id="pillar-3">Pillar 3: Fine-Tuning Ops — specialising the model itself</h2>
    <p class="answer-block">Fine-tuning continues training a base model on a curated dataset so that its weights better fit a specific domain, style, or task. It is the right pattern when the model needs to behave differently from its baseline — different tone, different output format, different vocabulary — in a way that no amount of prompting reliably produces. It is the wrong pattern when the problem is "the model does not know about my documents," because that is what RAG is for.</p>
    <p>Production fine-tuning is mostly a data problem. The training set needs to be representative, deduplicated against the evaluation set, and screened for personal information that would breach Section 11 if used as training data without a basis. The evaluation harness needs to be in place before the first training run, because without it there is no way to know whether the next checkpoint is better or worse than the last.</p>
    <p>The most common mistake is to reach for fine-tuning when RAG would solve the problem. Fine-tuning costs more, takes longer, is harder to update when the underlying data changes, and creates a model artefact that itself becomes subject to POPIA Section 11 because it now encodes information derived from personal data. Default to RAG; reach for fine-tuning when you can articulate why prompting and retrieval will not get you there.</p>

    <h2 id="pillar-4">Pillar 4: Governance Hub — the layer that turns the other three into a platform</h2>
    <p class="answer-block">Governance is the pillar buyers undervalue at procurement and over-spend on six months later. A Governance Hub gives the platform owner a single surface for the access controls, audit logs, evaluation metrics, bias monitoring, and explainability artefacts that the other three pillars produce. Without it, each cluster has its own log format and its own policy surface, and the compliance officer has to assemble the picture by hand.</p>
    <p>The minimum viable Governance Hub answers four questions in one query: who used what, on which data, with what model, under which lawful basis. Anything that cannot answer all four in one query is not a Governance Hub — it is a logging system with marketing copy. The bias and explainability layer (Fairlearn for fairness metrics, SHAP for per-prediction attribution) sits on top of that base. Both are required outputs in our standard <a href="/services/ai-governance-audit">AI Governance &amp; Ethics Audit</a>.</p>
    <p>Governance is also where the platform earns its place against a build-it-yourself alternative. A team building one cluster at a time will under-invest in governance until an incident forces it. A platform that ships all four pillars together cannot under-invest in governance because the other three pillars feed it.</p>

    <h2 id="comparison">RAG vs Fine-Tuning vs Agents — when to use each</h2>
    <table class="sg-comparison">
      <thead>
        <tr><th>If the problem is…</th><th>Start with</th><th>Cost profile</th><th>Update cycle</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Answer questions over our document corpus accurately</td>
          <td><strong>RAG</strong></td>
          <td>Low — embedding + storage + inference</td>
          <td>Minutes (re-index)</td>
        </tr>
        <tr>
          <td>Execute a multi-step workflow across our systems</td>
          <td><strong>Agents</strong></td>
          <td>Medium — agent loop + tool integration + observability</td>
          <td>Hours (deploy new tool)</td>
        </tr>
        <tr>
          <td>Produce output in our domain's tone, format, or vocabulary that prompting cannot reliably elicit</td>
          <td><strong>Fine-tuning</strong></td>
          <td>High — dataset curation + training + evaluation</td>
          <td>Days to weeks (re-train)</td>
        </tr>
        <tr>
          <td>The model must reason over data that changes daily</td>
          <td><strong>RAG</strong> (never fine-tune on it)</td>
          <td>Low</td>
          <td>Minutes</td>
        </tr>
        <tr>
          <td>Prove to the regulator who used what, on which data, with which model, under which basis</td>
          <td><strong>Governance Hub</strong></td>
          <td>Built in (platform-level)</td>
          <td>Continuous</td>
        </tr>
      </tbody>
    </table>

    <h2 id="shared-base-layer">Why all four pillars share a base layer</h2>
    <p>Each pillar needs an identity layer, an observability layer, and an audit layer. If those are duplicated per pillar, the platform grows three operational burdens for every product capability it adds. The architectural commitment behind the AI Dev Platform is that the four pillars share one identity provider, one observability stack, and one POPIA-aligned audit log. That choice makes the Governance Hub possible — and Governance Hub is what makes the other three pillars defensible at the procurement table.</p>
    <p>This is also why the four-pillar shape is not arbitrary. The pillars are the smallest set that covers the failure modes an enterprise AI deployment actually faces. RAG handles "the model does not know our content." Agents handle "the model cannot reach our systems." Fine-tuning handles "the model does not sound like us." Governance handles "we cannot prove what happened." Drop any one of them and the platform is missing a category of failure it will eventually have to answer for.</p>

    <h2 id="how-to-start">How to start</h2>
    <p>The fastest path into production is rarely the most fashionable one. Most enterprise AI projects we work on should start with RAG, instrument the Governance Hub against the very first retrieval, and only add agents when the workflow demands it. Fine-tuning comes last, if at all, because the cases that genuinely need it are narrower than the discourse suggests.</p>
    <p>RAG Studio is the first module available to early-access customers; Agent Builder is in development, and ML Ops and the Governance Hub are planned. We do not publish ship dates — each module is announced on the <a href="/changelog">changelog</a> when it is actually released, and the current status of every module is on the <a href="/platform/ai-dev-platform">AI Dev Platform page</a>. The strategy context is in <a href="/blog/why-africa-needs-its-own-enterprise-ai-platform">the pillar piece</a>, and the compliance posture that the Governance Hub is built around is in <a href="/blog/popia-sections-11-19-72-and-ai-architecture">the POPIA deep-dive</a>.</p>
  `,
};

export default post;
