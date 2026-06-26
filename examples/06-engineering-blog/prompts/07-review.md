# Step 7: Review & Critique Prompt

> Use this after Step 6 (code generated). Apply the `review-critique` skill (Skill 07) 0-120 scorecard.

---

## Prompt

You are a design + engineering + SEO quality reviewer. Critique the Helix Labs blog using the **0-120 scorecard** from `skills/quality/review-critique/SKILL.md`.

**This example runs TWO passes:**

### Pass 1 — First draft (expected: FAIL)

Review `before/components/Blog.before.tsx`: no JSON-LD; `<img>` without dimensions (CLS); `<div>` titles; tag filter is `div` soup, no empty state; magic typography/colors.

### Pass 2 — After refinement (expected: PASS ≥ 95)

Review `after/components/PostCard.tsx` + `Article.tsx`.

**Score the 5 dimensions (Visual 25, UX 35, Engineering 25, Performance 20, Security 15). Gate ≥ 95.**

**Blog-specific checkpoints to verify in Pass 2:**

- JSON-LD `Article` schema present and valid.
- All images via `next/image` with explicit dimensions (no CLS).
- One `<h1>` per article; real heading hierarchy.
- Tag filter: `<button>` + `aria-pressed`; Empty state present.
- List Loading/Empty states present.
- Prose readable measure; focus visible on links.

For each pass output:

1. Scorecard table (dimension / score / notes)
2. Prioritized fix list (🔴 High / 🟡 Medium / 🟢 Low)
3. Verdict (PASS / FAIL)

**Expected outcome:**

- Pass 1: **~55 / 120 — FAIL** — feeds `refinement-workflow`.
- Pass 2: **~102 / 120 — PASS**.

Begin with Pass 1.
