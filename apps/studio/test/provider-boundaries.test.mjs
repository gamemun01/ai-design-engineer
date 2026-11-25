import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { invokeProvider, normalizeConnection } from '../server/provider.mjs';
const listen = s => new Promise(resolve => s.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${s.address().port}/v1`)));
test('provider text cannot leak the configured API key into workspace exports', async t => {
  const s = http.createServer((req, res) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ choices: [{ message: { content: 'echo fixture-secret-key' } }] })); });
  const baseUrl = await listen(s); t.after(() => { s.closeAllConnections(); s.close(); });
  const answer = await invokeProvider(normalizeConnection({ baseUrl, protocol: 'chat', model: 'fixture', apiKey: 'fixture-secret-key' }), 'task');
  assert.equal(answer.content, 'echo [redacted]');
});
test('slow provider requests time out and release the socket', async t => {
  let closed;
  const disconnected = new Promise(resolve => { closed = resolve; });
  const s = http.createServer((req, res) => res.on('close', closed));
  const baseUrl = await listen(s); t.after(() => { s.closeAllConnections(); s.close(); });
  await assert.rejects(() => invokeProvider(normalizeConnection({ baseUrl, model: 'fixture', protocol: 'chat', timeoutSeconds: 1 }), 'task'), e => e.code === 'PROVIDER_TIMEOUT');
  await Promise.race([disconnected, new Promise((_, reject) => { const timer = setTimeout(() => reject(Error('socket not released')), 2000); timer.unref(); })]);
});
test('metadata destinations in IPv4-mapped IPv6 are rejected', () => {
  assert.throws(() => normalizeConnection({ baseUrl: 'http://[::ffff:169.254.169.254]/v1', protocol: 'chat' }));
});

test('answers larger than the portable workspace record limit are rejected intact', async t => {
  const s = http.createServer((req, res) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ choices: [{ message: { content: 'x'.repeat(500001) } }] })); });
  const baseUrl = await listen(s); t.after(() => { s.closeAllConnections(); s.close(); });
  await assert.rejects(() => invokeProvider(normalizeConnection({ baseUrl, protocol: 'chat', model: 'fixture' }), 'task'), e => e.code === 'RESPONSE_TOO_LARGE');
});
