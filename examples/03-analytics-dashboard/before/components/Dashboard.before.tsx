// BEFORE: Generic AI-generated dashboard — monolith, magic colors, Ideal-only

export default function Dashboard() {
  return (
    <div className="p-4">
      {/* KPI row — magic colors, color-only trends, no states */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-[#f8fafc] rounded-[9px]">
          <p className="text-[#475569] text-[13px]">Revenue</p>
          <p className="text-2xl text-[#0f172a]">$48,200</p>
          <p className="text-[#22c55e]">+12.4%</p>
        </div>
        <div className="p-4 bg-[#f8fafc] rounded-[9px]">
          <p className="text-[#475569] text-[13px]">Active users</p>
          <p className="text-2xl text-[#0f172a]">3,210</p>
          <p className="text-[#ef4444]">-2.1%</p>
        </div>
      </div>

      {/* Chart — no loading/empty/error, magic color */}
      <div className="mt-4 p-4 bg-white rounded-[9px]">
        <h2 className="text-[15px] text-[#0f172a]">Revenue over time</h2>
        <div className="h-64 bg-[#f1f5f9] rounded flex items-center justify-center text-[#94a3b8]">
          [chart]
        </div>
      </div>

      {/* Table — div onClick sort, no aria-sort, no states */}
      <div className="mt-4 p-4 bg-white rounded-[9px]">
        <h2 className="text-[15px] text-[#0f172a]">Top customers</h2>
        <div className="grid grid-cols-3 text-[#475569] text-[13px]">
          <div onClick={() => sortBy("name")}>Name</div>
          <div onClick={() => sortBy("rev")}>Revenue</div>
          <div onClick={() => sortBy("date")}>Joined</div>
        </div>
        {rows.map((r: any) => (
          <div key={r.id} className="grid grid-cols-3 text-[#0f172a]">
            <span>{r.name}</span>
            <span>${r.rev}</span>
            <span>{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// NOTE: monolith (~implied 500+ lines in real output). Only Ideal state. Color-only
// trends (green/red text with no icon/text). div onClick sort with no keyboard.
// Magic hex everywhere. No memoization. No aria-sort. If the API fails, blank.
