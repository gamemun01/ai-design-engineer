# AI Design Engineer Operating System — Production Skills

> **"We've moved from 'generation skills' to a complete production operating system."**

This directory contains **system-level skills** that work together as a **complete operating system for shipping production AI designs**—not just generating them.

---

## 🏗️ Skills Architecture

The skills are organized by **maturity level** and **function**:

```
Level 1: FOUNDATION (Beginner)
├── core-system-prompt.md           (Who you are as an AI Design Engineer)
└── ux-decision-framework.md        (How to think about decisions)

Level 2: GENERATION (Intermediate)
├── ui-generation-structured.md     (How to generate UI with constraints)
└── design-system-governance.md     (How to enforce consistency)

Level 3: PRODUCTION (Advanced)
├── code-generation.md              (How to generate production code)
├── review-critique.md              (How to review & score)
├── refinement-workflow.md           (How to iterate)
└── anti-patterns-detector.md       (What to avoid)

Level 4: ORCHESTRATION (Expert)
└── multi-agent-workflow.md         (How agents work together)

REFERENCE
└── SKILL_MATRIX.md                 (Which skill for which scenario)
└── ANTI_PATTERNS.md                (Common mistakes to avoid)
```

---

## 📊 Skill Progression Matrix

| Skill | Level | Use When | Output |
|:---|:---|:---|:---|
| **core-system-prompt** | Beginner | First time using AI for design | Clear role definition |
| **ux-decision-framework** | Beginner | Making design decisions | Reasoning + justification |
| **ui-generation-structured** | Intermediate | Need to generate UI variants | Consistent generated UI |
| **design-system-governance** | Intermediate | Managing multiple components | Token-enforced consistency |
| **code-generation** | Advanced | Converting UI to React/code | Production-ready components |
| **review-critique** | Advanced | Quality gates before shipping | Scored critique + fixes |
| **refinement-workflow** | Advanced | Iterating on generated UI | Improved 2nd/3rd versions |
| **anti-patterns-detector** | Advanced | Identifying problems early | Problem list + solutions |
| **multi-agent-workflow** | Expert | Orchestrating full pipeline | Complete → shipped product |

---

## 🚀 How to Use This System

### Scenario 1: **I want to generate a dashboard**

**Step 1:** Load [core-system-prompt.md](./core-system-prompt.md)  
→ Define your role & constraints

**Step 2:** Use [ux-decision-framework.md](./ux-decision-framework.md)  
→ Make UX decisions first

**Step 3:** Use [ui-generation-structured.md](./ui-generation-structured.md)  
→ Generate with constraints

**Step 4:** Use [design-system-governance.md](./design-system-governance.md)  
→ Enforce token consistency

**Step 5:** Use [code-generation.md](./code-generation.md)  
→ Convert to production code

**Step 6:** Use [review-critique.md](./review-critique.md)  
→ Score & improve (8.0+/10 minimum)

**Step 7:** Use [refinement-workflow.md](./refinement-workflow.md)  
→ Iterate if needed

**Step 8:** Use [anti-patterns-detector.md](./anti-patterns-detector.md)  
→ Final quality check

---

### Scenario 2: **I want my team to work with AI systematically**

**Use:** [multi-agent-workflow.md](./multi-agent-workflow.md)  
→ Define roles & handoffs between UX Agent, UI Agent, Code Agent, Review Agent

---

### Scenario 3: **I want to identify production problems early**

**Use:** [anti-patterns-detector.md](./anti-patterns-detector.md)  
→ Catch issues before they become bugs

---

## 🎯 Key Differences from Old Skills

### Old Approach (Prompt-Centric)
```
"Create a modern dashboard..."
→ AI generates
→ Done
```

**Problems:**
- ❌ No constraints (output varies wildly)
- ❌ No review (ships broken)
- ❌ No iteration (first version shipped)
- ❌ No system (each project is different)
- ❌ No governance (tokens inconsistent)

