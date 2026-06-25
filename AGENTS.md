<!-- markdownlint-disable -->
# Repository Guidelines

## Single Source of Truth

`AGENTS.md` is the canonical guide for this repository. Claude Code, Gemini,
and other agents should read this file first. `CLAUDE.md` and `GEMINI.md` are
compatibility entry points only and should not duplicate repository rules.

## Project Overview

This is a documentation and knowledge framework, not an application. It defines
the AI Design Engineer methodology: Idea -> UX -> UI -> Component -> Code ->
Review -> Production. AI provides speed and variations; humans provide product
thinking, UX decisions, architecture, and quality judgment. Content is primarily
Markdown; the only code is Node.js tooling for validation and local preview.

## Project Structure & Module Organization

The numbered directories form the main learning path:

- `01-foundation/`: role definitions, mindset, and anti-patterns.
- `02-prompting-patterns/`: 8-layer prompt architecture and patterns.
- `03-ux-thinking/`: user research, journey maps, and task flows.
- `04-design-system/`: tokens, component contracts, and accessibility.
- `05-ui-generation/`: AI tool templates and quality checklists.
- `06-ai-to-code/`: React, Next.js, TypeScript, Tailwind, and shadcn pipeline.
- `07-review-critique/`: Visual, UX, and Engineering review framework.
- `08-production-patterns/`: production case studies and walkthroughs.

Shared documentation lives in `docs/`; repository orientation files live at the
root. Reusable AI-agent instructions are in `skills/`. Visual page blueprints
are in `assets/` as PNG files. Validation and utility scripts are in `scripts/`.

## Build, Test, and Development Commands

Run these commands from the repository root:

```bash
npm install              # Install markdownlint-cli and serve
npm run lint             # Lint Markdown files
npm run lint:md          # Same Markdown lint task
npm run validate-skill   # Validate all active skills/*/SKILL.md files
npm run docs             # Print the documentation entry point
npm run preview          # Serve the repository locally with npx serve .
```

There is no build, compile, or application test step. On Windows, if the quoted
glob in `npm run lint` prints CLI usage, lint targeted files directly, for
example `npx.cmd markdownlint-cli AGENTS.md`.

## Coding Style & Naming Conventions

Write documentation in Markdown with clear headings, short sections, and
actionable examples. Keep ordered framework directory names, such as
`04-design-system/`. Use kebab-case for new Markdown files and assets, for
example `empty-state-patterns.md` or `checkout-blueprint.png`. Preserve existing
terminology, including the 8-layer prompt architecture and AI Design Engineer
workflow.

The framework is bilingual in places: Thai is common in README and overview
content, while English is common in skill files and technical instructions.
Implementation examples should align with React, Next.js, TypeScript, Tailwind
CSS, and shadcn/ui. Design tokens should follow the JSON export conventions in
`04-design-system/`.

## Skills Directory & Agent Instructions

The `skills/` directory contains standard `skills/<category>/<skill>/SKILL.md` folders for AI
agents acting as Senior Design Engineers. Skills are grouped into six categories:

- `skills/foundation/` — `core-system-prompt`, `prompt-context-loading` (load first)
- `skills/ux/` — `ux-decision-framework`
- `skills/ui/` — `ui-generation-structured`, `design-system-governance`
- `skills/code/` — `code-generation`
- `skills/quality/` — `review-critique`, `refinement-workflow`, `anti-patterns-detector`
- `skills/orchestration/` — `multi-agent-workflow`

`skills/INDEX.md` is the entry-point routing index; `skills/SKILL_MATRIX.md` and
`skills/ANTI_PATTERNS.md` are the expanded reference guides; `skills/deprecated/`
holds the archived flat-file skill prompts.

When creating or editing skill files, follow the v2.1.0 schema enforced by
`scripts/validate-skill.js` (the previous v2.0.x validator is preserved at
`scripts/validate-skill.legacy.js`):

- YAML frontmatter with required `name` and `description`; optional `version`,
  `author`, `license`, `stack_compat`, and a `metadata.hermes` block containing
  `tags` and `related_skills` arrays for skill graph routing.
- Required body sections: `## Trigger Description`, `## System Instruction`,
  `## Rules & Constraints`, `## Expected Output Format`, `## Example Usage
  (Few-Shot Example)`, `## Common Pitfalls`, `## Verification Checklist`.
- Use repo-relative links (e.g., `../../../AGENTS.md`, `../ux/ux-decision-framework/SKILL.md`)
  — never absolute `file:///` paths.

Start context-heavy sessions with `prompt-context-loading`, then load
`core-system-prompt` and select task-specific skills from the index or
`SKILL_MATRIX.md`.

## Key Framework Concepts

Production prompts should follow the 8-layer prompt architecture from
`02-prompting-patterns/`: Product Context, User Context, UX Goal, Visual
Direction, Layout Rules, Component Rules, Interaction Rules, and Technical
Constraints. <!-- Original: Reviews should use the 10-point scoring model in
`07-review-critique/` across Visual, UX, and Engineering dimensions. -->
Reviews should use the 120-point scorecard in
`07-review-critique/` across Visual, UX, Engineering, Performance, and Security dimensions.
Accessibility guidance should target WCAG 2.1 AA where applicable.

## Testing Guidelines

There is no application test suite in this repository. Treat validation as
documentation quality control: run `npm run lint` before submitting Markdown
changes and `npm run validate-skill` when changing any active
`skills/*/SKILL.md` file or related skill conventions. Use `npm run preview`
when reviewing rendered documentation or visual blueprint references.

## Commit & Pull Request Guidelines

Recent history uses concise, imperative commit subjects, with optional
Conventional Commit prefixes such as `feat:`. Follow the same style:
`Add checkout blueprint notes` or `feat: add skill validation examples`. Pull
requests should describe affected modules, summarize documentation or asset
changes, mention validation commands run, and include screenshots when changing
visual blueprint assets.

## Agent-Specific Instructions

When contributing as an agent, prefer small, targeted edits over broad rewrites.
Do not invent runnable app behavior; this repository is primarily framework
content, skills, assets, and validation tooling. Keep changes aligned with the
existing learning path and avoid duplicating guidance across agent-specific
files. If updating `CLAUDE.md` or `GEMINI.md`, keep them as short pointers to
this file.
