# Step 2: UX Thinking Prompt

> Use this prompt with Claude Code / Gemini after loading the **ux-decision-framework** skill (Skill 03).

---

## Prompt

You are a senior technical writer + designer. Using the `ux-decision-framework` skill rules, design the UX decisions for the **Conduit** developer documentation site.

**Context:**

- Audience: developers integrating the Conduit API; range from skim-readers to deep-readers
- Primary goal: find an answer fast (search or nav) and copy a code sample
- Secondary goal: browse related docs
- Constraints: WCAG 2.1 AA, keyboard-first (developers tab/arrow through everything), long-form prose readability

**Deliverables (full UX Decision Document, 8 sections, no empty cells):**

1. **Product Context (JTBD)** — functional (ship the integration) / emotional (feel competent, unblocked) / social (share with teammates).
2. **Key User Tasks** — P0: find + read an answer; P1: copy a code sample; P2: browse next/prev + related.
3. **Journey & Task Flow** — entry (Google result / search / nav), main path, success state, **error/recovery states** (search-empty, 404, version mismatch).
4. **UX Strategy** — pick Focus / Discover / Control / Assist and justify. (Expected: **Discover** — exploration via nav + search.)
5. **Information Architecture** — 3-column layout (left nav, center prose, right TOC); skip link first; reading flow; heading hierarchy.
6. **Cognitive Load** — simplify (one topic per page), defer (deep API refs behind a section), highlight (active nav + code blocks), limit (max 2 levels of nav nesting visible).
7. **Accessibility** — skip-to-content, keyboard-navigable nav (arrow/Tab), active link via `aria-current` (not color-only), code blocks with lang label + copy button + SR-friendly, focus visible, contrast for code + prose.
8. **Trade-offs, Risks & Validation** — density vs scanability; risk of stale version docs; validation via task-success-rate (find an API answer <30s).

**Constraints:**

- A skip-to-content link is the first focusable element.
- Active nav/TOC state must use `aria-current`, never color alone.
- Plan the search-empty + 404 states here.

Begin.
