# 15 — Governance

A design system is only as valuable as its adoption. These rules govern how SonOfGraig team members and AI agents interact with, extend, and change the system.

## Usage rules

1. **All product UI must use only tokens defined in `globals.css`.** No hard-coded hex values in component code.
2. **All icons** must come from `lucide-react` or the project's existing SVG sprite. No emoji, no raster icons, no FontAwesome.
3. **All new colours must be proposed as tokens** — not used inline. Token proposals require design-system review.
4. **Amber is accent-only.** Any use of `--sg-amber` outside pricing, upgrade, and premium contexts requires explicit approval.
5. **Component code must reference the design system version** in its file header comment when it implements a documented pattern.

## Extension process

When a product requirement cannot be satisfied by an existing component:

| Step | Action | Owner |
|---|---|---|
| 1 | Document the unmet requirement: product context + screenshot mock | Requesting team |
| 2 | Check whether two or more existing components compose to satisfy it | Design lead |
| 3 | If no composition works, propose a new variant in the design-system Slack channel | Design lead |
| 4 | DS team reviews within 5 working days — approves, modifies, or rejects with rationale | DS team |
| 5 | Approved components are added to this folder, the HTML reference, and the Figma library together | DS team |
| 6 | All cluster teams are notified via the design-system changelog | DS team |

## What an AI agent should do when blocked

If you (an AI agent) cannot satisfy a request without inventing a token, an icon set, or a component:

1. **Stop.** Do not invent.
2. **Document the gap** in the PR description or response: what was needed, why no existing primitive worked, what you propose.
3. **Use the closest legal alternative** as a placeholder (e.g. closest existing token, existing primitive) and flag it as `TODO(design-system): proposed extension — needs DS review`.
4. **Open a follow-up task** describing the proposal so the DS team can rule on it.

This is the same rule humans follow. The system breaks the moment exceptions get coded inline.

## Version history

| Version | Date | Summary |
|---|---|---|
| v3.0 | April 2026 | Full enterprise rebuild — light + dark, single primary, SVG sprite, data table, sidebar, skeleton + empty states, dropdown, Sora + Inter + JetBrains Mono |
| v2.0 | 2025 Q4 | Refined palette, glass system, button + input components, sidebar + cluster cards |
| v1.0 | 2024 Q3 | Original — service agency branding, dual primaries, DM Sans, dark-only, no component library |

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 16.
