# Playground: Collaborative Kanban Board

A full end-to-end test of the **AI Design Engineer skill pack (all 10 skills)**
on a single project. Every artifact in this folder is the *literal expected
output* of one skill, produced in pipeline order, so you can verify the skill
chain actually works.

> ⚠️ This is a `playground/` — deliberately **outside** `examples/` so it does
> not perturb the canonical worked examples or the golden snapshots in
> `tests/golden/`.

---

## The project

A **Collaborative Kanban Board** (Trello-lite): cards in columns, drag (or
keyboard) to advance work, optimistic UI with safe rollback. Chosen because it
stresses every skill hard — real-time optimistic state, 5 distinct lifecycle
states, a Control-strategy UX decision, drag/token governance, and a
multi-agent orchestration wrap.

This run exercises **all 12 skills**: the 10 core skills + both community
plugins (`a11y-audit-pack`, `motion-design-pack`), and compiles the produced
component into a **real, buildable Next.js app** (`app/`).

---

## Skill → artifact → how to verify it passed

| # | Skill | Artifact produced | Contract it must satisfy | Verified by |
| :---: | :--- | :--- | :--- | :--- |
| 02 | `prompt-context-loading` | [`00-context-loading.md`](00-context-loading.md) | Files Checked table + Active Constraints + exactly one Next Skill | Fixed read order; routing names `core-system-prompt` |
| 01 | `core-system-prompt` | [`01-core-prompt.md`](01-core-prompt.md) | Role + active constraint set + **`<thinking_process>` block** | The XML thinking block + token map present |
| 03 | `ux-decision-framework` | [`10-ux-decision.md`](10-ux-decision.md) | **8 sections, no empty cells** | All 8 headings present + 5-state map |
| 04 | `ui-generation-structured` | [`20-ui-blueprint.md`](20-ui-blueprint.md) | 8-layer architecture + **2 builder prompts** | 8-row layer table + App-Only + Agent-Only |
| 05 | `design-system-governance` | [`30-design-system-audit.md`](30-design-system-audit.md) | Token verification + contract check + fix list | Token table all ✅ + 0 magic values |
| 06 | `code-generation` | [`40-frontend-implementation/BoardPanel.tsx`](40-frontend-implementation/BoardPanel.tsx) + [`State-Coverage.md`](40-frontend-implementation/State-Coverage.md) | Hierarchy + TS decls + verified snippet + state affirmation | 5-state union + typed API + 5-row coverage table |
| 07 | `review-critique` | [`50-review-scorecard.md`](50-review-scorecard.md) | **Two-pass 0-120 scorecard** (25/35/25/20/15) | Pass1 FAIL 46 → Pass2 PASS 99 |
| 08 | `refinement-workflow` | [`60-refinement-log.md`](60-refinement-log.md) | Change log + **targeted diffs** + predicted rescore | 3 diffs map to blockers; loop 1/3 |
| 09 | `anti-patterns-detector` | [`70-anti-patterns.md`](70-anti-patterns.md) | Catalog audit + **4 zero-tolerance** clear | 10→0 violations; 4 blockers clear |
| 10 | `multi-agent-workflow` | [`.agent-handoffs/run-001/`](.agent-handoffs/run-001/) | Orchestration map + **8 append-only handoffs** | 8 handoff files + map + 3 gates PASS |
| — | `a11y-deep-audit` **(plugin)** | [`80-a11y-audit.md`](80-a11y-audit.md) | WCAG 2.1 AA conformance table across **4 layers** | 11 criteria PASS + 1 reduced-motion gap (closed by skill 90) |
| — | `motion-choreography` **(plugin)** | [`90-motion-spec.md`](90-motion-spec.md) | Motion tokens + choreography + **reduced-motion fallback per surface** | 7/7 surfaces guarded; compos-only props |
| — | **Buildable app proof** | [`app/`](app/) | skill component compiles + renders against real stack | `tsc --noEmit` ✅ + `next build` ✅ (see below) |

---

## Folder structure

