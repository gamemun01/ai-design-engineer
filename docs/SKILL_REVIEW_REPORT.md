<!-- markdownlint-disable -->

# Skill Pack Review Report — AI Design Engineer

## Readiness Update — 2026-10-08

**Codex UI: VERIFIED for native discovery (12) and canonical loading (three
task skills) in the current chat.** Bounded in-session routing/review outputs
are recorded in [UI smoke results](codex-ui-smoke-results.md); they are not an
independent evaluation of all skills. See the [Thai UI guide](codex-ui-guide.md).
Independent CLI behavior remains NOT VERIFIED after model-access errors.

Reviewed and updated ten core skills plus the two community extensions, keeping
the existing work-in-progress reference extraction and router validation.
Skill content release is now `2.2.0`; the repository schema stays `2.1.0`.
The earlier 2026-06-25 report below is historical and its versioning notes are
superseded by this update.

| Finding | Correction |
|---|---|
| Mandatory hidden-thinking output in the baseline and examples | Short decision summaries; examples explicitly illustrative |
| Old model IDs, inconsistent fixed budgets, and UI layers renamed from the canonical framework | Task-based profiles, configured-model preservation, canonical eight-layer names |
| React 18/Tailwind v3-only defaults and v4-beta links | Version-aware React 18/19, App Router, Tailwind v3/v4 and shadcn integration reference; no automatic migration |
| Source/screenshot reviews could claim production PASS without runtime evidence | PASS/FAIL/NOT VERIFIED/N/A with evidence, applicability, and bounded scores; docs use real validators |
| TypeScript types and keyword filters described as security guarantees | Runtime trust-boundary validation, server authorization, scoped tools, and no automatic exception approval |
| Inaccurate radius mappings, forced brand changes, universal empty-state CTAs | Actual project tokens/brand and applicable working recovery actions |
| Malformed nested fences hid required headings | Correct outer fence lengths and regression checks that ignore example headings |
| Stale copied props, no-op CTA, unnecessary memoization, duplicate Enter handling | Updated adaptable templates and targeted examples; native button activation |
| WCAG target-size and motion criterion levels conflated | WCAG 2.1 AA baseline retained, WCAG 2.2 additions documented, 44px preference distinguished from AA minimum, AAA motion criterion corrected |
| Structural validator missed missing references and bad routing metadata | Real headings, directory/name agreement, unique names, semver, related-skill resolution, and active local links checked |

Validation completed:

- `npm run validate-skill`: PASS, all ten core skills.
- `npm run validate-plugin`: PASS, both community extensions.
- `npm test`: PASS, 127 checks (7 scaffolder, 7 integrity regression,
  8 Codex registration, 82 skill/example, 23 plugin).
- `npm run lint`: PASS.
- `npm run check-links`: PASS.
- `git diff --check`: PASS.

The initial skill tests failed on four existing snapshot differences; the
reviewed content release and contract counts were regenerated, then ordinary
tests passed. The new heading check also exposed malformed example fences in
governance/review; both were repaired before final validation.

