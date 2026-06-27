---
agent: UX
skill: ux-decision-framework
adapter: claude
run_id: run-001
step: 1
status: done
next: ui-generation-structured
artifact_score: 8/8 sections complete
---

# 10 — UX Decision Handoff

Full artifact: [`../../10-ux-decision.md`](../../10-ux-decision.md)

**Handoff payload (UX → UI):**

- **JTBD:** functional (advance work visibly), emotional (feel in control),
  social (signal what I'm working on).
- **Strategy:** Control (operator tool; predictability over discovery).
- **5-state map:** Ideal / Loading (skeleton) / Empty (new board) / Error
  (rollback+Retry) / Partial (conflict+Refresh).
- **Key tasks:** P0 move card + read WIP; P1 recover from failed move, add card.
- **A11y:** keyboard-move parity (`Shift+Arrows`), `role="alert"`, `aria-live`.

**Deferred (do NOT build this run):** Gantt/timeline, AI-suggested moves,
gamification — per Control-strategy scope discipline.
