# Anti-Pattern Audit: Kanban Board

> Produced by the **`anti-patterns-detector`** skill (Skill 09). Final safety
> check against the canonical catalog in
> [`skills/ANTI_PATTERNS.md`](../../skills/ANTI_PATTERNS.md) (20 patterns).
> Audits both the `before/` first draft and the refined
> `40-frontend-implementation/` output.

---

## Audit Scorecard

| Category | `before/` violations | `after/` violations |
| :--- | :---: | :---: |
| Visual | 2 | 0 |
| UX | 3 | 0 |
| Code | 4 | 0 |
| Workflow | 1 | 0 |
| **Total** | **10** | **0** |

---

## Detailed Violations — `before/BoardPage.before.tsx` (all now fixed)

| # | Anti-Pattern (catalog) | File & line | Why it's a problem | Fix applied (→ artifact) |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **#3 Token neglect** | `before/` L9-12 | `#f8fafc`, `#0f172a`, `#2563eb`, `#334155`, `#ffffff`, `#f1f5f9` + magic px | All swapped for tokens (`bg-card`, `bg-primary`, `text-muted-foreground`, `p-4`, `h-11`) → Diff 3 |
| 2 | **#8 Component inconsistency** | `before/` L18 vs L36 | CTA is a styled `div`; card is a different styled `div` — two "clickable" patterns | Unified: CTA = `<button>`; card = `role="button" tabIndex={0}` with identical focus treatment → Diff 1 |
| 3 | **#15 No error design** | `before/` (whole file) | Only Ideal state; no Empty/Loading/Error/Partial | 4 state subcomponents + discriminated union → Diff 2 |
| 4 | **#6 Inaccessible interface** | `before/` L18, L36 | `div onClick` (no keyboard), 42px cards (<44px), no focus ring, no ARIA | Real `<button>`, `min-h-11`, `focus-visible:ring-2`, `role="alert"`, `aria-live` → Diff 1+2 |
| 5 | **#9 Semantic code gaps** | `before/` L7 | `<div>` everywhere; no `<main>`, `<h1>`/`<h2>` ok but no landmarks | `<main aria-label>`, `<section role="list">`, `<header>` landmarks → Diff 2 |
| 6 | **#16 Unclear data contracts** | `before/` L6 | `board: any`, `col: any`, `card: any` — no shape | Typed `Card`/`Column`/`Board` + `BoardStatus` union → Diff 2 |
| 7 | **#17 Improper feedback** | `before/` L18 | `alert('add card')` — blocking, no real feedback, no disabled state | Optimistic `submittingCardId` dims card + `aria-live` "Moving card…" → Diff 1+2 |
| 8 | **#13 Performance blind spots** | `before/` L8 | `console.log`; total recomputed every render; inline `style` churn | Removed log; `useMemo` grouping + total; token classes → Diff 3 |
| 9 | **#14 No mobile plan** | `before/` L22 | Fixed `280px` columns, no responsive rules | `w-72 shrink-0 snap-start` + `snap-x` mobile single-column → Diff 2 |
| 10 | **#1 One-shot shipping** | `before/` (process) | Treated as final with no review/refinement | Ran full review (Skill 07) + refinement (Skill 08) pipeline |

---

## Four Zero-Tolerance Anti-Patterns Check (the ship blockers)

These four block release regardless of score. Verified against `after/`:

| Zero-tolerance pattern | Status | Evidence |
| :--- | :---: | :--- |
| Hard-coded magic styles (`bg-[#…]`, `p-[..px]`) | ✅ Clear | `rg "\[#\w+\]"` on `BoardPanel.tsx` → 0 matches; all classes are tokens |
| Non-semantic click handlers (`div onClick`) | ✅ Clear | CTA is `<button type="button">`; cards use `role="button"` + `onKeyDown` parity |
| Missing lifecycle states | ✅ Clear | Discriminated `BoardStatus` union renders all 5 branches (see `State-Coverage.md`) |
| External dependency leakage | ✅ Clear | Deps limited to `react`, `lucide-react`, `clsx`/`tailwind-merge`, `@radix-ui` primitives |

---

## Catalog Patterns that did NOT appear (clean by design)

The remaining 10 catalog patterns — [2] vague prompts, [4] no UX rationale,
[5] overdesign, [7] broken handoffs, [10] no review criteria, [11] duplicate
patterns, [12] hidden assumptions, [18] excessive first-pass detail, [19] no
versioned review, [20] ignoring production context — were **prevented by the
upstream skills**, not retroactively caught:

- #2/#4/#12 → addressed by `ux-decision-framework` (`10-ux-decision.md` 8 full sections)
- #5/#18 → Control-strategy scope discipline (no Gantt/AI-suggestions, per UX §4)
- #7 → machine-readable handoffs in `multi-agent-workflow`
- #10/#19 → the two-pass scorecard in `50-review-scorecard.md`
- #20 → stack/deps constrained from the `ui-generation-structured` blueprint onward

---

## Audit Status: **PASS**

All 10 violations in the first draft were resolved by the 3 targeted diffs in
`60-refinement-log.md`. The 4 zero-tolerance blockers are clear. The refined
`BoardPanel.tsx` is **approved to ship**.

**Exemptions claimed:** none. No `// @design-exception` tags were needed; every
choice resolves to a token or a documented UX rationale.

**Human escalation triggers:** none fired (no security breach, no ambiguous
business logic, no architectural disagreement, no circuit-breaker after 3
failures — refinement passed on iteration 1).
