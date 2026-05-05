# 11 — Feedback Components

Three categories: **persistent callouts** (inline), **transient toasts** (corner-anchored), **ambient badges** (status at a glance).

## Callouts

Use the existing `<Callout>` primitive at [`../components/ui/Callout.tsx`](../components/ui/Callout.tsx) — already typed, already animated, already accessible.

| Variant | Fill | Border | Icon | Use |
|---|---|---|---|---|
| `info` | `--sg-blue-glow` | `--sg-blue-border` | `Info` | Non-urgent: sync in progress, background ops, feature notes |
| `success` | `--sg-success-bg` | `--sg-success-bd` | `CheckCircle2` | Confirmations: deploy succeeded, agent created, export complete |
| `warn` | `--sg-warn-bg` | `--sg-warn-bd` | `AlertTriangle` | Approaching limits, degraded performance, expiring credentials |
| `danger` | `--sg-danger-bg` | `--sg-danger-bd` | `XCircle` | Errors and violations: governance breach, deploy failed |

```tsx
<Callout variant="info" label="Sync in progress" body="Indexing 47 documents from Google Drive…" />
```

## Toasts

Bottom-right, 24px from edges, 340px wide, `z-index: var(--z-toast)`. Auto-dismiss after **4s** (info/success) or **8s** (warn/danger). Never auto-dismiss if action required. **Max 3 stacked.**

| Property | Value |
|---|---|
| Entry | `slideInUp 200ms ease-out` |
| Exit | `fadeOut 150ms ease-in` |
| Stack | Newest on top |
| Close | Always present, 20×20 `XIcon` in `--sg-text-4` |

## Badges & tags

| Component | Shape | Font | Use |
|---|---|---|---|
| `.badge` | Pill (`--r-full`) | 11/500/+3% | Status with optional dot. Nav, table cells, page headers |
| `.badge` + `.badge-dot.pulse` | Pill + animated dot | Same | Live/active state — agent running, deploy in progress |
| `.tag` | Rounded square (`--r-xs`) | 11/500 | Category labels on cards/tables. **Max 2 per item** |

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 12.
