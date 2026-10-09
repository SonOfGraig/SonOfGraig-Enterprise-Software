# SEO + Content Adoption Plan (Marketing Skills v1)

> Companion to the locked `sonofgraig SEO Entity System v1.0` referenced in `app/layout.tsx`.
> Status: 2026-05-29 — drafted after global install of `coreyhaines31/marketingskills` (57 skills, `~/.claude/skills/`).
> Owner: Tumiso Graig Ramaboya.

---

## 1. What the audit found

### Already strong (do not redo)

| Area | Evidence |
|---|---|
| Root metadata | Full Next.js Metadata API in `app/layout.tsx` — title, description, keywords, OG, Twitter, canonical, robots, icons, `en-ZA` locale, `applicationName`, `category`. |
| Organization schema | Dual-typed `Organization` + `LocalBusiness` + `ProfessionalService` JSON-LD with NAICS 511210, ISIC 5820, Wikipedia `additionalType`, founder `Person` sub-entity, `sameAs` to LinkedIn/Crunchbase/GitHub/Insta, three `ContactPoint`s, `knowsAbout` taxonomy covering all five clusters. |
| Website schema | Separate `WebSite` node with `publisher` reference to Organization `@id`. |
| Sitemap | Static `app/sitemap.ts` with per-route priority + changeFrequency. |
| Robots | `app/robots.ts` explicitly allowlists GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot. Best-in-class GEO posture. |
| llms.txt | Present at `public/llms.txt` — covers platform, services, company, optional. Aligned with llmstxt.org spec. |
| PWA | `app/manifest.ts` with brand colours from design tokens. |
| OG image | Generated programmatically via `app/opengraph-image.tsx`. |
| Analytics | `GoogleAnalytics` component wired into root layout. |
| Render pipeline for visuals | Remotion already scaffolded at `remotion/`, 13 compositions, design-token mirror in `remotion/src/tokens.ts`. |

### Gaps mapped to installed skills

| Gap | Skill | Priority |
|---|---|---|
| `app/(public)/blog/page.tsx` and `[slug]/page.tsx` use **inline mock data**. No content store, no MDX, no posts manifest. | `content-strategy`, `copywriting` | **P0** — blocks everything else |
| No `Article` / `BlogPosting` JSON-LD per post; no `BreadcrumbList` JSON-LD (breadcrumb HTML exists). | `schema`, `ai-seo` | **P0** |
| `app/sitemap.ts` line 9 explicitly omits dynamic `/blog/[slug]` "until a posts manifest exists." | `seo-audit`, `site-architecture` | **P0** — fix the moment posts land |
| `[slug]/page.tsx` line 64 falls back to a Cloud Run URL instead of `NEXT_PUBLIC_SITE_URL` — wrong canonical / share URL in some envs. | `seo-audit` | **P1** — one-line fix |
| No per-post OG image. All posts share the generic `/opengraph-image`. | `image`, `ai-seo` | **P1** |
| No `VideoObject` schema despite 13 Remotion compositions and `public/video/` folder. | `schema`, `video` | **P1** |
| No author surface on posts (`author` field, author page, byline). Tumiso is in Organization → founder but not on Article. | `schema`, `copywriting` | **P1** |
| No tag/category taxonomy routes. Category strings are inline (`"Strategy"`, `"Engineering"`, …) with no `/blog/category/[slug]`. | `site-architecture`, `programmatic-seo` | **P2** |
| Hreflang single-locale (`en-ZA` only) — viable today, becomes a constraint when targeting global enterprise. | `seo-audit` (International section) | **P3** — defer |
| No FAQ schema on `/pricing`, `/popia`, `/security`, `/services/*`. | `schema`, `ai-seo` | **P2** |
| Web app description on `manifest.ts` differs from `metadata.description` in root layout ("Africa's first…" vs "enterprise software company headquartered in South Africa…"). Entity drift over time. | `seo-audit` | **P2** — pick one |

---

