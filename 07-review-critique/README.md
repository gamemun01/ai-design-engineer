# 07 Review & Critique — Quality Gates & Scoring System

> **"Shipping without a critique framework is shipping without a parachute."**

This section teaches you how to systematically evaluate UI/UX and establish **quality standards** that separate production-ready from mediocre.

---

## 📚 Table of Contents

1. [The Critique Framework](#the-critique-framework)
2. [Scoring System](#scoring-system)
3. [Before/After Case Studies](#beforeafter-case-studies)
4. [Common Issues & Fixes](#common-issues--fixes)
5. [Checklist for Shipping](#checklist-for-shipping)

---

## The Critique Framework

### 3 Dimensions of Quality

Critique reviews three independent dimensions: **Visual, UX, Engineering**.

#### 1️⃣ **Visual Quality** (Does it look good & professional?)

**Spacing & Alignment**
- Are elements aligned to grid? (check: every element should snap to 4px or 8px grid)
- Is padding consistent? (use tokens, not random values)
- Do edges align? (left, right, bottom should all be flush or intentionally spaced)
- Visual rhythm: Do your eyes follow naturally?

```
❌ BAD: Card 20px from left, 18px from right
✅ GOOD: Card 24px from left, 24px from right (token: lg)
```

**Hierarchy & Emphasis**
- Is the primary action obvious? (color, size, placement)
- Can the eye scan the page in < 5 seconds?
- Are secondary elements de-emphasized? (smaller, lighter, lower contrast)
- Does the layout guide the user's attention?

```
❌ BAD: All buttons same size and color
✅ GOOD: Primary button (large, brand color), secondary (border only, gray)
```

**Color & Contrast**
- Does every text element meet WCAG AA (4.5:1 for normal text)?
- Is color used consistently? (red = danger, green = success, not mixed)
- Do you have "visual noise"? (too many colors used?)
- Does it work in light AND dark mode? (if supported)

```
❌ BAD: #999 text on #F0F0F0 background = 3:1 (WCAG AAA fails)
✅ GOOD: #333 text on #FFF background = 12.6:1 (excellent)
```

**Typography**
- Is there a clear hierarchy? (H1 > H2 > Body)
- Are font sizes correct per token? (no custom sizes)
- Is line-height appropriate? (1.5 for body text minimum)
- Is text readable at mobile size? (16px minimum for body)

```
❌ BAD: 12px body text on mobile (too small, strain)
✅ GOOD: 16px body text, scales proportionally
```

**Visual Consistency**
- Do cards look the same style?
- Are modals consistent with dialogs?
- Do buttons follow the same pattern?
- Would a new team member instantly recognize your product?

```
❌ BAD: Card 1 has round corners, Card 2 is square. Inconsistent shadows.
✅ GOOD: All cards: 12px radius, md shadow. Consistent system.
```

---

#### 2️⃣ **UX Quality** (Is it easy and pleasant to use?)

**Discoverability**
- Is the primary action obvious and accessible?
- Are secondary options discoverable but not overwhelming?
- Does the user know what to do next?
- Are CTAs clear? (no ambiguous button text like "Click Here")

```
❌ BAD: Primary feature hidden in a menu
✅ GOOD: Primary feature prominent above fold
```

**Clarity**
- Can a user understand what each element does without thinking?
- Is the language clear? (avoid jargon, be specific)
- Are error messages helpful? ("Invalid email" vs "Invalid format: must be user@example.com")
- Do icons make sense? (is your "settings" icon actually obvious?)

```
❌ BAD: "Error: HTTP 422 validation failed"
✅ GOOD: "Email address is invalid. Please check and try again."
```

**Friction & Efficiency**
- How many clicks to accomplish the goal?
- Are there unnecessary fields or steps?
- Can power users speed up the process? (keyboard shortcuts, bulk actions)
- Is the user confused at any point?

```
❌ BAD: Sign up requires: Email → Password → Verify Email → Confirm Phone → Complete Profile = 5 steps
✅ GOOD: Sign up requires: Email → Password → Confirm = 3 steps (profile later)
```

**Consistency**
- Do similar actions work the same way across the app?
- Are patterns repeated? (good for discoverability)
- Is navigation consistent?

```
❌ BAD: Button 1 text says "Submit", Button 2 says "Save", Button 3 says "Confirm" (same action)
✅ GOOD: All buttons say same action with same style
```

**Feedback & Responsiveness**
- Does the user know when something is loading?
- Is feedback instant (< 100ms) or delayed with indication?
- Are success/error states clear?
- Does the UI respond to user input immediately?

```
❌ BAD: User clicks button, nothing happens, they wait 5 seconds then it processes
✅ GOOD: Button shows loading spinner immediately, user knows something happened
```

**Edge Cases**
- What happens when there's no data? (empty state shown?)
- What happens on error? (helpful message + retry option?)
- What happens on slow network? (loading states shown?)
- What if user has no permissions? (clear message, not broken UI?)

```
❌ BAD: Empty dashboard shows nothing, user thinks it's broken
✅ GOOD: Empty dashboard shows "You haven't created any projects yet. Click + to start" + illustration
```

---

#### 3️⃣ **Engineering Quality** (Can it be built, maintained, scaled?)

**Semantic HTML**
- Are you using correct HTML tags? (<button>, <form>, <input>, not all <div>)
- Is the DOM structure logical? (hierarchy makes sense)
- Can a screen reader understand the page?

```
❌ BAD: <div onclick="handleClick">Click me</div>
✅ GOOD: <button onClick={handleClick}>Click me</button>
```

**Accessibility**
- WCAG 2.1 AA compliance (minimum standard)
- Focus states visible on all interactive elements
- Keyboard navigation works (Tab, Shift+Tab, Enter, Escape)
- ARIA labels where needed (screen reader support)
- Color isn't the only indicator

```
✅ GOOD accessibility checklist:
- [ ] Tested with keyboard only
- [ ] Tested with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Contrast ratio 4.5:1+
- [ ] Focus indicators visible
- [ ] Semantic HTML used
```

**Responsiveness**
- Does it work at 320px (mobile)?
- Does it work at 768px (tablet)?
- Does it work at 1920px (desktop)?
- Are touch targets 48px minimum?

```
✅ TEST at these breakpoints:
- 320px (iPhone SE)
- 375px (iPhone 12)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (desktop)
- 2560px (ultra-wide)
```

**Performance**
- Lighthouse score > 80
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Images optimized (compressed, correct format)
- Bundle size reasonable

```
✅ Lighthouse > 80 means:
- Performance: 80+ (fast load)
- Accessibility: 90+ (accessible)
- Best Practices: 90+ (follows standards)
- SEO: 90+ (search friendly)
```

**Reusability & Maintainability**
- Can this component be used in multiple places?
- Is the code readable by other team members?
- Are design tokens used (not hard-coded values)?
- Is the component tested?

```
❌ BAD: Styling hard-coded in component, can't reuse
✅ GOOD: Styling uses design tokens, component props configurable
```

---

## Scoring System

Use this **10-point scoring scale** for each dimension:

### Visual Quality Score (0-10)

- **10:** Perfect alignment, spacing, hierarchy, colors, typography. Looks premium.
- **8-9:** Professional, minor inconsistencies. Shipping-ready.
- **6-7:** Decent, noticeable issues. Needs revision.
- **4-5:** Poor alignment/spacing, inconsistent colors. Major revision needed.
- **1-3:** Chaotic, unfinished. Start over.

### UX Quality Score (0-10)

- **10:** Obvious, intuitive, delightful. Users don't have questions.
- **8-9:** Clear and efficient. Minor friction points. Shipping-ready.
- **6-7:** Functional but some confusion. Needs refinement.
- **4-5:** Multiple friction points, unclear steps. Major changes needed.
- **1-3:** Broken, confusing. Start over.

### Engineering Quality Score (0-10)

- **10:** Perfect semantics, accessible, responsive, performant. Production-ready.
- **8-9:** Solid code, accessible, responsive. Minor optimizations needed.
- **6-7:** Functional but technical debt. Works but could be cleaner.
- **4-5:** Accessibility issues, responsive problems. Significant refactoring needed.
- **1-3:** Broken, inaccessible, not responsive. Start over.

### Combined Score

```
Final Score = (Visual + UX + Engineering) / 3

9.0+: Excellent - Ship with confidence
7.0-8.9: Good - Ship with minor fixes
6.0-6.9: Acceptable - Ship but plan refinements
Below 6.0: Don't ship - Major revisions needed
```

---

## Before/After Case Studies

### Case Study 1: Dashboard Critique

**Project:** Analytics dashboard for SaaS product managers

#### ❌ BEFORE: AI-Generated (No Critique)

```
Visual Score: 6/10
- Spacing inconsistent (16px, 20px, 14px mix)
- KPI cards don't align to grid
- Colors work but feel flat
- Typography hierarchy unclear

UX Score: 5/10
- Chart is hard to read at glance
- Table rows not scannable
- Filter controls hidden in modal
- No empty state

Engineering Score: 6/10
- HTML mostly semantic but some div soup
- Accessibility issues (contrast, focus states)
- Not responsive at 1920px
- Lighthouse: 72

Combined: 5.7/10 ❌ NOT SHIPPING
```

#### ✅ AFTER: With Critique & Refinement

**Changes Made:**

1. **Visual** (16 spacing units → 4 tokens)
   - All spacing: sm, md, lg, xl (no random values)
   - Cards aligned to 8px grid
   - Added color strategy: brand primary + grays
   - Typography: h1 for page title, h3 for KPI labels, body for data

2. **UX** (redesigned information hierarchy)
   - KPI cards prominent (above fold, large)
   - Chart simplified (remove clutter)
   - Filters prominent (top bar, not hidden)
   - Added empty state: "No data for selected period"
   - Added error state: "Failed to load metrics"

3. **Engineering** (made accessible + performant)
   - Semantic: <table> for data, <button> for actions
   - Accessibility: WCAG AA contrast, focus states, ARIA labels
   - Responsive: Tested at 320px, 768px, 1440px
   - Performance: Optimized images, lazy load table rows
   - Lighthouse: 92

```
Visual Score: 9/10 ✅
UX Score: 9/10 ✅
Engineering Score: 9/10 ✅
Combined: 9.0/10 ✅ SHIP IT
```

---

### Case Study 2: Form Critique

**Project:** Checkout form for e-commerce

#### ❌ BEFORE: Generic Form

```
Visual Score: 5/10
- Inputs look cramped
- Labels tiny and hard to read
- Error messages red text only (hard to spot)
- CTA button not prominent

UX Score: 4/10
- Too many fields (10 fields on mobile)
- No validation feedback until submit
- Error messages not helpful ("Field invalid")
- No indication of progress (how many steps?)

Engineering Score: 5/10
- Inputs are <div> with contenteditable (not semantic)
- No ARIA labels
- Not keyboard navigable
- Images not lazy loaded

Combined: 4.7/10 ❌ CRITICAL - FIX BEFORE SHIPPING
```

#### ✅ AFTER: Refined for Mobile-First

**Changes Made:**

1. **Visual**
   - Inputs: 48px height (touch-friendly)
   - Labels: 16px bold (readable)
   - Error messages: Red + ⚠️ icon + helpful text
   - CTA: Full-width, high contrast

2. **UX**
   - Reduced fields: Moved optional fields to profile after checkout
   - Progressive validation: Show error on blur (not overwhelm)
   - Help text: "We'll send a receipt to this email"
   - Step indicator: "Step 2 of 3: Shipping"

3. **Engineering**
   - Semantic: <form>, <label>, <input> tags
   - Accessibility: aria-labels, error messages linked
   - Keyboard: Tab through fields, Enter submits
   - Mobile: Single column, touch-friendly

```
Visual Score: 8/10 ✅
UX Score: 8/10 ✅
Engineering Score: 8/10 ✅
Combined: 8.0/10 ✅ READY TO SHIP
```

---

## Common Issues & Fixes

### Issue #1: Spacing Inconsistency

```
❌ Problem:
- Some elements 10px apart
- Some elements 20px apart
- No pattern

✅ Fix:
- Use tokens: sm (8px), md (16px), lg (24px)
- Change prompt: "Use only these spacings: 8px, 16px, 24px"
- Review: Ensure all gaps use tokens
```

### Issue #2: Accessibility Contrast Fail

```
❌ Problem:
- Text #888 on background #F5F5F5 = 3:1 (fails)
- User can barely read it

✅ Fix:
- Use darker text: #333 on #F5F5F5 = 12:1 (excellent)
- Update color tokens to ensure 4.5:1 minimum
- Test with WebAIM Contrast Checker
```

### Issue #3: Non-Responsive at Mobile

```
❌ Problem:
- Desktop layout at 320px
- Buttons overlap
- Text unreadable
- Scroll required

✅ Fix:
- Single column layout
- Full-width inputs/buttons
- Font size 16px minimum
- Test at actual device size
```

### Issue #4: Missing Edge States

```
❌ Problem:
- No loading state → user thinks nothing happened
- No error state → cryptic message
- No empty state → blank page confuses user

✅ Fix:
- Add spinner during API call
- Show helpful error message + retry button
- Show "No data yet" with illustration
```

### Issue #5: Inaccessible Focus States

```
❌ Problem:
- Buttons have no focus indicator
- Keyboard users can't see where they are
- Screen reader doesn't announce buttons

✅ Fix:
- Add focus outline: 2px solid, 2px offset
- Add ARIA label: aria-label="Close menu"
- Use semantic <button> tags
```

---

## Checklist for Shipping

Use this before every deployment:

### Visual ✓
- [ ] Spacing consistent (using tokens only)
- [ ] Alignment correct (grid-based)
- [ ] Colors on-brand and consistent
- [ ] Typography hierarchy clear
- [ ] No visual inconsistencies

### UX ✓
- [ ] Primary action obvious
- [ ] User can complete task in < 2 min
- [ ] Error messages helpful
- [ ] Empty state shown
- [ ] Loading state shown
- [ ] Edge cases handled

### Engineering ✓
- [ ] Semantic HTML
- [ ] Accessibility: WCAG 2.1 AA
- [ ] Keyboard navigation works
- [ ] Responsive (320px, 768px, 1440px)
- [ ] Performance: Lighthouse > 80
- [ ] No console errors

### Score ✓
- [ ] Visual: 8+/10
- [ ] UX: 8+/10
- [ ] Engineering: 8+/10
- [ ] Combined: 8+/10 minimum to ship

---

## 🎯 Takeaways

1. **Critique in 3 dimensions:** Visual, UX, Engineering
2. **Score everything:** 10-point scale creates objectivity
3. **Combined score matters:** Can't be 10/10 visual + 3/10 UX
4. **Before/After shows impact:** Critique creates measurable improvement
5. **Shipping standard:** 8.0+/10 combined minimum
6. **Iterate ruthlessly:** Critique → Fix → Re-score → Ship

---

## 🚀 Next Steps

→ **08-production-patterns**: See real examples with scores

→ **01-foundation**: Remind yourself of quality standards

→ **Review checklist before every PR**
