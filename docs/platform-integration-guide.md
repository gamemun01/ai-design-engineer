# AI Design Engineer Platform Integration Guide

This guide explains how to integrate the modular skills in this repository
into modern AI-assisted IDEs, editors, and local inference pipelines.

---

## 1. Cursor Integration

Cursor supports custom instruction configuration at both the global and
project level.

### Approach A: Project-Level `.cursorrules` (Legacy)

Create a `.cursorrules` file in the root of your workspace. To avoid token
bloat while retaining high performance:

1. Copy the system prompt from
   [core-system-prompt/SKILL.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/core-system-prompt/SKILL.md).
2. Reference the location of other skills using markdown file paths (e.g.
   `When designing layouts, reference the skills in skills/ux-decision-framework/SKILL.md`).
3. Cursor will automatically index the repository files, allowing you to
   trigger them using `@` symbols (e.g., `@SKILL.md`).

### Approach B: Cursor Rules Directory (Cursor v0.45+)

Create a `.cursor/rules/` directory in the root of your repository. You can
copy the individual skill files or create metadata pointers:

- **Example `.cursor/rules/ux-rules.mdc`:**

  ```markdown
  ---
  description: Use this rule when making UX layout decisions or writing flows.
  globs: docs/ux/*.md, src/components/**/page.tsx
  ---
  # UX Design Rules
  [Paste content of skills/ux-decision-framework/SKILL.md]
  ```

---

## 2. VS Code Extensions (Roo Code, Cline, & Copilot)

Modern open-source VS Code agents support configurable system prompts.

### Roo Code & Cline (Custom System Instructions)

1. Go to settings in Roo Code / Cline.
2. Under **Custom System Prompt / Instructions**, paste the path to your
   active skill or configure it to point to your repository root.
3. Use the dynamic loading strategy to tell the agent:

   > "Read skills/SKILL_MATRIX.md to determine the best sub-profile of
   > instructions. Use prompt-context-loading to discover repository files
   > first."

### GitHub Copilot Chat (`.github/copilot-instructions.md`)

You can customize Copilot's system prompt by creating a
`.github/copilot-instructions.md` file. Add the following instruction block:

```markdown
You are an AI Design Engineer operating under the repository rules in AGENTS.md.
Before writing code:
1. Respect the 120-point scorecard in skills/review-critique/SKILL.md.
2. Avoid anti-patterns declared in skills/anti-patterns-detector/SKILL.md.
3. Follow Component Contracts defined in 04-design-system/README.md.
```

---

## 3. GitHub Spark & Project Builders

GitHub Spark builds micro-apps (Sparks) using natural language prompting.

1. When creating a Spark, click **Customize Spark Instructions**.
2. Paste the contents of
   [ui-generation-structured/SKILL.md](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/ui-generation-structured/SKILL.md)
   to define visual layout boundaries.
3. This prevents Spark from creating cluttered layouts, ensuring premium
   mobile-first interfaces by default.

---

## 4. Local Open Source Models (Ollama & DeepSeek-R1)

To run these skills locally using Ollama (e.g. `deepseek-r1:32b`, `llama3.1`):

### Approach A: Modelfile Customization

Create a custom Ollama `Modelfile` for each persona:

```dockerfile
FROM deepseek-r1:32b

# Set the System Prompt using the core skill
SYSTEM """
[Paste contents of skills/core-system-prompt/SKILL.md]
"""

# Adjust context window to fit token budget
PARAMETER num_ctx 16384
PARAMETER temperature 0.2
```

Build the local model:

```bash
ollama create ai-design-engineer -f ./Modelfile
ollama run ai-design-engineer
```

### Approach B: Script-Based Execution (CLI Wrapper)

Use a Node.js or Python CLI script to read the relevant skill from
`skills/` dynamically before appending it to the API call. This aligns
with the **Dynamic JIT Context Loading Strategy** to reduce token overhead.
