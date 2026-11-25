import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { unzipSync } from 'fflate';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = 'v24.22.0';
const filename = `node-${version}-win-x64.zip`;
const root = path.join(repo, '.release-runtime');
fs.mkdirSync(root, { recursive: true });
const base = `https://nodejs.org/dist/${version}/`;
async function get(url) { const response = await fetch(url, { signal: AbortSignal.timeout(120000), redirect: 'error' }); if (!response.ok) throw Error(`Download failed: HTTP ${response.status}`); return response; }
const sums = await (await get(base + 'SHASUMS256.txt')).text();
const checksum = sums.split(/\r?\n/).find(line => line.endsWith('  ' + filename))?.split(/\s+/)[0];
if (!checksum || !/^[a-f0-9]{64}$/.test(checksum)) throw Error('Official checksum missing');
const zip = Buffer.from(await (await get(base + filename)).arrayBuffer());
if (createHash('sha256').update(zip).digest('hex') !== checksum) throw Error('Node archive checksum mismatch');
const entries = unzipSync(zip);
const prefix = `node-${version}-win-x64/`;
const destination = path.join(root, prefix);
fs.mkdirSync(destination, { recursive: true });
for (const name of ['node.exe', 'LICENSE']) { const bytes = entries[prefix + name]; if (!bytes) throw Error(`Node distribution missing ${name}`); fs.writeFileSync(path.join(destination, name), bytes); }
fs.writeFileSync(path.join(destination, 'origin.json'), JSON.stringify({ version, url: base + filename, archiveSha256: checksum, nodeSha256: createHash('sha256').update(entries[prefix + 'node.exe']).digest('hex') }, null, 2));
console.log(`Verified Windows runtime: ${destination}`);
