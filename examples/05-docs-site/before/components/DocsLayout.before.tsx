// BEFORE: Generic AI-generated docs layout
// Issues: no skip link, color-only active, div headings, no copy button, Ideal-only search

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar — magic colors, no skip link before it */}
      <header className="flex items-center justify-between p-4 border-b border-[#e2e8f0]">
        <div className="font-bold text-[#0f172a]">Conduit</div>
        <input placeholder="Search..." className="border border-[#cbd5e1] rounded px-2 py-1 text-sm" />
      </header>

      <div className="flex">
        {/* Sidebar — color-only active state, div headings */}
        <aside className="w-64 p-4 border-r border-[#e2e8f0]">
          <div className="font-bold text-[#0f172a] mb-2">Getting Started</div>
          <a href="#" className="block py-1 text-[#2563eb]">Introduction</a>
          <a href="#" className="block py-1 text-[#64748b]">Install</a>
          <a href="#" className="block py-1 text-[#64748b]">Auth</a>
          <div className="font-bold text-[#0f172a] mt-4 mb-2">API</div>
          <a href="#" className="block py-1 text-[#64748b]">Endpoints</a>
          <a href="#" className="block py-1 text-[#64748b]">Webhooks</a>
        </aside>

        {/* Prose — div headings break the document outline */}
        <main className="flex-1 p-8 max-w-3xl">
          <div className="text-3xl font-bold text-[#0f172a]">Introduction</div>
          <div className="text-[#475569] mt-4">
            Welcome to Conduit. Copy this code:
          </div>
          <pre className="bg-[#0f172a] text-[#e2e8f0] p-4 rounded mt-4 overflow-auto">
            <code>npm install @conduit/sdk</code>
          </pre>
        </main>
      </div>
    </div>
  );
}

// NOTE: no skip link (keyboard users tab through everything). Active nav is color-only
// (blue text). Headings are <div>, breaking the document outline + SR navigation.
// Code block has no copy button and no lang label. Search has no empty/error state
// (blank when no results). Magic hex everywhere.