## 2. How we adopt the marketing skills

### Posture

The skill pack ships 57 patterns. We're not adopting all 57 — we're adopting the **seven that close real gaps** and treating the rest as on-demand. Skills are markdown playbooks loaded as context; running them is free, ignoring them is free. The cost is consistency drift if we use them ad hoc.

### Active skills (committed to workflow)

| Skill | When we invoke it | Owner artefact |
|---|---|---|
| `product-marketing` | First skill loaded in every marketing-flavoured session — it's the foundation context other skills reference. | Create `.agents/product-marketing.md` at repo root with locked entity facts + ICP + voice. Several skills auto-read this. |
| `ai-seo` | Every blog post draft, every cluster page rewrite. | This file + per-post answer-block checklist. |
| `seo-audit` | Quarterly site-wide audit + before each new cluster launch. | Quarterly audit doc in `systemdesign/source-docs/`. |
| `schema` | Every new content type. | A single `lib/seo/schema.ts` helper exporting typed JSON-LD builders (`articleJsonLd`, `breadcrumbJsonLd`, `videoJsonLd`, `faqJsonLd`). |
| `copywriting` + `copy-editing` | Every public-facing piece of copy. | Voice guide section in `product-marketing.md`. |
| `image` | Per-post hero spec. | Brief template at `remotion/src/blog/_briefs/` colocated with compositions. |
| `video` | Whenever a Remotion composition ships to a public page or to social. | `VideoObject` JSON-LD emitted from the same posts manifest. |

### Background skills (loaded on demand)

`programmatic-seo` (when we build comparison/category pages at scale), `site-architecture` (next IA review), `cro` + `ab-testing` (when blog → trial conversion is measurable), `content-strategy` (planning each quarter), `competitors` (Q3 2026, ahead of RAG Studio launch).

### Skills we are explicitly **not** adopting yet

`ads`, `ad-creative`, `cold-email`, `prospecting`, `referrals`, `paywalls`, `aso`, `directory-submissions`, `community-marketing`, `sms` — none map to current quarter goals.

---

## 3. Content infrastructure (P0 work)

The blog scaffolding needs to move from **inline mock** to **typed posts manifest** so the sitemap, schema, related links, and Remotion asset pipeline can all share one source of truth.

### Proposed structure

```
lib/blog/
  index.ts              # getAllPosts(), getPost(slug), getPostsByCategory()
  posts/
    why-africa-needs-its-own-enterprise-ai-platform.ts   # pillar
    popia-sections-11-19-72-and-ai-architecture.ts       # supporting
    four-pillar-ai-dev-platform.ts                       # supporting
  schema.ts             # articleJsonLd(), breadcrumbJsonLd(), videoJsonLd()
  types.ts              # Post, Author, Category interfaces
```

Each post file is a TypeScript module exporting a typed `Post` object — title, slug, excerpt, category, date, updated, readingTime, author, hero (Remotion composition id), motion (Remotion composition id), body (HTML or MDX string), and SEO overrides (custom title, custom description, keywords).

**Why TypeScript-per-post, not MDX:**
- The repo is already a Next.js 15 app with no MDX dependency. Adding `@next/mdx` and a content-loader is more surface than needed for three posts.
- TypeScript posts get type-checked at build time — broken category refs, missing authors, malformed dates all fail the build instead of shipping.
- One Post export per file makes diffs clean and review-friendly.

If volume scales past ~20 posts, migrate to MDX or a headless CMS (Sanity, Payload). Not now.

### Sitemap fix

Replace the comment on `app/sitemap.ts:9-10` with a loop over `getAllPosts()` emitting `${SITE_URL}/blog/${post.slug}` with `lastModified: post.updated`. Priority 0.6, changeFrequency `monthly`.

### Per-post Article JSON-LD

