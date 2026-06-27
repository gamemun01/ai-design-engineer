# Step 7: Review & Critique Prompt

> Use this after Step 6 (code generated). Apply the `review-critique` skill (Skill 07) 0-120 scorecard.

---

## Prompt

You are a design + engineering quality reviewer. Critique the Pulsemetrics dashboard using the **0-120 scorecard** from `skills/quality/review-critique/SKILL.md`.

**This example runs TWO passes:**

### Pass 1 — First draft (expected: FAIL)

Review `before/components/Dashboard.before.tsx`: one monolith; `bg-[#22c55e]`/`text-[#ef4444]` magic colors; color-only trend indicators; only Ideal state; `div onClick` sort; no memoization.

### Pass 2 — After refinement (expected: PASS ≥ 95)

Review `after/components/` (4 modular files) after `refinement-workflow`.

**Score the 5 dimensions (Visual 25, UX 35, Engineering 25, Performance 20, Security 15). Gate ≥ 95.**

For each pass output:

1. Scorecard table (dimension / score / notes)
2. Prioritized fix list (🔴 High / 🟡 Medium / 🟢 Low)
3. Verdict (PASS / FAIL)

**Dashboard-specific checkpoints to verify in Pass 2:**

- Each panel (KPI, chart, table) has its own Loading/Empty/Error states.
- Trends are ▲/▼ icon + text, not color-only.
- `aria-sort` on sortable headers; sort is a `<button>`.
- Chart has a text summary for screen readers.
- Derived data memoized; `AbortController` on fetch.
- 4 files, each < 200 lines.

**Expected outcome:**

- Pass 1: **~52 / 120 — FAIL** — feeds `refinement-workflow`.
- Pass 2: **~101 / 120 — PASS**.

Begin with Pass 1.
