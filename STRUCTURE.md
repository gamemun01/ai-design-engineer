# Repository Structure & Navigation Guide

## 📂 Complete Framework Organization

```
ai-design-engineer/
│
├── README.md                          ← START HERE (new positioning & overview)
│
├── 01-foundation/README.md            ← Role, mindset, anti-patterns
│   └── "What is AI Design Engineer?"
│
├── 02-prompting-patterns/README.md    ← 8-Layer architecture + pattern library
│   └── "How to write structured prompts"
│
├── 03-ux-thinking/README.md           ← User research, journey mapping
│   └── "Beyond UI to real UX"
│
├── 04-design-system/README.md         ← Tokens, components, a11y
│   └── "Design tokens + component contracts"
│
├── 05-ui-generation/README.md         ← Quality checklist & templates
│   └── "v0, Lovable, Claude, 21st.dev"
│
├── 06-ai-to-code/README.md            ← Pipeline & code review
│   └── "Figma → tokens → code"
│
├── 07-review-critique/README.md       ← Critique framework + scoring
│   └── "Visual + UX + Engineering quality gates"
│
├── 08-production-patterns/README.md   ← 5 real case studies
│   └── "SaaS, Banking, Healthcare, AI, Enterprise"
│
├── skills/
│   └── ai-design-engineer.md          ← Original AI agent skill (reference)
│
├── assets/                            ← 10 page blueprints
│   ├── homepage-blueprint.png
│   ├── login-blueprint.png
│   └── ... (8 more)
│
├── docs/
│   ├── overview.md                    ← Legacy overview
│   └── test-skill.md
│
├── scripts/
│   └── validate-skill.js              ← Validation
│
└── package.json & README.md           ← Project config
```

---

## 🚀 How to Navigate

### For First-Time Users

**Start here in order:**

```
1. README.md (main)
   ↓
2. 01-foundation/README.md (role, mindset)
   ↓
3. 02-prompting-patterns/README.md (8-layer architecture)
   ↓
4. 04-design-system/README.md (tokens & components)
   ↓
5. 07-review-critique/README.md (quality scoring)
   ↓
6. 08-production-patterns/README.md (real examples)
```

**Time estimate:** 2-3 hours to read through

---

### For Different Roles

#### 🎨 **Designers**

```
1. 01-foundation (understand your role)
   ↓
2. 03-ux-thinking (user research & journeys)
   ↓
3. 04-design-system (design tokens & constraints)
   ↓
4. 02-prompting-patterns (turn UX into prompts)
   ↓
5. 08-production-patterns (see real examples)
```

#### 💻 **Frontend Engineers / AI Coders**

```
1. 01-foundation (understand the collaboration)
   ↓
2. 04-design-system (tokens & component contracts)
   ↓
3. 06-ai-to-code (React, Next.js, Tailwind)
   ↓
4. 07-review-critique (quality checklist)
   ↓
5. 08-production-patterns (code patterns)
```

#### 👔 **Product Managers / Leaders**

```
1. README (full overview)
   ↓
2. 01-foundation (understand role distribution)
   ↓
3. 07-review-critique (quality standards)
   ↓
4. 08-production-patterns (see what's possible)
```

#### 🤖 **AI Tool Builders (v0, Lovable, etc.)**

```
1. 02-prompting-patterns (structured prompting)
   ↓
2. 04-design-system (token generation)
   ↓
3. 05-ui-generation (quality gates)
   ↓
4. 07-review-critique (scoring system)
   ↓
5. 08-production-patterns (patterns to learn)
```

---

## 📚 Key Sections at a Glance

### 1. 01-Foundation (Read First)

**Time: 15-20 min**
**Purpose:** Understand what an AI Design Engineer is and isn't

**Key takeaways:**

- Human vs AI responsibilities table
- Anti-patterns to avoid
- When to use AI vs human judgment
- Required mindset

**Read if:** Starting fresh, need role clarity

---

### 2. 02-Prompting-Patterns (Essential)

**Time: 30-40 min**
**Purpose:** Learn the 8-layer prompt architecture

**Key takeaways:**

- Layer 1-8 breakdown with examples
- Bad vs good prompt comparisons
- 7 pattern library templates (SaaS, Fintech, Healthcare, etc.)
- Common mistakes & fixes

**Read if:** Want to improve AI prompt quality

---

### 3. 03-UX-Thinking (Foundation)

**Time: Coming soon (full content)**
**Purpose:** Learn UX reasoning beyond UI

**Currently:** Outline with key concepts
**Future:** User research, journey maps, task flows

**Read if:** Want to strengthen UX thinking

---

### 4. 04-Design-System (Critical)

**Time: 25-35 min**
**Purpose:** Define design tokens and component contracts

**Key takeaways:**

- Spacing, typography, color, radius, shadow scales
- Component contracts (button, card, input, etc.)
- Accessibility requirements
- JSON export format with examples

**Read if:** Building for consistency at scale

---

### 5. 05-UI-Generation (Reference)

**Time: Coming soon (full content)**
**Purpose:** Learn when/how to use each AI tool

**Currently:** Quick comparison table
**Future:** Detailed templates for each tool

**Read if:** Want tool recommendations

