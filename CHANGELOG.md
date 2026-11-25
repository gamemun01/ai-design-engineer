# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-10-16

### Added

- Project Design Advisor 1.0.0 from the user-supplied Thai adapter: idea discovery,
  design readiness G1–G8, handoff preparation and baseline-aware CR analysis.
  Added a Studio Project Design stage with four starters and selected references,
  a thirteenth native skill entrypoint and separate CC BY 4.0 license notices.

- Skill Studio: a Thai React/TypeScript local app with seven workflow stages,
  canonical skill library, portable Codex prompts, custom text-provider settings,
  Chat Completions/Responses adapters, cancellation, and workspace import/export.
- Real HTTP provider/boundary tests, optional local Postman simulation, standalone
  portable ZIP packaging with per-file hashes/licenses, and a verified optional
  Windows x64 Node runtime. Manual GitHub draft-release workflow and Thai guide.

- Twelve project-local Codex entrypoints in `.agents/skills/`, generated from
  canonical core/community skill metadata without duplicating their bodies.
- Native registration/check commands, eight regression tests for discovery,
  idempotency, stale metadata, and preservation of unmanaged files; documented
  the pending live smoke scenarios and CLI model-access failure.
- Native-pointer verification in the existing skill-validation CI job.
- UI metadata for all twelve skills, a Thai desktop usage guide, and current
  Codex UI discovery/loading evidence with bounded in-session smoke outputs.

### Changed

- Patched existing development-tool transitive dependencies through targeted
  overrides; root and Studio audit results are recorded in Studio validation.

- Corrected remaining review few-shot contradictions: no source-only security
  or performance PASS, explicit runtime evidence in passing examples, consistent
  score arithmetic, and native form activation without duplicate Enter handlers.
- Refreshed all ten core skills and both community skill extensions to content
  release `2.2.0` (schema stays `2.1.0`): concise decision summaries, project-aware
  scope/dependency rules, honest verification statuses, and WCAG 2.2 additions
  while preserving the WCAG 2.1 AA baseline and 120-point UI/code scorecard.
- Added version-aware React 19/App Router/Tailwind v4/shadcn guidance backed by
  official documentation; removed retired model examples and fixed token-budget
  guarantees from current routing docs.
- Corrected malformed nested code fences, dead example actions, stale copied
  props, unnecessary memoization, and duplicate Enter-submit handling. Worked
  examples now state integration requirements and distinguish illustration from
  measured results.
- Strengthened skill validation with directory/name checks, semver/metadata
  checks, graph resolution, real heading checks, and active local-reference
  validation. Added seven regression tests and updated reviewed golden contracts.
- Updated usage/testing guides and separated skill content, schema, and product
  versions. Prior token estimates below describe earlier revisions; current
  profiles use task-based loading without fixed token/latency promises.

- `skills/code/code-generation` v2.2.0: moved full worked templates to
  `references/templates.md` (progressive disclosure, SKILL.md 551→235 lines,
  ~11k→~3.6k tokens); empty-state CTA and per-file Server/Client decision now
  explicit output requirements; clarified focus-style delegation for shadcn/ui
  primitives. Benchmark-driven (2 evals, with/without skill).
- `skills/orchestration/multi-agent-workflow` v2.2.0: moved the four handoff
  JSON schemas and per-agent technical specs to `references/handoff-schemas.md`
  (SKILL.md 384→239 lines, ~4.9k→~3.7k tokens); SKILL.md keeps a required-keys
  contract table per transition; removed pinned dated model defaults in favor of
  `{{ORCHESTRATOR_MODEL}}`/`{{CODER_MODEL}}` guidance.
- `skills/INDEX.md`: token-budget table updated to measured estimates
  (bytes÷4, 2026-07) with methodology note; on-demand `references/*.md` files
  excluded by design.

## [1.1.0] - 2026-06-25

### Added

- `npx create-ai-design-engineer` scaffolder with multi-tool support
- Working example: end-to-end SaaS landing page (before/after)
- Architecture pipeline diagram and hero banner in `assets/`
- `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`
- GitHub Actions CI for markdown lint and link check
- MkDocs documentation site
- Compatibility adapters for Claude Code, Cursor, Windsurf, VSCode

## [1.0.0] - 2026-06-07

### Added

- 8-phase framework: Foundation, Prompting Patterns, UX Thinking, Design System, UI Generation, AI-to-Code, Review & Critique, Production Patterns
- 10 AI-Native skills: prompt-context-loading, core-system-prompt, ux-decision-framework, ui-generation-structured, design-system-governance, code-generation, review-critique, refinement-workflow, anti-patterns-detector, multi-agent-workflow
- Anti-patterns guide (`skills/ANTI_PATTERNS.md`)
- Skill matrix with token budgets (`skills/SKILL_MATRIX.md`)
- Validation and link-check scripts
- Production patterns: enterprise case studies

[1.2.0]: https://github.com/gamemun01/ai-design-engineer/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/gamemun01/ai-design-engineer/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/gamemun01/ai-design-engineer/releases/tag/v1.0.0