Inject on `[slug]/page.tsx` alongside the existing prose. Builder lives in `lib/blog/schema.ts`. Required fields: `@type: 'BlogPosting'`, `headline`, `description`, `image` (per-post hero), `author` (`{ '@id': '${SITE_URL}#founder' }` → reuses the Organization founder entity), `publisher` (`{ '@id': '${SITE_URL}#organization' }`), `datePublished`, `dateModified`, `mainEntityOfPage`, `articleSection` (category), `keywords`, `inLanguage: 'en-ZA'`.

### BreadcrumbList JSON-LD

The breadcrumb HTML already exists (`[slug]/page.tsx:75-77`). Emit the matching JSON-LD: `Home → Insights → {category} → {title}`. Three positions.

### Per-post OG image

Use the existing `app/opengraph-image.tsx` pattern as a template; create `app/(public)/blog/[slug]/opengraph-image.tsx` that reads the post by slug and renders a per-post variant. Or — simpler — render the Remotion `hero` composition for the post as a still PNG at build time and reference it as a static asset under `public/blog/og/{slug}.png`. Remotion supports `npx remotion still` for this. Go with the still-render path: zero runtime cost, deterministic, on-brand.

---

## 4. The three posts (cluster strategy)

### Topic-cluster shape

```
                                  PILLAR
                                    │
                Why Africa Needs Its Own Enterprise AI Platform
                          (compliance × geography × thesis)
                                    │
                ┌──────────────────┴──────────────────┐
                ▼                                     ▼
   SUPPORTING POST 1                     SUPPORTING POST 2
   POPIA × AI Architecture               Four Pillars of the AI Dev Platform
   (deep-dive into Sections 11/19/72)    (deep-dive into product clusters)
                │                                     │
                └─── bidirectional internal links ────┘
                              + linked from pillar
```

Both supporting posts link back to the pillar; the pillar links forward to both. All three link out to existing canonical pages: `/popia`, `/security`, `/platform`, `/platform/ai-dev-platform`, `/services/ai-governance-audit`.

### Post 1 — PILLAR

| Field | Value |
|---|---|
| Slug | `why-africa-needs-its-own-enterprise-ai-platform` |
| Working title | **Why Africa Needs Its Own Enterprise AI Platform** |
| Category | Strategy |
| Primary keyword | enterprise AI platform South Africa |
| Secondary | POPIA-native AI, AI sovereignty Africa, AWS af-south-1 AI |
| Target length | 2,800–3,200 words |
| Intent | Informational + brand-defining. Captures fan-out queries: "AI compliance South Africa," "where to host AI in Africa," "enterprise AI vs US-hosted SaaS." |
| Key answer blocks (40–60 words each, top of section) | (1) Why data residency matters for South African AI; (2) What POPIA Section 72 requires architecturally; (3) Why af-south-1 is the only POPIA-clean region; (4) The five-cluster thesis in one paragraph. |
| Citation hooks | Information Regulator publications, AWS af-south-1 launch date, POPIA Act text, NACI AI Plan 2024. |
| Hero composition (Remotion) | New: `BlogHeroPillar` — animated map of Africa with af-south-1 datacentre node, layered five-cluster nodes, light/dark variants. |
| Motion composition | Reuse existing `ServicesToSaaS` as the secondary motion graphic (already on-brand for the thesis). |
| Internal links out | `/popia`, `/security`, `/platform`, `/about`, both supporting posts. |
| External links | Information Regulator (gov.za), AWS af-south-1 announcement, POPI Act on the SA government gazette site. |

### Post 2 — SUPPORTING (compliance)

