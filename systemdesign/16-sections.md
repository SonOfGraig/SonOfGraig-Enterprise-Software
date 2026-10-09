# 16 — Sections & motion (v3.1)

Every marketing page is a stack of sections. They share one rhythm so pages feel like one product, whoever builds them.

## `Section` — `components/ui/Section.tsx`

```tsx
import { Section, SectionHeader } from '@/components/ui/Section';

<Section tone="base" spacing="lg" divider>
  <SectionHeader eyebrow="How it works" title="…" description="…" />
  {/* grid of FeatureCards */}
</Section>
```

| Prop | Values | Default | Rule |
|---|---|---|---|
| `tone` | `base` (`--sg-bg`) · `surface` (`--sg-surface`) | `base` | Surface levels go in order (01-color). **Solid cards (`--sg-surface`) go on a `base` section** — on a `surface` section they disappear |
| `spacing` | `md` (56→96px) · `lg` (72→128px) | `lg` | Fluid vertical padding |
| `divider` | boolean | `false` | Hairline top border — use between two consecutive `base` sections instead of alternating backgrounds |
| `width` | `default` (1200) · `narrow` (880) | `default` | `narrow` for long-form and forms |

| `background` | a scene name (`knowledgeGraph` · `dataShards` · `dotMatrix` · `latticeTunnel`) | none | One animated canvas scene ported from the 2026 site — see [17-motion-library.md](17-motion-library.md). Faded into the section surface top and bottom |

No *static* decorative backgrounds: no gradient orbs, no blurred colour blobs, no mesh. Atmosphere comes only from the hero rays and the ported motion scenes, one per section, never two adjacent sections with the same scene. A section can force a theme locally with `data-theme="dark"` (the closing CTA does).

## `SectionHeader`

Anatomy: eyebrow (`.text-label`, `--sg-blue`) → title (`.text-h2`, `--sg-text-1`, balanced) → optional description (`.text-body-lg`, `--sg-text-3`). Max width 680px. `align="center"` for hero-adjacent and CTA sections; left otherwise. `action` slot for a right-aligned link ("View all →").

One `h2` per section. Card titles inside are `h3`.

## Motion

| Where | Mechanism | Spec |
|---|---|---|
| Above the fold (hero) | CSS: `.reveal-up`, `.reveal-word` (`globals.css`) | Fade + rise / blur-to-sharp per word, `--ease-out`. Stagger via inline `animation-delay`. **Never framer `initial`** above the fold — it ships the content at `opacity:0` until hydration |
| Below the fold | `Reveal` (`components/fx/Reveal.tsx`) | Fade + 20px rise, 0.7s, `--ease-out`, once. Grid stagger 0.08–0.1s per item |
| Hero background | `VolumetricRays` (`components/fx`) | Canvas, follows `--rays-rgb` / `--rays-blend`, pauses off-screen, DPR ≤ 1.5 |
| Primary CTAs | `Magnetic` (`components/fx`) | Wraps a `Button`; ≤18% pointer pull, mouse only |
| Page scroll | `SmoothScroll` (Lenis) in root layout | Off for reduced motion |

All motion respects `prefers-reduced-motion` — either in the stylesheet or via `useReducedMotion`.

→ Origin: motion primitives ported from the 2026 agency site (`SonOfGraig-Digital-Solutions-2026`) and hardened (theme tokens, reduced motion, off-screen pause).
