# Product Marketing Context

*Last updated: 2026-05-31*

> Foundation context for all marketing-skill work (copywriting, ai-seo, social, video,
> image, claude-youtube, higgsfield-*). Created via the `product-marketing` skill.
> **Canonical source documents** (do not paraphrase from memory — read them):
> `systemdesign/source-docs/design-system-v3.md`, `saas-transformation-map.md`,
> `technical-engineering-guide.md`, `SEO-content-adoption-plan.md`.
> Companion strategy: `systemdesign/source-docs/social-video-content-strategy.md`.

## Product Overview
**One-liner:** Africa's POPIA-native enterprise software platform — built in South Africa, hosted in af-south-1.
**What it does:** SonOfGraig is transitioning from a digital-services agency (18 service lines) into an enterprise software company delivering 5 SaaS clusters. The beachhead is the **AI Dev Platform** (Agent Builder, RAG Studio, Fine-Tuning Ops, Governance Hub) — letting African enterprises build and govern production AI on data that never leaves South African jurisdiction.
**Product category:** Enterprise AI / developer platform (the "shelf": enterprise AI platform, AI dev platform, POPIA-compliant AI infrastructure).
**Product type:** B2B SaaS, multi-tenant (Supabase Postgres + RLS), usage-billed (Lago + Stripe).
**Business model:** Subscription + usage. ZAR-priced. Targets: Phase 1 = 10 customers / R500K ARR / SOC 2 Type I; Phase 2 = 50 / R3M ARR / SOC 2 Type II + POPIA cert; Phase 3 = 200 / R50M ARR / ISO 27001 + Nigeria/Kenya expansion.

### The 5 clusters (priority order)
1. **AI Dev Platform** (Phase 1 beachhead) — Agent Builder, RAG Studio, Fine-Tuning Ops, Governance Hub.
2. **Cloud & DevOps Suite** (Phase 2) — Cloud Control Console, FinOps Dashboard, Security Posture Manager, Pipeline Builder, IT Ops Hub.
3. **Data & Analytics OS** (Phase 2) — Analytics Studio, Data Pipeline Builder, Workflow Automation Engine.
4. **Creative & XR Studio** (Phase 3) — Design System Generator, Brand Studio, XR Builder.
5. **Dev Platform** (Phase 3) — App Builder (low-code), Game Studio Toolkit, IoT Device Platform, Smart Contract IDE, Growth & Content Suite.

> **Content rule:** Phase 1 is real-now; Phase 2/3 are roadmap. Marketing may *mention* Phase 2/3 as vision, but demos and "how it works" content must come from Phase 1 (AI Dev Platform) only.

## Target Audience
**Target companies:** South African and African enterprises — **legal, financial services, professional services first**. Buyers who must satisfy POPIA and prefer/need data residency.
**Decision-makers:** CTO / Head of Engineering (technical buyer), CISO / Information Officer / compliance lead (risk buyer), CEO/CFO (financial buyer). Tumiso Ramaboya is himself a CEO + POPIA Information Officer — speak to that reader.
**Secondary / top-of-funnel audience (for YouTube + IG/TikTok):** African founders & SME tech leaders, developers and AI/ML practitioners, and the broader SA tech community. These are not the enterprise buyer directly, but build the brand authority that the enterprise buyer encounters when they Google us.
**Primary use case:** Build and run production AI (RAG, agents, fine-tuning) **without** shipping regulated data to US-hosted SaaS.
**Jobs to be done:**
- "Help me use modern AI without violating POPIA / losing data residency."
- "Give me an enterprise AI stack I can actually get past my compliance and procurement teams."
- "Replace a pile of stitched-together open-source tools with one governed platform."
**Use cases:** RAG knowledge bases over internal/regulated documents; internal AI agents; model fine-tuning with audit trails; AI governance & bias/observability reporting for regulators.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Technical buyer (CTO/Eng lead) | Capability, not rebuilding commodity infra | Stitching LangGraph/LlamaIndex/Qdrant/vLLM themselves | One governed platform on a proven open stack, in af-south-1 |
| Risk buyer (CISO/Information Officer) | POPIA Sections 11/19/72, audit trail, data residency | US-hosted AI = cross-border + residency risk | POPIA-native architecture, af-south-1 residency, governance hub |
| Financial buyer (CEO/CFO) | ZAR cost, ROI, procurement fit | Forex exposure + procurement friction of foreign vendors | ZAR pricing, local support, local entity |
| Developer (user) | DX, time-to-first-agent | Glue code, no governance | Builder UX + observability built in |

## Problems & Pain Points
**Core problem:** African enterprises want modern AI but cannot freely send regulated data to US-hosted SaaS without POPIA cross-border and data-residency exposure.
**Why alternatives fall short:**
- US-hosted AI SaaS (OpenAI/Anthropic direct, US clouds) — cross-border transfer + residency concerns; ZAR forex exposure; no local support/entity.
- DIY open-source stack — high engineering cost, no governance/audit layer, scales with headcount not infrastructure.
**What it costs them:** Stalled AI initiatives, compliance/legal review cycles, forex-priced bills, engineering time on plumbing instead of product.
**Emotional tension:** Fear of a POPIA finding; frustration at being told "the AI tools aren't built for our jurisdiction."

