# Design System Audit: Collaborative Kanban Board

> Produced by the **`design-system-governance`** skill (Skill 05). Audits the
> UI blueprint (`20-ui-blueprint.md`) against the token system and component
> contracts before `code-generation`. Findings feed `code-generation` as a
> tokenized diff.

---

## 1. Design System Token Verification

| Token role | Specified in blueprint? | Verdict |
| :--- | :--- | :--- |
| `bg-background` | ✅ Board canvas | ✅ Adheres |
| `bg-card` | ✅ Columns + cards | ✅ Adheres |
| `border-border` | ✅ Column dividers | ✅ Adheres |
| `text-foreground` / `text-muted-foreground` | ✅ Titles / metadata | ✅ Adheres |
| `bg-primary` | ✅ Single "+ Add card" CTA | ✅ Adheres |
| `bg-destructive` | ✅ Error/rollback banner | ✅ Adheres |
| `bg-success` | ✅ Drop-confirm affordance | ✅ Adheres |
| `ring-ring` | ✅ Focus visibility | ✅ Adheres |
| **Spacing** | 8px grid: `p-4` columns, `p-3` cards, `gap-4` | ✅ Adheres |
| **Typography** | `text-xl` h1, `text-base` h2, `text-sm` card, `text-xs` meta | ✅ Adheres |
| **Radius** | `rounded-lg` cards/columns, `rounded-md` inputs, `rounded-full` avatars | ✅ Adheres |
| **Elevation** | `shadow-sm` rest, `shadow-md` drag | ✅ Adheres |

**Hardcoded-value scan** (the canonical `rg "\[#\w+\]"` / `rg "w-\[\d+\]"` check
applied to the blueprint text): **0 arbitrary hex codes, 0 arbitrary pixel
spacings found.** The blueprint is token-clean.

---

## 2. Component Contract Violations

| Component | Contract | Status |
| :--- | :--- | :--- |
| `BoardPanel` | Branches on a discriminated `BoardStatus` union; never renders without a status | ✅ Conforms |
| `BoardColumn` | Props: `id`, `title`, `cards`, `wipLimit?`; renders `h2` header + count badge | ✅ Conforms |
| `Card` | Props typed (`Card` interface); focusable; `Enter`→modal, `Shift+Arrows`→move | ✅ Conforms |
| Button (CTA) | Real `<button>` w/ `disabled` while submitting; `h-11`; `focus-visible:ring-2` | ✅ Conforms |
| Input (filter) | `rounded-md`; `aria-label`; token border | ✅ Conforms |
| Table | N/A — board uses columns, not a table | — (correctly avoided) |

**No violations detected.** The blueprint's component inventory maps 1:1 onto
the shadcn contract and the typed API contract in prompt 5b.

---

## 3. Consistency Rationale (exceptions check)

No design exceptions were requested. Every color, spacing, and radius resolves
to a token, so there is nothing to justify with a `// @design-exception` tag.

One **borderline case** flagged for transparency: the dragged-card elevation
(`shadow-md`) differs from rest (`shadow-sm`). This is **intentional and
allowed** — elevation change is the documented drag affordance (UX Decision §6
"Highlight"), not arbitrary style drift.

---

## 4. Actionable Fix Recommendations

The blueprint passes governance cleanly, so this section is a **guardrail list
for `code-generation`** — things to actively avoid while writing `BoardPanel.tsx`:

1. **Reject any `bg-[#…]` or `p-[..px]`** that creeps in during coding. If the
   drag affordance tempts a custom color, use `bg-success/10` on the drop target
   instead.
2. **Keep `status` a discriminated union** — never `string`, never optional.
   The union is what forces all 5 branches at compile time.
3. **CTA stays a `<button>`**, `disabled` while the PATCH is in flight — not a
   `div` with `onClick`.
4. **Touch floor `h-11`** on cards, "+ Add card", and column kebab menus. No
   `h-[42px]`-style under-sized targets.
5. **Avatar size 28px** — render via `h-7 w-7` (token scale), not an arbitrary
   inline style. (28px is a non-interactive decorative element, so the 44px
   floor does not apply to it, but it must still be on the spacing scale.)

---

## Verdict

**PASS — approved for `code-generation`.** Token verification clean, component
contracts conform, no exceptions to justify. Hand the tokenized diff checklist
above to `code-generation`; the resulting `BoardPanel.tsx` then goes to
`review-critique` for the 0-120 scorecard.
