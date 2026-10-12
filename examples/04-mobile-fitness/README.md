# Example 04: Mobile Fitness App — End-to-End Walkthrough

> **Goal:** Build a mobile-first workout tracker screen for a fictional app **"Streakrun"**. This domain stresses mobile accessibility — touch targets, thumb reach, one-handed use, and outdoor readability — more than any other.

## 📋 What you'll build

A single mobile screen (the "Today" workout view) with:

- Header with streak count + large tap-friendly profile button
- Today's workout card with a primary "Start workout" CTA
- Weekly progress strip (7 days)
- Bottom tab bar (5 tabs, all ≥ 48px touch targets)
- Pull-to-refresh + offline empty state

## 🎯 Why this example?

Mobile is where AI output ships with invisible a11y failures:

| Failure mode | Framework fix |
|---|---|
| Touch targets at `h-8` (32px) — unusable on the move | Skill 03 (UX) ≥ 44px rule + Skill 07 scorecard |
| Primary CTA buried in the thumb's "hard to reach" zone | Skill 03 IA — bottom placement, thumb-first |
| Low-contrast text (fails outdoors in sunlight) | Skill 04 (tokens) + WCAG AA |
| Tab bar is `div` soup, no `role="tab"` | Skill 09 (Anti-Patterns) zero-tolerance |
| No empty/offline state | Skill 06 (Code) 5-state contract |

## 🚀 Step-by-step (using the framework)

### Step 1: Foundation (Skills 01 + 02)

Load `core-system-prompt` + `prompt-context-loading`. Stack: React Native (Expo) + NativeWind, OR Next.js PWA — the framework is stack-agnostic at the UX layer.

### Step 2: UX Thinking (Skill 03)

Run `prompts/02-ux-thinking.md`. Strategy = **Focus** (one primary action: start today's workout). Maps the 5 states incl. offline/empty.

### Step 3: UI Generation (Skill 04)

Run `prompts/05-ui-generation.md`. Produces mobile wireframe + touch-target spec + builder prompts.

### Step 4: Code Generation (Skill 06)

Run `prompts/06-ai-to-code.md`. Produces `after/components/TodayScreen.tsx`.

### Step 5: Review (Skill 07)

Run `prompts/07-review.md`. See `after/REVIEW.md` — first pass **51/120 (FAIL)**, after refinement **99/120 (PASS)**.

## 📁 Folder structure

```
examples/04-mobile-fitness/
├── README.md
├── prompts/
│   ├── 02-ux-thinking.md
│   ├── 05-ui-generation.md
│   ├── 06-ai-to-code.md
│   └── 07-review.md
├── before/
│   ├── components/
│   │   └── TodayScreen.before.tsx
│   └── NOTES.md
└── after/
    ├── components/
    │   └── TodayScreen.tsx
    └── REVIEW.md
```

## 📊 Expected outcome

| Metric | Before (generic AI) | After (framework) |
|---|---|---|
| Min touch target | 32px (`h-8`) | 48px (`h-12`) |
| Primary CTA position | top (hard thumb reach) | bottom (thumb zone) |
| States | 1 (Ideal) | 5 (incl. offline/empty) |
| Review score (0-120) | ~51 | ~99 |

## 📚 Related

- Skills used: 01, 02, 03, 04, 06, 07, 08, 09
- Cross-refs the mobile edge case in `anti-patterns-detector` Example B.
- Total time to reproduce: ~70 minutes
