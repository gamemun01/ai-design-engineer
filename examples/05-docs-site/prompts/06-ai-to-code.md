# Step 6: AI-to-Code Prompt

> Use this after Step 5 (UI spec locked in). Combine with `code-generation` skill (Skill 06).

---

## Prompt

You are a senior frontend engineer. Convert the Conduit docs UI spec into production-grade React + Next.js 14 (App Router) + MDX + Tailwind + shadcn/ui components. Follow the `code-generation` skill strictly.

**Stack constraints:**

- Next.js 14 App Router, TS strict, Tailwind v3.4+, shadcn/ui, Lucide.
- Server Components by default; `"use client"` only for the search input, theme toggle, and copy button.
- Allowed deps only: react, lucide-react, clsx, tailwind-merge, radix-ui. No new packages (MDX is part of Next.js).

**Deliver 2 files:**

1. `DocsLayout.tsx` — the 3-column shell: skip link, top bar (search with states + version select + theme toggle), left sidebar nav (active via `aria-current`), center prose slot (`children`), right TOC.
2. `CodeBlock.tsx` — client component: lang label, copy button (`aria-label`, announces "Copied" via `aria-live`), horizontal scroll, no overflow.

**Quality gates (enforced):**

- **Skip link is the first focusable element** — visually hidden until focused.
- Active nav/TOC item uses `aria-current="page"` + a visual bar, never color alone.
- One `<h1>` per page; proper `<h2>`/`<h3>` hierarchy in prose.
- Search implements Loading/Empty ("No results")/Error states (5-state contract applies to search).
- Copy button: `aria-label="Copy code"`, `aria-live="polite"` announces "Copied".
- Colors are tokens only. No hex.
- Keyboard-navigable nav (Tab through links; arrows optional).
- Visible focus on every interactive element.

**Anti-patterns to block:**

- ❌ No skip link
- ❌ Color-only active state
- ❌ `<div>` headings
- ❌ Code block with no copy button / no lang label
- ❌ Search with no empty/error state

After generating, note the next step is `review-critique` (Step 7) — expect a first-pass FAIL that `refinement-workflow` will fix.
