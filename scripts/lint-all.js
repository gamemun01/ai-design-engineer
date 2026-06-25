#!/usr/bin/env node
/**
 * Lint all Markdown files in the repository using markdownlint-cli.
 *
 * Why a wrapper: a quoted glob argument to markdownlint works on POSIX
 * shells but is silently stripped by npm on Windows, so markdownlint
 * receives zero files and only prints its usage text. This wrapper
 * discovers files with Node (cross-platform) and passes an explicit
 * file list to markdownlint, so `npm run lint` behaves the same
 * everywhere. Mirrors the discovery approach in check-links.js.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.antigravitycli',
  '.kilo',
  '.claude',
  'deprecated',
]);

function findMdFiles(dir, fileList = []) {
  for (const file of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(file)) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const repoRoot = path.resolve(__dirname, '..');
const mdFiles = findMdFiles(repoRoot);

if (mdFiles.length === 0) {
  console.error('No markdown files found to lint.');
  process.exit(1);
}

console.log(`Linting ${mdFiles.length} markdown file(s)...`);

const configPath = path.join(repoRoot, '.markdownlint.json');
const args = ['--config', configPath, ...mdFiles];
const result = spawnSync('markdownlint', args, {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status || 0);
