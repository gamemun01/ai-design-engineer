const http = require('node:http');
http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET' && req.url === '/v1/models') return res.end(JSON.stringify({ data: [{ id: 'studio-contract-fixture' }] }));
  if (req.method !== 'POST' || !['/v1/chat/completions', '/v1/responses'].includes(req.url)) { res.statusCode = 501; return res.end(JSON.stringify({ error: { message: 'Not modeled by this fixture' } })); }
  let body = req.body;
  if (!body) { let raw = ''; for await (const chunk of req) raw += chunk; try { body = JSON.parse(raw); } catch { res.statusCode = 400; return res.end(JSON.stringify({ error: { message: 'Invalid JSON' } })); } }
  if (!body.model || (req.url.endsWith('/responses') ? typeof body.input !== 'string' : !Array.isArray(body.messages))) { res.statusCode = 400; return res.end(JSON.stringify({ error: { message: 'Missing model or text input' } })); }
  const text = '## Local Postman contract fixture\n\nSynthetic HTTP response. No real LLM was called. Project execution is NOT VERIFIED.';
  res.end(JSON.stringify(req.url.endsWith('/responses') ? { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text }] }] } : { choices: [{ message: { content: text }, finish_reason: 'stop' }] }));
}).listen(process.env.PORT);