| Field | Value |
|---|---|
| Slug | `popia-sections-11-19-72-and-ai-architecture` |
| Working title | **POPIA Sections 11, 19 & 72: What They Mean for AI Architecture** |
| Category | Compliance |
| Primary keyword | POPIA AI compliance |
| Secondary | POPIA Section 72 cross-border, POPIA Section 19 security safeguards, POPIA Section 11 lawful processing |
| Target length | 1,400–1,700 words |
| Intent | Long-tail informational. High-extractability — compliance officers and CTOs Googling specific sections. Optimal for AI citation. |
| Key answer blocks | (1) What Section 11 lawful-processing means for training data; (2) What Section 19 security-safeguards means for vector stores; (3) What Section 72 cross-border means for LLM providers; (4) Where DPA + SCC fit. |
| FAQ schema (4 Q&As) | "Does Section 72 ban using OpenAI?" / "Is anonymisation enough to skip POPIA?" / "Does Section 19 require encryption at rest?" / "What's the penalty for Section 11 violation?" |
| Hero composition | New: `BlogHeroCompliance` — stacked POPIA section cards with check/warning iconography on each architectural layer (ingest, store, infer, audit). |
| Motion composition | Reuse `SecurityPosture`. |
| Internal links out | `/popia`, `/security`, `/services/ai-governance-audit`, pillar post. |
| External links | gov.za POPIA, Information Regulator guidance notes. |

### Post 3 — SUPPORTING (product)

| Field | Value |
|---|---|
| Slug | `four-pillar-ai-dev-platform` |
| Working title | **RAG, Agents, Fine-Tuning, Governance: The Four Pillars of an Enterprise AI Dev Platform** |
| Category | Product |
| Primary keyword | enterprise AI development platform |
| Secondary | RAG vs fine-tuning, AI agent platform, AI governance hub |
| Target length | 1,500–1,800 words |
| Intent | Mid-funnel evaluation. Buyers comparing "AI platforms" — captures comparison queries which `ai-seo` flags as ~33% of AI citations. |
| Key answer blocks | (1) What RAG Studio solves; (2) What Agent Builder solves; (3) When you fine-tune vs RAG; (4) Why Governance is a pillar, not a feature. |
| Comparison table | RAG vs Fine-Tuning vs Agents — when to use each (high citation-bait format per Princeton GEO study). |
| Hero composition | New: `BlogHeroPlatform` — four-pillar diagram with shared identity/observability/audit base layer. |
| Motion composition | Reuse `PlatformCompounding`. |
| Internal links out | `/platform/ai-dev-platform`, `/services/rag-knowledge-base-setup`, `/services/ai-agent-implementation`, pillar post. |
| External links | LangGraph docs, LlamaIndex docs, OpenAI fine-tuning docs. |

### Calendar

| Date | Action |
|---|---|
| **W1 (this sprint)** | Land content infrastructure (`lib/blog/`, schema helpers, sitemap fix, canonical fix). Draft + publish pillar. |
| **W2** | Publish Supporting 1 (POPIA). Render hero stills + motion exports. |
| **W3** | Publish Supporting 2 (Four Pillars). |
| **W4** | Submit updated sitemap to Search Console. Manual AI-visibility check for the three primary keywords across ChatGPT, Perplexity, Google AI Overviews; log baseline in a spreadsheet. |
| **+90d** | Re-check AI visibility. First quarterly `seo-audit` skill pass. |

---

## 5. Image / video production (Remotion-backed)

### Per-post asset set

| Asset | Source | Output | Used where |
|---|---|---|---|
| Hero still (light) | Remotion composition `BlogHero<X>` | `public/blog/og/{slug}.png` 1200×630 | `<meta property="og:image">`, post header image, related-post cards |
| Hero still (dark) | Same composition, `theme: 'dark'` | `public/blog/og/{slug}-dark.png` | Dark-mode preview, social variants |
| Motion graphic | Reused existing composition | `public/blog/motion/{slug}.mp4` 1280×720 30fps | Inline `<video>` mid-article |
| Alt text | Hand-written, 100–125 chars | post manifest field | a11y + AI extractability |

### Build commands

Add `npm` scripts to the root `package.json`:

```json
"render:blog-og": "remotion still remotion BlogHeroPillarLight public/blog/og/why-africa-needs-its-own-enterprise-ai-platform.png",
"render:blog-motion": "remotion render remotion ServicesToSaaSDark public/blog/motion/why-africa-needs-its-own-enterprise-ai-platform.mp4"
```

