<!-- markdownlint-disable -->
# Code Generation — Full Worked Templates

Adaptable examples backing [SKILL.md](../SKILL.md). Read only the relevant
section. Supply existing project imports, token definitions, route targets, and
data adapters before use. These examples have not been compiled in a target app;
they illustrate patterns and do not certify production behavior.

## Table of Contents

1. [Standard React Component Template (5-States Example)](#1-standard-react-component-template-5-states-example) — client component with state branches and partial-data feedback
2. [Next.js Server & Client Component Template (Suspense & RSC Example)](#2-nextjs-server--client-component-template-suspense--rsc-example) — RSC data fetching with Suspense/error boundaries
3. [Worked Example — CheckoutPanel](#3-worked-example--checkoutpanel) — finished component in the skill's full output format

## 1. Standard React Component Template (5-States Example)

The core standard template for implementing stateful, accessible, and token-governed components.

```tsx
'use client'; // Needed when used as an App Router entry with onRetry.

import { AlertCircle, RefreshCw, Layers, ArrowRight } from 'lucide-react';
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
  statusHref: string; // Existing status route supplied by the host project.
  isPartial?: boolean; // Payload reports that some results are unavailable.
}

export function ComplianceDashboard({
  initialAlerts = [],
  isLoading = false,
  error = null,
  onRetry,
  statusHref,
  isPartial = false,
}: ComplianceDashboardProps) {
  const alerts = initialAlerts; // Keep refreshed props visible; no stale copied state.

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
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center h-11 px-4 py-2 text-sm font-medium transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus:outline-none"
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
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
        <a
          href={statusHref}
          className="inline-flex items-center justify-center h-11 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/95 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
        >
          Check System Status
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </a>
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

      {isPartial && (
        <p role="status" className="text-sm text-muted-foreground">
          Some alerts are unavailable. Showing the results we could load.
        </p>
      )}

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-background border border-border hover:border-accent hover:bg-accent/5 rounded-md transition-colors shadow-sm"
          >
            <div className="flex-1 min-w-0 pr-4">
              {/* Long text remains readable at narrow widths. */}
              <h3 className="text-sm font-semibold text-foreground break-words">
                {alert.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Detected: {alert.timestamp}
              </p>
            </div>

            <span className={cn(
              "text-xs px-2.5 py-1 rounded-full font-medium capitalize",
              alert.severity === 'critical' && "bg-destructive/10 text-destructive border border-destructive/20",
              alert.severity !== 'critical' && "bg-muted text-muted-foreground border border-border"
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

## 2. Next.js Server & Client Component Template (Suspense & RSC Example)

Split data fetching from interactive leaves. The example requires a real
`fetchComplianceAlerts` adapter that validates the response and an existing
status route. It does not cross the server/client boundary with ordinary callbacks.
For uncaught render errors use the route's `error.tsx`; expected service failures
need a safe public result and an actual retry mechanism in the host application.

```tsx
// ==========================================
// 1. SERVER COMPONENT (app/compliance/page.tsx)
// ==========================================
import { Suspense } from 'react';
import { ComplianceDashboard } from './compliance-dashboard'; // Client Component
import { fetchComplianceAlerts } from '@/lib/api'; // Validated host data adapter

export default function CompliancePage() {
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
  const alerts = await fetchComplianceAlerts();
  return <ComplianceDashboard initialAlerts={alerts} statusHref="/status" />;
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

```

```tsx
// Separate file: app/compliance/error.tsx (App Router error boundary).
'use client';

export default function ComplianceError({ reset }: { reset: () => void }) {
  return (
    <section role="alert" className="p-6 space-y-4 bg-card text-foreground">
      <h2 className="text-lg font-semibold">Could not load compliance alerts</h2>
      <p>Try again. Contact support if the problem continues.</p>
      <button type="button" onClick={reset}
        className="h-11 px-4 rounded-md bg-primary text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring">
        Try again
      </button>
    </section>
  );
}
```

## 3. Worked Example — CheckoutPanel

A component shell in the skill's output format. This continues the
**e-commerce checkout** thread: it consumes the audited UI spec from
`design-system-governance`. Integrate a validated payment form and real submission
logic through the host application. The shell illustrates loading/empty/error
and discount updates, not a complete checkout flow. Shipping/payment/review steps,
safe amount/currency formatting, server authorization, payment idempotency, and
browser checks remain integration requirements.

```markdown
User: Convert the audited checkout UI spec into a React component. It must implement
all 5 states (Ideal, Loading, Empty, Error, Partial), tokenized Tailwind, and a typed
props interface. No new dependencies.
```

Response:

````markdown
## Component Hierarchy Diagram
- CheckoutPanel (root, manages status)
  - CheckoutLoadingSkeleton
  - CheckoutEmptyState
  - CheckoutErrorState
  - OrderSummary (aria-live total)
  - StepIndicator
  - ShippingForm / PaymentForm (active step)
  - PlaceOrderBar (sticky, disabled while submitting)

## TypeScript Declarations
`CheckoutPanelProps` accepts `items`, `status`, `totals`, `paymentError`, `onSubmit`,
and `onRetry`. `status` enumerates render branches; state-specific props require a true discriminated union.

## Implementation Example
```tsx
'use client';

import type { ReactNode } from 'react';
import { ShieldCheck, RefreshCw, ShoppingCart, Lock } from 'lucide-react';
import { cn } from '@/lib/utils'; // shadcn class merger — in the allowlist

type CheckoutStatus = 'ideal' | 'loading' | 'empty' | 'error' | 'submitting';

interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}
interface CheckoutTotals {
  subtotal: number;
  shipping: number;
  discount?: number; // Partial state: present only when a coupon is applied
  total: number;
}
interface CheckoutPanelProps {
  items: CartItem[];
  totals: CheckoutTotals;
  status: CheckoutStatus;
  paymentError?: string | null;
  onSubmit: () => void;
  onRetry?: () => void;
  paymentForm: ReactNode; // Validated host payment form, rendered by a client parent.
}

// 1. LOADING STATE — skeleton + aria-busy
export function CheckoutLoadingSkeleton() {
  return (
    <section
      className="w-full p-6 space-y-4 bg-card border border-border rounded-lg"
      aria-busy="true"
      aria-label="Loading checkout"
    >
      <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-12 w-full bg-muted animate-pulse rounded-md" />
      ))}
    </section>
  );
}

