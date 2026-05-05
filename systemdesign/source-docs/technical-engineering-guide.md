SONOFGRAIG DIGITAL SOLUTIONS
AI Dev Platform — Engineering Division

TECHNICAL ENGINEERING GUIDE
How to Build It

Open Source Stack  ·  Tech Architecture  ·  Application Pages
Integrations  ·  Build Sequence  ·  Engineering Decisions

VERSION
1.0
DATE
April 2026
AUDIENCE
Engineering
STATUS
Confidential


Table of Contents



1. Introduction
This document is the engineering specification for building the SonOfGraig AI Dev Platform. It covers the complete open source foundation, technology stack decisions, application page inventory, integrations, build sequence, and engineering rationale behind each decision.

The platform is not built from scratch. It is assembled intelligently from best-in-class open source projects, then wrapped in a unified product experience that SonOfGraig owns and brands. The rule is simple: never build commodity infrastructure — only build the things that create competitive advantage.


Engineering Philosophy
Buy and integrate commodity infrastructure. Build the opinionated product layer on top. Every hour spent rebuilding LangGraph, Qdrant, or PostgreSQL is an hour not spent building the agent canvas, the RAG evaluation dashboard, or the governance reports that make SonOfGraig different.


2. Architecture Overview
2.1 High-Level System Design
The platform follows a microservices architecture split across two backend services, a unified frontend, and a shared data plane. The two backend services are separated by language and purpose: Python handles all AI and ML workloads because the ecosystem is unmatched; Node.js handles all product API concerns where TypeScript end-to-end type safety delivers the most value.

Component
Role
Next.js frontend
Single-page application serving all four product surfaces from one unified shell. TypeScript throughout. Communicates with Node.js API via tRPC.
Node.js API (tRPC)
Product layer: auth, user management, billing, project configuration, webhooks, RBAC. Type-safe end-to-end with the frontend.
FastAPI (Python)
AI/ML layer: agent execution, RAG queries, model inference, fine-tuning orchestration, bias detection, observability. All LLM calls route through LiteLLM.
PostgreSQL (Supabase)
Primary relational database. Multi-tenant via row-level security. Supabase provides managed Postgres, auth primitives, realtime subscriptions, and storage.
Redis (Upstash)
Cache layer and message broker for Celery async task queues. Fine-tuning jobs, doc ingestion pipelines, and batch evaluations all run as async tasks.
Qdrant
Self-hosted vector database on Kubernetes. Stores embeddings for RAG, agent long-term memory, and semantic search. Self-hosted for POPIA data residency.
Kubernetes (EKS)
Container orchestration on AWS EKS. All services run as containerised workloads. Auto-scaling, rolling deployments, and health checks managed by K8s.

2.2 Multi-Tenancy Design
Multi-tenancy is implemented at the database level using row-level security (RLS) in PostgreSQL. Every table that contains customer data carries an organisation_id column. Supabase RLS policies enforce that every query is automatically scoped to the authenticated organisation — no application-level filtering required.

-- Example RLS policy (applied to every tenant-scoped table)
CREATE POLICY org_isolation ON agents
  USING (organisation_id = auth.jwt() ->> 'org_id');

-- Qdrant uses named collections per tenant
-- Collection naming: {org_id}_{kb_id}
-- Cryptographic isolation: each tenant collection is independently encrypted

2.3 Request Flow
Every API request flows through Cloudflare first (WAF, rate limiting, DDoS protection), then to the Next.js edge runtime for SSR, then to either the Node.js tRPC API or the FastAPI AI service depending on route. The LiteLLM gateway sits between the FastAPI service and all external model providers, normalising calls and tracking token usage.


3. Open Source Foundations
The following open source projects are the core engineering foundations of the platform. Each is production-grade, actively maintained, and chosen to reduce build time by months compared to building equivalent functionality in-house.

3.1 Agent Builder — Core OSS
Product: Agent Builder

LangGraph
LangGraph is the graph-based stateful agent orchestration framework from the LangChain team. It is the runtime that powers all agent execution on the platform. Unlike simple chain-based approaches, LangGraph models agents as directed graphs with nodes (actions) and edges (conditional routing), enabling complex multi-step, multi-branch agent behaviours including loops, retries, and human-in-the-loop interruption points.

