'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createPlan, register } = require('../scripts/register-codex-skills');
const { parseFrontmatter } = require('./lib/contract-checks');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-design-codex-registration-'));
let passed = 0;
function check(name, run) { run(); passed++; console.log(`  OK: ${name}`); }
function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}
try {
  write('AGENTS.md', '# Rules\n');
  write('skills/INDEX.md', '# Index\n');
  write('skills/quality/review-critique/SKILL.md', '---\nname: review-critique\ndescription: Review supplied UI artifacts.\nversion: 2.2.0\n---\n# Source\n');
  write('skills/deprecated/old/SKILL.md', 'not an active skill');
  write('plugins/community/motion/skills/motion-choreography/SKILL.md', '---\nname: motion-choreography\ndescription: Specify accessible motion.\n---\n# Source\n');
  check('discovers core/community skills and excludes archives', () => {
    assert.equal(createPlan(root).length, 2);
  });
  check('dry-run makes no filesystem changes', () => {
    register(root, 'dry-run');
    assert.equal(fs.existsSync(path.join(root, '.agents')), false);
  });
  check('native pointers preserve source links and host-compatible metadata', () => {
    const plan = register(root, 'write');
    for (const entry of plan) {
      const { yaml } = parseFrontmatter(fs.readFileSync(entry.file, 'utf8'));
      assert.deepEqual(Object.keys(yaml).sort(), ['description', 'name']);
      assert.equal(yaml.name, entry.name);
      assert.ok(entry.content.includes(path.relative(path.dirname(entry.file), entry.source).split(path.sep).join('/')));
    }
    register(root, 'check');
  });
  check('check accepts generated files checked out with Windows line endings', () => {
    for (const { file, content, uiFile, uiContent } of createPlan(root)) {
      fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
      fs.writeFileSync(uiFile, uiContent.replace(/\n/g, '\r\n'));
    }
    assert.doesNotThrow(() => register(root, 'check'));
    register(root, 'write');
  });
  check('repeat installation is idempotent', () => {
    const snapshot = () => createPlan(root).map(({ file, uiFile }) => [fs.readFileSync(file, 'utf8'), fs.readFileSync(uiFile, 'utf8')]);
    const before = snapshot();
    register(root, 'write');
    assert.deepEqual(snapshot(), before);
  });
  check('UI metadata has scannable labels and explicit skill prompts', () => {
    for (const entry of createPlan(root)) {
      const { yaml } = parseFrontmatter('---\n' + fs.readFileSync(entry.uiFile, 'utf8') + '\n---\n');
      const ui = yaml.interface;
      assert.ok(ui.display_name.startsWith('AIDE '));
      assert.ok(ui.short_description.length >= 25 && ui.short_description.length <= 64);
      assert.ok(ui.default_prompt.includes('$' + entry.name));
    }
  });
  check('unmanaged UI metadata prevents the entire write batch', () => {
    const plan = createPlan(root);
    const original = fs.readFileSync(plan[0].uiFile, 'utf8');
    fs.writeFileSync(plan[0].uiFile, 'interface:\n  display_name: "User owned"\n');
    const untouched = fs.readFileSync(plan[1].file, 'utf8');
    assert.throws(() => register(root, 'write'), /Unmanaged skill file/);
    assert.equal(fs.readFileSync(plan[1].file, 'utf8'), untouched);
    fs.writeFileSync(plan[0].uiFile, original);
  });
  check('source description changes require regenerated native metadata', () => {
    const source = path.join(root, 'skills/quality/review-critique/SKILL.md');
    fs.writeFileSync(source, fs.readFileSync(source, 'utf8').replace('Review supplied UI artifacts.', 'Review supplied UI with evidence.'));
    assert.throws(() => register(root, 'check'), /Stale native pointer/);
    register(root, 'write');
    register(root, 'check');
  });
  check('unmanaged skills are never overwritten', () => {
    const plan = createPlan(root);
    fs.writeFileSync(plan[0].file, 'user-owned content');
    const untouched = fs.readFileSync(plan[1].file, 'utf8');
    assert.throws(() => register(root, 'write'), /Unmanaged skill/);
    assert.equal(fs.readFileSync(plan[0].file, 'utf8'), 'user-owned content');
    assert.equal(fs.readFileSync(plan[1].file, 'utf8'), untouched);
  });
  console.log(`${passed} Codex registration tests passed`);
} finally {
  // Only remove the absolute, uniquely created fixture below the OS temp root.
  const tempRoot = path.resolve(os.tmpdir());
  const relative = path.relative(tempRoot, path.resolve(root));
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
  assert.ok(path.basename(root).startsWith('ai-design-codex-registration-'));
  fs.rmSync(root, { recursive: true, force: true });
}
