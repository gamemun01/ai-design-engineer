# Review: Docs Site — Before vs After

> Two-pass scorecard for `examples/05-docs-site/`.

---

## Pass 1 — First draft (before refinement): FAIL

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PARTIAL | 12 / 25 | `border-[#e2e8f0]`, `text-[#0f172a]`, `text-[#2563eb]` magic colors. |
| **UX Quality** | FAIL | 10 / 35 | No skip link; search has no empty/error state; no TOC. |
| **Engineering Quality** | FAIL | 6 / 25 | `<div>` headings break the outline; active nav color-only; code block no copy/lang. |
| **Performance** | PARTIAL | 10 / 20 | Static, minor. |
| **Security** | PASS | 12 / 15 | No unsafe HTML. |
| **TOTAL** | **FAIL** | **50 / 120** | **6 blockers, 3 zero-tolerance.** |

### 🔴 High Priority (Blockers)

1. Add a skip-to-content link as the first focusable element.
2. Convert active nav/TOC to `aria-current="page"` + visual bar (not color-only).
3. Replace `<div>` headings with real `<h1>`/`<h2>` hierarchy.
4. Add a `CodeBlock` with lang label + copy button (`aria-live` "Copied").
5. Add search empty/error states.
6. Tokenize all colors.

→ Feeds `refinement-workflow`.

---

## Pass 2 — After refinement: PASS

| Dimension | Status | Score | Notes |
| :--- | :---: | :---: | :--- |
| **Visual Quality** | PASS | 22 / 25 | Tokenized; consistent 3-column layout. Minor: dark-mode code theme pending. |
| **UX Quality** | PASS | 30 / 35 | Skip link; search states; TOC; reading measure. |
| **Engineering Quality** | PASS | 24 / 25 | Real headings; `aria-current` on nav + TOC; `CodeBlock` copy + lang + `aria-live`. |
| **Performance** | PARTIAL | 17 / 20 | Client components minimized (search/toggle/copy only). |
| **Security** | PASS | 15 / 15 | Code rendered as text children (no `dangerouslySetInnerHTML`). |
| **TOTAL** | **PASS** | **100 / 120** | **Above 95/120; no blockers. 🏆** |

### ✅ Ship Readiness

- No blockers. Polish backlog:
  - 🟢 Wire the search to a real index (currently contract-only).
  - 🟢 Add a dark-mode code theme.
  - 🟢 Add mobile sidebar collapse.

---

## Comparison

| Metric | Before | After | Delta |
|---|---|---|---|
| Score | 50 / 120 | 100 / 120 | **+50 (+100%)** |
| Skip link | ❌ | ✅ | — |
| Active nav | color-only | `aria-current` + bar | — |
| Headings | `<div>` | `<h1>/<h2>` | — |
| Code copy button | ❌ | ✅ + `aria-live` | — |
| Production-ready | ❌ | ✅ | — |

## Reproduce

```bash
cd examples/05-docs-site
# Follow prompts in order: 02 → 05 → 06 → 07
# Pass 1 (before) should FAIL ~50/120; Pass 2 (after) should PASS ~100/120
```
