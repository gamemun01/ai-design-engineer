# Before: Generic AI-Generated Docs Site

> Looks like a docs site, but fails every developer-accessibility gate.

## Issues with this version

### 🔴 Blockers

1. **No skip-to-content link** — keyboard users must tab through the entire top bar + sidebar to reach prose. Core a11y failure (Skill 03).
2. **Color-only active nav** — `text-[#2563eb]` with no `aria-current`. Keyboard/SR users can't tell where they are. Zero-tolerance (#6 Inaccessible interface).
3. **`<div>` headings** — `<div className="text-3xl font-bold">` breaks the document outline and the screen-reader heading nav. Fatal for docs (#9 Semantic code gaps).
4. **Code block has no copy button** — developers can't copy with one action; no lang label. Component-contract failure (Skill 06).
5. **Search has no empty/error state** — blank results when nothing matches; no "No results" message (#15 No error design).
6. **Magic colors** — `border-[#e2e8f0]`, `text-[#0f172a]`, `text-[#2563eb]`, `bg-[#0f172a]` (#3 Token neglect, zero-tolerance).

### 🟡 Major

1. **No right-side TOC** — no "on this page" navigation for long pages.
2. **No version selector / theme toggle** — common docs expectations missing.
3. **No focus styles** on links/inputs.

### 🟢 Minor

1. Sidebar nesting is flat (no expand/collapse).
2. No mobile nav collapse.

## Expected score (without framework)

| # | Dimension | Score |
|---|---|---|
| 1 | Visual Quality | 12 / 25 |
| 2 | UX Quality | 10 / 35 |
| 3 | Engineering Quality | 6 / 25 |
| 4 | Performance | 10 / 20 |
| 5 | Security | 12 / 15 |
| **Total** | | **~50 / 120** |

**Verdict: 🚫 Not shippable** — 6 blockers, 3 zero-tolerance.

## Why this happens

Docs sites fail because the LLM optimizes for "looks like Stripe/docs.dev" in a screenshot, not "a developer with a screen reader can find the Auth page and copy the snippet." The invisible parts — skip link, `aria-current`, real headings, copy button, search states — are exactly what the framework's a11y + 5-state + scorecard rules force into existence.
