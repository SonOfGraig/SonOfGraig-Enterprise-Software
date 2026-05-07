# 08 — Cards

Three card types. Each has a specific context — do not mix them within the same content grid.

| Type | Class | Background | Border | Shadow | Use |
|---|---|---|---|---|---|
| Solid | `.card` | `--sg-surface` | `1px var(--sg-border)` | `--shadow-lift-sm` (hover: `-md`) | Feature listings, product tiers, agent cards |
| Glass | `.card-glass` | `--glass-bg` + `backdrop-filter` | `1px var(--sg-border-md)` | `--shadow-lift-md` (hover: `-lg`) | Overlapping content, floating panels, hero feature cards |
| Metric | `.metric-card` | `--sg-surface` | `1px var(--sg-border)` + `2px brand-span top` | `--shadow-lift-sm` (no hover) | KPI values: active agents, API calls, uptime, MRR |

## Anatomy

- **Eyebrow:** `.text-label` (11/600/+5%/UPPERCASE) in `--sg-blue` — always the category label.
- **Heading:** 15px / 600 / -1% tracking. One line where possible. Wrap, never truncate.
- **Body:** 13px / 400 / `--sg-text-3`. Max 2–3 lines. Link to detail if longer.
- **Tags / badges:** bottom of card. **Max 2 per card.**
- **Border radius:** `--r-xl` (16px) for all card variants. Smaller radius reads as a table row.
- **Hover:** `translateY(-1px)`, shadow steps up, border colour bumps to `--sg-border-md`. 200ms ease-out — already encoded in the `.card` class machine.

## Glass usage rule

**Glass only on top of visible content.** Glass on a solid background is meaningless and must be replaced with `.card`.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 9.
