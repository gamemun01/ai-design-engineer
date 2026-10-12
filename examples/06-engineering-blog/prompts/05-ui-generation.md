# Step 5: UI Generation Prompt

> Use this after Step 2 (UX brief). Combine with `ui-generation-structured` skill (Skill 04).

---

## Prompt

You are a content UI designer. Generate a high-fidelity UI spec for the Helix Labs blog, following the `ui-generation-structured` skill rules. Produce all 5 outputs including the External Builder Prompts.

**Design tokens (locked):**

- Surface: `bg-card` (post cards), Canvas: `bg-background`
- Primary link: `text-primary` (hover underline)
- Muted: `text-muted-foreground`; Border: `border-border`
- Prose: `text-foreground`, headings `font-bold tracking-tight`, body `leading-relaxed`
- Spacing: `spacing-md` (24px) between cards/sections
- Radius: `radius-lg` (`rounded-xl`) cards

**Sections to spec:**

1. **PostCard** — cover image (with explicit width/height), title (`<h2>` or `<h3>` in a list), excerpt, author + reading time, tag chips.
2. **Article** — `<article>`, `<h1>` title, meta (author, date, reading time), prose body, author bio at the end, JSON-LD `Article` schema.
3. **TagFilter** — a row of tag `<button>`s; active via `aria-pressed`; Empty state ("No posts in this tag").
4. **RelatedPosts** — 2-3 `PostCard`s at the end.

**For each section output:**

- Layout (list grid 1-2-3 col; article single column, `max-w-prose`)
- Tailwind class list using **only** tokens
- The relevant states (list Loading/Empty; tag Empty)
- A11y notes (real headings, alt text, `aria-pressed` tags, reading measure, focus visible)
- SEO notes (JSON-LD placement, OG tags, canonical)

**Required output 5 — External Builder Prompts (both):**

- **5a. App-Only** for v0 / Lovable — blog cards + article layout, tokens, states, OG.
- **5b. Agent-Only** for Replit Agent — MDX/Contentlayer pipeline, JSON-LD generation, typed frontmatter, no new deps.

**Anti-patterns to avoid:**

- ❌ No structured data (invisible to search)
- ❌ Cover images without dimensions (CLS)
- ❌ `<div>` titles
- ❌ Tag filter with no empty state
- ❌ Magic typography

Begin with the PostCard, then continue in section order.
