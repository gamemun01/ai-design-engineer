# Design System Governance — AI Design Engineer

## Purpose
This skill defines how to enforce a design system across generated UI, components, and code. The goal is consistency, brand fidelity, and production readiness.

## When to use
- After UI generation and before code conversion
- When multiple pages, components, or teams are involved
- When you need a design audit and enforcement checklist

## Output format
Produce:
- token rules
- component contracts
- audit checklist
- consistency report

---

## Design system pillars
Use these pillars for governance.

### 1. Tokens
Define the core design tokens and their purpose.
- spacing
- typography
- color
- radius
- elevation

### 2. Components
Define component contracts for primary UI elements.
- buttons
- cards
- inputs
- tables
- navigation

### 3. Patterns
Define patterns for layout, forms, and state.
- dashboards
- detail panels
- tables and lists
- modals and drawers

### 4. Accessibility
Every design decision must include an accessibility rule.
- contrast
- keyboard behavior
- focus state
- readable labels

---

## Core tokens
Use these values as the source of truth.

### Spacing
- `spacing-xxs`: 8px
- `spacing-xs`: 12px
- `spacing-sm`: 16px
- `spacing-md`: 24px
- `spacing-lg`: 32px
- `spacing-xl`: 40px

### Typography
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-md`: 18px
- `text-lg`: 20px
- `text-xl`: 24px

### Color roles
- `color-bg`: neutral background surfaces
- `color-surface`: cards and panels
- `color-border`: borders and dividers
- `color-text`: primary text
- `color-muted`: secondary text
- `color-primary`: brand action
- `color-success`: success states
- `color-warning`: warning states
- `color-danger`: error states
- `color-info`: informational accents

### Radius
- `radius-sm`: 8px
- `radius-md`: 12px
- `radius-lg`: 16px

### Elevation
- `shadow-sm`: subtle card shadow
- `shadow-md`: stronger panel shadow
- `shadow-lg`: modal/dialog shadow

---

## Component contracts
Define how the component should behave and when it is used.

### Button contract
- Primary button: highest-priority action
- Secondary button: less prominent action
- Tertiary button: neutral action or text link
- Rules:
  - primary buttons use `color-primary`
  - secondary buttons use border + neutral surface
  - disabled state uses faded text and no pointer events
  - all buttons have focus outline and accessible labels

### Card contract
- Use cards for grouped status, summary, and detail content
- Padding should use `spacing-md` or `spacing-lg`
- Border radius should use `radius-md`
- Use `color-surface` background and `color-border` divider
- Each card should have a clear heading and optional secondary action

### Input contract
- Labels above inputs, not placeholders only
- Inline helper text for optional fields or validation
- Error text in `color-danger` with semantic markup
- Inputs should use `spacing-sm` vertical gap and `spacing-md` horizontal padding

### Table contract
- Use tables for structured data only, not for interface layout
- Keep row density moderate and avoid more than 6 columns on desktop
- Use sticky headers for long tables
- Provide sorting and filtering controls above the table
- Include row actions in a consistent column at the end

### Navigation contract
- Top-level page navigation appears in a persistent header or side rail
- Secondary navigation uses tabs or segmented controls for context switching
- Mobile navigation collapses into a menu or bottom navigation
- Active state is always visible and accessible

---

## Governance checklist
Use this checklist to audit generated UI.

- [ ] All spacing uses defined design tokens
- [ ] Typography follows token sizes and hierarchy
- [ ] Color usage is role-based, not arbitrary
- [ ] Buttons follow the button contract
- [ ] Cards and panels use the card contract
- [ ] Inputs and forms follow the input contract
- [ ] Tables follow the table contract
- [ ] Navigation is clear and consistent
- [ ] All states include accessible feedback
- [ ] Mobile and desktop behavior is defined
- [ ] No more than 3 primary actions per page
- [ ] Empty and error states are designed
- [ ] Visual hierarchy supports user tasks
- [ ] Component names are consistent and descriptive

---

## How to conduct an audit
1. Review the generated UI description or mockup.
2. Map each element to a token or component contract.
3. Mark exceptions and note why they were made.
4. If an exception is not justified, update the prompt or design.
5. Document the final design system rules for the project.

---

## Example governance summary
```
Design system check:
- Spacing: token-based, consistent
- Typography: 16/18/24 hierarchy used
- Colors: status colors only, neutral surfaces used
- Buttons: primary/secondary defined, no more than 2 action tiers
- Cards: summary card, detail card, status card used correctly
- Forms: labels and error states present
- Accessibility: keyboard and screen reader considerations documented
```

## How to use next
- After this audit, proceed to `code-generation.md`.
- Keep this file available as a reference whenever UI or component decisions are made.
- Use it to train AI to spot token violations and inconsistent patterns.
