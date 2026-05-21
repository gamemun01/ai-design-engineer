# Review Critique — AI Design Engineer

## Purpose
This skill defines how to review AI-generated design and code with objective criteria, score it, and deliver prioritized improvements.

## When to use
- After UI generation or code generation
- Before approving work for production
- When quality gates are needed for consistency and shipping

## Output format
Produce a review report with:
- scored criteria
- summary of strengths and weaknesses
- prioritized fixes
- risk recommendations

---

## Review dimensions
Use three quality dimensions for every critique.

### 1. Visual quality (0–10)
Evaluate layout, hierarchy, spacing, color usage, and clarity.
- Are sections clearly separated?
- Is visual hierarchy easy to follow?
- Is spacing consistent and token-based?
- Is color used purposefully?

### 2. UX quality (0–10)
Evaluate user flow, task clarity, interaction patterns, and accessibility.
- Are the core tasks obvious?
- Are actions easy to find and understand?
- Are there clear states for empty, loading, and error?
- Are accessibility fundamentals present?

### 3. Engineering quality (0–10)
Evaluate code semantics, maintainability, accessibility, and implementation readiness.
- Is markup semantic and accessible?
- Are components reusable and well-scoped?
- Are design tokens respected in code?
- Are state and behavior clearly documented?

---

## Scoring rules
Use this scoring rubric every time.

| Score | Meaning |
|---|---|
| 9–10 | Excellent, production-ready with only minor polish needed |
| 7–8 | Good, with some improvements required before shipping |
| 5–6 | Fair, but not ready for production without major fixes |
| 3–4 | Poor, needs substantial redesign or rewrite |
| 0–2 | Unacceptable, does not meet product or accessibility requirements |

### Minimum threshold
- Aim for at least 8.0 in each dimension.
- If any dimension is below 7, do not ship without a revision.

---

## Review template
Use this template to structure the critique.

1. Summary
   - What was reviewed:
   - Main goal:
   - Overall score:

2. Visual quality score: X/10
   - Strengths:
   - Weaknesses:
   - Fixes:

3. UX quality score: X/10
   - Strengths:
   - Weaknesses:
   - Fixes:

4. Engineering quality score: X/10
   - Strengths:
   - Weaknesses:
   - Fixes:

5. Priority fixes
   - High: must fix before shipping
   - Medium: should fix before final review
   - Low: polish or optional

6. Risk summary
   - The biggest risk if shipped now
   - What needs validation in the next iteration

---

## Example critique
```
Summary:
- Reviewed compliance dashboard UI and React code
- Main goal: fast alert triage for analysts
- Overall score: 8.2/10

Visual quality score: 8/10
- Strengths: clear card layout, strong hierarchy, consistent spacing
- Weaknesses: table row density is high, detail panel feels cramped
- Fixes: increase row padding, add more breathing room in detail panel

UX quality score: 8/10
- Strengths: primary actions visible, filters accessible, task flow clear
- Weaknesses: empty state is missing for no alerts, mobile breakpoint not defined
- Fixes: add empty state callout, define mobile collapse behavior

Engineering quality score: 8.5/10
- Strengths: semantic markup, good component decomposition, accessible buttons
- Weaknesses: missing `aria-describedby` on error messages, no keyboard trap documented for modal
- Fixes: add ARIA descriptions, document modal keyboard behavior

Priority fixes:
- High: add empty state design, define mobile layout
- Medium: add ARIA descriptions, review table density
- Low: polish button labels and icon spacing

Risk summary:
- Biggest risk: the design may overwhelm mobile users without a clear responsive plan
- Needs validation: keyboard navigation on the filter panel
```
```

---

## How to use
1. Review the generated artifact with explicit criteria.
2. Score each dimension and explain why.
3. Deliver prioritized fixes, not just vague feedback.
4. Use the fix list to drive `refinement-workflow.md`.

## How to use next
- When the review score is below 8, iterate through `refinement-workflow.md`.
- If the output passes, run `anti-patterns-detector.md` as a final audit.
- Use this skill as the main quality gate before shipping.
