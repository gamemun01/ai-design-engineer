# Change Request Analysis

ใช้เมื่อข้อกำหนดเปลี่ยนเทียบ baseline ไม่เปลี่ยน baseline เพราะเพียงผู้ใช้เสนอ CR
อ่าน [readiness-and-handoff.md](readiness-and-handoff.md) เมื่อต้องประเมิน Gates
หรือเตรียม Dev Delta Prompt

## รับและวิเคราะห์ CR

1. ระบุ CR ID (ถ้าตั้งเลขเองติด Proposed), requester/rationale, baseline revision,
   before → after และ acceptance ของการเปลี่ยน แยก Confirmed delta /
   Proposed behavior / Unknown การเสนอ CR ไม่เท่ากับการอนุมัติให้เริ่ม Dev
2. guest ไม่ login, email service, edit/delete, latency หรือกฎหมายที่ไม่ได้ระบุ
   ไม่ใช่ requirement ให้ติด Proposed/Unknown การแทนสิทธิ์เฉพาะอีเมลด้วย
   public link เปลี่ยน scope/permission ไม่ใช่ทางเลือกเทียบเท่า
3. ถ้าไม่มี baseline ให้ขอแบบ/checkpoint เดิมหนึ่งประเด็น ทำ preliminary analysis
   โดยติด Unknown ไม่สร้าง requirements/rules/schema ขึ้นเพื่อให้วิเคราะห์ดูครบ
4. ตรวจทุกมิติด้านล่างเป็น AFFECTED / UNAFFECTED / UNKNOWN / N/A พร้อมเหตุผล
   ห้ามตัดสิน UNAFFECTED เพราะไม่มีข้อมูล

| มิติ | สิ่งที่ trace ตามหลักฐาน |
|---|---|
| Scope / requirements | delta และ requirement ต้นฉบับ |
| Flow / UI / states | transitions ทุก stage; happy/error/permission/boundary |
| Business rules / roles / permissions | การเปลี่ยน actors และสิทธิ์ |
| Data / schema / retention | lifecycle และการย้ายข้อมูล |
| API / integrations | สัญญาและ dependencies ที่กระทบ |
| Security / privacy / audit | trust boundaries และผลจากสิทธิ์ใหม่ |
| NFR | คุณสมบัติและเกณฑ์ที่วัดตาม scope |
| Tests / regression | acceptance เดิม/ใหม่และ retained behavior |
| Migration / compatibility | baseline/candidate อยู่ร่วมกันอย่างไร |
| Rollout / rollback / operations | การนำไปใช้และย้อนกลับตามความเสี่ยง |
| Docs / dependencies / effort | เอกสาร/งานลำดับก่อนหลังและ estimate ที่มี assumptions |

คงคำศัพท์และความหมาย requirement เดิม Trace
**CR → requirement → artifact/section → acceptance** ไม่รวม/สลับ ID เงียบ ๆ
เสนอทางเลือก ความเสี่ยง ช่องว่าง/owner และคำถามค้าง ไม่แต่งวัน/ราคา
ความครบหัวข้อไม่พิสูจน์ว่าผลวิเคราะห์ครบ

## สถานะและการรักษา baseline

`PROPOSED → ANALYZED → APPROVED / REJECTED / DEFERRED` ตามหลักฐานผู้รับผิดชอบ
INCORPORATED ได้เมื่อแก้แบบจริงและตรวจแล้ว ไม่ใช่ IMPLEMENTED/VERIFIED

คง baseline/approval เดิม candidate revision และ slice ที่กระทบเป็น CHANGE_REVIEW
พร้อมเสนอ hold เฉพาะส่วนที่เกี่ยวข้อง อย่าอ้างว่าสั่งทีมพักแล้ว
ส่วนที่ยืนยันแยก dependencies และไม่กระทบได้คง readiness เดิมพร้อมเหตุผล
รายงาน historical readiness ของ baseline แยกจาก candidate ชัดเจน

หลัง CR ยอมรับ ปรับแบบ/trace/acceptance/plan/checkpoint ใน revision ใหม่
ตรวจ Gates และหลักฐานการยอมรับ revision ใหม่ จึงสร้าง Dev Delta Prompt เดิม → ใหม่
ระบุ approved changes, retained behavior, regression, migration/rollback และ stop conditions
CR ยังไม่ยอมรับให้ส่ง analysis/draft delta ห้ามเขียนทับ baseline หรือคง READY ทั้ง Project
CR ถูกปฏิเสธ/เลื่อนแต่พบ defect ในแบบเดิมจริง ต้องคง blocker และประเมิน readiness ใหม่

Checkpoint เพิ่ม CR register/status, baseline/candidate revisions, scope/gates/blockers,
approval evidence และ handoff_state ไม่อ้าง save/send/test โดยไม่มีหลักฐาน
