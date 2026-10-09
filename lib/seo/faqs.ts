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

export const homeFaqs: Faq[] = [
  {
    q: 'What is sonofgraig?',
    a: 'sonofgraig is an enterprise software company headquartered in KwaMhlanga, South Africa, building AI-native SaaS platforms for enterprise operations. Founded by Tumiso Graig Ramaboya in March 2025, sonofgraig operates five product clusters — AI Dev Platform, Cloud & DevOps, Data & Analytics, Creative & XR, and Dev Platform — sharing one POPIA-aligned audit trail.',
  },
  {
    q: 'Where is sonofgraig based?',
    a: 'sonofgraig is registered at 9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga 1022, South Africa. Day-to-day operations run from Pretoria. Production infrastructure runs in AWS af-south-1 (Cape Town) so all customer data is processed and stored inside South Africa for POPIA Section 72 compliance.',
  },
  {
    q: 'When does the sonofgraig platform launch?',
    a: 'RAG Studio is the first sonofgraig product, shipping in Q4 2026 as the beachhead for the AI Dev Platform cluster. Agent Builder follows in Q1 2027. Fine-Tuning Ops and Governance Hub also ship Q1 2027. Cloud & DevOps and Data & Analytics clusters land in Phase 2 (Q2–Q3 2027), Creative & XR and Dev Platform in Phase 3.',
  },
  {
    q: 'How much does sonofgraig cost?',
    a: 'sonofgraig platform subscriptions start at R4,999 per month for the Starter tier, priced in ZAR with no FX exposure. The Founding Customer Programme offers 70% off the first year for the first five companies — R5,999/month instead of R19,999/month on the Growth tier. Fixed-scope services start at R45,000 for a POPIA audit.',
  },
  {
    q: 'Is sonofgraig POPIA compliant?',
    a: 'Yes. sonofgraig is built POPIA-native — data residency in AWS af-south-1 is enforced at the VPC level (Section 72), and every product cluster ships with audit logs aligned to POPIA Sections 11 and 19. The founder, Tumiso Graig Ramaboya, is the named Information Officer registered with the Information Regulator of South Africa.',
  },
  {
    q: 'Who founded sonofgraig?',
    a: 'sonofgraig was founded by Tumiso Graig Ramaboya, a software engineer and AI integration architect specialising in LLM orchestration, Retrieval-Augmented Generation (RAG) pipelines, and high-concurrency web architecture. He serves as Founder, CEO, and the company\'s named POPIA Information Officer.',
  },
];

