# Pre-build UI checklist

Run **every item** before producing or shipping any UI. If any item fails, stop and resolve it before writing code.

## Tokens & primitives

- [ ] Every colour I'm about to use is a `var(--sg-*)` token defined in `app/globals.css` (no inline hex).
- [ ] Every spacing value uses `var(--sp-*)` (no `padding: 13px` style ad-hoc values).
- [ ] Every border radius uses `var(--r-*)` (no `rounded-[5px]`).
- [ ] Every typography element uses one of the `.text-*` utilities (`.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-body-lg`, `.text-body`, `.text-caption`, `.text-label`, `.text-code`).
- [ ] No emoji used as an icon — `lucide-react` only.
- [ ] No second primary — amber appears **only** if this is a pricing card, upgrade prompt, or premium-tier badge.

## Components

- [ ] Checked `components/ui/` for an existing primitive that already does this (Button, Badge, Callout, Field, Loader, ProgressBar, Skeleton, EmptyState, BackToTop, Logo, RevealSection).
- [ ] If composing existing primitives, no custom variant of them is being introduced inline.
- [ ] Cards use `--r-xl` (16px). Buttons use `--r-md` (8px). Badges/pills use `--r-full`.

## Routing & metadata

- [ ] The route exports `metadata` (or `generateMetadata`) with `title` and `description`.
- [ ] Server component by default. `'use client'` only if state/effects/browser API needed.
- [ ] If a route can fail or 404 in production, an `error.tsx` / `not-found.tsx` exists in or above the segment.

## Forms (if applicable)

- [ ] Backend handler exists at `app/api/forms/<name>/route.ts` (no `setTimeout` mock submissions).
- [ ] Validation runs on both client (Zod via `@hookform/resolvers`) and server.
- [ ] CSRF, rate limit, and a honeypot field are in place.
- [ ] An explicit POPIA consent checkbox is present, with a link to `/privacy-policy` and `/popia`.
- [ ] On error/success, the user gets a `Callout` with the right variant.

## Theming

- [ ] Component renders correctly in both light and dark (`html[data-theme='dark']`).
- [ ] No `text-white` / `text-black` literals — always `var(--sg-text-1)` etc.
- [ ] Glass surfaces only used over visible content (not on solid backgrounds).

## Motion & accessibility

- [ ] Animations live behind `@media (prefers-reduced-motion: no-preference)` or `useReducedMotion()`.
- [ ] Focus-visible ring uses the design-system blue (`var(--sg-blue-glow)` / `box-shadow: 0 0 0 3px var(--sg-blue-glow)`).
- [ ] Interactive elements have a 44×44px minimum touch target.
- [ ] Icon-only buttons have an `aria-label`.
- [ ] Colour is never the only signal — pair semantic colour with an icon (Callout already does this).

## SEO & content

- [ ] `metadata.title` is unique to this page (not inherited).
- [ ] `metadata.description` is 1–2 sentences, naturally written, ≤160 chars.
- [ ] Internal links use `next/link`, not `<a href>`.
- [ ] Images use `next/image` with explicit dimensions or `fill`.

## Final pass

- [ ] Side-by-side mental check vs. **Linear / Stripe / Vercel / Anthropic** — would this look out of place next to those? If yes, iterate.
