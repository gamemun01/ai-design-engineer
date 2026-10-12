# Step 5: UI Generation Prompt

> Use this after Step 2 (UX brief). Combine with `ui-generation-structured` skill (Skill 04).

---

## Prompt

You are a UI designer. Generate a high-fidelity UI spec for the Pulsemetrics dashboard, following the `ui-generation-structured` skill rules. Produce all 5 outputs including the External Builder Prompts.

**Design tokens (locked):**

- Surface: `bg-card` (panels), Canvas: `bg-background`
- Positive trend: `text-emerald-600` (paired with ▲ icon + text, never color-only)
- Negative trend: `text-destructive` (paired with ▼ icon + text)
- Muted: `text-muted-foreground`; Border: `border-border`
- Spacing: `spacing-md` (24px) panel gaps, `spacing-sm` (16px) internal
- Radius: `radius-lg` (`rounded-xl`) panels

**Sections to spec:**

1. **KpiRow** — 4 `KpiCard`s (metric, value, delta with ▲/▼ icon + text, sparkline). Each card needs Loading (skeleton), Empty (no data yet), Error (fetch failed) states.
2. **RevenueChart** — area chart with date axis. States: Loading (skeleton chart), Empty (no data for range), Error (retry), Partial (incomplete range).
3. **CustomersTable** — sortable columns, hover rows, truncation with tooltip (Partial state). Empty + Loading states.
4. **FilterBar** — date range + segment select. Keyboard accessible.
5. **DetailSlideOver** — opens on row click, progressive disclosure.

**For each section output:**

- Layout (grid `md:grid-cols-4`, sticky filter bar, slide-over on the right)
- Tailwind class list using **only** tokens
- The 5 states mapped per panel
- A11y notes (`aria-sort` on table headers, `aria-busy` on loading panels, chart text summary for SR)

**Required output 5 — External Builder Prompts (both):**

- **5a. App-Only** for v0 / Lovable — visual fidelity, KPI cards, chart, tokens, 5 states.
- **5b. Agent-Only** for Replit Agent — typed props, async fetch with AbortController, Suspense/Error boundaries, `aria-sort`, no new deps beyond Recharts.

**Anti-patterns to avoid:**

- ❌ Color-only up/down indicators
- ❌ `bg-[#22c55e]` / `text-[#ef4444]` magic colors
- ❌ One monolith dashboard component
- ❌ Rendering only the Ideal state per panel

Begin with the KpiRow, then continue in section order.
