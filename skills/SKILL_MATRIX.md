<!-- markdownlint-disable -->

# Skill Matrix - AI Design Engineer

## Purpose

Use this matrix to choose the right production skill for each situation. Start
with context loading when repository state or conventions may affect the work.

## Skill Decision Guide

<!-- ORIGINAL TABLE PRESERVED FOR HISTORY:
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
-->

| Scenario | Recommended skill(s) | Why | Time estimate | Token Est. |
|---|---|---|---|---|
| Start a session or load repo context | `prompt-context-loading` | Reads canonical guides, conventions, progress files, and routing context | 5-10 min | ~1,100 |
| New project kickoff | `core-system-prompt`, `ux-decision-framework` | Establishes role, constraints, user tasks, and UX rationale | 10-20 min | ~2,200 |
| Clarify product goals | `core-system-prompt` | Aligns the AI to product strategy and success metrics | 5-10 min | ~1,200 |
| Make UX decisions | `ux-decision-framework` | Structures journeys, task flows, IA, and trade-offs | 15-30 min | ~1,500 |
| Generate UI screens | `ui-generation-structured` | Creates UI with explicit constraints and system rules | 20-30 min | ~1,800 |
| Enforce design consistency | `design-system-governance` | Audits tokens, components, and patterns | 15-20 min | ~1,600 |
| Convert UI to code | `code-generation` | Produces production-ready frontend code | 20-40 min | ~3,200 |
| Review quality | `review-critique` | Scores output and prioritizes fixes | 10-15 min | ~1,400 |
| Iterate output | `refinement-workflow` | Improves design/code until production ready | 15-30 min | ~1,800 |
| Catch recurring mistakes | `anti-patterns-detector` | Identifies anti-patterns before shipping | 10-15 min | ~1,700 |
| Coordinate agents | `multi-agent-workflow` | Runs a pipeline with CLI adapters and markdown handoffs | 30-60 min | ~2,500 |

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

## Token Budgets, Model Selection & Active Profiles

Loading too many skills simultaneously consumes significant context window (up to 18,000+ tokens) before you start. Use the following guidelines and profiles to optimize resource usage:

### 1. Model Selection Matrix

| Task Complexity | Typical Skills | Recommended Model | Rationale / Cost Strategy |
| :--- | :--- | :--- | :--- |
| **High** (Architectural Planning, Code Generation) | `code-generation`, `ux-decision-framework` | `claude-3-5-sonnet-latest` or `gemini-1.5-pro` | High reasoning capability, accurate component structure. Use for core implementation. |
| **Medium** (Review, Quality Gates, Refinement) | `review-critique`, `refinement-workflow`, `anti-patterns-detector` | `claude-3-5-sonnet-latest` or `gemini-1.5-flash` | Requires balanced logical analysis. Gemini 1.5 Flash offers low latency/cost for fast review runs. |
| **Low** (Context Loading, Simple Styling) | `prompt-context-loading`, `design-system-governance` | `claude-3-5-haiku` or `gemini-1.5-flash` | Standard text mapping and verification. Extremely cost-effective for repetitive audits. |

### 2. Input/Output Token Estimation Guidelines

Before running an LLM session, estimate your token consumption using this framework:

- **Base Context (Repository Rules & Guides):** ~5,000 - 8,000 tokens (loaded via `prompt-context-loading`).
- **Active Skills (System Prompts):** ~1,100 to ~3,200 tokens per loaded skill (see table above).
- **Target Component File Size:** ~1,000 - 4,000 tokens per file (approx. 4 characters per token).
- **Expected Output Code Size:** ~2,000 - 6,000 tokens (for full component trees with styles).

**Session Budgets (Estimates):**
- **Draft Session:** Input ~10k tokens, Output ~3k tokens. Cost-efficient models recommended.
- **Refinement Session:** Input ~12k tokens (including previous draft + feedback), Output ~1k tokens. High-precision models recommended.

### 3. Active Profiles

#### Minimal Profile (Coding Focus)
**Total Token Est:** ~7,100 tokens
- `prompt-context-loading`
- `core-system-prompt`
- `code-generation`
- `review-critique`

<!-- Original Full Profile block commented out to preserve history (Rule #1)
#### Full Profile (End-to-End Orchestrated Design)
**Total Token Est:** ~18,000+ tokens
- Load all 10 active skills. Recommended only for complex orchestrations or high-context design planning.
-->
#### Full Profile (End-to-End Orchestrated Design)
**Total Token Est:** ~18,000+ tokens
- Load all 10 active skills. Recommended only for complex orchestrations or high-context design planning.

### 4. Just-in-Time (JIT) Dynamic Skill Loading Strategy
To conserve context tokens, reduce cost, and optimize latency, do not load the Full Profile by default. Load only the relevant sub-profile for the active task (e.g., JIT load only what is necessary).

#### JIT Sub-Profiles Map

| Sub-Profile Name | Scope of Task | Skills Loaded JIT | JIT Input Token Est. | Latency Target |
| :--- | :--- | :--- | :--- | :--- |
| **UX Strategy Profile** | User research, journeys, specs | `prompt-context-loading`, `ux-decision-framework` | ~2,600 | Low (< 5s) |
| **UI Wireframing Profile** | UI layouts, design blueprints | `prompt-context-loading`, `ui-generation-structured` | ~2,900 | Low (< 5s) |
| **Coding Focus Profile** | Code gen, styling, components | `prompt-context-loading`, `code-generation` | ~4,300 | Medium (< 10s) |
| **QA & Safety Profile** | Scorecards, audits, error-fixing | `prompt-context-loading`, `review-critique`, `anti-patterns-detector`, `refinement-workflow` | ~6,000 | Low (< 5s) |
| **Orchestration Profile** | Multi-agent execution, pipelines | `prompt-context-loading`, `multi-agent-workflow` | ~3,600 | Low (< 5s) |

#### Latency & Performance Rules (Game AI Principles)
- **Lazy Initialization:** Load system prompts only when a state transition triggers a need for that skill.
- **Cache Hits:** If the agent conversation persists, retain loaded skills. Do not reload them.
- **Fast Path / Slow Path:** Use fast models (e.g., Gemini 1.5 Flash, Claude 3.5 Haiku) for QA & Safety loops (Fast Path) to minimize the waiting time, reserving slow models (e.g., Sonnet 3.5, Pro 1.5) for the Coding Focus Profile (Slow Path).

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
2. `code-generation` — Implement or review the RAG pipeline components (retrieval, generation, evaluation).
3. `review-critique` — Run the standard scorecard plus the conditional RAG/ML Intelligence Audit (RAGAS metrics, Tiered Evaluation Pyramid, context freshness).
4. `anti-patterns-detector` — Check for Prompt Injection vulnerabilities and data safety issues in the inference path.

### Backend Refactoring & API Contract Strategy
When refactoring backend services, API boundaries, or system architecture:
1. `prompt-context-loading` — Load existing API contracts, service maps, and dependency graphs.
2. `code-generation` — Apply Angel's backend boundary rules (API contracts, concurrency, Kill List strategy).
3. `review-critique` — Score engineering quality and verify typed schemas and contract integrity.
4. `refinement-workflow` — Iterate until all API boundaries are clean and redundant code is eliminated.

## Notes

- The matrix helps choose the right skill; it does not force a strict order.
- Use the beginner path for simple design tasks.
- Use the expert path when repeatability, handoffs, and quality gates matter.
- Every production workflow should include review and refinement.
