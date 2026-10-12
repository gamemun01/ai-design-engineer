---
name: prompt-context-loading
description: Load repository context before AI Design Engineer work by reading canonical guide files, project progress files, conventions, package scripts, and relevant skill indexes. Use at the start of a session, before multi-agent orchestration, before large edits, or whenever PROJECT.md, PROGRESS.md, CONVENTIONS.md, AGENTS.md, README.md, or skill routing context may affect the answer.
version: 2.1.0
author: gamemun01
license: MIT
metadata:
  hermes:
    tags: [foundation, context, orchestration, jit]
    related_skills: [core-system-prompt, multi-agent-workflow, ux-decision-framework, code-generation]
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
<!-- Original read order commented out to preserve history (Rule #1).
     Paths normalized to repo-relative form (was file:///D:/SourceCodeAll/...).
Check these files in order. If a file is missing, record it as missing and
continue without failure:

1. [AGENTS.md](../../../AGENTS.md)
2. `PROJECT.md` (if present in the repository root)
3. `PROGRESS.md` (if present in the repository root)
4. `CONVENTIONS.md` (if present in the repository root)
5. [README.md](../../../README.md)
6. [STRUCTURE.md](../../../STRUCTURE.md)
7. [package.json](../../../package.json)
8. [SKILL_MATRIX.md](../../SKILL_MATRIX.md)
9. The relevant [SKILL.md](../../) files for the active task
-->
Check these files in order. If a file is missing, record it as missing and
continue without failure:

1. [AGENTS.md](../../../AGENTS.md) (must exist)
2. `PROJECT.md` (if present in the repository root)
3. `PROGRESS.md` (if present in the repository root)
4. `CONVENTIONS.md` (if present in the repository root)
5. [README.md](../../../README.md) (recommended)
6. [platform-integration-guide.md](../../../docs/platform-integration-guide.md) (if present in `docs/` folder)
7. [STRUCTURE.md](../../../STRUCTURE.md) (recommended)
8. [package.json](../../../package.json) (recommended)
9. [SKILL_MATRIX.md](../../SKILL_MATRIX.md) (recommended)
10. The relevant [SKILL.md](../../) files for the active task (per skill)

### 2. Context Budget

Summarize, do not paste. Extract only repository constraints, active commands,
pending work, naming rules, file ownership, validation steps, and known risks.

### 3. Routing

After loading context, choose the next skill explicitly:

| Routing Target | Skill |
|---|---|
| UX problem or product flow | [`ux-decision-framework`](../../ux/ux-decision-framework/SKILL.md) |
| UI generation | [`ui-generation-structured`](../../ui/ui-generation-structured/SKILL.md) |
| Design consistency | [`design-system-governance`](../../ui/design-system-governance/SKILL.md) |
| Code implementation | [`code-generation`](../../code/code-generation/SKILL.md) |
| Review or audit | [`review-critique`](../../quality/review-critique/SKILL.md) |
| Iteration after review | [`refinement-workflow`](../../quality/refinement-workflow/SKILL.md) |
| Final anti-pattern audit | [`anti-patterns-detector`](../../quality/anti-patterns-detector/SKILL.md) |
| Multi-agent execution | [`multi-agent-workflow`](../../orchestration/multi-agent-workflow/SKILL.md) |

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

> **Threaded pipeline:** Example A continues the **e-commerce checkout** thread
> started in `core-system-prompt`. It hands off to `ux-decision-framework`.
> Example B is the original skill-update context (edge case).

### Example A — Checkout pipeline context load (thread)

```markdown
User: We're starting the e-commerce checkout redesign. Load the project context
and tell me which constraints apply before we design the flow.
```

Response:

```markdown
# Context Loading Summary

## Files Checked
| File | Status | Actionable Notes |
|---|---|---|
| AGENTS.md | Found | Repo is a docs/framework repo; no app test step — treat as docs QC. |
| PROJECT.md | Missing | Continue without project-specific override. |
| CONVENTIONS.md | Missing | Fall back to AGENTS.md naming rules (kebab-case, preserve 8-layer terminology). |
| README.md | Found | Stack examples are React + Next.js + TS + Tailwind + shadcn/ui; checkout must match. |
| STRUCTURE.md | Found | Shared docs in `docs/`; visual blueprints in `assets/`. |
| package.json | Found | Validate with `npm run validate-skill`; lint with `npm run lint`. |
| SKILL_MATRIX.md | Found | Route UX-first work through `ux-decision-framework`. |

## Active Constraints
- Repository rules: `AGENTS.md` is canonical; keep `CLAUDE.md`/`GEMINI.md` as pointers.
- Commands: `npm run lint`, `npm run validate-skill`.
- Naming conventions: kebab-case for files/assets; keep ordered framework dirs (e.g. `06-ai-to-code/`).
- Validation requirements: each `SKILL.md` needs frontmatter + the 7 required body sections.
- Accessibility target: WCAG 2.1 AA; reviews use the 0-120 scorecard (>=95 to ship).
- Risks or open questions: no `PROJECT.md`, so product metrics for checkout (61% -> 75%) come from the user prompt only.

## Next Skill
- Selected skill: `ux-decision-framework`
- Reason: checkout is a UX problem first — journey, error/empty states, and IA must be decided before UI.
- Required input artifact: product context (fashion e-commerce), target metrics, mobile-first constraint, stack.
```

### Example B — Skill-update context load (edge case)

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

## Common Pitfalls
1. Loading context by pasting entire files into the chat — use summaries only to respect the context budget.
2. Treating `AGENTS.md` as optional — it is canonical and must always be read first.
3. Continuing to read past missing optional files (PROJECT.md, PROGRESS.md) without recording them as missing — always report what was checked and what was absent.
4. Routing to a downstream skill without explicitly naming it and the reason — the routing decision is auditable.
5. Loading the full 18,000-token skill profile when only one sub-profile is needed — use JIT sub-profile routing to minimize context cost.

## Verification Checklist
- [ ] Context Loading Summary lists every file checked with Found/Missing status.
- [ ] Active Constraints section distills rules, commands, naming, validation, and risks — no raw file dumps.
- [ ] Next Skill section names exactly one skill with a one-line reason and required input artifact.
- [ ] Token cost of this skill plus the chosen next skill is under the 7,100-token Minimal Profile budget for coding-only tasks.
- [ ] No absolute `file:///` paths appear in the response (use repo-relative links).

