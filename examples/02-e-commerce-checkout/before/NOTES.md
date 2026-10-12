# Before: Generic AI-Generated Checkout

> This is the version you'd get if you asked an LLM "build me a checkout page" **without** the AI Design Engineer framework. It renders, but fails every production gate.

## Issues with this version

### 🔴 Blockers

1. **Place Order is a `div onClick`** — no `<button>`, no `role`, no keyboard handler. Screen readers and keyboard users cannot place an order. Zero-tolerance anti-pattern (#9 Semantic code gaps, #6 Inaccessible interface).
2. **Magic values everywhere** — `bg-[#0d9488]`, `p-[17px]`, `rounded-[9px]`, `text-[15px]`, `w-[320px]`, `h-[42px]`. Six arbitrary values, zero tokens. Zero-tolerance (#3 Token neglect).
3. **Touch target below minimum** — `h-[42px]` is under the 44px mobile minimum (#14 No mobile plan).
4. **Only Ideal state coded** — no Loading skeleton, no Empty state, no Error (declined card) panel, no Partial (coupon) state. Declined card = blank screen (#15 No error design).
5. **Double-submit risk** — no `disabled` while submitting, so a double-tap places two orders (#17 Improper feedback).

### 🟡 Major

1. **`any` type** on the item map — type-safety leakage (#16 Unclear data contracts).
2. **No accessibility** — no `aria-live` on total, no labels associated with inputs, no focus rings.
3. **Total recomputed every render** — no `useMemo` (#13 Performance blind spots).
4. **No semantic landmarks** — generic `<div>` soup instead of `<main>`/`<aside>`/`<section>`/`<footer>`.

### 🟢 Minor

1. **`console.log` left in** the submit handler.
2. **No heading hierarchy** — `<h1>` and `<h2>` present but inconsistent sizes.
3. **Hard-coded copy** — no content layer.

## Expected score (without framework)

| # | Dimension | Score |
|---|---|---|
| 1 | Visual Quality | 12 / 25 |
| 2 | UX Quality | 8 / 35 |
| 3 | Engineering Quality | 8 / 25 |
| 4 | Performance | 8 / 20 |
| 5 | Security | 12 / 15 |
| **Total** | | **~48 / 120** |

**Verdict: 🚫 Not shippable** — 4 zero-tolerance blockers.

## Why this happens

When you ask an LLM "build a checkout," it defaults to:

- Inlining brand colors as hex because it doesn't know your token system.
- Using `div onClick` because it's shorter than a `<button>` with handlers.
- Coding only the happy path because screenshots don't show error states.
- Forgetting disabled-state and double-submit guards.

The framework fixes this by enforcing the 5-state contract (Skill 06), the token audit (Skill 04), the scorecard gate (Skill 07), and the anti-pattern catalog (Skill 09).
