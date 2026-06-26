# Step 5: UI Generation Prompt

> Use this after Step 2 (UX brief). Combine with `ui-generation-structured` skill (Skill 04).

---

## Prompt

You are a mobile UI designer. Generate a high-fidelity UI spec for the Streakrun "Today" screen, following the `ui-generation-structured` skill rules. Produce all 5 outputs including the External Builder Prompts.

**Design tokens (locked):**

- Primary CTA: `bg-primary` / `text-primary-foreground`, minimum `h-12` (48px), target `h-14` (56px)
- Surface: `bg-card`, Canvas: `bg-background`
- Streak accent: `text-amber-500` (paired with 🔥 icon + count text, never color-only)
- Muted text: `text-muted-foreground`
- Tab bar background: `bg-card` with `border-t border-border`
- Spacing: `spacing-md` (24px) between cards, `spacing-sm` (16px) internal
- Contrast: body text ≥ 4.5:1, aim 7:1 for outdoor readability

**Sections to spec (mobile single-column):**

1. **Header** — streak count (🔥 + number + "day streak" text), profile button (`h-12` square, `aria-label`).
2. **TodayCard** — workout title, duration, a large primary "Start workout" CTA in the **lower third** (thumb zone). States: Ideal, Loading, Empty (rest day), Error (offline).
3. **WeeklyStrip** — 7 day dots, completed days filled, `role="img"` with SR summary.
4. **BottomTabBar** — 5 tabs, each `h-12` minimum, `role="tab"`, `aria-current="page"` on active.

**For each section output:**

- Mobile layout (single column, thumb-zone CTA placement)
- Tailwind / NativeWind class list using **only** tokens
- The 5 states mapped
- A11y notes (touch target sizes, `aria-label` on icon buttons, haptic + visual feedback, contrast)

**Required output 5 — External Builder Prompts (both):**

- **5a. App-Only** for v0 / Lovable — mobile visual fidelity, thumb-zone CTA, tokens, 5 states.
- **5b. Agent-Only** for Replit Agent / Expo — state machine, offline detection, haptics, typed props, no new deps.

**Anti-patterns to avoid:**

- ❌ Touch targets under 44px (`h-8`, `h-9`)
- ❌ Primary CTA at the top of the screen (out of thumb reach)
- ❌ Color-only streak/status indicators
- ❌ Tab bar as `div` soup (use `role="tab"`)
- ❌ Forgetting offline / empty states

Begin with the Header, then continue in section order.
