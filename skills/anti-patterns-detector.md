# Anti-Patterns Detector — AI Design Engineer

## Purpose
This skill identifies common AI design and code anti-patterns before they reach production.

## When to use
- After refinement and before final review
- When you want a final safety net for quality issues
- When you need to catch repeated mistakes

## Output format
Produce:
- a list of anti-patterns found
- why each is a problem
- how to fix it
- prevention rules

---

## Common anti-patterns
Use these categories to detect recurring issues.

### Visual anti-patterns
1. **Inconsistent spacing**
   - Problem: layout looks uneven and unpolished
   - Fix: apply the design system spacing tokens consistently
   - Prevention: use a spacing chart and token map

2. **Mixed visual styles**
   - Problem: components look like they belong to different systems
   - Fix: standardize background, border, and typography styles
   - Prevention: enforce component contracts

3. **Overloaded screens**
   - Problem: too many actions or data points appear at once
   - Fix: simplify to the top 3 tasks and move secondary content behind tabs
   - Prevention: limit primary controls per screen

4. **Decorative complexity**
   - Problem: unnecessary gradients, shadows, or icons distract from content
   - Fix: remove decorative elements and focus on clarity
   - Prevention: use color and layout only for meaning, not decoration

### UX anti-patterns
5. **Unclear primary action**
   - Problem: users do not know what to do next
   - Fix: make the primary call-to-action prominent and descriptive
   - Prevention: always label the first impression action clearly

6. **Poor task flow**
   - Problem: users must move between too many screens or sections
   - Fix: combine related steps and reduce context switching
   - Prevention: map the flow before designing the UI

7. **Hidden state feedback**
   - Problem: actions complete without visible confirmation
   - Fix: add toast messages, inline status, or success indicators
   - Prevention: document feedback for every action

8. **Missing empty state**
   - Problem: blank screens confuse users when no data is available
   - Fix: add contextual guidance and next steps for empty screens
   - Prevention: design empty states for every list and table

9. **Accessibility assumptions**
   - Problem: designs rely on color alone or skip keyboard support
   - Fix: add text labels, focus styles, and keyboard navigation
   - Prevention: verify WCAG rules on every screen

### Code anti-patterns
10. **Non-semantic markup**
    - Problem: accessibility and maintainability suffer
    - Fix: use proper HTML tags like `button`, `form`, `table`, `nav`
    - Prevention: audit markup structure before coding

11. **Hard-coded styles**
    - Problem: code is brittle and inconsistent
    - Fix: move styles to tokens or class patterns
    - Prevention: use design tokens in every class or style rule

12. **Large monolith components**
    - Problem: components are hard to read and reuse
    - Fix: split into smaller presentational and container components
    - Prevention: keep each component focused on one responsibility

13. **Missing error handling**
    - Problem: failure states are not defined
    - Fix: add loading, error, and retry states with user guidance
    - Prevention: define state requirements before coding

14. **Poor responsiveness**
    - Problem: layout breaks on mobile or narrow screens
    - Fix: include mobile-first breakpoints and stack content logically
    - Prevention: design mobile behavior first

15. **Undefined data contracts**
    - Problem: components expect inconsistent or unclear props
    - Fix: define explicit prop names and data shapes
    - Prevention: document the component API before implementation

---

## Detection checklist
Use this checklist as a final audit.

- [ ] Do all layouts use token-based spacing?
- [ ] Are visual styles consistent across components?
- [ ] Is the primary action obvious on every screen?
- [ ] Are empty states defined for no-data scenarios?
- [ ] Is all interactive UI keyboard accessible?
- [ ] Does the code use semantic elements?
- [ ] Are styles driven by tokens, not hard-coded values?
- [ ] Are components small and reusable?
- [ ] Are loading, error, and success states handled?
- [ ] Is mobile behavior defined and tested?
- [ ] Are data contracts documented?

---

## How to use
1. Review the generated design and code.
2. Identify any listed anti-patterns.
3. Fix them immediately or document why an exception is valid.
4. Use the checklist to prevent the same issue next time.

## How to use next
- If anti-patterns remain, refine the output again.
- If the audit passes, proceed to `multi-agent-workflow.md` for team orchestration.
