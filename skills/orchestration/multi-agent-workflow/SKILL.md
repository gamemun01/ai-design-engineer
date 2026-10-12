---
name: multi-agent-workflow
description: Orchestrate specialized UX, UI, frontend, review, accessibility, and refinement agents through explicit CLI adapters and markdown handoff files. Use for Claw-Empire style multi-agent pipelines, team workflows, full product delivery, or any task requiring sequenced agent responsibilities and artifact contracts.
version: 2.1.0
author: gamemun01
license: MIT
metadata:
  hermes:
    tags: [orchestration, multi-agent, pipeline, handoff, cli]
    related_skills: [prompt-context-loading, core-system-prompt, ux-decision-framework, code-generation, review-critique]
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

<!-- ORIGINAL TABLE PRESERVED FOR HISTORY:
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
-->

| Agent role | Default CLI adapter | Primary skill | Handoff file |
|---|---|---|---|
| Context Agent | `claude` or `gemini` | `prompt-context-loading` | `.agent-handoffs/{run_id}/00-context.md` |
| UX Agent | `claude` | `ux-decision-framework` | `.agent-handoffs/{run_id}/10-ux-decision.md` |
| UI Agent | `claude` or `gemini` | `ui-generation-structured` | `.agent-handoffs/{run_id}/20-ui-blueprint.md` |
| Design System Agent | `gemini` | `design-system-governance` | `.agent-handoffs/{run_id}/30-design-system-audit.md` |
| Frontend Agent | `gemini` | `code-generation` | `.agent-handoffs/{run_id}/40-frontend-implementation.md` |
| Review Agent | `claude` or `gemini` | `review-critique` | `.agent-handoffs/{run_id}/50-review-scorecard.md` |
| Refinement Agent | `gemini` | `refinement-workflow` | `.agent-handoffs/{run_id}/60-refinement-log.md` |
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
3. **Frontend Agent** code must be validated via the **Review & Safety Agent** quality gate (threshold score >= 95/120), which includes WCAG 2.1 AA accessibility confirmation.

