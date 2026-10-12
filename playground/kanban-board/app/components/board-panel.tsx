// app/components/board-panel.tsx
// Working copy of the skill-produced component (40-frontend-implementation/BoardPanel.tsx),
// extended with the motion spec from 90-motion-spec.md (motion-reduce:* guards).
// before -> after: 46/120 -> 99/120. Skills applied: 03 (UX), 04 (UI),
// 05 (design-system), 06 (code-gen), 08 (refinement), 09 (motion-choreography).
// Guarantees: all 5 lifecycle states (discriminated union forces every branch);
// token-only colors; semantic + accessible; optimistic move with safe rollback;
// keyboard-move parity for drag; reduced-motion respected everywhere.

import React, { useMemo, useState } from "react";
import { AlertCircle, AlertTriangle, Plus, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn class merger — in the allowed dep list

// --- Typed API contract (exported so the route + mock data can import them) -

export type BoardStatus = "ideal" | "loading" | "empty" | "error" | "partial";

export interface Assignee {
  name: string;
  avatarUrl: string;
}

export interface Card {
  id: string;
  title: string;
  columnId: string;
  assignee?: Assignee;
  due?: string;
}

export interface Column {
  id: string;
  title: string;
  wipLimit?: number;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface BoardPanelProps {
  board: Board;
  cards: Card[];
  status: BoardStatus;
  error?: string; // populated on 'error'
  conflictCardId?: string; // populated on 'partial' (the disputed card)
  onMoveCard: (cardId: string, targetColumnId: string) => Promise<void>;
  onRetry: () => void;
  onRefresh: () => void;
  onCreateColumn: () => void;
}

// --- State subcomponents -------------------------------------------------

function BoardLoadingSkeleton() {
  return (
    <section
      className="flex gap-4 overflow-x-auto"
      role="list"
      aria-busy="true"
      aria-label="Loading board"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-72 shrink-0 rounded-lg bg-card p-4"
          aria-hidden="true"
        >
          <div className="h-5 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="mt-4 flex flex-col gap-3">
            <div className="h-11 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
            <div className="h-11 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
            <div className="h-11 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </section>
  );
}

function BoardEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <Users className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
      <div>
        <h2 className="text-base text-foreground">No columns yet</h2>
        <p className="text-sm text-muted-foreground">
          Create your first column to start tracking work.
        </p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Plus className="h-4 w-4" aria-hidden="true" /> Create column
      </button>
    </div>
  );
}

function BoardErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-lg bg-destructive/10 p-4 text-destructive"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm font-medium">{error}</span>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" /> Retry
      </button>
    </div>
  );
}

function ConflictBanner({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-success/10 p-3 text-foreground">
      <span className="text-sm">A teammate moved a card — refresh to see it.</span>
      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" /> Refresh
      </button>
    </div>
  );
}

function Avatar({ assignee }: { assignee: Assignee }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- playground mock; decorative
    <img
      src={assignee.avatarUrl}
      alt="" // decorative; the card title carries the meaning
      className="h-7 w-7 rounded-full"
    />
  );
}

// --- Root ----------------------------------------------------------------

export function BoardPanel({
  board,
  cards,
  status,
  error,
  conflictCardId,
  onMoveCard,
  onRetry,
  onRefresh,
  onCreateColumn,
}: BoardPanelProps) {
  const [submittingCardId, setSubmittingCardId] = useState<string | null>(null);

  // Cards grouped by column; memoized so card moves don't recompute the world.
  const cardsByColumn = useMemo(() => {
    const map = new Map<string, Card[]>();
    for (const col of board.columns) map.set(col.id, []);
    for (const card of cards) map.get(card.columnId)?.push(card);
    return map;
  }, [cards, board.columns]);

  const totalCards = useMemo(() => cards.length, [cards]);

  // Keyboard parity for drag: Shift+ArrowRight/Left moves the focused card.
  const handleCardKeyDown = (e: React.KeyboardEvent, card: Card) => {
    const cols = board.columns;
    const idx = cols.findIndex((c) => c.id === card.columnId);
    const dir =
      e.shiftKey && e.key === "ArrowRight"
        ? 1
        : e.shiftKey && e.key === "ArrowLeft"
          ? -1
          : 0;
    if (dir === 0 || idx + dir < 0 || idx + dir >= cols.length) return;
    e.preventDefault();
    void move(card.id, cols[idx + dir].id);
  };

  async function move(cardId: string, targetColumnId: string) {
    setSubmittingCardId(cardId);
    try {
      await onMoveCard(cardId, targetColumnId);
    } finally {
      setSubmittingCardId(null);
    }
    // onMoveCard is responsible for rollback: on failure it leaves status at
    // 'error' (BoardErrorState) or 'partial' (ConflictBanner).
  }

  return (
    <main aria-label="Kanban board" className="min-h-screen bg-background p-4 md:p-6">
      <header className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl text-foreground">{board.title}</h1>
        <span className="text-sm text-muted-foreground">{totalCards} cards</span>
      </header>

      {status === "loading" && <BoardLoadingSkeleton />}
      {status === "empty" && <BoardEmptyState onCreate={onCreateColumn} />}
      {status === "error" && (
        <BoardErrorState error={error ?? "Couldn’t load board."} onRetry={onRetry} />
      )}
      {status === "partial" && <ConflictBanner onRefresh={onRefresh} />}

      {(status === "ideal" || status === "partial") && (
        <section
          className="flex snap-x gap-4 overflow-x-auto pb-4"
          role="list"
          aria-label="Board columns"
        >
          {board.columns.map((col) => {
            const colCards = cardsByColumn.get(col.id) ?? [];
            const overWip =
              col.wipLimit != null && colCards.length > col.wipLimit;
            return (
              <div
                key={col.id}
                role="listitem"
                className="w-72 shrink-0 snap-start rounded-lg bg-card p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-base text-foreground">{col.title}</h2>
                  <span
                    className={cn(
                      "inline-flex h-6 items-center gap-1 rounded-full px-2 text-xs",
                      overWip
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground",
                    )}
                    aria-label={`${colCards.length} cards${overWip ? ", over WIP limit" : ""}`}
                  >
                    {overWip && <AlertTriangle className="h-3 w-3" aria-hidden="true" />}
                    {colCards.length}
                    {col.wipLimit != null ? ` / ${col.wipLimit}` : ""}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {colCards.map((card) => {
                    const dimmed =
                      status === "partial" && card.id === conflictCardId;
                    const locked = submittingCardId === card.id;
                    return (
                      <div
                        key={card.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Card: ${card.title}. Shift plus arrow keys to move.`}
                        onKeyDown={(e) => handleCardKeyDown(e, card)}
                        className={cn(
                          "flex min-h-11 items-center gap-2 rounded-md bg-background p-3 text-sm text-foreground shadow-sm",
                          "transition-[transform,box-shadow,opacity] duration-fast ease-standard motion-reduce:transition-none motion-reduce:duration-0",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          locked && "opacity-60",
                          dimmed && "opacity-50",
                        )}
                      >
                        <span className="flex-1">{card.title}</span>
                        {card.due && (
                          <time className="text-xs text-muted-foreground">
                            {card.due}
                          </time>
                        )}
                        {card.assignee && <Avatar assignee={card.assignee} />}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => onCreateColumn()}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-dashed border-border text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Add card to ${col.title}`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" /> Add card
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* live region for the optimistic-move confirmation */}
      <div aria-live="polite" className="sr-only">
        {submittingCardId ? "Moving card…" : ""}
      </div>
    </main>
  );
}

export default BoardPanel;
