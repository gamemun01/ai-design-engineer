"use client";

import { useCallback, useState } from "react";
import { BoardPanel, type Board, type Card } from "@/components/board-panel";
import { initialBoard, initialCards } from "@/lib/mock-data";

type Status = "ideal" | "loading" | "empty" | "error" | "partial";

export default function Home() {
  const [board] = useState<Board>(initialBoard);
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | undefined>();
  const [conflictCardId, setConflictCardId] = useState<string | undefined>();
  // Simulated network: flip to true in dev tools to exercise the error branch.
  const [failNextMove, setFailNextMove] = useState(false);

  // Simulate the initial fetch resolving.
  if (status === "loading") {
    queueMicrotask(() => setStatus("ideal"));
  }

  const handleMoveCard = useCallback(
    async (cardId: string, targetColumnId: string) => {
      const source = cards.find((c) => c.id === cardId);
      if (!source) return;
      // Optimistic update first.
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, columnId: targetColumnId } : c,
        ),
      );
      setError(undefined);
      setConflictCardId(undefined);

      try {
        if (failNextMove) throw new Error("network");
        // Simulated PATCH — no real backend in this playground.
        await new Promise((resolve) => setTimeout(resolve, 120));
      } catch {
        // Rollback on failure → Error state names the card.
        setCards((prev) =>
          prev.map((c) =>
            c.id === cardId ? { ...c, columnId: source.columnId } : c,
          ),
        );
        setError(`Couldn’t move “${source.title}” — network failed. Retry.`);
        setStatus("error");
        return;
      }
    },
    [cards, failNextMove],
  );

  return (
    <>
      <BoardPanel
        board={board}
        cards={cards}
        status={status}
        error={error}
        conflictCardId={conflictCardId}
        onMoveCard={handleMoveCard}
        onRetry={() => {
          setError(undefined);
          setStatus("ideal");
        }}
        onRefresh={() => {
          setConflictCardId(undefined);
          setStatus("ideal");
        }}
        onCreateColumn={() => {
          // New board → demonstrate the Empty state until columns exist.
          if (board.columns.length === 0) return;
        }}
      />
      {/* Dev-only harness: force the error branch to prove rollback works. */}
      <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-border bg-card p-3 text-xs shadow-sm">
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            checked={failNextMove}
            onChange={(e) => setFailNextMove(e.target.checked)}
          />
          Fail next move (test rollback)
        </label>
        <div className="mt-2 flex gap-2">
          {(["ideal", "loading", "empty", "error", "partial"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s);
                  if (s === "partial")
                    setConflictCardId(cards[0]?.id);
                  if (s === "error")
                    setError("Couldn’t load board.");
                }}
                className="rounded border border-border px-2 py-1 text-xs hover:bg-muted"
              >
                {s}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
}