Repository: github.com/langchain-ai/langgraph
License: MIT
Why not LangChain directly: LangGraph provides explicit state management and graph-based control flow that LangChain's sequential chains cannot handle
Key capabilities used: StateGraph, conditional edges, checkpoint persistence, human interrupt nodes

# Example: LangGraph agent with tool use and human approval gate
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.sqlite import SqliteSaver

workflow = StateGraph(AgentState)
workflow.add_node('agent', call_model)
workflow.add_node('tools', call_tools)
workflow.add_node('human_review', interrupt_for_approval)
workflow.add_conditional_edges('agent', route_to_tools_or_end)
app = workflow.compile(checkpointer=SqliteSaver.from_conn_string(':memory:'))

AutoGen
AutoGen (from Microsoft Research) handles multi-agent conversation patterns — specifically the supervisor-worker architecture where a controller agent delegates tasks to specialised sub-agents. Used for the multi-agent orchestration feature inside Agent Builder.
Repository: github.com/microsoft/autogen
License: MIT
Key use: supervisor + worker agent patterns, agent-to-agent messaging

Composio
Composio provides 200+ pre-built tool integrations (Slack, Gmail, GitHub, Jira, HubSpot, databases, browsers) that agents can call without custom integration code. It handles authentication, rate limiting, and error handling for every tool connection.
Repository: github.com/ComposioHQ/composio
License: Apache 2.0
Key use: all agent tool connections except custom REST API calls

React Flow
React Flow is the open source library used to build the visual agent canvas — the drag-and-drop interface where customers design agent workflows without writing code. It handles node rendering, edge routing, zoom/pan, and selection.
Repository: github.com/xyflow/xyflow
License: MIT
Key use: agent canvas UI, visual workflow builder

3.2 RAG Studio — Core OSS
Product: RAG Studio

LlamaIndex
LlamaIndex is the core framework for RAG Studio. It handles the entire document processing pipeline: ingestion, transformation, chunking, embedding, indexing, and retrieval. It provides a consistent abstraction layer over vector stores (Qdrant), embedding models, and LLMs.
Repository: github.com/run-llama/llama_index
License: MIT
Key capabilities: document loaders, node parsers, chunking strategies, retrieval modes (dense, sparse, hybrid), query engines

# Example: LlamaIndex hybrid RAG pipeline
from llama_index.core import VectorStoreIndex, Settings
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.retrievers.bm25 import BM25Retriever

vector_store = QdrantVectorStore(client=qdrant_client, collection_name=f'{org_id}_{kb_id}')
index = VectorStoreIndex.from_vector_store(vector_store)
# Hybrid retrieval: semantic + keyword
retriever = index.as_retriever(similarity_top_k=5, mode='hybrid')

Qdrant
Qdrant is the self-hosted vector database used for all embedding storage and similarity search across the platform. It is deployed on Kubernetes inside the AWS Cape Town region (af-south-1) to satisfy POPIA data residency requirements. Each customer knowledge base gets an isolated collection.
Repository: github.com/qdrant/qdrant
License: Apache 2.0
Why Qdrant over Pinecone: self-hosted, no data leaves our infrastructure, lower long-term cost, POPIA compliant
Why Qdrant over pgvector: purpose-built for vector search, superior performance at scale, better filtering

Unstructured.io
Unstructured handles parsing of real enterprise documents before they enter the LlamaIndex pipeline. It reliably extracts text, tables, and structured content from PDFs with complex layouts, scanned documents (OCR), Word files, PowerPoint decks, and HTML.
Repository: github.com/Unstructured-IO/unstructured
License: Apache 2.0
Key use: all document parsing before chunking and embedding

Ragas
Ragas is the RAG evaluation framework that powers the Eval Dashboard in RAG Studio. It provides automated metrics for faithfulness (does the answer match the retrieved context), answer relevancy (does the answer address the question), context precision, and context recall.
Repository: github.com/explodinggradients/ragas
License: Apache 2.0
Key metrics surfaced: faithfulness, answer_relevancy, context_precision, context_recall

3.3 Fine-Tuning Ops — Core OSS
Product: Fine-Tuning Ops

