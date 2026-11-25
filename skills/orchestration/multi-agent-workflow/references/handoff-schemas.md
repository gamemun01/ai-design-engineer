<!-- markdownlint-disable -->
# Multi-Agent Workflow — Handoff Schemas & Agent Specifications

Payload shape examples backing [SKILL.md](../SKILL.md). Read only the section you need.

## Table of Contents

1. [Handoff Artifact Schemas](#1-handoff-artifact-schemas) — the four YAML+JSON markdown contracts
2. [Agent Roles & Technical Specifications](#2-agent-roles--technical-specifications) — per-agent model, tools, and interface schema
3. [Runtime Invocation Contract](#3-runtime-invocation-contract) — adapter-neutral pseudocode

## 1. Handoff Artifact Schemas

Every transition passes a markdown artifact with YAML frontmatter and a JSON code
block. The frontmatter carries `stage`, `run_id`, `timestamp`; the JSON carries the
stage payload.

Include source revision and actual verification evidence in real artifacts.
Boolean state coverage examples assume applicable states; record N/A states
with reasons separately. Do not invent a compilation command for docs-only work.

### 1.1 UX → UI Handoff Schema (`10-ux-decision.md`)
````markdown
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
````

### 1.2 UI → Frontend Handoff Schema (`20-ui-blueprint.md`)
````markdown
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
````

### 1.3 Frontend → Review Handoff Schema (`40-frontend-implementation.md`)
````markdown
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
  "compilation_command_run": "actual target-project command, or not applicable",
  "verification": {
    "command": "actual command",
    "exit_code": 0,
    "scope": "files or behavior checked",
    "status": "PASS|FAIL|NOT_VERIFIED",
    "unverified": ["remaining checks, if any"]
  }
}
```
````

### 1.4 Review → Refinement Handoff Schema (`50-review-scorecard.md`)
````markdown
---
stage: "REVIEW_CRITIQUE"
run_id: "RUN_UUID"
timestamp: "2026-05-22T00:00:00Z"
---
# Review & Critique Scorecard

```json
{
  "ci_status": "PASS|FAIL|NOT_VERIFIED",
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
````

## 2. Agent Roles & Technical Specifications

Use the roles and contracts below with tools actually available in the authorized runtime.

### Model Configuration

Configure the active models using the following variables. Set the defaults to the
user's configured models available to your runner — the placeholders below are
illustrative, not pinned:

- **Orchestrator/Reasoning Agent Model:** `{{ORCHESTRATOR_MODEL}}` (optimized for textual reasoning, planning, structural layout planning, and auditing).
- **Coder/Frontend Agent Model:** `{{CODER_MODEL}}` (optimized for high-performance React/Next.js and Tailwind compilation).

### 2.1 UX Agent
*   **LLM Model:** `{{ORCHESTRATOR_MODEL}}`
*   **Tool Access:** Read File (for codebases/spec documents), Write File (for writing the output).
*   **Assigned Skill:** `ux-decision-framework`
*   **Handoff Output:** `.agent-handoffs/{run_id}/10-ux-decision.md`
*   **Interface Schema:** Must contain sections for Product Context, Priority Tasks Table, Decision Flow (with success/error transitions), Assist/Control UX Strategy justification, and Keyboard A11y rules.

### 2.2 UI Agent
*   **LLM Model:** `{{ORCHESTRATOR_MODEL}}`
*   **Tool Access:** Read File (reads `10-ux-decision.md`), Write File.
*   **Assigned Skill:** `ui-generation-structured`
*   **Handoff Output:** `.agent-handoffs/{run_id}/20-ui-blueprint.md`
*   **Interface Schema:** Detailed component visual wireframe layouts, mapping spacing values to token scales (e.g. `spacing-sm` = 16px), color assignments (e.g. canvas = `color-bg`), and responsive breakpoints spec (mobile vs desktop).

### 2.3 Design System Agent (Governance Gate)
*   **LLM Model:** `{{ORCHESTRATOR_MODEL}}` or a specialized static analysis script.
*   **Tool Access:** Read File, Write File, and available project token checks (no `validate-token` script is supplied by this repo).
*   **Assigned Skill:** `design-system-governance`
*   **Handoff Output:** `.agent-handoffs/{run_id}/30-design-system-audit.md`
*   **Interface Schema:** Audit checklist checking if spacing, radius, colors, and typography match the Tailwind/CSS mapping. Report must return a PASS status to proceed to code generation.

### 2.4 Frontend Agent
*   **LLM Model:** `{{CODER_MODEL}}`
*   **Tool Access:** Read File (reads `20-ui-blueprint.md` and `30-design-system-audit.md`), Write File (creates actual component `.tsx` files in the project), and terminal Command execution (for running `npm run build` to verify compiling).
*   **Assigned Skill:** `code-generation`
*   **Handoff Output:** `.agent-handoffs/{run_id}/40-frontend-implementation.md` (plus actual generated source files).
*   **Interface Schema:** Complete code output, prop interfaces in TS, imports audit, and implementation logs for all 5 UI States (Ideal, Loading, Empty, Error, and Partial/Truncated states).

### 2.5 Review & Safety Agent (Quality Gate)
*   **LLM Model:** `{{ORCHESTRATOR_MODEL}}`
*   **Tool Access:** Read File, Write File, and the target project's actual validators/linters; this repo uses `npm run lint`, `npm run validate-skill`, and `npm run test:skills`.
*   **Assigned Skills:** `review-critique` (for 0-120 Scorecard) and `anti-patterns-detector` (for pre-shipping safety audit).
*   **Handoff Output:** `.agent-handoffs/{run_id}/50-review-scorecard.md`
*   **Interface Schema:** Scoring scorecard (Breakdown: Visual max 25, UX max 35, Engineering max 25, Performance max 20, Security max 15) and safety check status (PASS/FAIL). Must be >= 95/120 to ship. If failed, compiles bug list and hands off back to the Refinement Agent.

## 3. Runtime Invocation Contract

This repository supplies instructions and artifact shapes, not an executable
multi-agent runner or `scripts/run-agent.js`. Use native agent tools or inspect
the installed CLI's help and official docs before constructing an invocation.
Do not pass a path where an adapter expects prompt text.

Runner-neutral example (pseudocode, not a shell command):

```text
run_agent(
  skill_file = "skills/ux/ux-decision-framework/SKILL.md",
  input_artifact = ".agent-handoffs/<run-id>/00-context.md",
  output_artifact = ".agent-handoffs/<run-id>/10-ux-decision.md",
  model = configured_model,
  permissions = authorized_project_scope
)
```

For each transition, validate required keys and actual values before handoff.
Record revision/source commit and verification commands, exit codes, and scope.
Use `NOT_VERIFIED` when a required check could not run. The JSON examples above
describe payload shapes; they are not formal JSON Schema or a validating runner.
