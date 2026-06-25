# Before: Generic AI-Generated Version

> This is the version you'd get if you asked an LLM "Build me a SaaS landing page" **without** the AI Design Engineer framework. It compiles, but has anti-patterns that would fail any real production review.

## Issues with this version

### 🔴 Blockers

1. **No design system** — colors, spacing, typography are all over the place. Hard-coded `blue-500`, `purple-600`, `gray-700` etc. directly in components.
2. **Hero CTA invisible** — primary CTA is the same size and color as nav links. Conversion killer.
3. **Inaccessible accordion** — FAQ uses `<div onClick>` with no keyboard support, no ARIA.
4. **Image without dimensions** — `<img src="..." />` with no width/height → CLS, fails Lighthouse.

### 🟡 Major

1. **TypeScript `any`** — 4 instances of `any` in event handlers and form types.
2. **Mixed icon libraries** — uses Lucide in some places, react-icons in others, emoji in one place. Visual inconsistency.
3. **No mobile menu** — nav links overflow on mobile, broken at 375px.
4. **Pricing toggle doesn't work** — pure UI, no state management for monthly/annual.

### 🟢 Minor

1. **Hard-coded copy** — "Lorem ipsum" in 2 places.
2. **Console.log left in** — `console.log('CTA clicked')` in `Hero.tsx`.
3. **No meta tags** — `app/layout.tsx` is missing description, OG image, etc.
4. **Tailwind class soup** — one element has `bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl`

## Expected score (without framework)

| # | Category | Score |
|---|----------|-------|
| 1 | UX & IA | 8/15 |
| 2 | Visual Design | 6/15 |
| 3 | Design System | 3/15 |
| 4 | Code Quality | 7/15 |
| 5 | Accessibility | 4/15 |
| 6 | Performance | 8/15 |
| 7 | Responsive | 5/15 |
| 8 | Production | 5/15 |
| **Total** | | **46/120** |

**Verdict: 🚫 Not shippable**

## Why this happens

When you ask an LLM "build a landing page," it defaults to:

- Showing off visual variety (gradients, animations) instead of clarity
- Using the most-common Tailwind classes (blue-500, gray-900) without a system
- Optimizing for "looks done" not "is done"
- Skipping a11y/perf because they're invisible in screenshots

The **AI Design Engineer framework** fixes this by enforcing:

- A token system (Skill 04)
- Explicit UX decisions before generation (Skill 03)
- A code review scorecard (Skill 07)
- An anti-patterns list (Skill 10)
