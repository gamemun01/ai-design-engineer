import type { KeyboardEvent } from 'react';
import { Icon } from './Icon';
import { MarkdownContent } from './MarkdownContent';
import type { Run } from './types';

type Pane = 'prompt' | 'result';

type Props = {
  pane: Pane;
  prompt: string;
  busy: boolean;
  runs: Run[];
  currentRun?: Run;
  pasted: string;
  onChangePane: (pane: Pane) => void;
  onSelectRun: (id: string) => void;
  onUseResult: () => void;
  onDownloadResult: (run: Run) => void;
  onChangePasted: (text: string) => void;
  onSavePasted: () => void;
};

export function PromptPreview({
  pane, prompt, busy, runs, currentRun, pasted, onChangePane, onSelectRun, onUseResult, onDownloadResult,
  onChangePasted, onSavePasted,
}: Props) {
  function navigateTabs(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'prompt'
      : event.key === 'End' ? 'result' : pane === 'prompt' ? 'result' : 'prompt';
    onChangePane(next);
    event.currentTarget.querySelector<HTMLButtonElement>('#' + next + '-tab')?.focus();
  }

  return <section className="preview-pane" aria-label="Prompt และผลลัพธ์">
    <div className="pane-tabs" role="tablist" aria-label="เนื้อหาพรีวิว" onKeyDown={navigateTabs}>
      <button role="tab" tabIndex={pane === 'prompt' ? 0 : -1} aria-selected={pane === 'prompt'}
        aria-controls="prompt-panel" id="prompt-tab" onClick={() => onChangePane('prompt')}>Prompt</button>
      <button role="tab" tabIndex={pane === 'result' ? 0 : -1} aria-selected={pane === 'result'}
        aria-controls="result-panel" id="result-tab" onClick={() => onChangePane('result')}>ผลลัพธ์ <span>{runs.length}</span></button>
      {prompt && <small>{prompt.length.toLocaleString()} ตัวอักษร</small>}
    </div>

    {pane === 'prompt' ? <div role="tabpanel" id="prompt-panel" aria-labelledby="prompt-tab" className="prompt-content">
      {prompt ? <>
        <div className="prompt-meta"><Icon name="file" size={17} />พร้อมคัดลอก ใช้ได้โดยไม่ต้องติดตั้ง Skill ในแชตปลายทาง</div>
        <pre tabIndex={0}>{prompt}</pre>
      </> : <div className="empty-state">
        <Icon name="file" size={38} />
        <h3>ยังไม่มี Prompt</h3>
        <p>กรอกโจทย์เพื่อสร้าง Prompt</p>
      </div>}
    </div> : <div role="tabpanel" id="result-panel" aria-labelledby="result-tab" className="result-content">
      {currentRun ? <>
        <div className="result-meta">
          <span>{currentRun.model}{currentRun.incomplete ? ' · คำตอบบางส่วน' : ''}</span>
          <span>{currentRun.elapsedMs ? (currentRun.elapsedMs / 1000).toFixed(1) + 's' : 'นำเข้าโดยผู้ใช้'}</span>
        </div>
        {runs.length > 1 && <label className="history-select">ประวัติคำตอบ
          <select value={currentRun.id} onChange={event => onSelectRun(event.target.value)}>
            {runs.map((run, index) => <option key={run.id} value={run.id}>
              {index + 1}. {run.model} · {new Date(run.createdAt).toLocaleString('th-TH')}
            </option>)}
          </select>
        </label>}
        <article className="markdown"><MarkdownContent body={currentRun.content} /></article>
        <div className="result-actions">
          <button className="button secondary" disabled={busy} onClick={onUseResult}>
            <Icon name="plus" size={17} />ใช้เป็นบริบท
          </button>
          <button className="button quiet" onClick={() => onDownloadResult(currentRun)}>
            <Icon name="download" size={17} />ดาวน์โหลด
          </button>
        </div>
        <p className="result-footnote">คำตอบเป็นข้อเสนอ ตรวจหลักฐานและทดสอบในโปรเจกต์ก่อนใช้งานจริง</p>
      </> : !busy && <div className="empty-state result-empty">
        <Icon name="flow" size={38} />
        <h3>นำผลลัพธ์กลับมาต่อยอด</h3>
        <p>ส่งงานให้ Custom LLM หรือวางคำตอบจาก Codex ด้านล่าง</p>
      </div>}
      <details className="paste-result" open={!currentRun && !busy}>
        <summary>วางผลลัพธ์จาก Codex หรือแชตอื่น</summary>
        <label className="visually-hidden" htmlFor="external-result">ผลลัพธ์จากแชตอื่น</label>
        <textarea id="external-result" readOnly={busy} rows={4} maxLength={500000} value={pasted}
          onChange={event => onChangePasted(event.target.value)} placeholder="วางผลลัพธ์ที่คุณต้องการเก็บไว้ใน workspace" />
        <button className="button secondary" disabled={busy || !pasted.trim()} onClick={onSavePasted}>บันทึกผลลัพธ์</button>
      </details>
    </div>}
  </section>;
}
