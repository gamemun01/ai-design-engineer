# Step 2: UX Thinking Prompt

> Use this prompt with Claude Code / Gemini after loading the **ux-decision-framework** skill (Skill 03).

---

## Prompt

You are a senior product designer. Using the `ux-decision-framework` skill rules, design the UX decisions for the checkout flow of **Northwind Apparel** — a fashion e-commerce store.

**Context:**

- Audience: Mobile-first shoppers, ages 22-45, often distracted / on the go
- Business goal: lift completed-checkout rate from 61% → 75%; cut mobile abandonment
- Stack: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
- Payments: Stripe only this quarter
- Constraints: mobile-first, WCAG 2.1 AA, no page reload

**Deliverables (output a full UX Decision Document, all 8 sections, no empty cells):**

1. **Product Context (JTBD)** — functional / emotional / social dimensions of the checkout job.
2. **Key User Tasks** — table (Priority P0/P1/P2, Task, User Intent, Success Signal). At minimum: place order (P0), recover from declined card (P1), apply coupon (P2).
3. **Journey & Task Flow** — entry point, main path (Shipping → Payment → Review → Place Order), decision points, success state, and **all error/recovery states**.
4. **UX Strategy & Justification** — pick Focus / Discover / Control / Assist and justify. Name what is intentionally excluded.
5. **Information Architecture Rules & Wireframing** — visual hierarchy, navigation model, grouping rules, progressive disclosure, low-fi wireframe (mobile single-column vs desktop 2-column).
6. **Cognitive Load Decisions** — simplify / defer / highlight / limit.
7. **Accessibility & Inclusive Design** — focus order, no color-only signifiers, touch targets ≥ 44px, descriptive errors, keyboard behavior, screen reader labels, contrast targets.
8. **Trade-offs, Risks & Validation** — key trade-off (multi-step vs one-page), identified risks (double-tap, address mismatch), validation methods.

**Constraints:**

- Bias for low anxiety over feature density — payment anxiety is the #1 drop-off.
- One primary action per step; no competing CTAs.
- The 5 lifecycle states (Ideal, Loading, Empty, Error, Partial) must be mapped here, not in code.

Begin.
