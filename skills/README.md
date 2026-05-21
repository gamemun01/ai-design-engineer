<!-- markdownlint-disable -->

# AI Design Engineer Skills

<!-- Original: This directory contains Claude/Codex-compatible `SKILL.md` folders for the AI -->
This directory contains Claude/Gemini-compatible `SKILL.md` folders for the AI
Design Engineer workflow. Each active skill lives in `skills/<skill-name>/` and
starts with standard YAML frontmatter containing only `name` and `description`.

## Active Skills

| Skill | Use When | Main File |
|---|---|---|
| `prompt-context-loading` | Load project context before work or orchestration | [SKILL.md](./prompt-context-loading/SKILL.md) |
| `core-system-prompt` | Establish role, constraints, and baseline rules | [SKILL.md](./core-system-prompt/SKILL.md) |
| `ux-decision-framework` | Create UX rationale, journeys, IA, and task flows | [SKILL.md](./ux-decision-framework/SKILL.md) |
| `ui-generation-structured` | Generate UI prompts and layouts with 8-layer structure | [SKILL.md](./ui-generation-structured/SKILL.md) |
| `design-system-governance` | Enforce tokens, component contracts, and consistency | [SKILL.md](./design-system-governance/SKILL.md) |
| `code-generation` | Convert approved UI specs into production frontend code | [SKILL.md](./code-generation/SKILL.md) |
| `review-critique` | Score visual, UX, accessibility, and engineering quality | [SKILL.md](./review-critique/SKILL.md) |
| `refinement-workflow` | Fix review findings through targeted iterations | [SKILL.md](./refinement-workflow/SKILL.md) |
| `anti-patterns-detector` | Catch recurring AI design and code anti-patterns | [SKILL.md](./anti-patterns-detector/SKILL.md) |
| `multi-agent-workflow` | Coordinate Claw-Empire style agent handoffs | [SKILL.md](./multi-agent-workflow/SKILL.md) |

## Reference Guides

- [SKILL_MATRIX.md](./SKILL_MATRIX.md): scenario-to-skill routing guide.
- [ANTI_PATTERNS.md](./ANTI_PATTERNS.md): expanded anti-pattern catalog.
- [deprecated/](./deprecated/): archived flat-file skill prompts kept for history.

## Recommended Flow

1. Start with [prompt-context-loading](./prompt-context-loading/SKILL.md) when
   project context may affect the task.
2. Load [core-system-prompt](./core-system-prompt/SKILL.md) to establish the
   operating baseline.
3. Select the task-specific skill from [SKILL_MATRIX.md](./SKILL_MATRIX.md).
4. Run [review-critique](./review-critique/SKILL.md) before shipping output.
5. Use [refinement-workflow](./refinement-workflow/SKILL.md) if scores or
   checklist items fail.
6. Finish with [anti-patterns-detector](./anti-patterns-detector/SKILL.md) for
   recurring failure modes.

## Skill Format Rules

Every active `SKILL.md` must include:

- YAML frontmatter with only `name` and `description`.
- `## Trigger Description`
- `## System Instruction`
- `## Rules & Constraints`
- `## Expected Output Format`
- `## Example Usage (Few-Shot Example)`

Run validation from the repository root:

```bash
npm run validate-skill
```
