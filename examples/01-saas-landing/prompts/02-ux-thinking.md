# Step 2: UX Thinking Prompt

> Use this prompt with Claude Code / Claude.ai after loading the **ux-decision-framework** skill (Skill 03).

---

## Prompt

You are a senior product designer. Using the `ux-decision-framework` skill rules, design the user journey and information architecture for a SaaS landing page for **Flowmetric** — an analytics platform for B2B product teams.

**Context:**
- Audience: VP Product, Head of Growth, PMs at Series A–C SaaS companies
- Primary goal: book a 15-min demo
- Secondary goal: capture email for a free product trial
- Competitors: Mixpanel, Amplitude, PostHog
- Brand voice: data-driven, opinionated, not corporate-bland

**Deliverables (output as Markdown):**

1. **User Journey Map** — table with 5 columns: Awareness → Consideration → Decision → Trial → Expansion. For each stage list: user thoughts, emotions, friction points, framework touchpoint.
2. **Information Architecture** — sitemap showing nav structure, primary CTA placement, secondary CTA placement.
3. **Section-by-Section Content Brief** — for each section (Nav, Hero, Social Proof, Features, How It Works, Testimonials, Pricing, FAQ, Final CTA, Footer) list:
   - **User goal** at that section
   - **Message** (one sentence)
   - **Visual** (what to show)
   - **CTA** (if any)
   - **Anti-pattern** (what NOT to do)
4. **Success Metrics** — primary (demo bookings/week) and secondary (trial signups, scroll depth, time-to-section)
5. **Open Questions** — at least 3 things to validate with user research before coding.

**Constraints:**
- Bias for clarity over cleverness
- Mobile-first thinking (60%+ traffic is mobile)
- B2B tone: confident, specific, no vague claims like "revolutionary"
- Hero must show the product within 5 seconds of landing

Begin.
