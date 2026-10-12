# Before: Generic AI-Generated Mobile Screen

> The classic "looks fine on a desktop preview" mobile screen that's unusable on a real phone.

## Issues with this version

### 🔴 Blockers

1. **Touch targets far below 44px** — Start button ~28px (`py-1`), tab items ~16px text. Unusable on the move; fails the ≥44px rule (#6 Inaccessible interface, #14 No mobile plan).
2. **Primary CTA at the top** — out of the right-thumb zone; one-handed users can't comfortably reach it. IA failure (Skill 03).
3. **Color-only streak** — `text-[#f59e0b]` "🔥12" with no text pairing; colorblind users miss the status (#6 Inaccessible interface).
4. **Tab bar is `div` soup** — no `role="tab"`, no `aria-current`, color-only active state. Zero-tolerance (#9 Semantic code gaps).
5. **Only Ideal state** — no Loading, no Empty (rest day), no Error/offline. Offline = blank screen (#15 No error design).
6. **Magic colors** — `bg-[#0d9488]`, `text-[#f59e0b]`, `bg-[#22c55e]`, `text-[#94a3b8]` (#3 Token neglect, zero-tolerance).

### 🟡 Major

1. **No SR summary** on the weekly strip — screen readers get nothing.
2. **Low-contrast tab labels** — `text-[#94a3b8]` on white fails outdoor readability.
3. **No haptic/active feedback** on tap.

### 🟢 Minor

1. Profile button missing entirely (no way to access account).
2. No heading hierarchy.

## Expected score (without framework)

| # | Dimension | Score |
|---|---|---|
| 1 | Visual Quality | 11 / 25 |
| 2 | UX Quality | 9 / 35 |
| 3 | Engineering Quality | 7 / 25 |
| 4 | Performance | 9 / 20 |
| 5 | Security | 12 / 15 |
| **Total** | | **~48 / 120** |

**Verdict: 🚫 Not shippable** — 6 blockers, 4 zero-tolerance.

## Why this happens

Mobile AI output fails because the impressive parts (gradients, streak flames) are exactly the parts that hide a11y failures. The LLM optimizes for "looks like a fitness app" in a screenshot, not "works for a one-handed runner outdoors." The framework enforces touch-target minimums (Skill 03/07), thumb-zone IA (Skill 03), the token + contrast audit (Skill 04), and the offline/empty states (Skill 06).
