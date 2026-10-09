# Social-Video Content Strategy (v1)

> Companion to `SEO-content-adoption-plan.md` and anchored on `.agents/product-marketing.md`.
> Status: 2026-05-31 — drafted after installing `higgsfield-*` (4 skills) and `claude-youtube`
> alongside the existing `coreyhaines31/marketingskills` (57). Owner: Tumiso Graig Ramaboya.
> Governance: inherits all rules from `systemdesign/15-governance.md` and the SEO adoption plan —
> **design-system v3 tokens are the source of truth for every asset, including AI-generated ones.**

---

## 0. Decisions locked this cycle

| Decision | Choice |
|---|---|
| Priority platforms | **YouTube** (long-form + Shorts) and **Instagram/TikTok** (short-form). LinkedIn/X deferred to a later phase. |
| Higgsfield | Account ready — avatar/video/image generation is in-scope for production (not this doc's scope, which is planning only). |
| This document | Strategy only. No content produced yet. |

---

## 1. Positioning — why an enterprise B2B brand goes video-first

SonOfGraig sells to enterprise risk/technical/financial buyers (see `.agents/product-marketing.md`).
Those buyers are **not** scrolling TikTok to evaluate AI platforms. So the video channels do a
**different job** than the website: they build **category authority and awareness** that the
enterprise buyer encounters *later*, when they Google us, read the blog, and book a demo.

**The funnel bridge (video is top-of-funnel only):**

```
DISCOVERY (YouTube / Reels / TikTok)        → awareness + authority
   "Can SA companies legally use ChatGPT?"
            │  link-in-bio / pinned link (UTM)
            ▼
CONSIDERATION (site + blog cluster)         → the existing SEO engine
   /popia, /platform, blog pillar + supporting posts
            │
            ▼
CONVERSION (demo / contact / waitlist)      → measured in GA
```

Video does not try to close enterprise deals. It earns attention from the **secondary audience**
(African founders, developers, the SA tech community) and converts a slice of them — and the
enterprise buyers watching quietly — into site visitors. The blog/SEO engine and sales motion
take it from there. This is why every video ends by pointing to a site URL, not a hard sell.

**Honesty constraint:** demos and "how it works" content use **Phase 1 (AI Dev Platform) only**.
Phase 2/3 clusters may be referenced as vision, never shown as shipping.

---

## 2. Content pillars

Five pillars, each tagged with the sub-audience it serves and the existing asset it leans on.

| # | Pillar | What it is | Primary audience | Leans on |
|---|---|---|---|---|
| P1 | **POPIA & AI compliance** | Plain-language explainers: "Can SA companies legally use ChatGPT?", "What POPIA Section 72 actually requires." | Risk buyers + founders | Blog supporting post `popia-sections-11-19-72-and-ai-architecture`; `/popia`, `/security` |
| P2 | **AI sovereignty / Africa thesis** | Brand-defining: why Africa needs its own enterprise AI platform; data residency. | Founders + tech community + press | Blog pillar `why-africa-needs-its-own-enterprise-ai-platform`; Remotion `ServicesToSaaS` |
| P3 | **Enterprise AI education** | "What is RAG?", "RAG vs fine-tuning vs agents", "Why governance is a pillar." | Developers + technical buyers | Blog `four-pillar-ai-dev-platform`; Remotion `PlatformCompounding` |
| P4 | **Build-in-public / behind the platform** | Founder-led: building an African enterprise SaaS, decisions, milestones. | Founders + community | Tumiso as on-screen presenter (Higgsfield Soul-ID) |
| P5 | **Product / feature drops** | Short demos of Phase 1 surfaces as they ship (Agent Builder, RAG Studio, Governance Hub). | Technical + risk buyers | Product screen recordings + Remotion overlays |

**Pillar mix (steady state):** P1/P3 ≈ authority engine (40%), P2 ≈ brand (20%), P4 ≈ trust/relatability (25%), P5 ≈ product (15%). Adjust once data lands.

---

## 3. Format & channel split

| Surface | Format | Length | Job |
|---|---|---|---|
| YouTube long-form | Explainer / demo / thesis | 5–12 min | Authority, SEO (YouTube is a search engine), evergreen |
| YouTube Shorts | Single-concept vertical | 15–60 s | Discovery, subscriber funnel |
| Instagram Reels | Single-concept vertical | 15–60 s | Discovery, brand |
| TikTok | Single-concept vertical | 15–60 s | Discovery, reach |

**Repurposing rule (the engine that makes cadence feasible):** every long-form video is scripted
so that **≥3 short-form clips** fall out of it (one strong hook/segment each), cross-posted to YT
Shorts + Reels + TikTok with platform-native captions. Source: `claude-youtube /youtube repurpose`
+ the `social` skill. This is the same logic as the blog topic-cluster — one idea, many surfaces.

**Channel-to-blog pairing:** each long-form video maps 1:1 to a blog post in the existing cluster,
so video and blog reinforce the same keywords and the video description links to the post.

---

## 4. Cadence (founder-led starter, then scale)

| Phase | YouTube long-form | Short-form (YT Shorts + Reels + TikTok) | Driver |
|---|---|---|---|
| Starter (months 1–2) | 1 / week | 3–4 / week | Repurposed from the long-form + blog |
| Scale (month 3+, if metrics hold) | 1–2 / week | 5–7 / week | Add P4 build-in-public cadence |

Realistic for a founder-led team because short-form is **repurposed**, not net-new. If a week
slips, hold long-form quality and let short-form flex — never ship off-brand to hit a number.

---

## 5. Production pipeline — skill-to-asset map

| Step | Skill(s) | Output |
|---|---|---|
| Channel positioning & niche | `claude-youtube /youtube strategy`, `content-strategy` | Channel positioning doc, content pillars confirmed per tier (New: <1K subs) |
| Idea generation | `claude-youtube /youtube ideate`, `social` | Ranked video ideas tied to pillars + blog cluster |
| Long-form script | `claude-youtube /youtube script` + `/youtube hook` + `copywriting` | Retention-engineered script with pattern interrupts, 3 hook variants |
| On-screen presenter / avatar | `higgsfield-soul-id` (train Tumiso's Soul Character **once** → reference_id), then `higgsfield-generate` (`text2image_soul_v2` / `soul_cinema_studio`, `--soul-id`) | Identity-faithful talking-head / presenter clips |
| Motion graphics & diagrams | **Reuse existing Remotion compositions** (`BlogHeroPillar/Compliance/Platform`, `ServicesToSaaS`, `SecurityPosture`, `PlatformCompounding`) — already on brand tokens | MP4 segments, on-brand, zero licensing exposure |
| Product / B-roll imagery | `higgsfield-product-photoshoot`, `image` | Brand-quality stills, lifestyle/hero shots |
| Thumbnails | `claude-youtube /youtube thumbnail` (+ NanoBanana MCP if configured) + `image` | Primary + 3 A/B thumbnail variants, 16:9 |
| Shorts cut-downs | `claude-youtube /youtube shorts` + `/youtube repurpose` | 3+ vertical clips per long-form, platform captions |
| Pre-publish virality check | `higgsfield-generate` Virality Predictor (`brain_activity`) | Hook strength / attention / retention / distraction score before publishing |
| Upload metadata | `claude-youtube /youtube metadata`, `ai-seo`, `schema` | Title/description/tags + `VideoObject` JSON-LD (ties to SEO adoption plan §VideoObject gap) |

**Tooling notes:**
- `claude-youtube` works with **no API keys**; YouTube Data API / DataForSEO / NanoBanana are optional accelerators. Channel/competitor audits use them if present, else manual input.
- Higgsfield requires account auth to generate (Tumiso has the account). **One-time setup:** authenticate the Higgsfield CLI / API key outside any tracked file before first generation run.
- Train the Soul Character **once**; reuse the `reference_id` across all P4/presenter content for consistency.

---

## 6. Brand governance call-out — DECISION NEEDED

The SEO adoption plan §5 commits to **"zero third-party AI-image-generator licensing exposure"** —
all imagery generated from our own Remotion compositions on our own tokens. **Introducing
Higgsfield-generated avatars and video changes that posture.** This is a deliberate trade and
should be ratified, not slipped in.

**Proposed rule (for ratification into `systemdesign/15-governance.md`):**
1. **Brand fidelity:** Higgsfield outputs must respect design-system v3 tokens (primary `#0B9EDE`; amber `#F97316` accent-only). Diagrams/motion stay on Remotion; Higgsfield is for presenter/avatar/B-roll, not core brand graphics.
2. **Likeness:** founder on-screen presence via **owned Soul-ID only** (Tumiso's trained character) — no third-party faces, no stock-person avatars.
3. **Provenance & review:** a brand-consistency review step before any AI-generated asset publishes; log the model + prompt used (Higgsfield returns job IDs — record them).
4. **Audio:** no YouTube Audio Library tracks on brand content; licensed library (Artlist/Musicbed) only — consistent with adoption plan §5.
5. **Security:** the higgsfield skills were flagged High/Critical by Snyk on install and run with full agent permissions — review generated CLI calls before executing; never paste secrets into tracked files.

Until ratified, treat Higgsfield as **approved for presenter/B-roll on social video** and Remotion
as the **only** source for on-site/brand-graphic visuals.

---

## 7. 30-day starter calendar (aligned to the blog W1–W4 cluster)

Each week's video repurposes the **same topic cluster** the blog is publishing that week
(per `SEO-content-adoption-plan.md` §4), so video and blog compound on the same keywords.

| Week | Channel setup | Long-form (YouTube) | Pillar | Short-form (×3 → YT/Reels/TikTok) | Blog pairing |
|---|---|---|---|---|---|
| **W0 (setup)** | Create/position YouTube channel (`/youtube strategy`), IG + TikTok handles, bios, UTM'd link-in-bio to site. Train Tumiso's Soul-ID. Confirm Higgsfield auth. | — | — | — | — |
| **W1** | — | "Why Africa Needs Its Own Enterprise AI Platform" (thesis) | P2 | 3 cuts: data-residency hook / 5-cluster thesis / "ChatGPT + POPIA" teaser | Pillar post |
| **W2** | — | "Can South African Companies Legally Use ChatGPT? (POPIA §72)" | P1 | 3 cuts: §72 one-liner / "anonymisation isn't enough" / encryption-at-rest | Supporting: POPIA |
| **W3** | — | "RAG vs Fine-Tuning vs Agents — for SA enterprises" | P3 | 3 cuts: RAG-in-30s / when-to-fine-tune / governance-is-a-pillar | Supporting: Four Pillars |
| **W4** | Submit YouTube channel for review; log baseline metrics | "Building an African Enterprise AI Platform" (build-in-public) | P4 | 3 cuts: founder intro / why af-south-1 / behind-the-stack | Cross-links all three |

After W4: re-check metrics (below), then settle into the steady-state cadence (§4).

---

## 8. Measurement

Extend the existing **manual monthly check** in `SEO-content-adoption-plan.md` §7 — do not add a
heavyweight analytics stack. Reuse the wired `GoogleAnalytics` component + UTM'd link-in-bio.

**Per-platform monthly log (30 min):**

| Metric | YouTube long | YouTube Shorts | Reels | TikTok |
|---|---|---|---|---|
| Views | | | | |
| Avg % viewed / retention | | | | |
| CTR (thumbnail, YT only) | | n/a | n/a | n/a |
| Followers/subs gained | | | | |
| Link clicks to site (UTM) | | | | |

**Funnel metric that matters most:** clicks from social → site (UTM) and whether any reach
`/platform` or a demo CTA in GA. That is the only number proving video feeds the funnel; vanity
views without site clicks mean the content isn't bridging.

**Quarterly:** roll this into the existing `seo-audit` quarterly pass and the AI-visibility log.

---

## 9. Governance & evolution

- This doc is **v1**; bump the header version on material change.
- Subordinate to `systemdesign/15-governance.md` and `.agents/product-marketing.md` — if those change, reconcile here.
- The §6 Higgsfield posture change is the one item requiring explicit sign-off before scaled production.
- Add LinkedIn/X as a Phase-2 channel expansion once the YouTube + IG/TikTok engine is producing reliably.
