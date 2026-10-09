# 02 — Typography

Three fonts. Each has a distinct job. They must not be swapped.

| Font | Role | Weights | Use |
|---|---|---|---|
| **Manrope** (v3.1, replaces Sora) | Display / headings | 600, 700, 800 | Hero text, H1, H2, H3, wordmark |
| **Inter** | All UI text | 400, 500, 600 | Body, captions, labels, buttons, sidebar items |
| **JetBrains Mono** | Code / tokens | 400, 500 | Token values, code, API keys, version strings (ligatures off) |

Loaded via `next/font/google` in [`../app/layout.tsx`](../app/layout.tsx). Reference via the CSS vars `--font-display`, `--font-sans`, `--font-mono` — already wired into the utility classes below. (Manrope is still exposed as `--font-sora` so existing references did not need touching.)

**Why Manrope (v3.1, 2026-10-09):** it carried the brand on the 2026 agency site; bringing it back keeps continuity with what clients already know. Decision by the founder.

## Type scale (use the utility class — do not re-set sizes inline)

| Class | Font | Size (mobile / desktop) | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| `.text-hero` (v3.1) | Manrope | fluid 41.6 → 86.4 (`clamp`) | 800 | -4.5% | 1.02 |
| `.text-display` | Manrope | 48 / 64 | 700 | -4% | 1.1 / 1.05 |
| `.text-h1` | Manrope | 40 / 52 | 700 | -3.5% | 1.1 / 1.05 |
| `.text-h2` | Manrope | 32 / 40 | 700 | -3% | 1.1 |
| `.text-h3` | Manrope | 20 / 24 | 600 | -2% | 1.2 |
| `.text-body-lg` | Inter | 15 / 16 | 400 | 0 | 1.6 / 1.7 |
| `.text-body` | Inter | 14 | 400 | 0 | 1.6 |
| `.text-caption` | Inter | 12 | 400 | 0 | 1.5 |
| `.text-label` | Inter | 11 | 600 | +5%, UPPERCASE | 1.4 |
| `.text-code` | JetBrains Mono | 13 | 400 | 0 | 1.5 |

## Rules

- **Display, H1, H2, H3 use Manrope.** Mixing Inter into hero-level headings flattens the hierarchy.
- **Negative letter-spacing on large headings is mandatory.** At 36px+ default tracking feels loose.
- **Labels are always uppercase with positive tracking.** Never apply uppercase to body or heading text.
- **Weight 800 is for `.text-hero` only** — one per page. Everything else stays at 600–700.
- **`.shimmer-text`** (animated brand-blue gradient) may be applied to at most one phrase per page, in the hero.
- **Combining a type class with a colour class in `cn()` is safe** — the type tokens are registered with tailwind-merge in `lib/utils.ts`. Add any new `.text-*` token there too, or `cn()` will silently drop it.
- **Headings → `--sg-text-1`. Body → `--sg-text-2`. Metadata → `--sg-text-3`.** Placeholders → `--sg-text-4`.
- Long-form content (blog, policy) uses the `.sg-prose` class which already styles `h2/h3/p/ul/code/pre/blockquote/a` to spec.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 3.
