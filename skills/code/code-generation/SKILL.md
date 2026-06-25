---
name: code-generation
description: Convert verified UI specs into production-ready React, Next.js, TypeScript, Tailwind CSS, and shadcn/ui components with semantic HTML, accessibility, lifecycle states, and dependency control. Use when implementation code is requested after UX and design constraints are clear.
version: 2.1.0
author: gamemun01
license: MIT
stack_compat: [tailwind@3.x, shadcn@2.x, react@18.x]
metadata:
  hermes:
    tags: [code, react, nextjs, typescript, tailwind, shadcn, production]
    related_skills: [design-system-governance, ui-generation-structured, review-critique, anti-patterns-detector]
---
<!-- markdownlint-disable -->

# Code Generation — AI Design Engineer

> [!NOTE]
> **Stack Compatibility:** Tailwind CSS v3.x
> For Tailwind v4: Class syntax remains identical, but custom config migration to CSS variables is required. See: [tailwindcss.com/docs/v4-beta](https://tailwindcss.com/docs/v4-beta)

## Trigger Description

Use this skill when converting an approved UI or component specification into
frontend code. Do not use it for vague visual exploration; require enough UX,
design-system, state, and interaction detail to produce targeted components.

## System Instruction

You are an AI Design Engineer converting visual/UX layouts into clean, modular, production-ready React frontend code using Tailwind CSS and shadcn/ui guidelines. You must enforce semantic markup, accessible state indicators, and dependency control guidelines.

## Rules & Constraints

### 1. Technology Stack Core Standard
- **Framework:** React + TypeScript (functional components with hooks).
- **Styling:** Utility-first Tailwind CSS.
- **UI Components:** shadcn/ui conventions (styled Radix UI primitives).
- **Icons:** Lucide React icons.

### 2. Dependency Control (Strict Library Boundaries)
- **Allowed Packages:** `react`, `lucide-react`, `clsx`, `tailwind-merge`, `radix-ui` primitives, and standard React hooks.
- **Strict Limit:** You are **strictly prohibited** from introducing or installing any external npm libraries or packages without explicit human confirmation. Never write custom imports for packages not standard in the React/Tailwind ecosystem.

### 3. Component Contract: Enforce 5 UI States
Every data-driven component **MUST** implement and handle the following 5 lifecycle states:
1. **Ideal State:** The component renders with complete data correctly aligned to tokens.
2. **Loading State:** Render accessible skeleton screens (e.g., Pulsing Tailwind cards) with `aria-busy="true"` to signal background processes.
3. **Empty State:** When query yields zero records, show a clean, non-visual message guiding the user to their next step (with an actionable CTA button).
4. **Error State:** Gracefully catch failures. Display a clear warning message (`color-danger` background/border) and offer a "Retry / Reload" action button.
5. **Partial/Truncated State:** Handle overflow gracefully (e.g., text truncation `truncate` or `line-clamp-*` with tooltips) when text is abnormally long or incomplete.

- **Suspense & Error Boundaries (Next.js App Router):**
  - For Server Components or Next.js App Router implementations, prioritize delegating the **Loading State** to Next.js `loading.tsx` or a `<Suspense fallback={<Skeleton />}>` boundary rather than prop-drilling `isLoading`.
  - Delegate the **Error State** to file-based `error.tsx` or wrap client components in a React Error Boundary (`react-error-boundary` or custom boundary) rather than prop-drilling `error`.

### 4. Accessibility (a11y) Guidelines
- **Focus States:** Every interactive control (button, link, custom inputs) must have a clearly visible focus style (e.g., `focus-visible:ring-2 focus-visible:ring-ring focus:outline-none`).
- **Semantic HTML:** Use landmarks (`<main>`, `<header>`, `<nav>`, `<aside>`, `<section>`) and buttons (`<button>`) instead of onClick listeners on generic tags (`<div>`, `<span>`).
- **ARIA Attributes:** Include essential attributes such as `aria-label` for icon-only actions, `aria-describedby` for error text references, and `aria-live="polite"` for dynamic updates.

### 5. Strict Code Diffs
- When updating code, **NEVER** rewrite the entire file to change small logical portions.
- Present your updates in targeted diffs showing only the modified code, using standard placeholder comments like `// ... existing code ...` to maintain context.

### 6. Server vs Client Component Decision (Next.js App Router)
- **Default:** Build components as React Server Components (RSC) by default (no `'use client'` directive) to optimize bundle size and page load.
- **Use Client Components only when:** The component uses browser-only APIs, event listeners (e.g., `onClick`), or stateful hooks (`useState`, `useEffect`, `useContext`).
- **RSC Data Fetching:** Fetch data directly in Server Components using async/await and pass the data down to Client Components for interactive tasks.

### 7. Backend System Boundaries & API Contracts (Angel Spec)
When implementing components that interface with the backend or database, strict integration boundaries must be respected:
- **API Contracts:** Define typed schemas for REST, RPC, or Event-driven APIs before writing client-side fetchers or state handlers. Use TypeScript interfaces or schema validation to enforce boundary integrity.
- **Concurrency & Fetch Safety:** Implement race-condition protections (e.g. using `AbortController` in client-side fetches or handling component unmounts) and concurrency safety.
- **Caching & State:** Utilize local storage or client caches with explicit invalidation rules to prevent redundant network fetches.
- **"Kill List" Strategy:** Actively identify and eliminate redundant endpoints, dead code, unused props, or unnecessary state synchronization mechanisms. Keep endpoints and logic lean and focused.

### 8. Styling System & Custom Token Integration (Bliss Spec)
When styling components, instead of using hardcoded Tailwind utilities, prioritize CSS variables and token structures:
- **CSS Variable Mapping:** Map typography scales, borders, border-widths, and colors to local or global CSS variables (e.g., `--radius-md`, `--color-primary-accent`, `--font-heading`).
- **Characterful UI Styles:** Support distinct brand themes (e.g. Neo-brutalist with thick borders and high contrast shadows, Playful with curved shapes, or Sleek Dark Mode with neon glow) via customizable variables.

---

## Standard React Component Template (5-States Example)
Below is the core standard template for implementing stateful, accessible, and token-governed components.

```tsx
import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Layers, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // standard shadcn/ui class merger

interface AlertItem {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
}

interface ComplianceDashboardProps {
  initialAlerts?: AlertItem[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ComplianceDashboard({
  initialAlerts = [],
  isLoading = false,
  error = null,
  onRetry,
}: ComplianceDashboardProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  // 1. LOADING STATE (Pulsing Skeleton UI)
  if (isLoading) {
    return (
      <section 
        className="w-full p-6 space-y-4 bg-background border border-border rounded-lg"
        aria-busy="true"
        aria-label="Loading compliance alerts"
      >
        <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 w-full bg-muted animate-pulse rounded-md" />
          ))}
        </div>
      </section>
    );
  }

  // 2. ERROR STATE (Graceful Failure Handler)
  if (error) {
    return (
      <section 
        role="alert" 
        className="flex flex-col items-center justify-center p-8 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg space-y-4 text-center"
      >
        <AlertCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">Failed to load alerts</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus:outline-none"
          >
            <RefreshCw className="mr-2 h-4 w-4 animate-spin-hover" />
            Retry Connection
          </button>
        )}
      </section>
    );
  }

  // 3. EMPTY STATE (Clear CTA guidance)
  if (alerts.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-lg bg-card text-center space-y-4">
        <div className="p-3 bg-muted rounded-full text-muted-foreground">
          <Layers className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">No active alerts found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your queue is clear. When compliance anomalies are detected, they will appear here.
          </p>
        </div>
        <button
          onClick={() => {}}
          className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/95 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
        >
          Check System Status
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </section>
    );
  }

  // 4. IDEAL STATE (Standard Grid Layout)
  return (
    <section 
      className="p-6 bg-card border border-border rounded-lg shadow-sm space-y-4"
      aria-label="Active compliance alerts list"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Active Compliance Queue</h2>
        <span className="text-xs font-semibold px-2 py-1 bg-muted rounded text-muted-foreground">
          {alerts.length} Remaining
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-background border border-border hover:border-accent hover:bg-accent/5 rounded-md transition-colors shadow-sm"
          >
            <div className="flex-1 min-w-0 pr-4">
              {/* 5. PARTIAL/TRUNCATED STATE handled via truncate utilities */}
              <h3 className="text-sm font-semibold text-foreground truncate" title={alert.title}>
                {alert.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Detected: {alert.timestamp}
              </p>
            </div>
            
            <span className={cn(
              "text-xs px-2.5 py-1 rounded-full font-medium capitalize",
              alert.severity === 'critical' && "bg-destructive/10 text-destructive border border-destructive/20",
              alert.severity === 'warning' && "bg-warning/10 text-warning border border-warning/20",
              alert.severity === 'info' && "bg-info/10 text-info border border-info/20"
            )}>
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Next.js Server & Client Component Template (Suspense & RSC Example)
Below is the pattern for splitting components into static Server Components (for data fetching and boundaries) and interactive Client Components.

```tsx
// ==========================================
// 1. SERVER COMPONENT (app/compliance/page.tsx)
// ==========================================
import React, { Suspense } from 'react';
import { ComplianceDashboard } from './compliance-dashboard'; // Client Component
import { fetchComplianceAlerts } from '@/lib/api'; // Mock data fetcher

export default async function CompliancePage() {
  return (
    <main className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">System compliance status</h1>
      
      {/* Loading state delegated to Suspense boundary */}
      <Suspense fallback={<ComplianceDashboardSkeleton />}>
        <ComplianceDataWrapper />
      </Suspense>
    </main>
  );
}

async function ComplianceDataWrapper() {
  try {
    const alerts = await fetchComplianceAlerts();
    return <ComplianceDashboard initialAlerts={alerts} />;
  } catch (err) {
    // Error state handles fallback UI gracefully
    return (
      <ComplianceDashboardError 
        error={err instanceof Error ? err.message : 'Unknown data fetch error'} 
      />
    );
  }
}

function ComplianceDashboardSkeleton() {
  return (
    <div className="w-full p-6 space-y-4 bg-background border border-border rounded-lg" aria-busy="true">
      <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 w-full bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    </div>
  );
}

function ComplianceDashboardError({ error }: { error: string }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center p-8 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Failed to load alerts</h3>
      <p className="text-sm text-muted-foreground">{error}</p>
    </div>
  );
}
```

## Expected Output Format
The resulting code output should contain:
1. **Component Hierarchy Diagram:** Text-based indentation detailing subcomponent scopes.
2. **TypeScript Declarations:** Defining the schema constraints of inputs/props.
3. **Verified Code Snippet:** Fully functional, token-aligned React component script.
4. **State Coverage Affirmation:** Explicitly listing where Loading, Empty, and Error states were coded.

## Example Usage (Few-Shot Example)

```markdown
User: Convert the approved alert queue UI spec into a React component.
```

Response:

```markdown
## Component Hierarchy Diagram
- AlertQueue
  - AlertQueueHeader
  - AlertQueueState
  - AlertQueueList
  - AlertQueueItem

