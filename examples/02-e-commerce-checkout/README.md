# Example 02: E-commerce Checkout — End-to-End Walkthrough

> **Goal:** Take a fashion e-commerce checkout flow from idea → production-ready React + Next.js + TypeScript + Tailwind + shadcn/ui code using the AI Design Engineer framework. This is the **same checkout thread** referenced across all 10 skill `## Example Usage` sections, now built out as a full reproducible example.

## 📋 What you'll build

A mobile-first checkout funnel for a fictional fashion store called **"Northwind Apparel"**. The page includes:

- Sticky order summary (collapses on mobile)
- 3-step funnel: Shipping → Payment → Review
- Step indicator with `aria-current`
- Form fields with inline validation
- Declined-card error panel with retry
- Empty-cart notice with CTA
- Loading skeleton (`aria-busy`)
- Partial state: coupon applied badge + recalculated total (`aria-live`)
- Sticky Place Order bar (single primary CTA, disabled while submitting)

## 🎯 Why this example?

Checkout is where revenue lives, and where AI output fails hardest:

| Failure mode | Framework fix |
|---|---|
| One-page mega-form overwhelms users | Skill 03 (UX) — Assist strategy, multi-step |
| `bg-[#0d9488]` magic colors everywhere | Skill 04 (Design System Governance) |
| Only "happy path" coded, no error/empty | Skill 06 (Code Generation) 5-state contract |
| `div onClick` on the Pay button | Skill 07 (Review) + Skill 09 (Anti-Patterns) |
| Double-submit on Place Order | Skill 08 (Refinement) targeted diff |
| No `aria-live` on total recalculation | Skill 07 scorecard |

**Business target (from the UX brief):** lift completed-checkout from **61% → 75%**, cut mobile abandonment.

## 🚀 Step-by-step (using the framework)

### Step 1: Foundation (Skills 01 + 02)

Load `core-system-prompt` + `prompt-context-loading`. Capture stack (Next.js 14 + TS + Tailwind + shadcn/ui) and the mobile-first + WCAG 2.1 AA constraints.

### Step 2: UX Thinking (Skill 03)

Run `prompts/02-ux-thinking.md` with the `ux-decision-framework` skill. Produces the 8-section UX Decision Document (JTBD, journey with error states, Assist strategy, IA, a11y rules, trade-offs).

### Step 3: UI Generation (Skill 04)

Run `prompts/05-ui-generation.md` with `ui-generation-structured`. Produces wireframe + component inventory + the two builder prompts (v0/Lovable and Replit Agent).

### Step 4: Code Generation (Skill 06)

Run `prompts/06-ai-to-code.md` with `code-generation`. Produces `after/components/CheckoutPanel.tsx` with all 5 lifecycle states.

### Step 5: Review (Skill 07)

Run `prompts/07-review.md` with `review-critique`. See `after/REVIEW.md` — first pass **58/120 (FAIL)**, after refinement **98/120 (PASS)**.

## 📁 Folder structure

```
examples/02-e-commerce-checkout/
├── README.md                    # This file
├── prompts/                     # Prompts used at each step
│   ├── 02-ux-thinking.md
│   ├── 05-ui-generation.md
│   ├── 06-ai-to-code.md
│   └── 07-review.md
├── before/                      # Generic AI "first draft"
│   ├── components/
│   │   └── CheckoutPage.before.tsx
│   └── NOTES.md
└── after/                       # Framework-improved version
    ├── components/
    │   └── CheckoutPanel.tsx
    └── REVIEW.md                # 0-120 scorecard (FAIL → PASS)
```

## 📊 Expected outcome

| Metric | Before (generic AI) | After (framework) |
|---|---|---|
| Production-ready? | ❌ Needs rewrite | ✅ Drop-in |
| Lifecycle states | 1 (Ideal only) | 5 (Ideal/Loading/Empty/Error/Partial) |
| Place Order button | `div onClick` | `<button>` + focus + disabled |
| Magic color values | 6 | 0 |
| Review score (0-120) | ~58 | ~98 |

## 🔄 Reproduce the workflow

1. Copy `prompts/` into your Claude Code / Cursor / Gemini project
2. Execute prompts in order: 02 → 05 → 06 → 07
3. Compare `before/` vs `after/`
4. Verify the scorecard in `after/REVIEW.md`

## 📚 Related

- Skills used: 01, 02, 03, 04, 05, 06, 07, 08, 09, 10
- This is the **threaded example** referenced in every skill's `## Example Usage (Few-Shot Example)`.
- Total time to reproduce: ~75 minutes
