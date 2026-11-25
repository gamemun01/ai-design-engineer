import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createStudioServer } from './app.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = path.join(root, 'dist/catalog.json');
if (!fs.existsSync(catalogFile)) { console.error('Build Studio first: npm run studio:build (from the repository root).'); process.exit(1); }
const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
const server = createStudioServer({ catalog, staticDir: path.join(root, 'dist') });
const portArg = process.argv.find(a => a.startsWith('--port='));
const port = Number(portArg?.split('=')[1] ?? process.env.STUDIO_PORT ?? 4318);
if (!Number.isInteger(port) || port < 0 || port > 65535) { console.error('Invalid Studio port'); process.exit(1); }
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && port !== 0) { console.log('Default port is busy; choosing a free local port.'); server.listen(0, '127.0.0.1'); }
  else { console.error(`Studio could not start (${error.code || 'ERROR'}).`); process.exitCode = 1; }
});
server.on('listening', () => {
  const url = `http://127.0.0.1:${server.address().port}`;
  console.log(`Skill Studio v${catalog.version} ready: ${url}`);
  console.log('Local app. Provider keys stay in memory; close this process to forget them.');
  if (process.argv.includes('--open')) {
    const [command, args] = process.platform === 'win32' ? ['rundll32.exe', ['url.dll,FileProtocolHandler', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
    const opener = spawn(command, args, { detached: true, stdio: 'ignore', windowsHide: true });
    opener.on('error', () => console.log(`Open ${url} in your browser.`)); opener.unref();
  }
});
server.listen(port, '127.0.0.1');
const close = () => { server.closeAllConnections(); server.close(() => process.exit(0)); };
process.on('SIGINT', close); process.on('SIGTERM', close);
