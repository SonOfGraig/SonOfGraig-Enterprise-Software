import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'rag-vs-fine-tuning-when-to-ground-vs-train',
  title: 'RAG vs Fine-Tuning: When to Ground a Model and When to Train It',
  seoTitle: 'RAG vs Fine-Tuning: When to Ground vs Train | sonofgraig',
  seoDescription: 'RAG or fine-tuning? A practical guide to when you should ground a model in your documents and when it is worth training one, for enterprise teams.',
  excerpt:
    'The most expensive mistake in enterprise AI is fine-tuning a model to solve a retrieval problem. Here is a decision framework for choosing between grounding and training, workload by workload.',
  category: 'Engineering',
  datePublished: '2026-05-27',
  dateModified: '2026-05-27',
  readingTime: 8,
  author: TUMISO,
  primaryKeyword: 'RAG vs fine-tuning',
  keywords: [
    'retrieval augmented generation',
    'fine-tuning vs RAG',
    'when to fine-tune an LLM',
    'enterprise RAG',
    'LLM customization',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover for a guide on choosing between RAG and fine-tuning, over a blue node-lattice motif.',
  faq: [
    {
      question: 'Is RAG cheaper than fine-tuning?',
      answer:
        'Almost always, yes. RAG adds embedding, storage, and retrieval cost at query time but needs no training run, and you update it by re-indexing in minutes. Fine-tuning carries dataset curation, training compute, and an evaluation harness as fixed costs, and every data change means re-training.',
    },
    {
      question: 'Can I use both RAG and fine-tuning together?',
      answer:
        'Yes, and mature systems often do. Fine-tune a model for tone, format, or a narrow task, then use RAG to ground its answers in current documents. The two solve different problems: fine-tuning changes how the model behaves; RAG changes what it knows at query time.',
    },
    {
      question: 'Does fine-tuning create POPIA obligations?',
      answer:
        'It can. If personal information appears in the training set, the resulting model encodes information derived from that data, which brings POPIA Section 11 (lawful processing) into scope for the model artefact itself. RAG keeps source documents outside the model, which is usually the cleaner posture.',
    },
  ],
  bodyHtml: `
    <p class="lede">Two techniques dominate enterprise AI customization, and they are constantly confused for each other. Retrieval-Augmented Generation (RAG) changes what a model knows at the moment you ask it a question. Fine-tuning changes how the model behaves by adjusting its weights. They are not competitors — they solve different problems — but teams reach for the expensive one to fix a problem the cheap one already solves. This is a decision framework for picking correctly.</p>

    <h2 id="definitions">What each technique actually does</h2>
    <p class="answer-block">RAG retrieves relevant passages from your own document corpus at query time and includes them in the prompt, instructing the model to answer only from what it retrieved. Fine-tuning continues training a base model on a curated dataset so its weights better fit a specific domain, tone, or task. RAG injects knowledge; fine-tuning shapes behaviour. The single clearest rule: if the problem is "the model does not know our content," use RAG; if the problem is "the model does not behave the way we need," consider fine-tuning.</p>
    <p>The confusion is understandable because both make a model "better at our use case." But the mechanism differs entirely. A RAG system can answer a question about a contract signed this morning, because the contract is in the index. A fine-tuned model cannot, unless you re-train it on that contract — at which point you have built the world's slowest, most expensive database.</p>

    <h2 id="default-to-rag">Why the default should be RAG</h2>
    <p>For the large majority of enterprise workloads — answering questions over policies, contracts, claim files, knowledge bases, case law — RAG is the right starting point. It is cheaper, it updates in minutes by re-indexing, it keeps your source documents outside the model where they are easier to govern, and it makes every answer traceable to the passage that produced it. That last property is what makes RAG defensible in a regulated environment: you can show the regulator the source.</p>
    <p>The engineering effort in RAG is not the prompting — it is the retrieval. Hybrid search (lexical plus dense vector) beats either method alone on enterprise documents, because exact-string matching catches policy numbers and proper nouns that semantic search misses, while semantic search catches paraphrases. We go deeper on retrieval quality in <a href="/blog/rag-evaluation-defensible-citations">the RAG evaluation piece</a>.</p>

    <h2 id="when-fine-tune">When fine-tuning earns its cost</h2>
    <p class="answer-block">Fine-tuning is the right choice when the model needs to behave differently from its baseline in a way prompting cannot reliably produce: a consistent house tone across thousands of outputs, a strict structured-output format, a specialised vocabulary, or a narrow classification task where a smaller fine-tuned model beats a large general one on latency and cost. The test is simple — if you can articulate why retrieval and prompting will not get you there, fine-tuning may be justified.</p>
    <p>Production fine-tuning is mostly a data problem, not a training problem. The dataset must be representative, deduplicated against the evaluation set, and screened for personal information. The evaluation harness has to exist before the first training run, because without it you cannot tell whether the next checkpoint is better or worse than the last. Most teams underestimate the data work and overestimate the modelling work.</p>

    <h2 id="comparison">RAG vs fine-tuning at a glance</h2>
    <table class="sg-comparison">
      <thead>
        <tr><th>Dimension</th><th>RAG</th><th>Fine-tuning</th></tr>
      </thead>
      <tbody>
        <tr><td>Solves</td><td>Model does not know our content</td><td>Model does not behave as we need</td></tr>
        <tr><td>Update cycle</td><td>Minutes (re-index)</td><td>Days to weeks (re-train)</td></tr>
        <tr><td>Cost profile</td><td>Low — embedding + storage + inference</td><td>High — data + compute + eval</td></tr>
        <tr><td>Data freshness</td><td>Live</td><td>Frozen at training time</td></tr>
        <tr><td>Auditability</td><td>Cites source passage</td><td>Opaque weight changes</td></tr>
        <tr><td>POPIA posture</td><td>Source data stays external</td><td>Model may encode personal data</td></tr>
      </tbody>
    </table>

    <h2 id="hybrid">The hybrid pattern</h2>
    <p>The two techniques compose. A common mature pattern is to fine-tune a model for a consistent output contract — tone, structure, refusal behaviour — and then wrap it in RAG so its answers stay grounded in current documents. This gets you a model that sounds like you and never invents facts about your data. The order matters: get RAG working first, measure where behaviour (not knowledge) is still wrong, and only then consider fine-tuning to close that specific gap.</p>

    <h2 id="how-we-build">How we build this</h2>
    <p>In our delivery work, the default sequence is RAG first, governance instrumented from the first retrieval, fine-tuning last and only when justified. The managed product is <a href="/platform/ai-dev-platform">the AI Dev Platform</a> — RAG Studio, Agent Builder, Fine-Tuning Ops, and Governance Hub on one base layer. The services route into production is <a href="/services/rag-knowledge-base-setup">RAG Knowledge Base Setup</a>. For the broader product logic, see <a href="/blog/four-pillar-ai-dev-platform">the four-pillars piece</a>.</p>
  `,
};

export default post;
