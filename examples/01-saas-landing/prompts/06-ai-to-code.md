# Step 6: AI-to-Code Prompt

> Use this after Step 5 (UI wireframes locked in). Combine with `code-generation` skill (Skill 06).

---

## Prompt

You are a senior frontend engineer. Convert the wireframes from Step 5 into production-grade React + Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui code. Follow the `code-generation` skill template strictly.

**Stack constraints:**

- Next.js 14 App Router (not Pages Router)
- TypeScript strict mode
- Tailwind CSS v3.4+
- shadcn/ui (Radix primitives + Tailwind)
- Lucide icons only (no other icon libraries)
- No external UI libraries beyond shadcn/ui
- Use `next/font` for Inter and Cal Sans
- Server Components by default; Client Components only when needed (use `"use client"` directive)

**Component structure rules:**

- One file per section in `components/landing/`
- Each file exports a default function component
- Props are typed and minimal (data is in `lib/content.ts`)
- Use `cn()` helper from `lib/utils.ts` for conditional classes
- No business logic in components; lift to lib/

**Quality gates (enforced):**

- All images use `next/image` with explicit `width` + `height`
- All links use `next/link`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Heading hierarchy: one `<h1>` per page (Hero), `<h2>` for section titles, `<h3>` for card titles
- Color usage: ONLY design tokens (no `bg-blue-500` directly — use `bg-primary`)
- Spacing: ONLY Tailwind spacing scale (no arbitrary values like `mt-[13px]`)
- Responsive: mobile-first; test sm/md/lg/xl breakpoints

**Accessibility requirements:**

- Skip-to-content link
- Focus visible on all interactive elements
- `aria-label` on icon-only buttons
- Form inputs have associated `<label>`
- Color contrast ≥ 4.5:1 for body, 3:1 for large text
- Reduced motion: respect `prefers-reduced-motion`
- Keyboard navigation works for: nav menu, accordion, pricing toggle, FAQ

**Output format for each component:**

```tsx
"use client" // only if needed

import { ... } from "..."

export interface NavbarProps {
  // ...
}

export function Navbar({ ... }: NavbarProps) {
  return (
    // semantic markup
  )
}
```

**Anti-patterns to block (from Skill 10):**

- ❌ `any` type
- ❌ Inline styles (use Tailwind)
- ❌ Hard-coded colors outside tokens
- ❌ Missing `key` prop in lists
- ❌ Unused imports
- ❌ Components > 200 lines (split)
- ❌ Nested ternaries in JSX (extract to variable or component)
- ❌ `useEffect` for data fetching (use Server Components)
- ❌ Console.log in production code
- ❌ TODO comments in delivered code

**Build order:**

1. `lib/content.ts` — all copy and config
2. `lib/utils.ts` — `cn()` helper
3. `components/landing/Navbar.tsx`
4. `components/landing/Hero.tsx`
5. `components/landing/LogoBar.tsx`
6. `components/landing/Features.tsx`
7. `components/landing/HowItWorks.tsx`
8. `components/landing/Testimonials.tsx`
9. `components/landing/Pricing.tsx`
10. `components/landing/FAQ.tsx`
11. `components/landing/CTA.tsx`
12. `components/landing/Footer.tsx`
13. `app/page.tsx` — composes all sections

After generating, run through the `review-critique` skill (Skill 07) 0-120 scorecard and report the score.
