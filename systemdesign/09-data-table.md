# 09 — Data Table

Enterprise SaaS lives in tables. Every cluster will render data tables — agent registries, billing history, audit logs, pipeline runs, compliance reports. **Use the canonical table. Do not build cluster-specific tables in isolation.**

## Anatomy

| Zone | Class | Spec |
|---|---|---|
| Header | `.table-header` | Title (13/600) + row count (12, `--sg-text-4`). Right slot: search + primary action |
| Column headers | `thead th` | 11/600/+6%, UPPERCASE, `--sg-text-4`. Sticky on scroll. Sortable adds `↕` icon + hover colour |
| Body row | `tbody tr` | 13px body. Hover: `--sg-surface-2` bg, 100ms ease. Last row: no border-bottom |
| Primary cell | `td.cell-primary` | 500 weight, `--sg-text-1`. Usually the name/identifier column |
| Status cell | `td` + `<Badge>` | Coloured-dot badge: live / degraded / failed / idle |
| Action cell | `td` + icon button (sm) | 28×28. Show on row hover (opacity 0→1) where density allows |
| Footer | `.table-footer` | Left: row-count info. Right: pagination, current page in blue |

## Rules

- Column header height: **40px**. Body row: **48px** min (compact: 36px for dense audit logs).
- **Maximum 7 columns** in standard view. Above 7, collapse low-priority behind a `+` button.
- Primary column always **leftmost**. Action column always **rightmost**.
- Numeric data uses **JetBrains Mono 12px** for column alignment.
- Empty table: render `<EmptyState>` inside the `tbody` — never show a bare empty table.
- Pagination: highlight current page. Always show first, last, and immediate neighbours; ellipsis for gaps > 3.
- Search: debounce **300ms**. Show clear button when query is active. Filter client-side or fetch without navigation.

→ Source: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md), Section 10.
