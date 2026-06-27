// BEFORE: Generic AI-generated mobile "Today" screen
// Issues: tiny touch targets, top CTA, color-only streak, div tabs, Ideal-only

export default function TodayScreen() {
  return (
    <div className="min-h-screen bg-white">
      {/* Streak — color-only, no icon text pairing */}
      <div className="p-4">
        <p className="text-[#f59e0b] text-2xl">🔥12</p>
      </div>

      {/* Today card — CTA at the TOP (out of thumb reach), tiny target */}
      <div className="p-4">
        <h1 className="text-[#0f172a] text-lg">Today's workout</h1>
        <p className="text-[#64748b] text-sm">5k run · 25 min</p>
        <button className="mt-2 bg-[#0d9488] text-white text-[13px] px-3 py-1 rounded">
          Start
        </button>
      </div>

      {/* Weekly strip — no SR summary */}
      <div className="p-4 flex gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <div key={d} className="h-6 w-6 bg-[#22c55e] rounded-full" />
        ))}
      </div>

      {/* Tab bar — div soup, tiny, no role, color-only active */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t p-2">
        <div className="text-[#0d9488] text-xs">Home</div>
        <div className="text-[#94a3b8] text-xs">Stats</div>
        <div className="text-[#94a3b8] text-xs">Plan</div>
        <div className="text-[#94a3b8] text-xs">Friends</div>
        <div className="text-[#94a3b8] text-xs">Me</div>
      </div>
    </div>
  );
}

// NOTE: Start button is h-~28px and at the top. Tab items are text divs at ~16px,
// color-only active. No Loading/Empty/Error/offline. If offline, blank. Streak is
// color-only (amber) with no text fallback for colorblind users.
