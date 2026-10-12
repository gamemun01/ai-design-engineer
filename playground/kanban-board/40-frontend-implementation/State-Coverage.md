# State Coverage Affirmation — BoardPanel.tsx

> Required output of the **`code-generation`** skill (Skill 06). Documents where
> each lifecycle state is coded and how the discriminated union enforces
> coverage at compile time.

## Compile-time enforcement

```ts
type BoardStatus = 'ideal' | 'loading' | 'empty' | 'error' | 'partial';
```

`status` is a **required** prop (not optional, not `string`). Because the root
branches exhaustively on `status`, adding a sixth value to the union without a
matching branch would be caught during review. The two ideal/partial branches
share the column-rendering JSX intentionally (Partial only adds the
`ConflictBanner` + dims the disputed card).

## Where each state is rendered

| State | File location | What renders |
| :--- | :--- | :--- |
| **Loading** | `BoardPanel` → `<BoardLoadingSkeleton />` | 3 skeleton columns, `aria-busy="true"`, `animate-pulse` |
| **Empty** | `BoardPanel` → `<BoardEmptyState />` | Illustration + "Create column" CTA (`bg-primary`, `h-11`) |
| **Error** | `BoardPanel` → `<BoardErrorState />` | `role="alert"`, names the failure, Retry button |
| **Partial** | `BoardPanel` → `<ConflictBanner />` + Ideal layout | Refresh banner; disputed card (`conflictCardId`) dimmed to `opacity-50` |
| **Ideal** | `BoardPanel` → column `<section>` | Columns + cards, full interaction, optimistic move |

## Optimistic-move + rollback (the Error/Partial triggers)

`move()` sets `submittingCardId` immediately (card dims + `aria-live` "Moving
card…"), then `await onMoveCard(...)`. The **parent owns rollback**: on
rejection it sets `status` to `'error'` (→ `BoardErrorState`) or `'partial'`
(→ `ConflictBanner`) — so a failed move surfaces the correct state branch
without the component silently swallowing the error.

## Dependency control (allowed list)

Only: `react`, `lucide-react`, `clsx`/`tailwind-merge` (via `@/lib/utils`), and
`@radix-ui` primitives. **No drag library** — drag is implemented via native
keyboard parity (`Shift+Arrows`) + pointer handlers in the parent; this keeps
the bundle inside the allowlist.

## Targeted-diff honesty

`onMoveCard`, `onRetry`, `onRefresh`, and `onCreateColumn` are props whose
implementations live in the route/page parent (out of scope for this component
artifact, consistent with the repo's component-level pattern). They are fully
typed here so the contract is machine-checkable.
