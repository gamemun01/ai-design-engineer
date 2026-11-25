# Version-Aware Frontend Implementation

Read this reference for React 19, current Next.js App Router, Tailwind v4, or
shadcn/ui integration. Checked against official documentation on 2026-10-08.
Use installed versions and version-matched docs; this is not a migration mandate.

| Area | Implementation decision | Primary reference |
|---|---|---|
| React | Support existing React 18/19 projects. Check types and framework peer dependencies before using new APIs; avoid unnecessary memoization. | [React versions](https://react.dev/versions), [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) |
| Next.js | Keep App Router server/client boundaries explicit. Props crossing into client components must be serializable; ordinary event callbacks belong in a client parent. Server functions need their own authorization. | [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) |
| Async APIs and caching | For versions using async `params`, `searchParams`, `cookies()`, and `headers()`, await them. Declare freshness/invalidation needs rather than assuming old cache defaults. | [Upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16), [Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data) |
| Error handling | Model expected failures as results and preserve form data. Use client `error.tsx` boundaries for uncaught render failures; async event-handler failures need explicit handling. Display safe public messages. | [Error handling](https://nextjs.org/docs/app/getting-started/error-handling) |
| Tailwind v4 | Use the existing CSS entry point and `@theme` mappings. v3 configuration can be loaded via `@config`; several utilities/defaults changed. Verify browser targets before migration. | [Upgrade guide](https://tailwindcss.com/docs/upgrade-guide), [Theme variables](https://tailwindcss.com/docs/theme) |
| shadcn/ui | Inspect generated component source and `components.json`; reuse installed primitives. Follow the project's variable/color format, including any OKLCH theme. | [Tailwind v4 integration](https://ui.shadcn.com/docs/tailwind-v4) |

For example, map existing runtime variables to Tailwind v4 semantic utilities in
the theme layer, following the host's existing color format:

```css
@import "tailwindcss";

/* --background and --foreground must already contain valid CSS colors. */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

This fragment is not a complete theme. Define and test every consumed token,
including project-specific `success`, `warning`, or `info` roles, in supported
themes. A class such as `bg-warning` is not built in merely because a template
uses it.

Before calling an implementation ready, run the target app's available type,
lint, build, and relevant behavior checks. Verify keyboard/touch recovery and
responsive layouts in the browser. Document checks that could not run; a snippet
or this repo's skill validator cannot establish application readiness.
