# 12 — States: Loading, Empty, Progress

Products spend up to 40% of rendered time in a loading or empty state. Treat these as core surfaces, not edge cases.

## Skeleton loaders

**Never show a spinner in place of a data table** — show a skeleton table.

| Rule | Spec |
|---|---|
| Animation | `shimmer`: background-position 0→600px, 1.5s linear infinite. Gradient `--sg-surface-2 → --sg-surface-3 → --sg-surface-2` |
| Shape | Mirror the actual content layout — text lines 10–12px tall, images at exact dims, cards full shape |
| Colour | `--sg-surface-2` and `--sg-surface-3` only. **No blue or brand colours in skeletons.** |
| Cap | If data hasn't loaded in **8s**, switch to error state with retry action |
| Reduced motion | Static background, no animation (`@media prefers-reduced-motion: reduce`) |

The `.skeleton-shimmer` class in `globals.css` already implements this with the reduced-motion fallback. Use the `Skeleton` primitive at [`../components/ui/Skeleton.tsx`](../components/ui/Skeleton.tsx).

## Empty states

Empty ≠ error. Every empty state has **icon + heading + description + one action.**

Use the `EmptyState` primitive at [`../components/ui/EmptyState.tsx`](../components/ui/EmptyState.tsx).

| Element | Spec |
|---|---|
| Container icon | 48×48 box, `--sg-surface-2` bg, `--sg-border` border, `--r-lg`. Inside: 22×22 icon in `--sg-text-4` |
| Heading | 15/600, `--sg-text-1`. Names the empty thing: "No agents yet" |
| Description | 13/400, `--sg-text-3`. Max 2 sentences. Explains what the user gets when they create the first item |
| Action | One `Button variant="primary"` with leading `+` icon. **Never two CTAs.** |
| Padding | `--sp-16` top/bottom, `--sp-8` left/right |

## Progress bars

Use the `ProgressBar` primitive at [`../components/ui/ProgressBar.tsx`](../components/ui/ProgressBar.tsx).

| Variant | Fill | Use |
|---|---|---|
| Blue | gradient `--sg-blue → #38BDF8` | Deployment, file upload, task completion |
| Amber | gradient `--sg-amber → #FBBF24` | Usage meters approaching limit (token quota, storage, seats) |
| Success | `--sg-success` solid | Completed phases, finished onboarding, 100% states |

- Track height **6px**, radius `--r-full`, background `--sg-surface-3`.
- **Always show a percentage label** to the right of the track header. Bar position alone is not enough.
- Width transitions: 400ms ease-out. Initial load: animate from 0 → actual.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 13.
