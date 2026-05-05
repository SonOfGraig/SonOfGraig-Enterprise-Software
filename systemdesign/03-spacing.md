# 03 — Spacing System

8pt grid, 4px base. Every margin, padding, and gap uses one of these tokens. **No ad-hoc spacing.**

| Token | Value | Common uses |
|---|---|---|
| `--sp-1` | 4px | Icon gap, badge padding, micro-spacing |
| `--sp-2` | 8px | Inline element gaps, tight list spacing |
| `--sp-3` | 12px | List item padding, form field gaps |
| `--sp-4` | 16px | Standard component internal padding |
| `--sp-5` | 20px | Card padding (compact), section sub-gaps |
| `--sp-6` | 24px | Card padding (default), form group spacing |
| `--sp-8` | 32px | Component group separation |
| `--sp-10` | 40px | Section-to-section spacing in dense views |
| `--sp-12` | 48px | Page section padding (compact pages) |
| `--sp-16` | 64px | Section spacing on standard pages |
| `--sp-20` | 80px | Hero section padding, major page breaks |

## Usage

```tsx
<div style={{ padding: 'var(--sp-6)', gap: 'var(--sp-4)' }}>
```

Or with Tailwind arbitrary values:

```tsx
<div className="p-[var(--sp-6)] gap-[var(--sp-4)]">
```

If a value you need is not on the scale, you are wrong. Round to the nearest token.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 4.