(One pair per post; a `render:blog-all` umbrella script chains them.)

**Operational gotcha (logged 2026-05-29):** `remotion/` ships with chained umbrella scripts
(`render:blog-all`, `render:blog-motion-all`). The chains call `npm run X && npm run Y && …`,
and Remotion's `BrowserRunner` enforces a hard 25 s timeout when reconnecting to the headless
Chrome between invocations. On colder machines the second invocation can exceed that and abort
mid-chain. Two acceptable mitigations:
- Run the per-post scripts individually when a chain fails — each invocation is idempotent
  (`Config.setOverwriteOutput(true)` in `remotion.config.ts`), so re-running is safe.
- Pre-warm by running `npx remotion browser ensure` once after `npm install`. The headless
  Chrome binary lives at `remotion/node_modules/.remotion/chrome-headless-shell/`.

Stills (the OG PNG pipeline) are robust — bundle once, render six in seconds. The chain only
becomes flaky for full MP4 renders, which are minute-scale per file.

### Copyright posture

- All imagery is generated from our own Remotion compositions on our own design tokens. Zero third-party stock, zero AI-image-generator licensing exposure, zero attribution debt.
- No background music. If audio is added later, use a licensed library (Artlist, Musicbed) — never YouTube Audio Library tracks on enterprise content.
- Prose is original. We do not paraphrase competitor blog posts. POPIA text quoted from gov.za is statute and freely reproducible with attribution.
- Founder photo (if used): owned content per Crunchbase/LinkedIn presence already established.

---

## 6. Single-source-of-truth fixes (one-line patches bundled with W1)

1. `app/(public)/blog/[slug]/page.tsx:62-64` — replace `process.env.APP_URL ?? 'https://sonofgraig-enterprise-179668402458.africa-south1.run.app'` with the same `SITE_URL` constant pattern used everywhere else (`process.env.NEXT_PUBLIC_SITE_URL ?? process.env.APP_URL ?? 'https://sonofgraig.com'`).
2. `app/manifest.ts` line 7 description — align with `SITE_DESCRIPTION` in `app/layout.tsx` or vice versa; pick one phrasing and reference the same string from both.
3. `app/sitemap.ts:9-10` — replace the deferral comment with the dynamic blog loop.

---

## 7. Measurement

We're not adding a heavyweight analytics stack. Reuse existing `GoogleAnalytics` component + manual AI-visibility logs.

**Monthly check (manual, 30 minutes):**

| Query | GAI Overview | ChatGPT | Perplexity | sonofgraig cited | Top competitor cited |
|---|---|---|---|---|---|
| enterprise AI platform South Africa | y/n | y/n | y/n | y/n | _ |
| POPIA compliant AI | y/n | y/n | y/n | y/n | _ |
| AI dev platform Africa | y/n | y/n | y/n | y/n | _ |
| RAG Studio | y/n | y/n | y/n | y/n | _ |
| Agent Builder South Africa | y/n | y/n | y/n | y/n | _ |
| POPIA Section 72 cross-border AI | y/n | y/n | y/n | y/n | _ |

Log the spreadsheet alongside this doc; review at the quarterly audit.

**GSC:** Submit sitemap on publish day 1. Watch Coverage and Performance for `/blog/*` URLs; first impressions typically appear 2–6 weeks after submission.

---

## 8. Governance: how this evolves

- This document lives at `systemdesign/source-docs/SEO-content-adoption-plan.md`. Treated as v1 — bump version in this header when materially changed.
- Aligned with `systemdesign/15-governance.md` rules: design-system tokens are the source of truth for any visual asset; nothing here overrides them.
- New posts follow the W1 infrastructure pattern — no exceptions, no inline mocks.
- Quarterly check: re-read this doc, run `seo-audit`, refresh `llms.txt` if new platform pages have shipped, prune stale keywords, add new comparison posts as competitors emerge.
