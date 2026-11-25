'use strict';

const fs = require('node:fs');
const path = require('node:path');

// Ignore instructional code examples when checking actual prose links/headings.
// Closing fences must use the opening character and at least its length.
function proseOnly(content) {
  let fence = null;
  return content.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/).map((line) => {
    const match = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (match) {
      if (!fence) fence = { char: match[1][0], length: match[1].length };
      else if (match[1][0] === fence.char && match[1].length >= fence.length && !match[2].trim()) fence = null;
      return '';
    }
    return fence ? '' : line;
  }).join('\n');
}

function missingSections(content, sections) {
  const headings = new Set(proseOnly(content).split('\n').map((line) => line.trim()));
  return sections.filter((section) => !headings.has(section));
}

function checkLocalLinks(filePath, repoRoot) {
  const content = proseOnly(fs.readFileSync(filePath, 'utf8'));
  const errors = [];
  // Inline links/images and reference definitions used by this skill pack.
  const links = [
    ...content.matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g),
    ...content.matchAll(/^ {0,3}\[[^\]\n]+\]:\s*(.+)$/gm),
  ];
  for (const match of links) {
    const raw = match[1].trim();
    const destination = raw.startsWith('<')
      ? raw.slice(1, raw.indexOf('>'))
      : raw.replace(/\s+["'][^"']*["']\s*$/, '');
    if (/^(?:https?:|mailto:|#)/i.test(destination)) continue;
    if (!destination || /^(?:[a-z][\w+.-]*:|[/\\])/i.test(destination)) {
      errors.push(`Non-relative local link: ${destination || raw}`);
      continue;
    }
    let local;
    try { local = decodeURIComponent(destination.split(/[?#]/)[0]); }
    catch { errors.push(`Invalid link encoding: ${destination}`); continue; }
    const target = path.resolve(path.dirname(filePath), local);
    const relative = path.relative(repoRoot, target);
    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      errors.push(`Link leaves repository: ${destination}`);
    } else if (!fs.existsSync(target)) {
      errors.push(`Broken local link: ${destination}`);
    }
  }
  return errors;
}

module.exports = { proseOnly, missingSections, checkLocalLinks };