### 2. Standard Handoff Interfaces
<!-- Original handoff interfaces section commented out to preserve history (Rule #1)
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
-->
Every transition between specialized agents **MUST** pass a defined, machine-readable markdown artifact containing YAML frontmatter and a JSON code block to ensure data parity. The exact schemas are:

#### 1. UX → UI Handoff Schema (`10-ux-decision.md`)
```markdown
---
stage: "UX_DECISION"
run_id: "RUN_UUID"
timestamp: "2026-05-22T00:00:00Z"
---
# UX Decision Brief

```json
{
  "context": {
    "product_goals": "string",
    "target_users": "string"
  },
  "priority_tasks": [
    { "task_id": "string", "name": "string", "priority": "high|medium|low" }
  ],
  "decision_flows": [
    { "id": "string", "flow": "string", "success_state": "string", "error_state": "string" }
  ],
  "accessibility_rules": {
    "keyboard_navigation": ["string"],
    "focus_order": ["string"]
  }
}
```
```

#### 2. UI → Frontend Handoff Schema (`20-ui-blueprint.md`)
```markdown
---
stage: "UI_BLUEPRINT"
run_id: "RUN_UUID"
timestamp: "2026-05-22T00:00:00Z"
---
# UI Blueprint Spec

```json
{
  "component_hierarchy": {
    "root": "string",
    "children": ["string"]
  },
  "layout_tokens": {
    "spacing": { "outer_padding": "spacing-md", "inner_gap": "spacing-sm" },
    "colors": { "canvas": "color-bg", "panel": "color-surface", "action": "color-primary" },
    "radius": "radius-md"
  },
  "responsive_breakpoints": {
    "mobile": "grid-cols-1",
    "desktop": "grid-cols-3"
  }
}
```
```

#### 3. Frontend → Review Handoff Schema (`40-frontend-implementation.md`)
```markdown
---
stage: "FRONTEND_IMPLEMENTATION"
run_id: "RUN_UUID"
timestamp: "2026-05-22T00:00:00Z"
---
# Frontend Implementation Log

```json
{
  "files_written": ["string"],
  "component_interfaces": [
    { "name": "string", "props": { "propName": "type" } }
  ],
  "ui_states_handled": {
    "ideal": true,
    "loading": true,
    "empty": true,
    "error": true,
    "partial": true
  },
  "compilation_command_run": "npm run build"
}
```
```

#### 4. Review → Refinement Handoff Schema (`50-review-scorecard.md`)
```markdown
---
stage: "REVIEW_CRITIQUE"
run_id: "RUN_UUID"
timestamp: "2026-05-22T00:00:00Z"
---
# Review & Critique Scorecard

```json
{
  "ci_status": "PASS|FAIL",
  "total_score": 120,
  "scorecard": {
    "visual": 25,
    "ux": 35,
    "engineering": 25,
    "performance": 20,
    "security": 15
  },
  "failures": [
    { "checkpoint": "string", "priority": "high|medium|low", "issue": "string" }
  ],
  "linter_logs": {
    "compiler_errors": 0,
    "standard_warnings": 0,
    "security_vulnerabilities": 0,
    "performance_warnings": 0
  }
}
```
```

### 3. Orchestration Resilience Rules

To prevent agents from entering infinite loops or exhausting token/cost budgets, the following resilience constraints are enforced:

- **Circuit Breakers:** If any agent fails a verification gate or review scorecard (threshold score < 95/120) for 3 consecutive iterations, break the loop and immediately request human escalation/intervention.
- **Retry Budgets:** Limit maximum retries for non-fatal errors (e.g. minor styling warnings, minor formatting issues) to 2 attempts per agent stage.
- **Fallbacks & Partial Results:** If a sub-task or non-critical agent execution fails, return the best available partial results or fallback to a simpler mock layout/default theme rather than failing the entire pipeline execution.
- **Idempotency Check:** All tool operations and file modifications must be idempotent. Repeating the execution with the same handoff input must result in the same state without duplicate operations or code insertion.

### 4. Multi-Agent Topologies

The Orchestrator must support and explicitly define one of the following execution topologies for the workflow:

- **Sequential Topology:** Simple linear pipeline (e.g., UX -> UI -> Dev -> Review). Each step runs sequentially after the previous one passes its gate.
- **Parallel Topology:** Independent tasks run concurrently (e.g., the UI agent drafts the visual layouts while the database schema agent builds database tables).
- **Conditional Topology:** Branching based on dynamic audits (e.g., if a security warning is flagged, route to the Safety Agent; otherwise, skip directly to the Review/Compiling phase).
- **Hybrid Topology:** Combines linear sequencing with parallel forks and conditional merges. The orchestrator coordinates and merges outputs from parallel branches into a unified markdown handoff before triggering downstream gates.

---

## Agent Roles & Technical Specifications

Every active agent in the pipeline must run with the specified LLM models, toolsets, and deliverable schemas below.

### Model Configuration

Configure the active models using the following variables:
- **Orchestrator/Reasoning Agent Model:** `{{ORCHESTRATOR_MODEL | default: "claude-3-5-sonnet-latest"}}` (Optimized for textual reasoning, planning, structural layout planning, and auditing).
- **Coder/Frontend Agent Model:** `{{CODER_MODEL | default: "claude-3-5-sonnet-latest"}}` (Optimized for high-performance React/Next.js and Tailwind compilation).

### 1. UX Agent
*   **LLM Model:** `{{ORCHESTRATOR_MODEL | default: "claude-3-5-sonnet-latest"}}`
*   **Tool Access:** Read File (for codebases/spec documents), Write File (for writing the output).
*   **Assigned Skill:** `ux-decision-framework`
*   **Handoff Output:** `.agent-handoffs/{run_id}/10-ux-decision.md`
*   **Interface Schema:** Must contain sections for Product Context, Priority Tasks Table, Decision Flow (with success/error transitions), Assist/Control UX Strategy justification, and Keyboard A11y rules.

### 2. UI Agent
*   **LLM Model:** `{{ORCHESTRATOR_MODEL | default: "claude-3-5-sonnet-latest"}}`
*   **Tool Access:** Read File (reads `10-ux-decision.md`), Write File.
*   **Assigned Skill:** `ui-generation-structured`
*   **Handoff Output:** `.agent-handoffs/{run_id}/20-ui-blueprint.md`
*   **Interface Schema:** Detailed component visual wireframe layouts, mapping spacing values to token scales (e.g. `spacing-sm` = 16px), color assignments (e.g. canvas = `color-bg`), and responsive breakpoints spec (mobile vs desktop).

### 3. Design System Agent (Governance Gate)
*   **LLM Model:** `{{ORCHESTRATOR_MODEL | default: "claude-3-5-sonnet-latest"}}` or a specialized static analysis script.
*   **Tool Access:** Read File, Write File, and `npm run validate-token` (automated token parsing schema checks).
*   **Assigned Skill:** `design-system-governance`
*   **Handoff Output:** `.agent-handoffs/{run_id}/30-design-system-audit.md`
*   **Interface Schema:** Audit checklist checking if spacing, radius, colors, and typography match the Tailwind/CSS mapping. Report must return a PASS status to proceed to code generation.

### 4. Frontend Agent
*   **LLM Model:** `{{CODER_MODEL | default: "claude-3-5-sonnet-latest"}}`
*   **Tool Access:** Read File (reads `20-ui-blueprint.md` and `30-design-system-audit.md`), Write File (creates actual component `.tsx` files in the project), and terminal Command execution (for running `npm run build` to verify compiling).
*   **Assigned Skill:** `code-generation`
*   **Handoff Output:** `.agent-handoffs/{run_id}/40-frontend-implementation.md` (plus actual generated source files).
*   **Interface Schema:** Complete code output, prop interfaces in TS, imports audit, and implementation logs for all 5 UI States (Ideal, Loading, Empty, Error, and Partial/Truncated states).

### 5. Review & Safety Agent (Quality Gate)
*   **LLM Model:** `{{ORCHESTRATOR_MODEL | default: "claude-3-5-sonnet-latest"}}`
*   **Tool Access:** Read File, Write File, and Linter Tools (`npx markdownlint-cli`, `eslint`, `node scripts/validate-skill.js`).
*   **Assigned Skills:** `review-critique` (for 0-120 Scorecard) and `anti-patterns-detector` (for pre-shipping safety audit).
*   **Handoff Output:** `.agent-handoffs/{run_id}/50-review-scorecard.md`
*   **Interface Schema:** Scoring scorecard (Breakdown: Visual max 25, UX max 35, Engineering max 25, Performance max 20, Security max 15) and safety check status (PASS/FAIL). Must be >= 95/120 to ship. If failed, compiles bug list and hands off back to the Refinement Agent.

---

## Workflow Runtime & Execution Spec

To execute this multi-agent system programmatically or manually, conform to the following orchestration loop:

1. **Initialization:** The runner creates `.agent-handoffs/{run_id}/` and writes the initial product brief to `00-context.md`.
2. **Execution Invocation:**
   * Each step runs the agent CLI adapter command using the assigned skill:
     ```bash
     # Example using standard Claude CLI (Adapt to your local runner environment):
     claude --system-prompt skills/ux-decision-framework/SKILL.md --input .agent-handoffs/{run_id}/00-context.md > .agent-handoffs/{run_id}/10-ux-decision.md
     
     # Or using a custom orchestration script (e.g. node scripts/run-agent.js):
     # node scripts/run-agent.js --skill ux-decision-framework --input .agent-handoffs/{run_id}/00-context.md --output .agent-handoffs/{run_id}/10-ux-decision.md
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

> **Threaded pipeline:** Example A is the full orchestration of the **e-commerce
> checkout** thread started in `core-system-prompt` — it shows every agent, its
> CLI adapter, the handoff file it writes, and the gate between stages. The
> artifact names match the schemas in "Standard Handoff Interfaces". Example B is
> the original condensed SaaS dashboard edge case.

### Example A — Checkout pipeline, 8-agent execution map (thread)

```markdown
User: Orchestrate the e-commerce checkout redesign end-to-end across specialized
agents. Target: completed-checkout 61% -> 75%, mobile-first, ship when
review-critique >= 95/120.
```

Response:

```markdown
## Orchestration Execution Map
Run ID: checkout-redesign
Handoff directory: `.agent-handoffs/checkout-redesign/`
Topology: Sequential (with a conditional refinement loop at the Review gate)

| Step | Agent | CLI adapter | Skill | Output | Gate |
|---|---|---|---|---|---|
| 0 | Context Agent | gemini | prompt-context-loading | 00-context.md | — |
| 1 | UX Agent | claude | ux-decision-framework | 10-ux-decision.md | UX brief has 8 sections |
| 2 | UI Agent | claude | ui-generation-structured | 20-ui-blueprint.md | Has builder prompts |
| 3 | Design System Agent | gemini | design-system-governance | 30-design-system-audit.md | PASS (no magic values) |
| 4 | Frontend Agent | gemini | code-generation | 40-frontend-implementation.md | 5 states + types |
| 5 | Review Agent | claude | review-critique | 50-review-scorecard.md | >= 95/120 |
| 6 | Refinement Agent | gemini | refinement-workflow | 60-refinement-log.md | (conditional) |
| 7 | Safety Agent | claude | anti-patterns-detector | 70-anti-patterns.md | No zero-tolerance |

### Handoff Compliance Validation
- Current transition: Context (00) -> UX (10)
- Required input: `00-context.md` with product goals, target metrics, stack
- Status: PASS — brief contains metrics (61% -> 75%), stack (Next.js + Tailwind + shadcn), WCAG target
- Conditional gate: if Step 5 scores < 95/120, route to Step 6 (Refinement) then back to Step 5 (re-score). Three-strike circuit breaker applies.

### Task Assignment Brief (for the next agent: UX Agent)
UX Agent: read `.agent-handoffs/checkout-redesign/00-context.md`, produce
`10-ux-decision.md` matching the UX_DECISION schema. Include: Product Context
(JTBD), priority tasks (P0 place order, P1 recover declined card, P2 apply coupon),
journey with success/error states, Assist strategy justification, IA + wireframe
zones (sticky summary), accessibility rules (>=44px targets, 4.5:1 contrast), and
trade-offs (multi-step vs one-page). Do NOT create visual layouts yet — that is
Step 2 (UI Agent).

### Resilience Notes
- Circuit breaker: if Review (Step 5) fails < 95/120 for 3 consecutive iterations,
  halt and produce a Human Escalation Report (per the Three-Strike Rule).
- Retry budget: max 2 retries per stage for non-fatal errors (e.g., a missing
  aria-label). Fatal errors (e.g., XSS, missing error state) do not retry — escalate.
- Idempotency: re-running Step 4 with the same `30-design-system-audit.md` must
  produce identical `CheckoutPanel.tsx`, no duplicate code insertion.

> Final handoff: `70-anti-patterns.md` with PASS status is the ship artifact. The
> runner logs every agent's input/output under `.agent-handoffs/checkout-redesign/logs/`.
```

### Example B — SaaS billing dashboard (edge case)

```markdown
User: Set up a multi-agent workflow for a SaaS billing dashboard redesign.
```

Response:

```markdown
## Orchestration Execution Map
Run ID: billing-dashboard-redesign
Handoff directory: `.agent-handoffs/billing-dashboard-redesign/`

<!-- ORIGINAL TABLE PRESERVED FOR HISTORY:
| Step | Agent | CLI adapter | Skill | Output |
|---|---|---|---|---|
| 0 | Context Agent | codex | prompt-context-loading | 00-context.md |
| 1 | UX Agent | claude | ux-decision-framework | 10-ux-decision.md |
| 2 | UI Agent | claude | ui-generation-structured | 20-ui-blueprint.md |
| 3 | Frontend Agent | codex | code-generation | 40-frontend-implementation.md |
| 4 | Review Agent | claude | review-critique | 50-review-scorecard.md |
-->

| Step | Agent | CLI adapter | Skill | Output |
|---|---|---|---|---|
| 0 | Context Agent | gemini | prompt-context-loading | 00-context.md |
| 1 | UX Agent | claude | ux-decision-framework | 10-ux-decision.md |
| 2 | UI Agent | claude | ui-generation-structured | 20-ui-blueprint.md |
| 3 | Frontend Agent | gemini | code-generation | 40-frontend-implementation.md |
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

## Common Pitfalls
1. Orchestrating without explicit CLI adapters — every agent handoff must declare which CLI/transport runs the next step.
2. Passing context by copy-paste between agents — use markdown handoff files written to disk so each agent reads the same artifact.
3. Skipping the artifact contract — every handoff must specify input format, output format, and validation step.
4. Running agents in parallel when they have data dependencies — sequence matters; parallelize only independent sub-tasks.
5. Letting one agent silently override another's decision — log every agent's output and resolve conflicts via the orchestrator, not by last-write-wins.

## Verification Checklist
- [ ] Each agent role is named with its CLI adapter (e.g., Claude Code, Codex, Gemini CLI).
- [ ] Every handoff writes a markdown artifact (e.g., `handoff-ux-to-ui.md`) that the next agent reads.
- [ ] Artifact contracts specify: required input fields, output format, validation command.
- [ ] Agent execution order respects data dependencies — independent tasks may parallelize.
- [ ] Final orchestration log records every agent's input, output, and decision; conflicts are resolved with explicit rationale.

