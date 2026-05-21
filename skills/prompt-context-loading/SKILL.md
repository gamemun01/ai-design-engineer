---
name: prompt-context-loading
description: Load repository context before AI Design Engineer work by reading canonical guide files, project progress files, conventions, package scripts, and relevant skill indexes. Use at the start of a session, before multi-agent orchestration, before large edits, or whenever PROJECT.md, PROGRESS.md, CONVENTIONS.md, AGENTS.md, README.md, or skill routing context may affect the answer.
version: "2.1.0"
stack_compat: '["tailwind@3.x", "shadcn@2.x", "react@18.x"]'
last_reviewed: "2026-05"
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
<!-- Original read order commented out to preserve history (Rule #1)
Check these files in order. If a file is missing, record it as missing and
continue without failure:

1. [AGENTS.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/AGENTS.md)
2. `PROJECT.md` (if present in the repository root)
3. `PROGRESS.md` (if present in the repository root)
4. `CONVENTIONS.md` (if present in the repository root)
5. [README.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/README.md)
6. [STRUCTURE.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/STRUCTURE.md)
7. [package.json](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/package.json)
8. [SKILL_MATRIX.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/SKILL_MATRIX.md)
9. The relevant [SKILL.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills) files for the active task
-->
Check these files in order. If a file is missing, record it as missing and
continue without failure:

1. [AGENTS.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/AGENTS.md)
2. `PROJECT.md` (if present in the repository root)
3. `PROGRESS.md` (if present in the repository root)
4. `CONVENTIONS.md` (if present in the repository root)
5. [README.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/README.md)
6. [platform-integration-guide.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/docs/platform-integration-guide.md) (if present in `docs/` folder)
7. [STRUCTURE.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/STRUCTURE.md)
8. [package.json](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/package.json)
9. [SKILL_MATRIX.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/SKILL_MATRIX.md)
10. The relevant [SKILL.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills) files for the active task

### 2. Context Budget

Summarize, do not paste. Extract only repository constraints, active commands,
pending work, naming rules, file ownership, validation steps, and known risks.

### 3. Routing

After loading context, choose the next skill explicitly:

- UX problem or product flow: [`ux-decision-framework`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/ux-decision-framework/SKILL.md)
- UI generation: [`ui-generation-structured`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/ui-generation-structured/SKILL.md)
- Design consistency: [`design-system-governance`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/design-system-governance/SKILL.md)
- Code implementation: [`code-generation`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/code-generation/SKILL.md)
- Review or audit: [`review-critique`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/review-critique/SKILL.md)
- Iteration after review: [`refinement-workflow`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/refinement-workflow/SKILL.md)
- Final anti-pattern audit: [`anti-patterns-detector`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/anti-patterns-detector/SKILL.md)
- Multi-agent execution: [`multi-agent-workflow`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/multi-agent-workflow/SKILL.md)

### 4. Dynamic Just-in-Time (JIT) Skill Loading
To minimize context window usage (avoiding the 18,000+ token Full Profile bloat) and reduce response latency (drawing from game AI low-latency/JIT resource allocation principles):
- **Evaluate Session Scope:** Before loading any skill, analyze the current user request to determine if it is UX-only, Code-only, Audit-only, or Multi-agent orchestration.
- **JIT Sub-Profile Routing:** Instruct the runner/developer to load only the specific sub-profiles of skills defined in `SKILL_MATRIX.md` that correspond to the active task. Do not load all skills simultaneously unless explicitly requested or running a full multi-agent orchestration.

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
