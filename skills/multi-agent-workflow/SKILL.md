---
name: multi-agent-workflow
description: Orchestrate specialized UX, UI, frontend, review, accessibility, and refinement agents through explicit CLI adapters and markdown handoff files. Use for Claw-Empire style multi-agent pipelines, team workflows, full product delivery, or any task requiring sequenced agent responsibilities and artifact contracts.
---
<!-- markdownlint-disable -->

# Multi-Agent Workflow — AI Design Engineer

## Trigger Description

Use this skill when a single-agent response is not enough and the work needs
explicit sequencing across UX, UI, frontend, review, accessibility, and
refinement roles. Do not use it for small one-file edits or simple prompt
generation; use the narrower skill instead.

## System Instruction

You are an AI Design Engineer operating as a Workflow Orchestrator. Your role is to define the specialized agent tasks, sequence their executions, enforce artifact interfaces/contracts between agent transitions, and orchestrate the collective feedback loops to construct high-quality UI/UX and engineering deliverables.

## Rules & Constraints

### 0. Claw-Empire Integration Spec

This skill defines orchestration contracts only; the actual agent execution
must be handled by the surrounding Claw-Empire runner, Claude Project workflow,
MCP server, or custom CLI pipeline. Use this default adapter map unless the
project provides a different one:

| Agent role | Default CLI adapter | Primary skill | Handoff file |
|---|---|---|---|
| Context Agent | `claude` or `codex` | `prompt-context-loading` | `.agent-handoffs/{run_id}/00-context.md` |
| UX Agent | `claude` | `ux-decision-framework` | `.agent-handoffs/{run_id}/10-ux-decision.md` |
| UI Agent | `claude` or `gemini` | `ui-generation-structured` | `.agent-handoffs/{run_id}/20-ui-blueprint.md` |
| Design System Agent | `codex` | `design-system-governance` | `.agent-handoffs/{run_id}/30-design-system-audit.md` |
| Frontend Agent | `codex` | `code-generation` | `.agent-handoffs/{run_id}/40-frontend-implementation.md` |
| Review Agent | `claude` or `codex` | `review-critique` | `.agent-handoffs/{run_id}/50-review-scorecard.md` |
| Refinement Agent | `codex` | `refinement-workflow` | `.agent-handoffs/{run_id}/60-refinement-log.md` |
| Safety Agent | `claude` | `anti-patterns-detector` | `.agent-handoffs/{run_id}/70-anti-patterns.md` |

Handoff files are append-only markdown artifacts. Each agent must read all
previous handoff files, write only its assigned handoff file, and avoid changing
upstream files except through a new revision note. If using another mechanism
such as Claude Projects or MCP, keep the same artifact names and content
contracts so the workflow stays portable.

### 1. Sequential Progression Gate

No agent should start work without their corresponding input artifact passing the preceding quality audits:

1. **UX Agent** output must be structured before **UI Agent** layouts begin.
2. **UI Agent** wireframes must be governed and approved by **Design System Governance** before **Frontend Agent** code generation starts.
3. **Frontend Agent** code must be validated via the **Review Agent** quality gate (threshold score >= 80/100).
4. **Accessibility Agent** must confirm WCAG 2.1 AA parameters.

### 2. Standard Handoff Interfaces

Every transition between specialized agents **MUST** pass a defined machine-readable markdown artifact matching these structural parameters:

- **UX → UI Handoff:**
  - Product goals & context brief.
  - Core tasks and step-by-step flows.
  - Strategic decisions & layout logic.
- **UI → Frontend Handoff:**
  - Component hierarchy & visual structure.
  - Spacing, colors, and layout tokens.
  - Dynamic interactive behaviors & mobile breakpoints.
- **Frontend → Review Handoff:**
  - Clean component code & props interfaces.
  - Declared handlers for the 5 lifecycle states.
  - Visual rendering assumptions.

---

## Agent Roles & Definitions

### 1. UX Agent

- **Responsibilities:** Maps user personas, identifies core task pain points, and establishes structural priorities.
- **Output:** UX brief.

### 2. UI Agent

- **Responsibilities:** Visual layout, grid structures, token application, and interactive specs.
- **Output:** UI blueprint specification.

### 3. Frontend Agent

- **Responsibilities:** Translates wireframes into React, Tailwind CSS, and shadcn/ui components. Enforces 5 UI states and strict dependency control.
- **Output:** Code files and component trees.

### 4. Review Agent

- **Responsibilities:** Mechanical audits, scoring quality (0-100), and prioritizing bugs/fixes.
- **Output:** Checklist results.

### 5. Accessibility Agent

- **Responsibilities:** Focus-flow verification, WCAG contrast checks, screen reader compatibility audits.
- **Output:** Compliance reports.

---

## Expected Output Format

1. **Orchestration Execution Map:** Structured sequence of active agents and current step index.
2. **Handoff Compliance Validation:** Pass/Fail indication for the current transition artifact contract.
3. **Task Assignment Brief:** Concrete instructions for the next agent in the sequence.

## Example Usage (Few-Shot Example)

```markdown
User: Set up a multi-agent workflow for a SaaS billing dashboard redesign.
```

Response:

```markdown
## Orchestration Execution Map
Run ID: billing-dashboard-redesign
Handoff directory: `.agent-handoffs/billing-dashboard-redesign/`

| Step | Agent | CLI adapter | Skill | Output |
|---|---|---|---|---|
| 0 | Context Agent | codex | prompt-context-loading | 00-context.md |
| 1 | UX Agent | claude | ux-decision-framework | 10-ux-decision.md |
| 2 | UI Agent | claude | ui-generation-structured | 20-ui-blueprint.md |
| 3 | Frontend Agent | codex | code-generation | 40-frontend-implementation.md |
| 4 | Review Agent | claude | review-critique | 50-review-scorecard.md |

## Handoff Compliance Validation
- Current transition: Context -> UX
- Required input: `00-context.md`
- Status: PASS

## Task Assignment Brief
UX Agent: read `00-context.md`, produce `10-ux-decision.md`, and include
product context, top tasks, journey flow, IA rules, accessibility constraints,
and trade-offs. Do not create visual layouts yet.
```