### New Approach (System-Centric)
```
1. Define role & constraints
2. Make UX decisions first
3. Generate with guidance
4. Enforce design system
5. Convert to production code
6. Review & score (8.0+/10)
7. Refine iteratively
8. Detect anti-patterns
9. Orchestrate across agents
```

**Results:**
- ✅ Consistent output (constraints enforced)
- ✅ Quality gates (review before ship)
- ✅ Iterative improvement (refinement workflow)
- ✅ Repeatable system (same process every time)
- ✅ Governed components (tokens everywhere)

---

## 📁 Skills by File

### **Level 1: Foundation**

#### [core-system-prompt.md](./core-system-prompt.md)
**Purpose:** Define who you are and how you work

**Contains:**
- Your role as AI Design Engineer
- Your constraints & values
- Your decision-making framework
- Your non-negotiable standards

**When to use:** First thing with every new project

**Output format:** System prompt (ready to paste into AI)

---

#### [ux-decision-framework.md](./ux-decision-framework.md)
**Purpose:** Make UX decisions BEFORE generating UI

**Contains:**
- User research summary
- Journey mapping
- Task flow design
- Cognitive load decisions
- Information architecture reasoning

**When to use:** Before any design generation

**Output format:** Decision document + rationale

---

### **Level 2: Generation**

#### [ui-generation-structured.md](./ui-generation-structured.md)
**Purpose:** Generate UI with constraints (not vague)

**Contains:**
- 8-layer prompt architecture
- Constraint-driven prompting
- Design system integration
- Responsive rules
- Accessibility requirements

**When to use:** Ready to generate UI variants

**Output format:** AI-ready prompt + CSS/component specs

---

#### [design-system-governance.md](./design-system-governance.md)
**Purpose:** Enforce design tokens across all components

**Contains:**
- Token system (spacing, colors, typography)
- Component contracts
- Consistency rules
- Audit checklist

**When to use:** Ensuring brand consistency

**Output format:** Token enforcement rules + audit results

---

### **Level 3: Production**

#### [code-generation.md](./code-generation.md)
**Purpose:** Convert UI → production React code

**Contains:**
- Semantic HTML rules
- Tailwind structure
- Component patterns
- State management
- Accessibility implementation
- Testing setup

**When to use:** Ready to ship code

**Output format:** Production-ready component code

---

#### [review-critique.md](./review-critique.md)
**Purpose:** Critique UI/UX/Engineering quality

**Contains:**
- Visual quality rubric
- UX quality rubric
- Engineering quality rubric
- 10-point scoring system
- Shipping checklist

**When to use:** Before deploying anything

**Output format:** Scored critique + improvement list

---

#### [refinement-workflow.md](./refinement-workflow.md)
**Purpose:** Iteratively improve generated output

**Contains:**
- 1st pass → problem identification
- 2nd pass → refinement prompts
- 3rd pass → polishing
- Iteration strategy
- When to stop iterating

**When to use:** After critique to improve score

**Output format:** Refined UI + code + score improvement

---

#### [anti-patterns-detector.md](./anti-patterns-detector.md)
**Purpose:** Catch common AI design mistakes

**Contains:**
- 15+ anti-patterns
- Visual anti-patterns
- UX anti-patterns
- Code anti-patterns
- How to fix each
- Prevention checklist

**When to use:** Final quality check

**Output format:** Issue list + fixes

---

### **Level 4: Orchestration**

#### [multi-agent-workflow.md](./multi-agent-workflow.md)
**Purpose:** Coordinate multiple AI agents in sequence

**Contains:**
- UX Agent (design thinking)
- UI Agent (visual generation)
- Frontend Agent (code generation)
- Review Agent (quality critique)
- Accessibility Agent (compliance)
- Workflow orchestration
- Handoff specifications
- Integration points

**When to use:** Full product pipeline

**Output format:** Agent workflow definition + handoff specs

---

### **Reference Guides**

#### [SKILL_MATRIX.md](./SKILL_MATRIX.md)
**Purpose:** Quick reference for which skill to use

**Contains:**
- Scenario → Skill mapping
- Beginner/Intermediate/Advanced paths
- Time estimates
- Expected outputs

