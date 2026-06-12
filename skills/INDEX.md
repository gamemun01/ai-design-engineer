---
name: ai-design-engineer-index
description: Entry-point index skill for the AI Design Engineer skill pack. Use when you need to know which of the 10 available skills fits the current task, when you want a one-page overview of the full UX-to-code pipeline, or when onboarding a new agent/IDE to the pack. Routes to scenario-specific skills via category subdirectories.
version: 2.1.0
author: gamemun01
license: MIT
metadata:
  hermes:
    tags: [index, routing, overview, meta, onboarding]
    related_skills: [core-system-prompt, prompt-context-loading, ux-decision-framework, ui-generation-structured, design-system-governance, code-generation, review-critique, refinement-workflow, anti-patterns-detector, multi-agent-workflow]
---

# AI Design Engineer — Skill Pack Index

## When to Use This Index

Use this index when you (or your agent) need to know **which skill to load first** for a given task. If you already know the target skill, load it directly — do not use the index as a wrapper.

This index does NOT generate UI/UX/code itself. It only routes.

## Pack Structure (v2.1.0)

Skills are grouped into **6 categories** under `skills/`:

| Category | Path | Skills | Purpose |
|---|---|---|---|
| **Foundation** | `skills/foundation/` | `core-system-prompt`, `prompt-context-loading` | Always load first. Sets role + loads project context. |
| **UX** | `skills/ux/` | `ux-decision-framework` | User research, journeys, IA, trade-offs. |
| **UI** | `skills/ui/` | `ui-generation-structured`, `design-system-governance` | UI prompts + design tokens + component contracts. |
| **Code** | `skills/code/` | `code-generation` | React/Next.js/TS/Tailwind/shadcn production code. |
| **Quality** | `skills/quality/` | `review-critique`, `refinement-workflow`, `anti-patterns-detector` | Scorecards, iterations, anti-pattern audits. |
| **Orchestration** | `skills/orchestration/` | `multi-agent-workflow` | Multi-agent handoffs, CLI adapters, Claw-Empire style. |

## Scenario → Skill Routing

| If you need to… | Load this skill | Then |
|---|---|---|
| Start a new session / load repo context | `prompt-context-loading` | `core-system-prompt` |
| Onboard an agent / set role | `core-system-prompt` | task-specific skill |
| Design a UX flow, journey, or IA | `ux-decision-framework` | `ui-generation-structured` |
| Generate UI prompts or wireframes | `ui-generation-structured` | `design-system-governance` for audit |
| Enforce design tokens / consistency | `design-system-governance` | `code-generation` |
| Write production code from UI specs | `code-generation` | `review-critique` |
| Review / score an artifact | `review-critique` | `refinement-workflow` (if fail) |
| Iterate on review findings | `refinement-workflow` | `review-critique` (rescore) |
| Catch recurring mistakes | `anti-patterns-detector` | `refinement-workflow` |
| Coordinate multiple agents | `multi-agent-workflow` | task-specific skills per agent |

## Token Budgets

Loading too many skills at once bloats context. Use these profiles:

| Profile | Skills | ~Tokens | When to use |
|---|---|---|---|
| **Coding Focus** | `prompt-context-loading`, `core-system-prompt`, `code-generation`, `review-critique` | ~7,100 | Most coding tasks |
| **UX Strategy** | `prompt-context-loading`, `ux-decision-framework` | ~2,600 | Pure UX work |
| **UI Wireframing** | `prompt-context-loading`, `ui-generation-structured` | ~2,900 | Pure UI prompts |
| **QA & Audit** | `prompt-context-loading`, `review-critique`, `anti-patterns-detector`, `refinement-workflow` | ~6,000 | Reviewing/auditing |
| **Orchestration** | `prompt-context-loading`, `multi-agent-workflow` | ~3,600 | Multi-agent pipelines |
| **Full Pack** | All 11 skills (10 active + this index) | ~18,000+ | Use sparingly; full planning only |

## Common Pitfalls

1. Loading the full pack when a sub-profile suffices — wastes context and slows responses.
2. Skipping `prompt-context-loading` and `core-system-prompt` — every task-specific skill assumes these are loaded.
3. Routing to `code-generation` before `ux-decision-framework` — code without a UX brief produces inconsistent UI.
4. Skipping `review-critique` before shipping — every shipped artifact should have a 0-120 score.
5. Using `multi-agent-workflow` for tasks that fit in a single agent — orchestration overhead is not free.

## Verification Checklist

- [ ] `prompt-context-loading` and `core-system-prompt` are loaded before any task-specific skill.
- [ ] The scenario-to-skill routing table above is used to pick the next skill, not guesswork.
- [ ] Token budget is respected (sub-profile preferred over full pack).
- [ ] `review-critique` is the last skill before shipping output.
- [ ] `npm run validate-skill` passes locally before any change is committed.