// 2. EMPTY STATE — clear CTA, no dead ends
export function CheckoutEmptyState() {
  return (
    <section className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-lg bg-card text-center space-y-4">
      <div className="p-3 bg-muted rounded-full text-muted-foreground">
        <ShoppingCart className="h-8 w-8" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Add items to your cart before checking out.
      </p>
      <a
        href="/shop"
        className="inline-flex items-center justify-center h-11 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
      >
        Continue shopping
      </a>
    </section>
  );
}

// 3. ERROR STATE — inline payment error + retry, no full-screen wipe
export function CheckoutErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <section
      role="alert"
      className="flex flex-col items-center justify-center p-8 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg space-y-4 text-center"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Payment could not be completed</h3>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
      {onRetry && (
          <button
            type="button"
            onClick={onRetry}
          className="inline-flex items-center justify-center h-11 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      )}
    </section>
  );
}

// ROOT — branches on status; Ideal + Partial share the layout
export function CheckoutPanel({
  items, totals, status, paymentError, onSubmit, onRetry, paymentForm,
}: CheckoutPanelProps) {
  // 4. IDEAL STATE (and 5. PARTIAL when a coupon/discount is applied)
  const displayedTotal = totals.total;
  const isLocked = status === 'submitting' || status === 'loading';

  if (status === 'loading') return <CheckoutLoadingSkeleton />;
  if (status === 'empty' || items.length === 0) return <CheckoutEmptyState />;
  if (status === 'error')
    return <CheckoutErrorState error={paymentError ?? 'Unknown error'} onRetry={onRetry} />;

  return (
    <main className="grid gap-6 md:grid-cols-5">
      {/* Summary rail — sticky on desktop, disclosure on mobile */}
      <aside className="md:col-span-2 md:sticky md:top-6 h-fit">
        <section
          className="p-6 bg-card border border-border rounded-lg space-y-4"
          aria-label="Order summary"
        >
          <h2 className="text-lg font-bold tracking-tight text-foreground">Order summary</h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm text-foreground">
                <span className="min-w-0 break-words pr-4">{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          {/* PARTIAL STATE: discount row only renders when a coupon is applied */}
          {typeof totals.discount === 'number' && (
            <p className="text-sm text-foreground" aria-live="polite">
              Coupon applied: −${totals.discount.toFixed(2)}
            </p>
          )}
          <p className="flex justify-between text-base font-semibold text-foreground" aria-live="polite">
            <span>Total</span>
            <span>${displayedTotal.toFixed(2)}</span>
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Review your order before paying
          </p>
        </section>
      </aside>

      {/* Active step + sticky CTA */}
      <section className="md:col-span-3 space-y-6" aria-labelledby="step-title">
        <h1 id="step-title" className="text-xl font-bold tracking-tight text-foreground">Payment</h1>
        <ol aria-label="Checkout steps" className="flex gap-2 text-xs text-muted-foreground">
          <li>Shipping</li><li aria-current="step" className="font-semibold text-foreground">Payment</li><li>Review</li>
        </ol>
        {paymentForm}
      </section>

      <footer role="region" aria-label="Place order" className="md:col-span-5">
        <div className="sticky bottom-0 flex items-center justify-between gap-4 p-4 bg-background/95 border-t border-border backdrop-blur">
          <span className="text-sm text-muted-foreground">
            <Lock className="inline mr-1 h-4 w-4" aria-hidden="true" /> Confirm order
          </span>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLocked}
            className={cn(
              'inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded-md',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:ring-2 focus-visible:ring-ring focus:outline-none'
            )}
          >
            {status === 'submitting' ? 'Processing…' : `Place Order — $${displayedTotal.toFixed(2)}`}
          </button>
        </div>
      </footer>
    </main>
  );
}
```

## State Coverage Affirmation
- Loading: `CheckoutLoadingSkeleton` rendered when `status === 'loading'` (aria-busy, skeleton).
- Empty: `CheckoutEmptyState` rendered when `status === 'empty'` or no items (CTA to /shop).
- Error: `CheckoutErrorState` rendered when `status === 'error'` (role=alert, retry).
- Ideal: summary + active step + Place Order bar rendered when data is present.
- Partial: discount row + aria-live total update when `totals.discount` is applied mid-flow.
- a11y: aria-current step, aria-live total, role=region/role=alert, visible focus rings, h-11 (44px) touch targets, semantic `<main>/<aside>/<section>/<footer>/<button>`.
- Dependencies: react + lucide-react + cn (clsx/tailwind-merge) only. No new packages.

> Handoff: this component is the input to `review-critique` (0-120 scorecard).
````

The client owner must catch async submission failures, immediately prevent
duplicate submission, and preserve entered values. Disable UI while pending and
enforce idempotency on the server. Do not use a global load-error branch to erase
a payment form after a declined payment; render expected payment errors inline.
Only show encryption/provider claims when the integration verifies them.
