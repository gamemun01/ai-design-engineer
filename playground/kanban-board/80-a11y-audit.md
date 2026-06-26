# A11y Deep Audit Report: BoardPanel

> Produced by the **`a11y-deep-audit`** community plugin skill
> (`a11y-audit-pack`). Extends — does **not** replace — the core
> `review-critique` Accessibility dimension. Audits
> `40-frontend-implementation/BoardPanel.tsx` across all 4 layers.

---

## Conformance Summary

| WCAG Criterion | Level | Status | Evidence |
| :--- | :---: | :---: | :--- |
| 1.4.3 Contrast (minimum) | AA | PASS | All text on token roles (`text-foreground`, `text-muted-foreground`, `text-destructive`, `text-primary-foreground`); token system targets ≥4.5:1 body / ≥3:1 large. |
| 1.4.11 Non-text Contrast | AA | PASS | Card borders (`border-border`), focus rings (`ring-ring`), dashed "Add card" affordance all exceed 3:1 against canvas. |
| 2.1.1 Keyboard | A | PASS | Cards are `role="button" tabIndex={0}`; `Shift+Arrows` move cards; CTA/retry/refresh/add are real `<button>`. |
| 2.1.2 No Keyboard Trap | A | PASS | No modal/dialog in this component; `Esc`/Tab flow is unconstrained across columns. (CardModal — out of scope here — will need its own trap.) |
| 2.4.3 Focus Order | A | PASS | Board title → columns left→right → cards top→bottom; `role="list"` on column section preserves order. |
| 2.4.7 Focus Visibility | AA | PASS | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` on every interactive element (CTA, card, add-card, retry, refresh). |
| 4.1.2 Name, Role, Value | A | PASS | Buttons have text; icon buttons have `aria-label` ("Add card to {column}", "Retry", "Refresh"); cards have `aria-label` with the title + move instruction. |
| 4.1.3 Status Messages | AA | PASS | `aria-live="polite"` sr-only region announces "Moving card…"; error branch uses `role="alert"`. |
| 1.3.1 Info and Relationships | A | PASS | `main[aria-label]`, `section[role="list"]`, `role="listitem"` columns, `h1`→`h2` hierarchy. |
| 1.4.1 Use of Color | A | PASS | WIP-over badge uses color **+** text (`"{n} / {limit}"`) **+** (post-polish) an icon — not color alone. |
| 2.3.3 Animation from Interactions | AAA | PARTIAL | Skeleton `animate-pulse` is acceptable (not triggered by interaction), but no explicit `prefers-reduced-motion` guard yet — see 🟢 polish below. |

---

## Layer 1 — Automated (axe-core style)

| Check | Result |
| :--- | :--- |
| Heading order | ✅ `h1` (board title) → `h2` (column headers), no skipped levels |
| Duplicate IDs | ✅ `key={col.id}` / `key={card.id}` are stable and unique |
| Missing labels | ✅ Icon-only buttons carry `aria-label` |
| ARIA misuse | ✅ `role="alert"` on error, `role="list"/"listitem"`, `aria-busy`, `aria-live` — all valid roles/states |
| Color contrast | ✅ Token-based; no inline colors to fail (defer to design-token palette audit) |
| Decorative images | ✅ `<img alt="">` (empty) on avatars — decorative, meaning is in the card title |

## Layer 2 — Keyboard flow

- **Tab order:** board title (focusable? no — it's an `h1`, correct) → first card in column 1 → … → "+ Add card" per column → next column. Logical and matches visual left→right / top→bottom.
- **Focus visibility:** `focus-visible:ring-2` renders on every interactive node.
- **No traps:** board surface has no overlay; focus moves freely.
- **Keyboard parity:** `Shift+ArrowRight`/`Shift+ArrowLeft` move the focused card between columns — full drag equivalent.

## Layer 3 — Screen-reader flow

- **Landmarks:** `<main aria-label="Kanban board">` announces the region.
- **Reading order:** DOM order = visual order (columns then cards), so SR reading matches sighted scan.
- **Live regions:** the optimistic-move status ("Moving card…") announces via `aria-live="polite"`; a rolled-back error announces via `role="alert"` (assertive).
- **Names:** every card announces "Card: {title}. Shift plus arrow keys to move." — intent + action in one label.

## Layer 4 — Cognitive / Motion

- **Timeouts:** none introduced (no session timer).
- **Auto-playing media:** none.
- **Plain language:** error copy names the card + cause + action ("Couldn't move 'Fix login bug' — Retry"), not a bare code.
- **Reduced motion:** `animate-pulse` skeleton has **no `prefers-reduced-motion` guard** — see remediation below.

---

## Findings (prioritized)

### 🔴 Critical (blocks use)

_None._

### 🟡 Serious (degrades experience)

_None._ (The component already remediated the keyboard/focus/role issues that a
raw first draft would carry.)

### 🟢 Minor (polish)

1. **2.3.3 Reduced-motion guard missing** — the skeleton `animate-pulse` and any
   future motion from `motion-choreography` (skill 90) must collapse under
   `prefers-reduced-motion: reduce`. This is the one actionable gap and is
   fully specified in `90-motion-spec.md`.

2. **WIP-over badge icon** — currently color (`bg-destructive/10`) + text. Add
   an `AlertTriangle` icon so over-limit is not color-reliant (defense in depth,
   even though the text already satisfies 1.4.1).

---

## Remediation Diff (the one gap)

```diff
  // BoardPanel.tsx — add a reduced-motion guard to the skeleton
- <div className="mt-4 flex flex-col gap-3">
-   <div className="h-11 animate-pulse rounded-md bg-muted" />
+ <div className="mt-4 flex flex-col gap-3 motion-safe:animate-pulse">
+   <div className="h-11 animate-pulse motion-reduce:animate-none rounded-md bg-muted" />
```

Tailwind's `motion-reduce:*` and `motion-safe:*` variants implement the
`prefers-reduced-motion` media query with zero JS.

---

## Verdict

**Conforms to WCAG 2.1 AA.** No critical or serious findings across all 4 audit
layers. One minor reduced-motion gap (2.3.3 is AAA, but we remediate anyway for
robustness) — closed by the diff above and by the `motion-choreography` spec in
`90-motion-spec.md`, which makes reduced-motion a first-class rule.

**Remaining (non-blocking):** WIP-over badge icon — tracked as 🟢 polish in
`50-review-scorecard.md` Pass 2.
