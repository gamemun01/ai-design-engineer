import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns';
import { BlockList, isIP } from 'node:net';

export class StudioError extends Error {
  constructor(message, status = 400, code = 'INVALID_INPUT') { super(message); this.status = status; this.code = code; }
}
const blocked = new BlockList();
blocked.addSubnet('169.254.0.0', 16, 'ipv4');
blocked.addAddress('0.0.0.0', 'ipv4');
blocked.addSubnet('224.0.0.0', 4, 'ipv4');
blocked.addSubnet('fe80::', 10, 'ipv6');
blocked.addAddress('::', 'ipv6');
function assertAddress(host) {
  const clean = host.replace(/^\[|\]$/g, '');
  const family = isIP(clean);
  if (family && blocked.check(clean, family === 4 ? 'ipv4' : 'ipv6')) throw new StudioError('ไม่อนุญาตปลายทาง metadata, link-local หรือ wildcard');
}
function safeLookup(host, options, callback) {
  dns.lookup(host, { ...options, all: true }, (error, entries) => {
    if (error) return callback(error);
    try { entries.forEach(e => assertAddress(e.address)); } catch (e) { return callback(e); }
    if (options.all) callback(null, entries);
    else callback(null, entries[0].address, entries[0].family);
  });
}
export function normalizeConnection(input, previous = {}) {
  if (!input || typeof input.baseUrl !== 'string' || input.baseUrl.length > 2048) throw new StudioError('กรอก Base URL ของ LLM');
  let url;
  try { url = new URL(input.baseUrl.trim()); } catch { throw new StudioError('Base URL ไม่ถูกต้อง'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new StudioError('ใช้ HTTP/HTTPS URL ที่ไม่มี credential, query หรือ fragment');
  assertAddress(url.hostname);
  const baseUrl = url.href.replace(/\/+$/, '');
  if (!['chat', 'responses'].includes(input.protocol)) throw new StudioError('เลือก API protocol ให้ถูกต้อง');
  const model = input.model ?? '';
  if (typeof model !== 'string' || model.length > 160 || /[\r\n]/.test(model)) throw new StudioError('ชื่อโมเดลไม่ถูกต้อง');
  let apiKey = input.apiKey === undefined ? (previous.baseUrl === baseUrl ? previous.apiKey || '' : '') : input.apiKey;
  if (apiKey === null) apiKey = '';
  if (typeof apiKey !== 'string' || apiKey.length > 8192 || /[\r\n]/.test(apiKey)) throw new StudioError('API key ไม่ถูกต้อง');
  const timeoutSeconds = input.timeoutSeconds ?? 300;
  if (!Number.isInteger(timeoutSeconds) || timeoutSeconds < 1 || timeoutSeconds > 600) throw new StudioError('Timeout ต้องอยู่ระหว่าง 1–600 วินาที');
  return { baseUrl, model: model.trim(), protocol: input.protocol, apiKey, timeoutSeconds };
}
export const publicConnection = c => c ? { baseUrl: c.baseUrl, model: c.model, protocol: c.protocol, timeoutSeconds: c.timeoutSeconds, hasApiKey: Boolean(c.apiKey) } : null;

async function requestJson(config, endpoint, body, signal) {
  const timeout = AbortSignal.timeout(config.timeoutSeconds * 1000);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  const url = new URL(config.baseUrl + endpoint);
  const payload = body === undefined ? undefined : JSON.stringify(body);
  const redact = text => config.apiKey ? text.split(config.apiKey).join('[redacted]') : text;
  try {
    return await new Promise((resolve, reject) => {
      const request = (url.protocol === 'https:' ? https : http).request(url, {
        method: payload ? 'POST' : 'GET', signal: combined, lookup: safeLookup,
        headers: { Accept: 'application/json', ...(payload ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {}), ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}) },
      }, response => {
        let size = 0; const chunks = [];
        response.on('data', chunk => { size += chunk.length; if (size > 2000000) response.destroy(new StudioError('คำตอบจาก LLM ใหญ่เกินขีดจำกัด', 502, 'RESPONSE_TOO_LARGE')); else chunks.push(chunk); });
        response.on('error', reject);
        response.on('end', () => {
          if (response.statusCode >= 300 && response.statusCode < 400) return reject(new StudioError('LLM ส่ง redirect; ใช้ Base URL ปลายทางโดยตรง', 502, 'PROVIDER_REDIRECT'));
          let data;
          try { data = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return reject(new StudioError(`LLM ตอบกลับเป็นข้อมูลที่อ่านไม่ได้ (HTTP ${response.statusCode})`, 502, 'INVALID_PROVIDER_RESPONSE')); }
          if (response.statusCode < 200 || response.statusCode >= 300) {
            const detail = typeof data?.error?.message === 'string' ? redact(data.error.message).slice(0, 800) : 'ตรวจ URL, model และสิทธิ์ของ API key';
            return reject(new StudioError(`LLM HTTP ${response.statusCode}: ${detail}`, 502, 'PROVIDER_ERROR'));
          }
          resolve(data);
        });
      });
      request.on('error', reject);
      request.end(payload);
    });
  } catch (error) {
    if (error instanceof StudioError) throw error;
    if (signal?.aborted) throw new StudioError('ยกเลิกคำขอแล้ว', 499, 'CANCELLED');
    if (timeout.aborted) throw new StudioError('LLM ใช้เวลาเกิน Timeout; ปรับเวลาหรือลองงานที่สั้นลง', 504, 'PROVIDER_TIMEOUT');
    throw new StudioError('เชื่อมต่อ LLM ไม่สำเร็จ ตรวจ URL, network และ certificate', 502, 'PROVIDER_UNAVAILABLE');
  }
}