**When to use:** Not sure which skill to start with

---

#### [ANTI_PATTERNS.md](./ANTI_PATTERNS.md)
**Purpose:** Comprehensive anti-pattern guide

**Contains:**
- 20+ detailed anti-patterns
- Why they're problems
- Real examples
- How to fix
- Prevention strategies

**When to use:** Learning what NOT to do

---

## 🎓 Learning Paths

### Path 1: **Quick Start (30 min)**
1. [core-system-prompt.md](./core-system-prompt.md) (5 min)
2. [ui-generation-structured.md](./ui-generation-structured.md) (15 min)
3. [review-critique.md](./review-critique.md) (10 min)

**Result:** Can generate + review basic UI

---

### Path 2: **Structured Process (2 hours)**
1. [core-system-prompt.md](./core-system-prompt.md) (5 min)
2. [ux-decision-framework.md](./ux-decision-framework.md) (20 min)
3. [ui-generation-structured.md](./ui-generation-structured.md) (20 min)
4. [design-system-governance.md](./design-system-governance.md) (20 min)
5. [review-critique.md](./review-critique.md) (20 min)
6. [refinement-workflow.md](./refinement-workflow.md) (15 min)

**Result:** Can run complete design → code → review → refine cycle

---

### Path 3: **Advanced System (3-4 hours)**
Do all skills + [SKILL_MATRIX.md](./SKILL_MATRIX.md) + [ANTI_PATTERNS.md](./ANTI_PATTERNS.md)

**Result:** Expert-level operation system

---

## 💡 Key Principles

1. **Structured > Vague** — Every prompt is a system, not a request
2. **Constraints > Freedom** — Tight specs produce better results
3. **Process > Output** — The system matters more than individual pieces
4. **Review > Generate** — Critique is as important as creation
5. **Iterate > One-Shot** — First version is rarely the shipped version
6. **Govern > Freestyle** — Design systems enforce quality
7. **Production > Concept** — Everything must ship

---

## 🚀 Start Here

**New to this system?**
→ Start with [core-system-prompt.md](./core-system-prompt.md)

**Want quick wins?**
→ Follow "Quick Start" path above

**Building for a team?**
→ Study [multi-agent-workflow.md](./multi-agent-workflow.md)

**Debugging production issues?**
→ Check [anti-patterns-detector.md](./anti-patterns-detector.md)

---

## 📊 Comparison: Old vs New

| Aspect | Old Skills | New Skills |
|:---|:---|:---|
| **Focus** | Generate pretty UI | Production system |
| **Structure** | Vague requests | Structured prompts |
| **Constraints** | Mentioned | Enforced |
| **Review** | Not included | Built-in scoring |
| **Iteration** | Ad-hoc | Systematic workflow |
| **Design system** | Implied | Explicit governance |
| **AI-to-code** | Unclear | Detailed process |
| **Anti-patterns** | Not discussed | Comprehensive guide |
| **Multi-agent** | N/A | Full orchestration |
| **Production ready** | Partial | 100% |

---

## 🎯 What This Enables

✅ **Predictable output** (constraints enforce quality)  
✅ **Quality gates** (review framework + scoring)  
✅ **Scalable process** (same system works for 1 or 100 projects)  
✅ **Team collaboration** (multi-agent workflows)  
✅ **Knowledge sharing** (repeatable system, not magic)  
✅ **Production confidence** (anti-patterns caught early)  
✅ **Iterative improvement** (refinement workflow)  
✅ **Governance** (design system enforcement)  

---

## 📞 Need Help?

- **"Which skill should I use?"** → Check [SKILL_MATRIX.md](./SKILL_MATRIX.md)
- **"I'm making a mistake"** → Check [ANTI_PATTERNS.md](./ANTI_PATTERNS.md)
- **"How do I get started?"** → Read [core-system-prompt.md](./core-system-prompt.md)
- **"I want the full pipeline"** → Study [multi-agent-workflow.md](./multi-agent-workflow.md)

---

**This is not a prompt collection. This is an operating system for shipping production AI designs.** 🚀
