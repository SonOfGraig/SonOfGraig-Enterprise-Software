# 17 — Motion library: porting the 2026 agency site (v3.1)

Source: `C:\SonOfGraig Digital Solutions\Technology and Development\App Development\SonOfGraig-Digital-Solutions-2026\components` (Vite + React, ~140 components). Founder direction (2026-10-09): **its components, backgrounds and section motion are the reference experience — port them into this site rather than inventing new ones.**

## How a component is ported (do all four, every time)

1. **Keep the choreography.** Counts, speeds, easing, geometry and timing stay as designed.
2. **Re-skin with tokens.** Colours from `--sg-*` / `--rays-rgb`, never hex. Brand blue only — the originals' orange (`#FF6201`) is dropped outside pricing/upgrade moments (01-color).
3. **Harden.** Size to the section (not the window), cap DPR at 1.5, pause off-screen and in hidden tabs, honour `prefers-reduced-motion`, read theme from the nearest `[data-theme]`. Canvas scenes get all of this for free from `components/fx/canvas/useCanvasScene.ts` — a ported scene is only `init` + `frame`.
4. **Strip fiction.** The originals show invented telemetry ("99.998% uptime", "12.4 TB/s", "1,241 nodes"). Port the *motion* (counters, live bars), never the numbers. Real figures or none.

## Using a scene

```tsx
<Section background="knowledgeGraph">…</Section>   // one scene per section, cards on top stay solid
```

