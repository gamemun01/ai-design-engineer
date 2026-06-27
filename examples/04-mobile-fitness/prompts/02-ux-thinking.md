# Step 2: UX Thinking Prompt

> Use this prompt with Claude Code / Gemini after loading the **ux-decision-framework** skill (Skill 03).

---

## Prompt

You are a senior mobile product designer. Using the `ux-decision-framework` skill rules, design the UX decisions for the **"Today" screen** of **Streakrun**, a mobile workout tracker.

**Context:**

- Audience: casual fitness users, ages 18-60, often exercising outdoors / one-handed / on the move
- Primary goal: start today's workout in ≤2 taps
- Secondary goal: view streak + weekly progress
- Constraints: mobile-only, used outdoors (high-glare), often one-handed (right thumb), occasionally offline

**Deliverables (full UX Decision Document, 8 sections, no empty cells):**

1. **Product Context (JTBD)** — functional (do today's workout) / emotional (stay motivated) / social (share streak).
2. **Key User Tasks** — P0: start today's workout; P1: view streak/progress; P2: open past workout.
3. **Journey & Task Flow** — entry (app open / notification), main path, success state, **error/recovery states** (offline, no workout scheduled, sensor unavailable).
4. **UX Strategy** — pick Focus / Discover / Control / Assist and justify. (Expected: **Focus** — one dominant CTA.)
5. **Information Architecture** — visual hierarchy (streak header → today's card with big CTA → weekly strip → bottom tabs); thumb-zone placement (primary CTA in lower 1/3).
6. **Cognitive Load** — simplify (one workout shown), defer (history in a tab), highlight (the Start button), limit (max 5 tabs).
7. **Accessibility** — touch targets ≥ 48px (ideally 56px for the primary CTA); contrast for outdoor use (≥ 4.5:1, aim 7:1 for body); no color-only status; haptic + visual feedback; one-handed reach.
8. **Trade-offs, Risks & Validation** — thumb reach vs screen-top prominence; offline UX; validation via task-success-rate on a real device outdoors.

**Constraints:**

- Primary CTA in the **thumb zone** (lower portion), not the top.
- Every interactive element ≥ 44px, primary ≥ 48px.
- Plan the offline + empty states here, not in code.

Begin.