Axolotl
Axolotl is the fine-tuning framework that manages the complete training loop for open source foundation models. It wraps HuggingFace Transformers and Accelerate, supports all major PEFT methods (LoRA, QLoRA, full fine-tuning), and handles distributed training across multiple GPUs. It is the most production-ready open source fine-tuning framework available.
Repository: github.com/OpenAccess-AI-Collective/axolotl
License: Apache 2.0
Supported base models: Llama 3, Mistral, Phi-3, Gemma, Qwen, and any HuggingFace model
Key capabilities: LoRA, QLoRA, full fine-tune, multi-GPU with DeepSpeed, Flash Attention 2

# axolotl config example (YAML)
base_model: meta-llama/Meta-Llama-3-8B-Instruct
model_type: LlamaForCausalLM
load_in_4bit: true
adapter: lora
lora_r: 16
lora_alpha: 32
lora_dropout: 0.05
datasets:
  - path: s3://sonofgraig/{org_id}/datasets/{dataset_id}.jsonl
    type: alpaca
output_dir: /models/{org_id}/{job_id}
wandb_project: sonofgraig-{org_id}

PEFT and TRL
PEFT (Parameter-Efficient Fine-Tuning) from HuggingFace provides the LoRA and QLoRA adapter implementations. TRL (Transformer Reinforcement Learning) provides RLHF tooling including reward modelling and PPO training for cases where customers want preference-based fine-tuning.
PEFT repo: github.com/huggingface/peft — License: Apache 2.0
TRL repo: github.com/huggingface/trl — License: Apache 2.0

vLLM
vLLM is the high-throughput inference engine used to serve fine-tuned models in production. It implements PagedAttention for efficient GPU memory management, continuous batching for high concurrency, and OpenAI-compatible API endpoints so customers can swap their fine-tuned model in by changing a single URL.
Repository: github.com/vllm-project/vllm
License: Apache 2.0
Performance: 10-24x higher throughput than naive HuggingFace inference on the same hardware

Label Studio
Label Studio is the data annotation interface used when customers need to label training data before fine-tuning. It supports text classification, named entity recognition, conversational dataset labelling, and preference ranking — the four most common annotation tasks for LLM fine-tuning.
Repository: github.com/HumanSignal/label-studio
License: Apache 2.0

3.4 Governance Hub — Core OSS
Product: Governance Hub

Fairlearn
Fairlearn (from Microsoft) is the bias detection library powering the Bias Audits feature. It provides assessment and mitigation algorithms for group fairness metrics including demographic parity, equal opportunity, and equalised odds. It works with any scikit-learn compatible model and produces structured bias reports.
Repository: github.com/fairlearn/fairlearn
License: MIT
Key metrics: demographic_parity_difference, equalized_odds_difference, selection_rate by group

AI Fairness 360 (AIF360)
AIF360 from IBM Research complements Fairlearn with additional bias detection algorithms and pre-processing mitigation techniques. It is particularly strong for detecting intersectional bias and for datasets with protected attributes.
Repository: github.com/Trusted-AI/AIF360
License: Apache 2.0

SHAP
SHAP (SHapley Additive exPlanations) is the explainability library powering the XAI Reports feature. It generates feature importance scores for any model's prediction, producing the plain-language explanations that non-technical stakeholders and board members can read. SHAP values are mathematically grounded in cooperative game theory and are widely accepted by regulators.
Repository: github.com/shap/shap
License: MIT
Key use: TreeSHAP for tree models, KernelSHAP for black-box models, force plots and summary plots for reports

Evidently AI
Evidently handles production model monitoring for the Drift Monitor feature. It tracks statistical distributions of model inputs and outputs over time, alerting when drift exceeds defined thresholds. It integrates with the observability stack via Prometheus metrics.
Repository: github.com/evidentlyai/evidently
License: Apache 2.0

Langfuse
Langfuse is the LLM observability tool that provides the detailed prompt trace logs, cost tracking, and latency analysis in the Observability Stack. Every prompt sent through the platform generates a structured trace in Langfuse including input, output, model used, token count, latency, and cost.
Repository: github.com/langfuse/langfuse
License: MIT (self-hosted)

3.5 Platform Layer — Core OSS
Platform infrastructure

LiteLLM
LiteLLM is the unified LLM gateway that all model calls route through. It normalises the APIs of 100+ LLM providers (OpenAI, Anthropic, Google Gemini, Mistral, Cohere, Azure OpenAI) into a single OpenAI-compatible interface. It handles fallbacks, load balancing across providers, cost tracking, and rate limit management.
Repository: github.com/BerriAI/litellm
License: MIT
Why critical: customers can swap models by changing a parameter, not their application code. SonOfGraig can route to cheaper models automatically based on cost thresholds.

