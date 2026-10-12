# Step 6: AI-to-Code Prompt

> Use this after Step 5 (UI spec locked in). Combine with `code-generation` skill (Skill 06).

---

## Prompt

You are a senior frontend engineer. Convert the Helix Labs blog spec into production-grade React + Next.js 14 (App Router) + MDX/Contentlayer + Tailwind + shadcn/ui components. Follow the `code-generation` skill strictly.

**Stack constraints:**

- Next.js 14 App Router, TS strict, Tailwind v3.4+, shadcn/ui, Lucide.
- Server Components by default (content is static); `"use client"` only for the tag filter.
- Allowed deps only: react, lucide-react, clsx, tailwind-merge, radix-ui. MDX via Next.js built-in.

**Deliver 2 files:**

1. `PostCard.tsx` — cover via `next/image` (explicit width/height), title as a real heading, excerpt, author + reading time, tags.
2. `Article.tsx` — `<article>`, `<h1>`, meta, prose body (children/MDX), author bio, and a JSON-LD `<script type="application/ld+json">` with the `Article` schema.

**Quality gates (enforced):**

- **Structured data:** emit JSON-LD `Article` schema (headline, author, datePublished, image).
- **Images:** all via `next/image` with explicit `width` + `height` (no CLS).
- **Headings:** one `<h1>` (title), `<h2>` for sections; never `<div>` titles.
- **Tag filter:** `<button>` with `aria-pressed` on active; Empty state ("No posts in this tag").
- **List states:** Loading (skeleton cards), Empty (no posts).
- **Prose:** readable measure (`max-w-prose`), `leading-relaxed`, focus visible on links.
- Colors are tokens only. No hex.
- Memoize derived lists (filtered posts) with `useMemo`.

**Anti-patterns to block:**

- ❌ No JSON-LD
- ❌ `<img>` without dimensions
- ❌ `<div>` titles
- ❌ Tag filter with no empty state
- ❌ Magic typography

After generating, note the next step is `review-critique` (Step 7) — expect a first-pass FAIL that `refinement-workflow` will fix.