Ready for path-based and project-local Codex use through
[skills/README.md](../skills/README.md). Registration and live attempt details
are below; see [platform integration](platform-integration-guide.md) and
[behavioral scenarios](test-skill.md#behavioral-smoke-scenarios). Templates still
require target-app imports/adapters/payment integration and runtime validation.
The frontmatter validator supports the repo's simple YAML subset, not arbitrary
YAML; local link checks do not validate remote availability or anchor targets.

### Native Codex Follow-Up — 2026-10-08

- Installed twelve generated pointers in `.agents/skills/`: ten core skills
  and two community extensions. Native metadata has only `name`/`description`;
  bodies load canonical repo sources with preserved relative references.
- `npm run skills:codex:check`: PASS, twelve current pointers and their links.
- Full YAML parsing with the already-installed `js-yaml`: PASS for twelve
  native frontmatter blocks. This is not a successful model execution test.
- Added eight isolated registration regression tests and a native-pointer CI
  check. Registration refuses unmanaged-file overwrites and symlink redirects;
  updating metadata is repeatable without duplicating canonical bodies.
- Installed UI metadata for twelve skills: readable `AIDE ...` display names,
  25–64 character descriptions, and default prompts explicitly naming the skill.
  Full YAML parsing and registration checks pass; UI rendering/clicks were not
  inspected visually.
- Local checks: all 127 test checks passed; core/community validation, lint,
  and all 147 Markdown files' local link checks passed.
- Installed CLI `0.147.0` reports ChatGPT login. An attempted ephemeral,
  read-only source-review run exited `1` with `turn.failed`: the service returned
  HTTP 400, `The 'gpt-6.1-sol' model is not supported when using Codex with a
  ChatGPT account.` No model answer or evidence of canonical-body loading was
  produced. This records this client's result, not universal model availability.
- Startup also reported incompatible cached model metadata and shortened skill
  descriptions. Saved model settings, plugins, and caches were not modified.
- Automatic approval review rejected the separate context/discovery run because
  disclosure of private repo files to the model service was insufficiently
  scoped. The user later approved the concrete scope in
  [codex-live-smoke.md](codex-live-smoke.md). Two subsequent authorized
  `gpt-6-luna` runs both exited `1` with HTTP 400 and no answer; no further
  approval rejection occurred. Raw CLI evidence is saved outside the repo.
- The current Codex UI chat's Available skills catalog exposes all twelve
  native entrypoints. The agent read context/review/a11y pointers and canonical
  bodies and produced the bounded outputs in [UI results](codex-ui-smoke-results.md).
  This uses the current session, not an independent fresh model pass.
- During the source-review smoke, contradictory few-shot examples were corrected:
  source-only security/performance stay unverified, passing examples explicitly
  assume supplied runtime evidence, score arithmetic is consistent, and native
  form activation is used without duplicate Enter handlers.

**UI discovery/loading: VERIFIED. Independent CLI behavior: NOT VERIFIED.**
Native entrypoints and UI metadata are installed; use the UI guide to invoke
them in this project. Full application runtime, WCAG conformance, and untested
skill behavior are not covered by the in-session smoke.

Primary sources checked on 2026-10-08:

- [React versions](https://react.dev/versions) and
  [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).
- [Next.js server/client boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components),
  [error handling](https://nextjs.org/docs/app/getting-started/error-handling),
  and [version 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16).
- [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide),
  [theme variables](https://tailwindcss.com/docs/theme), and
  [shadcn Tailwind v4 guidance](https://ui.shadcn.com/docs/tailwind-v4).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and
  [target-size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- [OpenAI skill discovery](https://learn.chatgpt.com/docs/build-skills),
  [non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode),
  and [model availability](https://learn.chatgpt.com/docs/models).

## Historical Review — 2026-06-25

**Date:** 2026-06-25
**Scope:** All 10 active `SKILL.md` files plus supporting routing docs, versioning, and validation tooling.
**Validation baseline:** `npm run validate-skill`, `npm run check-links`, `npm run lint` — all green before and after this review.

## TL;DR

- The skill pack was already schema-compliant (all 10 skills passed `validate-skill` at v2.1.0 and all links resolved).
- This review found and fixed **correctness bugs, schema inconsistencies, version confusion, broken/stale paths, and a Windows lint script bug** that the validator does not catch (it only enforces structure, not content or links).
- Final state: `validate-skill` ✅, `check-links` ✅ (67 files), `lint` ✅ (67 files).

---

## Findings & Actions

### 🔴 Level 1 — Correctness (fixed)

| # | Issue | Location | Fix |
|---|---|---|---|
| 1.1 | Contradictory UX strategy names — the body defines **Focus / Discover / Control / Assist**, but `Common Pitfalls #2` and the `Verification Checklist` used **Assist / Automate / Augment / Empower** (a stale set that exists nowhere else in the file). | `skills/ux/ux-decision-framework/SKILL.md` | Aligned both references to the canonical **Focus / Discover / Control / Assist** set. |
| 1.2 | Broken relative path in prose — `` `../ANTI_PATTERNS.md` `` resolves to a nonexistent file, while the Markdown link one section below correctly uses `../../ANTI_PATTERNS.md`. | `skills/quality/anti-patterns-detector/SKILL.md` (Trigger Description) | Corrected to `` `../../ANTI_PATTERNS.md` ``. |

### 🟠 Level 2 — Schema / Version consistency (fixed)

| # | Issue | Location | Fix |
|---|---|---|---|
| 2.1 | `stack_compat` was the only array field stored as a quoted JSON string (`'["..."]'`) while all other array fields use YAML flow arrays. | `skills/code/code-generation/SKILL.md` | Converted to YAML flow array `[tailwind@3.x, shadcn@2.x, react@18.x]`. |
| 2.2 | `stack_compat` existed only on `code-generation`; the other stack-bound skills had none, making the schema inconsistent. | `skills/ui/ui-generation-structured/SKILL.md`, `skills/ui/design-system-governance/SKILL.md` | Added `stack_compat` arrays (`[react, typescript, tailwind, shadcn/ui]` and `[tailwind, shadcn/ui, design-tokens]`). Stack-agnostic skills (UX, quality, orchestration, foundation) intentionally left without it. |
| 2.3 | `"npm/nuget libraries"` — "nuget" is out of place for a React/TypeScript stack (copy-paste artifact). | `skills/code/code-generation/SKILL.md` | Changed to `"npm libraries"`. |
| 2.4 | The Sequential Progression Gate referenced an **"Accessibility Agent"** role that does not exist in the agent-roles table (the table defines a combined **"Review & Safety Agent"**). | `skills/orchestration/multi-agent-workflow/SKILL.md` | Merged step 4 into step 3, routing WCAG 2.1 AA confirmation through the existing Review & Safety Agent. |
| 2.5a | Version drift: `package.json`/README badge = `1.1.0`, but `CHANGELOG.md` last release = `1.0.0` (1.1.0 work sat under `[Unreleased]`). | `CHANGELOG.md` | Released `[1.1.0] - 2026-06-25`, added the `v1.0.0...v1.1.0` compare link, and left a fresh empty `[Unreleased]`. No git tag was created. |
| 2.5b | Version-number collision: skills declare `version: 2.1.0` (schema), but the README roadmap also lists `v2.1.0` as an unreleased **product** milestone — same number, different meaning, no disambiguation. | `README.md`, `skills/README.md` | Added a versioning note in both files clarifying that skill `version` is the **skill schema version** and is unrelated to the package/product version. |

### 🟡 Level 3 — Cleanup (fixed)

| # | Issue | Location | Fix |
|---|---|---|---|
| 3.1 | Stale flat skill paths (`review-critique/SKILL.md`) that do not match the category-nested layout (`quality/review-critique/SKILL.md`). | `skills/ANTI_PATTERNS.md` (fix lines + prevention checklist) | Rewrote all references to category-qualified paths. |
| 3.2 | Same stale flat paths in docs/examples. | `docs/platform-integration-guide.md`, `docs/test-skill.md`, `examples/01-saas-landing/README.md` | Rewrote to category-qualified paths. |
| 3.3 | Malformed "Read Order" pseudo-table (every line started with `|` but there was no header/separator, and the prose list was duplicated above it). | `skills/foundation/prompt-context-loading/SKILL.md` | Converted to a clean 10-item ordered list; no duplicate. |
| 3.4 | `npm run lint` printed only markdownlint usage on Windows because npm strips the quoted `**/*.md` glob, so markdownlint received zero files. | `package.json` (`lint:md`), `AGENTS.md` Windows note | Added cross-platform wrapper `scripts/lint-all.js` that discovers files via Node (mirroring `check-links.js`) and passes an explicit list to markdownlint; pointed `lint:md` at it and updated the AGENTS.md note. |

---

## Intentionally NOT changed (with rationale)

| Item | Where | Why left as-is |
|---|---|---|
| `file:///D:/...` absolute paths in archived files | `skills/deprecated/*` (10 files) | These are historical archive redirects. Editing them could be mistaken for reviving the legacy flat layout. They are skipped by both `validate-skill.js` and `check-links.js`. |
| Codenames **"Angel Spec" / "Bliss Spec"** as section headers | `skills/code/code-generation/SKILL.md` §7–8 | They are internal section labels referenced only within the same file; not load-bearing for behavior. Flagged here for awareness. |
| **"PRESERVED FOR HISTORY"** comment blocks (including the stale `codex` adapter table) | `skills/orchestration/multi-agent-workflow/SKILL.md`, others | Required by the repo's Rule #1 (preserve history in comments). The active tables below them are internally consistent (`gemini`). |
| Off-by-one typography token → utility mapping (`text-md`→`text-lg`) | `skills/ui/design-system-governance/SKILL.md` | The shift is documented explicitly in the table; changing it would alter the intended token semantics. |
| Missing YAML frontmatter on `SKILL_MATRIX.md` and `ANTI_PATTERNS.md` | `skills/` | `validate-skill.js` only checks files named `SKILL.md`, so these are out of schema scope by design. |

---

## Validation results (post-fix)

```
npm run validate-skill   → PASSED (10/10 skills, v2.1.0 schema)
npm run check-links      → PASSED (67 markdown files, 0 broken links)
npm run lint             → PASSED (67 markdown files, 0 issues)
```

## Files changed

- `skills/ux/ux-decision-framework/SKILL.md`
- `skills/quality/anti-patterns-detector/SKILL.md`
- `skills/code/code-generation/SKILL.md`
- `skills/ui/ui-generation-structured/SKILL.md`
- `skills/ui/design-system-governance/SKILL.md`
- `skills/orchestration/multi-agent-workflow/SKILL.md`
- `skills/foundation/prompt-context-loading/SKILL.md`
- `skills/ANTI_PATTERNS.md`
- `skills/README.md`
- `docs/platform-integration-guide.md`
- `docs/test-skill.md`
- `examples/01-saas-landing/README.md`
- `README.md`
- `CHANGELOG.md`
- `AGENTS.md`
- `package.json`
- `scripts/lint-all.js` (new)

## Recommendation for follow-up (not done in this pass)

- Decide whether to **git tag `v1.1.0`** and push (the CHANGELOG entry is ready; no tag was created per scope).
- Consider collapsing the duplicated 20-pattern catalog between `anti-patterns-detector/SKILL.md` and `ANTI_PATTERNS.md` into a single source to remove the drift risk (the detector already instructs readers to load the file for broad coverage).
- Optionally modernize the hardcoded model strings (`claude-3-5-sonnet-latest`, `gemini-1.5-pro`) in `multi-agent-workflow/SKILL.md` and `SKILL_MATRIX.md` — these are recommendations, not errors.
