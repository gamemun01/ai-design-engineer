import test from 'node:test';
import assert from 'node:assert/strict';
import * as workflow from '../shared/workflow.mjs';
import { buildCatalog } from '../../../scripts/build-studio-catalog.mjs';

test('new projects start with the canonical Project Design Advisor and its linked guidance', () => {
  const catalog = buildCatalog();
  const work = workflow.createWorkspace();
  assert.equal(work.stage, 'project');
  assert.ok(work.skillIds.includes('project-design-advisor'));
  const skill = catalog.skills.find(s => s.id === 'project-design-advisor');
  assert.ok(skill, 'advisor is in the real canonical catalog');
  assert.equal(skill.category, 'ux');
  for (const mode of workflow.advisorTasks) {
    for (const p of mode.referencePaths) assert.ok(catalog.documents[p], 'mode guidance exists: ' + p);
  }
});

test('readiness and CR starters retain project evidence and carry the required guidance into portable prompts', () => {
  const catalog = buildCatalog();
  const work = { ...workflow.createWorkspace(), name: 'Synthetic project', context: 'Baseline r1; owner acceptance has not been supplied.', runs: [{ id: 'previous', content: 'Previous draft' }] };
  assert.equal(typeof workflow.applyAdvisorTask, 'function');
  for (const id of ['readiness', 'handoff', 'change']) {
    const next = workflow.applyAdvisorTask(work, id, catalog);
    assert.equal(next.context, work.context);
    assert.deepEqual(next.runs, work.runs);
    const prompt = workflow.buildPrompt(catalog, workflow.requestInput(next));
    assert.ok(next.referencePaths.length > 0);
    for (const p of next.referencePaths) assert.ok(prompt.includes(catalog.documents[p].body));
    assert.ok(prompt.includes(work.context));
    assert.ok(prompt.includes(next.task));
  }
  assert.throws(() => workflow.applyAdvisorTask(work, 'unknown-mode', catalog));
});

test('the complete expanded library can be selected and restored without an obsolete twelve-skill cap', () => {
  const catalog = { skills: Array.from({ length: 13 }, (_, i) => ({ id: 'skill-' + i, title: 'Skill ' + i, body: 'Instruction ' + i, sourcePath: 'skills/example-' + i })), documents: {} };
  const work = { ...workflow.createWorkspace(), task: 'Synthetic task', skillIds: catalog.skills.map(s => s.id) };
  const prompt = workflow.buildPrompt(catalog, work);
  assert.ok(prompt.includes('Instruction 12'));
  assert.deepEqual(workflow.parseWorkspace(workflow.serializeWorkspace(work), catalog).skillIds, work.skillIds);
});

test('existing UX workspaces reopen with unchanged task, stage and results', () => {
  const catalog = buildCatalog();
  const old = { ...workflow.createWorkspace(), stage: 'ux', skillIds: ['ux-decision-framework'], task: 'Keep the existing UX task', context: 'Existing notes', runs: [{ id: 'old', content: 'Keep this result', model: 'external', createdAt: '2026-10-16T00:00:00Z', elapsedMs: 0 }] };
  const reopened = workflow.parseWorkspace(JSON.stringify(old), catalog);
  assert.equal(reopened.stage, 'ux');
  assert.equal(reopened.task, old.task);
  assert.equal(reopened.runs[0].content, old.runs[0].content);
});

test('a starter that would exceed the reference limit leaves existing work intact', () => {
  const catalog = buildCatalog();
  const extra = Array.from({ length: 8 }, (_, i) => 'skills/extra-' + i + '.md');
  extra.forEach(p => { catalog.documents[p] = { title: p, body: 'Synthetic reference' }; });
  const work = { ...workflow.createWorkspace(), task: 'Keep task', referencePaths: extra };
  assert.throws(() => workflow.applyAdvisorTask(work, 'change', catalog), /8/);
  assert.equal(work.task, 'Keep task');
  assert.deepEqual(work.referencePaths, extra);
});
