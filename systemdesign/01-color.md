# 01 — Colour System

All colour values are CSS custom properties defined in [`../app/globals.css`](../app/globals.css). They auto-switch when `data-theme="dark"` is set on `<html>`. Reference tokens, never raw hex.

## Critical rule

**Blue is the sole brand primary. Amber is accent-only.** Amber may appear in: upgrade CTAs, pricing card accents, Enterprise tier badges, the brand-span gradient, conversion-moment highlights. Amber may **not** appear in navigation active states, standard CTAs, focus rings, or link colours.

## Brand primary — blue

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sg-blue` | `#0B9EDE` | `#0EA5E9` | Primary CTAs, links, focus rings, active states |
| `--sg-blue-dim` | `#0882B8` | `#38BDF8` | Hover state for blue interactive elements |
| `--sg-blue-deep` | `#065A82` | `#0C4A6E` | Avatar gradient base, deep accents |
| `--sg-blue-glow` | `#0B9EDE1F` | `#0EA5E926` | Focus ring fill, active backgrounds |
| `--sg-blue-border` | `#0B9EDE40` | `#0EA5E933` | Ghost-button borders, active outlines |

## Accent — amber (premium & pricing only)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sg-amber` | `#F97316` | `#F97316` | Premium tier labels, pricing CTAs, upgrade prompts |
| `--sg-amber-dim` | `#EA580C` | `#FB923C` | Hover state for amber elements |

## Surfaces

Four levels of elevation in each mode. Use them in order — do not skip levels for arbitrary depth.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--sg-bg` | `#FFFFFF` | `#0A0C10` | Page background — base layer |
| `--sg-surface` | `#F8F9FB` | `#0E1117` | Cards, panels, sidebar body |
| `--sg-surface-2` | `#F1F3F7` | `#161B25` | Elevated cards, dropdowns, tooltips |
| `--sg-surface-3` | `#E8ECF2` | `#1E2535` | Modals, popovers, hover fills |
| `--sg-ink` | `#F1F3F7` | `#070810` | Code blocks, deepest chrome |

## Text scale

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sg-text-1` | `#0D1117` | `#F0F4F8` | Primary headings, emphasis, labels |
| `--sg-text-2` | `#374151` | `rgba(255,255,255,.75)` | Body copy, descriptions, table cells |
| `--sg-text-3` | `#6B7280` | `rgba(255,255,255,.45)` | Secondary metadata, hints, captions |
| `--sg-text-4` | `#9CA3AF` | `rgba(255,255,255,.25)` | Placeholders, disabled, overlines |
| `--sg-text-inv` | `#FFFFFF` | `#0D1117` | Text on coloured fills |

## Borders

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sg-border` | `rgba(0,0,0,.07)` | `rgba(255,255,255,.07)` | Default card / input border |
| `--sg-border-md` | `rgba(0,0,0,.12)` | `rgba(255,255,255,.12)` | Hover input border, secondary button border |
| `--sg-border-str` | `rgba(0,0,0,.18)` | `rgba(255,255,255,.18)` | Strong/active border |

## Semantic signals

Communicate state — never decorate.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sg-success` / `-bg` / `-bd` | `#16A34A` | `#22C55E` | Confirmations, live, positive trends |
| `--sg-warn` / `-bg` / `-bd` | `#B45309` | `#EAB308` | Approaching limits, degraded |
| `--sg-danger` / `-bg` / `-bd` | `#DC2626` | `#EF4444` | Errors, failures, destructive actions |

## Glass

Use only when there is visible content behind the surface.

| Token | Light | Dark |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,.8)` | `rgba(0,0,0,.8)` |

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 2.