# LiteLLM proxy config — routes all calls through one endpoint
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_key: os.environ/OPENAI_KEY
  - model_name: claude-3-5-sonnet
    litellm_params:
      model: anthropic/claude-3-5-sonnet-20241022
      api_key: os.environ/ANTHROPIC_KEY
  - model_name: llama-3-8b
    litellm_params:
      model: ollama/llama3          # local model via Ollama

Airbyte
Airbyte is the open source data integration platform powering RAG Studio's source connectors. It provides 350+ pre-built connectors for syncing data from Google Drive, Confluence, SharePoint, Notion, GitHub, Salesforce, databases, and any REST API into the platform's data pipeline.
Repository: github.com/airbytehq/airbyte
License: MIT (core connectors)
Key use: all RAG Studio source connectors — customers connect their document sources once and Airbyte syncs them on schedule

Lago
Lago is the open source usage-based billing engine that powers the platform's metering. It tracks token usage, GPU compute consumption, and API calls per customer, and feeds that data into Stripe for invoicing. Lago handles the complex metering logic (overages, pro-rated billing, plan changes) that Stripe alone cannot do cleanly.
Repository: github.com/getlago/lago
License: AGPL-3.0 (self-hosted)
Key use: per-token metering, GPU compute billing, overage tracking, ZAR invoicing


4. Full Technology Stack
4.1 Frontend Stack
Package
Category
Purpose
Next.js 14
React framework (App Router)
Core frontend framework — SSR, routing, API routes
TypeScript
Type safety
End-to-end type safety with tRPC backend
Tailwind CSS
Utility-first CSS
All styling — no CSS files, no CSS-in-JS
shadcn/ui
Component library
Accessible, customisable components on Radix UI primitives
React Flow
Graph/canvas UI
Agent canvas builder — nodes, edges, drag-and-drop
Monaco Editor
Code/text editor
Prompt editor, code execution, config files — same as VS Code
Zustand
Client state
Global application state — lightweight, no boilerplate
React Query
Server state
Data fetching, caching, background sync, optimistic updates
Recharts
Data visualisation
All dashboard charts — usage, token spend, eval metrics
Framer Motion
Animations
Page transitions and UI micro-animations

4.2 Backend Stack — Node.js API
Package
Category
Purpose
Node.js 20 LTS
Runtime
Product API layer — auth, billing, org management
tRPC v11
API layer
Type-safe RPC — shared types between Next.js and Node.js
Prisma ORM
Database access
Type-safe PostgreSQL access with migrations
Auth.js v5
Authentication
Sessions, OAuth providers, JWT — SAML via enterprise config
Clerk (option)
Auth alternative
Managed auth with org/team primitives built in
Stripe
Payments
Subscription management, payment processing, ZAR support
Resend
Transactional email
Onboarding, alerts, billing notifications
Zod
Validation
Runtime schema validation for all API inputs

4.3 Backend Stack — Python AI Service
Package
Category
Purpose
FastAPI
Web framework
Async Python API for all AI/ML routes — high performance
Pydantic v2
Data models
Request/response validation and serialisation
LangGraph
Agent runtime
Stateful agent execution graphs
LlamaIndex
RAG framework
Document ingestion, embedding, retrieval
LiteLLM
Model gateway
Unified interface to all LLM providers
Celery + Redis
Task queues
Async jobs: fine-tuning, ingestion, evaluations
SQLAlchemy
DB access
ORM for async PostgreSQL access from Python
Sentence-Transformers
Embedding
Local embedding models for cost-sensitive use cases
Axolotl
Fine-tuning
Complete fine-tuning pipeline management
vLLM
Inference serving
High-throughput model serving for fine-tuned models

4.4 Data and Infrastructure Stack
Component
Category
Purpose
PostgreSQL 16
Primary database
All relational data — Supabase-managed
Redis (Upstash)
Cache + broker
Session cache, Celery broker, rate limiting
Qdrant
Vector database
Embeddings, semantic search, agent memory
MinIO
Object storage
Model files, datasets, documents — S3-compatible
Apache Kafka
Event streaming
Platform event bus for the data flywheel
Kubernetes (EKS)
Orchestration
All containerised workloads — AWS Cape Town
Terraform
IaC
All infrastructure defined as code
GitHub Actions
CI/CD
Build, test, and deploy pipelines
Prometheus + Grafana
Observability
Infrastructure metrics and dashboards
Langfuse
LLM observability
Prompt traces, token costs, conversation logs
Sentry
Error tracking
Frontend and backend error capture and alerting
Cloudflare
Edge / CDN
WAF, DDoS, rate limiting, global CDN


