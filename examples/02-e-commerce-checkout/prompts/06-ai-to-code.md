# Step 6: AI-to-Code Prompt

> Use this after Step 5 (UI spec locked in). Combine with `code-generation` skill (Skill 06).

---

## Prompt

You are a senior frontend engineer. Convert the checkout UI spec from Step 5 into a production-grade React + Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui component. Follow the `code-generation` skill strictly.

**Stack constraints:**

- Next.js 14 App Router, TypeScript strict mode, Tailwind v3.4+, shadcn/ui, Lucide icons only
- Allowed deps only: `react`, `lucide-react`, `clsx`, `tailwind-merge`, radix-ui primitives. No new packages.
- Server Components by default; `"use client"` only for interactive pieces.

**Deliverable: `CheckoutPanel.tsx` implementing ALL 5 lifecycle states:**

1. **Loading** — skeleton + `aria-busy="true"`.
2. **Empty** — empty-cart notice with "Continue shopping" CTA (no dead ends).
3. **Error** — declined-card panel (`role="alert"`, `bg-destructive/10`), inline, with a Retry button. Do not wipe the form.
4. **Ideal** — summary + active step + Place Order bar.
5. **Partial** — coupon discount row + `aria-live="polite"` total recalculation.

**Quality gates (enforced):**

- `CheckoutPanelProps` is a typed interface; `status` is a discriminated union forcing every branch.
- All colors are tokens (`bg-primary`, `bg-destructive`, `bg-card`, `text-muted-foreground`). **No hex, no arbitrary values.**
- Touch targets minimum `h-11` (44px).
- Visible focus: `focus-visible:ring-2 focus-visible:ring-ring focus:outline-none`.
- Place Order is a `<button>` (not `div onClick`), `disabled` while submitting, Enter-to-submit.
- Memoize the total with `useMemo`; summary total wrapped in `aria-live="polite"`.
- Semantic landmarks: `<main>`, `<aside>`, `<section>`, `<footer role="region">`.
- Race-condition safety: `AbortController` on the payment submit (document the boundary; a mock `onSubmit`/`onRetry` is acceptable for the example).

**Output format:**

```tsx
// Component Hierarchy Diagram (comments)
// TypeScript Declarations (interfaces)
// Verified Code Snippet (full component)
// State Coverage Affirmation (bullet list)
```

**Anti-patterns to block (from Skill 09):**

- ❌ `any` type, inline styles, hard-coded hex
- ❌ Prop-drilling `isLoading`/`error` instead of a status union
- ❌ Missing Empty / Error / Partial states
- ❌ `div onClick` on the CTA
- ❌ Console.log, TODO comments

After generating, note that the next step is `review-critique` (Step 7) — expect a first-pass FAIL that `refinement-workflow` will fix.
