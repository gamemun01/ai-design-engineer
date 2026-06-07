# Example 01: SaaS Landing Page — End-to-End Walkthrough

> **Goal:** Take a real-world SaaS landing page from idea → production-ready React + Next.js + Tailwind + shadcn/ui code using all 10 skills in the AI Design Engineer framework.

## 📋 What you'll build

A modern B2B SaaS landing page for a fictional product called **"Flowmetric"** — an analytics platform. The page will include:

- Sticky navigation with mobile menu
- Hero section with gradient background
- Social proof / logo bar
- 3-column feature grid
- "How it works" section (3 steps)
- Testimonial cards
- Pricing table (3 tiers)
- FAQ accordion
- Final CTA section
- Footer with multi-column links

## 🎯 Why this example?

This is the most common "first project" for AI-generated design — but it's also where 90% of AI output fails:

| Failure mode | Framework fix |
|---|---|
| Generic Tailwind soup, no design system | Skill 04 (Design System Governance) |
| Hero looks pretty but CTA invisible | Skill 03 (UX Decision Framework) |
| Colors clash, no token discipline | Skill 04 enforces tokens |
| Code doesn't compile or uses wrong API | Skill 06 (Code Generation) + Skill 10 (Anti-Patterns) |
| No accessibility considerations | Skill 07 (Review & Critique) scorecard |
| 5,000-line spaghetti component | Skill 09 (Refinement Workflow) |

## 🚀 Step-by-step (using the framework)

### Step 1: Foundation (Skill 01)
Load `skills/core-system-prompt/SKILL.md` and `skills/prompt-context-loading/SKILL.md` to set up the agent's role and project context.

**Project context to load:**
- Product: Flowmetric — analytics for B2B SaaS
- Target users: Product managers, growth teams
- Brand: trustworthy, modern, data-driven
- Stack: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui

### Step 2: UX Thinking (Skill 03)
Open `prompts/02-ux-thinking.md` and execute it. This produces:
- User journey map
- Information architecture
- Section-by-section content brief

### Step 3: Prompt Engineering (Phase 2)
Use the 8-layer prompt from `02-prompting-patterns/` to translate the UX brief into structured prompts for the UI generation step.

### Step 4: Design System (Skill 05)
Apply the design tokens from `04-design-system/`. For this example we use:
- **Primary:** Indigo 600 (`#4f46e5`)
- **Accent:** Cyan 500 (`#06b6d4`)
- **Neutral:** Slate scale
- **Type:** Inter (body) + Cal Sans (display)
- **Radius:** 0.75rem

### Step 5: UI Generation (Skill 05)
Generate component variations per section.

### Step 6: AI-to-Code (Skill 06)
Convert UI to React/Next.js code using `prompts/06-ai-to-code.md` as the system prompt. Output lives in `after/components/`.

### Step 7: Review (Skill 07)
Run the 0-120 scorecard. See `after/REVIEW.md` for the final score.

### Step 8: Production Patterns (Phase 8)
Apply accessibility, SEO, performance patterns from `08-production-patterns/`.

## 📁 Folder structure

```
examples/01-saas-landing/
├── README.md                    # This file
├── prompts/                     # Prompts used at each step
│   ├── 02-ux-thinking.md
│   ├── 03-prompt-engineering.md
│   ├── 05-ui-generation.md
│   ├── 06-ai-to-code.md
│   └── 07-review.md
├── before/                      # Initial "generic AI" version
│   ├── components/
│   │   └── LandingPage.before.tsx
│   └── NOTES.md
├── after/                       # Framework-improved version
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── LogoBar.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── LandingPage.tsx
│   ├── REVIEW.md                # 0-120 scorecard result
│   └── SCREENSHOTS.md           # Links to rendered output
└── HOW_TO_RUN.md                # Reproduce locally
```

## 🏃 Quick start

```bash
# From repo root
cd examples/01-saas-landing/after
npm install
npm run dev
# Open http://localhost:3000
```

## 📊 Expected outcome

| Metric | Before (generic AI) | After (framework) |
|---|---|---|
| Production-ready? | ❌ Needs rewrite | ✅ Drop-in |
| Accessibility | 4/10 | 9/10 |
| Design consistency | 3/10 | 9/10 |
| Code quality | 4/10 | 9/10 |
| Review score (0-120) | ~45 | ~105 |

## 🔄 Reproduce the workflow

1. Copy `prompts/` into your Claude Code / Cursor / Claude.ai project
2. Execute prompts in order: 02 → 03 → 05 → 06 → 07
3. Compare `before/` vs `after/`
4. Use the scorecard in `after/REVIEW.md` to verify

## 📚 Related

- Skills used: 01, 02, 03, 04, 05, 06, 07, 09, 10
- Production patterns: 08
- Total time to reproduce: ~90 minutes