5. Application Pages — Full Inventory
The platform contains 52 distinct screens across four product surfaces, a shared platform shell, and external marketing/auth pages. Each page is specified below with its URL pattern, primary components, and key functionality.

5.1 Platform Shell — 6 pages
Shell pages — shared navigation wrapper

URL
Page
Key Content
/dashboard
Main dashboard
Org usage summary, recent agents, RAG queries, quick actions, billing status
/settings/org
Org settings
Organisation name, logo, plan, data residency region, POPIA settings
/settings/team
Team and RBAC
Invite members, assign roles (Admin, Builder, Viewer, Compliance), remove members
/settings/billing
Billing
Plan selection, token usage graph, GPU compute spend, Stripe portal link
/settings/api-keys
API keys
Generate, rotate, revoke API keys — scoped to org or project
/analytics
Usage analytics
Token usage trends, cost by product, top users, model spend breakdown

5.2 Agent Builder — 9 pages
Agent Builder pages

URL
Page
Key Content
/agents
Project list
All agents with status badges, last run time, deployment env, create new button
/agents/[id]/canvas
Canvas builder
React Flow canvas — drag nodes (LLM, tool, condition, memory), connect edges, test panel
/agents/[id]/tools
Tool config
Enable/configure tools: web search, code exec, Composio integrations, custom REST APIs
/agents/[id]/memory
Memory config
Short-term (conversation window), long-term (Qdrant collection), episodic (event log) settings
/agents/[id]/sandbox
Test sandbox
Chat interface to run agent in test mode — full trace display, variable inspection
/agents/[id]/deploy
Deployments
Environment configs (dev/staging/prod), version history, rollback, kill switch toggle
/agents/[id]/traces
Trace viewer
Execution history — step-by-step tool calls, LLM prompts/responses, timing, cost per run
/agents/[id]/multi
Multi-agent
Supervisor-worker graph config — define agent roles, handoff conditions, result aggregation
/agents/templates
Template library
Pre-built agent templates: customer support, researcher, data analyst, code reviewer

5.3 RAG Studio — 8 pages
RAG Studio pages

URL
Page
Key Content
/rag
Knowledge base list
All KBs with doc count, index status, last sync, query volume, create button
/rag/[id]/ingest
Ingestion pipeline
Upload docs, connect source (Airbyte connectors: Drive, Confluence, S3, Notion, SharePoint)
/rag/[id]/configure
Chunk and embed
Chunking strategy (recursive, sentence, semantic), chunk size, overlap, embedding model picker
/rag/[id]/query
Query tester
Live search interface — enter question, see retrieved chunks with scores, final answer, citations
/rag/[id]/eval
Eval dashboard
Ragas metrics: faithfulness, answer_relevancy, context_precision — per query and aggregate trends
/rag/[id]/deploy
Chat interface
Embeddable chat widget config — styling, system prompt, domain whitelist, embed code
/rag/[id]/access
Access control
Document-level permissions — map user roles to document groups
/rag/[id]/sources
Source connectors
Airbyte sync schedules, last sync status, re-index trigger, source health

5.4 Fine-Tuning Ops — 7 pages
Fine-Tuning Ops pages

URL
Page
Key Content
/finetune/datasets
Dataset manager
Upload JSONL/CSV, version datasets, PII scan results, dataset stats, Label Studio link
/finetune/datasets/[id]/annotate
Annotation
Label Studio embed — label conversations, rank preferences, fix incorrect examples
/finetune/jobs/new
Training job config
Base model picker, dataset selection, LoRA/QLoRA/full config, GPU tier, budget limit, W&B project
/finetune/jobs/[id]
Run monitor
Live training metrics: loss curve, GPU utilisation, estimated completion, cost ticker, cancel button
/finetune/models
Model registry
All trained models with eval scores, version history, deployment status, base model lineage
/finetune/models/[id]/eval
Model evaluation
BLEU/ROUGE scores, human preference results, side-by-side comparison against base model
/finetune/models/[id]/ab
A/B routing
Traffic split config (e.g. 20% new model, 80% current), statistical significance dashboard

