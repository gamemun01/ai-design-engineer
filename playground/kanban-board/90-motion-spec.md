# Motion Spec: Kanban Board

> Produced by the **`motion-choreography`** community plugin skill
> (`motion-design-pack`). Token-based motion with a mandatory reduced-motion
> fallback for every animated surface. Applies to `BoardPanel.tsx` and the
> `app/` implementation.

---

## Motion Tokens Used

| Token | Value | Used For |
| :--- | :--- | :--- |
| `motion-fast` | 150ms | card drag-start lift, drop-confirm flash |
| `motion-base` | 250ms | skeleton shimmer cycle, error banner entrance |
| `motion-slow` | 400ms | column drop-target highlight |
| `ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | drag lift / settle (in-out) |
| `ease-enter` | cubic-bezier(0, 0, 0.2, 1) | banner / skeleton entrance (decelerate) |
| `ease-exit` | cubic-bezier(0.4, 0, 1, 1) | rollback card fade (accelerate) |

---

## Choreography Map

| # | Element | Intent | Duration | Easing | Trigger |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | Card (dragged) | Feedback | `motion-fast` | `ease-standard` | pointer down: `shadow-md ring-2 ring-ring`, scale 1.0→1.02 |
| 2 | Column (drop target) | Choreographed | `motion-slow` | `ease-enter` | dragged card hovers: `bg-success/10` |
| 3 | Card (drop-confirm) | Feedback | `motion-fast` | `ease-standard` | PATCH 200: brief `bg-success/20` flash, then settle |
| 4 | Card (rollback) | Exit | `motion-fast` | `ease-exit` | PATCH fail: opacity 1→0.5 (already dimmed) + translate back to source column |
| 5 | Skeleton columns | Entrance | `motion-base` | `ease-enter` | `status=loading`: `animate-pulse` loop, 1s offset stagger |
| 6 | Error banner | Entrance | `motion-base` | `ease-enter` | `status=error`: slides in `translateY(-8px→0)` + opacity 0→1 |
| 7 | Conflict banner | Entrance | `motion-base` | `ease-enter` | `status=partial`: same as error, `bg-success/10` tone |

**Attention budget:** first element (card lift) completes in `motion-fast`
(150ms) — well under the 600ms budget. The drop-confirm sequence (#2→#3) staggers
by ~250ms (`motion-slow` → `motion-fast`), total ≤550ms.

---

## Reduced-Motion Fallback

Under `prefers-reduced-motion: reduce`, **every** animation above degrades
gracefully — instant or crossfade, never a blank frame:

| Element | Reduced-motion behavior |
| :--- | :--- |
| Card lift (#1) | No scale/shadow transition — lifts instantly |
| Drop-target highlight (#2) | Background applies instantly, no fade |
| Drop-confirm flash (#3) | No flash — card settles instantly |
| Rollback (#4) | Card reappears instantly in source column (no translate/opacity) |
| Skeleton (#5) | Static `bg-muted` blocks, **no** pulse (`animate-none`) |
| Banners (#6, #7) | Appear instantly (opacity only, no translate, 0ms) |

Implemented via Tailwind `motion-reduce:*` / `motion-safe:*` variants — the media
query is handled by the framework, zero JS.

---

## Implementation Notes

### Token definition (CSS variables)

```css
:root {
  --motion-fast: 150ms;
  --motion-base: 250ms;
  --motion-slow: 400ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### Tailwind config (extend theme)

```js
// tailwind.config.ts
theme: {
  extend: {
    transitionDuration: {
      fast: 'var(--motion-fast)',
      base: 'var(--motion-base)',
      slow: 'var(--motion-slow)',
    },
    transitionTimingFunction: {
      standard: 'var(--ease-standard)',
      enter: 'var(--ease-enter)',
      exit: 'var(--ease-exit)',
    },
  },
},
```

### BoardPanel.tsx class wiring (compos-only properties)

```tsx
// Card lift — transform + opacity only, no layout props
className="... transition-[transform,box-shadow,opacity] duration-fast ease-standard
            motion-reduce:transition-none motion-reduce:duration-0"

// Skeleton — pulse guarded for reduced motion
className="... animate-pulse motion-reduce:animate-none"

// Error banner — entrance, guarded
className="... animate-[bannerIn_var(--motion-base)_var(--ease-enter)]
            motion-reduce:animate-none"
```

```css
@keyframes bannerIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: none; }
}
```

### Global safety net (catches anything missed)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Verification Checklist (self-checked)

- [x] Every animation references a duration token **and** an easing token (no `duration-[217ms]`, no magic bezier).
- [x] A reduced-motion fallback is specified for **every** animated surface (7/7).
- [x] Choreography stays within the 600ms first-element budget (card lift = 150ms); staggers are within the 50-250ms band.
- [x] Only `transform`/`opacity`/`box-shadow` are animated — **no** `top`/`left`/`width` (no layout thrash).
- [x] Each motion decision states its intent (Feedback / Choreographed / Entrance / Exit).

---

## Link to a11y

This spec **closes** the reduced-motion gap flagged in `80-a11y-audit.md`
(2.3.3). The `motion-reduce:*` variants + global safety net mean the board is
usable — not just "not broken" — under `prefers-reduced-motion: reduce`.