## Competitive Landscape
**Direct:** Foreign enterprise AI platforms / US hyperscaler AI suites — fall short on POPIA-native posture, af-south-1 residency, ZAR pricing, and local support.
**Secondary:** DIY assembly of open-source AI tooling — falls short on governance, audit, and total cost.
**Indirect:** "Do nothing / wait" — falls short because competitors adopt AI and the compliance risk of shadow AI grows anyway.
**Procurement comparables (the bar, not direct rivals):** Stripe, Linear, Vercel, Anthropic — the polish and trust standard buyers expect.

## Differentiation
**Key differentiators:**
- POPIA-native architecture (designed around Sections 11, 19, 72) — not bolted on.
- AWS af-south-1 data residency — the only POPIA-clean region story.
- ZAR pricing + local entity + local support.
- Built on a proven open-source stack (LangGraph, LlamaIndex, Qdrant, Axolotl+vLLM, Fairlearn/SHAP/Evidently/Langfuse, LiteLLM) — never rebuild commodity infra.
- Governance is a first-class pillar, not a feature.
**How we do it differently:** One governed platform spanning agents, RAG, fine-tuning and governance, all in-region.
**Why that's better:** Gets past compliance and procurement; removes forex and residency risk; removes glue-code cost.
**Why customers choose us:** They can deploy real AI and defend it to a regulator.

## Objections
| Objection | Response |
|-----------|----------|
| "Can a South African platform match global tooling?" | Built on the same proven open-source stack the global players use — we add governance + residency, not lock-in. |
| "Why not just use OpenAI/Azure directly?" | Cross-border + residency exposure under POPIA; ZAR forex; no local entity/support. We keep data in af-south-1. |
| "You're early-stage — is it production-ready?" | Phase 1 AI Dev Platform is real; SOC 2 Type I targeted Phase 1, Type II + POPIA cert Phase 2. Be honest about phasing. |

**Anti-persona:** US/EU-only companies with no Africa data-residency need; hobbyists wanting a free playground; anyone needing Phase 3 features today.

## Switching Dynamics
**Push:** POPIA risk of current shadow/US-hosted AI; forex-priced bills; engineering drowning in glue code.
**Pull:** Compliant-by-design AI they can actually ship and defend; ZAR pricing; local support.
**Habit:** Existing US cloud contracts and familiarity; "we'll figure out compliance later."
**Anxiety:** Trusting a newer local vendor; migration effort. (Counter with proof: open stack, SOC 2 roadmap, founder visibility.)

## Customer Language
**How they describe the problem:**
- "We can't put our client data into ChatGPT."
- "Legal won't sign off on US-hosted AI."
- "Where can we actually host AI in South Africa?"
**How they describe us:**
- "POPIA-compliant AI platform" / "AI built for our jurisdiction."
**Words to use:** POPIA-native, data residency, af-south-1, governance, audit trail, sovereignty, ZAR, in-region.
**Words to avoid:** "magic," "revolutionary," hype superlatives; vague "AI-powered" filler; claiming Phase 2/3 features are shipping.
**Glossary:**
| Term | Meaning |
|------|---------|
| af-south-1 | AWS Cape Town region — the POPIA-clean data-residency region |
| POPIA | Protection of Personal Information Act (SA). Key sections: 11 (lawful processing), 19 (security safeguards), 72 (cross-border transfer) |
| RAG | Retrieval-Augmented Generation (RAG Studio) |
| Governance Hub | Bias/observability/audit layer (Fairlearn, SHAP, Evidently, Langfuse) |

## Brand Voice
**Tone:** Precision over personality. Authoritative, calm, technically credible. Educational, not hypey.
**Style:** Direct, evidence-led, specific. Cite statute and architecture, not adjectives.
**Personality:** Precise · Trustworthy · Sovereign (Africa-built) · Technical · Composed.
**Visual law:** Single primary blue `#0B9EDE`. Amber `#F97316` is **accent-only** (pricing/upgrade/premium). en-ZA. If a visual would look out of place next to Linear / Stripe / Vercel / Anthropic, it does not ship. **Design-system v3 tokens are the source of truth for every asset, including AI-generated ones** — see `systemdesign/15-governance.md`.

## Proof Points
**Metrics:** (Early-stage — use roadmap honestly.) SOC 2 Type I (Phase 1 target), SOC 2 Type II + POPIA cert (Phase 2), ISO 27001 (Phase 3).
**Customers:** Phase 1 in progress (target 10). Do not invent logos.
**Value themes:**
| Theme | Proof |
|-------|-------|
| POPIA-native | Architecture mapped to Sections 11/19/72; Governance Hub |
| Data residency | All workloads on AWS EKS in af-south-1 |
| Proven stack | LangGraph, LlamaIndex, Qdrant, vLLM, Langfuse, LiteLLM |
| Local advantage | ZAR pricing, SA entity, local support |

## Goals
**Business goal:** Phase 1 — land 10 customers / R500K ARR; establish category authority as Africa's POPIA-native enterprise AI platform.
**Conversion action (site):** Book a demo / contact sales; secondary: read the blog cluster, join waitlist.
**Conversion action (social, top-of-funnel):** Drive aware audience from YouTube/IG/TikTok → site/blog → demo. Measured via UTM'd link-in-bio + GA.
**Current metrics:** Pre-launch social presence (baseline ~0); blog cluster publishing per `SEO-content-adoption-plan.md`.
