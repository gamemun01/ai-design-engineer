<!-- markdownlint-disable -->

# Skill Pack Review Report — AI Design Engineer

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
