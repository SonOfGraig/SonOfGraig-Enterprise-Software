import type { Faq } from '../seo';

// Per-page FAQ banks — each page emits a DIFFERENT set of questions so
// Google's FAQ-schema deduplication doesn't fire (cross-page duplicates
// get demoted in the SERP). Answers are written for AEO: each one is a
// direct, complete, citable sentence (or short paragraph) that an answer
// engine can lift verbatim into a featured snippet or voice response.
//
// Style rules for editing:
//   1. Lead with the answer in the first sentence — no preamble.
//   2. Front-load the entity name "sonofgraig" so brand attribution is
//      preserved when the snippet is extracted.
//   3. Keep each answer 40–80 words. Short enough for voice; long enough
//      to be useful as a snippet.
//   4. No marketing fluff. Facts only. Answer engines penalise hype.
//   5. Only what is true today (founder, 2026-10-10): no ship dates, no
//      published platform prices, no hosting or certification claims.

export const homeFaqs: Faq[] = [
  {
    q: 'What is sonofgraig?',
    a: 'sonofgraig is an enterprise software company in South Africa building AI-native software for enterprise operations. Founded by Tumiso Graig Ramaboya in March 2025, its first product is the AI Dev Platform — RAG Studio, Agent Builder, Governance Hub and ML Ops on one data layer and one audit trail — now in early access.',
  },
  {
    q: 'Where is sonofgraig based?',
    a: 'sonofgraig is registered at 9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga 1022, South Africa, and day-to-day operations run from Pretoria. Platform customer data is designed to be stored in a South African cloud region by default, with any model-provider call documented in the customer’s Data Processing Agreement.',
  },
  {
    q: 'When does the sonofgraig platform launch?',
    a: 'The sonofgraig AI Dev Platform is in early access now. RAG Studio is the first module available to early-access customers; Agent Builder is in development, and Governance Hub and ML Ops are planned. sonofgraig does not publish ship dates — each module is announced on the changelog when it is actually released.',
  },
  {
    q: 'How much does sonofgraig cost?',
    a: 'sonofgraig quotes AI Dev Platform plans in rand during early access, agreed with each customer on a call — no FX exposure. Fixed-scope services have published prices: AI Governance & Ethics Audit from R45,000, RAG Knowledge Base Setup from R65,000, AI Agent Implementation from R95,000 and Cloud Architecture & DevOps from R120,000.',
  },
  {
    q: 'Is sonofgraig POPIA compliant?',
    a: 'sonofgraig designs its platform around POPIA: personal information is scrubbed before it reaches a model, queries and agent steps are written to an append-only audit log, and data residency is set per customer. The founder, Tumiso Graig Ramaboya, is the Information Officer registered with the Information Regulator of South Africa.',
  },
  {
    q: 'Who founded sonofgraig?',
    a: 'sonofgraig was founded by Tumiso Graig Ramaboya, a software engineer and AI integration architect specialising in LLM orchestration, Retrieval-Augmented Generation (RAG) pipelines, and high-concurrency web architecture. He serves as Founder, CEO, and the company\'s named POPIA Information Officer.',
  },
];

