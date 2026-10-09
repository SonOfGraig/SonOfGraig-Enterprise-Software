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

**Never fake a backdrop for glass.** Coloured blobs or gradient orbs placed behind cards so the glass "shows" are not allowed — that is the failure this rule exists to prevent. If the section background is plain, the card is `solid`.

## React components (v3.1) — use these, don't hand-style cards

`components/ui/Card.tsx` encodes the table above. Pages must not re-type card background / border / radius.

```tsx
import { Card, CardEyebrow, CardTitle, CardBody, CardFooter } from '@/components/ui/Card';

<Card>…</Card>                                   // solid, padding md, static
<Card variant="glass" padding="none">…</Card>    // over imagery / hero rays only
<Card variant="metric">…</Card>                  // KPI, 2px brand top edge
<Card interactive asChild><Link href="…">…</Link></Card>  // hover machine on
```

| Prop | Values | Default | Note |
|---|---|---|---|
| `variant` | `solid` · `glass` · `metric` | `solid` | One variant per grid |
| `padding` | `none` · `sm` (16) · `md` (24) · `lg` (32) | `md` | Spacing tokens |
| `interactive` | boolean | `false` | Adds `.card` / `.card-glass` hover. **Only when the card is clickable** — a card that lifts but does nothing is a false affordance |
| `asChild` | boolean | `false` | Render as the child (e.g. `Link`) |

Anatomy parts: `CardEyebrow` (`.text-label`, blue) · `CardTitle` (`size="default"` 15/600 for product UI, `size="feature"` → `.text-h3` for marketing) · `CardBody` (13px, or `.text-body` at feature size) · `CardFooter` (tags max 2, or a link).

**`FeatureCard`** (`components/ui/FeatureCard.tsx`) — solid card at feature scale: 40px icon tile (`--sg-blue-glow` fill, Lucide icon), optional mono index (`01`) or eyebrow, title, body, optional `href` (becomes interactive with a "Learn more" footer). Use it for module grids, step sequences and capability lists.

### Glass material — `.liquid-glass` (v3.1)

The visual definition of the glass card type. Tokens in `globals.css`: `--lg-fill`, `--lg-fill-strong`, `--lg-edge` (specular top edge), `--lg-rim` (hairline), `--lg-shadow`, `--lg-blur`. Light and dark values provided. Used today by: the hero product frame, the hero chip, the hero secondary button, and the site header (`--lg-fill-strong`).

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 9.
