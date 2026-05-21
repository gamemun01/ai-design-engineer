# Code Generation — AI Design Engineer

## Purpose
This skill guides AI to convert design outputs into production-ready frontend code with semantic structure, accessibility, and maintainability.

## When to use
- After UI generation and design system governance
- When producing actual React or frontend code
- When you need code that is ready for review and handoff

## Output format
Produce a code generation plan and actual code snippets:
- component structure
- HTML semantics
- Tailwind/CSS classes
- accessibility annotations
- state and behavior notes

---

## Code generation process
Follow this process for every UI-to-code task.

### 1. Define component scope
- Break the screen into reusable components
- Identify which parts are page-level, feature-level, and shared
- Name components clearly: `AlertSummaryCard`, `StatusTable`, `DetailPanel`

### 2. Outline structure
- Write a high-level component tree
- Include major sections, lists, panels, and actions
- Indicate where data props and events flow

### 3. Choose markup semantics
- Use `header`, `main`, `section`, `article`, `nav`, `aside`, `form`
- Use `button` for actions, `a` for navigation, `label` for form controls
- Use `table` only for tabular data

### 4. Apply Tailwind or CSS rules
- Map design tokens to Tailwind utilities or CSS classes
- Use consistent spacing, typography, colors, and borders
- Prefer utility-first code that is readable and maintainable

### 5. Add accessibility support
- Provide `aria-label`, `aria-describedby`, and `role` where needed
- Ensure interactive controls are keyboard focusable
- Use visible focus styles and proper heading hierarchy

### 6. Add state notes
- Document loading, error, empty, and success states
- Show how actions update UI or trigger events
- Keep state behavior simple and predictable

---

## Recommended code pattern
Use this template as a guide for React + Tailwind conversion.

```
// Component tree
- PageShell
  - PageHeader
  - SummarySection
  - DataTableSection
  - DetailSidebar

// Example component file structure
function PageShell() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <PageHeader />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <SummarySection />
        <DetailSidebar />
      </div>
    </main>
  )
}
```

---

## Production code rules
Follow these rules strictly.

### Semantic HTML
- Use headings in order (`h1` → `h2` → `h3`)
- Use `button`, `form`, `fieldset`, `legend`, and `label` for controls
- Use `ul` and `li` for lists, not repeated `div`

### Accessibility
- Buttons and links have accessible text
- Form fields include labels and validation messages
- Provide `alt` text for images and icons where needed
- Use ARIA only when native semantics are insufficient

### Tailwind structure
- Use class groups for spacing and layout: `space-y-6`, `grid`, `gap-4`
- Use token-mapped colors: `bg-surface`, `text-text`, `border-border`
- Avoid inline style values unless necessary
- Prefer reusable class patterns for repeated component types

### Component reuse
- Build shared components for status cards, tables, panels, and forms
- Keep presentational and container logic separated
- Avoid large monolithic components

### Testing readiness
- Add hooks for data loading and error states
- Keep state management explicit and simple
- Ensure components can be tested with static props

---

## Example code request
```
Generate React + Tailwind code for a compliance alert dashboard screen.

Structure:
- Header with page title and filters
- Summary cards for alert counts
- Table with alert rows and actions
- Sidebar detail panel with selected alert information

Use semantic HTML, accessible buttons, and responsive Tailwind classes.

Provide:
- component tree
- main React component code
- supporting subcomponent code
- notes for loading and empty states
```

---

## Next step
- After generating code, run `review-critique.md` to score quality and catch production issues.
- Keep the design system tokens and component contracts in scope while generating code.