export const platformFaqs: Faq[] = [
  {
    q: 'What is the sonofgraig platform?',
    a: 'The sonofgraig platform is a unified subscription that bundles five enterprise SaaS clusters — AI Dev Platform, Cloud & DevOps Suite, Data & Analytics OS, Creative & XR Studio, and Dev Platform — sharing one identity layer, one observability stack, and one POPIA-aligned audit trail. Pricing starts at R4,999 per month.',
  },
  {
    q: 'What products are inside the AI Dev Platform cluster?',
    a: 'The AI Dev Platform contains four products: RAG Studio (document-grounded answers, ships Q4 2026), Agent Builder (visual autonomous-agent canvas, ships Q1 2027), Fine-Tuning Ops (model customisation pipeline, Q1 2027), and Governance Hub (bias, explainability, and POPIA compliance dashboards, Q1 2027).',
  },
  {
    q: 'What is Agent Builder?',
    a: 'Agent Builder is sonofgraig\'s visual canvas for designing, deploying, and monitoring autonomous AI agents. Built on LangGraph and Composio, it gives every agent a full execution trace, human-in-the-loop gates on regulated actions, and 200+ tool integrations. Ships Q1 2027 as part of the AI Dev Platform cluster.',
  },
  {
    q: 'What is RAG Studio?',
    a: 'RAG Studio is sonofgraig\'s document-grounded answering surface, shipping Q4 2026. It ingests enterprise documents into a self-hosted Qdrant vector store in AWS af-south-1, runs hybrid retrieval (BM25 + dense embeddings), and returns answers with source citations and a full lineage trail for POPIA defensibility.',
  },
  {
    q: 'Is the sonofgraig platform hosted in South Africa?',
    a: 'Yes. All sonofgraig platform infrastructure runs in AWS Africa (Cape Town) region — af-south-1. Customer data is processed and stored inside South Africa, satisfying POPIA Section 72 transborder-flow restrictions without requiring a Section 72 derogation. Residency is enforced at the VPC and IAM policy level.',
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: 'How much does the sonofgraig enterprise platform cost?',
    a: 'sonofgraig platform pricing starts at R4,999 per month for the Starter tier, R19,999 per month for the Growth tier, and custom pricing for Enterprise. All tiers are priced in ZAR with no FX exposure. The first five founding customers get the Growth tier at 70% off (R5,999/month) for year one.',
  },
  {
    q: 'Why is sonofgraig priced in ZAR?',
    a: 'sonofgraig\'s cost structure is denominated in ZAR — staff, infrastructure, and operations all run in rand. Pricing in USD would create FX risk that would have to be hedged and passed to customers. By pricing in ZAR, customer software budgets do not move when the rand moves. This is a principle, not a marketing tactic.',
  },
  {
    q: 'What is the sonofgraig founding customer programme?',
    a: 'The founding customer programme is reserved for the first five companies that commit to the sonofgraig platform. Each receives the Growth tier at 70% off for year one (R5,999/month instead of R19,999), direct access to the founding team, design input on the product roadmap, and a dedicated Slack channel for support.',
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
    a: 'sonofgraig is an enterprise software company. It emerged from the structured transformation of SonOfGraig Digital Solutions, a professional services agency that ran 18 service lines. Those service lines are being consolidated into five enterprise SaaS clusters, starting with the AI Dev Platform. Services continue as a parallel revenue stream and a product-development feedback loop.',
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
    a: 'sonofgraig responds to enquiries within 1 business day from Pretoria. Founding-customer applications receive a response within 2 business days. Security disclosures sent to tumiso@sonofgraig.com are read 24/7 — the founder is on-call for those.',
  },
  {
    q: 'Who do I contact for POPIA queries at sonofgraig?',
    a: 'POPIA queries, data-subject access requests, and compliance correspondence go to tumiso@sonofgraig.com — Tumiso Graig Ramaboya is the named POPIA Information Officer registered with the Information Regulator of South Africa. Responses are signed by him personally, not by a delegated team.',
  },
  {
    q: 'Where is the sonofgraig registered office?',
    a: 'sonofgraig\'s registered office is at 9810 Moloto South Drive, Extension 8, KwaMhlanga, Mpumalanga 1022, South Africa. Operations run from Pretoria on Africa/Johannesburg time (UTC+02:00). Production infrastructure runs in AWS af-south-1 (Cape Town).',
  },
];

export const earlyAccessFaqs: Faq[] = [
  {
    q: 'What is the sonofgraig founding customer programme?',
    a: 'The sonofgraig founding customer programme reserves five spots for enterprises that commit to the platform before RAG Studio launches. Founding customers get the Growth tier at 70% off year one (R5,999/month instead of R19,999), direct founding-team access, a Slack channel, and design input on the product roadmap.',
  },
  {
    q: 'How do I apply for sonofgraig early access?',
    a: 'Apply for sonofgraig early access at sonofgraig.com/early-access. Complete the application form (organisation, sector, cluster of interest, use case). Tumiso Graig Ramaboya reviews every application personally and responds within 2 business days from Pretoria — with either a discovery-call invitation or honest feedback if the programme is not the right fit.',
  },
  {
    q: 'How many founding customer slots are still available?',
    a: 'sonofgraig has five founding-customer slots in total. The exact number remaining changes as applications are accepted — the current count is shown live on the early-access page. Applications close once all five are filled, or when RAG Studio reaches general availability in Q4 2026.',
  },
];

