// Controlled local fixture for browser tests. This is not an actual LLM.
import http from 'node:http';
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/v1/models') return res.end(JSON.stringify({ data: [{ id: 'studio-fixture-model' }] }));
  let raw = ''; for await (const chunk of req) raw += chunk;
  let data; try { data = JSON.parse(raw); } catch { res.writeHead(400); return res.end('{}'); }
  const prompt = data.input || data.messages?.at(-1)?.content || '';
  if (prompt.includes('force-error-fixture')) { res.writeHead(503); return res.end(JSON.stringify({ error: { message: 'Fixture is temporarily unavailable' } })); }
  const content = '# ผลทดสอบการเชื่อมต่อ\n\nคำตอบนี้มาจาก **HTTP fixture ในเครื่อง** ไม่ใช่ผลจากโมเดลจริง\n\n- รับ canonical Skill และบริบทได้\n- ส่งคำตอบกลับมาแสดงใน Studio ได้\n- การตรวจ UX และแอปจริงยังเป็น **NOT VERIFIED**';
  const reply = () => res.end(JSON.stringify(data.input ? { output: [{ type: 'message', content: [{ type: 'output_text', text: content }] }] } : { choices: [{ message: { content }, finish_reason: 'stop' }] }));
  if (prompt.includes('slow-fixture')) { const timer = setTimeout(reply, 6000); res.on('close', () => clearTimeout(timer)); }
  else reply();
});
server.listen(4320, '127.0.0.1', () => console.log('Browser fixture: http://127.0.0.1:4320/v1'));
process.on('SIGINT', () => { server.closeAllConnections(); server.close(); });
