import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'rag-evaluation-defensible-citations',
  title: 'Retrieval Quality: Evaluating RAG with Citations You Can Defend',
  excerpt:
    'A RAG system that cites the wrong passage is worse than one that admits it does not know. Here is how to evaluate retrieval quality and build citations that survive scrutiny.',
  category: 'Engineering',
  datePublished: '2026-05-06',
  dateModified: '2026-05-06',
  readingTime: 8,
  author: TUMISO,
  primaryKeyword: 'RAG evaluation',
  keywords: [
    'RAG evaluation',
    'retrieval quality',
    'RAG citations',
    'Ragas',
    'hybrid search',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover on evaluating RAG retrieval quality and defensible citations, over a blue node-lattice motif.',
  bodyHtml: `
    <p class="lede">The failure mode that destroys trust in a RAG system is not the answer it refuses to give — it is the confident answer attached to the wrong citation. A user who clicks a citation and finds it does not support the claim stops trusting every answer afterward. Retrieval quality is therefore not an optimisation; it is the product. This piece is about how to measure it and how to make citations defensible.</p>

    <h2 id="retrieval-is-the-product">Retrieval is the product, not the prompt</h2>
    <p class="answer-block">In a RAG system, answer quality is bounded by retrieval quality: the model can only be as right as the passages it was given. If the right passage is not retrieved, no prompt engineering recovers it. So the highest-leverage work is the retrieval layer — getting the correct, relevant passages into the context for every query — not refining the instruction that wraps them.</p>

    <h2 id="hybrid">Why hybrid search beats pure vector search</h2>
    <p>Dense vector search alone misses things that matter in enterprise documents: exact policy numbers, case IDs, product codes, and proper nouns, where a near-synonym is wrong. Lexical search (BM25) catches those exact matches but misses paraphrases. Hybrid search runs both and fuses the results, and on real enterprise corpora it reliably beats either alone. A reranker on top — scoring the fused candidates for relevance to the specific query — lifts quality further, especially on long or multi-part questions.</p>

    <h2 id="metrics">The metrics that actually matter</h2>
    <p class="answer-block">Evaluate RAG on three axes, not one. <strong>Context relevance:</strong> were the retrieved passages actually relevant to the question? <strong>Faithfulness:</strong> is the answer supported by the retrieved passages, or did the model add unsupported claims? <strong>Answer relevance:</strong> did the answer address what was asked? A system can score well on one and fail another — high faithfulness but low context relevance means it faithfully summarised the wrong documents. Tools like Ragas operationalise these as automated scores.</p>

    <h2 id="defensible-citations">What makes a citation defensible</h2>
    <p>A defensible citation points to the specific passage that supports the claim, not the whole document, and the supported claim is genuinely contained in that passage. Two engineering practices get you there: chunk documents so a citation resolves to a readable, self-contained span (not a 40-page PDF), and enforce faithfulness so the model is constrained to claims its retrieved context supports. The acid test is the click-through: a reviewer clicks the citation and immediately sees the sentence that backs the claim.</p>

    <h2 id="regression">Treat retrieval like code: regression-test it</h2>
    <p>Retrieval quality drifts as the corpus grows, the chunking changes, or the embedding model is swapped. Without a regression suite — a fixed set of questions with known-good passages, scored on every change — you discover degradation in production. Build the evaluation harness before the first production deployment, not after the first complaint. This is the same discipline that separates demo agents from production ones, covered in <a href="/blog/building-production-ai-agents-langgraph">the agents piece</a>.</p>

    <h2 id="compliance-angle">Why this is also a compliance property</h2>
    <p>Defensible citations are not only a trust feature — they are a compliance asset. In a regulated setting, "the system said so" is not an acceptable basis for a decision; "here is the source passage the answer is grounded in" is. Citation quality is what lets a RAG answer survive an audit, which connects directly to the broader POPIA posture in <a href="/blog/popia-ai-compliance-checklist">the compliance checklist</a>.</p>

    <h2 id="how-we-build">How we build and measure this</h2>
    <p>Our RAG delivery ships with hybrid retrieval, source citations on every answer, and a Ragas evaluation harness with regression tests from day one — the full scope is in <a href="/services/rag-knowledge-base-setup">RAG Knowledge Base Setup</a>, productised as <a href="/platform/ai-dev-platform">RAG Studio</a>. For the decision of when RAG is even the right tool, see <a href="/blog/rag-vs-fine-tuning-when-to-ground-vs-train">RAG vs fine-tuning</a>.</p>
  `,
};

export default post;
