# Step 2: UX Thinking Prompt

> Use this prompt with Claude Code / Gemini after loading the **ux-decision-framework** skill (Skill 03).

---

## Prompt

You are a senior content designer. Using the `ux-decision-framework` skill rules, design the UX decisions for the **Helix Labs** engineering blog.

**Context:**

- Audience: developers, engineering managers, technical recruiters — skim then deep-read
- Primary goal: read an article; secondary: browse by tag/category
- Business goal: SEO + employer brand (recruitment)
- Constraints: WCAG 2.1 AA, fast Lighthouse, structured data for search engines

**Deliverables (full UX Decision Document, 8 sections, no empty cells):**

1. **Product Context (JTBD)** — functional (learn/solve) / emotional (feel informed) / social (share with team).
2. **Key User Tasks** — P0: read an article; P1: browse/filter by tag; P2: share.
3. **Journey & Task Flow** — entry (search engine / social / homepage), main path, success state, **error/recovery states** (no posts for a tag, fetch error, 404).
4. **UX Strategy** — pick Focus / Discover / Control / Assist. (Expected: **Discover** for the list + **Focus** for the article.)
5. **Information Architecture** — post list (cards) → article (prose, author, reading time, related); tag filter; heading hierarchy for SEO + SR.
6. **Cognitive Load** — simplify (one article per page), defer (author bio at the end), highlight (title + reading time), limit (max ~6 tags visible).
7. **Accessibility** — real headings (`<h1>` title), reading measure, image alt text, tag filter as `<button>`/links with `aria-pressed`/`aria-current`, focus visible, contrast.
8. **Trade-offs, Risks & Validation** — SEO weight vs reader experience; risk of thin content; validation via organic traffic + reading time.

**Constraints:**

- Every post needs structured data (JSON-LD `Article`) — plan it here.
- Cover images must have explicit dimensions (no CLS).
- Plan the tag-filter empty state ("No posts in this tag").

Begin.
