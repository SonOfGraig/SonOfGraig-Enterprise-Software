# SonOfGraig Design System — v3.0

This folder is the **canonical written specification** for every visual decision made in the SonOfGraig Enterprise Software platform. It supersedes all previous brand guidelines and is the document a designer, engineer, or AI agent **must** consult before producing any UI.

> **Hard rule.** No UI work begins without reading [`CHECKLIST.md`](CHECKLIST.md) first.
> AI agents and automation: read [`AGENTS.md`](AGENTS.md) before generating UI.

## What lives where

| Concern | File |
|---|---|
| Pre-build checklist (run this every time) | [`CHECKLIST.md`](CHECKLIST.md) |
| Instructions for AI agents | [`AGENTS.md`](AGENTS.md) |
| Brand philosophy & v1→v3 rationale | [`00-philosophy.md`](00-philosophy.md) |
| Colour system (light + dark) | [`01-color.md`](01-color.md) |
| Typography scale | [`02-typography.md`](02-typography.md) |
| Spacing (8pt grid) | [`03-spacing.md`](03-spacing.md) |
| Gradient system | [`04-gradients.md`](04-gradients.md) |
| Icon language (SVG sprite, no emoji) | [`05-icons.md`](05-icons.md) |
| Button system | [`06-buttons.md`](06-buttons.md) |
| Form controls | [`07-forms.md`](07-forms.md) |
| Card components | [`08-cards.md`](08-cards.md) |
| Data table (the core enterprise component) | [`09-data-table.md`](09-data-table.md) |
| Navigation (product sidebar) | [`10-navigation.md`](10-navigation.md) |
| Feedback (callouts, toasts, badges) | [`11-feedback.md`](11-feedback.md) |
| States (skeleton, empty, progress) | [`12-states.md`](12-states.md) |
| Platform architecture (5 clusters) | [`13-clusters.md`](13-clusters.md) |
| CSS token reference | [`14-tokens.md`](14-tokens.md) |
| Governance & extension process | [`15-governance.md`](15-governance.md) |
| Source-of-truth strategy & engineering docs | [`source-docs/`](source-docs/) |

## How this folder relates to the running code

This folder is **the specification**. The running code lives at:

- **Live token implementation:** [`../app/globals.css`](../app/globals.css) — every `--sg-*`, `--sp-*`, `--r-*`, `--ease-*` custom property in light + dark mode.
- **Reusable React primitives:** [`../components/ui/`](../components/ui/) — `Button`, `Badge`, `Callout`, `Field`, `Loader`, `ProgressBar`, `Skeleton`, `EmptyState`, etc.
- **Marketing/public shell:** [`../components/shells/PublicShell.tsx`](../components/shells/PublicShell.tsx) — header, footer, theme toggle, cookie banner.

If a token is documented here but missing from `globals.css`, that is a bug — fix `globals.css`. If a component is documented here but missing from `components/ui/`, build it there following the spec.

## Reference companies

Every component and page is benchmarked against four products: **Linear** (dark-first precision), **Stripe** (enterprise trust through restraint), **Vercel** (typographic discipline), **Anthropic** (sophisticated minimalism). If a UI would look out of place next to those in a side-by-side procurement demo, it does not ship.

## Versioning & changes

| Version | Date | Status |
|---|---|---|
| v3.0 | April 2026 | **Current** — full enterprise rebuild, light + dark, single primary, SVG sprite, data table, sidebar, skeleton + empty states |
| v2.0 | 2025 Q4 | Superseded |
| v1.0 | 2024 Q3 | Superseded — service-agency branding |

To propose a change: follow the extension process in [`15-governance.md`](15-governance.md).
