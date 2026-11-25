import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt, parseWorkspace, createWorkspace, requestInput, appendRun, serializeWorkspace, editWorkspace } from '../shared/workflow.mjs';

export const catalog = {
  version: '1.2.0',
  skills: [{ id: 'ux-decision-framework', title: 'UX Decisions', sourcePath: 'skills/ux/ux-decision-framework/SKILL.md', body: 'Describe user tasks and recovery.' }],
  documents: { 'skills/ux/reference.md': { title: 'Reference', body: 'Known constraints.' } },
};
test('portable prompt includes the selected canonical skill and user task', () => {
  const prompt = buildPrompt(catalog, { projectName: 'Demo', task: 'Plan checkout', context: 'Mobile users', skillIds: ['ux-decision-framework'], referencePaths: [] });
  assert.match(prompt, /Describe user tasks and recovery\./);
  assert.match(prompt, /Plan checkout/);
  assert.match(prompt, /Mobile users/);
  assert.doesNotMatch(prompt, /Known constraints/);
});
test('references enter the prompt only after explicit selection', () => {
  const prompt = buildPrompt(catalog, { task: 'Plan checkout', skillIds: ['ux-decision-framework'], referencePaths: ['skills/ux/reference.md'] });
  assert.match(prompt, /Known constraints\./);
  assert.throws(() => buildPrompt(catalog, { task: 'x', skillIds: ['unknown'] }), /skill/i);
});
test('workspace import preserves valid work and rejects credentials or unknown versions', () => {
  const work = { ...createWorkspace(), name: 'Demo', task: 'Plan checkout', skillIds: ['ux-decision-framework'], referencePaths: [], runs: [] };
  const restored = parseWorkspace(JSON.stringify(work), catalog);
  assert.ok(restored);
  assert.equal(restored.name, 'Demo');
  assert.equal(restored.task, 'Plan checkout');
  assert.throws(() => parseWorkspace(JSON.stringify({ ...work, version: 99 }), catalog), /version/i);
  assert.throws(() => parseWorkspace(JSON.stringify({ ...work, apiKey: 'never-import-this' }), catalog), /credential/i);
  assert.throws(() => parseWorkspace('{oops', catalog));
});

test('generation sends prompt inputs without accumulated answers', () => {
  const work = { ...createWorkspace(), task: 'Continue', runs: [{ content: 'x'.repeat(500000) }] };
  const input = requestInput(work);
  assert.deepEqual(Object.keys(input).sort(), ['projectName', 'task', 'context', 'skillIds', 'referencePaths'].sort());
  assert.equal(input.task, 'Continue');
  assert.ok(JSON.stringify(input).length < 1000);
});

test('every generated backup fits the byte limit and can be reopened with Thai answers', () => {
  let work = { ...createWorkspace(), name: '', task: 'Preserve my work', skillIds: ['ux-decision-framework'] };
  for (let i = 0; i < 7; i++) work = appendRun(work, { id: String(i), content: 'ก'.repeat(450000), model: 'fixture', createdAt: '2026-10-16T00:00:00Z', elapsedMs: 1 });
  const raw = serializeWorkspace(work);
  assert.ok(Buffer.byteLength(raw, 'utf8') <= 3000000);
  const restored = parseWorkspace(raw, catalog);
  assert.equal(restored.runs[0].id, '6');
  assert.equal(restored.runs[0].content.length, 450000);
  assert.equal(restored.runs.length, 2);
  assert.equal(restored.task, 'Preserve my work');
  assert.equal(restored.name, '');
});

test('editing context after a nearly full history keeps the exported workspace reopenable', () => {
  let work = { ...createWorkspace(), skillIds: ['ux-decision-framework'] };
  for (let i = 0; i < 6; i++) work = appendRun(work, { id: String(i), content: 'x'.repeat(490000), model: 'fixture', createdAt: '2026-10-16T00:00:00Z' });
  assert.equal(work.runs.length, 6);
  work = editWorkspace(work, { context: 'ก'.repeat(40000) });
  const raw = serializeWorkspace(work);
  assert.ok(Buffer.byteLength(raw) <= 3000000);
  assert.equal(parseWorkspace(raw, catalog).context.length, 40000);
  assert.equal(work.runs[0].id, '5');
  assert.equal(work.runs.length, 5);
});
