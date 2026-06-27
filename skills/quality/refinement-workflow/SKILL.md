---
name: refinement-workflow
description: Iteratively improve generated UI or code after review findings by fixing high-impact issues, rescoring, and stopping when quality gates pass. Use after review-critique reports scores below threshold, when the user asks to refine or improve output, or when issues must be resolved without broad rewrites.
version: 2.1.0
author: gamemun01
license: MIT
metadata:
  hermes:
    tags: [refinement, iteration, quality, fix-loop, scope-control]
    related_skills: [review-critique, anti-patterns-detector, code-generation, design-system-governance]
---
<!-- markdownlint-disable -->

# Refinement Workflow — AI Design Engineer

## Trigger Description

Use this skill after `review-critique` identifies issues or scores below the
shipping threshold. It should drive targeted iterations, preserve what already
works, and avoid whole-screen rewrites unless a blocker requires structural
change.

## System Instruction

You are an AI Design Engineer specializing in component refactoring and iterative refinement. Your role is to take a baseline design or code output, analyze the checklist review scores/feedback from `review-critique`, and make targeted, high-impact refinements using standardized tokens without breaking working elements or introducing regression bugs.

## Rules & Constraints

### 1. Baselines & Fix Prioritization

- **Capture Baseline:** Note the baseline score and the specific checklist failures before writing code.
- **Strict Prioritization:**
  1. **High Priority:** Blocker issues, WCAG/accessibility failures, missing component lifecycle states (e.g., missing loading, error, or empty states), and layout breakage on mobile.
  2. **Medium Priority:** Usability friction, visual token misalignments, inconsistent spacing, and minor cleanups.
  3. **Low Priority:** Copy changes, polish, and optional enhancements.

### 2. Targeted Modifications

- **No Global Rewrites:** Avoid rewriting the entire file or component hierarchy. Target changes specifically to the lines of code requiring fixes.
- **Preservation Rule:** Do not modify working helper functions, utilities, or component props unless necessary.

