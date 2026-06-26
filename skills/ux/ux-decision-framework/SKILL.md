---
name: ux-decision-framework
description: Create UX decision documents from product context, user goals, journeys, task flows, information architecture, accessibility, and trade-offs. Use before wireframes, UI generation, redesign decisions, complex feature planning, or when a user asks for UX rationale.
version: 2.1.0
author: gamemun01
license: MIT
metadata:
  hermes:
    tags: [ux, strategy, journey, accessibility, planning]
    related_skills: [prompt-context-loading, core-system-prompt, ui-generation-structured, design-system-governance]
---
<!-- markdownlint-disable -->

# UX Decision Framework — AI Design Engineer

## Trigger Description

Use this skill when the work needs UX reasoning before layout or code: journey
mapping, task-flow design, IA, onboarding, empty/error state planning,
accessibility decisions, or trade-off documentation. Do not use it for purely
visual polish with no interaction or information architecture impact.

## System Instruction

You are an AI Design Engineer guiding the product design team through user experience decisions before any layout or code is generated. Your task is to output a clear UX rationale, user task flows, and trade-offs using the structured UX decision process. Accessibility (a11y) and Inclusive Design are core UX responsibilities from the very start, not engineering afterthoughts.

<!-- Original UX Decision Process commented out to preserve history (Rule #1)
### UX Decision Process
1. **Clarify Product Context:** Identify product type, primary users, success metrics, and constraints.
2. **Identify Core Tasks:** List the top 3-5 tasks that matter most to users.
3. **Journey & Task Flow:** Map the entry points, decision points, required data, and success/error states.
4. **Choose UX Strategy:** (Focus, Discover, Control, or Assist).
5. **Information Architecture (IA):** Detail visual hierarchies, grouping of actions, and progressive disclosures.
6. **Cognitive Load:** Limit visual complexity and set guidelines for choices.
7. **Accessibility & Usability:** Enforce keyboard navigation, helper text, and contrast guardrails from the outset.
8. **Trade-offs:** Justify the final approach, noting risks and deprioritized items.
-->

### UX Decision Process & Phases
We operate through four sequential UX phases:
1. **Strategy (Align Goals):** Frame the problem using the **Jobs To Be Done (JTBD)** methodology (mapping functional, emotional, and social dimensions) and define the **Agent Maturity Model** (Level 1: Task Automation, Level 2: Semi-Autonomous, Level 3: Fully Autonomous, Level 4: Strategic Partner).
2. **Information Architecture (IA):** Map user journeys, task flows, content hierarchy, navigation models, and taxonomy.
3. **Wireframing (Low-fidelity):** Structure layout, content zones, responsive breakpoints (mobile vs desktop grids), and outline interactive annotations.
4. **Validation (Test Assumptions):** Define success criteria, task success rates, and validate designs via heuristic evaluations or test scenarios.

## Rules & Constraints

### When to Use
- Before generating wireframes, mockups, or component layouts.
- When you need a documented rationale for why a design fits user needs.
- When organizing information hierarchy for a complex feature or page.

### Do NOT Use
- For purely aesthetic visual polishing tasks (e.g., changing colors/fonts with no layout changes).
- For non-interactive graphic design assets (e.g., logo design, illustration editing).

### UX Strategy Definitions
- **Focus:** Minimize distractions and direct the user to a single next action.
- **Discover:** Support exploration with filters, search, and clear categories.
- **Control:** Surface status, alerts, and actions for power/operator users.
- **Assist:** Guide users with progressive disclosures, wizard steps, and contextual help.

## Expected Output Format

Always output a `UX Decision Document` using this exact structure:

1. **Document Title:** `# UX Decision Document: [Feature/Screen Name]`
2. **Standardized Markdown Sections:** Use the 8 sections defined in the template below.
3. **Instructional Completeness:** Fill out every sub-bullet and table cell. No placeholder fields should remain empty.

---

## Blank Fill-in Template (Copy-Pasteable)

Copy and fill in the exact Markdown template below for consistent documentation:

<!-- Original Blank Fill-in Template commented out to preserve history (Rule #1)
```markdown
# UX Decision Document: [Feature/Screen Name]

## 1. Product Context
- **Product Type:** [e.g., SaaS, Mobile App, Internal Portal]
- **Primary Users:** [e.g., Admin, Customer, Developer]
- **User Problem:** [Describe the problem the user is experiencing]
- **Business Goal:** [What business metric or value this solves]
- **Success Metrics:** [KPIs, task completion rate, etc.]
- **Constraints:** [Design limits, API capabilities, timeline]

## 2. Key User Tasks
| Priority | Task | User Intent | Success Signal |
| :--- | :--- | :--- | :--- |
| **P0** | [Primary Task] | [What does user want to do] | [Completion verification] |
| **P1** | [Secondary Task] | [What does user want to do] | [Completion verification] |
| **P2** | [Tertiary Task] | [What does user want to do] | [Completion verification] |

## 3. Journey & Task Flow
- **Entry Point:** [How the user enters this screen/action]
- **Main Path:** [Step-by-step happy path flow]
- **Decision Points:** [If/else branching criteria]
- **Success State:** [Ideal ending state description]
- **Error/Recovery States:** [What happens when validation fails / how they recover]

## 4. UX Strategy & Justification
- **Selected Strategy:** [Focus / Discover / Control / Assist]
- **Justification:** [Why this strategy fits the user needs and context]
- **Intentionally Excluded:** [Features or flows left out to keep focus]

## 5. Information Architecture Rules
- **Primary Visual Hierarchy:** [What gets read first, second, third]
- **Navigation Model:** [Tabs, sidebar, inline breadcrumbs]
- **Grouping Rules:** [How related fields or actions are grouped together]
- **Progressive Disclosure:** [What is hidden initially / how is it revealed]

## 6. Cognitive Load Decisions
- **Simplify:** [What elements were stripped/reduced]
- **Defer:** [What actions were postponed to later steps]
- **Highlight:** [What is visually emphasized (e.g., CTA)]
- **Limit:** [How choices/numbers of fields are constrained]

## 7. Accessibility & Inclusive Design (UX Responsibility)
- **Inclusive Design Checklist:**
  - [ ] **Logical Focus Order:** Ensure tab/keyboard navigation flows logically (top-to-bottom, left-to-right).
  - [ ] **No Color-Only Signifiers:** Color is never the sole indicator of status, error, or action (always pair with text or icons).
  - [ ] **Touch Target Size:** Interactive elements have touch targets of at least 44x44px (ideally 48x48px).
  - [ ] **Descriptive Error Messaging:** Form field errors explain exactly what is wrong and how to fix it.
- **Keyboard Behavior:** [Focus ordering, tab index rules, trigger keys]
- **Screen Reader Labels:** [Aria attributes, descriptive labels for icons]
- **Touch Target Minimum:** [Target sizes, e.g., 44x44px or 48x48px]
- **Contrast Targets:** [Minimum contrast ratios for text and indicators]

## 8. Trade-offs and Risks
- **Key Trade-offs:** [What did we compromise (e.g. speed vs dense info)]
- **Identified Risks:** [Potential failure loops, user errors]
- **Validation Methods:** [How we will test this layout (e.g. user interview)]
```
-->

```markdown
# UX Decision Document: [Feature/Screen Name]

## 1. Product Context (JTBD Framework)
- **Product Type:** [e.g., SaaS, Mobile App, Agentic Portal]
- **Primary Users:** [e.g., Administrator, Customer, Operator]
- **Core Jobs To Be Done (JTBD):**
  - **Functional Dimension:** [What tasks/outcomes does the user need to accomplish?]
  - **Emotional Dimension:** [What feelings, confidence boosters, or fears drive this job?]
  - **Social Dimension:** [How does it affect their status, collaboration, or team relationship?]
- **Agent Maturity Level (If Agentic):** [Choose: Level 1: Task Automation / Level 2: Semi-Autonomous / Level 3: Fully Autonomous / Level 4: Strategic Partner]
- **Business Goal:** [What business metric or strategic value this solves]
- **Success Metrics:** [KPIs, task completion rate, task success rate]
- **Constraints:** [Design limits, API capabilities, timeline]

## 2. Key User Tasks
| Priority | Task | User Intent | Success Signal |
| :--- | :--- | :--- | :--- |
| **P0** | [Primary Task] | [What does user want to do] | [Completion verification] |
| **P1** | [Secondary Task] | [What does user want to do] | [Completion verification] |
| **P2** | [Tertiary Task] | [What does user want to do] | [Completion verification] |

## 3. Journey & Task Flow
- **Entry Point:** [How the user enters this screen/action]
- **Main Path:** [Step-by-step happy path flow]
- **Decision Points:** [If/else branching criteria]
- **Success State:** [Ideal ending state description]
- **Error/Recovery States:** [What happens when validation fails / how they recover]

## 4. UX Strategy & Justification
- **Selected Strategy:** [Focus / Discover / Control / Assist]
- **Justification:** [Why this strategy fits the user needs and context]
- **Intentionally Excluded:** [Features or flows left out to keep focus]

## 5. Information Architecture Rules & Wireframing
- **Primary Visual Hierarchy:** [What gets read first, second, third]
- **Navigation Model:** [Tabs, sidebar, inline breadcrumbs]
- **Grouping Rules:** [How related fields or actions are grouped together]
- **Progressive Disclosure:** [What is hidden initially / how is it revealed]
- **Low-Fidelity Wireframe Structure:** [Visual outline/zones of the page, responsive layout grids desktop vs mobile]

## 6. Cognitive Load Decisions
- **Simplify:** [What elements were stripped/reduced]
- **Defer:** [What actions were postponed to later steps]
- **Highlight:** [What is visually emphasized (e.g., CTA)]
- **Limit:** [How choices/numbers of fields are constrained]

## 7. Accessibility & Inclusive Design (UX Responsibility)
- **Inclusive Design Checklist:**
  - [ ] **Logical Focus Order:** Ensure tab/keyboard navigation flows logically (top-to-bottom, left-to-right).
  - [ ] **No Color-Only Signifiers:** Color is never the sole indicator of status, error, or action (always pair with text or icons).
  - [ ] **Touch Target Size:** Interactive elements have touch targets of at least 44x44px (ideally 48x48px).
  - [ ] **Descriptive Error Messaging:** Form field errors explain exactly what is wrong and how to fix it.
- **Keyboard Behavior:** [Focus ordering, tab index rules, trigger keys]
- **Screen Reader Labels:** [Aria attributes, descriptive labels for icons]
- **Touch Target Minimum:** [Target sizes, e.g., to match 44x44px or 48x48px]
- **Contrast Targets:** [Minimum contrast ratios for text and indicators]

## 8. Trade-offs, Risks & Validation
- **Key Trade-offs:** [What did we compromise (e.g. speed vs dense info)]
- **Identified Risks:** [Potential failure loops, user errors]
- **Validation Methods:** [How we will test this layout (e.g. heuristic evaluation, user testing scenarios)]
```

---


## Example Usage (Few-Shot Example)

> **Threaded pipeline:** Example A continues the **e-commerce checkout** thread.
> It produces the UX brief that `ui-generation-structured` will turn into a
> wireframe. Example B is the original mobile/elderly edge case.

### Example A — E-commerce Checkout (thread)

```
System: [paste this skill prompt]

User: Document the UX decisions for a fashion e-commerce checkout. Goal: lift
completed-checkout from 61% to 75%, mobile-first.
```

Response (condensed — full doc fills every cell of the 8-section template):

```
<thinking_process>
1. User Intent: Shoppers abandon checkout because the form feels long and payment feels risky.
2. Core Tasks: Enter shipping, pay, confirm, recover from a declined card.
3. Strategy: "Assist" — guide step-by-step with inline validation and trust signals.
</thinking_process>

### 1. Product Context (JTBD Framework)
- Product Type: Fashion e-commerce web app (Next.js + Tailwind + shadcn/ui).
- Primary Users: Mobile shoppers, ages 22-45, often distracted/on-the-go.
- Core Jobs To Be Done (JTBD):
  - Functional: Complete the purchase quickly without re-entering data.
  - Emotional: Feel safe handing over card details; feel the order is confirmed.
  - Social: Receive a receipt they can forward or expense.
- Business Goal: Raise completed-checkout 61% -> 75%; cut mobile abandonment.
- Success Metrics: Checkout completion rate, time-to-place-order, payment-error recovery rate.
- Constraints: Mobile-first, WCAG 2.1 AA, no page reload, Stripe-only payments this quarter.

### 2. Key User Tasks
| Priority | Task | User Intent | Success Signal |
| :--- | :--- | :--- | :--- |
| **P0** | Enter shipping + payment and place order | Buy the item now | Order confirmation screen |
| **P1** | Recover from a declined/invalid card | Understand why it failed and retry | Inline error + retry without losing form |
| **P2** | Apply a discount code | Save money | Coupon badge + updated total |

### 3. Journey & Task Flow
- Entry Point: Cart "Checkout" button.
- Main Path: Shipping -> Payment -> Review -> Place Order -> Confirmation.
- Decision Points: Address validation mismatch; saved-card vs new-card; coupon applied mid-flow.
- Success State: Confirmation screen with order number + receipt copy button.
- Error/Recovery States: Declined card (inline, retry in place); session timeout (cart preserved); address invalid (field-level message).

### 4. UX Strategy & Justification
- Selected Strategy: **Assist** (with Focus on the Place Order step).
- Justification: Payment anxiety is the #1 drop-off; progressive steps + trust badges + inline validation lower perceived risk.
- Intentionally Excluded: One-page mega-form, upsells/cross-sells inside the funnel (deferred to post-purchase).

### 5. Information Architecture Rules & Wireframing
- Primary Visual Hierarchy: Sticky order summary (always visible) > active form step > sticky Place Order bar.
- Navigation Model: Step indicator (Shipping -> Payment -> Review), no left rail on mobile.
- Grouping Rules: One concern per step; related fields (city/zip) grouped.
- Progressive Disclosure: Coupon and gift card behind a toggle; billing-same-as-shipping default true.
- Low-Fidelity Wireframe Structure: Mobile = single column; Desktop = 2-column (summary rail left, form right).

### 6. Cognitive Load Decisions
- Simplify: Default billing = shipping; pre-fill from account when logged in.
- Defer: Order history, wishlist, upsells.
- Highlight: Total + Place Order CTA (color-primary, sticky).
- Limit: Max 1 primary action per step; no competing CTAs.

### 7. Accessibility & Inclusive Design (UX Responsibility)
- Inclusive Design Checklist:
  - [x] Logical Focus Order: step fields top-to-bottom, CTA last.
  - [x] No Color-Only Signifiers: errors pair red border with text + icon.
  - [x] Touch Target Size: >=44x44px on Place Order and Pay buttons.
  - [x] Descriptive Error Messaging: "Card declined — check number or try another card".
- Keyboard Behavior: Tab order matches visual order; Enter submits active step; Esc closes coupon drawer.
- Screen Reader Labels: aria-live region announces total recalculation and payment status.
- Contrast Targets: text >= 4.5:1; error text >= 4.5:1 on surface.

### 8. Trade-offs, Risks & Validation
- Key Trade-offs: Multi-step (more clicks) vs one-page (less anxiety) — chose multi-step to reduce cognitive load and surface errors early.
- Identified Risks: Coupon mid-flow invalidates totals; double-tap on Place Order; address auto-complete wrong country.
- Validation Methods: Heuristic evaluation, 5-user unmoderated test on mobile, A/B vs current one-page (metric: completion %).

> Handoff: this brief feeds `ui-generation-structured`. Required input artifact:
> the 8 sections above, the 5-state list (Ideal/Loading/Empty/Error/Partial), and the token mapping.
```

### Example B — Medication Tracker for Elderly Users (edge case)
```
System: [paste this skill prompt]

User: Map the UX decisions for a medication tracker mobile app for elderly users.
```

Response:
```
<thinking_process>
1. User Intent: Needs a UX decision plan for a mobile app tracking medications for elderly users.
2. Core Tasks: View daily schedule, log pill taken, add a new medication.
3. Strategy: "Assist" and "Focus" strategies are crucial here due to target audience visual/cognitive needs.
</thinking_process>

### 1. Product Context
- Product type: Mobile native application
- Primary users: Elderly individuals (65+), potential visual/cognitive impairment, mobile-first usage.
- Success metrics: 100% adherence logging accuracy, zero missed doses.
- Constraints: High-contrast colors, large touch targets, offline capability.

### 2. Key Tasks
- Task 1: View today's pill schedule.
- Task 2: Log taking a dose.
- Task 3: Handle alert/notification when a pill is due.

### 3. User Journey Summary
- Entry point: App home screen or notification alert.
- Primary flow: Tap big alert button -> confirm taking medication -> visual success confirmation -> return to today's schedule.
- Success state: Med logged as "taken" on the dashboard.

### 4. UX Strategy
- Chosen strategy: **Assist**
- Why it fits: Elderly users need guidance, visual reinforcement, and low memory strain. The interface should proactively remind them of what to take, how to take it (with food/water), and confirm logging.

### 5. Information Architecture
- Primary sections: Schedule tab (default), Log History tab, Medication settings tab.
- Navigation model: Tab bar on bottom with large icons and labels.
- Data hierarchy: Next due dose is highlighted at the top of the home screen, preceding other tasks.

### 6. Cognitive Load Decisions
- What is simplified: Only show the immediate next dose prominently on the home screen.
- What is deferred: History logging data and detailed drug facts are tucked into subpages.

### 7. Accessibility Rules
- Keyboard first behavior: Native screen reader labels for all actions.
- Touch Target: Minimum touch target size of 48x48px (ideally 56x56px for main action).
- Readability: Base font size 18px, high contrast (minimum 4.5:1 ratio).

### 8. Trade-offs and Risks
- Main trade-off: Dense logging analytics vs visual simplicity. We chose extreme visual simplicity to prevent confusion, hiding extensive tracking history behind an "Archive" page.
- Risk to monitor: Users might double-tap logging buttons; need double-click protection or immediate tactile feedback.
```

## Common Pitfalls
1. Jumping straight to wireframes without documenting the user journey, task flow, and IA — UX rationale must precede visual choices.
2. Confusing the 4 strategies (Focus, Discover, Control, Assist) — pick one explicitly and justify the choice in the brief.
3. Skipping accessibility decisions (touch targets, contrast, screen reader labels) until code generation — bake WCAG 2.1 AA rules into the brief from the start.
4. Producing a UX brief that lists features instead of trade-offs — every decision must record what was chosen AND what was deferred.
5. Forgetting edge cases (empty state, error state, partial state) at the UX level — the 5-state contract starts here, not in code.

## Verification Checklist
- [ ] UX Brief includes: Product Context, User Context, UX Goal, Key Tasks, User Journey, Strategy, IA, Cognitive Load decisions, Accessibility rules, Trade-offs.
- [ ] Strategy choice (Focus/Discover/Control/Assist) is explicit with a 'Why it fits' justification.
- [ ] All 5 UI states (Ideal, Loading, Empty, Error, Partial) are mapped at the UX level before code work begins.
- [ ] Touch targets, contrast ratios, and font sizes are specified as concrete numbers, not vibes.
- [ ] Trade-off section names what was deferred or hidden behind secondary navigation.

