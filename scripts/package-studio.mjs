import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { zipSync, strToU8 } from 'fflate';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(repo, 'apps/studio');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

function notices() {
  const lock = JSON.parse(fs.readFileSync(path.join(app, 'package-lock.json'), 'utf8'));
  const lines = ['Skill Studio third-party notices', ''];
  for (const [location, info] of Object.entries(lock.packages)) {
    if (!location || info.dev || !location.startsWith('node_modules/')) continue;
    const dir = path.join(app, location);
    if (!fs.existsSync(dir)) throw Error(`Install Studio dependencies before packaging: ${location}`);
    const filename = fs.readdirSync(dir).find(n => /^(licen[cs]e|copying)(\.(md|txt))?$/i.test(n));
    lines.push(`## ${location.replace(/^node_modules\//, '')} ${info.version}`, `License: ${info.license || 'See package license'}`, filename ? fs.readFileSync(path.join(dir, filename), 'utf8') : 'Package license metadata applies; source: https://www.npmjs.com/' + location.replace(/^node_modules\//, 'package/'), '');
  }
  return lines.join('\n');
}
export function packageStudio({ outputDir = path.join(repo, 'dist/releases'), runtimeDir } = {}) {
  const version = JSON.parse(fs.readFileSync(path.join(app, 'package.json'), 'utf8')).version;
  const catalog = JSON.parse(fs.readFileSync(path.join(app, 'dist/catalog.json'), 'utf8'));
  if (catalog.version !== version) throw Error('Rebuild Studio: catalog version differs from the app');
  const files = {};
  const collect = (directory, target) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw Error('Release input must not contain symlinks');
      const source = path.join(directory, entry.name); const dest = target + '/' + entry.name;
      if (entry.isDirectory()) collect(source, dest);
      else files[dest] = fs.readFileSync(source);
    }
  };
  collect(path.join(app, 'dist'), 'dist'); collect(path.join(app, 'server'), 'server'); collect(path.join(app, 'shared'), 'shared');
  files.LICENSE = fs.readFileSync(path.join(repo, 'License'));
  // Advisor prose carries its own CC BY attribution and legal text.
  if (catalog.skills.some(s => s.id === 'project-design-advisor')) {
    files['licenses/project-design-advisor-CC-BY-4.0.txt'] = fs.readFileSync(path.join(repo, 'skills/ux/project-design-advisor/LICENSE.txt'));
  }
  files['THIRD-PARTY-NOTICES.txt'] = strToU8(notices());
  files['package.json'] = strToU8(JSON.stringify({ name: 'aide-skill-studio', version, private: true, type: 'module', engines: { node: '>=22.12.0' }, scripts: { start: 'node server/start.mjs --open' } }, null, 2));
  files['Start Studio.cmd'] = strToU8('@echo off\r\ncd /d "%~dp0"\r\nif exist "%~dp0runtime\\node.exe" (\r\n  "%~dp0runtime\\node.exe" "%~dp0server\\start.mjs" --open\r\n) else (\r\n  where node >nul 2>nul\r\n  if errorlevel 1 (\r\n    echo Install Node.js 24 LTS from https://nodejs.org or use the Windows bundle.\r\n    pause\r\n    exit /b 1\r\n  )\r\n  node "%~dp0server\\start.mjs" --open\r\n)\r\npause\r\n');
  files['start-studio.sh'] = strToU8('#!/bin/sh\ncd "$(dirname "$0")" || exit 1\nexec node server/start.mjs --open\n');
  files['README.txt'] = strToU8(`Skill Studio ${version}\n\nWindows: extract the ZIP completely, then double-click Start Studio.cmd.\nmacOS/Linux: install Node.js 24 LTS, then run sh start-studio.sh.\nThe windows-x64 ZIP includes the Node runtime; the node ZIP requires Node >=22.12.\n\nStart a task, select its stage, and copy the portable prompt into Codex.\nOr open Custom LLM and enter a base URL (usually ending in /v1), model,\noptional Bearer API key and API protocol. Ollama and LM Studio presets are included.\nClick Save and load models to query /models; you can also enter the model manually.\nClick Send to LLM to send selected skills and the entered context to that provider.\n\nOnly the local loopback interface is used. Do not expose the app on a public host.\nAPI keys stay in server memory and are forgotten when the process closes.\nWorkspace data and answers stay in this browser; export JSON to back them up.\nDo not put secrets in task text or exported workspaces.\nClose the terminal window to stop Studio. No automatic file changes or shell tools.\n\nSource and full instructions: https://github.com/gamemun01/ai-design-engineer\n`);
  let runtime;
  if (runtimeDir) {
    const origin = JSON.parse(fs.readFileSync(path.join(runtimeDir, 'origin.json'), 'utf8'));
    const bytes = fs.readFileSync(path.join(runtimeDir, 'node.exe'));
    if (hash(bytes) !== origin.nodeSha256) throw Error('Runtime hash differs from verified download');
    files['runtime/node.exe'] = bytes;
    files['runtime/LICENSE'] = fs.readFileSync(path.join(runtimeDir, 'LICENSE'));
    runtime = { ...origin, platform: 'win32', arch: 'x64' };
  }
  const manifest = { name: 'aide-skill-studio', version, runtime: runtime || { required: 'Node.js >=22.12.0' }, skills: catalog.skills.length, files: Object.fromEntries(Object.entries(files).map(([name, bytes]) => [name, hash(bytes)])) };
  files['release-manifest.json'] = strToU8(JSON.stringify(manifest, null, 2));
  fs.mkdirSync(outputDir, { recursive: true });
  const filename = `aide-skill-studio-${version}-${runtime ? 'windows-x64' : 'node'}.zip`;
  const archivePath = path.join(outputDir, filename);
  const entries = Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)).map(([name, bytes]) => [name, [bytes, { mtime: new Date(2026, 0, 1, 0, 0, 0) }]]));
  const archive = zipSync(entries, { level: 6 });
  fs.writeFileSync(archivePath, archive);
  const checksum = `${hash(archive)}  ${filename}`;
  const checksumPath = path.join(outputDir, 'SHA256SUMS.txt');
  const others = fs.existsSync(checksumPath) ? fs.readFileSync(checksumPath, 'utf8').split(/\r?\n/).filter(line => line && !line.endsWith('  ' + filename)) : [];
  fs.writeFileSync(checksumPath, [...others, checksum].sort().join('\n') + '\n');
  return { archivePath, checksum, bytes: archive.length, fileCount: Object.keys(files).length };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const runtimeDir = process.argv.find(a => a.startsWith('--runtime-dir='))?.slice('--runtime-dir='.length);
  console.log(JSON.stringify(packageStudio({ runtimeDir })));
}
