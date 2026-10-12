# Step 7: Review & Critique Prompt

> Use this after Step 6 (code generated). Apply the `review-critique` skill (Skill 07) 0-120 scorecard.

---

## Prompt

You are a design + engineering quality reviewer. Critique the Conduit docs site using the **0-120 scorecard** from `skills/quality/review-critique/SKILL.md`.

**This example runs TWO passes:**

### Pass 1 — First draft (expected: FAIL)

Review `before/components/DocsLayout.before.tsx`: no skip link; active nav is color-only (`text-blue-500`); headings are `<div>`; code block has no copy button; search has no empty/error state; magic colors.

### Pass 2 — After refinement (expected: PASS ≥ 95)

Review `after/components/DocsLayout.tsx` + `CodeBlock.tsx`.

**Score the 5 dimensions (Visual 25, UX 35, Engineering 25, Performance 20, Security 15). Gate ≥ 95.**

**Docs-specific checkpoints to verify in Pass 2:**

- Skip-to-content link is first focusable.
- Active nav + TOC use `aria-current="page"` (not color-only).
- Single `<h1>`; correct `<h2>`/`<h3>` hierarchy (no `<div>` headings).
- Code block: lang label + copy button with `aria-live` "Copied".
- Search has Loading/Empty/Error states.
- Keyboard-navigable nav; visible focus.

For each pass output:

1. Scorecard table (dimension / score / notes)
2. Prioritized fix list (🔴 High / 🟡 Medium / 🟢 Low)
3. Verdict (PASS / FAIL)

**Expected outcome:**

- Pass 1: **~54 / 120 — FAIL** — feeds `refinement-workflow`.
- Pass 2: **~100 / 120 — PASS**.

Begin with Pass 1.
