// before/BoardPage.before.tsx
// Generic AI "first draft" of a Kanban board — deliberately broken to exercise
// the review/refinement skills. Expected score: ~46/120 (FAIL).
// Defects baked in (see before/NOTES.md for the full breakdown):
//   - div onClick "Add card" (non-semantic, no keyboard)
//   - magic hex colors + magic px spacing (no tokens)
//   - h-[42px] cards (under 44px touch floor)
//   - only Ideal state coded (no Loading/Empty/Error/Partial)
//   - console.log left in, total recomputed every render

import React from 'react';

export default function BoardPage({ board }: { board: any }) {
  console.log('render board', board?.id);
  const total = board.columns.reduce((n: number, c: any) => n + c.cards.length, 0);

  return (
    <div style={{ padding: '24px', background: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#0f172a', fontSize: '20px' }}>{board.title}</h1>
        <div
          onClick={() => alert('add card')}
          style={{ background: '#2563eb', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
        >
          + Add card
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
        {board.columns.map((col: any) => (
          <div key={col.id} style={{ width: '280px', background: '#ffffff', padding: '12px', borderRadius: '8px' }}>
            <h2 style={{ color: '#334155', fontSize: '15px' }}>{col.title} ({col.cards.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {col.cards.map((card: any) => (
                <div
                  key={card.id}
                  onClick={() => alert(card.title)}
                  style={{ height: '42px', background: '#f1f5f9', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
