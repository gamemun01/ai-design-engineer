# Review: Checkout — Before vs After

> Two-pass scorecard for `examples/02-e-commerce-checkout/`. Pass 1 reviews the generic "first draft" (`before/`); Pass 2 reviews the refined version (`after/`) after `refinement-workflow` applied its targeted diffs.

---

## Pass 1 — First draft (before refinement): FAIL

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PARTIAL | 12 / 25 | `bg-[#0d9488]`, `p-[17px]`, `rounded-[9px]`, `text-[15px]` — 6 magic values, zero tokens. |
| **UX Quality** | FAIL | 8 / 35 | Only Ideal + Loading states. No Empty, no Error (declined card), no Partial (coupon). |
| **Engineering Quality** | FAIL | 8 / 25 | CTA is `div onClick`, no role/keyboard, no focus ring. `any` type on item map. |
| **Performance** | PARTIAL | 8 / 20 | Total recomputed every render; no `useMemo`. |
| **Security** | PASS | 12 / 15 | Typed enough to avoid XSS; no unsafe HTML. |
| **TOTAL** | **FAIL** | **48 / 120** | **4 zero-tolerance blockers; below 95/120.** |

### 🔴 High Priority (Production Blockers)

1. Convert `div onClick` CTA → `<button>` with `disabled` while submitting, focus ring, Enter-to-submit.
2. Implement Empty, Error (declined-card + retry), and Partial (coupon) states.
3. Replace all 6 magic values with tokens.
4. Raise touch target to `h-11` (44px).

### 🟡 Medium Priority

1. Memoize total with `useMemo`; wrap summary total in `aria-live="polite"`.
2. Add `aria-current="step"` to StepIndicator.

→ Feeds `refinement-workflow`. See `skills/quality/refinement-workflow/SKILL.md` Example A for the 3 targeted diffs applied.

---

## Pass 2 — After refinement: PASS

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PASS | 23 / 25 | All tokenized; `h-11` touch target; responsive `w-full max-w-md`. Minor: trust-badge icon could use `aria-hidden` (added). |
| **UX Quality** | PASS | 33 / 35 | All 5 states present; sticky summary collapses on mobile; single primary CTA per step. |
| **Engineering Quality** | PASS | 23 / 25 | Semantic landmarks; discriminated `status` union; Enter-to-submit; focus ring. |
| **Performance** | PARTIAL | 14 / 20 | Total memoized; item list not yet memoized (non-blocking). |
| **Security** | PASS | 15 / 15 | Discriminated union tightens prop typing; no unsafe HTML. |
| **TOTAL** | **PASS** | **98 / 120** | **Above 95/120 threshold; no blockers. 🏆** |

### ✅ Ship Readiness

- No blockers. Two minor (non-blocking) notes for a future polish pass:
  - 🟢 Memoize the item list.
  - 🟢 Trust-badge icon already `aria-hidden`.
- Approved to ship. Hand off to `anti-patterns-detector` for the final catalog audit.

---

## Comparison

| Metric | Before | After | Delta |
|---|---|---|---|
| Score | 48 / 120 | 98 / 120 | **+50 (+104%)** |
| Lifecycle states | 1 | 5 | +4 |
| Magic color values | 6 | 0 | −6 |
| Place Order element | `div onClick` | `<button>` | — |
| Production-ready | ❌ | ✅ | — |

## Reproduce

```bash
cd examples/02-e-commerce-checkout
# Follow prompts in order: 02 → 05 → 06 → 07
# Pass 1 (before) should FAIL ~48/120; Pass 2 (after) should PASS ~98/120
```
