import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { unzipSync, strFromU8 } from 'fflate';
import { packageStudio } from '../../../scripts/package-studio.mjs';
test('release bundle is runnable, contains canonical skills, and excludes local source/secrets', () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-package-test-'));
  try {
    const release = packageStudio({ outputDir });
    assert.ok(release?.archivePath);
    const entries = unzipSync(fs.readFileSync(release.archivePath));
    const names = Object.keys(entries);
    assert.ok(names.includes('server/start.mjs'));
    assert.ok(names.includes('dist/index.html'));
    assert.ok(names.includes('shared/workflow.mjs'));
    assert.ok(names.includes('Start Studio.cmd'));
    assert.ok(names.includes('LICENSE'));
    const catalog = JSON.parse(strFromU8(entries['dist/catalog.json']));
    assert.equal(catalog.skills.length, 13);
    const advisor = catalog.skills.find(s => s.id === 'project-design-advisor');
    assert.ok(advisor, 'release includes the new canonical advisor');
    assert.ok(catalog.documents['skills/ux/project-design-advisor/references/readiness-and-handoff.md']);
    assert.ok(names.includes('licenses/project-design-advisor-CC-BY-4.0.txt'));
    assert.match(catalog.skills.find(s => s.id === 'review-critique').body, /NOT VERIFIED/);
    assert.ok(names.every(n => !n.includes('node_modules/') && !n.includes('.env') && !n.includes('test/') && !n.includes('src/') && !n.includes('skill-observations/') && !n.includes('..')));
    assert.match(strFromU8(entries['Start Studio.cmd']), /%~dp0/);
  } finally {
    assert.equal(path.dirname(outputDir), path.resolve(os.tmpdir()));
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});