5.5 Governance Hub — 8 pages
Governance Hub pages

URL
Page
Key Content
/governance
Risk overview
Compliance score (0-100), open findings, POPIA status, EU AI Act risk class, recent incidents
/governance/bias
Bias audits
Run new audit — select model + dataset + protected attributes, view demographic parity results
/governance/xai
XAI reports
SHAP feature importance plots, plain-language decision explanations, export PDF for board
/governance/audit-log
Audit log
Immutable log of all model decisions, prompt inputs/outputs, user actions — searchable, exportable
/governance/compliance
Compliance map
POPIA article checklist, EU AI Act risk classification, GDPR alignment, ISO 42001 readiness
/governance/drift
Drift monitor
Input/output distribution charts over time, statistical alerts, threshold configuration
/governance/policies
Policy rules
Define guardrails: blocked topics, PII filters, output length limits, content classification rules
/governance/reports
Exec report
Board-ready PDF generator — compliance status, bias summary, incident log, risk score trend

5.6 Shared Platform Pages — 5 pages
Platform-wide pages

URL
Page
Key Content
/models
Model registry
All available foundation models + customer fine-tunes — pricing, benchmarks, bias eval results
/observability
Observability
Token usage, latency P50/P95/P99 by route, error rates, cost anomalies, Langfuse trace link
/webhooks
Webhooks
Create/manage webhook endpoints, event type selection, delivery log, retry controls
/prompts
Prompt library
Save, version, and evaluate prompt templates — tag by product, model, use case
/docs
API docs + playground
OpenAPI/tRPC docs with interactive playground — authenticate and test any endpoint live

