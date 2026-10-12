# UX Decision Document: Collaborative Kanban Board

> Produced by the **`ux-decision-framework`** skill (Skill 03). All 8 sections
> filled, no empty cells. The 5 lifecycle states are mapped here at the UX
> level (not in code). Feeds `ui-generation-structured`.

---

## 1. Product Context (JTBD)

**Feature:** Board view for a Collaborative Kanban Board (cards in columns,
drag to advance work). **Agent Maturity Level:** Human-driven (this run is a
design/build artifact, not an autonomous agent workspace).

| Dimension | Job To Be Done |
| :--- | :--- |
| **Functional** | When a task is ready, move it to the next column so the team sees live work-in-progress without a standup. |
| **Emotional** | Feel in control and "caught up" — the board is the single source of truth, not a stale spreadsheet. |
| **Social** | Signal to teammates what I'm working on now, so handoffs are visible and nobody duplicates effort. |

---

## 2. Key User Tasks

| Priority | Task | User Intent | Success Signal |
| :---: | :--- | :--- | :--- |
| **P0** | Move a card to the next column | "Advance this task" | Card lands in target column; others see it without reload |
| **P0** | Read board at a glance | "What's in progress?" | WIP per column visible in <1s; columns ordered left→right |
| **P1** | Recover from a failed move (sync error) | "My drag didn't stick" | Error shown on the card; Retry restores it; nothing lost |
| **P1** | Add a new card | "Capture a task quickly" | Card appears in chosen column; title editable inline |
| **P2** | Filter/search cards | "Find MY cards" | Board dims non-matches; match count shown |
| **P2** | Reorder cards within a column | "Prioritize top of list" | Drag reorders locally; persists without flicker |

---

## 3. Journey & Task Flow

**Entry point:** User opens `/board/[id]` from a dashboard link or shared URL.

```
Open board
  └─ [loading] skeleton columns render
      └─ board data resolves
          ├─ [empty] no columns?  → Empty State: "Create your first column"
          ├─ [error] sync failed? → Error State: "Couldn't load board" + Retry
          └─ [ideal] columns + cards render
              └─ user drags card → column B
                  ├─ optimistic: card jumps to B immediately
                  └─ PATCH /api/cards/{id}
                      ├─ 200 OK → persist (drop-confirm flash)
                      ├─ network fail / 5xx → [error] rollback card to A + inline Retry
                      └─ 409 conflict → [partial] card stays, banner: "Eden moved this — refresh"
```

**All error/recovery states:** failed load, failed move (rollback + retry),
permission denied (read-only banner), conflict (stale data, partial-sync).

---

## 4. UX Strategy & Justification

**Chosen strategy: Control.**

A Kanban board is an *operator tool* — users want predictable, controllable,
information-dense control over work items, not discovery or surprise. Control
strategy optimizes for: explicit actions, stable spatial layout, undoable
operations, and visibility of system state.

**Intentionally excluded (this quarter):**

- Discovery features (AI-suggested moves, "smart" auto-archiving) — would
  violate the Control contract by moving things the user didn't move.
- Gamification (confetti, streaks) — distracts from the work-tracking job.
- Gantt/timeline view — separate surface, deferred to avoid scope creep.

---

## 5. Information Architecture Rules & Wireframing

**Visual hierarchy:** Board title (h1) → Column headers (h2, left→right flow)
→ Card title (text-sm) → Card metadata (text-xs muted).

**Navigation model:** Single board surface. No nested nav; columns scroll
horizontally, cards scroll vertically within a column.

**Grouping rules:** One card belongs to exactly one column (enforced). Columns
are ordered by workflow stage; WIP-limit badges appear when configured.

**Progressive disclosure:** Card shows title + assignee avatar + due chip.
Description/checklist expand on card open (modal), not on the board.

**Low-fi wireframe:**

