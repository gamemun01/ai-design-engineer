# UX Decision Framework — AI Design Engineer

## Purpose
This file guides the AI Design Engineer through UX decisions before any UI or code generation begins.

## When to use
- Before generating wireframes, mockups, or component layouts
- When you need a rationale for why a design works for users
- When you want to make decisions based on tasks, flows, and user context

## Output format
Produce a decision document with explicit recommendations, user journeys, task flows, and trade-offs.

---

## UX decision process
Use this structured process for every product, feature, or screen.

### 1. Clarify the product context
- Product type: dashboard, admin panel, consumer app, internal tool, portal
- Primary users: role, skill level, environment, device preference
- Key outcomes: what users must accomplish and how success is measured
- Business constraints: compliance, security, branding, operating hours

### 2. Identify the most important user tasks
List the top 3–5 tasks that matter most.
- What does the user need to do first?
- What is the highest-value action?
- What task should be easiest and fastest?

### 3. Define the user journey and task flow
For each key task, map the steps from start to completion:
- Entry point
- Decision points
- Required information
- Success state
- Error/fallback state

### 4. Choose the UX strategy
For the product, decide on one of these primary strategies:
- Focus: minimize distractions and direct the user to a single next action
- Discover: support exploration with filters, search, and clear categories
- Control: surface status, alerts, and actions for power users
- Assist: guide users with progressive disclosures and clear help

### 5. Set information architecture rules
- Group related actions and data together
- Keep primary actions visible and secondary actions hidden in overflow or contextual menus
- Use progressive disclosure for advanced or low-frequency controls
- Surface the user’s current state, next step, and why it matters

### 6. Manage cognitive load
- Avoid more than 3 primary choices in a single view
- Show only relevant details for the current task
- Use visual hierarchy to distinguish primary content from secondary information
- Keep labels short, descriptive, and actionable

### 7. Apply accessibility and usability guardrails
- Ensure all states can be reached by keyboard
- Provide clear labels, status text, and feedback for actions
- Avoid dense tables and overload; use cards, filters, or summary metrics when appropriate
- Keep contrast, spacing, and affordances production-ready

### 8. Document the trade-offs
For each major decision, explain:
- Why this approach is best for users
- What was deprioritized
- What assumptions are being made
- What risks should be reviewed later

---

## Decision template
Use this template when writing the decision document.

1. Product context
   - Product type:
   - Primary users:
   - Success metrics:
   - Constraints:

2. Key tasks
   - Task 1:
   - Task 2:
   - Task 3:

3. User journey summary
   - Entry point:
   - Primary flow:
   - Success state:

4. UX strategy
   - Chosen strategy:
   - Why it fits:

5. Information architecture
   - Primary sections:
   - Navigation model:
   - Data hierarchy:

6. Cognitive load decisions
   - What is simplified:
   - What is deferred:

7. Accessibility rules
   - Keyboard first behavior:
   - Error handling:
   - Readability:

8. Trade-offs and risks
   - Main trade-off:
   - Risk to monitor:

---

## Example
For a compliance monitoring dashboard used by operations analysts:

1. Product context
   - Product type: Monitoring dashboard for compliance alerts
   - Primary users: Experienced analysts, desktop-first, need fast filtering and status clarity
   - Success metrics: time to identify top alerts, time to assign actions, error reduction
   - Constraints: must support keyboard only, fixed corporate branding, live data updates

2. Key tasks
   - Task 1: identify critical alerts
   - Task 2: triage and assign follow-up actions
   - Task 3: review trends and escalate issues

3. User journey summary
   - Entry point: dashboard summary with top alerts and status cards
   - Primary flow: filter by severity → inspect alert details → assign action
   - Success state: alert assigned and status updated within 2 minutes

4. UX strategy
   - Chosen strategy: Control
   - Why it fits: Analysts need immediate visibility and fast action, not discovery mode

5. Information architecture
   - Primary sections: Alert summary, alert list, details panel, action panel
   - Navigation model: top-level filters + left-side status summary + contextual actions
   - Data hierarchy: critical alerts first, then actionable items

6. Cognitive load decisions
   - What is simplified: only top 3 severity filters shown initially
   - What is deferred: advanced filtering moved to an expandable panel

7. Accessibility rules
   - Keyboard first behavior: all filters and actions are tabbable
   - Error handling: clear inline validation for required action fields
   - Readability: high contrast, clear headings, compact cards

8. Trade-offs and risks
   - Main trade-off: more detail vs speed; chose speed for analysts
   - Risk to monitor: users may need more context for low-severity alerts

---

## How to use with other skills
- Start here after `core-system-prompt.md`.
- Use this document to define the UX before generating UI with `ui-generation-structured.md`.
- Keep the decision rationale in the review cycle so critique and refinement are grounded in explicit goals.
