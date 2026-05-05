# 05 — Icon Language

**No emoji. No icon fonts. No raster.** Every icon is an SVG using `viewBox="0 0 24 24"`, `1.5px` stroke, round line caps, and `currentColor` so it inherits the parent's text colour.

In this codebase use **`lucide-react`** (already a dependency). Lucide icons match the spec exactly — same viewbox, stroke, and cap style.

## Why emoji is a hard disqualifier

Emoji render differently across every OS, browser, and email client. An agent-status icon that appears as a blue robot on macOS renders as a flat yellow cartoon on Windows and disappears in some enterprise email systems. One inconsistent icon in a procurement demo can end a deal.

## Sizes

| Context | Size | Stroke |
|---|---|---|
| Inline with text | 16×16 | 1.5px |
| Standalone UI (nav, empty-state, eyebrow) | 20×20 | 1.5px |
| Feature / cluster card | 24×24 | 1.5px |
| Empty-state centrepiece, marketing tile | 48×48 | 1.5px |

Never mix icon libraries inside the same product surface. Lucide-only.

## Core 24 (use Lucide names)

`Cpu, Cloud, BarChart, Shield, Zap, Layout, Link, Database, Settings, Users, Terminal, Radio, Glasses, Search, Bell, Key, Grid, Layers, Rocket, Eye, Edit, Trash, Download, MoreHorizontal`

## Usage

```tsx
import { Shield } from 'lucide-react';

<Shield size={20} strokeWidth={1.5} aria-hidden />
```

Icon-only buttons must include an `aria-label` (e.g. `<button aria-label="Delete">`).

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 6.