```text
playground/kanban-board/
├── README.md                          # this file
├── 00-context-loading.md              # Skill 02
├── 01-core-prompt.md                  # Skill 01
├── 10-ux-decision.md                  # Skill 03 (8 sections)
├── 20-ui-blueprint.md                 # Skill 04 (8-layer + 2 prompts)
├── 30-design-system-audit.md          # Skill 05
├── 40-frontend-implementation/        # Skill 06
│   ├── BoardPanel.tsx
│   └── State-Coverage.md
├── 50-review-scorecard.md             # Skill 07 (FAIL → PASS)
├── 60-refinement-log.md               # Skill 08 (3 diffs)
├── 70-anti-patterns.md                # Skill 09 (catalog audit)
├── 80-a11y-audit.md                   # Plugin: a11y-deep-audit (WCAG 2.1 AA)
├── 90-motion-spec.md                  # Plugin: motion-choreography
├── before/                            # the deliberately-broken first draft
│   ├── BoardPage.before.tsx
│   └── NOTES.md
├── .agent-handoffs/run-001/           # Skill 10
│   ├── orchestration-map.md
│   └── 00-context.md … 70-anti-patterns.md  (8 handoffs)
└── app/                               # buildable Next.js app (own package.json)
    ├── package.json                   # isolated — does NOT touch repo-root deps
    ├── tsconfig.json / tailwind.config.ts / next.config.mjs
    ├── app/        (layout.tsx, page.tsx, globals.css — tokens + reduced-motion)
    ├── components/ (board-panel.tsx — working copy w/ motion-reduce guards)
    └── lib/        (utils.ts cn(), mock-data.ts)
```

---

## Pipeline run log

```text
Step 0  Context          → 00-context-loading.md         ✅
Step 1  Core prompt      → 01-core-prompt.md             ✅
Step 2  UX decision      → 10-ux-decision.md             ✅ (8/8 sections)
Step 3  UI blueprint     → 20-ui-blueprint.md            ✅ (8 layers + 2 prompts)
Step 4  Design system    → 30-design-system-audit.md     ✅ GATE (0 violations)
Step 5  Code gen         → BoardPanel.tsx + State-Coverage ✅
Step 6  Review           → 50-review-scorecard.md        ✅ GATE 46 → 99/120
Step 7  Refinement       → 60-refinement-log.md          ✅ (1/3 iterations)
Step 8  Anti-patterns    → 70-anti-patterns.md           ✅ GATE (0 blockers)
Step 9  Orchestration    → .agent-handoffs/run-001/      ✅ (8 handoffs, run COMPLETE)
Step 10 A11y audit       → 80-a11y-audit.md              ✅ PLUGIN (WCAG 2.1 AA, 4 layers)
Step 11 Motion spec      → 90-motion-spec.md             ✅ PLUGIN (7/7 reduced-motion)
Step 12 Buildable app    → app/                          ✅ tsc + next build PASS
```

**Outcome:** the full **12/12** skill chain runs end-to-end — 10 core skills +
2 community plugins — and the produced component compiles into a real Next.js
production build (97.9 kB First Load JS), crossing the 95/120 gate with 3 gates
cleared.

---

## Buildable app (`app/`)

> ⚠️ **Scope note:** The repo root is framework content, not an app
> (`AGENTS.md`). This `app/` sub-folder deliberately has its **own**
> `package.json` so the heavy Next/React/Tailwind dep tree stays isolated and
> never touches the repo-root dependencies or CI. It exists to *prove* the
> skill-produced `BoardPanel.tsx` is real, compilable code — the strongest
> possible test of skill 06.

```bash
cd playground/kanban-board/app
npm install        # isolated dep tree (Next 14.2.35, React 18, Tailwind 3, TS 5)
npm run typecheck  # tsc --noEmit          → PASS (skill component is type-clean)
npm run build      # next build            → PASS (Route /  10.7 kB, 97.9 kB First Load)
npm run dev        # http://localhost:3000 — interactive: toggle 5 states + rollback
```

The dev harness (bottom-right widget) lets you force each lifecycle state and
the rollback branch, so you can see all 5 states + the optimistic-rollback
behavior that skills 03/06/07/08 designed.

---

## Reproduce the verification

```bash
# From repo root — confirm this playground did NOT break the repo gates:
npm run lint            # markdownlint (now includes playground/*.md)
npm run validate-skill  # unchanged — playground adds no skills
npm test                # scaffolder + skills + plugins (snapshots intact)
npm run check-links     # repo-relative links in playground must resolve
```

Expected: all green; the skill/example/plugin snapshot counts are unchanged
because `playground/` is outside their scan paths.
