# 10 — Navigation

Two patterns. Use the right one.

| Surface | Pattern |
|---|---|
| **Marketing pages** (`/`, `/pricing`, `/about`, `/blog`, `/privacy-policy`, etc.) | Top header (sticky, 64px). See [`../components/shells/PublicShell.tsx`](../components/shells/PublicShell.tsx) |
| **Product clusters** (`/agents`, `/rag`, `/governance`, etc.) | Persistent left sidebar (220px). **No top nav on product surfaces.** |

## Product sidebar — anatomy

| Element | Class | Spec |
|---|---|---|
| App header | `.product-nav-header` | 24×24 cluster icon (cluster colour) + cluster name (13/600). Bottom-bordered |
| Section label | `.pnav-section-label` | 10/600/+10%, UPPERCASE, `--sg-text-4`. Groups items by area |
| Nav item (default) | `.pnav-item` | 13/400, `--sg-text-3`. 16×16 leading icon. Min 44px tall (touch). Padding 8×16 |
| Nav item (active) | `.pnav-item.active` | `--sg-blue-glow` bg. `--sg-blue` text. 500 weight. Icon opacity 1 |
| Notification badge | `.pnav-badge` | Right-aligned pill. Blue for counts, red/amber for alerts |

## Rules

- **Maximum 12 nav items per cluster.** Above 12, introduce a section group or sub-nav.
- Active state is driven by the **current URL path**, not JS state — so it persists on reload.
- Notification badges: numeric for counts (`3`, `12`, `99+`); `!` for urgent alerts.
- Sidebar is **220px** desktop, collapses to **icon-only rail** at <860px, replaced by **mobile drawer** below 640px.
- **Settings and access management are always the last two items** in every cluster sidebar.

## Marketing footer

The footer (in `PublicShell.tsx`) groups by Products / Platform / Services / Developer & IT / Company. Legal links live in the bottom strip: Privacy → `/privacy-policy`, POPIA → `/popia`, Terms, Sitemap.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 11.
