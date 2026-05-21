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

## Agent Roles & Technical Specifications

Every active agent in the pipeline must run with the specified LLM models, toolsets, and deliverable schemas below.

### 1. UX Agent
*   **LLM Model:** `Claude 3.5 Sonnet` or `Gemini 1.5 Pro` (Optimized for textual reasoning and structured product layout reasoning).
*   **Tool Access:** Read File (for codebases/spec documents), Write File (for writing the output).
*   **Assigned Skill:** `ux-decision-framework`
*   **Handoff Output:** `.agent-handoffs/{run_id}/10-ux-decision.md`
*   **Interface Schema:** Must contain sections for Product Context, Priority Tasks Table, Decision Flow (with success/error transitions), Assist/Control UX Strategy justification, and Keyboard A11y rules.

### 2. UI Agent
*   **LLM Model:** `Claude 3.5 Sonnet` or `Gemini 1.5 Pro` (Optimized for grid layouts and responsive visual structure rules).
*   **Tool Access:** Read File (reads `10-ux-decision.md`), Write File.
*   **Assigned Skill:** `ui-generation-structured`
*   **Handoff Output:** `.agent-handoffs/{run_id}/20-ui-blueprint.md`
*   **Interface Schema:** Detailed component visual wireframe layouts, mapping spacing values to token scales (e.g. `spacing-sm` = 16px), color assignments (e.g. canvas = `color-bg`), and responsive breakpoints spec (mobile vs desktop).

### 3. Design System Agent (Governance Gate)
*   **LLM Model:** `Claude 3.5 Sonnet` or a specialized static analysis script.
*   **Tool Access:** Read File, Write File, and `npm run validate-token` (automated token parsing schema checks).
*   **Assigned Skill:** `design-system-governance`
*   **Handoff Output:** `.agent-handoffs/{run_id}/30-design-system-audit.md`
*   **Interface Schema:** Audit checklist checking if spacing, radius, colors, and typography match the Tailwind/CSS mapping. Report must return a PASS status to proceed to code generation.

### 4. Frontend Agent
*   **LLM Model:** `Claude 3.5 Sonnet` (Optimized for React/Next.js and TS styling code compilation).
*   **Tool Access:** Read File (reads `20-ui-blueprint.md` and `30-design-system-audit.md`), Write File (creates actual component `.tsx` files in the project), and terminal Command execution (for running `npm run build` to verify compiling).
*   **Assigned Skill:** `code-generation`
*   **Handoff Output:** `.agent-handoffs/{run_id}/40-frontend-implementation.md` (plus actual generated source files).
*   **Interface Schema:** Complete code output, prop interfaces in TS, imports audit, and implementation logs for all 5 UI States (Ideal, Loading, Empty, Error, and Partial/Truncated states).

### 5. Review & Safety Agent (Quality Gate)
*   **LLM Model:** `Claude 3.5 Sonnet` or `Gemini 1.5 Pro` (High reasoning capabilities for catching edge cases and anti-patterns).
*   **Tool Access:** Read File, Write File, and Linter Tools (`npx markdownlint-cli`, `eslint`, `node scripts/validate-skill.js`).
*   **Assigned Skills:** `review-critique` (for 0-100 Scorecard) and `anti-patterns-detector` (for pre-shipping safety audit).
*   **Handoff Output:** `.agent-handoffs/{run_id}/50-review-scorecard.md`
*   **Interface Schema:** Scoring scorecard (Breakdown: Visual max 30, UX max 40, Engineering max 30) and safety check status (PASS/FAIL). Must be >= 80/100 to ship. If failed, compiles bug list and hands off back to the Refinement Agent.

---

## Workflow Runtime & Execution Spec

To execute this multi-agent system programmatically or manually, conform to the following orchestration loop:

1. **Initialization:** The runner creates `.agent-handoffs/{run_id}/` and writes the initial product brief to `00-context.md`.
2. **Execution Invocation:**
   * Each step runs the agent CLI adapter command using the assigned skill:
     ```bash
     # Example CLI runner command for UX Agent
     npx agent-runner --skill ux-decision-framework --input .agent-handoffs/{run_id}/00-context.md --output .agent-handoffs/{run_id}/10-ux-decision.md
     ```
3. **Validation & Gates:**
   * After each step, a validation hook checks if the handoff file matches the required markdown headers. If headers are missing, the step is aborted and sent back to the agent with the error.
   * Steps 3 (Governance) and 5 (Review/Safety) act as blocking gates. If the output status is `FAIL`, execution halts and loops back to refinement.
4. **Handoff Persistence:** All intermediate agent dialogue logs are saved under `.agent-handoffs/{run_id}/logs/` for audit trails.


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
