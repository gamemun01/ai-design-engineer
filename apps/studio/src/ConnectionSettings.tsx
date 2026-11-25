import { useState } from 'react';
import { Icon } from './Icon';
import type { Connection } from './types';

const presets = {
  custom: ['', 'chat'],
  ollama: ['http://127.0.0.1:11434/v1', 'chat'],
  lmstudio: ['http://127.0.0.1:1234/v1', 'chat'],
  openai: ['https://api.openai.com/v1', 'responses'],
} as const;

const emptyDraft = { baseUrl: '', model: '', protocol: 'chat' as const, timeoutSeconds: 300, apiKey: '' };
type Draft = Omit<Connection, 'hasApiKey'> & { apiKey: string };
type ConnectionInput = Omit<Draft, 'apiKey'> & { apiKey?: string | null };

type Props = {
  active: boolean;
  busy: boolean;
  connection: Connection | null;
  onSave: (input: ConnectionInput) => Promise<Connection>;
  onLoadModels: () => Promise<string[]>;
  onClearNotice: () => void;
  report: (text: string, error?: boolean) => void;
};

export function ConnectionSettings({ active, busy, connection, onSave, onLoadModels, onClearNotice, report }: Props) {
  const [draft, setDraft] = useState<Draft>(() => connection ? { ...connection, apiKey: '' } : emptyDraft);
  const [clearKey, setClearKey] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [models, setModels] = useState<string[] | null>(null);
  const emptyModels = models?.length === 0;
  const useSavedKey = connection?.hasApiKey && connection.baseUrl === draft.baseUrl;

  async function save(loadModels: boolean) {
    if (busy || connecting) return;
    setConnecting(true);
    setModels(null);
    onClearNotice();
    try {
      const saved = await onSave({ ...draft, apiKey: clearKey ? null : draft.apiKey || undefined });
      setDraft({ ...saved, apiKey: '' });
      setClearKey(false);
      if (loadModels) {
        const availableModels = await onLoadModels();
        setModels(availableModels);
        if (availableModels.length > 0) {
          report(`Provider ส่งรายชื่อโมเดล ${availableModels.length} รายการ เลือกหรือกรอกชื่อแล้วบันทึก`);
        }
      } else {
        report('บันทึกการเชื่อมต่อแล้ว คีย์จะถูกลืมเมื่อปิดโปรแกรม');
      }
    } catch (error) {
      report((error as Error).message, true);
    } finally {
      setConnecting(false);
    }
  }

  if (!active) return null;

  return <>
    <div className="page-heading">
      <div>
        <h1>เชื่อมต่อโมเดลของคุณ</h1>
        <p>ใช้ provider ที่รองรับ OpenAI-compatible API ทั้งในเครื่องและบนเครือข่าย</p>
      </div>
    </div>
    <div className="settings-layout">
      <form className="settings-form" onSubmit={event => {
        event.preventDefault();
        const submitter = (event.nativeEvent as SubmitEvent).submitter;
        void save(submitter?.id === 'load-models');
      }}>
        <h2>Custom LLM</h2>
        <label htmlFor="preset">เริ่มจากการตั้งค่า</label>
        <select id="preset" defaultValue="custom" onChange={event => {
          const [baseUrl, protocol] = presets[event.target.value as keyof typeof presets];
          setDraft(d => ({ ...d, baseUrl, protocol, model: '', apiKey: '' }));
          setClearKey(false);
          setModels(null);
        }}>
          <option value="custom">Custom provider</option>
          <option value="ollama">Ollama</option>
          <option value="lmstudio">LM Studio</option>
          <option value="openai">OpenAI API</option>
        </select>
        <label htmlFor="base-url">Base URL</label>
        <input id="base-url" type="url" required maxLength={2048} value={draft.baseUrl}
          onChange={event => { setDraft(d => ({ ...d, baseUrl: event.target.value })); setModels(null); }}
          placeholder="http://127.0.0.1:1234/v1" />
        <p className="field-help">ใส่ API base เช่น /v1 ไม่รวม /chat/completions หรือ /responses</p>
        {draft.baseUrl.startsWith('http:') && <p className="http-note">HTTP ส่งข้อมูลโดยไม่เข้ารหัส ใช้กับปลายทางในเครื่องหรือเครือข่ายที่คุณเชื่อถือ</p>}
        <label htmlFor="protocol">API protocol</label>
        <select id="protocol" value={draft.protocol}
          onChange={event => setDraft(d => ({ ...d, protocol: event.target.value === 'responses' ? 'responses' : 'chat' }))}>
          <option value="chat">Chat Completions</option>
          <option value="responses">Responses API</option>
        </select>
        <label htmlFor="api-key">API key <span className="optional">ถ้า provider ต้องใช้</span></label>
        <input id="api-key" type="password" autoComplete="off" maxLength={8192} value={draft.apiKey}
          onChange={event => setDraft(d => ({ ...d, apiKey: event.target.value }))}
          placeholder={useSavedKey ? 'เก็บคีย์ไว้ใน session แล้ว เว้นว่างเพื่อใช้คีย์เดิม' : 'เว้นว่างได้สำหรับ local provider'} />
        {connection?.hasApiKey && <label className="check-row clear-key">
          <input type="checkbox" checked={clearKey} onChange={event => setClearKey(event.target.checked)} />
          ล้างคีย์เดิมเมื่อบันทึก
        </label>}
        <label htmlFor="model">ชื่อ Model</label>
        <input id="model" list="model-options" maxLength={160} value={draft.model}
          aria-describedby={emptyModels ? 'model-list-status' : 'model-help'}
          onChange={event => setDraft(d => ({ ...d, model: event.target.value }))}
          placeholder="กรอกชื่อ model ตาม provider" />
        <datalist id="model-options">{models?.map(model => <option key={model} value={model} />)}</datalist>
        <p id="model-list-status" className={emptyModels ? 'field-help model-list-status' : 'visually-hidden'} role="status">
          {emptyModels && 'Provider ไม่มีรายชื่อโมเดล กรอกชื่อ Model ได้โดยตรง'}
        </p>
        {!emptyModels && <p id="model-help" className="field-help">กรอกเองได้ หรือบันทึกและโหลดรายชื่อจาก /models</p>}
        <label htmlFor="timeout">Timeout <span className="optional">วินาที</span></label>
        <input id="timeout" type="number" min={1} max={600} required value={draft.timeoutSeconds}
          onChange={event => setDraft(d => ({ ...d, timeoutSeconds: Number(event.target.value) }))} />
        <div className="settings-actions">
          <button className="button primary" disabled={busy || connecting} type="submit">
            {connecting ? 'กำลังเชื่อมต่อ…' : 'บันทึกการเชื่อมต่อ'}
          </button>
          <button id="load-models" className="button secondary" disabled={busy || connecting || !draft.baseUrl} type="submit">
            บันทึกและโหลดโมเดล
          </button>
        </div>
      </form>
      <aside className="connection-help">
        <Icon name="settings" size={28} />
        <h2>เลือกวิธีทำงานได้เอง</h2>
        <p>คัดลอก prompt ไปใช้กับ Codex ได้โดยไม่ตั้งค่า LLM หรือเชื่อมต่อ provider เพื่อรับคำตอบใน Studio</p>
        <ul>
          <li>API key เก็บเฉพาะในหน่วยความจำของเซิร์ฟเวอร์ในเครื่อง</li>
          <li>ปิดโปรแกรมแล้วคีย์จะถูกลืม</li>
          <li>ไฟล์ workspace ไม่มีข้อมูลการเชื่อมต่อหรือคีย์</li>
          <li>App ส่งคำขอเมื่อคุณกดโหลดโมเดลหรือส่งงานเท่านั้น</li>
        </ul>
        {connection && <div className="saved-connection">
          <strong>การตั้งค่าที่บันทึกแล้ว</strong>
          <span>{connection.baseUrl}</span>
          <span>{connection.model || 'ยังไม่ระบุ model'}</span>
          <span>{connection.protocol === 'chat' ? 'Chat Completions' : 'Responses API'}</span>
          <small>การบันทึกไม่ใช่การยืนยันว่า provider พร้อมใช้งาน</small>
        </div>}
      </aside>
    </div>
  </>;
}