export const popiaFaqs: Faq[] = [
  {
    q: 'How is sonofgraig POPIA compliant?',
    a: 'sonofgraig is POPIA-compliant by architecture, not by checkbox. Customer data is processed and stored entirely in AWS af-south-1 (Section 72), every product cluster emits structured audit logs aligned to Sections 11 and 19, and Tumiso Graig Ramaboya is the named Information Officer registered with the Information Regulator of South Africa.',
  },
  {
    q: 'What POPIA section does data residency satisfy?',
    a: 'sonofgraig satisfies POPIA Section 72 (transborder information flows) by processing and storing all customer data inside South Africa, in AWS af-south-1. Section 72 prohibits transfer of personal information to a third party in another country unless adequate protection exists. By keeping data in-country, the section is satisfied directly.',
  },
  {
    q: 'Who is the POPIA Information Officer at sonofgraig?',
    a: 'Tumiso Graig Ramaboya is the POPIA Information Officer at sonofgraig, registered with the Information Regulator of South Africa. Data-subject requests and POPIA correspondence go to tumiso@sonofgraig.com. He signs the company\'s compliance posture personally — the responsibility is not delegated.',
  },
];

export const securityFaqs: Faq[] = [
  {
    q: 'How does sonofgraig handle security disclosures?',
    a: 'Send security disclosures to tumiso@sonofgraig.com. The founder reads them 24/7 with a 1-hour response target during business hours and best-effort response out of hours. Coordinated disclosure is the preferred process; sonofgraig does not have a public bug-bounty programme yet but rewards responsible disclosure on a case-by-case basis.',
  },
  {
    q: 'Where does sonofgraig store customer data?',
    a: 'sonofgraig stores all customer data in AWS af-south-1 (Cape Town, South Africa). Residency is enforced at the VPC and IAM policy level. No customer data flows to another region without an explicit, contracted Section 72 derogation. This is the POPIA-native architecture default.',
  },
  {
    q: 'Is sonofgraig ISO 27001 certified?',
    a: 'sonofgraig is built against ISO 27001 controls but is not yet certified — certification is planned for 2027 once the platform is in production with founding customers. AWS af-south-1 carries ISO 27001, ISO 27017, ISO 27018, and SOC 2 Type II certifications, providing inherited infrastructure controls today.',
  },
];

export const servicesFaqs: Faq[] = [
  {
    q: 'What services does sonofgraig offer?',
    a: 'sonofgraig offers four fixed-scope professional services for South African enterprises: AI Agent Implementation (from R95,000, 6–10 weeks), RAG Knowledge Base Setup (from R65,000, 4–6 weeks), AI Governance & Ethics Audit (from R45,000, 3–4 weeks), and Cloud Architecture & DevOps (from R120,000, 6–10 weeks). All priced in ZAR.',
  },
  {
    q: 'What is included in the sonofgraig AI Agent Implementation service?',
    a: 'The sonofgraig AI Agent Implementation includes agent workflow design, the LangGraph + Composio stack deployed in your VPC, 200+ tool integrations wired to your systems, full execution trace plus audit log per run, human-in-the-loop gates on regulated actions, POPIA Section 11 + 19 compliance documentation, and on-call rotation training for your team.',
  },
  {
    q: 'How long does a sonofgraig RAG implementation take?',
    a: 'A sonofgraig RAG Knowledge Base Setup takes 4–6 weeks at fixed scope. It includes document ingestion from Google Drive, SharePoint, Notion, or S3, a self-hosted Qdrant vector store in your chosen cloud region (South African by default), hybrid retrieval (BM25 + dense embeddings), source citation on every answer, a Ragas evaluation harness, and POPIA-aligned audit logging.',
  },
];
