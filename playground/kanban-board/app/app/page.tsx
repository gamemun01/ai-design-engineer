"use client";

import { useCallback, useEffect, useState } from "react";
import { BoardPanel, type Board, type Card } from "@/components/board-panel";
import { initialBoard, initialCards } from "@/lib/mock-data";

type Status = "ideal" | "loading" | "empty" | "error" | "partial";

export default function Home() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [initialLoading, setInitialLoading] = useState(true);
  const [scenario, setStatus] = useState<Status | null>(null);
  const status = scenario ?? (initialLoading ? "loading" : "ideal");
  const [error, setError] = useState<string | undefined>();
  const [conflictCardId, setConflictCardId] = useState<string | undefined>();
  // Simulated network: flip to true in dev tools to exercise the error branch.
  const [failNextMove, setFailNextMove] = useState(false);

  // Resolve the simulated initial fetch independently of the demo controls.
  useEffect(() => {
    const timer = window.setTimeout(() => setInitialLoading(false), 300);
    return () => window.clearTimeout(timer);
  }, []);

  function createColumn() {
    if (status !== "empty") return;
    setBoard({ ...board, columns: [{ id: crypto.randomUUID(), title: "New column" }] });
    setCards([]);
    setStatus("ideal");
  }

  function addCard(columnId: string) {
    const card = { id: crypto.randomUUID(), title: "New card", columnId };
    setCards(previous => [...previous, card]);
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
        board={status === "empty" ? { ...board, columns: [] } : board}
        cards={status === "empty" ? [] : cards}
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
        onCreateColumn={createColumn}
        onAddCard={addCard}
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
                aria-pressed={status === s}
                onClick={() => {
                  setStatus(s);
                  setConflictCardId(s === "partial" ? cards[0]?.id : undefined);
                  setError(s === "error" ? "Couldn’t load board." : undefined);
                }}
                className="rounded border border-border px-2 py-1 text-xs hover:bg-muted aria-pressed:bg-muted"
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
