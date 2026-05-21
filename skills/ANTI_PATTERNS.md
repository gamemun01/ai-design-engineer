<!-- markdownlint-disable -->

# Anti-Patterns — AI Design Engineer

## Purpose
This guide documents the most important anti-patterns for AI design and production workflows. It helps teams avoid repeated mistakes and improve quality before shipping.

## How to use
- Reference it when reviewing output.
- Use it to train AI agents to avoid bad patterns.
- Apply it during refinement and audit phases.

---

## Production anti-patterns
The following anti-patterns are common in AI-generated design and code.

### 1. One-shot shipping
**Problem:** The first generated output is treated as final.
**Why it fails:** There is no refinement, no review, and no quality gate.
**Fix:** Always run `review-critique/SKILL.md` and `refinement-workflow/SKILL.md`.
**Prevention:** Build iteration steps into the process.

### 2. Vague prompts
**Problem:** Prompts are unstructured and open-ended.
**Why it fails:** Output varies wildly and is hard to evaluate.
**Fix:** Use structured prompts from `ui-generation-structured/SKILL.md`.
**Prevention:** Define context, goals, constraints, and rules.

### 3. Token neglect
**Problem:** Design tokens are ignored or inconsistently applied.
**Why it fails:** UI becomes visually fragmented and hard to maintain.
**Fix:** Enforce token rules in `design-system-governance/SKILL.md`.
**Prevention:** Audit every design against the token system.

### 4. No UX rationale
**Problem:** Design decisions lack documented reasoning.
**Why it fails:** Stakeholders cannot validate or improve the design.
**Fix:** Use `ux-decision-framework/SKILL.md` to capture decisions.
**Prevention:** Require rationale for major layout and interaction choices.

### 5. Overdesign
**Problem:** Adding too many features, effects, or visual flourishes.
**Why it fails:** The product loses focus and becomes harder to use.
**Fix:** Simplify to the core user tasks and remove non-essential elements.
**Prevention:** Limit primary decisions to the top 3 user goals.

### 6. Inaccessible interface
**Problem:** Designs rely on color only or skip keyboard support.
**Why it fails:** Many users cannot use the product, and legal risk increases.
**Fix:** Apply WCAG 2.1 AA guardrails and verify keyboard navigation.
**Prevention:** Audit every screen for accessibility before shipping.

### 7. Broken handoffs
**Problem:** Handoffs between UX, UI, and code are unclear.
**Why it fails:** Teams waste time interpreting intent and assumptions.
**Fix:** Use handoff specs from `multi-agent-workflow/SKILL.md`.
**Prevention:** Standardize required artifact contracts.

### 8. Component inconsistency
**Problem:** Similar UI elements are implemented differently.
**Why it fails:** The product feels unstable and harder to maintain.
**Fix:** Define component contracts and reuse them.
**Prevention:** Audit with `design-system-governance/SKILL.md` regularly.

### 9. Semantic code gaps
**Problem:** Generated code uses incorrect HTML or no accessibility semantics.
**Why it fails:** Screen readers and assistive tech cannot interpret the UI.
**Fix:** Convert markup to semantic elements and add ARIA where needed.
**Prevention:** Make semantic code rules mandatory in `code-generation/SKILL.md`.

### 10. No review criteria
**Problem:** Output is not scored or prioritized.
**Why it fails:** Feedback is inconsistent and hard to action.
**Fix:** Use the scoring rubric in `review-critique/SKILL.md`.
**Prevention:** Require review score thresholds before shipping.

### 11. Duplicate patterns
**Problem:** Designers or agents reinvent the same UI pattern repeatedly.
**Why it fails:** The product lacks cohesion and reusability.
**Fix:** Catalog common patterns and reuse them.
**Prevention:** Maintain a pattern library and component system.

### 12. Hidden assumptions
**Problem:** Important product constraints are not documented.
**Why it fails:** Output may violate requirements or miss edge cases.
**Fix:** Make assumptions explicit in the UX brief or prompt.
**Prevention:** Always include constraints and success metrics.

### 13. Performance blind spots
**Problem:** Designs ignore load time or complexity.
**Why it fails:** Users experience slow, clunky interfaces.
**Fix:** Simplify interactions, avoid heavy layouts, and optimize component structure.
**Prevention:** Evaluate performance impact during design.

### 14. No mobile plan
**Problem:** Design only targets desktop and ignores small screens.
**Why it fails:** The product is unusable on mobile or narrow viewports.
**Fix:** Define responsive rules and mobile-first behavior.
**Prevention:** Start with mobile layout and scale up.

### 15. No error design
**Problem:** Error and empty states are missing.
**Why it fails:** Users get stuck and do not know what to do next.
**Fix:** Add explicit error, empty, and loading states.
**Prevention:** Design these states as part of every workflow.

### 16. Unclear data contracts
**Problem:** UI and code do not agree on data shape or props.
**Why it fails:** Implementation becomes fragile and inconsistent.
**Fix:** Document data contracts in the component spec.
**Prevention:** Define props and data models before coding.

### 17. Improper feedback
**Problem:** Actions happen without confirmation or status.
**Why it fails:** Users do not know whether their input worked.
**Fix:** Add success messages, disabled states, and clear status indicators.
**Prevention:** Map feedback for every interactive action.

### 18. Excessive detail in first pass
**Problem:** First iteration tries to solve every edge case.
**Why it fails:** The output is slow to produce and hard to revise.
**Fix:** Start with the core task and iterate.
**Prevention:** Use a minimal viable UI approach.

### 19. No versioned review
**Problem:** Output is reviewed once without tracking changes.
**Why it fails:** Improvements are not measured and issues can reappear.
**Fix:** Keep review history and compare versions.
**Prevention:** Use the refinement workflow to tie reviews to iterations.

### 20. Ignoring production context
**Problem:** Designs do not consider development constraints.
**Why it fails:** The UI is hard to build or maintain.
**Fix:** Include code feasibility and front-end constraints in the prompt.
**Prevention:** Align design and engineering requirements from the start.

---

## Prevention checklist
- [ ] Load context with `prompt-context-loading/SKILL.md`
- [ ] Start with `core-system-prompt/SKILL.md`
- [ ] Capture UX rationale with `ux-decision-framework/SKILL.md`
- [ ] Generate UI with structured prompts
- [ ] Audit tokens with `design-system-governance/SKILL.md`
- [ ] Convert code with semantic conventions
- [ ] Score output with `review-critique/SKILL.md`
- [ ] Iterate with `refinement-workflow/SKILL.md`
- [ ] Final check with `anti-patterns-detector/SKILL.md`
- [ ] Orchestrate with `multi-agent-workflow/SKILL.md`

---

## Notes
This guide is meant to shift the workflow away from ad-hoc prompt experimentation and toward a system that catches problems before the product ships.
