// AFTER: CustomersTable — sortable via <button> + aria-sort, 5 states, truncation (Partial)
// Skills applied: 04 (tokens), 06 (code), 07 (a11y + performance)

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type SortKey = "name" | "revenue" | "joined";
type SortDir = "asc" | "desc";
type TableStatus = "ideal" | "loading" | "empty" | "error";

interface Customer {
  id: string;
  name: string;
  revenue: number;
  joined: string;
}
interface CustomersTableProps {
  rows: Customer[];
  status: TableStatus;
  onRetry?: () => void;
}

export function CustomersTable({ rows, status, onRetry }: CustomersTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Memoize sorted rows — no recompute on every parent render
  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "revenue") return (a.revenue - b.revenue) * dir;
      return String(a[sortKey]).localeCompare(String(b[sortKey])) * dir;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const base =
    "p-6 bg-card border border-border rounded-xl shadow-sm space-y-4";

  if (status === "loading") {
    return (
      <section className={base} aria-busy="true" aria-label="Loading customers">
        <div className="h-5 w-40 bg-muted animate-pulse rounded" />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-8 w-full bg-muted animate-pulse rounded" />
        ))}
      </section>
    );
  }
  if (status === "error") {
    return (
      <section role="alert" className={`${base} border-destructive/30 text-center`}>
        <p className="text-sm font-medium text-foreground">Couldn't load customers</p>
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
  if (status === "empty" || rows.length === 0) {
    return (
      <section className={`${base} text-center`}>
        <p className="text-sm font-medium text-foreground">No customers in this segment</p>
      </section>
    );
  }

  const ariaSort = (key: SortKey) =>
    key !== sortKey ? "none" : sortDir === "asc" ? "ascending" : "descending";

  return (
    <section className={base} aria-label="Top customers">
      <h2 className="text-lg font-semibold text-foreground">Top customers</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            {(["name", "revenue", "joined"] as SortKey[]).map((key) => (
              <th key={key} scope="col" aria-sort={ariaSort(key)} className="py-2 pr-4">
                <button
                  onClick={() => toggleSort(key)}
                  className="inline-flex items-center gap-1 font-medium text-foreground capitalize focus-visible:ring-2 focus-visible:ring-ring focus:outline-none rounded"
                >
                  {key}
                  {key === sortKey && (sortDir === "asc" ? "▲" : "▼")}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id} className="border-t border-border hover:bg-muted/40">
              {/* PARTIAL state: long names truncate with a title tooltip */}
              <td className="py-2 pr-4">
                <span className="block max-w-[180px] truncate text-foreground" title={r.name}>
                  {r.name}
                </span>
              </td>
              <td className="py-2 pr-4 text-foreground">${r.revenue.toLocaleString()}</td>
              <td className="py-2 pr-4 text-muted-foreground">{r.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
