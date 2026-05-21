# Multi-Agent Workflow — AI Design Engineer

## Purpose
This skill defines the expert workflow for orchestrating multiple AI agents across UX, UI, code, review, and accessibility.

## When to use
- When you want a repeatable team-style pipeline
- When projects require clear handoffs and role separation
- When you need quality checks at each stage

## Output format
Produce:
- agent responsibilities
- handoff specifications
- workflow sequence
- artifact contracts

---

## Agent roles
Use these agents in sequence.

### 1. UX Agent
Role:
- define product context
- map user tasks and journeys
- make UX decisions before design

Deliverables:
- product brief
- user personas
- task flows
- decision rationale

### 2. UI Agent
Role:
- generate structured UI based on the UX Agent output
- follow design system governance
- produce component inventory and responsive wireframes

Deliverables:
- UI prompt
- screen structure
- component specifications
- accessibility notes

### 3. Frontend Agent
Role:
- convert the verified UI into production-ready code
- create semantic markup and component code
- include state and behavior notes

Deliverables:
- component tree
- React/Tailwind code
- props and data contract documentation
- loading/error state handling

### 4. Review Agent
Role:
- critique the UI and code
- score each dimension objectively
- prioritize fixes for production readiness

Deliverables:
- review report
- visual/UX/engineering scores
- prioritized fixes

### 5. Accessibility Agent
Role:
- audit accessibility and compliance
- validate keyboard flow, ARIA usage, and contrast
- verify WCAG 2.1 AA criteria

Deliverables:
- accessibility audit
- issue list
- remediation recommendations

---

## Workflow sequence
Follow this sequence for a complete project.

1. UX Agent runs first.
2. UI Agent consumes the UX brief.
3. Design system governance audits the UI output.
4. Frontend Agent converts the approved UI to code.
5. Review Agent critiques the generated work.
6. Accessibility Agent validates the final output.
7. Refinement workflow loops until the score threshold is met.

---

## Handoff specifications
Define what each handoff must include.

### UX → UI
- product context summary
- user personas and goals
- task flows and success criteria
- UX strategy and trade-offs

### UI → Frontend
- screen structure and component inventory
- token-based spacing and styles
- interactive states and responsive rules
- accessibility notes

### Frontend → Review
- code files and component tree
- behavior notes and state handling
- known limitations and assumptions
- testable edge cases

### Review → Accessibility
- review scorecard
- identified issues
- areas needing deeper compliance checks

---

## Artifact contracts
Use these contracts to keep handoffs consistent.

### UX brief contract
- Product goal
- Persona profile
- Top tasks
- Primary user flow
- Success metrics

### UI artifact contract
- Page structure
- Component list
- Interaction rules
- Accessibility guardrails

### Code contract
- Component tree
- Semantic HTML
- Token-based styles
- Props/data contracts

### Review contract
- Visual score
- UX score
- Engineering score
- Priority fix list

### Accessibility contract
- Keyboard support
- ARIA usage
- Contrast validation
- Error state handling

---

## Example orchestration
```
1. UX Agent: defines a compliance dashboard for analysts.
2. UI Agent: generates a structured dashboard layout using the design system.
3. Governance check: confirms token usage, spacing, and component contracts.
4. Frontend Agent: builds React/Tailwind components and notes states.
5. Review Agent: scores the output 7.8/10 and identifies mobile issues.
6. Accessibility Agent: catches missing focus styles and label issues.
7. Refinement Workflow: applies fixes and rechecks until 8.0+.
```

---

## How to use
- Use the multi-agent workflow when the project scope is larger than a single screen.
- Use it when multiple stakeholders or handoffs exist.
- Keep each agent's output explicit and machine-readable.
- Avoid skipping the review or accessibility stages.

## How to use next
- After this workflow, create `SKILL_MATRIX.md` for scenario mapping.
- Use `ANTI_PATTERNS.md` to document what not to do in the pipeline.
