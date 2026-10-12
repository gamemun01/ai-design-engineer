# UI Blueprint: Collaborative Kanban Board

> Produced by the **`ui-generation-structured`** skill (Skill 04). Uses the
> 8-layer prompt architecture. Feeds `design-system-governance` (token audit)
> then `code-generation`.

---

## 1. UX & Layout Rationale

A Control-strategy operator tool (per `10-ux-decision.md` Section 4). The
layout optimizes for *spatial stability*: columns never reflow unpredictably,
the card being acted on is the only elevated element, and there is exactly
**one primary CTA** per surface ("+ Add card"). All 5 lifecycle states are
first-class surfaces, not afterthoughts. Touch targets are ≥44px and every
card is keyboard-reachable (drag has a `Shift+Arrow` equivalent).

---

## 2. Component Inventory

| Component | Role | States owned |
| :--- | :--- | :--- |
| `BoardPanel` (root) | Owns board status; renders the correct branch | Branches on 5-state union |
| `BoardLoadingSkeleton` | Shimmer columns while fetching | Loading |
| `BoardEmptyState` | New-board onboarding + "Create column" | Empty |
| `BoardErrorState` | `role="alert"` banner + Retry | Error / rollback |
| `BoardColumn` | Column header + card stack + WIP badge | Ideal |
| `Card` | Title, assignee, due chip; draggable + keyboard-move | Ideal (Partial = dimmed) |
| `CardModal` | Expand card detail (deferred content) | Ideal |
| `ConflictBanner` | Partial-sync "refresh" notice | Partial |

---

## 3. Wireframe Description

**Desktop (≥1024px):** Board title (h1) pinned top-left with a filter input
top-right. Below, a horizontally-scrolling row of columns (`flex gap-4
overflow-x-auto`). Each column is `w-72`, `bg-card`, `rounded-lg`, `p-4`; header
is `h2` with a count badge and a kebab menu (≥44px). Cards stack vertically
(`flex flex-col gap-3`); each card `bg-card`/`rounded-lg`/`p-3`/`shadow-sm`.

**Mobile (<768px):** Single column visible at a time with horizontal snap
(`snap-x`). Column header shows `◀ To Do (5) ▶` to cue swiping. Cards full-width.

**Drag affordance:** dragged card → `shadow-md ring-2 ring-ring`; drop target
column → `bg-success/10`. Keyboard users see the same highlight on focus +
arrows.

---

## 4. HTML / Component Top-Level Outline

```tsx
<main aria-label="Kanban board">
  <h1>{board.title}</h1>
  {/* status branch */}
  {status === 'loading' && <BoardLoadingSkeleton />}
  {status === 'empty'  && <BoardEmptyState onCreate={...} />}
  {status === 'error'  && <BoardErrorState error={err} onRetry={...} />}
  {status === 'partial'&& <ConflictBanner onRefresh={...} />}
  {(status === 'ideal' || status === 'partial') && (
    <section className="flex gap-4 overflow-x-auto" role="list">
      {columns.map(col => <BoardColumn key={col.id} {...col} />)}
    </section>
  )}
</main>
```

---

## 5. External Builder Prompts

### 5a. App-Only Prompt (v0 / Lovable / Bolt.new — visual)

```text
Build a Kanban board UI for a product team. Visual direction:
clean, operator-tool aesthetic, high-contrast, NOT playful.

LAYOUT: horizontally-scrolling columns (4: To Do, Doing, Review, Done),
each w-72, bg-card, rounded-lg, p-4, gap-4 between. Column header = h2
with a count chip and a 44px kebab menu. Cards stack vertically: bg-card,
rounded-lg, p-3, shadow-sm, title text-sm + a circular avatar (28px) and a
small due-date chip (text-xs).

THE BOARD MUST SHOW ALL 5 STATES:
- Loading: 3 skeleton columns with shimmer, aria-busy
- Empty: centered illustration + "Create your first column" button (bg-primary,
  h-11, rounded-md)
- Error: red banner (bg-destructive/10, text-destructive) "Couldn't load board.
  Retry." with a Retry button
- Ideal: columns + cards as above
- Partial: a yellow banner "Eden moved this card — Refresh" + affected card dimmed

CONSTRAINTS: Tailwind only, NO hex colors (use bg-card, bg-primary,
bg-destructive, text-muted-foreground), 8px spacing grid, all touch targets
h-11 (44px), visible focus ring (focus-visible:ring-2 ring-ring), responsive
(mobile = single column with horizontal snap). Dark mode via dark: variants.
```

### 5b. Agent-Only Prompt (Replit Agent / Devin — logic + state + API)

```text
Implement a collaborative Kanban board in Next.js 14 App Router + TypeScript +
Tailwind + shadcn/ui.

STATE MACHINE (discriminated union, never optional status):
type BoardStatus = 'ideal' | 'loading' | 'empty' | 'error' | 'partial'
The root component MUST branch on every value of BoardStatus.

OPTIMISTIC MOVE LOGIC:
- On card drag (or Shift+ArrowRight/Left for keyboard), update local state
  IMMEDIATELY, then PATCH /api/cards/{id} { columnId }.
- 200 OK → persist; show an aria-live="polite" toast "Moved to Doing".
- Network fail / 5xx → ROLLBACK the card to its source column and render the
  Error branch with role="alert", naming the card: "Couldn't move 'Fix login
  bug' — Retry."
- 409 conflict → Partial branch: banner "Eden moved this — Refresh".

TYPED API CONTRACT:
interface Card { id: string; title: string; columnId: string;
  assignee?: { name: string; avatarUrl: string }; due?: string }
interface Board { id: string; title: string; columns: Column[] }

CONSTRAINTS: functional components + hooks only; allowed deps limited to
react, lucide-react, clsx, tailwind-merge, @radix-ui primitives (NO drag
library without explicit approval). Use AbortController on fetch. Cards are
focusable; Enter opens a detail modal; Shift+Arrows move the card. All colors
are tokens (no hex). Touch targets ≥44px. Provide loading.tsx + error.tsx
route shells per Next.js App Router.
```

---

## 6. The 8-Layer Prompt Architecture

| # | Layer | Content |
| :---: | :--- | :--- |
| 1 | **Product Context** | Collaborative Kanban board replacing a spreadsheet; small teams (3-12); ship WIP visibility |
| 2 | **User Context** | Operators wanting control/predictability; mobile + desktop; may have motor/vision needs |
| 3 | **UX Goal** | Move a card to the next column, friction-free, with safe rollback; read WIP at a glance |
| 4 | **Visual Direction** | Clean operator-tool, high-contrast, single accent; characterful but not playful |
| 5 | **Layout Rules** | Horizontal columns (w-72), 8px grid, one primary CTA per surface, all 5 states |
| 6 | **Component Rules** | BoardPanel root + 5-state subcomponents; Card focusable + keyboard-move; modal for detail |
| 7 | **Interaction Rules** | Optimistic move; rollback on fail; Enter opens modal; Shift+Arrows move; focus-visible rings |
| 8 | **Technical Constraints** | Next.js 14 App Router + TS + Tailwind + shadcn/ui; token-only colors; allowed-dep allowlist; ≥44px; WCAG 2.1 AA |

---

## Handoff

This blueprint + the 8-layer table feed `design-system-governance`, which will
audit token adherence and component-contract conformity before `code-generation`
writes `BoardPanel.tsx`.
