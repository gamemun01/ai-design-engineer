// AFTER: RevenueChart — Recharts area chart, 5 states, SR text summary
// Skills applied: 04 (tokens), 06 (code), 07 (a11y + performance)

import { useMemo } from "react";
import { RefreshCw } from "lucide-react";

type ChartStatus = "ideal" | "loading" | "empty" | "error" | "partial";

interface RevenuePoint {
  date: string;
  revenue: number;
}
interface RevenueChartProps {
  data: RevenuePoint[];
  status: ChartStatus;
  onRetry?: () => void;
}

export function RevenueChart({ data, status, onRetry }: RevenueChartProps) {
  // Memoize the SR summary so it isn't recomputed each render
  const summary = useMemo(() => {
    if (data.length === 0) return "No revenue data for this range.";
    const first = data[0].revenue;
    const last = data[data.length - 1].revenue;
    const change = first ? ((last - first) / first) * 100 : 0;
    return `Revenue from ${data[0].date} to ${data[data.length - 1].date}, ` +
      `starting at $${first} and ending at $${last}, a ${change >= 0 ? "rise" : "drop"} of ${Math.abs(change).toFixed(1)} percent.`;
  }, [data]);

  const base = "p-6 bg-card border border-border rounded-xl shadow-sm space-y-4";

  if (status === "loading") {
    return (
      <section className={base} aria-busy="true" aria-label="Loading revenue chart">
        <div className="h-5 w-40 bg-muted animate-pulse rounded" />
        <div className="h-64 w-full bg-muted animate-pulse rounded-md" />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section role="alert" className={`${base} border-destructive/30 text-center`}>
        <p className="text-sm font-medium text-foreground">Couldn't load revenue data</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center h-10 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-md focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" /> Retry
          </button>
        )}
      </section>
    );
  }

  if (status === "empty" || data.length === 0) {
    return (
      <section className={`${base} text-center`}>
        <p className="text-sm font-medium text-foreground">No revenue in this range</p>
        <p className="text-sm text-muted-foreground">Try widening the date filter.</p>
      </section>
    );
  }

  // IDEAL + PARTIAL (partial = incomplete range, noted via status prop)
  return (
    <section className={base} aria-label="Revenue over time">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Revenue over time</h2>
        {status === "partial" && (
          <span className="text-xs text-warning">Incomplete range</span>
        )}
      </div>
      {/* Chart visual omitted (Recharts AreaChart) — targeted to keep file lean.
          The key contract: an SR-only text summary describing the chart. */}
      <p className="sr-only">{summary}</p>
      <div
        className="h-64 w-full rounded-md bg-muted/30"
        role="img"
        aria-label={summary}
      >
        {/* <AreaChart data={data}> ... </AreaChart> */}
      </div>
    </section>
  );
}
