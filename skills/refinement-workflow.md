# Refinement Workflow — AI Design Engineer

## Purpose
This skill defines a structured refinement workflow for improving AI-generated design or code after review.

## When to use
- After `review-critique.md` identifies issues
- When the first version is not yet production-ready
- When you need a repeatable path to higher quality

## Output format
Produce:
- an iteration plan
- targeted refinement prompts
- scoring improvements
- stopping criteria

---

## Refinement process
Follow these steps for every iteration.

### 1. Capture the baseline
- Record the current output and its review scores
- Note the main problems from the critique
- Keep the original design or code for comparison

### 2. Prioritize fixes
- High priority: production blockers, accessibility issues, major UX problems
- Medium priority: usability friction, visual consistency, maintainability
- Low priority: polish, labeling, minor spacing adjustments

### 3. Write a refinement prompt
Include:
- the original output summary
- the review findings
- the prioritized fixes
- explicit success criteria

### 4. Make targeted changes
For each iteration, do not rewrite the entire project unless necessary.
- Fix the highest-impact item first.
- Keep working code and components intact where possible.
- Preserve what already works well.

### 5. Re-review and score again
- Run the same review criteria after the change
- Compare the new scores to the baseline
- Note improvements and remaining gaps

### 6. Repeat until ready
Use this rule for stopping:
- Stop when all dimensions are at least 8.0
- Or stop after 3 iterations and escalate remaining issues to a human reviewer

---

## Iteration prompt template
```
You are an AI Design Engineer refining an existing design/code output.

Current status:
- Original output summary:
- Review scores:
  - Visual quality: X/10
  - UX quality: X/10
  - Engineering quality: X/10

Primary issues to fix:
1. [High priority issue]
2. [Medium priority issue]
3. [Low priority issue]

Success criteria:
- Visual quality >= 8
- UX quality >= 8
- Engineering quality >= 8
- Accessibility issues resolved
- Design tokens enforced

Refine the output by making the changes above. Do not introduce new problems.
Provide a short summary of changes made, and list any issues still remaining.
```

---

## Refinement examples
### Example 1: Visual polish
- Problem: spacing is inconsistent and the detail panel feels cramped
- Fix: standardize spacing with `spacing-md` and add breathing room between cards
- Outcome: cleaner layout, improved readability, stronger hierarchy

### Example 2: UX fix
- Problem: primary action is hidden in a secondary menu
- Fix: move the action to a primary button near the task context
- Outcome: easier task completion and clearer affordance

### Example 3: Engineering fix
- Problem: a table uses `div` rows instead of semantic `table` markup
- Fix: convert the structure to `table`, `thead`, `tbody`, `tr`, `th`, and `td`
- Outcome: better accessibility and easier maintainability

---

## Stopping criteria
Use these conditions to decide when the output is ready:
- All high-priority issues are resolved
- The output has improved in at least one review dimension
- The code and design still align with the design system
- No new major issues were introduced

If the system reaches 3 iterations without meeting the score threshold, escalate the output to a human reviewer.

---

## How to use next
- After refining, run `review-critique.md` again to verify improvements.
- Then run `anti-patterns-detector.md` as a final production check.
- Use this workflow for all AI-generated iterations to prevent one-shot shipping.
