import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { createPlan } = require('./register-codex-skills.js');
const { parseFrontmatter } = require('../tests/lib/contract-checks.js');
const { proseOnly } = require('./lib/skill-integrity.js');
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const allowed = /^(skills\/(?!deprecated\/)|plugins\/community\/|0[1-8]-[^/]+\/)/;
const strip = value => value.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replace(/<!--[^]*?-->/g, '').trim();
export function buildCatalog(repo = root) {
  const pkg = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));
  const documents = {};
  const read = source => {
    if (documents[source] || !allowed.test(source) || !source.endsWith('.md')) return;
    const absolute = path.resolve(repo, source);
    if (!absolute.startsWith(repo + path.sep) || !fs.existsSync(absolute)) return;
    const raw = fs.readFileSync(absolute, 'utf8');
    const body = strip(raw);
    documents[source] = { title: proseOnly(body).match(/^#\s+(.+)$/m)?.[1] || path.basename(source), body };
    for (const match of proseOnly(raw).matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)) {
      let link = match[1].split('#')[0].replace(/\s+"[^"]*"$/, '');
      if (/^[a-z][a-z0-9+.-]*:/i.test(link) || !link) continue;
      try { link = decodeURIComponent(link); } catch { continue; }
      const relative = path.relative(repo, path.resolve(path.dirname(absolute), link)).split(path.sep).join('/');
      read(relative);
    }
  };
  const skills = createPlan(repo).map(p => {
    const raw = fs.readFileSync(p.source, 'utf8');
    const { yaml } = parseFrontmatter(raw);
    const sourcePath = path.relative(repo, p.source).split(path.sep).join('/');
    read(sourcePath);
    const title = p.uiContent.match(/display_name: (.+)/)?.[1];
    return { id: p.name, title: title ? JSON.parse(title).replace(/^AIDE /, '') : p.name, description: yaml.description, version: yaml.version, category: sourcePath.startsWith('plugins/') ? 'community' : sourcePath.split('/')[1], sourcePath, tags: yaml.metadata?.hermes?.tags || [], body: strip(raw) };
  });
  const referencePaths = Object.keys(documents).filter(p => p.includes('/references/'));
  return { version: pkg.version, skills, documents, referencePaths };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const target = path.join(root, 'apps/studio/public/catalog.json');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const catalog = buildCatalog();
  fs.writeFileSync(target, JSON.stringify(catalog));
  console.log(`Studio catalog: ${catalog.skills.length} skills, ${Object.keys(catalog.documents).length} documents`);
}
