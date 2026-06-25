<!-- markdownlint-disable -->
# Test AI Design Engineer Skill

This document explains how to test the `AI-Augmented Design Engineer` skill.

## 1. Validate the skill file structure locally

Run:

```bash
npm run validate-skill
```

It checks that each skill file contains the main required sections:
<!-- Original:
- `## 🎯 Target Triggers & Keywords`
- `## 💻 System Instruction`
- `## 📋 Rules & Constraints`
- `## 📋 Expected Output Format`
- `## 💡 Example Usage (Few-Shot Example)`

## 2. Test in ChatGPT Custom GPT

1. Open `skills/ai-design-engineer.md`
-->
- `## Trigger Description`
- `## System Instruction`
- `## Rules & Constraints`
- `## Expected Output Format`
- `## Example Usage (Few-Shot Example)`

## 2. Test in ChatGPT Custom GPT or Claude Project

1. Open one of the active skill files under `skills/` (e.g. `skills/foundation/core-system-prompt/SKILL.md`).
<!-- Original:
2. Copy the `## 💻 System Instruction` and `## 📋 Rules & Constraints` sections into the `Instructions` field
3. Add the trigger examples from `## 🎯 Target Triggers & Keywords` to the conversation starters
-->
2. Copy the `## System Instruction` and `## Rules & Constraints` sections into the `Instructions` field
3. Add the trigger examples from `## Trigger Description` to the conversation starters
4. Run a test prompt like:

```text
ช่วยออกแบบหน้าแรก (Homepage) สำหรับเว็บไซต์บริการ AI Design Consultant โดยให้แยกโครงสร้างเป็น component-based และอธิบายผลลัพธ์ตามรูปแบบที่คาดหวัง
```

Expected answer structure:
- `🧬 UI Anatomy Checklist`
- `🧠 UX & Conversion Insights`
- `🛠️ Component & Engineering Guide`

## 3. Test in Claude or another AI platform

1. Create a new Claude project or custom prompt environment
2. Paste the same `System Instruction` and `Rules & Constraints`
3. Send a similar user request in Thai or English
4. Confirm the output follows the expected format and mentions components, UX reasoning, and engineering guidance

## 4. Example test prompt

```text
ช่วยออกแบบหน้า Product Page สำหรับบริการ SaaS ที่เน้น AI Automation โดยต้องมี:
- Hero section
- Pricing/plan summary
- Reviews and trust signals
- CTA เพื่อทดลองใช้งาน

ให้ตอบในรูปแบบ:
1. UI Anatomy Checklist
2. UX & Conversion Insights
3. Component & Engineering Guide
```

## 5. Notes

This repository does not execute the AI skill locally. The local validation script only checks the prompt file structure, not the LLM output.
