# 05 UI Generation — Quality Checklist & Prompt Templates

> **Coming Soon: Detailed guide on using v0, Lovable, 21st.dev, and Claude effectively.**

## Quick Overview

This section covers:

- **When to use each tool** (v0 vs Lovable vs Claude vs 21st.dev)
- **Quality checklist** before shipping
- **Prompt templates** for common UI patterns
- **Common mistakes** and how to fix them
- **Performance optimization** for generated UI

## Quick Checklist

Before you ship AI-generated UI, verify:

- [ ] Mobile responsive (tested on 320px, 768px, 1920px)
- [ ] Accessibility (WCAG 2.1 AA minimum)
- [ ] Loading state (skeleton or spinner)
- [ ] Error state (handled gracefully)
- [ ] Empty state (shows helpful message)
- [ ] Performance (Lighthouse > 80)
- [ ] Cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] Keyboard navigation (Tab through entire page)
- [ ] Touch-friendly (48px minimum targets)
- [ ] Contrast verified (4.5:1 for text)

## Tools Comparison

| Tool | Best For | Speed | Quality | Code Output |
|:---|:---|:---|:---|:---|
| **v0** | React components | Very Fast | Good | Tailwind + React |
| **Lovable** | Full app UI | Very Fast | Good | React + CSS |
| **21st.dev** | Design systems | Fast | Excellent | Production-ready |
| **Claude** | Custom complexity | Flexible | Excellent | Any framework |

---

## 🚀 Next Steps

→ **04-design-system** to understand tokens and components

→ **06-ai-to-code** to learn the full pipeline from design to production

→ **07-review-critique** to establish quality gates