---

### 6. 06-AI-to-Code (Reference)

**Time: Coming soon (full content)**
**Purpose:** Design tokens → production code workflow

**Currently:** Tech stack recommendation + workflow outline
**Future:** Full code examples and deployment guide

**Read if:** Taking AI UI to production React

---

### 7. 07-Review-Critique (Essential)

**Time: 30-40 min**
**Purpose:** Establish quality gates before shipping

**Key takeaways:**

- 3-dimension critique framework (visual, UX, engineering)
- 120-point scoring system (Visual, UX, Engineering, Performance, Security)
- Before/after case studies with scores
- Shipping checklist
-->
- 120-point scoring system (Visual: 25, UX: 35, Engineering: 25, Performance: 20, Security: 15)
- Before/after case studies with scores (95/120 gate)
- Shipping checklist

**Read if:** Want to ensure quality standards

---

### 8. 08-Production-Patterns (Real World)

**Time: 30-45 min**
**Purpose:** See complete case studies end-to-end

**Case studies included:**
<!-- ORIGINAL CASE STUDIES LIST:
1. SaaS Analytics Dashboard (9.2/10)
2. Banking Admin Panel (9.0/10)
3. Healthcare Portal (9.1/10)
4. AI Agent Workspace (9.0/10)
5. Enterprise Internal Tool (8.8/10)
-->
1. SaaS Analytics Dashboard (112/120)
2. Banking Admin Panel (108/120)
3. Healthcare Portal (109/120)
4. AI Agent Workspace (108/120)
5. Enterprise Internal Tool (105/120)

Each shows: Problem → UX → Prompt → Generated → Refined → Shipped

**Read if:** Want to see real examples before starting

---

## 🎯 Learning Paths by Duration

### Quick Path (30 min)

1. README (overview)
2. 01-foundation (mindset)
3. 08-production-patterns (real examples)

### Standard Path (2-3 hours)

1. README
2. 01-foundation
3. 02-prompting-patterns
4. 04-design-system
5. 07-review-critique
6. 08-production-patterns

### Deep Path (4-5 hours)

1. Start with README
2. Follow Learning Path section (Week 1-6 breakdown)
3. Read all 8 sections in order
4. Study case studies in detail
5. Practice with your own project

---

## 🔗 Cross-References

**Want to:**

- **Write better prompts?**
  - Start: 02-prompting-patterns
  - Then: 04-design-system (tokens to reference)
  - Example: 08-production-patterns (real prompts)

- **Critique UI/Code?**
  - Start: 07-review-critique
  - Reference: 04-design-system (standards)
  - Examples: 08-production-patterns (before/after)

- **Ship faster?**
  - Start: 08-production-patterns (see what's possible)
  - Learn: 02-prompting-patterns (how to prompt)
  - Quality gate: 07-review-critique (checklist)

- **Understand roles?**
  - Start: 01-foundation (human vs AI)
  - Deep dive: Each section explains collaboration points

- **Build component system?**
  - Start: 04-design-system (tokens + contracts)
  - Apply: 02-prompting-patterns (include in prompts)
  - Verify: 07-review-critique (consistency check)

---

## 📊 Content Completeness

| Section | Status | Pages | Time |
|:---|:---|:---|:---|
| 01-Foundation | ✅ Complete | 20 | 15-20 min |
| 02-Prompting | ✅ Complete | 25 | 30-40 min |
| 03-UX-Thinking | 🔲 Outline | 3 | Coming soon |
| 04-Design-System | ✅ Complete | 22 | 25-35 min |
| 05-UI-Generation | 🔲 Outline | 3 | Coming soon |
| 06-AI-to-Code | 🔲 Outline | 2 | Coming soon |
| 07-Review-Critique | ✅ Complete | 20 | 30-40 min |
| 08-Production | ✅ Complete | 18 | 30-45 min |
| **Total** | **✅ 75%** | **~113** | **~2-3 hrs** |

---

## 🚀 Next Steps

**Choose your starting point:**

- **New to this framework?** → Start with [README](./README.md)
- **Want role clarity?** → Read [01-foundation](./01-foundation)
- **Ready to prompt?** → Jump to [02-prompting-patterns](./02-prompting-patterns)
- **Need standards?** → Go to [07-review-critique](./07-review-critique)
- **Show me examples?** → See [08-production-patterns](./08-production-patterns)

---

## 💡 Pro Tips

1. **Read sections in suggested order** (not randomly)
2. **Refer to case studies** when you have questions
3. **Use checklists** from 07-review-critique before shipping
4. **Save design tokens** from 04-design-system to your project
5. **Bookmark prompt templates** from 02-prompting-patterns
6. **Print or bookmark** 01-foundation anti-patterns

---

## 📞 Getting Help

**Questions about:**

- **Role/mindset?** → 01-foundation
- **Prompting?** → 02-prompting-patterns + 08-production-patterns (example prompts)
- **Design system?** → 04-design-system (with JSON examples)
- **Quality standards?** → 07-review-critique (scoring framework)
- **Real examples?** → 08-production-patterns (5 case studies)

---

**Ready to build production-grade AI designs?** Start with [README](./README.md) 🚀
