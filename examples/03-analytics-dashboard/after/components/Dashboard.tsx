// AFTER: Dashboard — composition root, delegates states to modular children
// Skills applied: 04 (tokens), 06 (code), 07 (a11y + perf), 08 (refine split)

import { KpiCard } from "./KpiCard";
import { RevenueChart } from "./RevenueChart";
import { CustomersTable } from "./CustomersTable";

interface DashboardProps {
  kpis: Array<{ metric: string; value: string; delta: number; status: "ideal" | "loading" | "empty" | "error" }>;
  chart: { data: Array<{ date: string; revenue: number }>; status: "ideal" | "loading" | "empty" | "error" | "partial" };
  customers: { rows: Array<{ id: string; name: string; revenue: number; joined: string }>; status: "ideal" | "loading" | "empty" | "error" };
}

export function Dashboard({ kpis, chart, customers }: DashboardProps) {
  return (
    <main className="container mx-auto py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>
      </header>

      {/* KPI row — each card owns its states */}
      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.metric} {...k} />
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart spans 2 cols on large screens */}
        <div className="lg:col-span-2">
          <RevenueChart data={chart.data} status={chart.status} />
        </div>
        {/* Table */}
        <CustomersTable rows={customers.rows} status={customers.status} />
      </div>
    </main>
  );
}