export const platformFaqs: Faq[] = [
  {
    q: 'What is the sonofgraig platform?',
    a: 'The sonofgraig platform starts with one product, the AI Dev Platform: RAG Studio, Agent Builder, Governance Hub and ML Ops sharing one data layer, one set of access controls and one audit trail. Four further clusters — Cloud & DevOps, Data & Analytics, Creative & XR and Dev Platform — are planned.',
  },
  {
    q: 'What modules are inside the AI Dev Platform?',
    a: 'The sonofgraig AI Dev Platform has four modules: RAG Studio (document-grounded answers with citations, in early access), Agent Builder (multi-agent workflows with a full execution trace, in development), Governance Hub (POPIA reporting, bias checks and explainability, planned) and ML Ops (evaluation, fine-tuning and model versioning, planned).',
  },
  {
    q: 'What is Agent Builder?',
    a: 'Agent Builder is the sonofgraig AI Dev Platform module for designing, deploying and monitoring AI agents. Built on LangGraph and Composio, it gives every agent a full execution trace and human-in-the-loop approval gates on regulated actions. It is in development; early-access customers help decide what it supports first.',
  },
  {
    q: 'What is RAG Studio?',
    a: 'RAG Studio is the sonofgraig AI Dev Platform module for document-grounded answers. It ingests enterprise documents, runs hybrid retrieval (keyword plus dense embeddings) and returns answers that cite their sources, with a lineage trail for POPIA defensibility. It is the first module available to early-access customers.',
  },
  {
    q: 'Where is the sonofgraig platform hosted?',
    a: 'The sonofgraig platform is designed to run in a South African cloud region by default, with residency enforced in infrastructure policy. The one flow that can leave is the call to a language model, which goes to the provider the customer approves, after PII scrubbing, and is documented in the Data Processing Agreement.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: 'How much does the sonofgraig enterprise platform cost?',
    a: 'sonofgraig quotes the AI Dev Platform in rand during early access. Starter, Growth and Enterprise plans differ by modules, seats, storage, usage and support, and each is priced on a call for your use case. Every plan includes POPIA controls — there is no compliance add-on.',
  },
  {
    q: 'Why is sonofgraig priced in ZAR?',
    a: 'sonofgraig\'s cost structure is denominated in ZAR — staff, infrastructure, and operations all run in rand. Pricing in USD would create FX risk that would have to be hedged and passed to customers. By pricing in ZAR, customer software budgets do not move when the rand moves. This is a principle, not a marketing tactic.',
  },
  {
    q: 'What does sonofgraig early access include?',
    a: 'sonofgraig early access includes a direct line to the founder, a real say in the AI Dev Platform roadmap, and a guided onboarding session on your own documents. Pricing is agreed with each customer in rand. There is no fixed number of places; organisations are chosen by fit.',
  },
  {
    q: 'How much does an AI agent implementation cost from sonofgraig?',
    a: 'sonofgraig\'s AI Agent Implementation service is fixed-scope from R95,000 ZAR for a 6–10-week engagement. It includes a LangGraph + Composio stack deployed in your cloud account, integrations wired to your systems, full execution trace, human-in-the-loop gates, and POPIA Section 11 + 19 compliance documentation.',
  },
];

export const aboutFaqs: Faq[] = [
  {
    q: 'Who is Tumiso Graig Ramaboya?',
    a: 'Tumiso Graig Ramaboya is the founder, CEO, and POPIA Information Officer of sonofgraig. He is a software engineer and AI integration architect specialising in LLM orchestration, Retrieval-Augmented Generation pipelines, and high-concurrency web architecture. He personally signs the company\'s POPIA compliance posture.',
  },
  {
    q: 'What does sonofgraig do?',
    a: 'sonofgraig builds enterprise AI software for South African and African enterprises. Its first product, the AI Dev Platform (RAG Studio, Agent Builder, Governance Hub and ML Ops), is in active build, with four further product clusters planned. It also delivers fixed-scope professional services for clients who need solutions now.',
  },
  {
    q: 'Is sonofgraig a services company or a software company?',
    a: 'sonofgraig is an enterprise software company. It grew out of SonOfGraig Digital Solutions, a professional services agency, and is turning that delivery experience into software, starting with the AI Dev Platform. Fixed-scope services continue alongside the platform, funding the build and feeding real requirements into it.',
  },
  {
    q: 'When was sonofgraig founded?',
    a: 'sonofgraig was founded on 2 March 2025 in KwaMhlanga, Mpumalanga, South Africa. The company is a registered private company in South Africa, operating under SonOfGraig Digital Solutions (Pty) Ltd as the legal entity.',
  },
];

export const contactFaqs: Faq[] = [
  {
    q: 'How do I contact sonofgraig?',
    a: 'Contact sonofgraig by emailing info@sonofgraig.com for general enquiries, sales@sonofgraig.com for platform subscriptions and partnerships, or tumiso@sonofgraig.com for POPIA, security disclosure, legal, or press matters. Phone: +27 69 686 6024. Mail is read and routed by a real person — no triage queues.',
  },
  {
    q: 'How quickly does sonofgraig respond to enquiries?',
    a: 'sonofgraig answers sales, support and partnership enquiries within two business days, from Pretoria. Security disclosures sent to tumiso@sonofgraig.com are answered within one business day, and POPIA data-subject requests within 10 business days — well inside the 30 days the Act allows.',
  },
  {
    q: 'Who do I contact for POPIA queries at sonofgraig?',
    a: 'POPIA queries, data-subject access requests, and compliance correspondence go to tumiso@sonofgraig.com — Tumiso Graig Ramaboya is the named POPIA Information Officer registered with the Information Regulator of South Africa. Responses are signed by him personally, not by a delegated team.',
  },
  {
    q: 'Where is the sonofgraig registered office?',
    a: 'sonofgraig\'s registered office is at 9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga 1022, South Africa. Operations run from Pretoria on Africa/Johannesburg time (UTC+02:00).',
  },
];

