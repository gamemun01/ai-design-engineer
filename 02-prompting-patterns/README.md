# 02 Prompt Engineering Patterns — Structured Prompting for AI Design

> **"A prompt is an architectural document, not a casual request."**

This section teaches you how to write **structured, reusable prompts** that consistently produce high-quality AI-generated UI. Instead of vague requests like "make a beautiful dashboard," you'll learn the **8-Layer Prompt Architecture** that professionals use.

---

## 📚 Table of Contents

1. [The 8-Layer Prompt Architecture](#the-8-layer-prompt-architecture)
2. [Bad vs Good Prompts](#bad-vs-good-prompts)
3. [Pattern Library](#pattern-library)
4. [Reusable Prompt Templates](#reusable-prompt-templates)
5. [Common Mistakes & Fixes](#common-mistakes--fixes)

---

## The 8-Layer Prompt Architecture

Every production-ready prompt needs **8 layers of information**. This hierarchy ensures AI understands your full vision.

### Layer 1: Product Context

**Why:** AI needs to understand what problem you're solving

```
Layer 1 Example:

You're designing a mobile app for yoga instructors to manage classes.

Product: Yoga class management platform
Primary user: Yoga instructors (tech-comfort: medium)
Use case: Schedule classes, track attendance, send reminders
Market: Emerging, yoga is trending, users expect modern app
Competitor: ClassPass, Mindbody (premium but expensive)
Business model: Subscription
Time-to-market: 3 weeks (MVP)
```

### Layer 2: User Context

**Why:** Different users need different designs

```
Layer 2 Example:

Primary user: Yoga instructors
- Age: 25-50
- Tech comfort: Medium (not programmers, but can use apps)
- Pain point: Managing 20+ classes per week, tracking attendance, sending reminders
- Frequency of use: 3-5 times per day
- Context: Working from yoga studio or home
- Device: Mobile (primary), tablet (secondary)

Secondary user: Studio owners
- Age: 35-60
- Tech comfort: Low
- Use case: View overall revenue, see which classes are popular
- Frequency: Daily
- Device: Desktop (office) or iPad (on-the-go)

Edge user: Class attendees
- Just need to see schedule, sign up, get reminders
- Not the primary focus
```

### Layer 3: UX Goal

**Why:** This is the "north star" for the design

```
Layer 3 Example:

Primary goal:
"Reduce friction in scheduling & attendance tracking so teachers spend < 2 min per class setup"

Supporting goals:
1. Make it obvious where to add a new class
2. Show attendance status at a glance (who's coming, who's not)
3. Make it easy to send reminders (one-tap)
4. Mobile-first—most usage on-the-go

Success metric:
"User can schedule a class + send reminder in < 60 seconds"
```

### Layer 4: Visual Direction

**Why:** Sets the tone and brand perception

```
Layer 4 Example:

Overall vibe: Modern but approachable, not corporate

Color scheme:
- Primary: #6B63B5 (purple—calming, yoga association)
- Accent: #FF6B9D (coral—energy, warmth)
- Neutral: #F5F5F5 (light gray), #2C3E50 (dark gray)

Typography:
- Headlines: Poppins (modern, friendly)
- Body: Inter (readable, clean)
- Code (if any): Mono space for data

Styling approach:
- Modern minimalist
- Plenty of white space
- Soft shadows (not harsh)
- Rounded corners (48px radius on buttons, 12px on cards)
- Icons: Feather icons (simple, consistent)

NOT:
- Skeuomorphism (realistic textures)
- Glassmorphism (frosted glass effect)
- Harsh contrasts
- Comic Sans or display fonts in body text

Reference: Look at Calm app (peaceful, approachable), Headspace (modern, minimal)
```

### Layer 5: Layout Rules

**Why:** Ensures consistency and scalability

```
Layer 5 Example:

Grid system:
- Desktop: 12-column grid
- Tablet: 6-column grid
- Mobile: 4-column grid (but usually single column)

Spacing (design tokens):
- xs: 4px (very tight)
- sm: 8px (tight)
- md: 16px (standard)
- lg: 24px (loose)
- xl: 32px (very loose)
- xxl: 48px (huge gaps)

Use: Never mix spacing—always use tokens

Viewport breakpoints:
- Mobile: < 640px (single column, max-width 320px content)
- Tablet: 640px - 1024px (2 columns, max-width 600px content)
- Desktop: > 1024px (3 columns, max-width 1200px)

Typography scale:
- h1: 32px (page title)
- h2: 24px (section title)
- h3: 20px (subsection)
- body: 16px (normal text)
- small: 14px (labels, hints)
- tiny: 12px (captions)

Safe area considerations:
- Mobile: 16px padding on sides
- Keyboard on mobile occupies ~50% screen—shift content up
```

### Layer 6: Component Rules

**Why:** Defines the building blocks for consistency

```
Layer 6 Example:

Button component:
- Primary button: Purple (#6B63B5), white text, 48px tall, 16px horizontal padding
- Secondary button: Border only (purple), transparent background, same sizing
- States: Default, Hover (darker), Active (pressed), Disabled (gray)
- Icon inside button: 16px icon + 8px spacing + text
- Danger button: Red background, white text (for delete, cancel payment)

Input field:
- Height: 48px
- Border: 1px solid #E0E0E0
- Padding: 12px left/right
- Placeholder text: Gray (#999)
- Focus state: Blue border (2px), no shadow
- Error state: Red border + error message below

Card component:
- Background: White
- Border: None (uses shadow for depth)
- Border radius: 12px
- Padding: 20px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Hover: Shadow increases to 0 8px 16px rgba(0,0,0,0.15)

List item:
- Padding: 16px
- Border-bottom: 1px solid #F0F0F0
- Icon (if any): 24px, 12px margin-right

Modal:
- Max-width: 500px on desktop, 90% on mobile
- Backdrop: Black with 40% opacity
- Close button: Top-right corner, X icon
- Padding: 20px
```

### Layer 7: Interaction Rules

**Why:** Defines how things behave and respond

```
Layer 7 Example:

Navigation:
- Mobile: Bottom tab bar (5 tabs maximum)
- Desktop: Left sidebar (collapsible)
- Active tab: Purple background
- Non-active tab: Gray text

Forms:
- Show validation errors on blur (not on every keystroke)
- Success message: Green background, appears for 3 seconds
- Loading state: Button shows spinner, text says "Saving..."
- Error state: Red border + error message displayed below field

Lists:
- Scrolling: Smooth (not jerky)
- Pull-to-refresh: Mobile only (on certain lists)
- Infinite scroll or pagination: Use pagination (more predictable)
- Empty state: Show illustration + helpful message + CTA

Transitions:
- All animations: 200-300ms (feels snappy, not sluggish)
- Avoid: Animations > 500ms (feel slow)
- Page transitions: Fade or slide (not bounce)

Keyboard navigation:
- Tab order: Left to right, top to bottom
- Enter key: Submits forms, activates buttons
- Escape key: Closes modals, cancels editing

Accessibility requirements (non-negotiable):
- Color isn't the only indicator (use icons + text)
- Focus state visible (blue outline minimum)
- ARIA labels for screen readers
- Semantic HTML (<button>, <input>, <form>, not <div> everywhere)
```

### Layer 8: Technical Constraints

**Why:** Ensures the design can actually be built

```
Layer 8 Example:

Technology stack:
- Frontend: React 18 + Next.js 14
- Styling: Tailwind CSS (no custom CSS if possible)
- State: Zustand (simple global state)
- UI components: shadcn/ui (when available)

Browser support:
- Safari 14+
- Chrome 90+
- Edge 90+
- NOT: IE 11 (end of life)

Performance requirements:
- Page load: < 3 seconds
- Interaction response: < 100ms (feels instant)
- Image size: Compress before upload
- Bundle size: Keep component < 50KB

Data constraints:
- List max items shown: 100 (then pagination)
- Image ratio: 16:9 for thumbnails
- Text length: Title max 50 chars, description max 200 chars

API/Backend reality:
- Loading data takes 1-2 seconds
- Show skeleton loading while fetching
- Have error state for failed API calls
- Retry logic (show "Retry?" button)

Offline consideration:
- Works offline where possible (cache)
- Show "offline" indicator if not available
- Queue actions, sync when reconnected

API rate limiting:
- Autocomplete: Debounce 300ms
- Search: Debounce 500ms
- Avoid: Multiple rapid API calls
```

---

## Bad vs Good Prompts

### ❌ Bad Prompt #1: Too Vague

```
"Create a beautiful modern yoga class management dashboard"

Problems:
- "Beautiful" is subjective (beautiful to whom?)
- "Modern" could mean glossy, minimal, brutalist, neomorphic
- No context about users or use case
- AI has to guess, often produces generic dribbble-style UI

Result: Generic card-heavy dashboard that doesn't solve real problems
```

### ✅ Good Prompt #1: Structured & Specific

```
"Design a yoga class management dashboard for yoga instructors.

PRODUCT CONTEXT:
- App: Yoga class scheduling + attendance
- Users: Yoga instructors (tech-comfort: medium)
- Primary use: View classes, check who's coming, send reminders
- Frequency: 3-5 times per day
- Target: MVP in 3 weeks

USER GOAL:
"I want to schedule a class, see who's enrolled, send a reminder, and track attendance in < 2 minutes"

LAYOUT (Mobile-First):
1. Top: Week view (current week, swipe to next week)
2. Main: Today's classes in chronological order
3. Each class card shows: Time, name, enrolled count, actions (edit, reminder, attendance)
4. Bottom: + button to add new class

VISUAL STYLE:
- Calm, approachable (like Calm app or Headspace)
- Colors: Primary purple (#6B63B5), accent coral (#FF6B9D)
- Typography: Poppins (headlines), Inter (body)
- Rounded corners (12px cards, 48px buttons)
- Plenty of white space

COMPONENTS:
- Class card: 20px padding, 12px border-radius, purple hover effect
- Time display: Large text (24px), bold
- Enrollment badge: Small circle with number
- Action buttons: Icon only (edit pencil, send bell, checkmark)

INTERACTIONS:
- Tap class card to view details
- Tap + button to add class
- Tap bell to send reminder
- Loading states: Show spinner in button

ACCESSIBILITY:
- WCAG 2.1 AA contrast
- Focus states visible
- Semantic buttons (<button> tags)
- Icons have text labels for screen readers

TECHNICAL:
- React + Tailwind CSS
- Show skeleton loading while fetching classes
- Handle error state (show retry)
- Works on iPhone 12 and up (320px min)

TARGET: Simple, functional, builds trust through clarity (not flashiness)
Reference: Calm app, Headspace, Apple Health app"
```

### ❌ Bad Prompt #2: Prompt Spaghetti

```
"Create a login page that's modern and has a nice form with email and
password fields and also social login buttons for Google and Facebook and
a forgot password link and it should be responsive and work on mobile and
tablet and desktop and have nice animations and transitions and feel
premium and be accessible and have a security badge and be fast and
not take up too much space and should have a light and dark mode and..."

Problems:
- No hierarchy (what's most important?)
- Contradictory goals ("space-efficient" + "animations")
- Mixing technical requirements with design goals
- 50+ things to do, AI doesn't know where to focus

Result: Confused output, missing critical details, over-built
```

### ✅ Good Prompt #2: Clear Hierarchy & Structure

```
"Design a login page for yoga studio owners.

PRIMARY GOAL: Reduce login abandonment (faster, more trustworthy)

USERS:
- Studio owners (age 35-60, tech comfort: low)
- Who wants: Simple, obviously secure

LAYOUT:
- Max width: 400px (focus, not overwhelming)
- Vertical stack: Logo → Title → Form → Social → Links

FORM FIELDS:
1. Email input (required, validate format)
2. Password input (required, with show/hide toggle)
3. "Remember me" checkbox (optional)
4. Primary button: "Sign In" (large, full width)
5. Secondary: "Forgot Password?" link
6. Social buttons: Google, Apple (2-button row below form)

VISUAL:
- Color: White background, brand primary for CTA
- Typography: Large labels (16px), input text 16px (accessibility)
- Spacing: Comfortable white space, not cramped
- Icons: Feather icons for eye toggle, lock, email

STATES:
1. Default: Form empty, button enabled
2. Filled: Button shows "Sign In" (primary color)
3. Loading: Button shows spinner, text "Signing in..."
4. Error: Red border on field, error message below (e.g., "Invalid email")
5. Success: After successful login, show checkmark briefly (not needed for this page)

ACCESSIBILITY:
- Labels connected to inputs (<label for='email'>)
- Error messages linked to inputs (aria-describedby)
- Focus visible (blue outline)
- Works with keyboard only (Tab, Enter)
- Password field properly marked (type='password')

RESPONSIVENESS:
- Mobile (< 640px): Full width, centered
- Desktop (> 640px): Centered container (400px)

SECURITY INDICATORS:
- Lock icon in password field
- SSL badge or text: "Secure connection" (subtle, bottom)
- NOT: Fake security elements

PERFORMANCE:
- No heavy animations
- Instant response to input
- Quick form submission

MOBILE-SPECIFIC:
- Email field: Keyboard type = email
- Password field: Keyboard type = password
- Touch targets: 48px minimum
- No hover states (mobile doesn't hover)

REFERENCE: Stripe login, GitHub login (simple, trustworthy, fast)"
```

---

## Pattern Library

Different products need different patterns. Here's a library of **reusable starting points**:

### 📊 SaaS Dashboard Pattern

**For:** Analytics, metrics, reporting products

```
Structure:
- Top: KPI cards (4-6 key metrics)
- Center: Main chart/visualization
- Bottom: Data table with detailed view
- Right sidebar: Filters and date range selector

Color scheme:
- Neutral with accent for alerts
- Green for positive metrics, red for warnings, gray for neutral

Density:
- High information density (power users expect this)
- Scannable layout (eye can find what it needs quickly)

Interaction:
- Hover shows detail
- Click to drill down
- Keyboard shortcuts for power users
```

### 💰 Fintech Dashboard Pattern

**For:** Banking, payments, investment platforms

```
Structure:
- Top: Account balance (large, prominent)
- Center: Recent transactions
- Bottom: Insights and alerts

Color scheme:
- Professional, conservative (greens/grays, not vibrant)
- Red ONLY for warnings/alerts, not interactive elements

Security indicators:
- Lock icons prominent
- SSL badges visible
- Emphasis on data privacy

Interactions:
- Transaction details on tap
- Export/print statements
- Security-focused (re-authenticate for sensitive actions)

Typography:
- Mono-space for numbers (for easy scanning)
- Clear hierarchy for amounts
```

### 🏥 Healthcare Portal Pattern

**For:** Patient dashboards, doctor portals, clinic management

```
Structure:
- Top: Patient/doctor summary
- Center: Appointments, prescriptions, test results
- Right: Alerts and notifications

Privacy considerations:
- Never show sensitive data by default (click to reveal)
- Confirm before sharing
- Clear data usage explanation

Accessibility:
- WCAG 2.1 AAA (stricter than usual, many older patients)
- Large text options
- High contrast mode

Color:
- Calming (blues, greens)
- Red for urgent alerts only
- Clear status indicators

Tone:
- Empathetic, not clinical
- Clear explanations (avoid medical jargon)
```

### 🤖 AI Agent Workspace Pattern

**For:** ChatGPT-like interfaces, AI assistants, chat applications

```
Structure:
- Left: Conversation history
- Center: Main chat window (messages)
- Right: Context/settings panel

Key interactions:
- Real-time message streaming (shows content as it arrives)
- Message states: Sending → Sent → Read
- Error handling: Show retry if message fails

Accessibility:
- Keyboard shortcuts for send (Cmd/Ctrl + Enter)
- Screen reader support for messages
- Focus management when new messages arrive

Performance:
- Virtualized message list (don't render all, only visible)
- Debounce typing indicators

Mobile:
- Full-height chat window
- Bottom input (not hidden by keyboard)
- Swipe to delete message
```

### 🛠️ Admin Panel Pattern

**For:** Internal tools, content management, admin dashboards

```
Structure:
- Left: Navigation sidebar (or top nav on mobile)
- Top: User profile, settings, help
- Center: Main content area
- Right: Context actions (bulk edit, export)

Design:
- Dense information (internal users are power users)
- Keyboard shortcuts prominent
- Batch operations for efficiency
- Dark mode (many admins work late)

Features:
- Search/filter in every table
- Sortable columns
- Bulk select checkboxes
- Inline edit (click field to edit)
- Quick export (CSV, PDF)

Tone:
- Direct, not polished (internal tool)
- Emphasis on speed and efficiency
```

### 📱 Mobile-First E-commerce Pattern

**For:** Shopping apps, product discovery, checkout

```
Structure:
- Top: Search, cart icon, wishlist
- Main: Product grid (2-3 columns)
- Bottom: Category tabs

Product cards:
- Image (primary)
- Price (large)
- Rating (stars)
- CTA: "Add to cart" (high contrast)

Interaction:
- Tap card to view details
- Swipe through images
- Quick add-to-cart (no page change)

Checkout flow:
- Minimize steps
- Pre-fill address
- Multiple payment options
- Clear shipping costs upfront

Mobile optimization:
- Thumb-friendly buttons (bottom placement)
- Large touch targets (48px minimum)
- Fast-loading images
- Minimal data usage
```

---

## Reusable Prompt Templates

### Template #1: Dashboard

```
"Design a [product type] dashboard for [user role].

PRIMARY GOAL:
[What decision does the user need to make in < 10 seconds?]

USERS:
- Primary: [Who] (tech-comfort: [level], use frequency: [how often])
- Secondary: [Who]

LAYOUT (Mobile-First):
1. [Section 1]
2. [Section 2]
3. [Section 3]

KEY METRICS (for analytics dashboards):
- [Metric 1]
- [Metric 2]
- [Metric 3]

COLOR SCHEME:
- Primary: [color] ([meaning])
- Accent: [color] ([meaning])
- Neutral: [color] ([usage])

INTERACTIONS:
- [Interaction 1]: [Behavior]
- [Interaction 2]: [Behavior]

ACCESSIBILITY:
- WCAG 2.1 [AA/AAA]
- Focus visible
- Semantic HTML

REFERENCE: [Competitor/Reference product]
```

### Template #2: Form

```
"Design a [form type] form for [user context].

USE CASE: [What is the user trying to accomplish?]

FIELDS (in order):
1. [Field name] (required/optional, type: [text/email/select/etc])
   - Label: [Text]
   - Placeholder: [Text]
   - Validation: [Rule]
   - Help text: [If needed]
2. [Field name]
3. [etc]

PRIMARY ACTION: [Button text & behavior]
SECONDARY ACTION: [Link or button]

LAYOUT:
- Single column or multi-column: [Choose based on fields]
- Max width: [400px desktop, 90% mobile]

STATES:
- Default: [Description]
- Filled: [Description]
- Error: [Description]
- Loading: [Description]
- Success: [Description]

VALIDATION:
- Show on: [Blur/Submit/Both]
- Error message: [Helpful, not technical]

ACCESSIBILITY:
- Labels: Visible, connected to inputs
- Error messages: Linked to fields
- Keyboard navigation: Logical tab order

MOBILE:
- Single column
- Large inputs (48px height)
- Show keyboard hint (email, phone, etc)
```

### Template #3: Component Library Entry

```
"Design the [component name] component with these requirements:

COMPONENT PURPOSE: [What does it do?]
USED IN: [Pages/Sections where it appears]

VARIANTS:
1. Default: [Description]
2. [Variant]: [Description]
3. [Variant]: [Description]

SIZES:
- Small: [Use case]
- Medium: [Use case]
- Large: [Use case]

STATES:
- Default: [Visual description]
- Hover: [Change]
- Focus: [Change]
- Active/Selected: [Change]
- Disabled: [Gray out, no interaction]
- Loading: [Show spinner]
- Error: [Red border, error message]

CONTENT GUIDELINES:
- Text length: Min [x] to Max [y] characters
- Icon size: [size]px
- Image ratio: [ratio]

ACCESSIBILITY:
- Semantic HTML: [Tag type]
- ARIA attributes: [What's needed?]
- Keyboard interaction: [Tab, Enter, etc]
- Screen reader announcement: [What should it say?]

CODE OUTPUT:
- Framework: React
- CSS: Tailwind
- Dependencies: [shadcn/ui, Radix, etc]

REFERENCE IMAGE: [Link or description]
```

---

## Common Mistakes & Fixes

### ❌ Mistake #1: Assuming AI Knows Your Industry

```
Bad: "Design a financial dashboard"

AI thinks: Generic metrics dashboard

Better: "Design a forex trading dashboard for day traders.
Users make 50+ trades per day. Need real-time updates, fast execution.
High-density layout, lots of numbers, color-coded (green/red for gain/loss).
Reference: Bloomberg terminal, not modern SaaS."
```

### ❌ Mistake #2: Leaving Out Constraints

```
Bad: "Design a product list page"

AI thinks: Big, beautiful product cards, lots of spacing

Better: "Design a product list for mobile (320px width), high density.
Show 1-2 products per row max. Each card: image, name, price, rating.
Touch targets: 48px minimum. No hover effects on mobile.
Mobile users have slow 4G—optimize image loading."
```

### ❌ Mistake #3: Mixing Contradictions

```
Bad: "Make it clean and minimal but also show lots of information"

AI is confused: Clean usually means empty, lots of info means dense

Better: "Design for power users—high information density but clear hierarchy.
Use spacing and typography to make it scannable (not overwhelm).
Every piece of information must be useful (no decorative elements).
Users can find what they need in < 5 seconds."
```

### ❌ Mistake #4: Forgetting Mobile

```
Bad: "Design a dashboard"

AI generates: Desktop-only design

Better: "Design mobile-first. Desktop is secondary.
Mobile constraint: 320px width, stacked single-column layout.
Desktop: 2-3 column layout. Make both work equally well.
Touch targets: 48px minimum. Desktop hover states OK."
```

### ❌ Mistake #5: Vague Accessibility

```
Bad: "Make it accessible"

AI guesses: Maybe adds alt text

Better: "WCAG 2.1 AA compliance minimum.
- Contrast: 4.5:1 for all text
- Focus visible on all interactive elements
- Semantic HTML (<button>, <form>, <input>)
- ARIA labels where needed (screen readers)
- Works with keyboard only (Tab, Enter, Escape)
- Color isn't the only indicator"
```

---

## 🎯 Takeaways

1. **8 layers = structured prompt** (product context through technical constraints)
2. **Hierarchy matters** (don't dump everything, prioritize)
3. **Constraints drive quality** (tight specs beat vague briefs)
4. **Mobile-first** (start with smallest device, scale up)
5. **Accessibility from the start** (not an afterthought)
6. **Pattern library** (reuse successful patterns)
7. **Bad prompts produce bad designs** (garbage in, garbage out)

---

## 🚀 Next Steps

→ **03-ux-thinking**: Learn user research and journey mapping to inform better prompts.

→ **04-design-system**: Learn how to define tokens and components for consistency.

→ **05-ui-generation**: Learn prompt templates for different component types.

→ **06-ai-to-code**: Learn how to export from design to production code.
