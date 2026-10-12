# Step 6: AI-to-Code Prompt

> Use this after Step 5 (UI spec locked in). Combine with `code-generation` skill (Skill 06).

---

## Prompt

You are a senior mobile frontend engineer. Convert the Streakrun "Today" screen spec into a production-grade React component (React Native + NativeWind, or Next.js PWA — declare which). Follow the `code-generation` skill strictly.

**Stack constraints:**

- React Native (Expo) + NativeWind, or Next.js 14 PWA + Tailwind — pick one and state it.
- TypeScript strict mode.
- Allowed deps only: react, lucide-react (or react-native equivalent), clsx, tailwind-merge. No new packages.

**Deliverable: `TodayScreen.tsx` implementing ALL 5 lifecycle states:**

1. **Loading** — skeleton + `aria-busy` / `accessibilityElementsHidden` busy state.
2. **Empty** — "Rest day" notice with a gentle CTA (no dead end).
3. **Error** — offline panel (`role="alert"`), "You're offline — last synced X" + retry.
4. **Ideal** — header + TodayCard + WeeklyStrip + bottom tabs.
5. **Partial** — weekly strip with some days synced, some pending (noted).

**Quality gates (enforced):**

- Every interactive element ≥ `h-12` (48px); primary CTA ≥ `h-14` (56px) in the **lower third** (thumb zone).
- `role="tab"` / `aria-current="page"` on the bottom tab bar (not `div` soup).
- Streak is 🔥 icon + count + "day streak" text (never color-only).
- `aria-label` on the icon-only profile button.
- Colors are tokens only. No hex.
- Visible focus / active states for keyboard + touch.
- Memoize the weekly-strip SR summary with `useMemo`.

**Anti-patterns to block:**

- ❌ Touch targets under 44px
- ❌ `div onClick` / `TouchableOpacity` without role on tabs
- ❌ Color-only status
- ❌ Hard-coded hex
- ❌ Missing offline/empty states

After generating, note the next step is `review-critique` (Step 7) — expect a first-pass FAIL that `refinement-workflow` will fix.
