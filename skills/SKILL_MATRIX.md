<!-- markdownlint-disable -->

# Skill Matrix - AI Design Engineer

## Purpose

Use this matrix to choose the right production skill for each situation. Start
with context loading when repository state or conventions may affect the work.

## Skill Decision Guide

| Scenario | Recommended skill(s) | Why | Time estimate |
|---|---|---|---|
| Start a session or load repo context | `prompt-context-loading` | Reads canonical guides, conventions, progress files, and routing context | 5-10 min |
| New project kickoff | `core-system-prompt`, `ux-decision-framework` | Establishes role, constraints, user tasks, and UX rationale | 10-20 min |
| Clarify product goals | `core-system-prompt` | Aligns the AI to product strategy and success metrics | 5-10 min |
| Make UX decisions | `ux-decision-framework` | Structures journeys, task flows, IA, and trade-offs | 15-30 min |
| Generate UI screens | `ui-generation-structured` | Creates UI with explicit constraints and system rules | 20-30 min |
| Enforce design consistency | `design-system-governance` | Audits tokens, components, and patterns | 15-20 min |
| Convert UI to code | `code-generation` | Produces production-ready frontend code | 20-40 min |
| Review quality | `review-critique` | Scores output and prioritizes fixes | 10-15 min |
| Iterate output | `refinement-workflow` | Improves design/code until production ready | 15-30 min |
| Catch recurring mistakes | `anti-patterns-detector` | Identifies anti-patterns before shipping | 10-15 min |
| Coordinate agents | `multi-agent-workflow` | Runs a pipeline with CLI adapters and markdown handoffs | 30-60 min |

## Skill Paths

### Beginner Path

1. `prompt-context-loading`
2. `core-system-prompt`
3. `ux-decision-framework`
4. `ui-generation-structured`

### Intermediate Path

1. `prompt-context-loading`
2. `core-system-prompt`
3. `ux-decision-framework`
4. `ui-generation-structured`
5. `design-system-governance`
6. `review-critique`

### Advanced Path

1. `prompt-context-loading`
2. `core-system-prompt`
3. `ux-decision-framework`
4. `ui-generation-structured`
5. `design-system-governance`
6. `code-generation`
7. `review-critique`
8. `refinement-workflow`

### Expert Path

1. `prompt-context-loading`
2. `core-system-prompt`
3. `ux-decision-framework`
4. `ui-generation-structured`
5. `design-system-governance`
6. `code-generation`
7. `review-critique`
8. `refinement-workflow`
9. `anti-patterns-detector`
10. `multi-agent-workflow`

## Quick Reference

- Need repository context first? Use `prompt-context-loading`.
- Need a prompt baseline? Use `core-system-prompt`.
- Need UX reasoning? Use `ux-decision-framework`.
- Need a reproducible UI prompt? Use `ui-generation-structured`.
- Need consistency checks? Use `design-system-governance`.
- Need code output? Use `code-generation`.
- Need quality gate? Use `review-critique`.
- Need iterations? Use `refinement-workflow`.
- Need final audit? Use `anti-patterns-detector`.
- Need team orchestration? Use `multi-agent-workflow`.

## Scenarios and Workflow Maps

### Small Dashboard Proof of Concept

1. `prompt-context-loading`
2. `core-system-prompt`
3. `ux-decision-framework`
4. `ui-generation-structured`
5. `review-critique`

### Production Internal Tool

1. `prompt-context-loading`
2. `core-system-prompt`
3. `ux-decision-framework`
4. `ui-generation-structured`
5. `design-system-governance`
6. `code-generation`
7. `review-critique`
8. `refinement-workflow`
9. `anti-patterns-detector`

### Team or Claw-Empire Multi-Agent Pipeline

1. `prompt-context-loading`
2. `multi-agent-workflow`
3. `core-system-prompt`
4. `ux-decision-framework`
5. `ui-generation-structured`
6. `design-system-governance`
7. `code-generation`
8. `review-critique`
9. `refinement-workflow`
10. `anti-patterns-detector`

## Notes

- The matrix helps choose the right skill; it does not force a strict order.
- Use the beginner path for simple design tasks.
- Use the expert path when repeatability, handoffs, and quality gates matter.
- Every production workflow should include review and refinement.
