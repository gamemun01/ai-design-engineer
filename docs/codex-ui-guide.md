# ใช้ AI Design Engineer Skills ใน Codex UI

Skill ทั้ง 13 รายการลงทะเบียนในโปรเจกต์นี้แล้ว ผ่าน `.agents/skills/`
พร้อมชื่อแสดงผล `AIDE ...` คำอธิบายสั้น และ prompt ตั้งต้นใน
`agents/openai.yaml` ตาม [รูปแบบของ OpenAI](https://learn.chatgpt.com/docs/build-skills)
ไฟล์ต้นฉบับยังอยู่ใน `skills/` และ `plugins/community/`

## เริ่มใช้งานในแอป

1. เปิดโปรเจกต์ `ai-design-engineer` ใน Codex แล้วเริ่มแชตในโปรเจกต์นี้
2. พิมพ์ชื่อ Skill พร้อม `$` ในข้อความ เช่น `$review-critique`
   ถ้าแอปแสดงตัวเลือก Skill ให้เลือกชื่อ `AIDE Review & Critique`
   สามารถระบุชื่อ Skill ในข้อความโดยตรงได้ด้วย
3. ระบุงานและแนบหรืออ้างอิง artifact ที่ต้องทำ เช่น brief, screenshot,
   component หรือไฟล์ในโปรเจกต์ แล้วส่งข้อความ
4. ตรวจผลลัพธ์และหลักฐานที่ Skill รายงาน โดยเฉพาะผลที่ยัง `NOT VERIFIED`

ผลตรวจเดิมยืนยันการค้นพบ 12 Skills ตาม [ผลตรวจในแชต](codex-ui-smoke-results.md)
ส่วน Project Design Advisor เพิ่มภายหลังและผ่านการตรวจตัวชี้/metadata แล้ว
ยังไม่ได้ยืนยันการแสดงใน native skill picker ของแชตใหม่
หากแชตเก่ายังไม่เห็น Skill ให้เริ่มแชตใหม่หรือ restart Codex
เมนูและการแสดงตัวเลือกขึ้นกับเวอร์ชันของแอป; ไม่ต้องใช้ CLI เพื่อเรียก Skill
จากข้อความใน UI ส่วน `/skills` เป็นทางเลือกใน CLI/IDE ที่รองรับ

## Prompt ที่คัดลอกไปใช้ได้

เริ่มงานใน repo นี้:

```text
ใช้ $prompt-context-loading แล้ว $core-system-prompt
อ่านกฎของโปรเจกต์และเลือก Skill ที่เหมาะกับงานต่อไปนี้:
ตรวจ component checkout ที่แนบ และรายงานปัญหาพร้อมหลักฐาน
```

รีวิวภาพหรือโค้ด:

```text
ใช้ $review-critique และ $a11y-deep-audit
รีวิวไฟล์หรือภาพที่แนบ ระบุปัญหาตามลำดับความสำคัญและวิธีแก้
แยกสิ่งที่ตรวจแล้วกับสิ่งที่ต้องทดสอบในแอปจริง
```

สร้าง UI prompt จาก UX ที่อนุมัติแล้ว:

```text
ใช้ $ui-generation-structured สร้าง UI prompt แบบ 8 layers
จาก UX brief ที่แนบ ใช้แบรนด์และ design tokens เดิม
ส่งเฉพาะ prompt สำหรับเครื่องมือสร้าง UI ที่ฉันระบุ
```

เขียนโค้ดในโปรเจกต์แอปที่มีอยู่:

```text
ใช้ $code-generation ทำ component ตาม UI spec ที่แนบ
ตรวจเวอร์ชันแพ็กเกจและรูปแบบโค้ดของแอปก่อนทำ
ใช้ dependencies และ design tokens เดิม พร้อมรายงานผลตรวจจริง
```

เมื่อทำงานในโปรเจกต์แอปอื่น ต้องให้แชตนั้นเข้าถึง source pack และ references
หรือติดตั้ง adapter ที่อ้างถึง source pack ได้ ตัวชี้ของ repo นี้มีขอบเขต
เฉพาะ repo และไม่ใช่แพ็กเกจเดี่ยวสำหรับคัดลอกไปวางโดยไม่มีต้นฉบับ
ดู [platform integration](platform-integration-guide.md) สำหรับการจัดวางไฟล์

## เลือก Skill ตามงาน

| ชื่อใน UI | ชื่อที่เรียก | งานที่เหมาะสม |
|---|---|---|
| AIDE Load Context | `$prompt-context-loading` | โหลดกฎและเลือก Skill |
| AIDE Core Baseline | `$core-system-prompt` | ตั้งหลักการทำงาน |
| AIDE Project Design Advisor | `$project-design-advisor` | เริ่มจาก Idea, ตรวจ G1–G8, Dev handoff และ CR |
| AIDE UX Decisions | `$ux-decision-framework` | journey, task flow, UX rationale |
| AIDE UI Generation | `$ui-generation-structured` | UI prompt ตาม 8 layers |
| AIDE Design System | `$design-system-governance` | ตรวจ tokens และ component contracts |
| AIDE Generate Code | `$code-generation` | เขียนโค้ดจาก spec ที่ตรวจแล้ว |
| AIDE Review & Critique | `$review-critique` | รีวิวพร้อมหลักฐานและข้อจำกัด |
| AIDE Refine Findings | `$refinement-workflow` | แก้ findings และตรวจซ้ำ |
| AIDE Detect Anti-Patterns | `$anti-patterns-detector` | ตรวจข้อผิดพลาดซ้ำของ AI |
| AIDE Workflow Plan | `$multi-agent-workflow` | วาง roles/handoffs; ใช้ agent เมื่อได้รับอนุญาต |
| AIDE Accessibility Audit | `$a11y-deep-audit` | ตรวจ accessibility เชิงลึก |
| AIDE Motion Design | `$motion-choreography` | motion tokens และ reduced motion |

## เมื่ออัปเดต Skill

แก้ source ต้นฉบับ ไม่แก้ไฟล์ที่ generate ใน `.agents/skills/`
เมื่อเปลี่ยน metadata หรือเพิ่ม Skill ให้รันจาก terminal ของ repo:

```bash
npm run skills:codex:register
npm run skills:codex:check
```

ชื่อ UI และ prompt ตั้งต้นจัดการใน `scripts/register-codex-skills.js`
คำสั่งตรวจครอบคลุมตัวชี้และ metadata ทั้ง 13 รายการ
การแก้ body/references ของ source เดิมอ่านได้โดยตรง ไม่ต้องคัดลอก body ซ้ำ

## สถานะการตรวจ

**VERIFIED:** Codex UI แชตนี้ค้นพบ Skill 12 รายการ และอ่านตัวชี้/ต้นฉบับของ
`prompt-context-loading`, `review-critique`, `a11y-deep-audit` ได้จริง
พร้อมทำ context routing และ source review ในแชตปัจจุบัน

การแสดงชื่อ/คำอธิบาย/prompt ตั้งต้นติดตั้งและตรวจ YAML แล้ว แต่ไม่ได้จับภาพ
หรือทดสอบการกดเมนู UI การทดสอบนี้ใช้แชตปัจจุบัน ไม่ใช่ independent evaluation
ของ Skill ทุกตัว ผล CLI แยกต่างหากยังไม่ผ่าน: บัญชี/CLI เครื่องนี้ตอบ HTTP 400
เมื่อเรียก `gpt-6-luna` การใช้ Skill ใน UI นี้ไม่ต้องเปลี่ยนโมเดลตาม CLI
