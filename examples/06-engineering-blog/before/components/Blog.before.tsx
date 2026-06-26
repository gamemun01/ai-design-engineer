// BEFORE: Generic AI-generated blog
// Issues: no JSON-LD, img without dimensions, div titles, div tag filter, no states

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Tag filter — div soup, color-only active, no empty state */}
      <div className="flex gap-2 p-4">
        <div className="text-[#0f172a] font-medium">All</div>
        <div className="text-[#64748b]">React</div>
        <div className="text-[#64748b]">Rust</div>
        <div className="text-[#64748b]">DevOps</div>
      </div>

      {/* Post list — img without dimensions (CLS), div titles, magic colors */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {posts.map((p: any) => (
          <div key={p.id} className="border border-[#e2e8f0] rounded-[9px] overflow-hidden">
            <img src={p.cover} className="w-full" />
            <div className="p-4">
              <div className="text-lg font-bold text-[#0f172a]">{p.title}</div>
              <div className="text-[#64748b] text-sm mt-1">{p.excerpt}</div>
              <div className="text-[#94a3b8] text-xs mt-2">{p.author} · {p.readingTime}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Article — div h1, no JSON-LD, no reading measure */}
      <article className="p-8">
        <div className="text-3xl font-bold text-[#0f172a]">How we migrated to Rust</div>
        <div className="text-[#64748b] mt-2">By Ada · 8 min read</div>
        <div className="text-[#334155] mt-4 max-w-3xl">
          We moved our ingestion pipeline from Node to Rust...
        </div>
      </article>
    </div>
  );
}

// NOTE: no structured data (invisible to Google). <img> without width/height causes
// layout shift (fails Lighthouse). Titles are <div>, breaking the document outline +
// SR heading nav. Tag filter is div soup with color-only active + no empty state.
// No Loading/Empty for the list. Magic hex everywhere.