export const earlyAccessFaqs: Faq[] = [
  {
    q: 'What is sonofgraig early access?',
    a: 'sonofgraig early access lets South African organisations use the AI Dev Platform while it is being built, with a direct line to the founder, a real say in the roadmap and guided onboarding on their own documents. Pricing is agreed with each customer in rand.',
  },
  {
    q: 'How do I apply for sonofgraig early access?',
    a: 'Apply for sonofgraig early access at sonofgraig.com/early-access. Complete the application form (organisation, sector, cluster of interest, use case). Tumiso Graig Ramaboya reviews every application personally and responds within 2 business days from Pretoria — with either a discovery-call invitation or honest feedback if it is not the right fit.',
  },
  {
    q: 'Is there a limit on sonofgraig early-access places?',
    a: 'No. sonofgraig has no fixed number of early-access places. Organisations are chosen by fit — a real production use case, POPIA as a board-level concern and time for roadmap conversations — so each one gets proper attention from the team building the platform.',
  },
];

export const popiaFaqs: Faq[] = [
  {
    q: 'How does sonofgraig approach POPIA?',
    a: 'sonofgraig designs for POPIA in the architecture: personal information is scrubbed before it reaches a model, queries and agent steps are written to an append-only audit log aligned to Sections 11 and 19, and data residency is set per customer. Tumiso Graig Ramaboya is the Information Officer registered with the Information Regulator.',
  },
  {
    q: 'How does sonofgraig handle POPIA Section 72 cross-border transfers?',
    a: 'sonofgraig stores platform customer data in a South African cloud region by default. Where a transfer does happen — usually the call to a language model provider the customer approves — it is made after PII scrubbing, on a lawful basis under Section 72, and documented in the customer’s Data Processing Agreement.',
  },
  {
    q: 'Who is the POPIA Information Officer at sonofgraig?',
    a: 'Tumiso Graig Ramaboya is the POPIA Information Officer at sonofgraig, registered with the Information Regulator of South Africa. Data-subject requests and POPIA correspondence go to tumiso@sonofgraig.com. He signs the company\'s compliance posture personally — the responsibility is not delegated.',
  },
];

export const securityFaqs: Faq[] = [
  {
    q: 'How does sonofgraig handle security disclosures?',
    a: 'Send security disclosures to tumiso@sonofgraig.com with reproducible steps and impact. sonofgraig responds within one business day, prefers coordinated disclosure, credits good-faith researchers where appropriate and does not pursue legal action against good-faith research. There is no public bug-bounty programme.',
  },
  {
    q: 'Where does sonofgraig store customer data?',
    a: 'sonofgraig designs the AI Dev Platform to store customer data in a South African cloud region by default, with residency enforced in infrastructure policy rather than only in a contract. The approved model-provider call is the one documented exception, made after PII scrubbing and listed in the Data Processing Agreement.',
  },
  {
    q: 'Is sonofgraig ISO 27001 or SOC 2 certified?',
    a: 'No. sonofgraig does not hold ISO 27001 or SOC 2 certification today and does not claim to. ISO 27001 is planned once the platform is generally available. The security page lists every control with its real status — in place, in build, designed or planned.',
  },
];

export const servicesFaqs: Faq[] = [
  {
    q: 'What services does sonofgraig offer?',
    a: 'sonofgraig offers four fixed-scope professional services for South African enterprises: AI Agent Implementation (from R95,000, 6–10 weeks), RAG Knowledge Base Setup (from R65,000, 4–6 weeks), AI Governance & Ethics Audit (from R45,000, 3–4 weeks), and Cloud Architecture & DevOps (from R120,000, 6–10 weeks). All priced in ZAR.',
  },
  {
    q: 'What is included in the sonofgraig AI Agent Implementation service?',
    a: 'The sonofgraig AI Agent Implementation includes agent workflow design, the LangGraph + Composio stack deployed in your cloud account, integrations wired to your systems, full execution trace plus audit log per run, human-in-the-loop gates on regulated actions, POPIA Section 11 + 19 compliance documentation, and hand-over training for your team.',
  },
  {
    q: 'How long does a sonofgraig RAG implementation take?',
    a: 'A sonofgraig RAG Knowledge Base Setup takes 4–6 weeks at fixed scope. It includes document ingestion from Google Drive, SharePoint, Notion, or S3, a self-hosted Qdrant vector store in your chosen cloud region (South African by default), hybrid retrieval (BM25 + dense embeddings), source citation on every answer, a Ragas evaluation harness, and POPIA-aligned audit logging.',
  },
];
