# Step 5: UI Generation Prompt

> Use this after Step 2 (UX brief). Combine with `ui-generation-structured` skill (Skill 04).

---

## Prompt

You are a documentation UI designer. Generate a high-fidelity UI spec for the Conduit docs site, following the `ui-generation-structured` skill rules. Produce all 5 outputs including the External Builder Prompts.

**Design tokens (locked):**

- Surface: `bg-card` (sidebars, code blocks), Canvas: `bg-background`
- Active nav: `text-primary` + a left `border-primary` bar, **plus** `aria-current="page"`
- Code block bg: `bg-muted` / `bg-zinc-950` in dark mode
- Muted text: `text-muted-foreground`; Border: `border-border`
- Prose: `text-foreground`, headings `font-bold tracking-tight`
- Spacing: `spacing-md` (24px) between sections, `spacing-sm` (16px) internal
- Radius: `radius-md` (`rounded-lg`) code blocks

**Sections to spec:**

1. **SkipLink** — first focusable; "Skip to content"; visually hidden until focused.
2. **TopBar** — logo, search input (with states), version `<select>`, theme toggle (`aria-label`).
3. **SidebarNav** — nested links, active item with `aria-current="page"` + left bar (not color-only), keyboard navigable.
4. **ProseContent** — heading hierarchy (one `<h1>`, `<h2>` sections, `<h3>` sub), readable measure (`max-w-prose`), code blocks via `CodeBlock`.
5. **RightToc** — "On this page", anchor links, active section via `aria-current`.
6. **CodeBlock** — lang label, copy button (`aria-label`, `aria-live` "Copied"), scrollable horizontally, never overflows the viewport.

**For each section output:**

- Layout (3-column desktop → stacks on mobile)
- Tailwind class list using **only** tokens
- The relevant states (search Loading/Empty/Error; 404)
- A11y notes (skip link, `aria-current`, keyboard nav, copy-button SR feedback, focus visible)

**Required output 5 — External Builder Prompts (both):**

- **5a. App-Only** for v0 / Lovable — 3-column docs layout, prose, code blocks, tokens, states.
- **5b. Agent-Only** for Replit Agent — MDX pipeline, search index, typed nav config, copy-to-clipboard, no new deps.

**Anti-patterns to avoid:**

- ❌ Color-only active nav/TOC state
- ❌ No skip link
- ❌ `<div>` headings (breaks document outline)
- ❌ Code block with no copy button or no lang label
- ❌ Search with no empty/error state

Begin with the SkipLink + TopBar, then continue in section order.
