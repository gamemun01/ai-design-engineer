// AFTER: KpiCard — modular, tokenized, 5 states, icon+text trend
// Skills applied: 04 (tokens), 06 (code), 07 (a11y)

import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type KpiStatus = "ideal" | "loading" | "empty" | "error";

interface KpiCardProps {
  metric: string;
  value?: string;
  delta?: number; // positive = up, negative = down
  status: KpiStatus;
  onRetry?: () => void;
}

export function KpiCard({ metric, value, delta, status, onRetry }: KpiCardProps) {
  const base =
    "p-6 bg-card border border-border rounded-xl shadow-sm space-y-2";

  if (status === "loading") {
    return (
      <section className={base} aria-busy="true" aria-label={`Loading ${metric}`}>
        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        <div className="h-8 w-28 bg-muted animate-pulse rounded" />
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section role="alert" className={cn(base, "border-destructive/30")}>
        <p className="text-sm text-muted-foreground">{metric}</p>
        <p className="text-sm text-destructive">Failed to load</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center h-8 px-3 text-xs font-medium bg-primary text-primary-foreground rounded-md focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
          >
            <RefreshCw className="mr-1 h-3 w-3" aria-hidden="true" /> Retry
          </button>
        )}
      </section>
    );
  }

  if (status === "empty") {
    return (
      <section className={base}>
        <p className="text-sm text-muted-foreground">{metric}</p>
        <p className="text-sm text-muted-foreground">No data yet</p>
      </section>
    );
  }

  // IDEAL — trend is icon + text, never color-only
  const isUp = (delta ?? 0) >= 0;
  return (
    <section className={base} aria-label={metric}>
      <p className="text-sm text-muted-foreground">{metric}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium",
          isUp ? "text-emerald-600" : "text-destructive"
        )}
      >
        {isUp ? (
          <TrendingUp className="h-3 w-3" aria-hidden="true" />
        ) : (
          <TrendingDown className="h-3 w-3" aria-hidden="true" />
        )}
        {isUp ? "+" : ""}
        {delta?.toFixed(1)}% vs last period
      </p>
    </section>
  );
}
