# Context Loading Summary

> Produced by the **`prompt-context-loading`** skill (Skill 02). Read order:
> `AGENTS.md` (canonical) → project files → conventions → package scripts →
> `SKILL_MATRIX.md`. Summarized, never pasted. Repo-relative paths only.

---

## Files Checked

| File | Status | Notes (summarized) |
| :--- | :---: | :--- |
| `AGENTS.md` | ✅ Found | Canonical guide. Framework repo, not an app. Node.js tooling only. |
| `CLAUDE.md` / `GEMINI.md` | ✅ Found | Compatibility pointers to `AGENTS.md` — do not duplicate rules there. |
| `README.md` | ✅ Found | Bilingual (TH/EN). Defines the 6-stage workflow + roadmap + plugin section. |
| `PROJECT.md` | ❌ Missing | No project brief exists yet — this `playground/` run IS the project context. |
| `PROGRESS.md` | ❌ Missing | No progress log; this is the first end-to-end run. |
| `CONVENTIONS.md` | ❌ Missing | Conventions live inside `AGENTS.md` instead (kebab-case, numbered dirs, JSON tokens). |
| `package.json` | ✅ Found | Scripts: `lint`, `validate-skill`, `validate-plugin`, `check-links`, `test`, `test:skills`, `test:plugins`, `plugins`. Dev deps: `markdownlint-cli`, `serve`. No build/test app runtime. |
| `skills/INDEX.md` | ✅ Found | Load order: `prompt-context-loading` → `core-system-prompt` → task skill → `review-critique`. JIT sub-profiles to stay under ~18k tokens. |
| `skills/SKILL_MATRIX.md` | ✅ Found | 10 active skills across 6 categories. Canonical Expert Path defined. |
| `skills/ANTI_PATTERNS.md` | ✅ Found | Canonical anti-pattern catalog (20 patterns) consumed by `anti-patterns-detector`. |
| `04-design-system/` | ✅ Found | JSON design-token export conventions; source of truth for tokens. |
| `tests/golden/` | ✅ Found | Snapshot guards for skills/examples/plugins — **must not be perturbed by this run.** |

---

## Active Constraints

**Repo rules (from `AGENTS.md`):**

- This is framework content + tooling, **not an application.** Do not invent runnable app behavior.
- No build/compile step exists; the only "tests" are `validate-skill`, `validate-plugin`, `check-links`, and the golden-snapshot test harness.
- Keep changes aligned with the numbered learning path; do not duplicate guidance across agent-specific files.

**Commands available:**

- `npm run lint` — markdownlint (107 files, Windows-safe batched).
- `npm run validate-skill` / `npm run validate-plugin` — schema validators.
- `npm run check-links` — repo-relative link integrity.
- `npm test` / `npm run test:skills` / `npm run test:plugins`.

**Naming conventions:**

- Kebab-case for new markdown + assets (e.g. `board-panel.tsx`).
- Preserve numbered framework dirs (`04-design-system/`).
- Design tokens follow the JSON export conventions in `04-design-system/`.

**Stack baseline (for code examples):**

- React 18 + Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui.
- 8-layer prompt architecture; 5-state contract (Ideal/Loading/Empty/Error/Partial); WCAG 2.1 AA; ≥44px touch targets; 0-120 scorecard, ship gate ≥95/120.

**Risks for this run:**

- 🔴 Adding files under `examples/` would change the **golden snapshots** and break `test:skills`. → **Mitigation:** all artifacts go in a new `playground/kanban-board/` tree, which is outside the snapshot scan paths.
- 🟡 `check-links` validates repo-relative markdown links — every cross-skill link written here must resolve or the gate fails.
- 🟢 `code-generation` cannot produce a fully buildable app (no runtime). Artifacts are component-level, matching the existing `examples/*/after/components/*.tsx` pattern.

---

## Next Skill

**Selected:** `core-system-prompt` (Skill 01, foundation)

**Reason:** `INDEX.md` hard rule #1 — `prompt-context-loading` + `core-system-prompt` load before any task skill. Context is loaded; the next step is to establish the operating role, the mandatory `<thinking_process>` block, and the design-token baseline **before** touching UX decisions for the Kanban board.

**Required input artifact for the next skill:** This Context Loading Summary (role baseline is established against the constraints documented here).

**Subsequent route (preview):** `core-system-prompt` → `ux-decision-framework` → `ui-generation-structured` → `design-system-governance` → `code-generation` → `review-critique` → `refinement-workflow` → `anti-patterns-detector` → `multi-agent-workflow`.
