# Review: Analytics Dashboard — Before vs After

> Two-pass scorecard for `examples/03-analytics-dashboard/`.

---

## Pass 1 — First draft (before refinement): FAIL

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | FAIL | 10 / 25 | `bg-[#f8fafc]`, `text-[#22c55e]`, `text-[#ef4444]`, `rounded-[9px]` — magic values, zero tokens. |
| **UX Quality** | FAIL | 8 / 35 | Only Ideal state across all panels. No Loading/Empty/Error per panel. Color-only trends. |
| **Engineering Quality** | FAIL | 7 / 25 | Monolith; `div onClick` sort with no `aria-sort`/keyboard; `any` types. |
| **Performance** | FAIL | 7 / 20 | No memoization; whole table recomputes per keystroke; no `AbortController`. |
| **Security** | PASS | 12 / 15 | No unsafe HTML; types loose but not XSS-prone. |
| **TOTAL** | **FAIL** | **44 / 120** | **5 zero-tolerance blockers; below 95/120.** |

### 🔴 High Priority (Blockers)

1. Split monolith into 4 modular components (Dashboard / KpiCard / RevenueChart / CustomersTable).
2. Add Loading/Empty/Error states per panel (not just the page).
3. Convert trend indicators to ▲/▼ icon + text (never color-only).
4. Convert `div onClick` sort → `<button>` + `aria-sort`.
5. Tokenize all colors.

### 🟡 Medium

1. Memoize sorted rows; add `AbortController` to fetch.
2. Add SR text summary for the chart.

→ Feeds `refinement-workflow`.

---

## Pass 2 — After refinement: PASS

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PASS | 22 / 25 | Tokenized; consistent radius/shadow. Minor: sparkline in KPI not yet rendered. |
| **UX Quality** | PASS | 31 / 35 | All 5 states per panel; ▲/▼+text trends; truncation with tooltip (Partial). |
| **Engineering Quality** | PASS | 23 / 25 | 4 files < 200 lines each; semantic table; `aria-sort` on headers. |
| **Performance** | PARTIAL | 17 / 20 | `useMemo` on sort + chart summary; `AbortController` documented. Item list memoizable later. |
| **Security** | PASS | 15 / 15 | Strict typed props; no unsafe HTML. |
| **TOTAL** | **PASS** | **101 / 120** | **Above 95/120; no blockers. 🏆** |

### ✅ Ship Readiness

- No blockers. Polish backlog:
  - 🟢 Render the actual sparkline inside `KpiCard`.
  - 🟢 Memoize the filtered customer list.
  - 🟢 Add hover row focus styling for keyboard users.

---

## Comparison

| Metric | Before | After | Delta |
|---|---|---|---|
| Score | 44 / 120 | 101 / 120 | **+57 (+130%)** |
| Component files | 1 monolith | 4 modular | +3 |
| States per panel | 1 | 5 | +4 |
| Trend indicator | color-only | icon + text | — |
| Production-ready | ❌ | ✅ | — |

## Reproduce

```bash
cd examples/03-analytics-dashboard
# Follow prompts in order: 02 → 05 → 06 → 07
# Pass 1 (before) should FAIL ~44/120; Pass 2 (after) should PASS ~101/120
```
