# Step 7: Review & Critique Prompt

> Use this after Step 6 (code generated). Apply the `review-critique` skill (Skill 07) 0-120 scorecard.

---

## Prompt

You are a mobile design + engineering quality reviewer. Critique the Streakrun "Today" screen using the **0-120 scorecard** from `skills/quality/review-critique/SKILL.md`.

**This example runs TWO passes:**

### Pass 1 — First draft (expected: FAIL)

Review `before/components/TodayScreen.before.tsx`: touch targets at `h-8`/`h-9`; primary CTA at the top; color-only streak; tab bar is `div` soup; only Ideal state.

### Pass 2 — After refinement (expected: PASS ≥ 95)

Review `after/components/TodayScreen.tsx`.

**Score the 5 dimensions (Visual 25, UX 35, Engineering 25, Performance 20, Security 15). Gate ≥ 95.**

**Mobile-specific checkpoints to verify in Pass 2:**

- Min touch target 44px; primary CTA ≥ 48px and in the thumb zone (lower third).
- Streak shown as icon + text (not color-only).
- Tab bar uses `role="tab"` + `aria-current="page"`.
- Offline + empty (rest day) states present.
- Contrast ≥ 4.5:1 (aim 7:1 for outdoor).
- `aria-label` on icon-only profile button.

For each pass output:

1. Scorecard table (dimension / score / notes)
2. Prioritized fix list (🔴 High / 🟡 Medium / 🟢 Low)
3. Verdict (PASS / FAIL)

**Expected outcome:**

- Pass 1: **~51 / 120 — FAIL** — feeds `refinement-workflow`.
- Pass 2: **~99 / 120 — PASS**.

Begin with Pass 1.
