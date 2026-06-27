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

// Windows has an ~8191-character command-line limit. Passing every file path
// as a separate argument overflows it once the repo grows past ~70-80 markdown
// files (the path list is the bulk of the command). Chunk the file list into
// batches and invoke markdownlint once per batch, aggregating the exit code so
// any failure in any batch still fails the whole run.
const MAX_BATCH_CHARS = 6000; // conservative; leaves room for binary path + flags
let failed = false;
for (let i = 0; i < mdFiles.length; ) {
  const batch = [];
  let batchLen = 0;
  while (i < mdFiles.length && batchLen + mdFiles[i].length + 1 < MAX_BATCH_CHARS) {
    batch.push(mdFiles[i]);
    batchLen += mdFiles[i].length + 1;
    i++;
  }
  // Guard against a single path longer than the budget (shouldn't happen, but
  // avoids an infinite loop if it ever does).
  if (batch.length === 0) {
    batch.push(mdFiles[i]);
    i++;
  }
  const result = spawnSync('markdownlint', ['--config', configPath, ...batch], {
    stdio: 'inherit',
    shell: true,
  });
  if (result.status !== 0) failed = true;
}

process.exit(failed ? 1 : 0);
