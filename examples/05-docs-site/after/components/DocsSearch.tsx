"use client";

import { useId, useState } from "react";
import { Search } from "lucide-react";

type DocsPage = { href: string; label: string };

export function DocsSearch({ pages }: { pages: DocsPage[] }) {
  const id = useId();
  const resultsId = id + "-results";
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const results = term ? pages.filter(page => page.label.toLowerCase().includes(term)) : [];

  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor={id} className="sr-only">Search docs</label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        onKeyDown={event => { if (event.key === "Escape") setQuery(""); }}
        aria-controls={term ? resultsId : undefined}
        placeholder="Search docs"
        className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
      />
      <p role="status" className="sr-only">
        {term && (results.length === 0 ? "No matching documentation pages" : `${results.length} ${results.length === 1 ? "result" : "results"}`)}
      </p>
      {term && (
        <section
          id={resultsId}
          aria-label="Search results"
          className="absolute inset-x-0 top-full mt-1 rounded-md border border-border bg-card p-2 text-sm shadow-sm"
        >
          {results.length ? (
            <ul>
              {results.map(page => (
                <li key={page.href}>
                  <a
                    href={page.href}
                    className="block rounded px-2 py-2 text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : <p className="px-2 py-2 text-muted-foreground">No results</p>}
        </section>
      )}
    </div>
  );
}
