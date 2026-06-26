# Step 6: AI-to-Code Prompt

> Use this after Step 5 (UI spec locked in). Combine with `code-generation` skill (Skill 06).

---

## Prompt

You are a senior frontend engineer. Convert the dashboard UI spec into production-grade React + Next.js 14 + TypeScript + Tailwind + shadcn/ui components. Follow the `code-generation` skill strictly.

**Stack constraints:**

- Next.js 14 App Router, TS strict, Tailwind v3.4+, shadcn/ui, Lucide, Recharts (approved).
- Server Components by default; `"use client"` only for interactive chart/table/filter.
- Allowed deps only: react, lucide-react, clsx, tailwind-merge, radix-ui, recharts.

**Deliver 4 modular files (NOT one monolith):**

1. `Dashboard.tsx` — composition root, manages fetch status, renders the layout + delegates states.
2. `KpiCard.tsx` — one card; props `{ metric, value, delta, status }`; implements Loading/Empty/Error internally.
3. `RevenueChart.tsx` — Recharts area chart; Loading/Empty/Error/Partial states; `aria-label` text summary for SR.
4. `CustomersTable.tsx` — sortable (`aria-sort`), truncation with `title` tooltip (Partial), Empty/Loading states.

**Quality gates (enforced):**

- Every data-driven panel implements all 5 lifecycle states with `aria-busy` / `role="alert"`.
- Trends show ▲/▼ icon **+ text** (never color-only).
- Colors are tokens only (`text-emerald-600`, `text-destructive`, `bg-card`, `text-muted-foreground`). No hex.
- Sort controls are `<button>` (not `div onClick`) with `aria-sort` on `<th>`.
- Memoize derived data (`useMemo`/`useCallback`) — no recompute on every keystroke.
- Async fetch uses `AbortController` (document the boundary; mock fetcher acceptable).
- Split into ≤4 files; each < 200 lines.

**Anti-patterns to block:**

- ❌ `any`, inline styles, hard-coded hex, color-only indicators
- ❌ One 5,000-line `Dashboard.tsx`
- ❌ `div onClick` sort buttons
- ❌ Re-rendering the whole table on each filter keystroke

After generating, note the next step is `review-critique` (Step 7) — expect a first-pass FAIL that `refinement-workflow` will fix.