## TypeScript Declarations
`AlertQueueProps` accepts `alerts`, `isLoading`, `error`, and `onRetry`.

## Verified Code Snippet
[Provide the targeted React component code with semantic sections, typed props,
5 UI states, tokenized Tailwind classes, and no new dependencies.]

## State Coverage Affirmation
- Loading: skeleton block rendered when `isLoading`
- Error: retry panel rendered when `error`
- Empty: empty queue CTA rendered when `alerts.length === 0`
- Ideal: list rendered when data exists
- Partial: long titles truncated with `title` fallback
```

## Common Pitfalls
1. Treating the first generated component as production-ready — always enforce the 5-state contract and accessibility checks before declaring done.
2. Importing libraries outside the allowed stack (`react`, `lucide-react`, `clsx`, `tailwind-merge`, `radix-ui` primitives) without explicit human approval — strict dependency control.
3. Prop-drilling `isLoading` and `error` through components instead of using Suspense boundaries (Next.js `loading.tsx`) and Error Boundaries (`error.tsx`) — use the framework's native patterns.
4. Rewriting entire files for small changes — present targeted diffs with `// ... existing code ...` placeholders to minimize blast radius.
5. Defaulting to Client Components (`'use client'`) when a Server Component would suffice — build RSC by default; only add `'use client'` for browser APIs, event listeners, or stateful hooks.

## Verification Checklist
- [ ] Every data-driven component implements all 5 lifecycle states with accessible indicators (`aria-busy`, `aria-live`).
- [ ] Dependencies match the allowlist; no new npm packages were introduced without explicit human approval.
- [ ] Server vs Client component decision is explicit and documented per file.
- [ ] Code changes are presented as targeted diffs, not full-file rewrites.
- [ ] Semantic HTML is used (`<button>`, `<main>`, `<nav>`); `<div onClick>` is rejected unless `role="button"` and keyboard handlers are added.
- [ ] API contracts are typed (TypeScript interfaces) before any fetcher is written.

