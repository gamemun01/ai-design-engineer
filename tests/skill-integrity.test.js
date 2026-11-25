'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { withoutMarkdownComments, proseOnly, missingSections, checkLocalLinks } = require('../scripts/lib/skill-integrity');

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-design-skill-integrity-'));
const doc = path.join(fixture, 'SKILL.md');
const target = path.join(fixture, 'reference file.md');
fs.writeFileSync(target, '# Reference\n');
let passed = 0;
function check(name, run) {
  run();
  passed++;
  console.log(`  OK: ${name}`);
}
function links(markdown) {
  fs.writeFileSync(doc, markdown);
  return checkLocalLinks(doc, fixture);
}

try {
  check('real relative links, anchors, encoded spaces, titles and reference definitions resolve', () => {
    assert.deepEqual(links('[one](reference%20file.md#heading)\n[two](<reference file.md> "title")\n[ref]: reference%20file.md\n[web](https://example.com)\n[anchor](#heading)'), []);
  });
  check('missing references and assets fail', () => {
    assert.equal(links('[guide](missing.md)\n![asset](missing.png)').length, 2);
  });
  check('absolute and escaping local paths fail', () => {
    assert.equal(links('[abs](file:///C:/private.md)\n[drive](C:/private.md)\n[root](/private.md)\n[out](../private.md)').length, 4);
  });
  check('malformed URI encoding returns a finding instead of throwing', () => {
    assert.match(links('[bad](bad%ZZ.md)')[0], /Invalid link encoding/);
  });
  check('code examples and comments do not create broken prose links', () => {
    assert.deepEqual(links('````markdown\n```json\n[example](not-real.md)\n```\n````\n<!-- [hidden](not-real.md) -->'), []);
  });
  check('removing comments keeps text and line boundaries separate', () => {
    assert.equal(withoutMarkdownComments('before<!-- note -->after'), 'before after');
    assert.equal(withoutMarkdownComments('before<!-- note\r\nmore -->after'), 'before \r\n after');
  });
  check('required headings must exist outside fenced examples', () => {
    const required = ['## Trigger Description', '## System Instruction'];
    assert.deepEqual(missingSections('## Trigger Description\n```md\n## System Instruction\n```', required), ['## System Instruction']);
  });
  check('tilde fences and shorter inner fences preserve prose boundaries', () => {
    assert.equal(proseOnly('~~~~md\n~~~\n## hidden\n~~~~\n## visible').trim(), '## visible');
  });
  console.log(`${passed} skill integrity tests passed`);
} finally {
  if (fs.existsSync(doc)) fs.unlinkSync(doc);
  fs.unlinkSync(target);
  fs.rmdirSync(fixture);
}
