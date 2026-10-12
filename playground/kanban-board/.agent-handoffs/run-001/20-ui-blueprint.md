---
agent: UI
skill: ui-generation-structured
adapter: claude
run_id: run-001
step: 2
status: done
next: design-system-governance
layers_complete: 8/8
---

# 20 — UI Blueprint Handoff

Full artifact: [`../../20-ui-blueprint.md`](../../20-ui-blueprint.md)

**Handoff payload (UI → Design System / Frontend):**

- **Component inventory:** BoardPanel (root, 5-state) + 4 state subcomponents +
  BoardColumn + Card + CardModal + ConflictBanner.
- **Layout:** horizontal columns `w-72`, `gap-4`, `snap-x` mobile; single
  primary CTA per surface.
- **8-layer architecture:** all 8 layers filled (Product → User → UX goal →
  Visual → Layout → Components → Interaction → Technical).
- **Two builder prompts produced:** App-Only (v0/Lovable/Bolt) + Agent-Only
  (Replit/Devin with typed contract + optimistic-rollback state machine).
- **Token discipline:** 0 hex/px in spec; all roles map to tokens.
