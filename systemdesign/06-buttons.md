# 06 — Button System

Five variants. Three sizes. Loading + destructive + icon-only. **One primary action per view.**

Use the existing `Button` primitive at [`../components/ui/Button.tsx`](../components/ui/Button.tsx). Do not build new button components — extend variants in `Button.tsx` if needed.

## Variants

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `--btn-primary-bg` (raised, v3.1) | `#FFFFFF` | hairline dark rim | The most important action on a view. **One per page section.** |
| `secondary` | `--btn-neutral-bg` (raised, v3.1) | `--sg-text-1` | `--sg-border-md` | Supporting actions: Export, Duplicate, View Details |

### Raised treatment (v3.1)

`primary` and `secondary` are **raised**, matching the theme toggle's tactile pill: a top-lit gradient, an inset highlight on the top edge, an inset shade on the bottom edge and a soft drop shadow. Hover deepens the drop; active presses in (inset shadow). Tokens: `--btn-primary-*`, `--btn-neutral-*` in `globals.css` (light + dark); classes `.btn-raised-primary` / `.btn-raised-neutral`. **No glow halos and no pulsing on buttons** — depth comes from light and shadow, not colour bleed.
| `ghost` | transparent (hover `--sg-surface-2`) | `--sg-blue` | `--sg-blue-border` | Tertiary, contextual, inline-link-as-button |
| `cta` (amber) | amber gradient | `#FFFFFF` | none | Pricing conversions, upgrades, plan changes only |
| `danger` | `--sg-danger-bg` | `--sg-danger` | `--sg-danger-bd` | Delete, revoke, reset — always behind a confirm dialog |

## Sizes

| Size | Padding | Font | Radius | Context |
|---|---|---|---|---|
| `xs` | 5×10 | 11 | `--r-sm` (6) | Dense tables, inline confirmations |
| `sm` | 7×13 | 12 | `--r-sm` (6) | Toolbar, secondary table actions |
| `default` | 9×17 | 13 | `--r-md` (8) | Forms, dialogs, page-level actions |
| `lg` | 12×24 | 15 | `--r-lg` (12) | Hero CTAs, empty-state actions |
| icon-only | 0, 34×34 | — | `--r-md` (8) | Toolbar — must have `aria-label` |

## States

| State | Visual | How |
|---|---|---|
| Default | Variant base | CSS class |
| Hover | Background lightens/darkens; `translateY(-1px)` | CSS `:hover` (no JS) |
| Active | `translateY(0)` and `scale(0.98)` | CSS `:active` |
| Focus | `0 0 0 3px var(--sg-blue-glow)` | `:focus-visible` only |
| Loading | Spinner appended after label | CSS animation, `pointer-events: none` |
| Disabled | `opacity: .4`, `pointer-events: none` | HTML `disabled` |

The `.sg-btn` class in `globals.css` already encodes the hover/active state machine.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 7.
