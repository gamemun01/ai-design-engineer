# Example 05: Documentation Site — End-to-End Walkthrough

> **Goal:** Build a developer documentation site for a fictional API product **"Conduit"**. This domain stresses content accessibility — reading flow, skip links, code blocks, sidebar nav, and search — more than visual flash.

## 📋 What you'll build

A docs layout with:

- Skip-to-content link
- Top bar (logo, search, version selector, theme toggle)
- Left sidebar navigation (nested, with active-link highlighting)
- Main content area (prose, headings, code blocks with copy buttons)
- Right "on this page" table of contents
- 404 / search-empty states

## 🎯 Why this example?

Docs sites fail in ways that hurt developers daily:

| Failure mode | Framework fix |
|---|---|
| No skip link, keyboard users tab through the whole nav | Skill 03 (UX) a11y from the start |
| Code blocks are unreadable, no copy button, no lang label | Skill 06 (Code) component contract |
| Sidebar active state is color-only | Skill 09 (Anti-Patterns) zero-tolerance |
| `<div>` headings break the document outline | Skill 07 (Review) semantic markup |
| Search has no empty/error state | Skill 06 (Code) 5-state contract |

## 🚀 Step-by-step (using the framework)

### Step 1: Foundation (Skills 01 + 02)

Load `core-system-prompt` + `prompt-context-loading`. Stack: Next.js 14 (App Router) + MDX + Tailwind + shadcn/ui.

### Step 2: UX Thinking (Skill 03)

Run `prompts/02-ux-thinking.md`. Strategy = **Discover** (exploration via nav + search). Maps the reading flow + the 5 states (incl. search-empty, 404).

### Step 3: UI Generation (Skill 04)

Run `prompts/05-ui-generation.md`. Produces the 3-column docs layout + builder prompts.

### Step 4: Code Generation (Skill 06)

Run `prompts/06-ai-to-code.md`. Produces `after/components/DocsLayout.tsx` + `CodeBlock.tsx`.

### Step 5: Review (Skill 07)

Run `prompts/07-review.md`. See `after/REVIEW.md` — first pass **54/120 (FAIL)**, after refinement **100/120 (PASS)**.

## 📁 Folder structure

```
examples/05-docs-site/
├── README.md
├── prompts/
│   ├── 02-ux-thinking.md
│   ├── 05-ui-generation.md
│   ├── 06-ai-to-code.md
│   └── 07-review.md
├── before/
│   ├── components/
│   │   └── DocsLayout.before.tsx
│   └── NOTES.md
└── after/
    ├── components/
    │   ├── DocsLayout.tsx
    │   └── CodeBlock.tsx
    └── REVIEW.md
```

## 📊 Expected outcome

| Metric | Before (generic AI) | After (framework) |
|---|---|---|
| Skip link | ❌ | ✅ |
| Sidebar active state | color-only | `aria-current="page"` + bar |
| Search states | Ideal only | 5 (incl. empty + error) |
| Code block copy | ❌ | ✅ a11y button |
| Review score (0-120) | ~54 | ~100 |

## 📚 Related

- Skills used: 01, 02, 03, 04, 06, 07, 08, 09
- Total time to reproduce: ~80 minutes
