import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { unzipSync } from 'fflate';
const version = JSON.parse(await fs.readFile(new URL('../apps/studio/package.json', import.meta.url), 'utf8')).version;
const bundled = process.argv.includes('--bundled-runtime');
if (bundled && process.platform !== 'win32') throw Error('Windows runtime verification requires Windows');
const filename = process.argv.slice(2).find(a => !a.startsWith('--')) || `dist/releases/aide-skill-studio-${version}-${bundled ? 'windows-x64' : 'node'}.zip`;
const bytes = await fs.readFile(filename);
const hash = value => createHash('sha256').update(value).digest('hex');
const checksum = (await fs.readFile(path.join(path.dirname(filename), 'SHA256SUMS.txt'), 'utf8')).split(/\r?\n/).find(l => l.endsWith('  ' + path.basename(filename)))?.split('  ')[0];
if (hash(bytes) !== checksum) throw Error('Archive checksum mismatch');
const entries = unzipSync(bytes);
const manifest = JSON.parse(Buffer.from(entries['release-manifest.json']).toString('utf8'));
if (manifest.version !== version || manifest.skills !== 13) throw Error('Unexpected release manifest');
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'aide-studio-verify-'));
let child;
try {
  for (const [name, contents] of Object.entries(entries)) {
    const target = path.resolve(temp, name);
    if (!target.startsWith(temp + path.sep) || name.includes('\\') || name.startsWith('/')) throw Error('Unsafe archive path');
    if (name !== 'release-manifest.json' && hash(contents) !== manifest.files[name]) throw Error('Manifest hash mismatch: ' + name);
    await fs.mkdir(path.dirname(target), { recursive: true }); await fs.writeFile(target, contents);
  }
  if (Object.keys(manifest.files).some(name => !entries[name])) throw Error('Manifest file missing');
  child = spawn(bundled ? path.join(temp, 'runtime/node.exe') : process.execPath, ['server/start.mjs', '--port=0'], { cwd: temp, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  const base = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Extracted startup timed out')), 10000);
    let output = '';
    const finish = (error, value) => { clearTimeout(timer); error ? reject(error) : resolve(value); };
    child.once('error', e => finish(e)); child.once('exit', code => finish(Error('Extracted startup exited: ' + code + ' ' + output)));
    child.stdout.on('data', chunk => { output += chunk; const match = output.match(/http:\/\/127\.0\.0\.1:\d+/); if (match) finish(null, match[0]); });
    child.stderr.on('data', chunk => { output += chunk; });
  });
  const response = await fetch(base + '/api/bootstrap');
  const data = await response.json();
  if (response.status !== 200 || data.catalog.skills.length !== manifest.skills || data.catalog.version !== version || !data.catalog.skills.some(s => s.id === 'project-design-advisor')) throw Error('Extracted catalog failed');
  const page = await fetch(base); if (page.status !== 200 || !(await page.text()).includes('Skill Studio')) throw Error('Extracted UI failed');
  console.log(`PASS: ${path.basename(filename)}, ${Object.keys(entries).length} verified files, standalone startup, catalog ${manifest.skills}, UI 200, bundled runtime ${bundled}`);
} finally {
  if (child && child.exitCode === null) { await new Promise(resolve => { child.once('exit', resolve); child.kill(); }); }
  // Delete only the unique directory returned by mkdtemp under the resolved temp root.
  if (!temp.startsWith(path.resolve(os.tmpdir()) + path.sep + 'aide-studio-verify-')) throw Error('Unexpected cleanup target');
  await fs.rm(temp, { recursive: true, force: true });
}
