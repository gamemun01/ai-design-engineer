// Optional local Postman simulation check; no real provider or credentials.
import assert from 'node:assert/strict';
import { createStudioServer } from '../server/app.mjs';
const server = createStudioServer({ catalog: { version: '1.2.0', skills: [{ id: 'review-critique', title: 'Review', body: 'Report verification limits.', sourcePath: 'skills/quality/review-critique/SKILL.md' }], documents: {} } });
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  const base = `http://127.0.0.1:${server.address().port}`;
  const { token } = await (await fetch(base + '/api/bootstrap')).json();
  const headers = { 'Content-Type': 'application/json', 'X-Studio-Token': token };
  for (const protocol of ['chat', 'responses']) {
    const saved = await fetch(base + '/api/connection', { method: 'PUT', headers, body: JSON.stringify({ baseUrl: 'http://127.0.0.1:4321/llm/v1', protocol, model: 'studio-contract-fixture' }) });
    assert.equal(saved.status, 200);
    const response = await fetch(base + '/api/run', { method: 'POST', headers, body: JSON.stringify({ task: 'Review a synthetic form', skillIds: ['review-critique'] }) });
    const answer = await response.json();
    assert.equal(response.status, 200, JSON.stringify(answer));
    assert.match(answer.content, /Local Postman contract fixture/);
    console.log(`${protocol}: real Studio API → local Postman simulation PASS`);
  }
} finally { server.closeAllConnections(); server.close(); }
