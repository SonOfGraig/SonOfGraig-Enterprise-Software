# AGENTS — Instructions for AI Assistants

If you are an AI agent (Claude Code, Copilot, Cursor, etc.) generating UI for the SonOfGraig Enterprise Software repo, this file is your contract.

## Read order — every UI task

1. [`README.md`](README.md) — orient yourself.
2. [`CHECKLIST.md`](CHECKLIST.md) — run every item.
3. The relevant section file (`01-color.md`, `06-buttons.md`, etc.).
4. [`../app/globals.css`](../app/globals.css) — confirm the token you intend to use is defined.
5. [`../components/ui/`](../components/ui/) — check whether a primitive already covers the case.

## Hard rules

- **Never hard-code hex values.** Always reference a token: `var(--sg-blue)`, `var(--sg-text-1)`, `var(--sg-surface)`, etc.
- **Never use ad-hoc spacing.** Use `var(--sp-1)` … `var(--sp-20)` only.
- **Never use ad-hoc border radius.** Use `var(--r-xs)` … `var(--r-2xl)` or `var(--r-full)`.
- **Never use emoji as icons.** Use `lucide-react` (already a dependency) or the project's existing SVG sprite.
- **Never use a typography size outside the scale.** Use the utility classes `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-body-lg`, `.text-body`, `.text-caption`, `.text-label`, `.text-code`. If a Tailwind utility is needed, it must produce a value that matches the scale.
- **Never introduce a second primary colour.** Blue is the only primary. Amber appears only in pricing, upgrade, and Enterprise-tier contexts.
- **Never write a heading in Inter or a body sentence in Sora.** Display/H1/H2 = Sora; H3 + UI = Inter; code = JetBrains Mono.
- **Default to server components** in the App Router. Add `'use client'` only when state, effects, or browser APIs are required.
- **Always include a `metadata` export** (or `generateMetadata`) on every route segment.
- **Always handle reduced motion.** Wrap motion in `@media (prefers-reduced-motion: no-preference)` or check `useReducedMotion()`.
- **Never run `npm run dev` blocking from this folder.** Use `Bash` with `run_in_background: true` and the `./node_modules/.bin/next dev` invocation; the `npm run` script wrapper has PATH issues on this Windows shell. Working directory is `C:\Users\Swiss MusiqZA\Projects\SonOfGraig-Enterprise-Software` (NOT the read-only `S:` drive).

## Allowed escape hatches

- A token doesn't exist yet for the value you need → propose it via [`15-governance.md`](15-governance.md), do not hard-code.
- A component primitive doesn't cover the case → first try composing existing ones; if that fails, propose a new primitive in `components/ui/` and document it in the relevant section file.

## Behaviour you should display, not narrate

When you build UI, the user expects to see the file diff and a short note. Don't enumerate the design system back at them. Don't say "I checked CHECKLIST.md" — just produce code that proves you did.
