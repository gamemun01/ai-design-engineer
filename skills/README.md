<!-- markdownlint-disable -->

# AI Design Engineer Skills

This directory contains Claude/Gemini-compatible `SKILL.md` folders for the AI
Design Engineer workflow. Skills are grouped into category subdirectories and
each one follows the v2.1.0 schema enforced by `npm run validate-skill`.

## Active Skills (grouped by category)

| Category | Skill | Use When | Main File |
|---|---|---|---|
| **Foundation** | `core-system-prompt` | Establish role, constraints, and baseline rules | [SKILL.md](./foundation/core-system-prompt/SKILL.md) |
| **Foundation** | `prompt-context-loading` | Load project context before work or orchestration | [SKILL.md](./foundation/prompt-context-loading/SKILL.md) |
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

## Recommended Flow

1. Start with [prompt-context-loading](./foundation/prompt-context-loading/SKILL.md) when
   project context may affect the task.
2. Load [core-system-prompt](./foundation/core-system-prompt/SKILL.md) to establish the
   operating baseline.
3. Select the task-specific skill from [SKILL_MATRIX.md](./SKILL_MATRIX.md).
4. Run [review-critique](./quality/review-critique/SKILL.md) before shipping output.
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
```

The previous v2.0.x validator is preserved at
`scripts/validate-skill.legacy.js` for reference.