```
MOBILE (single-column focus, horizontal snap)
┌─────────────────────┐
│ ☰  Sprint 24        │  h1 board title
├─────────────────────┤
│ ◀ TO DO (5)   ▶    │  column header, swipeable
│ ┌─────────────────┐ │
│ │ Fix login bug   │ │  card
│ │ 👤  · Fri       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ | ...              │ │
└─────────────────────┘

DESKTOP (multi-column, horizontal scroll)
┌──────────┬──────────┬──────────┬──────────┐
│ TO DO 5  │ DOING 3  │ REVIEW 2 │ DONE 12  │  h2 headers
│ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │
│ │ card │ │ │ card │ │ │ card │ │ │ card │ │
│ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │
└──────────┴──────────┴──────────┴──────────┘
```

---

## 6. Cognitive Load Decisions

| Technique | Application |
| :--- | :--- |
| **Simplify** | One primary action per card surface (the move). No inline editing of 5 fields on the board. |
| **Defer** | Description, checklist, comments live behind a card-open modal, not on the board. |
| **Highlight** | The card being dragged gets `shadow-md` + `ring`; drop targets get `bg-success/10`. |
| **Limit** | Show max 8 cards per column before "show N more"; prevents an overwhelming wall. |

---

## 7. Accessibility & Inclusive Design

- **Focus order:** board title → column headers (left→right) → cards within
  each column (top→bottom); a single Tab reaches every interactive card.
- **No color-only signifiers:** column state (WIP over-limit) uses a badge with
  text + icon, not a red border alone.
- **Touch targets:** every card, "+Add card", and column menu is ≥44×44px
  (`h-11`).
- **Descriptive errors:** "Couldn't move 'Fix login bug' to Doing — network
  failed. Retry." (names the card + cause + action), never a bare "Error".
- **Keyboard behavior:** cards are focusable; `Enter` opens the card modal,
  `Shift+ArrowRight/Left` moves the focused card to the next/previous column
  (drag-equivalent for keyboard users).
- **Screen reader labels:** `aria-label` on icon-only buttons ("Add card to To
  Do"); `aria-live="polite"` on the "Moved to Doing" toast; `role="alert"` on
  the error/rollback banner.
- **Contrast targets:** muted metadata ≥4.5:1; the single primary CTA ≥4.5:1.

---

## 8. Trade-offs, Risks & Validation

**Key trade-off — Optimistic UI vs. correctness:** We move the card instantly
(optimistic) to feel fast, accepting the risk of a rollback flash. **Chosen:**
optimistic, because the Control strategy prioritizes *felt* responsiveness and
rollbacks are recoverable. **Deferred:** a pessimistic "spinner on card" mode
could be a future setting for high-conflict boards.

| Risk | Mitigation |
| :--- | :--- |
| Double-tap submits two moves | Debounce PATCH; idempotent move op keyed by card id + target column |
| Stale board (teammate moved a card) | Conflict → Partial state with "refresh" banner, not silent overwrite |
| Drag accessibility gap | Provide keyboard move (`Shift+Arrows`) as a first-class path, not an afterthought |
| Overwhelming columns | WIP badges + "show N more" collapse (Section 6) |

**Validation methods:** (1) task-success rate for "move a card" ≥95% in a
moderated test; (2) rollback-to-recovery <3s observed in a flaky-network
sim; (3) axe-core 0 serious a11y violations on the board surface.

---

## 5-State Mapping (UX level — carried into UI/code)

| State | Trigger | Board shows |
| :--- | :--- | :--- |
| **Ideal** | ≥1 column with cards | Columns + cards, normal interaction |
| **Loading** | First fetch in flight | Skeleton columns with shimmer |
| **Empty** | 0 columns (new board) | Illustration + "Create your first column" CTA |
| **Error** | Load failed / move rollback | `role="alert"` banner naming the card + Retry |
| **Partial** | Some columns synced, conflict pending | Banner: "Eden moved this — refresh"; affected card dimmed |
