import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { normalizeConnection, invokeProvider, listModels } from '../server/provider.mjs';
const listen = server => new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}/v1`)));

test('connection validates URLs and discards the previous secret when destination changes', () => {
  const old = normalizeConnection({ baseUrl: 'http://localhost:1234/v1/', model: 'local', apiKey: 'old-secret', protocol: 'chat' });
  assert.equal(old.baseUrl, 'http://localhost:1234/v1');
  assert.equal(normalizeConnection({ baseUrl: 'http://localhost:9999/v1', model: 'new', protocol: 'chat' }, old).apiKey, '');
  for (const url of ['file:///etc/passwd', 'http://user:pass@host/v1', 'http://169.254.169.254/v1', 'https://host/v1?api_key=secret']) assert.throws(() => normalizeConnection({ baseUrl: url, protocol: 'chat' }));
});
test('both protocols send real HTTP payloads and return normalized text', async t => {
  let received;
  const server = http.createServer(async (req, res) => {
    let raw = ''; for await (const chunk of req) raw += chunk;
    received = { path: req.url, auth: req.headers.authorization, body: raw ? JSON.parse(raw) : null };
    res.setHeader('Content-Type', 'application/json');
    if (req.url.endsWith('/models')) res.end(JSON.stringify({ data: [{ id: 'fixture-model' }] }));
    else if (req.url.endsWith('/responses')) res.end(JSON.stringify({ output: [{ type: 'message', content: [{ type: 'output_text', text: 'Responses answer' }] }] }));
    else res.end(JSON.stringify({ choices: [{ message: { content: 'Chat answer' } }], usage: { total_tokens: 12 } }));
  });
  const baseUrl = await listen(server); t.after(() => { server.closeAllConnections(); server.close(); });
  const config = normalizeConnection({ baseUrl, apiKey: 'fixture-key', model: 'fixture-model', protocol: 'chat' });
  const answer = await invokeProvider(config, 'Real task context');
  assert.equal(answer.content, 'Chat answer');
  assert.equal(received.path, '/v1/chat/completions');
  assert.equal(received.auth, 'Bearer fixture-key');
  assert.equal(received.body.messages.at(-1).content, 'Real task context');
  assert.deepEqual(await listModels(config), ['fixture-model']);
  const response = await invokeProvider({ ...config, protocol: 'responses' }, 'Another task');
  assert.equal(response.content, 'Responses answer');
  assert.equal(received.body.input, 'Another task');
});
test('redirects cannot forward credentials and malformed responses remain failures', async t => {
  let leaked = false;
  const target = http.createServer((req, res) => { leaked = true; res.end('{}'); });
  const targetUrl = await listen(target); t.after(() => { target.closeAllConnections(); target.close(); });
  let redirect = true;
  const server = http.createServer((req, res) => { if (redirect) { res.writeHead(302, { Location: targetUrl }); res.end(); } else res.end('{bad'); });
  const baseUrl = await listen(server); t.after(() => { server.closeAllConnections(); server.close(); });
  const config = normalizeConnection({ baseUrl, model: 'test', apiKey: 'secret', protocol: 'chat' });
  await assert.rejects(() => invokeProvider(config, 'task'));
  assert.equal(leaked, false);
  redirect = false;
  await assert.rejects(() => invokeProvider(config, 'task'));
});