5.7 Marketing and Auth Pages — 6 pages
URL
Page
Key Content
/
Landing page
Hero, product overview, social proof, pricing CTA, demo booking
/pricing
Pricing page
Starter/Growth/Enterprise tier cards, feature matrix, FAQ, upgrade CTA
/docs (docs.sonofgraig.com)
Documentation site
Product guides, API reference, tutorials — built with Mintlify or Docusaurus
/blog + /changelog
Blog and changelog
Engineering blog, product updates, release notes — Ghost CMS or Astro
/auth/signin, /auth/signup
Auth pages
Magic link, Google SSO, Microsoft SSO, SAML config for enterprise
/onboarding/*
Onboarding flow
5-step wizard: org setup, first product selection, first project, invite team, feature tour


6. Integrations
6.1 Foundation Model Providers — via LiteLLM
All model calls route through the LiteLLM proxy. This means the platform is model-provider agnostic — customers change their model by selecting from a dropdown, not by changing API keys or code.

Provider
Models and Use Case
OpenAI
GPT-4o, GPT-4o mini, GPT-4 Turbo, o1, o3 — primary models for most enterprise use cases
Anthropic
Claude 3.5 Sonnet, Claude 3.5 Haiku — best for complex reasoning and long-context tasks
Google Gemini
Gemini 1.5 Pro, Flash — strong multimodal and long-context use cases
Mistral AI
Mistral Large, Mixtral — cost-effective European models with strong multilingual performance
Cohere
Command R+ — enterprise-focused, strong RAG performance, data residency options
Ollama (local)
Llama 3, Phi-3, Gemma — locally hosted models for air-gapped or cost-sensitive deployments
Azure OpenAI
Enterprise customers requiring Azure-hosted OpenAI with Azure compliance posture

6.2 Document Source Connectors — via Airbyte
Source
Description
Google Drive
Sync Google Docs, Sheets, and files from Drive folders on schedule
Confluence
Sync Confluence spaces and pages — primary enterprise knowledge base source
SharePoint / OneDrive
Microsoft 365 document libraries — required for most SA enterprise customers
Notion
Notion databases, pages, and workspaces
GitHub
Repository README files, wiki pages, and markdown documentation
Amazon S3 / MinIO
Direct bucket sync for customers with existing document storage
Dropbox
Business Dropbox folders
Slack
Public channel history for knowledge base indexing
Custom REST API
Any REST API via Airbyte's no-code connector builder
File upload
Direct PDF, Word, Excel, TXT upload — no connector required

6.3 Agent Tool Integrations — via Composio
Tool
Use Case
Slack
Send messages, read channels, create threads — customer support and notification agents
Gmail / Outlook
Read and send email — email triage, lead follow-up, and scheduling agents
GitHub
Read/write issues, PRs, code — code review and engineering workflow agents
Jira / Linear
Create, update, and query tickets — engineering workflow automation
HubSpot / Salesforce
CRM record access — sales and customer success agents
PostgreSQL / MySQL
Direct database queries — data analysis and reporting agents
Web browser
Playwright-powered browser automation — research and data extraction agents
Code execution
Python and JavaScript sandboxed execution — data processing agents
Custom REST API
Configure any REST API as an agent tool via Composio's API connector

6.4 Authentication and Identity
Provider
Use Case
Google OAuth
Sign in with Google — primary consumer and SME auth method
Microsoft Entra
Azure AD / Entra ID — mandatory for enterprise Microsoft 365 customers
SAML 2.0
Generic SAML for enterprise IdPs (Okta, Ping, ADFS) — Enterprise tier only
Magic link email
Passwordless email link — low-friction for non-SSO customers
LDAP / Active Directory
On-premises directory integration — Enterprise tier with VPC peering

6.5 Billing, Payments, and Communications
Service
Role
Stripe
Subscription management, ZAR payment processing, invoice generation, customer portal
Lago (OSS)
Usage-based metering engine — token counting, GPU hours, overage calculation feeds Stripe
Resend
Transactional email — onboarding sequences, billing alerts, team invitations
Knock.fyi
Multi-channel notification orchestration — in-app, email, and Slack alerts for platform events

6.6 Observability and Security
Tool
Role
Prometheus + Grafana
Infrastructure metrics collection and dashboards — CPU, memory, request rates, error rates
Langfuse (self-hosted)
LLM-specific observability — prompt traces, token costs, latency per model, eval scores
Sentry
Frontend and backend error tracking, performance monitoring, session replay
OpenTelemetry
Distributed tracing across all services — standard instrumentation, vendor-agnostic
HashiCorp Vault
Secrets management — API keys, database credentials, encryption keys — BYOK support
Vanta
SOC 2 and ISO 27001 compliance automation — continuous control monitoring, evidence collection
Cloudflare
Edge CDN, WAF rules, bot protection, DDoS mitigation, rate limiting per IP/org
HubSpot
CRM for enterprise deal tracking, customer health monitoring, onboarding task management
Plain.com
In-app customer support — embedded chat widget with ticket management


7. Build Sequence
The platform is built in four phases. Each phase is designed to ship revenue-generating product before the next phase begins. No phase depends on the previous one being 100% complete — phases overlap in a deliberate way to keep engineering momentum high.

Phase 1 — Foundation (Months 1–6)

Target: first 10 paying customers. SOC 2 Type I. R500K ARR.
Team: 2 senior engineers + 1 frontend engineer. Infrastructure and first product.

Month 1–2: Core infrastructure
AWS EKS cluster setup via Terraform — af-south-1 region for POPIA compliance
Supabase PostgreSQL — tenant schema, RLS policies, migrations setup
Auth.js with Google SSO, magic link, and session management
Next.js shell with navigation, org creation, team invite, API key management
Stripe + Lago billing integration — Starter and Growth plan metering
Cloudflare configuration — WAF, rate limiting, CDN

Month 2–4: RAG Studio (first shippable product)
Qdrant deployment on Kubernetes — persistent volumes, backups, collection-per-tenant
LlamaIndex ingestion pipeline — PDF, Word, Google Drive via Airbyte
Unstructured.io integration for complex document parsing
FastAPI RAG query endpoint — hybrid retrieval, source citation
Knowledge base list, ingestion, chunk config, and query tester pages
Ragas evaluation pipeline — faithfulness, answer_relevancy metrics
RAG Studio eval dashboard page

Month 4–6: Agent Builder beta
LangGraph runtime deployment — agent execution service, checkpointing
LiteLLM proxy deployment — OpenAI, Anthropic, Mistral routes configured
React Flow canvas builder page — basic node types (LLM, tool, condition)
Tool configuration with Composio — Slack, Gmail, web search, code execution
Agent test sandbox and trace viewer pages
Basic single-agent deployment with kill switch

Phase 2 — Platform (Months 7–12)

Target: 50 paying customers. SOC 2 Type II. POPIA certification. R3M ARR.
Team: 4–5 engineers. Governance Hub, Fine-Tuning Ops, and platform hardening.

Governance Hub: Fairlearn + AIF360 bias detection service, SHAP XAI reports, Evidently drift monitor
Governance Hub pages: bias audits, XAI reports, audit log, compliance map, exec report generator
Fine-Tuning Ops: Axolotl training job service, vLLM inference cluster, Label Studio integration
Fine-Tuning Ops pages: dataset manager, annotation, job config, run monitor, model registry, A/B routing
Multi-agent orchestration in Agent Builder — AutoGen supervisor-worker patterns
Shared model registry page — all foundation models + fine-tuned models
Full observability stack: Prometheus, Grafana, Langfuse, Sentry, OpenTelemetry
SOC 2 Type II audit (via Vanta) — 6-month control evidence period
POPIA compliance certification — data processing register, DPA templates, breach notification workflow

Phase 3 — Ecosystem (Months 13–24)

Target: 200 enterprise customers. Third-party marketplace. R50M ARR.
Team: 8–10 engineers. Marketplace, partner programme, and geographic expansion.

Developer marketplace: third-party agent template publishing, revenue share infrastructure
Partner portal: reseller and system integrator onboarding, deal registration, co-sell tooling
Embedded analytics: customer-facing dashboard builder for Growth and Enterprise tiers
ISO 27001 certification
Nigeria and Kenya infrastructure — additional AWS regions or Cloudflare data localisation
Advanced compliance: EU AI Act classification automation, intersectional bias detection
Self-hosted / on-premises deployment option for air-gapped enterprise customers

7.1 Build vs Buy Decisions
Every technology decision should answer one question: does building this create competitive advantage? If no, buy or use open source.

Decision
Rationale
Build: Agent canvas UI (React Flow)
The specific interaction model of how SonOfGraig customers design agents is a UX differentiator. React Flow provides the engine, we build the experience.
Build: RAG eval dashboard
How we present retrieval quality metrics and surface improvement suggestions is product IP.
Build: Governance reports and XAI UI
The plain-language bias reports and board-ready PDF generation are directly customer-facing. The UI is our product.
Build: Prompt library and versioning
The opinionated way prompts are organised, tested, and improved over time is platform IP.
Buy/OSS: LangGraph
Agent orchestration is solved infrastructure. Building a better graph engine would take 12 months and provide zero market advantage.
Buy/OSS: Qdrant
Vector database is commodity infrastructure. Qdrant is production-grade, self-hostable, and free.
Buy/OSS: Axolotl + vLLM
Fine-tuning pipelines and inference servers are deeply specialised. Both have thousands of contributors.
Buy/SaaS: Stripe + Lago
Billing and metering are non-negotiable reliability requirements. Build failures here destroy trust instantly.
Buy/SaaS: Cloudflare
Edge security is a specialisation. Cloudflare's network has 300+ PoPs globally — replicating this is impossible.
Buy/SaaS: Vanta (SOC 2)
Compliance automation is a time-critical path item. Manual SOC 2 preparation takes 3x longer.


8. Engineering Team Structure
8.1 Phase 1 Team (Months 1–6)
Role
Responsibilities
Senior Full-Stack Engineer #1
Owns backend: FastAPI AI service, LangGraph agent runtime, LiteLLM gateway, Qdrant setup. Python-first, K8s experience required.
Senior Full-Stack Engineer #2
Owns backend: Node.js tRPC API, Supabase schema, auth, billing integration. TypeScript-first, Stripe experience preferred.
Frontend Engineer #1
Owns frontend: Next.js application shell, React Flow canvas builder, all product pages. TypeScript + React expert, UI/UX sensibility required.

8.2 Phase 2 Additions (Months 7–12)
Role
Responsibilities
ML Engineer
Owns Fine-Tuning Ops: Axolotl training pipelines, vLLM inference cluster, model evaluation. Deep Python/PyTorch required.
AI Safety Engineer
Owns Governance Hub: Fairlearn bias detection, SHAP XAI integration, Evidently drift monitoring, compliance report generation.
DevOps / Platform Engineer
Owns infrastructure: Kubernetes hardening, Terraform, CI/CD pipelines, observability stack, SOC 2 technical controls.


SonOfGraig Digital Solutions
AI Dev Platform — Technical Engineering Guide  |  v1.0  |  April 2026
This document is confidential and for engineering team use only.