# 02 — Typography

Three fonts. Each has a distinct job. They must not be swapped.

| Font | Role | Weights | Use |
|---|---|---|---|
| **Sora** | Display / headings | 300, 600, 700 | Hero text, H1, H2, H3, wordmark |
| **Inter** | All UI text | 400, 500, 600 | Body, captions, labels, buttons, sidebar items |
| **JetBrains Mono** | Code / tokens | 400, 500 | Token values, code, API keys, version strings (ligatures off) |

Loaded via `next/font/google` in [`../app/layout.tsx`](../app/layout.tsx). Reference via the CSS vars `--font-display`, `--font-sans`, `--font-mono` — already wired into the utility classes below.

## Type scale (use the utility class — do not re-set sizes inline)

| Class | Font | Size (mobile / desktop) | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| `.text-display` | Sora | 48 / 64 | 700 | -4% | 1.1 / 1.05 |
| `.text-h1` | Sora | 40 / 52 | 700 | -3.5% | 1.1 / 1.05 |
| `.text-h2` | Sora | 32 / 40 | 700 | -3% | 1.1 |
| `.text-h3` | Sora | 20 / 24 | 600 | -2% | 1.2 |
| `.text-body-lg` | Inter | 15 / 16 | 400 | 0 | 1.6 / 1.7 |
| `.text-body` | Inter | 14 | 400 | 0 | 1.6 |
| `.text-caption` | Inter | 12 | 400 | 0 | 1.5 |
| `.text-label` | Inter | 11 | 600 | +5%, UPPERCASE | 1.4 |
| `.text-code` | JetBrains Mono | 13 | 400 | 0 | 1.5 |

## Rules

- **Display, H1, H2, H3 use Sora.** Mixing Inter into hero-level headings flattens the hierarchy.
- **Negative letter-spacing on large headings is mandatory.** At 36px+ default tracking feels loose.
- **Labels are always uppercase with positive tracking.** Never apply uppercase to body or heading text.
- **Never use a Sora weight heavier than 700.** The face has no 800/900 for text.
- **Headings → `--sg-text-1`. Body → `--sg-text-2`. Metadata → `--sg-text-3`.** Placeholders → `--sg-text-4`.
- Long-form content (blog, policy) uses the `.sg-prose` class which already styles `h2/h3/p/ul/code/pre/blockquote/a` to spec.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 3.
