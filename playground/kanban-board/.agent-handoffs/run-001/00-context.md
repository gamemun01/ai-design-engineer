---
agent: Context
skill: prompt-context-loading
adapter: claude
run_id: run-001
step: 0
status: done
next: ux-decision-framework
---

# 00 — Context Handoff

Full artifact: [`../../00-context-loading.md`](../../00-context-loading.md)

**Summary:** Framework repo, not an app — Node.js tooling only. Stack baseline
React/Next/TS/Tailwind/shadcn. 5-state contract, WCAG 2.1 AA, ≥95/120 ship gate.
Risk flagged: do not perturb `tests/golden/` (mitigated by placing this run in
`playground/`). Route → `core-system-prompt` then `ux-decision-framework`.
