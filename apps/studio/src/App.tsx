import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ConnectionSettings } from './ConnectionSettings';
import { Icon } from './Icon';
import { PromptPreview } from './PromptPreview';
import { SkillLibrary, categoryNames } from './SkillLibrary';
import { advisorTasks, applyAdvisorTask, appendRun, buildPrompt, createWorkspace, editWorkspace, parseWorkspace, requestInput, serializeWorkspace, stages } from '../shared/workflow.mjs';
import type { Catalog, Connection, Run, Workspace } from './types';

const navigation = [
  ['workflow', 'flow', 'เวิร์กโฟลว์'],
  ['library', 'library', 'คลัง Skill'],
  ['settings', 'settings', 'Custom LLM'],
] as const;

type View = (typeof navigation)[number][0];

const storageKey = 'aide-studio-workspace-v1';
const autosaveDelayMs = 300;
const exampleDraft = {
  task: 'ออกแบบ Flow เริ่มคู่มือจาก Source → วิเคราะห์ → ยืนยัน Scope พร้อม User Stories และ Error / Recovery states',
  context: 'ตัวอย่างสมมติ: เว็บเครื่องมือภายในสำหรับ Developer และ QA ใช้แบรนด์และ stack เดิมของโปรเจกต์ ยังไม่มีผล user research',
};
function download(name: string, content: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const fileName = (name: string) => name.replace(/[^\p{L}\p{N}-]+/gu, '-').slice(0, 80) || 'workspace';

function RunningRequest({ onCancel }: { onCancel: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="running-status">
    <span className="spinner" aria-hidden="true" />
    <span role="status">กำลังรอ LLM</span>
    <span className="running-time">{elapsed} วินาที</span>
    <button className="button secondary" onClick={onCancel}>ยกเลิกคำขอ</button>
  </div>;
}

export default function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [token, setToken] = useState('');
  const [workspace, setWorkspace] = useState<Workspace>(createWorkspace);
  const [view, setView] = useState<View>('workflow');
  const [libraryHomeRequest, setLibraryHomeRequest] = useState(0);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);
  const [loadError, setLoadError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmExample, setConfirmExample] = useState(false);
  const [previousDraft, setPreviousDraft] = useState<typeof exampleDraft | null>(null);
  const [pane, setPane] = useState<'prompt' | 'result'>('prompt');
  const pendingSave = useRef<Workspace | null>(null);
  const saveTimer = useRef<number | undefined>(undefined);
  const [activeRun, setActiveRun] = useState('');
  const [pasted, setPasted] = useState('');
  const abort = useRef<AbortController | null>(null);
  const runLock = useRef(false);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const taskInput = useRef<HTMLTextAreaElement>(null);
  const exampleButton = useRef<HTMLButtonElement>(null);
  const stage = stages.find(s => s.id === workspace.stage) || stages[1];
  const currentRun = workspace.runs.find(r => r.id === activeRun) || workspace.runs[0];
  const update = (value: Partial<Workspace>) => {
    if (value.task !== undefined || value.context !== undefined) resetExample();
    setWorkspace(w => editWorkspace(w, value));
  };
  const report = (text: string, error = false) => setNotice({ text, error });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/bootstrap', { signal: controller.signal }).then(async r => { if (!r.ok) throw Error('โหลดข้อมูล App ไม่สำเร็จ'); return r.json(); }).then(data => {
      setCatalog(data.catalog); setToken(data.token); setConnection(data.connection);
      try { const raw = localStorage.getItem(storageKey); if (raw) setWorkspace(parseWorkspace(raw, data.catalog)); } catch { report('อ่านข้อมูลที่บันทึกไว้ไม่ได้ เริ่ม workspace ใหม่หรือนำเข้าไฟล์สำรองได้', true); }
    }).catch(e => { if (e.name !== 'AbortError') setLoadError(e.message); });
    return () => { controller.abort(); abort.current?.abort(); };
  }, []);
  const flushWorkspace = useCallback(() => {
    window.clearTimeout(saveTimer.current);
    const pending = pendingSave.current;
    if (!pending) return;
    pendingSave.current = null;
    try { localStorage.setItem(storageKey, JSON.stringify(pending)); }
    catch { setNotice({ text: 'พื้นที่บันทึกในเบราว์เซอร์ไม่พอ ดาวน์โหลด workspace เพื่อเก็บงานไว้', error: true }); }
  }, []);

  useLayoutEffect(() => {
    if (!catalog) return;
    pendingSave.current = workspace;
    saveTimer.current = window.setTimeout(flushWorkspace, autosaveDelayMs);
    return () => window.clearTimeout(saveTimer.current);
  }, [workspace, catalog, flushWorkspace]);

  useEffect(() => {
    function saveWhenHidden() {
      if (document.visibilityState === 'hidden') flushWorkspace();
    }
    window.addEventListener('pagehide', flushWorkspace);
    document.addEventListener('visibilitychange', saveWhenHidden);
    return () => {
      window.removeEventListener('pagehide', flushWorkspace);
      document.removeEventListener('visibilitychange', saveWhenHidden);
    };
  }, [flushWorkspace]);
  const { prompt, promptError } = useMemo(() => {
    if (!catalog || !workspace.task.trim()) return { prompt: '', promptError: '' };
    try { return { prompt: buildPrompt(catalog, workspace), promptError: '' }; }
    catch (e) { return { prompt: '', promptError: (e as Error).message }; }
  }, [catalog, workspace]);
  const selectedSkills = catalog?.skills.filter(s => workspace.skillIds.includes(s.id)) || [];
  async function api(route: string, data: object, method = 'POST', signal?: AbortSignal) {
    const response = await fetch('/api/' + route, { method, signal, headers: { 'Content-Type': 'application/json', 'X-Studio-Token': token }, body: JSON.stringify(data) });
    let result; try { result = await response.json(); } catch { throw Error('อ่านคำตอบจาก App ไม่ได้ ลองโหลดหน้าใหม่'); }
    if (!response.ok) throw Error(result.error?.message || 'คำขอไม่สำเร็จ');
    return result;
  }
  function chooseStage(id: string) { const next = stages.find(s => s.id === id)!; update({ stage: id, skillIds: [...next.skillIds], referencePaths: [] }); }
  function toggleSkill(id: string) { update({ skillIds: workspace.skillIds.includes(id) ? workspace.skillIds.filter(s => s !== id) : [...workspace.skillIds, id] }); }
  function resetExample() {
    setConfirmExample(false);
    setPreviousDraft(null);
  }
  function applyExample() {
    if (runLock.current) return;
    setPreviousDraft(workspace.task || workspace.context ? { task: workspace.task, context: workspace.context } : null);
    setConfirmExample(false);
    setWorkspace(w => editWorkspace(w, exampleDraft));
    setPane('prompt');
    taskInput.current?.focus({ preventScroll: true });
  }
  function undoExample() {
    if (!previousDraft || runLock.current) return;
    update(previousDraft);
    taskInput.current?.focus({ preventScroll: true });
  }
  function chooseAdvisorTask(id: string) {
    if (!catalog || runLock.current) return;
    try { const next = applyAdvisorTask(workspace, id, catalog); resetExample(); setWorkspace(next); setPane('prompt'); taskInput.current?.focus(); report('ใส่ตัวอย่างโจทย์แล้ว แก้ข้อความในวงเล็บ และแนบแบบหรือหลักฐานในช่องบริบทได้'); }
    catch (e) { report((e as Error).message, true); }
  }
  async function copy(text: string) { try { await navigator.clipboard.writeText(text); report('คัดลอกแล้ว วางใน Codex หรือแชตที่ต้องการได้เลย'); } catch { report('เบราว์เซอร์ไม่อนุญาต clipboard เลือกข้อความในพรีวิวแล้วคัดลอกได้', true); } }
  async function importWorkspace(file?: File) {
    if (!file || !catalog || runLock.current) return;
    try { if (file.size > 3000000) throw Error('ไฟล์ใหญ่เกิน 3 MB'); const next = parseWorkspace(await file.text(), catalog); if (runLock.current) return; resetExample(); setWorkspace(next); setActiveRun(''); setView('workflow'); report('นำเข้า workspace แล้ว'); } catch (e) { report(`นำเข้าไม่ได้: ${(e as Error).message}`, true); }
  }
  async function generate() {
    if (!connection?.model) { setView('settings'); report('กรอก URL และ model แล้วบันทึกการเชื่อมต่อก่อน', true); return; }
    if (!prompt || runLock.current) return;
    const controller = new AbortController(); abort.current = controller; runLock.current = true; setBusy(true); setNotice(null); setConfirmExample(false); setPane('result');
    try { const result = await api('run', requestInput(workspace), 'POST', controller.signal); setWorkspace(w => appendRun(w, result)); setActiveRun(result.id); report(result.incomplete ? 'ได้รับคำตอบบางส่วน Provider ระบุว่ายังไม่ครบ' : 'ได้รับคำตอบแล้ว ตรวจผลก่อนนำไปใช้'); }
    catch (e) { report((e as Error).name === 'AbortError' ? 'ยกเลิกคำขอแล้ว งานและผลลัพธ์เดิมยังอยู่' : (e as Error).message, (e as Error).name !== 'AbortError'); }
    finally { runLock.current = false; setBusy(false); abort.current = null; }
  }
  function addExternalResult() {
    if (!pasted.trim() || runLock.current) return;
    const result: Run = { id: crypto.randomUUID(), model: 'Codex / external', content: pasted, createdAt: new Date().toISOString(), elapsedMs: 0 };
    setWorkspace(w => appendRun(w, result)); setActiveRun(result.id); setPasted(''); report('บันทึกผลลัพธ์ที่คุณนำเข้ามาแล้ว');
  }
  function useResult() {
    if (!currentRun) return;
    const context = `${workspace.context}\n\nผลลัพธ์จากขั้น ${stage.title}:\n${currentRun.content}`.trim();
    if (context.length > 40000) { report('ผลลัพธ์ยาวเกินพื้นที่บริบท เลือกเฉพาะส่วนที่ต้องใช้ หรือดาวน์โหลดเก็บไว้', true); return; }
    update({ context }); report('เพิ่มผลลัพธ์ในบริบทแล้ว เลือกขั้นตอนถัดไปได้');
  }
  if (!catalog) return <main className="startup"><div className="brand-mark">S</div><h1>Skill Studio</h1><p role={loadError ? 'alert' : 'status'}>{loadError || 'กำลังโหลดคลัง Skill…'}</p>{loadError && <button className="button primary" onClick={() => location.reload()}>ลองโหลดใหม่</button>}</main>;
  return <div className="app-shell">
    <a className="skip-link" href="#main">ข้ามไปเนื้อหา</a>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Icon name="flow" size={25} /></div><div><strong>Skill Studio</strong><span>AI Design Engineer</span></div></div>
      <nav aria-label="เมนูหลัก">
        {navigation.map(([id, icon, title]) => <button key={id} aria-current={view === id ? 'page' : undefined}
          onClick={() => {
            if (view === 'library' && id === 'library') setLibraryHomeRequest(request => request + 1);
            setView(id);
          }}>
          <Icon name={icon} /><span>{title}</span>
          {id === 'library' && <small>{catalog.skills.length}</small>}
        </button>)}
      </nav>
      <div className="sidebar-note"><span className="local-dot" />ทำงานในเครื่องของคุณ<p>เตรียม prompt ได้ทันที<br />เชื่อมต่อ LLM เมื่อพร้อม</p></div>
      <div className="sidebar-footer"><span>Skill Studio {catalog.version}</span><a href="https://github.com/gamemun01/ai-design-engineer" target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow" size={14} /></a></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><span className="breadcrumb">พื้นที่ทำงาน <span>/</span> {view === 'workflow' ? workspace.name : view === 'library' ? 'คลัง Skill' : 'การเชื่อมต่อ'}</span><div className="top-actions"><button className="button quiet" disabled={busy} onClick={() => fileInput.current?.click()}><Icon name="upload" size={17} /><span>นำเข้า</span></button><button className="button quiet" onClick={() => download(fileName(workspace.name) + '.studio.json', serializeWorkspace(workspace), 'application/json')}><Icon name="download" size={17} /><span>เก็บ workspace</span></button></div><input className="visually-hidden" tabIndex={-1} ref={fileInput} type="file" accept=".json,application/json" aria-label="นำเข้า workspace JSON" onChange={e => { importWorkspace(e.target.files?.[0]); e.target.value = ''; }} /></header>
      {notice && <div className={'notice ' + (notice.error ? 'error' : '')} role={notice.error ? 'alert' : 'status'}><span>{notice.text}</span><button aria-label="ปิดข้อความ" onClick={() => setNotice(null)}><Icon name="close" size={18} /></button></div>}
      {busy && <RunningRequest onCancel={() => {
        abort.current?.abort();
        document.getElementById('main')?.focus({ preventScroll: true });
      }} />}
      <main id="main" tabIndex={-1}>
        {view === 'workflow' && <>
          <div className="page-heading"><div><h1>เตรียม Prompt สำหรับโปรเจกต์</h1></div><button className="connection-indicator" onClick={() => setView('settings')}><span className={'status-dot ' + (connection?.model ? 'configured' : '')} />{connection?.model ? connection.model : 'ยังไม่ตั้งค่า LLM'}<Icon name="settings" size={16} /></button></div>
          <nav className="stage-track" aria-label="ขั้นตอนเวิร์กโฟลว์">{stages.map((s, index) => <button key={s.id} disabled={busy} aria-current={workspace.stage === s.id ? 'step' : undefined} onClick={() => chooseStage(s.id)}><span className="stage-number">{index + 1}</span><span><strong>{s.title}</strong><small>{s.subtitle}</small></span></button>)}</nav>
          <div className="work-grid">
            <section className="editor-pane" aria-labelledby="task-heading"><div className="section-heading"><h2 id="task-heading">{stage.title}: เตรียมงานของคุณ</h2><span className="pill">{selectedSkills.length} Skill</span></div><p className="muted output-goal">ผลลัพธ์ที่ต้องการ: {stage.output}</p>
              <label htmlFor="project-name">ชื่อโปรเจกต์</label><input id="project-name" readOnly={busy} value={workspace.name} maxLength={160} onChange={e => update({ name: e.target.value })} />
              <div className="label-row">
                <label htmlFor="task">อยากให้ช่วยทำอะไร</label>
                <button ref={exampleButton} className="text-button" disabled={busy || (workspace.task === exampleDraft.task && workspace.context === exampleDraft.context)} aria-expanded={confirmExample} onClick={() => {
                  if (workspace.task || workspace.context) setConfirmExample(value => !value);
                  else applyExample();
                }}>ลองใช้ตัวอย่าง</button>
              </div>
              {confirmExample && <div className="example-feedback">
                <p role="status">ตัวอย่างจะแทนที่ข้อความในช่องโจทย์และบริบท</p>
                <button className="button secondary" disabled={busy} onClick={applyExample}>ใช้ตัวอย่างแทนข้อความ</button>
                <button className="button quiet" onClick={() => { setConfirmExample(false); exampleButton.current?.focus(); }}>เก็บข้อความเดิม</button>
              </div>}
              {previousDraft && !confirmExample && <div className="example-feedback">
                <p role="status">ใส่ตัวอย่างแล้ว</p>
                <button className="button quiet" disabled={busy} onClick={undoExample}>คืนข้อความเดิม</button>
              </div>}
              <textarea id="task" ref={taskInput} readOnly={busy} rows={5} maxLength={16000} placeholder="เช่น ออกแบบ Flow สร้างคู่มือ โดยแยกสิทธิ์ Author และ Reviewer" value={workspace.task} onChange={e => update({ task: e.target.value })} />
              {workspace.stage === 'project' && <section className="advisor-starters" aria-labelledby="advisor-heading"><h3 id="advisor-heading">เริ่มจากสิ่งที่คุณมี</h3><p>เลือกตัวอย่างเพื่อแทนที่โจทย์ด้านบน</p><div>{advisorTasks.map(t => <button className="button secondary" key={t.id} disabled={busy} onClick={() => chooseAdvisorTask(t.id)}>{t.title}</button>)}</div></section>}
              <label htmlFor="context">บริบทและสิ่งที่มีอยู่แล้ว <span className="optional">ถ้ามี</span></label><textarea id="context" readOnly={busy} rows={4} maxLength={40000} placeholder="ผู้ใช้ เป้าหมาย ข้อกำหนด แบรนด์ stack หรือ Spec จากขั้นตอนก่อนหน้า" value={workspace.context} onChange={e => update({ context: e.target.value })} />
              <details className="skill-picker"><summary>Skill ที่ใช้ในงานนี้ <span>{selectedSkills.length} รายการ</span></summary><p className="muted">เลือกตามงาน ไม่จำเป็นต้องโหลดทั้งหมดพร้อมกัน</p>{catalog.skills.map(s => <label className="check-row" key={s.id}><input type="checkbox" disabled={busy} checked={workspace.skillIds.includes(s.id)} onChange={() => toggleSkill(s.id)} /><span>{s.title}<small>{categoryNames[s.category]} · {s.version}</small></span></label>)}</details>
              <details className="references"><summary>เอกสารเสริม <span>{workspace.referencePaths.length} รายการ</span></summary><p className="muted">จะรวมใน prompt เฉพาะเอกสารที่เลือก</p>{catalog.referencePaths.map(p => <label key={p} className="check-row"><input type="checkbox" checked={workspace.referencePaths.includes(p)} disabled={busy || (workspace.referencePaths.length >= 8 && !workspace.referencePaths.includes(p))} onChange={() => update({ referencePaths: workspace.referencePaths.includes(p) ? workspace.referencePaths.filter(r => r !== p) : [...workspace.referencePaths, p] })} /><span>{catalog.documents[p].title}<small>{p}</small></span></label>)}</details>
              <p className="privacy-note">เมื่อส่งงาน จะส่ง prompt, Skill ที่เลือก และบริบทไปยัง URL ของ LLM ที่คุณตั้งค่า การคัดลอก prompt ไม่เรียก LLM</p>
              <div className="editor-actions"><button className="button secondary" disabled={!prompt} onClick={() => copy(prompt)}><Icon name="copy" size={18} />คัดลอกไป Codex</button><button className="button primary" disabled={busy || !prompt} onClick={generate}><Icon name="send" size={18} />ส่งให้ LLM</button></div>
              {promptError && <p className="field-error" role="alert">{promptError}</p>}
            </section>
            <PromptPreview pane={pane} prompt={prompt} busy={busy} runs={workspace.runs}
              currentRun={currentRun} pasted={pasted} onChangePane={setPane} onSelectRun={setActiveRun}
              onUseResult={useResult} onDownloadResult={run => download(fileName(workspace.name) + '-result.md', run.content, 'text/markdown')}
              onChangePasted={setPasted} onSavePasted={addExternalResult} />
          </div>
        </>}
        <SkillLibrary active={view === 'library'} homeRequest={libraryHomeRequest} catalog={catalog} busy={busy} skillIds={workspace.skillIds}
          onToggleSkill={toggleSkill} onReturnToWorkflow={() => setView('workflow')} />
        <ConnectionSettings active={view === 'settings'} connection={connection} busy={busy} report={report}
          onClearNotice={() => setNotice(null)}
          onSave={async draft => {
            if (runLock.current) throw Error('รอให้คำขอ LLM เสร็จก่อนบันทึก');
            const { connection: saved } = await api('connection', draft, 'PUT');
            setConnection(saved);
            return saved;
          }}
          onLoadModels={async () => (await api('models', {})).models} />
      </main>
      <footer className="workspace-footer"><span>บันทึกในเบราว์เซอร์ · ประวัติล่าสุดไม่เกิน 20 คำตอบ / 3 MB · ควรดาวน์โหลดสำรอง</span><span>Canonical sources · {catalog.skills.length} Skills</span></footer>
    </div>
  </div>;
}
