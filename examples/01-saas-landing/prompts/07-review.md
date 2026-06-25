# Step 7: Review & Critique Prompt

> Use this after Step 6 (code generated). Apply the `review-critique` skill (Skill 07) 0-120 scorecard.

---

## Prompt

You are a design + engineering quality reviewer. Critique the landing page code in `components/landing/` using the **0-120 scorecard** defined in `skills/review-critique/SKILL.md`.

For each of the 8 categories, score 0-15 and provide:

- **Score** (number)
- **Strengths** (bullet list)
- **Issues** (bullet list, each with severity: 🔴 blocker / 🟡 major / 🟢 minor)
- **Action items** (concrete fixes, not vague advice)

**The 8 categories:**

1. **UX & Information Architecture** (max 15)
   - Is the user journey clear?
   - Is the primary CTA visible within 5 seconds?
   - Is there a logical content flow?
   - Are pain points addressed?

2. **Visual Design & Hierarchy** (max 15)
   - Is there a clear visual hierarchy?
   - Does typography guide the eye?
   - Is white space used intentionally?
   - Are focal points obvious?

3. **Design System Compliance** (max 15)
   - Are all colors from the token set?
   - Is spacing consistent (8px grid)?
   - Are components from the approved library?
   - Are radii and shadows consistent?

4. **Code Quality** (max 15)
   - Is TypeScript strict (no `any`)?
   - Are components < 200 lines?
   - Is there proper separation of concerns?
   - Are imports clean (no unused)?

5. **Accessibility** (max 15)
   - Is the heading hierarchy correct?
   - Are interactive elements keyboard-accessible?
   - Is color contrast WCAG AA?
   - Are ARIA labels present where needed?

6. **Performance** (max 15)
   - Are images optimized (next/image)?
   - Are fonts using `next/font`?
   - Is code split appropriately?
   - Are there unnecessary re-renders?

7. **Responsive Design** (max 15)
   - Does it work at 320px width?
   - Are breakpoints consistent?
   - Is touch target size ≥ 44x44?
   - Does the nav collapse gracefully on mobile?

8. **Production Readiness** (max 15)
   - Is SEO meta data complete?
   - Is there proper error handling?
   - Are there any console warnings?
   - Would this pass a senior eng's code review?

**Total possible: 120**

**Verdict bands:**

- 100-120: 🏆 Production-ready, ship it
- 85-99: ✅ Solid, address minor issues
- 70-84: ⚠️ Needs work, has notable gaps
- 50-69: 🔴 Significant rework needed
- < 50: 🚫 Not shippable

After scoring, output:

1. The scorecard table
2. Top 3 blockers (must fix)
3. Top 3 polish items (nice to fix)
4. Final verdict

**Example output format:**

```markdown
## Scorecard

| # | Category | Score | Top Issue |
|---|----------|-------|-----------|
| 1 | UX & IA | 13/15 | Hero CTA could be larger |
| 2 | Visual Design | 12/15 | H2 too similar to H3 |
...
| **Total** | | **104/120** | 🏆 Production-ready |

## Blockers
- [ ] 🔴 Pricing toggle doesn't announce state change to screen readers
- [ ] 🔴 Mobile nav menu missing focus trap

## Polish
- [ ] 🟢 Logo bar should fade in on scroll
```

Begin review.
