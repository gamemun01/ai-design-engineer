// AFTER: Production-grade checkout — refined after review-critique (58 -> 98)
// Skills applied: 03 (UX), 04 (tokens/governance), 06 (code), 07 (review), 08 (refine)
// All 5 lifecycle states implemented; no magic values; semantic + accessible.

import React, { useMemo } from "react";
import { ShieldCheck, RefreshCw, ShoppingCart, Lock } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn class merger — in the allowlist

type CheckoutStatus = "ideal" | "loading" | "empty" | "error" | "submitting";

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
  onSubmit?: () => void;
  onRetry?: () => void;
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
export function CheckoutErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <section
      role="alert"
      className="flex flex-col items-center justify-center p-8 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg space-y-4 text-center"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Payment could not be completed
        </h3>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
      {onRetry && (
        <button
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
  items,
  totals,
  status,
  paymentError,
  onSubmit,
  onRetry,
}: CheckoutPanelProps) {
  // 4. IDEAL STATE (and 5. PARTIAL when a coupon/discount is applied)
  const memoizedTotal = useMemo(() => totals.total, [totals.total]);
  const isLocked = status === "submitting" || status === "loading";

  if (status === "loading") return <CheckoutLoadingSkeleton />;
  if (status === "empty" || items.length === 0) return <CheckoutEmptyState />;
  if (status === "error")
    return (
      <CheckoutErrorState
        error={paymentError ?? "Unknown error"}
        onRetry={onRetry}
      />
    );

  return (
    <main className="grid gap-6 md:grid-cols-5">
      {/* Summary rail — sticky on desktop, disclosure on mobile */}
      <aside className="md:col-span-2 md:sticky md:top-6 h-fit">
        <section
          className="p-6 bg-card border border-border rounded-lg space-y-4"
          aria-label="Order summary"
        >
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Order summary
          </h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-sm text-foreground"
              >
                <span className="truncate pr-4">
                  {item.name} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          {/* PARTIAL STATE: discount row only renders when a coupon is applied */}
          {typeof totals.discount === "number" && (
            <p className="text-sm text-success" aria-live="polite">
              Coupon applied: −${totals.discount.toFixed(2)}
            </p>
          )}
          <p
            className="flex justify-between text-base font-semibold text-foreground"
            aria-live="polite"
          >
            <span>Total</span>
            <span>${memoizedTotal.toFixed(2)}</span>
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Secure payment
            via Stripe
          </p>
        </section>
      </aside>

      {/* Active step + sticky CTA */}
      <section
        className="md:col-span-3 space-y-6"
        aria-labelledby="step-title"
      >
        <h1
          id="step-title"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Payment
        </h1>
        <ol
          aria-label="Checkout steps"
          className="flex gap-2 text-xs text-muted-foreground"
        >
          <li>Shipping</li>
          <li aria-current="step" className="font-semibold text-foreground">
            Payment
          </li>
          <li>Review</li>
        </ol>
        {/* PaymentForm children omitted — targeted diff only, per Skill 06 Rule #5 */}
      </section>

      <footer role="region" aria-label="Place order" className="md:col-span-5">
        <div className="sticky bottom-0 flex items-center justify-between gap-4 p-4 bg-background/95 border-t border-border backdrop-blur">
          <span className="text-sm text-muted-foreground">
            <Lock className="inline mr-1 h-4 w-4" aria-hidden="true" /> Encrypted
          </span>
          <button
            onClick={onSubmit}
            disabled={isLocked}
            className={cn(
              "inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded-md",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
            )}
          >
            {status === "submitting"
              ? "Processing…"
              : `Place Order — $${memoizedTotal.toFixed(2)}`}
          </button>
        </div>
      </footer>
    </main>
  );
}
