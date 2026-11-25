import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createStudioServer } from '../server/app.mjs';

const catalog = { version: '1.2.0', skills: [{ id: 'review-critique', title: 'Review', sourcePath: 'skills/quality/review-critique/SKILL.md', body: 'Use evidence and report unverified scope.' }], documents: {} };
const listen = s => new Promise(resolve => s.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${s.address().port}`)));
const cleanup = s => { s.closeAllConnections(); s.close(); };

test('local API protects writes, redacts secrets, and uses canonical skills for requests', async t => {
  let prompt;
  const provider = http.createServer(async (req, res) => { let raw = ''; for await (const c of req) raw += c; prompt = JSON.parse(raw).messages.at(-1).content; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ choices: [{ message: { content: 'Review complete' } }] })); });
  const providerUrl = await listen(provider); t.after(() => cleanup(provider));
  const server = createStudioServer({ catalog }); const base = await listen(server); t.after(() => cleanup(server));
  const bootstrapResponse = await fetch(base + '/api/bootstrap');
  assert.equal(bootstrapResponse.status, 200);
  const { token } = await bootstrapResponse.json();
  assert.equal(typeof token, 'string');
  const headers = { 'Content-Type': 'application/json', 'X-Studio-Token': token };
  const payload = { baseUrl: providerUrl + '/v1', model: 'fixture', protocol: 'chat', apiKey: 'sensitive-fixture' };
  assert.equal((await fetch(base + '/api/connection', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).status, 403);
  assert.equal((await fetch(base + '/api/connection', { method: 'PUT', headers: { ...headers, Origin: 'https://attacker.invalid' }, body: JSON.stringify(payload) })).status, 403);
  const saved = await fetch(base + '/api/connection', { method: 'PUT', headers, body: JSON.stringify(payload) });
  assert.equal(saved.status, 200);
  assert.doesNotMatch(await saved.text(), /sensitive-fixture/);
  assert.doesNotMatch(await (await fetch(base + '/api/bootstrap')).text(), /sensitive-fixture/);
  const run = await fetch(base + '/api/run', { method: 'POST', headers, body: JSON.stringify({ task: 'Review my form', skillIds: ['review-critique'] }) });
  assert.equal(run.status, 200);
  assert.equal((await run.json()).content, 'Review complete');
  assert.match(prompt, /Use evidence and report unverified scope/);
  assert.match(prompt, /Review my form/);
  assert.equal((await fetch(base + '/api/run', { method: 'POST', headers, body: JSON.stringify({ task: 'x', skillIds: ['not-real'] }) })).status, 400);
  assert.equal((await fetch(base + '/server/app.mjs')).status, 404);
});

test('cancel disconnects the provider and frees the single-run slot', { timeout: 5000 }, async t => {
  let received, disconnected;
  const arrived = new Promise(resolve => { received = resolve; });
  const closed = new Promise(resolve => { disconnected = resolve; });
  let count = 0;
  const provider = http.createServer((req, res) => {
    req.resume(); count++;
    if (count === 1) { res.on('close', disconnected); received(); }
    else { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ choices: [{ message: { content: 'After cancellation' } }] })); }
  });
  const providerUrl = await listen(provider); t.after(() => cleanup(provider));
  const server = createStudioServer({ catalog }); const base = await listen(server); t.after(() => cleanup(server));
  const { token } = await (await fetch(base + '/api/bootstrap')).json();
  const headers = { 'Content-Type': 'application/json', 'X-Studio-Token': token };
  await fetch(base + '/api/connection', { method: 'PUT', headers, body: JSON.stringify({ baseUrl: providerUrl, model: 'fixture', protocol: 'chat' }) });
  const body = JSON.stringify({ task: 'Review fixture', skillIds: ['review-critique'] });
  const controller = new AbortController();
  const pending = fetch(base + '/api/run', { method: 'POST', headers, body, signal: controller.signal });
  const rejected = assert.rejects(pending, e => e.name === 'AbortError');
  await arrived;
  assert.equal((await fetch(base + '/api/run', { method: 'POST', headers, body })).status, 409);
  controller.abort(); await rejected; await closed;
  const next = await fetch(base + '/api/run', { method: 'POST', headers, body });
  assert.equal(next.status, 200); assert.equal((await next.json()).content, 'After cancellation');
});
