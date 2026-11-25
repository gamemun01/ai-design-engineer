import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { buildPrompt } from '../shared/workflow.mjs';
import { StudioError, normalizeConnection, publicConnection, invokeProvider, listModels } from './provider.mjs';

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' };
async function readJson(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new StudioError('ส่งข้อมูลเป็น application/json', 415);
  if (Number(req.headers['content-length']) > 512000) throw new StudioError('ข้อมูลคำขอใหญ่เกินขีดจำกัด', 413);
  const raw = await new Promise((resolve, reject) => {
    let size = 0; const chunks = []; let failed = false;
    req.on('data', chunk => { size += chunk.length; if (size > 512000) { if (!failed) reject(new StudioError('ข้อมูลคำขอใหญ่เกินขีดจำกัด', 413)); failed = true; } else if (!failed) chunks.push(chunk); });
    req.on('end', () => { if (!failed) resolve(Buffer.concat(chunks).toString('utf8')); });
    req.on('error', reject);
  });
  try { const value = JSON.parse(raw); if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error(); return value; } catch { throw new StudioError('ข้อมูล JSON ไม่ถูกต้อง'); }
}
export function createStudioServer({ catalog, staticDir } = {}) {
  if (!catalog?.skills?.length) throw new Error('Studio catalog is required');
  const token = randomUUID(); let connection = null; let running = false;
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    const json = (value, status = 200) => { if (res.destroyed) return; res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(value)); };
    try {
      const port = server.address().port;
      const hosts = [`127.0.0.1:${port}`, `localhost:${port}`];
      if (!hosts.includes(req.headers.host)) throw new StudioError('Local host only', 403, 'FORBIDDEN_HOST');
      const origin = `http://${req.headers.host}`;
      if ((req.headers.origin && req.headers.origin !== origin) || req.headers['sec-fetch-site'] === 'cross-site') throw new StudioError('Same-origin requests only', 403, 'FORBIDDEN_ORIGIN');
      const url = new URL(req.url, origin);
      if (req.method === 'GET' && url.pathname === '/api/bootstrap') return json({ token, catalog, connection: publicConnection(connection) });
      if (url.pathname.startsWith('/api/')) {
        if (!['POST', 'PUT'].includes(req.method)) throw new StudioError('Method not allowed', 405);
        if (req.headers['x-studio-token'] !== token) throw new StudioError('โหลดหน้า App ใหม่แล้วลองอีกครั้ง', 403, 'FORBIDDEN');
        const body = await readJson(req);
        if (url.pathname === '/api/connection' && req.method === 'PUT') {
          connection = normalizeConnection(body, connection || {});
          return json({ connection: publicConnection(connection) });
        }
        if (!connection) throw new StudioError('ตั้งค่าการเชื่อมต่อ LLM ก่อน', 400, 'CONNECTION_REQUIRED');
        const controller = new AbortController();
        res.on('close', () => controller.abort());
        if (url.pathname === '/api/models' && req.method === 'POST') return json({ models: await listModels(connection, controller.signal) });
        if (url.pathname === '/api/run' && req.method === 'POST') {
          if (running) throw new StudioError('มีคำขอกำลังทำงานอยู่ รอหรือยกเลิกก่อน', 409, 'RUN_IN_PROGRESS');
          let prompt;
          try { prompt = buildPrompt(catalog, body); } catch (e) { throw new StudioError(e.message); }
          running = true; const started = Date.now();
          try { const answer = await invokeProvider(connection, prompt, controller.signal); return json({ id: randomUUID(), ...answer, elapsedMs: Date.now() - started, createdAt: new Date().toISOString() }); }
          finally { running = false; }
        }
        throw new StudioError('ไม่พบ API นี้', 404);
      }
      if (req.method !== 'GET' || !staticDir) throw new StudioError('Not found', 404);
      let decoded; try { decoded = decodeURIComponent(url.pathname); } catch { throw new StudioError('Invalid path'); }
      const root = await fs.realpath(staticDir);
      const candidate = path.resolve(root, '.' + (decoded === '/' ? '/index.html' : decoded));
      if (!candidate.startsWith(root + path.sep) || !mime[path.extname(candidate)]) throw new StudioError('Not found', 404);
      let real; try { real = await fs.realpath(candidate); } catch { throw new StudioError('Not found', 404); }
      if (!real.startsWith(root + path.sep)) throw new StudioError('Not found', 404);
      const content = await fs.readFile(real);
      res.writeHead(200, { 'Content-Type': mime[path.extname(real)] }); res.end(content);
    } catch (error) {
      const known = error instanceof StudioError;
      json({ error: { code: known ? error.code : 'INTERNAL_ERROR', message: known ? error.message : 'App เกิดข้อผิดพลาด ลองโหลดหน้าใหม่' } }, known ? error.status : 500);
    }
  });
  server.requestTimeout = 30000;
  server.headersTimeout = 15000;
  return server;
}
