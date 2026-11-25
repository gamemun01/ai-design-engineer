---
name: ai-design-engineer-index
description: Entry-point index for the AI Design Engineer skill pack. Routes project discovery, design readiness, UX, UI, code and review tasks to the relevant core skills without loading the whole pack.
version: 2.2.0
author: gamemun01
license: MIT
metadata:
  hermes:
    tags: [index, routing, overview, meta, onboarding]
    related_skills: [core-system-prompt, prompt-context-loading, project-design-advisor, ux-decision-framework, ui-generation-structured, design-system-governance, code-generation, review-critique, refinement-workflow, anti-patterns-detector, multi-agent-workflow]
---

# AI Design Engineer — Skill Pack Index

## When to Use This Index

Use this index when you (or your agent) need to know **which skill to load first** for a given task. If you already know the target skill, load it directly — do not use the index as a wrapper.

This index does NOT generate UI/UX/code itself. It only routes.

## Pack Structure (skill release v2.2.0; schema v2.1.0)

Skills are grouped into **6 categories** under `skills/`:

| Category | Path | Skills | Purpose |
|---|---|---|---|
| **Foundation** | `skills/foundation/` | `core-system-prompt`, `prompt-context-loading` | Load context then role baseline when needed; retain unchanged context. |
| **UX** | `skills/ux/` | `project-design-advisor`, `ux-decision-framework` | Idea, readiness, handoff/CR; user research, journeys and IA. |
| **UI** | `skills/ui/` | `ui-generation-structured`, `design-system-governance` | UI prompts + design tokens + component contracts. |
| **Code** | `skills/code/` | `code-generation` | React/Next.js/TS/Tailwind/shadcn production code. |
| **Quality** | `skills/quality/` | `review-critique`, `refinement-workflow`, `anti-patterns-detector` | Scorecards, iterations, anti-pattern audits. |
| **Orchestration** | `skills/orchestration/` | `multi-agent-workflow` | Multi-agent handoffs, CLI adapters, Claw-Empire style. |

## Scenario → Skill Routing

| If you need to… | Load this skill | Then |
|---|---|---|
| Start a new session / load repo context | `prompt-context-loading` | `core-system-prompt` |
| Onboard an agent / set role | `core-system-prompt` | task-specific skill |
| Start from an idea / assess design readiness / prepare a Dev handoff / analyze a CR | `project-design-advisor` | UX/UI when the brief is ready; implementation only for accepted scope |
| Design a UX flow, journey, or IA | `ux-decision-framework` | `ui-generation-structured` |
| Generate UI prompts or wireframes | `ui-generation-structured` | `design-system-governance` for audit |
| Enforce design tokens / consistency | `design-system-governance` | `code-generation` |
| Write production code from UI specs | `code-generation` | `review-critique` |
| Review / score an artifact | `review-critique` | `refinement-workflow` (if fail) |
| Iterate on review findings | `refinement-workflow` | `review-critique` (rescore) |
| Catch recurring mistakes | `anti-patterns-detector` | `refinement-workflow` |
| Coordinate multiple agents | `multi-agent-workflow` | task-specific skills per agent |

## Context Profiles

Load only the profile needed now; retain the baseline already loaded and add
review/refinement when that stage begins. Supporting references load on demand.

| Profile | Skills at the active stage |
|---|---|
| **Coding Focus** | `prompt-context-loading`, `core-system-prompt`, `code-generation` |
| **Project Design** | `prompt-context-loading`, `core-system-prompt`, `project-design-advisor`; readiness/CR references when needed |
| **UX Strategy** | `prompt-context-loading`, `core-system-prompt`, `ux-decision-framework` |
| **UI Wireframing** | `prompt-context-loading`, `core-system-prompt`, `ui-generation-structured` |
| **QA & Audit** | `prompt-context-loading`, `core-system-prompt`, `review-critique`; add detector/refinement when needed |
| **Orchestration** | `prompt-context-loading`, `core-system-prompt`, `multi-agent-workflow`; each agent loads its own task skill |

Use the host tokenizer for budgets. Bytes/4 is only a rough heuristic and is
especially unreliable for Thai. Include task files, conversation, references,
tool output, and response space; no fixed token count or latency is guaranteed.

## Common Pitfalls

1. Loading the full pack when a sub-profile suffices — wastes context and slows responses.
2. Skipping `prompt-context-loading` and `core-system-prompt` — load them when context is missing; reuse an existing baseline.
3. Routing to `code-generation` before `ux-decision-framework` — reuse an existing brief; a small code fix does not require a new UX phase.
4. Skipping `review-critique` before shipping — fully assessed UI/code uses the scorecard; docs/tooling uses actual checks.
5. Using `multi-agent-workflow` for tasks that fit in a single agent — orchestration overhead is not free.

## Verification Checklist

- [ ] `prompt-context-loading` and `core-system-prompt` are loaded before any task-specific skill.
- [ ] The scenario-to-skill routing table above is used to pick the next skill, not guesswork.
- [ ] Token budget is respected (sub-profile preferred over full pack).
- [ ] Final review includes evidence-backed checks and unresolved limitations.
- [ ] `npm run validate-skill` passes locally before any change is committed.
