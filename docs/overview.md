<!-- markdownlint-disable -->
# AI Design Engineer Repository Overview

## What this repository contains

<!-- Original:
- `README.md`: Project introduction, available skills list, and usage instructions.
- `skills/ai-design-engineer.md`: Main AI Agent Skill file for the "AI-Augmented Design Engineer" prompt. It defines:
  - role and system instructions
  - UI anatomy checklists for 10 standard pages
  - rules, constraints, and expected output format
- `assets/`: Blueprint reference images for the 10 standard UI pages.
-->
<!-- Original repository contents list commented out to preserve history (Rule #1)
- `README.md`: Project introduction, available skills list, and usage instructions.
- `skills/`: Modular task-specific skill folders (each containing a `SKILL.md` file) that define system instructions, constraints, and templates for distinct steps in the design engineering workflow.
- `assets/`: Blueprint reference images for the 10 standard UI pages.
-->
- `README.md`: Project introduction, available skills list, and usage instructions.
- `skills/`: Modular task-specific skill folders (each containing a `SKILL.md` file) that define system instructions, constraints, and templates for distinct steps in the design engineering workflow.
- `docs/platform-integration-guide.md`: Step-by-step instructions for integrating the skills into Cursor, VS Code (Roo Code, Cline, Copilot), GitHub Spark, and local inference models (Ollama/DeepSeek-R1).
- `assets/`: Blueprint reference images for the 10 standard UI pages.

## Purpose

This repository is a knowledge collection for prompt-based AI agents focused on UI architecture and component-based design. The modular skills turn natural language requests into structured UX/UI guidance that can be translated into frontend code.

## How to use

<!-- Original:
1. Open `skills/ai-design-engineer.md`.
2. Copy the `System Instruction` and `Rules & Constraints` sections into your target AI system configuration.
3. Use the trigger keywords and slash commands from the skill to invoke the prompt when designing or reviewing UI pages.
4. Refer to the asset images in `assets/` as visual blueprints for the 10 supported page types.
-->
1. Choose a skill based on the scenario guide in [`skills/SKILL_MATRIX.md`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/SKILL_MATRIX.md) (e.g., [`skills/core-system-prompt/SKILL.md`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/core-system-prompt/SKILL.md) or [`skills/code-generation/SKILL.md`](file:///D:/SourceCodeAll/repos/ToyHermes/ai-design-engineer/skills/code-generation/SKILL.md)).
2. Copy the `System Instruction` and `Rules & Constraints` sections into your target AI system instructions or Claude project.
3. Use the trigger instructions and workflows to run design, code generation, and review steps.
4. Refer to the asset images in `assets/` as visual blueprints for the 10 supported page types.

## Key page blueprints

The skill supports these 10 standard UI pages:
- Homepage
- Login
- Sign Up
- Product/Service Page
- Cart
- Checkout
- Dashboard
- Blog Listing
- Blog Post
- Contact Us

## Why this matters

This repository is designed to make it easier for teams to reuse a premium UI design prompt across multiple AI platforms while maintaining consistent page anatomy, UX clarity, and engineering-ready component structure.