| Scene (`components/fx/canvas/scenes.ts`) | Original | Character | Use for |
|---|---|---|---|
| `VolumetricRays` (own component) | `VolumetricRays.tsx` | light rays from above, pointer-follow | **Hero only** |
| `knowledgeGraph` | `KnowledgeGraphLattice.tsx` | drifting nodes, links form when close, pointer joins the graph | platform, RAG, data |
| `dataShards` | `ServicesBackground.tsx` | perspective lanes, shards fall, **speed up with scroll velocity** | services, delivery |
| `dotMatrix` | `LiveSystemHeatmap.tsx` | dot grid lit by drifting hotspots | process, metrics, how-it-works |
| `latticeTunnel` | `DigitalLatticeBackground.tsx` | 3D grid tunnel, packets fly at the viewer | **closing CTA only** (once per page, via `CTABand`) |
| `liquidIntelligence` | `LiquidIntelligenceBackground.tsx` | gooey blobs (low-DPR + CSS blur) + grid + pointer-repelled dust | About, Pricing heroes |
| `temporalFlux` | `ChronosTimeline.tsx` (TemporalFluxBackground) | light streaks, speed up with scroll | behind every `Timeline` |
| `neuralArchitecture` | `NeuralArchitecture.tsx` | labelled nodes (the platform's real modules) part for the cursor | AI Dev Platform architecture |
| `signalGrid` | `ContactHeroBackground.tsx` | grid, cursor spotlight, beams ping nodes | Contact, under-construction pages |
| `blueprintSearch` | `CareersHeroBackground.tsx` | blueprint grid, rotating hexes, searchlight lens labels roles | Careers |
| `tacticalCommand` | `TacticalCommandBackground.tsx` | ink blobs that flee the cursor over a drifting grid | Security |
| `footerLattice` | `FooterLattice.tsx` | drifting grid, dots ping | Global footer |

### Interactive ports (`components/fx/interactive/`)

| Component | Original | Used on |
|---|---|---|
| `TerminalStream` | CloudArchSections → IaCLiveStream + DecryptedLine | service pages, ML Ops module — labelled "Example output" |
| `CostRadar` | CloudArchSections → FinOpsRadar | Cloud Architecture service |
| `ResidencyMap` | CloudArchSections → SovereigntyLockdownMap | Cloud Architecture, AI Governance, Security |
| `CanaryRouter` | CloudArchSections → CanaryTrafficRouter | Cloud Architecture, AI Agent services |
| `TechRadar` | TechRadar.tsx (real platform stack) | AI Dev Platform |
| `PiiScrubDemo` | new, in the same language | Security |
| `Timeline` (ui) | ChronosTimeline.tsx | About, Services, Contact, Early access, Pricing, Careers, Security, Changelog |
| `FAQ` (ui) | ServiceFAQ.tsx | every page with questions |

Skipped on purpose: the CloudArchSections stubs (ZeroTrust, Failover, SelfHealing, CapacityForecaster, GlobalNexus, FortressShield — a heading and a pulsing icon each) and GlobalEdgePropagationMap (invented global telemetry over a third-party image).

## Status — ported

| Original | New home | Notes |
|---|---|---|
| `VolumetricRays` | `components/fx/VolumetricRays.tsx` | hero |
| `TextEffects` (DecryptedText / ShimmerText) | `fx/WordReveal.tsx`, `.shimmer-text` | CSS, runs before hydration |
| `MagneticButton` | `fx/Magnetic.tsx` | behaviour only; styling stays with `Button` |
| Lenis setup | `fx/SmoothScroll.tsx` + `lib/scroll.ts` | all programmatic smooth scrolls go through `smoothScrollTo()` |
| `KnowledgeGraphLattice`, `ServicesBackground`, `LiveSystemHeatmap`, `DigitalLatticeBackground` | `fx/canvas/scenes.ts` | see table above |
| `ServiceCard` | `components/ui/ServiceCard.tsx` | on `Card` + raised `Button` |
| Services grid blur-in stagger | `Reveal blur` | |
| ClusterStrip AI Dev card (this repo's own original) | `marketing/home/AIDevPlatformCard.tsx` | featured, always expanded, entrance choreography + tilt |

## Backlog — port next (assessed from source)

| Original | What it is | Target in this site |
|---|---|---|
| `OperationalMetrics` → `Counter` | count-up numbers on scroll, live bar histogram | metric cards anywhere we have **real** numbers |
| `LiquidIntelligenceBackground` | gooey blue blobs + perspective grid + pointer-repelled dust | About hero (scene) |
| `BackgroundBeamsWithCollision` | falling beams that burst on a floor line | Security or changelog hero |
| `ContactHeroBackground`, `ContactNexus`, `ProjectInitiationForge` | contact hero scene, multi-step project brief | `/contact` |
| `CareersHeroBackground`, `HolographicCareers`, `Talent` | careers hero + roles | `/careers` |
| `ResourcesLatticeBackground`, `NeuralArchives`, `NewsPage` | insights hero + article grid | `/blog` |
| `QuantumEstimator` | interactive project cost estimator | `/services` (ZAR, real price bands) |
| `ServiceFAQ` | animated FAQ | services + pricing FAQs |
| `TechRadar` | technology radar | platform / stack page |
| `NeuralArchitecture` | animated architecture diagram | `/platform` |
| `FooterLattice` | footer background | global footer |
| `TacticalCommandBackground`, `IronTacticalBackground` | security-flavoured scenes | `/security` hero |
| `HoverExpandGallery` | hover-to-expand panels | case studies |
| `DecryptionScrambler` | scramble-to-text effect | labels / eyebrows, sparingly |
| `ChronosTimeline` | animated timeline | `/changelog` — **past releases only, never future dates** |

## Not ported (and why)

- `*SpecialSections`, `templates/*` (≈30 hero/UI demos for the agency's template store) — agency-era showcase pieces; mine for individual effects only.
- `TrustedBy` — client logo wall; removed by founder decision until logos are real, permissioned clients.
- `ChatWidget`, `AudioBriefing`, `OperationalMetrics`' Gemini call — call third-party AI from the browser with a client-side key; would need a server route and a POPIA review first.
- Remaining one-off backgrounds (`ApexVelocity`, `AzureCaustic`, `EstateSpatial`, `FashionEditorial`, `GaiaEco`, `StellarNebula`, `VanguardStarfield`, `MatrixRain3D`, …) — themed for specific agency templates; assess per page when a fit appears.

## Second batch — scenes2.ts (2026-10-09)

Founder direction: **every page has its own hero scene, and no scene repeats within a page.** Light mode now uses the originals' stronger line weights (the first ports were too faint on white). Scenes that react only to a nearby cursor use `pointer.inside`, so a resting pointer lights nothing.

| Scene | Original | Hero of |
|---|---|---|
| `resourcesLattice` | ResourcesLatticeBackground | — (Insights article grid) |
| `globalSignals` | GlobalSignalsBackground | /changelog |
| `artifactsLattice` | ArtifactsLatticeBackground | /pricing |
| `componentsLattice` | ComponentsLatticeBackground | — (platform/builder sections) |
| `templatesLattice` | TemplatesLatticeBackground | /early-access |
| `webDevProbe` | WebDevHeroBackground | /services/ai-agent-implementation |
| `missionBeams` | MissionSuccessBackground | — |
| `collisionBeams` | BackgroundBeams (WithCollision) | placeholder pages |
| `bioPulse` | BioPulseBackground | — (careers) |
| `modularLattice` | ModularLattice | /platform/cloud-devops |
| `sonarEcho` | SonarEchoWaves | /services/ai-governance-audit |
| `spatialDisplacement` | SpatialDisplacement | /services/rag-knowledge-base-setup |
| `acousticWaves` | AcousticResonance | — (FAQ / long text) |
| `assemblyLine` | AssemblyLinePulses | — (process sections) |
| `starfield` | VanguardStarfield | /platform/creative-xr |
| `matrixRain` | MatrixRain3D (keywords = platform vocabulary) | /platform/dev-platform |
| `nebula` | StellarNebulaBackground | /blog/[slug] |
| `hexField` | GaiaEcoBackground (recoloured blue) | /popia |
| `perspectiveFloor` | EstateSpatialBackground | /platform |

Other heroes: home = VolumetricRays, /about = liquidIntelligence, /careers = blueprintSearch, /contact = signalGrid, /platform/ai-dev-platform = knowledgeGraph, /platform/data-analytics = dotMatrix, /security = tacticalCommand, /services = latticeTunnel, /services/cloud-architecture = dataShards, /blog = the Marketplace column wall (`InsightsExplorer`).

Per-section scenes: services read `backdrops` from `lib/services.ts`; planned clusters from `BACKDROPS` in `PlannedClusterPage.tsx`; `CTABand` takes a `scene` prop (default `latticeTunnel`). The footer has **no** scene (founder decision).

### Pages kept in their original design

- **/security** — the original trust-centre markup and CSS (`components/marketing/security/securityHtml.ts`, `security.css` scoped to `.lp-security-root`), honesty-edited. `SecurityEnhancer` adds reveals, tab scroll-spy, a scene per section (via portals) and mounts `PiiScrubDemo` + `ResidencyMap` into placeholders.
- **Home hero card** — the original ClusterStrip AI Dev card (`AIDevHeroCard` + the original CSS module); on desktop the card face and its panel share one surface.
- **/blog hero** — MarketplacePage's six scrolling image columns, using our own article stills and posters; the hero search filters the grid.
