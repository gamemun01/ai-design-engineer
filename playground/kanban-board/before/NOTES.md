# before/ — Generic First Draft Defect Map

`BoardPage.before.tsx` is the kind of output a raw LLM produces with no skill
governance. It renders, but it fails every quality gate. Severity taxonomy
matches the repo's worked-example convention.

## 🔴 Blockers (zero-tolerance)

1. **Non-semantic CTA** — `+ Add card` is a `<div onClick>` (line ~18). No role,
   no keyboard, no focus ring, no `disabled` while submitting. Violates the
   "real `<button>`" contract.
2. **Magic values everywhere** — `#f8fafc`, `#0f172a`, `#2563eb`, `#334155`,
   `#ffffff`, `#f1f5f9`, `padding: '24px'`, `width: '280px'`, `fontSize: '20px'`,
   `borderRadius: '6px'`. Zero design tokens.
3. **Touch floor violation** — cards are `height: '42px'` (< 44px). Fails WCAG
   2.1 AA touch-target minimum.
4. **Missing lifecycle states** — only Ideal coded. No Loading (skeleton), no
   Empty (new board), no Error (load fail / rollback), no Partial (conflict).
   The 5-state contract is entirely absent.
5. **`any` types** — `board: any`, `col: any`, `card: any`. No typed API
   contract; no discriminated status union to force branch coverage.

## 🟡 Major

1. **`console.log` left in** production code (line ~8).
2. **Total recomputed every render** — no `useMemo`; cheap here but signals the
   pattern that scales badly.
3. **No accessibility semantics** — no `aria-label`, no `role`, no `aria-live`
   for the optimistic-move toast (which doesn't even exist yet).

## 🟢 Minor

1. Inline `style={{...}}` objects defeat the Tailwind/token pipeline entirely.
2. No dark-mode variants; no responsive breakpoints (no mobile single-column).

## Expected scorecard (Pass 1)

| Dimension | Score | Why |
| :--- | :---: | :--- |
| Visual Quality | 10/25 | All inline magic values; no token system |
| UX Quality | 8/35 | 1 of 5 states; no recovery paths |
| Engineering Quality | 8/25 | `div onClick`, `any` everywhere, console.log |
| Performance | 10/20 | Renders, but no memoization; inline style churn |
| Security | 10/15 | Typed loosely; no unsafe HTML (small mercy) |
| **TOTAL** | **46/120** | **FAIL — below 95/120, 5 blockers** |

→ Feeds `review-critique` (Pass 1) and `refinement-workflow` (3 targeted diffs).
