# Step 2: UX Thinking Prompt

> Use this prompt with Claude Code / Gemini after loading the **ux-decision-framework** skill (Skill 03).

---

## Prompt

You are a senior product designer. Using the `ux-decision-framework` skill rules, design the UX decisions for the **Pulsemetrics** analytics dashboard.

**Context:**

- Audience: Product managers and growth analysts at B2B SaaS companies (power users)
- Primary goal: spot anomalies and trends in <30 seconds
- Secondary goal: drill into a metric to find root cause
- Data: revenue, active users, churn, conversion — fetched async, sometimes slow/failing
- Stack: Next.js 14 + TS + Tailwind + shadcn/ui + Recharts (approved)

**Deliverables (full UX Decision Document, 8 sections, no empty cells):**

1. **Product Context (JTBD)** — functional / emotional / social.
2. **Key User Tasks** — P0: scan KPIs + spot anomaly; P1: drill into a metric; P2: filter by segment/date.
3. **Journey & Task Flow** — entry (login → dashboard), main path, decision points, success state, **error/recovery states** (data fetch fail, partial data, empty dataset).
4. **UX Strategy** — pick Focus / Discover / Control / Assist and justify. (Expected: **Control** for power-user triage.)
5. **Information Architecture** — visual hierarchy (KPI row → chart → table), navigation model, grouping, progressive disclosure (slide-over detail).
6. **Cognitive Load** — simplify / defer / highlight / limit (density vs scanability trade-off).
7. **Accessibility** — keyboard sort/filter, focus order, contrast for data viz, screen reader summaries for charts, no color-only status.
8. **Trade-offs, Risks & Validation** — density vs scanability; risk of stale data; validation via task-success-rate.

**Constraints:**

- The **5 lifecycle states must be planned per panel** (KPI card, chart, table each need Loading/Empty/Error), not just the page.
- No color-only signifiers on status (up/down arrows + text, not just green/red).

Begin.
