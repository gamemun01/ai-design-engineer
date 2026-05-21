# UI Generation Structured — AI Design Engineer

## Purpose
This skill teaches the AI Design Engineer how to generate user interfaces with structure, constraints, and consistency instead of vague creative prompts.

## When to use
- After UX decisions are made
- Before visual mockups or code generation
- When you need multiple UI variants that follow the same system

## Output format
Produce an AI-ready prompt with:
- product context
- user goals
- constraints
- design system rules
- component structure
- accessibility requirements

---

## 8-layer prompt architecture
Use these eight layers in every UI generation prompt.

### 1. Product context
Describe the product, user role, business goal, and success metrics.

### 2. User goals
List the top user tasks and the desired outcome.

### 3. UX strategy
State the chosen strategy: Focus, Discover, Control, or Assist.

### 4. Visual direction
Define the aesthetic tone, spacing scale, color use, and the brand feel.

### 5. Layout rules
Specify page structure, navigation model, responsive behavior, and content hierarchy.

### 6. Component rules
Describe component types, spacing, alignment, and interaction patterns.

### 7. Interaction rules
List user actions, feedback states, transitions, and keyboard behavior.

### 8. Technical constraints
Include accessibility, semantic HTML, mobile behavior, and code compatibility.

---

## Guided prompt template
Use this template when asking the AI to generate UI.

```
You are an AI Design Engineer building production-ready UI.

1. Product context:
- Product type:
- Primary user persona:
- Main business goal:
- Success metric:

2. User goals:
- Goal 1:
- Goal 2:
- Goal 3:

3. UX strategy:
- Strategy:
- Why:

4. Visual direction:
- Tone:
- Spacing scale:
- Color usage rules:
- Typography feel:

5. Layout rules:
- Screen structure:
- Navigation model:
- Responsive behavior:
- Content hierarchy:

6. Component rules:
- Primary components:
- Card/list rule:
- Button hierarchy:
- Form/control rule:

7. Interaction rules:
- Primary actions:
- Feedback states:
- Empty/error states:
- Keyboard support:

8. Technical constraints:
- Accessibility standard:
- Semantic HTML requirement:
- Mobile-first rule:
- Code system:

Deliverables:
- Provide a short rationale for the UX and layout choices.
- Provide a simplified component inventory.
- Provide a responsive wireframe description for desktop and mobile.
- Provide a top-level page structure in bullet format.
```

---

## Constraint examples
Use explicit constraints to avoid vague output.

### Do this
- Use a left-side status summary and a right-side details panel.
- Keep primary actions visible and secondary actions in a dropdown.
- Use a 4-step summary card for user progress.
- Use color only for status states, not decorative gradients.

### Not this
- Do not create a large hero section.
- Do not use random decorative imagery.
- Do not add more than 6 distinct controls on one screen.
- Do not rely on color alone to convey status.

---

## Design system integration
Always tie UI generation to the design system.

### Token rules
- Use spacing values: 8, 12, 16, 24, 32, 40.
- Use typography sizes: 12, 14, 16, 18, 20, 24.
- Use color roles: primary, accent, background, surface, border, success, warning, danger.

### Component rules
- Buttons: primary, secondary, tertiary
- Cards: status cards, activity cards, detail cards
- Tables: compact, sortable, responsive
- Forms: inline labels, clear field groups, accessible validation

### Accessibility rules
- All text contrast must meet WCAG AA.
- All buttons and links must be keyboard focusable.
- Use clear labels for inputs and actions.
- Provide explicit error, empty, and loading states.

---

## Example output request
```
Generate a production-ready admin dashboard UI for compliance analysts.

Product context:
- Product type: Compliance operations dashboard
- User persona: analyst, desktop-first, needs fast triage
- Main business goal: reduce time to resolve high-priority alerts
- Success metric: < 3 min to assign action for critical alerts

User goals:
- Identify critical alerts
- Review alert details
- Assign follow-up actions

UX strategy:
- Strategy: Control
- Why: power users require direct access to status and actions

Visual direction:
- Tone: calm, functional, data-focused
- Spacing scale: 16px base, 24px section gaps
- Color usage rules: status colors only, neutral surface for backgrounds
- Typography feel: compact, readable, clear hierarchy

Layout rules:
- Screen structure: summary cards on top, table list below, detail side panel on right
- Navigation model: top filter bar, secondary tabs for alert categories
- Responsive behavior: collapse side panel to bottom sheet on mobile
- Content hierarchy: status overview > list > detail

Component rules:
- Primary components: status cards, table, detail panel, action menu
- Card/list rule: use cards for summary and a table for list details
- Button hierarchy: primary Confirm, secondary Filter, tertiary More actions
- Form/control rule: search, status filter, bulk action dropdown

Interaction rules:
- Primary actions: view details, assign action, change status
- Feedback states: success toast, inline validation, empty state guidance
- Empty/error states: show contextual help text with next action
- Keyboard support: all controls accessible, focus state visible

Technical constraints:
- Accessibility standard: WCAG 2.1 AA
- Semantic HTML requirement: use lists, headings, buttons, form elements
- Mobile-first rule: design for mobile then scale to desktop
- Code system: ready for React + Tailwind component conversion
```

---

## How to use next
- After this prompt, generate a component inventory and wireframe description.
- Then move to `design-system-governance.md` to verify token and component consistency.
- Use this skill whenever you need reproducible, system-led UI generation.
