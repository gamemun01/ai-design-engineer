# Step 5: UI Generation Prompt

> Use this after Step 2 (UX brief) and Step 4 (Design tokens locked in). Combine with `ui-generation-structured` skill (Skill 05).

---

## Prompt

You are a UI designer. Generate a high-fidelity wireframe description (text + ASCII layout + spacing tokens) for the Flowmetric landing page. Follow the `ui-generation-structured` skill rules strictly.

**Design tokens (locked from Step 4):**
- Primary: `indigo-600` (#4f46e5)
- Accent: `cyan-500` (#06b6d4)
- Background base: `white` (#ffffff) and `slate-50` (#f8fafc)
- Text: `slate-900` (headings), `slate-600` (body)
- Font: Inter (body) + Cal Sans (display)
- Radius: `0.75rem` for cards, `0.5rem` for buttons
- Shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1)` for cards

**Layout system:** 12-col grid, max-width `1200px`, gutter `24px`, vertical rhythm `8px` base.

**Sections to generate (in order):**

1. **Navbar** — sticky, transparent on hero then solid on scroll. Logo (left), 5 nav links (center), "Sign in" (ghost) + "Get demo" (primary) on right. Mobile: hamburger → full-screen menu.
2. **Hero** — left column: H1 (60-72px, Cal Sans), subhead (20px, slate-600), 2 CTAs (primary + secondary with "watch demo" play icon), 4.8★ rating + "Trusted by 2,000+ teams". Right column: stylized product screenshot of dashboard inside a browser chrome frame, floating sparkline badges around it.
3. **Logo Bar** — grayscale row of 6 fictional B2B logos + caption "Trusted by teams at".
4. **Features (3-col grid)** — heading + 3 cards each with icon, title, 2-line description, "Learn more" link.
5. **How It Works (3 steps)** — numbered 01/02/03 with bold step name, 1-line description, mini illustration.
6. **Testimonials (3 cards)** — quote, name, role, company, avatar placeholder.
7. **Pricing (3 tiers)** — Free / Pro (most popular badge) / Enterprise. Toggle for monthly/annual.
8. **FAQ (accordion)** — 6 questions covering: "Is my data secure?", "How long is setup?", "Can I cancel anytime?", etc.
9. **Final CTA** — full-width gradient background (indigo→cyan), white text, large H2, single primary button.
10. **Footer** — 4-column links + logo + social icons + copyright.

**For each section output:**
- ASCII wireframe OR Figma-style structured text description
- Tailwind class list for the container
- Spacing tokens (mt-X, py-X, gap-X)
- A11y notes (semantic tags, aria labels, focus order)
- Mobile breakpoint adjustments

**Anti-patterns to avoid:**
- ❌ Center-aligned everything
- ❌ More than 2 font sizes per section
- ❌ "Lorem ipsum" — use realistic B2B copy
- ❌ Stock photo placeholders that look stocky
- ❌ Gradients on text (low contrast)
- ❌ Auto-playing carousels
- ❌ Modal popups on first visit

Begin with the Hero, then continue in section order.
