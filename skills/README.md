<!-- markdownlint-disable -->

# AI Design Engineer Skills

This directory contains portable `SKILL.md` instructions for the AI
Design Engineer workflow. Skills are grouped into category subdirectories and
each one follows the v2.1.0 schema enforced by `npm run validate-skill`.

> The `version` field tracks each **skill content release** (existing skills:
> `2.2.0`; the new Project Design Advisor: `1.0.0`).
> The validator's **schema version** remains `2.1.0`; the root package/product
> version is a third, separate track. These numbers need not match.

## Active Skills (grouped by category)

| Category | Skill | Use When | Main File |
|---|---|---|---|
| **Foundation** | `core-system-prompt` | Establish role, constraints, and baseline rules | [SKILL.md](./foundation/core-system-prompt/SKILL.md) |
| **Foundation** | `prompt-context-loading` | Load project context before work or orchestration | [SKILL.md](./foundation/prompt-context-loading/SKILL.md) |
| **UX** | `project-design-advisor` | Shape ideas, assess design readiness, prepare handoffs and analyze CRs | [SKILL.md](./ux/project-design-advisor/SKILL.md) |
| **UX** | `ux-decision-framework` | Create UX rationale, journeys, IA, and task flows | [SKILL.md](./ux/ux-decision-framework/SKILL.md) |
| **UI** | `ui-generation-structured` | Generate UI prompts and layouts with 8-layer structure | [SKILL.md](./ui/ui-generation-structured/SKILL.md) |
| **UI** | `design-system-governance` | Enforce tokens, component contracts, and consistency | [SKILL.md](./ui/design-system-governance/SKILL.md) |
| **Code** | `code-generation` | Convert approved UI specs into production frontend code | [SKILL.md](./code/code-generation/SKILL.md) |
| **Quality** | `review-critique` | Score visual, UX, accessibility, and engineering quality | [SKILL.md](./quality/review-critique/SKILL.md) |
| **Quality** | `refinement-workflow` | Fix review findings through targeted iterations | [SKILL.md](./quality/refinement-workflow/SKILL.md) |
| **Quality** | `anti-patterns-detector` | Catch recurring AI design and code anti-patterns | [SKILL.md](./quality/anti-patterns-detector/SKILL.md) |
| **Orchestration** | `multi-agent-workflow` | Coordinate Claw-Empire style agent handoffs | [SKILL.md](./orchestration/multi-agent-workflow/SKILL.md) |

## Reference Guides

- [SKILL_MATRIX.md](./SKILL_MATRIX.md): scenario-to-skill routing guide.
- [ANTI_PATTERNS.md](./ANTI_PATTERNS.md): expanded anti-pattern catalog.
- [deprecated/](./deprecated/): archived flat-file skill prompts kept for history.
- [Platform integration guide](../docs/platform-integration-guide.md): path-based usage and discovery limits.
- [Testing skills](../docs/test-skill.md): deterministic checks and behavioral smoke scenarios.
- [Codex UI guide (Thai)](../docs/codex-ui-guide.md): invocation prompts and selection table.

## Quick Start

From an agent with repository file access, use this prompt:

```text
Read AGENTS.md, then skills/foundation/prompt-context-loading/SKILL.md and
skills/foundation/core-system-prompt/SKILL.md. Use skills/INDEX.md to select only
the skill relevant to my task. Read linked references only when needed.
Task: Review the supplied checkout UI and report evidence-backed findings.
```

The categorized `skills/` tree is the canonical source pack. Codex project
discovery uses generated pointers under `.agents/skills/`; each pointer loads
the source in place so references remain intact. The thirteen pointers include
the eleven core skills and two community extensions. Regenerate after adding,
renaming, or changing a skill's discovery metadata:

```bash
npm run skills:codex:register
npm run skills:codex:check
```

In Codex, use `/skills` or explicitly invoke a skill, for example:

```text
Use $review-critique to review the supplied checkout source.
```

If newly registered skills do not appear, start a new session or restart the
host. Registration is project-local; other hosts can still load by path. See
the [integration guide](../docs/platform-integration-guide.md) for details.
For the desktop UI, use the [Thai guide](../docs/codex-ui-guide.md). Generated
`agents/openai.yaml` supplies `AIDE ...` labels and explicit default prompts;
`skills:codex:check` verifies both pointers and UI metadata.
Community extensions live under [plugins/community](../plugins/community/) and
are validated separately; archived skills are not active entrypoints.

## Recommended Flow

1. Start with [prompt-context-loading](./foundation/prompt-context-loading/SKILL.md) when
   project context may affect the task.
2. Load [core-system-prompt](./foundation/core-system-prompt/SKILL.md) to establish the
   operating baseline.
3. Select the task-specific skill from [SKILL_MATRIX.md](./SKILL_MATRIX.md).
4. Run [review-critique](./quality/review-critique/SKILL.md) before shipping UI/code; docs/tooling uses actual repository checks.
5. Use [refinement-workflow](./quality/refinement-workflow/SKILL.md) if scores or
   checklist items fail.
6. Finish with [anti-patterns-detector](./quality/anti-patterns-detector/SKILL.md) for
   recurring failure modes.

## Skill Format Rules (v2.1.0)

Every active `SKILL.md` must include:

- YAML frontmatter with required `name` and `description`, plus optional
  `version`, `author`, `license`, `stack_compat`, and `metadata.hermes`
  (with `tags` and `related_skills` arrays).
- `## Trigger Description`
- `## System Instruction`
- `## Rules & Constraints`
- `## Expected Output Format`
- `## Example Usage (Few-Shot Example)`
- `## Common Pitfalls` (numbered list, 5 items minimum)
- `## Verification Checklist` (checkbox list, 5 items minimum)

Run validation from the repository root:

```bash
npm run validate-skill
npm run validate-plugin
npm run skills:codex:check
npm run test:skills
npm run lint
npm run check-links
```

The previous v2.0.x validator is preserved at
`scripts/validate-skill.legacy.js` for reference.

Validation checks structure, graph references, and local linked resources. It
does not establish generated application behavior, WCAG conformance, or live
agent discovery; run the relevant smoke scenarios in the target environment.
