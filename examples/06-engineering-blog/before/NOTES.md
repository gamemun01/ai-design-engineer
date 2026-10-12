# Before: Generic AI-Generated Blog

> Looks like a blog, but invisible to search engines and unfriendly to screen readers.

## Issues with this version

### 🔴 Blockers

1. **No structured data (JSON-LD)** — Google can't rich-result the articles; loses SEO + employer-brand value. Production-readiness failure (Skill 07).
2. **`<img>` without dimensions** — causes Cumulative Layout Shift; fails Lighthouse / Core Web Vitals (#13 Performance blind spots).
3. **`<div>` titles** — `<div className="text-3xl font-bold">` breaks the document outline and SR heading navigation. Fatal for content sites (#9 Semantic code gaps).
4. **Tag filter is `div` soup** — no `aria-pressed`, color-only active, **no empty state** ("No posts in this tag"). Zero-tolerance (#6 Inaccessible interface, #15 No error design).
5. **No list states** — no Loading skeleton, no Empty (when a tag has no posts).
6. **Magic typography/colors** — `text-[#0f172a]`, `border-[#e2e8f0]`, `rounded-[9px]` (#3 Token neglect, zero-tolerance).

### 🟡 Major

1. **No reading measure** — prose line length too wide; hurts readability.
2. **No OG/canonical** — sharing renders poorly.
3. **No focus styles** on links/tags.

### 🟢 Minor

1. No author bio component.
2. No related-posts section.

## Expected score (without framework)

| # | Dimension | Score |
|---|---|---|
| 1 | Visual Quality | 12 / 25 |
| 2 | UX Quality | 11 / 35 |
| 3 | Engineering Quality | 8 / 25 |
| 4 | Performance | 9 / 20 |
| 5 | Security | 12 / 15 |
| **Total** | | **~52 / 120** |

**Verdict: 🚫 Not shippable** — 6 blockers, 3 zero-tolerance.

## Why this happens

Blog AI output fails because the "pretty card grid" screenshot hides everything that matters for content: structured data for search, image dimensions for CLS, real headings for SR nav, and tag-filter states. The framework's production-readiness scorecard dimension (Skill 07) and the 5-state contract (Skill 06) force these invisible-but-critical pieces into existence.
