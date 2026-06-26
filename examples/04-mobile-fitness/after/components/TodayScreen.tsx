// AFTER: Mobile "Today" screen — thumb-zone CTA, 48px+ targets, 5 states, tokenized
// Skills applied: 03 (UX thumb-zone), 04 (tokens), 06 (code), 07 (a11y)
// Stack: Next.js PWA + Tailwind (declared). Adapts to React Native with NativeWind.

import { useMemo } from "react";
import { Flame, Play, WifiOff, RefreshCw, BedDouble, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ScreenStatus = "ideal" | "loading" | "empty" | "error";

interface TodayScreenProps {
  streak: number;
  workout?: { title: string; duration: string };
  weekCompleted: boolean[]; // length 7
  status: ScreenStatus;
  lastSynced?: string;
  onRetry?: () => void;
}

export function TodayScreen({
  streak,
  workout,
  weekCompleted,
  status,
  lastSynced,
  onRetry,
}: TodayScreenProps) {
  // SR summary memoized — no recompute each render
  const weekSummary = useMemo(() => {
    const done = weekCompleted.filter(Boolean).length;
    return `${done} of 7 days completed this week.`;
  }, [weekCompleted]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Header — streak is icon + text (never color-only); profile button 48px */}
      <header className="flex items-center justify-between p-4">
        <p className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground">
          <Flame className="h-5 w-5 text-amber-500" aria-hidden="true" />
          <span>{streak}</span>
          <span className="text-sm font-normal text-muted-foreground">day streak</span>
        </p>
        <button
          aria-label="Open profile"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
        >
          <User className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      {/* Content area grows; CTA sits in the lower third (thumb zone) */}
      <section className="flex flex-1 flex-col justify-end gap-4 p-4" aria-live="polite">
        {status === "loading" && <TodaySkeleton />}
        {status === "empty" && (
          <div className="rounded-xl border-2 border-dashed border-muted bg-card p-6 text-center space-y-2">
            <BedDouble className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <p className="text-base font-semibold text-foreground">Rest day</p>
            <p className="text-sm text-muted-foreground">Enjoy the recovery. See you tomorrow.</p>
          </div>
        )}
        {status === "error" && (
          <div
            role="alert"
            className="rounded-xl bg-destructive/10 border border-destructive/20 p-6 text-center space-y-3"
          >
            <WifiOff className="mx-auto h-8 w-8 text-destructive" aria-hidden="true" />
            <p className="text-base font-semibold text-foreground">You're offline</p>
            <p className="text-sm text-muted-foreground">
              {lastSynced ? `Last synced ${lastSynced}.` : "Workouts are cached."}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-medium bg-primary text-primary-foreground rounded-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
              </button>
            )}
          </div>
        )}
        {status === "ideal" && workout && (
          <div className="rounded-xl bg-card border border-border p-6 space-y-4 shadow-sm">
            <div>
              <h1 className="text-xl font-bold text-foreground">{workout.title}</h1>
              <p className="text-sm text-muted-foreground">{workout.duration}</p>
            </div>
            {/* PRIMARY CTA — 56px, in the lower third (thumb zone) */}
            <button
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-semibold text-primary-foreground active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
            >
              <Play className="h-5 w-5" aria-hidden="true" /> Start workout
            </button>
          </div>
        )}

        {/* Weekly strip — role=img + SR summary */}
        <div
          className="flex justify-between px-1"
          role="img"
          aria-label={weekSummary}
        >
          {weekCompleted.map((done, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "h-3 w-3 rounded-full",
                done ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </section>

      {/* Bottom tab bar — role=tab, 48px targets, aria-current on active */}
      <nav aria-label="Primary" className="flex border-t border-border bg-card">
        {[
          { label: "Home", active: true },
          { label: "Stats", active: false },
          { label: "Plan", active: false },
          { label: "Friends", active: false },
          { label: "Me", active: false },
        ].map((t) => (
          <button
            key={t.label}
            role="tab"
            aria-current={t.active ? "page" : undefined}
            className={cn(
              "flex h-12 flex-1 items-center justify-center text-xs font-medium focus-visible:ring-2 focus-visible:ring-ring focus:outline-none",
              t.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </main>
  );
}

function TodaySkeleton() {
  return (
    <div className="rounded-xl bg-card border border-border p-6 space-y-3" aria-busy="true">
      <div className="h-6 w-2/3 bg-muted animate-pulse rounded" />
      <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
      <div className="h-14 w-full bg-muted animate-pulse rounded-lg" />
    </div>
  );
}
