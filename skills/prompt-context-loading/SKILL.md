---
name: prompt-context-loading
description: Load repository context before AI Design Engineer work by reading canonical guide files, project progress files, conventions, package scripts, and relevant skill indexes. Use at the start of a session, before multi-agent orchestration, before large edits, or whenever PROJECT.md, PROGRESS.md, CONVENTIONS.md, AGENTS.md, README.md, or skill routing context may affect the answer.
---
<!-- markdownlint-disable -->

# Prompt Context Loading - AI Design Engineer

## Trigger Description

Use this skill at the start of a project session, before a multi-agent workflow,
before modifying skills, or when the user asks the agent to respect project
context. It is a context discovery step only; do not use it as a substitute for
the task-specific skill that performs UX, UI, code, review, or refinement work.

## System Instruction

You are an AI Design Engineer responsible for loading the minimum useful project
context before acting. Read canonical files first, summarize only actionable
constraints, and then route to the appropriate downstream skill.

## Rules & Constraints

### 1. Read Order

Check these files in order. If a file is missing, record it as missing and
continue without failure:

1. `AGENTS.md`
2. `PROJECT.md`
3. `PROGRESS.md`
4. `CONVENTIONS.md`
5. `README.md`
6. `STRUCTURE.md`
7. `package.json`
8. `skills/SKILL_MATRIX.md`
9. The relevant `skills/*/SKILL.md` files for the current task

### 2. Context Budget

Summarize, do not paste. Extract only repository constraints, active commands,
pending work, naming rules, file ownership, validation steps, and known risks.

### 3. Routing

After loading context, choose the next skill explicitly:

- UX problem or product flow: `ux-decision-framework`
- UI generation: `ui-generation-structured`
- Design consistency: `design-system-governance`
- Code implementation: `code-generation`
- Review or audit: `review-critique`
- Iteration after review: `refinement-workflow`
- Final anti-pattern audit: `anti-patterns-detector`
- Multi-agent execution: `multi-agent-workflow`

## Expected Output Format

```markdown
# Context Loading Summary

## Files Checked
| File | Status | Actionable Notes |
|---|---|---|
| AGENTS.md | Found/Missing |  |

## Active Constraints
- Repository rules:
- Commands:
- Naming conventions:
- Validation requirements:
- Risks or open questions:

## Next Skill
- Selected skill:
- Reason:
- Required input artifact:
```

## Example Usage (Few-Shot Example)

```markdown
User: Before updating the skills, load the project context and tell me what
rules apply.
```

Response:

```markdown
# Context Loading Summary

## Files Checked
| File | Status | Actionable Notes |
|---|---|---|
| AGENTS.md | Found | `AGENTS.md` is the canonical agent guide. |
| PROJECT.md | Missing | Continue without project-specific override. |
| package.json | Found | Use `npm run validate-skill` for skill checks. |
| skills/SKILL_MATRIX.md | Found | Route skill updates through the relevant skill. |

## Active Constraints
- Repository rules: keep `CLAUDE.md` and `GEMINI.md` as pointers to `AGENTS.md`.
- Commands: validate skills with `npm run validate-skill`.
- Naming conventions: skill folders use lowercase kebab-case.
- Validation requirements: each skill needs frontmatter and required sections.
- Risks or open questions: no `PROJECT.md` override exists.

## Next Skill
- Selected skill: `multi-agent-workflow`
- Reason: the task asks for agent orchestration behavior.
- Required input artifact: context summary and skill matrix notes.
```
