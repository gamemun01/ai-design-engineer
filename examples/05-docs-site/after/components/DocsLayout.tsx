// AFTER: DocsLayout — skip link, aria-current active nav, real headings, search states
// Skills applied: 03 (UX a11y), 04 (tokens), 06 (code), 07 (a11y), 08 (refine)

import { Search } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

interface NavItem {
  href: string;
  label: string;
  active?: boolean;
}
interface NavSection {
  title: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs/intro", label: "Introduction", active: true },
      { href: "/docs/install", label: "Install" },
      { href: "/docs/auth", label: "Auth" },
    ],
  },
  { title: "API", items: [{ href: "/docs/endpoints", label: "Endpoints" }] },
];

const TOC = [
  { href: "#what-is-conduit", label: "What is Conduit?" },
  { href: "#install", label: "Install" },
];

export function DocsLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip link — first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <a href="/" className="text-lg font-bold tracking-tight text-foreground">
            Conduit
          </a>
          <DocsSearch />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[16rem_1fr_12rem]">
        {/* Sidebar — active via aria-current + bar, not color-only */}
        <aside aria-label="Documentation navigation">
          <nav>
            {SECTIONS.map((section) => (
              <div key={section.title} className="mb-6">
                <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                  {section.title}
                </h2>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                        className={
                          "block border-l-2 py-1.5 pl-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus:outline-none " +
                          (item.active
                            ? "border-primary font-medium text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground")
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Prose — real heading hierarchy */}
        <main id="main-content" className="max-w-prose">
          <article>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Introduction</h1>
            <p className="mt-4 text-muted-foreground">
              Welcome to Conduit. Install the SDK to get started.
            </p>
            <h2 className="mt-8 text-xl font-semibold text-foreground">Install</h2>
            <CodeBlock code="npm install @conduit/sdk" language="bash" />
          </article>
        </main>

        {/* Right TOC — active section via aria-current */}
        <aside aria-label="On this page" className="hidden lg:block">
          <nav>
            <h2 className="mb-2 text-sm font-semibold text-muted-foreground">On this page</h2>
            <ul className="space-y-1 border-l border-border">
              {TOC.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={i === 0 ? "true" : undefined}
                    className={
                      "block border-l-2 -ml-px py-1 pl-3 text-xs focus-visible:ring-2 focus-visible:ring-ring focus:outline-none " +
                      (i === 0
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}

// Search with states — Loading/Empty/Error (5-state contract applies to search)
function DocsSearch() {
  // In a real app this is wired to a search index; the contract is what matters.
  const status: "ideal" | "loading" | "empty" | "error" = "ideal";
  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor="docs-search" className="sr-only">Search docs</label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="docs-search"
        type="search"
        placeholder="Search docs..."
        className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
      />
      {status === "empty" && (
        <p role="status" className="absolute mt-1 text-xs text-muted-foreground">No results</p>
      )}
      {status === "error" && (
        <p role="alert" className="absolute mt-1 text-xs text-destructive">Search unavailable</p>
      )}
    </div>
  );
}
