<!-- markdownlint-disable -->

# Skill Matrix - AI Design Engineer

## Purpose

Use this matrix to choose the right production skill for each situation. Start
with context loading when repository state or conventions may affect the work.

## Skill Decision Guide

| Scenario | Recommended skill(s) | Why |
|---|---|---|
| Start a session or load repo context | `prompt-context-loading` | Reads canonical guides, conventions, progress files, and routing context |
| New idea / project kickoff | `project-design-advisor` | Clarifies the real problem and user before MVP/stack choices |
| Design readiness / Dev handoff / Change Request | `project-design-advisor` | Evidence-backed G1–G8, baseline/scope, acceptance trace and separate candidate revisions |
| Clarify product goals | `core-system-prompt` | Aligns the AI to product strategy and success metrics |
| Make UX decisions | `ux-decision-framework` | Structures journeys, task flows, IA, and trade-offs |
| Generate UI screens | `ui-generation-structured` | Creates UI with explicit constraints and system rules |
| Enforce design consistency | `design-system-governance` | Audits tokens, components, and patterns |
| Convert UI to code | `code-generation` | Produces production-ready frontend code |
| Review quality | `review-critique` | Scores output and prioritizes fixes |
| Iterate output | `refinement-workflow` | Improves design/code until production ready |
| Catch recurring mistakes | `anti-patterns-detector` | Identifies anti-patterns before shipping |
| Coordinate agents | `multi-agent-workflow` | Runs a pipeline with CLI adapters and markdown handoffs |

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
- Need idea discovery, design readiness, Dev handoff or CR analysis? Use `project-design-advisor` and its relevant reference.
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

## Context Budgets & Model Selection

Use the [context profiles in INDEX.md](INDEX.md#context-profiles) as the single
source of truth. Load task skills/references just in time; retain unchanged
context. Do not require a full-pack load even for multi-agent work.

Preserve the user's configured model. If model selection is requested, verify
current provider availability and choose using demonstrated task quality,
tool support, latency, and cost. Do not pin retired model IDs or claim measured
token savings/latency without benchmark evidence. Measure with the host tokenizer;
bytes/4 is a rough estimate, not a budget guarantee.

## Common Workflows

Here is how to compose multiple skills together for common development tasks:

- **New Component Design & Build:**
  `core-system-prompt` → `ux-decision-framework` → `code-generation` → `review-critique`
- **Code Review & Quality Check:**
  `core-system-prompt` → `anti-patterns-detector` → `review-critique`
- **Full-Cycle Product Implementation:**
  `core-system-prompt` → `ux-decision-framework` → `ui-generation-structured` → `design-system-governance` → `code-generation` → `review-critique` → `refinement-workflow`

## Specialized Scenario Routing

### Security Threat Modeling & Audit
When the project requires a dedicated security review or threat model assessment:
1. `prompt-context-loading` — Load project context and identify attack surfaces.
2. `anti-patterns-detector` — Run Zero Trust, Least Privilege, and Prompt Injection guardrails.
3. `review-critique` — Score the security audit checkpoints and generate the prioritized fix list.
4. `refinement-workflow` — Iterate fixes until the Security sub-score passes threshold.

### RAG / ML Intelligence Pipeline
When building or reviewing a project that includes Retrieval-Augmented Generation or ML inference:
1. `prompt-context-loading` — Load project context including ML pipeline configurations.
2. `code-generation` — Implement the frontend integration only; use an available specialist workflow for retrieval/inference infrastructure.
3. `review-critique` — Run the standard scorecard plus the conditional RAG/ML Intelligence Audit (RAGAS metrics, Tiered Evaluation Pyramid, context freshness).
4. `anti-patterns-detector` — Check for Prompt Injection vulnerabilities and data safety issues in the inference path.

### Backend Refactoring & API Contract Strategy
When refactoring backend services, API boundaries, or system architecture:
1. `prompt-context-loading` — Load existing API contracts, service maps, and dependency graphs.
2. `code-generation` — Check frontend/API integration contracts; use a backend-specific workflow for service or database changes.
3. `review-critique` — Score engineering quality and verify typed schemas and contract integrity.
4. `refinement-workflow` — Resolve in-scope contract failures with evidence-backed checks; avoid unrelated deletion.

## Notes

- The matrix helps choose the right skill; it does not force a strict order.
- Use the beginner path for simple design tasks.
- Use the expert path when repeatability, handoffs, and quality gates matter.
- Every production workflow needs verification; refine only when review finds issues.
