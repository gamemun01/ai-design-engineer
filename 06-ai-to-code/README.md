# 06 AI-to-Code Pipeline — From Design to Production

> **Coming Soon: Complete workflow from design tokens to deployed Next.js applications.**

## Quick Overview

This section covers:

- **Recommended tech stack** (React, Next.js, Tailwind, shadcn/ui)
- **Design token export** from Figma/design tools
- **AI code generation workflow** (Cursor, Claude Code, Windsurf)
- **Code review checklist** before shipping
- **Performance optimization** (bundle size, load time)
- **Deployment best practices**

## Recommended Stack

```
Frontend: React 18 + Next.js 14
Styling: Tailwind CSS
Components: shadcn/ui (when available)
Motion: Framer Motion
State: Zustand or React Context
Deployment: Vercel
Testing: Vitest + React Testing Library
```

## Workflow

```
1. Design in Figma (or screenshot)
   ↓
2. Export design tokens (colors, spacing, typography)
   ↓
3. Create component contract (inputs, outputs, states)
   ↓
4. AI generates React component (Cursor, Claude Code)
   ↓
5. Code review (semantic HTML, accessibility, performance)
   ↓
6. Add loading/error states
   ↓
7. Test responsiveness & accessibility
   ↓
8. Deploy
```

## Code Review Checklist

- [ ] Semantic HTML (<button>, <form>, <input>, not all divs)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Loading states
- [ ] Error states
- [ ] State management clear
- [ ] No console errors
- [ ] Images optimized
- [ ] Lighthouse score > 80

---

## 🚀 Next Steps

→ **04-design-system** to understand design tokens

→ **07-review-critique** to establish quality gates

→ **08-production-patterns** to see real examples
