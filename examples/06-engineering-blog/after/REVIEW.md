# Review: Engineering Blog — Before vs After

> Two-pass scorecard for `examples/06-engineering-blog/`.

---

## Pass 1 — First draft (before refinement): FAIL

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PARTIAL | 12 / 25 | `text-[#0f172a]`, `border-[#e2e8f0]`, `rounded-[9px]` magic values. |
| **UX Quality** | FAIL | 11 / 35 | Tag filter has no empty state; no list Loading/Empty; no reading measure. |
| **Engineering Quality** | FAIL | 8 / 25 | `<div>` titles; tag filter is `div` soup; no JSON-LD. |
| **Performance** | FAIL | 9 / 20 | `<img>` without dimensions → CLS; fails Core Web Vitals. |
| **Security** | PASS | 12 / 15 | No unsafe HTML. |
| **TOTAL** | **FAIL** | **52 / 120** | **6 blockers, 3 zero-tolerance.** |

### 🔴 High Priority (Blockers)

1. Add JSON-LD `Article` schema.
2. Convert `<img>` → `next/image` with explicit width/height.
3. Replace `<div>` titles with real `<h1>`/`<h3>`.
4. Convert tag filter to `<button>`/links with `aria-pressed`; add Empty state.
5. Add list Loading/Empty states.
6. Tokenize colors + add a prose measure.

→ Feeds `refinement-workflow`.

---

## Pass 2 — After refinement: PASS

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PASS | 23 / 25 | Tokenized; consistent cards; prose measure. Minor: dark-mode prose pending. |
| **UX Quality** | PASS | 31 / 35 | Tag links; reading measure; author bio; related slots. |
| **Engineering Quality** | PASS | 24 / 25 | Real headings; JSON-LD `Article`; tags as links. |
| **Performance** | PARTIAL | 17 / 20 | `next/image` with dimensions (no CLS); cover lazy-load by default. |
| **Security** | PASS | 15 / 15 | JSON-LD via a static object (sanitized); no user input in `dangerouslySetInnerHTML`. |
| **TOTAL** | **PASS** | **102 / 120** | **Above 95/120; no blockers. 🏆** |

### ✅ Ship Readiness

- No blockers. Polish backlog:
  - 🟢 Wire the tag filter to actual filtering (Empty state ready).
  - 🟢 Add OG image + canonical in `app/layout`.
  - 🟢 Add a dark-mode prose theme.

---

## Comparison

| Metric | Before | After | Delta |
|---|---|---|---|
| Score | 52 / 120 | 102 / 120 | **+50 (+96%)** |
| Structured data | ❌ | ✅ JSON-LD Article | — |
| Cover image dims | ❌ (CLS) | ✅ `next/image` | — |
| Titles | `<div>` | `<h1>/<h3>` | — |
| Production-ready | ❌ | ✅ | — |

## Reproduce

```bash
cd examples/06-engineering-blog
# Follow prompts in order: 02 → 05 → 06 → 07
# Pass 1 (before) should FAIL ~52/120; Pass 2 (after) should PASS ~102/120
```
