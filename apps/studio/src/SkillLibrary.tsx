import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { MarkdownContent, markdownHeadingId } from './MarkdownContent';
import type { Catalog } from './types';

export const categoryNames: Record<string, string> = {
  foundation: 'พื้นฐาน', ux: 'UX', ui: 'UI / Design System', code: 'เขียนโค้ด',
  quality: 'คุณภาพ', orchestration: 'Orchestration', community: 'ส่วนขยาย',
};

type Props = {
  active: boolean;
  homeRequest: number;
  catalog: Catalog;
  busy: boolean;
  skillIds: string[];
  onToggleSkill: (id: string) => void;
  onReturnToWorkflow: () => void;
};

export function SkillLibrary({ active, homeRequest, catalog, busy, skillIds, onToggleSkill, onReturnToWorkflow }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [readPath, setReadPath] = useState('skills/ux/ux-decision-framework/SKILL.md');
  const [readingSkill, setReadingSkill] = useState(false);
  const [documentAnchor, setDocumentAnchor] = useState<string>();
  const libraryReturn = useRef<{ button: HTMLButtonElement; scrollTop: number } | null>(null);
  const documentTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    libraryReturn.current = null;
    setReadingSkill(false);
    setDocumentAnchor(undefined);
  }, [homeRequest]);

  useEffect(() => {
    if (!active) {
      libraryReturn.current = null;
      setReadingSkill(false);
      setDocumentAnchor(undefined);
      return;
    }
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const heading = documentAnchor && (!mobile || readingSkill) ? document.getElementById(documentAnchor) : null;
    if (heading) {
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: 'start' });
    } else if (mobile && readingSkill) {
      documentTitle.current?.focus({ preventScroll: true });
      documentTitle.current?.scrollIntoView({ block: 'start' });
    } else if (mobile && libraryReturn.current) {
      const { button, scrollTop } = libraryReturn.current;
      libraryReturn.current = null;
      button.focus({ preventScroll: true });
      window.scrollTo({ top: scrollTop, behavior: 'instant' });
    }
  }, [active, readingSkill, readPath, documentAnchor]);

  const openSkill = useCallback((path: string, anchor?: string) => {
    if (window.matchMedia('(max-width: 700px)').matches) setReadingSkill(true);
    setReadPath(path);
    setDocumentAnchor(anchor);
  }, []);

  if (!active) return null;

  const search = query.toLowerCase();
  const filtered = catalog.skills.filter(skill => (category === 'all' || skill.category === category)
    && `${skill.title} ${skill.id} ${skill.description} ${skill.tags.join(' ')}`.toLowerCase().includes(search));
  const skillDocument = catalog.documents[readPath];
  const documentBody = skillDocument?.body ?? 'เลือก Skill จากรายการ';
  const [firstLine] = documentBody.split('\n', 1);
  const leadingHeading = firstLine.trimEnd() === '# ' + skillDocument?.title ? skillDocument?.title : undefined;
  const skillBody = leadingHeading ? documentBody.slice(firstLine.length + 1) : documentBody;

  return <>
    <div className="page-heading">
      <div>
        <h1>คลัง Skill ของคุณ</h1>
        <p>อ่านแนวทาง เลือกให้ตรงงาน แล้วเพิ่มลงใน prompt ปัจจุบัน</p>
      </div>
      <span className="pill">{catalog.skills.length} Skills</span>
    </div>
    <div className="library-grid" data-reading={readingSkill}>
      <section className="library-list" aria-label="รายการ Skill">
        <div className="search-field">
          <Icon name="search" size={18} />
          <label className="visually-hidden" htmlFor="skill-search">ค้นหา Skill</label>
          <input id="skill-search" type="search" value={query} onChange={event => setQuery(event.target.value)}
            placeholder="ค้นหา Skill หรือสิ่งที่อยากทำ" />
        </div>
        <label className="visually-hidden" htmlFor="category">หมวดหมู่</label>
        <select id="category" value={category} onChange={event => setCategory(event.target.value)}>
          <option value="all">ทุกหมวดหมู่</option>
          {Object.entries(categoryNames).map(([id, title]) => <option value={id} key={id}>{title}</option>)}
        </select>
        <p className="list-count">พบ {filtered.length} รายการ</p>
        {filtered.map(skill => {
          const selected = skillIds.includes(skill.id);
          const reading = readPath === skill.sourcePath;
          return <div className={'library-row ' + (reading ? 'selected' : '')} key={skill.id}>
            <button className="read-skill" aria-current={reading || undefined} onClick={event => {
              if (window.matchMedia('(max-width: 700px)').matches) {
                libraryReturn.current = { button: event.currentTarget, scrollTop: window.scrollY };
              }
              openSkill(skill.sourcePath);
            }}>
              <small>{categoryNames[skill.category]}</small>
              <strong>{skill.title}</strong>
              <span>{skill.description}</span>
            </button>
            <button className={'select-skill ' + (selected ? 'chosen' : '')} disabled={busy}
              aria-pressed={selected} aria-label={(selected ? 'นำออก: ' : 'เพิ่มในงาน: ') + skill.title}
              onClick={() => onToggleSkill(skill.id)}>
              <Icon name={selected ? 'check' : 'plus'} size={18} />
            </button>
          </div>;
        })}
        {filtered.length === 0 && <p className="list-empty">ไม่พบ Skill ลองคำอื่นหรือเลือกทุกหมวดหมู่</p>}
      </section>
      <section className="document-pane" aria-label="เนื้อหา Skill">
        <div className="document-toolbar">
          <button className="button quiet mobile-library-back" onClick={() => {
            setReadingSkill(false);
            setDocumentAnchor(undefined);
          }}>กลับไปรายการ Skill</button>
          <h2 className="document-title" id={leadingHeading ? markdownHeadingId(leadingHeading) : undefined}
            ref={documentTitle} tabIndex={-1}>{skillDocument?.title || 'เลือก Skill เพื่ออ่าน'}</h2>
          <button className="button quiet" onClick={onReturnToWorkflow}>กลับไปใช้งาน<Icon name="arrow" size={16} /></button>
        </div>
        <article className="markdown" key={readPath}>
          <MarkdownContent body={skillBody} sourcePath={readPath} leadingHeading={leadingHeading}
            documents={catalog.documents} onOpenDocument={openSkill} />
        </article>
      </section>
    </div>
  </>;
}
