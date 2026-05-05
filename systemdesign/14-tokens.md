# 14 — CSS Token Reference

The complete token set for implementation. **All values are defined in [`../app/globals.css`](../app/globals.css).** This file is the index — `globals.css` is the source.

Theme switches by setting `data-theme="dark"` (or `"light"`) on the `<html>` element. localStorage key: `sg-theme`.

## Border radius

| Token | Value | Usage |
|---|---|---|
| `--r-xs` | 4px | Tag corners, skeleton blocks, code chips |
| `--r-sm` | 6px | Small buttons (xs, sm), compact list items |
| `--r-md` | 8px | Default buttons, text inputs, selects, icon chips |
| `--r-lg` | 12px | Dropdowns, callouts, toasts, table wrapper |
| `--r-xl` | 16px | All cards, product nav, modal dialogs |
| `--r-2xl` | 24px | Large feature panels, hero content blocks |
| `--r-full` | 9999px | Badges, tags, pills, toggle switches, avatars |

## Shadow / elevation

| Token | Use |
|---|---|
| `--shadow-lift-sm` | Default card resting, table wrapper, select dropdown |
| `--shadow-lift-md` | Card hover, modal, elevated popover |
| `--shadow-lift-lg` | Toast, command palette, deep modal |

## Easing

| Token | Use |
|---|---|
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` — card hover lift, modal open, dropdown appear |
| `--ease-spring` | `cubic-bezier(.34, 1.56, .64, 1)` — toggle knob, button active, sidebar collapse |
| `--ease-in` | `cubic-bezier(.4, 0, 1, 1)` — exit animations |
| `--ease-back` | `cubic-bezier(.36, 0, .66, -.56)` — input shake |
| `--ease-linear` | `linear` — only for shimmer |

## Duration

| Token | Value |
|---|---|
| `--duration-instant` | 0ms |
| `--duration-fast` | 100ms |
| `--duration-default` | 200ms |
| `--duration-slow` | 400ms |
| `--duration-xslow` | 700ms |
| `--duration-crawl` | 1200ms |

## Z-index

| Token | Value |
|---|---|
| `--z-base` | 0 |
| `--z-raised` | 10 |
| `--z-dropdown` | 100 |
| `--z-sticky` | 200 |
| `--z-modal` | 300 |
| `--z-toast` | 400 |

## Glass

Use only over visible content.

| Token | Light | Dark |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,.8)` | `rgba(0,0,0,.8)` |

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 15.
