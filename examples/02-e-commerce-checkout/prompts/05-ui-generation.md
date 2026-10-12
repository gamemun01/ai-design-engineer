# Step 5: UI Generation Prompt

> Use this after Step 2 (UX brief). Combine with `ui-generation-structured` skill (Skill 04).

---

## Prompt

You are a UI designer. Generate a high-fidelity UI spec for the Northwind Apparel checkout, following the `ui-generation-structured` skill rules (8-layer architecture). Produce **all 5 outputs** the skill promises, including the External Builder Prompts.

**Design tokens (locked):**

- Primary: `bg-primary` / `text-primary-foreground` (brand teal)
- Danger: `bg-destructive` / `text-destructive`
- Surface: `bg-card`, Canvas: `bg-background`, Muted text: `text-muted-foreground`
- Spacing: `spacing-sm` (16px) field gaps, `spacing-md` (24px) section gaps
- Radius: `radius-md` (`rounded-lg`) cards, `radius-sm` (`rounded-md`) buttons
- Touch targets: minimum `h-11` (44px)

**Sections to spec:**

1. **OrderSummary** (sticky left rail on desktop, collapsible disclosure on mobile) — itemized list, totals, coupon toggle, trust badge.
2. **StepIndicator** — Shipping → Payment → Review, `aria-current="step"` on active.
3. **ShippingForm** — labeled inputs, fieldset grouping, inline validation.
4. **PaymentForm** — card fields, trust badges, declined-card error panel.
5. **PlaceOrderBar** (sticky bottom) — single primary CTA, disabled while submitting, "Processing…" label, retry on error.

**For each section output:**

- Layout rules (desktop 2-col / mobile single-col, sticky behavior)
- Tailwind class list using **only** tokens (no hex, no arbitrary values)
- The 5 lifecycle states mapped to each section
- A11y notes (semantic tags, aria-live, focus order, touch targets)

**Required output 5 — External Builder Prompts (both must be produced):**

- **5a. App-Only Prompt** for v0 / Lovable / Bolt.new — visual fidelity, layout, tokens, 5 states, WCAG.
- **5b. Agent-Only Prompt** for Replit Agent / Devin — state machine, typed props, API boundaries (Stripe), AbortController, Suspense/Error boundaries, no new deps.

**Anti-patterns to avoid:**

- ❌ A single one-page mega-form
- ❌ More than one primary CTA per step
- ❌ Color-only error indicators (pair with text + icon)
- ❌ `w-[320px]`, `bg-[#0d9488]`, `h-[42px]` — only tokens
- ❌ Forgetting the Empty / Error / Partial states

Begin with the OrderSummary, then continue in section order. End with both builder prompts.
