# Step 7: Review & Critique Prompt

> Use this after Step 6 (code generated). Apply the `review-critique` skill (Skill 07) 0-120 scorecard.

---

## Prompt

You are a design + engineering quality reviewer. Critique `CheckoutPanel.tsx` using the **0-120 scorecard** from `skills/quality/review-critique/SKILL.md`.

**This example runs TWO passes** to show both sides of the gate:

### Pass 1 — the "before / first draft" review (expected: FAIL)

Review the `before/components/CheckoutPage.before.tsx` version: CTA is `div onClick` with no keyboard handler; magic values `bg-[#0d9488]`, `p-[17px]`, `rounded-[9px]`; only Ideal + Loading states; total recomputed every render; no `aria-live`.

### Pass 2 — the "after / refined" review (expected: PASS ≥ 95)

Review the `after/components/CheckoutPanel.tsx` version after `refinement-workflow` applied its diffs.

**For each pass, score the 5 dimensions:**

| Dimension | Max | What to check |
|---|---|---|
| Visual Quality | 25 | Token alignment, visual hierarchy, purposeful contrast |
| UX Quality | 35 | Action discovery, **all 5 lifecycle states**, mobile responsiveness |
| Engineering Quality | 25 | Semantic markup, focus visibility, ARIA / WCAG 2.1 AA |
| Performance | 20 | Render efficiency (`useMemo`), resource optimization |
| Security | 15 | Data safety / XSS, secure typed props |

**Gate:** ≥ 95 / 120 to ship. Any critical fail = BLOCKER.

For each pass output:

1. The scorecard table (dimension / score / notes)
2. Prioritized fix list (🔴 High blockers / 🟡 Medium / 🟢 Low)
3. Final verdict (PASS / FAIL)

**Expected outcome:**

- Pass 1: **~58 / 120 — FAIL (BLOCKER)** — feeds `refinement-workflow`.
- Pass 2: **~98 / 120 — PASS** — ships, then hands to `anti-patterns-detector`.

Begin with Pass 1.
