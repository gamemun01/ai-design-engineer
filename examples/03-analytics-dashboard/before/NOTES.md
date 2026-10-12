# Before: Generic AI-Generated Dashboard

> The classic "looks great in a screenshot" dashboard that fails every production gate.

## Issues with this version

### 🔴 Blockers

1. **One monolith component** — everything in `Dashboard.tsx`; unmaintainable, untestable (#8 Component inconsistency, anti-pattern of large monolithic structures).
2. **Color-only trend indicators** — `text-[#22c55e]` / `text-[#ef4444]` with no icon or text. Colorblind users can't tell up from down; violates WCAG (#6 Inaccessible interface).
3. **Only Ideal state** — no Loading skeleton, no Empty state, no Error state per panel. API failure = blank screen (#15 No error design).
4. **`div onClick` sort** — not a `<button>`, no `aria-sort`, no keyboard support (#9 Semantic code gaps, zero-tolerance).
5. **Magic colors everywhere** — `bg-[#f8fafc]`, `rounded-[9px]`, `text-[#22c55e]`, `text-[#ef4444]` (#3 Token neglect, zero-tolerance).

### 🟡 Major

1. **No memoization** — sorting/filtering recomputes the whole table on every keystroke (#13 Performance blind spots).
2. **No `AbortController`** — stale fetches on rapid filter changes race.
3. **`any` types** on the row map.
4. **No chart text summary** — screen readers get nothing from the chart.

### 🟢 Minor

1. No hover states on table rows.
2. No truncation on long customer names (no Partial state).

## Expected score (without framework)

| # | Dimension | Score |
|---|---|---|
| 1 | Visual Quality | 10 / 25 |
| 2 | UX Quality | 8 / 35 |
| 3 | Engineering Quality | 7 / 25 |
| 4 | Performance | 7 / 20 |
| 5 | Security | 12 / 15 |
| **Total** | | **~44 / 120** |

**Verdict: 🚫 Not shippable** — 5 zero-tolerance blockers.

## Why this happens

Dashboards are the hardest AI output because the impressive part (charts, KPI grids) is exactly the part that hides the missing states. The LLM renders the "full data" screenshot and stops. The framework forces per-panel 5-state coverage, token audits, and a performance scorecard dimension that catches the re-render problem.
