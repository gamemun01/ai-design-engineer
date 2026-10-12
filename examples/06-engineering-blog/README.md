# Example 06: Engineering Blog — End-to-End Walkthrough

> **Goal:** Build a content blog for a fictional company **"Helix Labs"** engineering team. This domain stresses SEO, content semantics, and reading rhythm — structured data, article schema, reading time, author, and prose accessibility.

## 📋 What you'll build

A blog with:

- Post list (cards with cover, title, excerpt, author, reading time)
- Article page (structured heading hierarchy, prose, code blocks, author bio)
- Category/tag filtering
- SEO: JSON-LD `Article` schema, Open Graph, canonical URL
- Loading + empty (no posts) + error states

## 🎯 Why this example?

Blogs fail in ways that kill SEO and readability:

| Failure mode | Framework fix |
|---|---|
| No structured data → invisible to search | Skill 06 (Code) + Skill 07 production dimension |
| Cover images without dimensions → CLS | Skill 07 performance dimension |
| `<div>` titles → no heading nav for SR | Skill 09 (Anti-Patterns) |
| Magic typography, no prose rhythm | Skill 04 (tokens) |
| Tag filter is `div` soup, no states | Skill 06 5-state contract |

## 🚀 Step-by-step (using the framework)

### Step 1: Foundation (Skills 01 + 02)

Load `core-system-prompt` + `prompt-context-loading`. Stack: Next.js 14 (App Router) + MDX/Contentlayer + Tailwind + shadcn/ui.

### Step 2: UX Thinking (Skill 03)

Run `prompts/02-ux-thinking.md`. Strategy = **Discover** (browse via tags) + **Focus** (read one article). Maps the 5 states.

### Step 3: UI Generation (Skill 04)

Run `prompts/05-ui-generation.md`. Produces post-list + article layouts + builder prompts.

### Step 4: Code Generation (Skill 06)

Run `prompts/06-ai-to-code.md`. Produces `after/components/PostCard.tsx` + `Article.tsx`.

### Step 5: Review (Skill 07)

Run `prompts/07-review.md`. See `after/REVIEW.md` — first pass **55/120 (FAIL)**, after refinement **102/120 (PASS)**.

## 📁 Folder structure

```
examples/06-engineering-blog/
├── README.md
├── prompts/
│   ├── 02-ux-thinking.md
│   ├── 05-ui-generation.md
│   ├── 06-ai-to-code.md
│   └── 07-review.md
├── before/
│   ├── components/
│   │   └── Blog.before.tsx
│   └── NOTES.md
└── after/
    ├── components/
    │   ├── PostCard.tsx
    │   └── Article.tsx
    └── REVIEW.md
```

## 📊 Expected outcome

| Metric | Before (generic AI) | After (framework) |
|---|---|---|
| Structured data (JSON-LD) | ❌ | ✅ Article schema |
| Cover image dimensions | ❌ (CLS) | ✅ `next/image` |
| Heading hierarchy | `<div>` | `<h1>/<h2>/<h3>` |
| Tag filter states | Ideal only | 5 (incl. empty) |
| Review score (0-120) | ~55 | ~102 |

## 📚 Related

- Skills used: 01, 02, 03, 04, 06, 07, 08, 09
- Total time to reproduce: ~75 minutes
