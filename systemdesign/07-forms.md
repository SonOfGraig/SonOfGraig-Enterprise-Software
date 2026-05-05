# 07 — Form Controls

Every input shares the same visual foundation: `--sg-surface` background, `--sg-border-md` border, `--r-md` radius, `9px 12px` padding. **State is communicated via border + box-shadow, not via background.**

Use the `.sg-input` class (already defined in `globals.css`) for the focus/hover/error/success state machine, and the `Field` primitive at [`../components/ui/Field.tsx`](../components/ui/Field.tsx) for label + hint + error wrapping.

## Input states

| State | Border | Shadow | Background |
|---|---|---|---|
| Default | `--sg-border-md` | none | `--sg-surface` |
| Hover | `--sg-border-str` | none | `--sg-surface` |
| Focus | `--sg-blue` | `0 0 0 3px var(--sg-blue-glow)` | `--sg-bg` |
| Error | `--sg-danger` | none (focus: danger glow) | `--sg-surface` |
| Success | `--sg-success` | none | `--sg-surface` |
| Disabled | `--sg-border` | none | `--sg-surface-2`, opacity .5 |

## Control types

| Control | Class / primitive | Notes |
|---|---|---|
| Text input | `.sg-input` / `<Field>` | With optional leading icon and suffix label |
| Select | `.sg-input` (`appearance: none` + custom chevron) | Arrow flips on open via JS |
| Textarea | `.sg-input` | `min-height: 80px`, `resize: vertical` only |
| Checkbox | `accent-color: var(--sg-blue)` | Label always to the right; min 24×24 touch target |
| Radio | Same as checkbox | Group with `<fieldset>` + `<legend>` |
| Toggle switch | 40×22, knob with cubic-bezier spring | Toggles `.on` class |

## Validation

- **Always** validate on the server. Use **Zod** (already installable as a dep) and `@hookform/resolvers/zod` for the client.
- **Always** include a POPIA consent checkbox on any form collecting personal data, with explicit links to `/privacy-policy` and `/popia`.
- **Always** include a hidden honeypot field and rate-limit the API route.
- **Never** ship a form whose submit handler is `setTimeout(..., 1000)`. The `app/api/forms/<name>/route.ts` handler must exist before the form ships.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 8.