### 3. Iteration Limits & Escapes
<!-- Original iteration rules commented out to preserve history (Rule #1)
- **Quality Threshold:** Iterate until the component scores **>= 95 / 120** on the `review-critique` scorecard, with all blocker checkboxes cleared.
- **Three-Strike Rule:** If the design fails the gate after **3 sequential iterations**, stop and generate an escalation report highlighting the unresolved blockers for human developer intervention.
-->
- **Quality Threshold:** Iterate until the component scores **>= 95 / 120** on the `review-critique` scorecard, with all blocker checkboxes cleared.
- **Three-Strike Rule:** If the design fails the gate after **3 sequential iterations**, stop and generate an escalation report highlighting the unresolved blockers for human developer intervention.

#### Autonomous Self-Healing Refinement Loop
You must execute an autonomous correction loop to resolve code, style, security, and quality issues before escalating to the user:
1.  **Parse Critique scorecard:** Analyze the output checklist, warnings, compiler/linter logs, and point deductions from the `review-critique` step.
2.  **Autonomous Self-Correction Iterations (Max 3):**
    - If the score is below the Gatekeeper Threshold (**< 95/120**) or if any critical blocker is checked:
      - Automatically generate a targeted patch or diff to correct the issues.
      - Apply the patch/diff in the workspace.
      - Re-verify by running the build/linter/compiler tools (e.g. `npm run validate-skill` or standard linters).
      - Re-evaluate the updated code using the `review-critique` scorecard.
      - Repeat this self-correction cycle for a maximum of 3 iterations.
3.  **Human Escalation Rule:** If the code still fails to meet the shipping threshold (**< 95/120**) or has unresolved blocker issues after 3 full cycles of the autonomous loop:
    - Stop the self-healing process.
    - Generate a detailed escalation report showing:
      - The history of scores for all 3 iterations.
      - The remaining compiler warnings, lint errors, or failing checkpoints.
      - The specific block of code causing the bottleneck.
      - Clear recommendations or choices for the user to resolve the issue.

### 4. Regression Checklist

Before submitting the refined output, you **MUST** run this self-audit to prevent regression bugs:
- [ ] **Functional Integrity:** Ensure existing functions, event handlers, props, and states work as before.
- [ ] **Layout Safety:** Verify that the layout doesn't break, overlap, or lose mobile responsiveness under the new adjustments.
- [ ] **Accessibility Preservation:** Ensure keyboard navigation order, focus visibility, and ARIA labels are not stripped or altered.
- [ ] **Style Continuity:** Check that existing custom styling (Tailwind classes, CSS rules) is preserved and not replaced by unrelated styles.

---

## Standard Iteration Prompt Template

Use the following prompt format to drive refinements:

```markdown
You are an AI Design Engineer refining an existing design/code output.

### 📊 Baseline Status
- **Review Score:** X / 120
- **Failing Checkpoints:** [List the unchecked items from review-critique]

### 🛠️ Required Adjustments
1. **[High Priority]** [Issue description and exact target files]
2. **[Medium Priority]** [Issue description and exact target files]
3. **[Low Priority]** [Issue description and exact target files]

### 🎯 Success Criteria
- Review Score >= 95 / 120
- 100% of accessibility focus and semantic HTML checks passed
- All 5 UI States accounted for and verified

Provide targeted code diffs. Summarize modified areas and remaining concerns.
```

---

## Refinement Scenarios & Techniques

### Scenario 1: Focus outline fix (Engineering)

- **Problem:** Button uses border hover effects but does not show a visible focus indicator for screen-reader or keyboard users.
- **Fix:** Apply `focus-visible:ring-2 focus-visible:ring-ring focus:outline-none` classes to the interactive elements.

### Scenario 2: Standardizing magic values (Visual)

- **Problem:** Styling uses arbitrary spacing classes like `m-[13px]` or `p-[17px]`.
- **Fix:** Replace magic numbers with design system tokens: `m-3` (12px) or `p-4` (16px).

### Scenario 3: Implementing missing state (UX)

- **Problem:** Component returns `null` or raw console logs if API errors occur.
- **Fix:** Wrap the return in a conditional block displaying an Error state container with a red border (`bg-destructive/10 border-destructive/20`) and a `Retry` action button.

---

## Expected Output Format

1. **Change Log Summary:** A bulleted list of modifications mapped to the prioritized issue list.
2. **Targeted Code Diffs:** Readable git-style file diffs showing only changed lines.
3. **Self-Check Review Score Prediction:** Pre-audit calculation of the anticipated new `review-critique` score.

## Example Usage (Few-Shot Example)

> **Threaded pipeline:** Example A continues the **e-commerce checkout** thread. It
> consumes the FAIL scorecard from `review-critique` (58/120), applies **multiple
> targeted diffs** (not a rewrite), and predicts the re-score. Example B is the
> original single-diff edge case.

### Example A — Checkout refinement (thread, multi-fix 58 -> 98)

```markdown
User: Refine CheckoutPanel.tsx. Review score is 58/120 because: (1) CTA is a
div onClick with no keyboard handler, (2) magic numbers p-[17px]/bg-[#0d9488]/
rounded-[9px], (3) only Ideal+Loading states exist, (4) total recomputed every
render. Apply targeted diffs only.
```

Response:

````markdown
## Change Log Summary
- 🔴 High: Converted Place Order `div onClick` -> `<button>` with `focus-visible:ring-2`,
  `disabled` while submitting, and Enter-to-submit. (Semantic Markup +5, Focus Visibility +5)
- 🔴 High: Added Empty (empty-cart CTA), Error (declined-card panel + Retry), and Partial
  (coupon discount row) states via a discriminated `status` union. (Component Lifecycle +20)
- 🔴 High: Tokenized all magic values: `bg-[#0d9488]`->`bg-primary`, `p-[17px]`->`p-4`,
  `rounded-[9px]`->`rounded-lg`, added `h-11` (44px) touch target. (Token Alignment +10)
- 🟡 Medium: Memoized total with `useMemo`; wrapped summary total in `aria-live="polite"`;
  added `aria-current="step"` to StepIndicator. (Render Efficiency +6, ARIA +2)
- 🟢 Low: Added `aria-hidden` to decorative trust-badge icon. (Polish)

## Targeted Code Diffs

### Diff 1 — CTA: div onClick -> semantic button with state + focus (High)
```diff
-<div className="bg-[#0d9488] w-[320px] h-[42px] rounded-[9px] text-[15px]"
-     onClick={submit}>
-  Place Order — ${total}
-</div>
+<button
+  onClick={submit}
+  disabled={status === 'submitting'}
+  onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
+  className="w-full max-w-md h-11 rounded-lg text-base font-medium \
+             bg-primary text-primary-foreground hover:bg-primary/90 \
+             disabled:opacity-50 disabled:cursor-not-allowed \
+             focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
+>
+  {status === 'submitting' ? 'Processing…' : `Place Order — $${memoizedTotal.toFixed(2)}`}
+</button>
```

### Diff 2 — Add missing lifecycle states (High, branch on a status union)
```diff
+type CheckoutStatus = 'ideal' | 'loading' | 'empty' | 'error' | 'submitting';
+
 export function CheckoutPanel({ items, totals, status, paymentError, onRetry }: CheckoutPanelProps) {
-  // only Ideal + Loading existed
+  if (status === 'loading') return <CheckoutLoadingSkeleton />;
+  if (status === 'empty' || items.length === 0) return <CheckoutEmptyState />;
+  if (status === 'error')
+    return <CheckoutErrorState error={paymentError ?? 'Unknown error'} onRetry={onRetry} />;
   // ... existing Ideal rendering ...
+  {/* PARTIAL: discount row renders only when a coupon is applied */}
+  {typeof totals.discount === 'number' && (
+    <p className="text-sm text-success" aria-live="polite">
+      Coupon applied: −${totals.discount.toFixed(2)}
+    </p>
+  )}
 }
```

### Diff 3 — Memoize total + aria-live (Medium)
```diff
-const total = items.reduce((s, i) => s + i.price * i.qty, 0); // recomputed every render
+const memoizedTotal = useMemo(() => totals.total, [totals.total]);
 ...
-<span>${total.toFixed(2)}</span>
+<span aria-live="polite">${memoizedTotal.toFixed(2)}</span>
```

## Self-Check Review Score Prediction
- Previous score: 58 / 120
- Estimated score after changes: 98 / 120
  - Visual 12 -> 23 (+11: tokenization, h-11 touch target, responsive width)
  - UX 8 -> 33 (+25: Empty/Error/Partial states, aria-current step)
  - Engineering 8 -> 23 (+15: semantic button, focus ring, Enter handler)
  - Performance 8 -> 14 (+6: useMemo + memoized summary)
  - Security 12 -> 15 (+3: discriminated union tightens prop typing)
- Remaining concerns (non-blocking): memoize the item list; add aria-hidden to
  trust-badge icon. Re-run `review-critique` to confirm 98/120 before shipping.
````

### Example B — Dashboard single-diff refinement (edge case)

```markdown
User: Refine the dashboard component. Review score is 72/120 because keyboard
focus is missing, empty state is absent, and spacing uses arbitrary values.
```

Response:

````markdown
## Change Log Summary
- High: Added visible focus rings to all interactive controls.
- High: Added an explicit empty state with recovery CTA.
- Medium: Replaced arbitrary spacing classes with tokenized Tailwind spacing.

## Targeted Code Diffs
```diff
- className="p-[17px]"
+ className="p-4"
```

## Self-Check Review Score Prediction
- Previous score: 72/120
- Estimated score after changes: 98/120
- Remaining concerns: Verify contrast in browser before shipping.
````

## Common Pitfalls
1. Refactoring broadly to 'clean up' — refinement must be targeted at the specific findings from `review-critique`, not a general rewrite.
2. Continuing iterations past the quality gate threshold — stop as soon as the score passes; more passes waste context and risk regression.
3. Ignoring the highest-impact findings first — order work by impact (Blockers first, then Major, then Minor).
4. Re-scoring before fixes are actually applied — always run refinement first, then re-score.
5. Letting scope creep — refuse to add features during refinement; that is a new task requiring a new `code-generation` or `ux-decision-framework` pass.

## Verification Checklist
- [ ] Each iteration starts with a list of specific findings to address (from the most recent scorecard).
- [ ] Iterations stop as soon as the score passes the quality gate threshold — no 'one more pass' loops.
- [ ] Re-score is run after every iteration; the delta is recorded.
- [ ] No new features or scope additions are introduced during refinement.
- [ ] The final iteration produces a scorecard that passes the threshold and a list of remaining acceptable trade-offs.