export async function invokeProvider(config, prompt, signal) {
  if (!config?.model) throw new StudioError('ตั้งค่าและบันทึกชื่อโมเดลก่อนส่งงาน', 400, 'MODEL_REQUIRED');
  const instructions = 'Apply the supplied skill guidance to the user task. Give concise conclusions, artifacts, and verification limits. Never claim tool execution or tests you did not perform. Do not output private chain-of-thought.';
  const response = config.protocol === 'responses'
    ? await requestJson(config, '/responses', { model: config.model, instructions, input: prompt, stream: false }, signal)
    : await requestJson(config, '/chat/completions', { model: config.model, messages: [{ role: 'system', content: instructions }, { role: 'user', content: prompt }], stream: false }, signal);
  let content;
  if (config.protocol === 'responses') content = response.output_text || response.output?.filter(o => o.type === 'message').flatMap(o => o.content || []).filter(c => c.type === 'output_text').map(c => c.text).join('\n');
  else { const value = response.choices?.[0]?.message?.content; content = typeof value === 'string' ? value : Array.isArray(value) ? value.filter(c => c.type === 'text').map(c => c.text).join('\n') : undefined; }
  if (typeof content !== 'string' || !content.trim()) throw new StudioError('LLM ไม่ได้ส่งคำตอบข้อความกลับมา ลองตรวจ protocol/model', 502, 'EMPTY_PROVIDER_RESPONSE');
  if (content.length > 500000) throw new StudioError('คำตอบยาวเกิน 500,000 ตัวอักษร ลองแบ่งงานให้เล็กลง', 502, 'RESPONSE_TOO_LARGE');
  const safeContent = config.apiKey ? content.split(config.apiKey).join('[redacted]') : content;
  return { content: safeContent, model: config.model, protocol: config.protocol, incomplete: response.status === 'incomplete' || response.choices?.[0]?.finish_reason === 'length' };
}
export async function listModels(config, signal) {
  const response = await requestJson(config, '/models', undefined, signal);
  if (!Array.isArray(response.data)) throw new StudioError('Provider ไม่มี /models ที่รองรับ กรอก model เองแล้วบันทึกได้', 502, 'MODELS_UNAVAILABLE');
  return response.data.filter(m => typeof m.id === 'string').map(m => m.id).slice(0, 500);
}
