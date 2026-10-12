# Example 03: Analytics Dashboard — End-to-End Walkthrough

> **Goal:** Build a data-dense analytics dashboard for a fictional product **"Pulsemetrics"** — this is the domain where the 5-state contract and the review scorecard matter most, because data-driven UI fails hardest on empty/error/loading.

## 📋 What you'll build

A B2B analytics dashboard with:

- KPI summary cards (4 metrics with trend deltas)
- A main chart area (revenue over time) with loading/empty/error states
- A data table (top customers) with truncation + sorting
- A filter bar (date range, segment)
- Slide-over detail panel

## 🎯 Why this example?

Dashboards are where "looks great in a screenshot" hides fatal flaws:

| Failure mode | Framework fix |
|---|---|
| Only renders when data exists | Skill 06 (Code) 5-state contract — Loading/Empty/Error |
| `bg-[#ff5500]` status badges | Skill 04 (Design System Governance) token audit |
| Re-renders the whole table on every filter keystroke | Skill 07 (Review) Performance dimension |
| Sort buttons are `div onClick` | Skill 09 (Anti-Patterns) zero-tolerance |
| 5,000-line monolith `Dashboard.tsx` | Skill 06 + Skill 08 (Refinement) split into subcomponents |

## 🚀 Step-by-step (using the framework)

### Step 1: Foundation (Skills 01 + 02)

Load `core-system-prompt` + `prompt-context-loading`. Stack: Next.js 14 + TS + Tailwind + shadcn/ui + Recharts (in the approved deps list).

### Step 2: UX Thinking (Skill 03)

Run `prompts/02-ux-thinking.md`. Strategy = **Control** (power users triaging metrics). Produces IA, the 5-state plan per panel, and trade-offs (density vs scanability).

### Step 3: UI Generation (Skill 04)

Run `prompts/05-ui-generation.md`. Produces wireframe + component inventory + builder prompts.

### Step 4: Code Generation (Skill 06)

Run `prompts/06-ai-to-code.md`. Produces `after/components/` split into `Dashboard.tsx`, `KpiCard.tsx`, `RevenueChart.tsx`, `CustomersTable.tsx`.

### Step 5: Review (Skill 07)

Run `prompts/07-review.md`. See `after/REVIEW.md` — first pass **52/120 (FAIL)**, after refinement **101/120 (PASS)**.

## 📁 Folder structure

```
examples/03-analytics-dashboard/
├── README.md
├── prompts/
│   ├── 02-ux-thinking.md
│   ├── 05-ui-generation.md
│   ├── 06-ai-to-code.md
│   └── 07-review.md
├── before/
│   ├── components/
│   │   └── Dashboard.before.tsx
│   └── NOTES.md
└── after/
    ├── components/
    │   ├── Dashboard.tsx
    │   ├── KpiCard.tsx
    │   ├── RevenueChart.tsx
    │   └── CustomersTable.tsx
    └── REVIEW.md
```

## 📊 Expected outcome

| Metric | Before (generic AI) | After (framework) |
|---|---|---|
| Production-ready? | ❌ Needs rewrite | ✅ Drop-in |
| Chart states | 1 (Ideal only) | 5 (Ideal/Loading/Empty/Error/Partial) |
| Component count | 1 monolith | 4 modular |
| Review score (0-120) | ~52 | ~101 |

## 📚 Related

- Skills used: 01, 02, 03, 04, 06, 07, 08, 09
- Total time to reproduce: ~90 minutes
