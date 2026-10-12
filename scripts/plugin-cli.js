#!/usr/bin/env node
/**
 * plugin-cli.js — AI Design Engineer community plugin CLI.
 *
 * A backend-free plugin manager. The "registry" is a static JSON file
 * (plugins/registry.json) in this repo. This CLI reads it and either copies
 * (local plugins) or clones (github plugins) into a target directory.
 *
 * Usage:
 *   node scripts/plugin-cli.js list
 *   node scripts/plugin-cli.js search <query>
 *   node scripts/plugin-cli.js info <name>
 *   node scripts/plugin-cli.js install <name> [target-dir]
 *   node scripts/plugin-cli.js validate [plugin-dir]
 *   node scripts/plugin-cli.js -h | --help
 *
 * Design: mirrors the plain-Node, no-deps style of the other scripts. The only
 * external process is `git clone` for github: sources, which is documented.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { execSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");
const registryPath = path.join(repoRoot, "plugins", "registry.json");

// ---------- registry ----------

function loadRegistry() {
  if (!fs.existsSync(registryPath)) {
    console.error(`Error: registry not found at ${path.relative(repoRoot, registryPath)}.`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(registryPath, "utf8"));
  } catch (e) {
    console.error(`Error: registry is invalid JSON: ${e.message}`);
    process.exit(1);
  }
}

function findPlugin(name) {
  const reg = loadRegistry();
  return reg.plugins.find((p) => p.name === name);
}

// ---------- helpers ----------

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}

function parseSource(source) {
  // "local:path/under/repo" or "github:owner/repo"
  if (!source) return null;
  const idx = source.indexOf(":");
  if (idx === -1) return null;
  return { kind: source.slice(0, idx), value: source.slice(idx + 1) };
}

// ---------- commands ----------

function cmdList() {
  const reg = loadRegistry();
  console.log(`AI Design Engineer plugins (${reg.plugins.length}):\n`);
  for (const p of reg.plugins) {
    console.log(`  ${p.name.padEnd(22)} ${p.version.padEnd(8)} ${p.description.split(".")[0]}.`);
    if (p.tags && p.tags.length) {
      console.log(`  ${"".padEnd(22)} tags: ${p.tags.join(", ")}`);
    }
  }
  console.log(`\nRegistry version ${reg.version}, updated ${reg.updated}.`);
}

function cmdSearch(query) {
  if (!query) {
    console.error("Error: search requires a query. See --help.");
    process.exit(1);
  }
  const q = query.toLowerCase();
  const reg = loadRegistry();
  const matches = reg.plugins.filter((p) => {
    const haystack = [p.name, p.description, (p.tags || []).join(" ")].join(" ").toLowerCase();
    return haystack.includes(q);
  });
  if (matches.length === 0) {
    console.log(`No plugins matched "${query}".`);
    return;
  }
  console.log(`Found ${matches.length} plugin(s) matching "${query}":\n`);
  for (const p of matches) {
    console.log(`  ${p.name.padEnd(22)} ${p.description.split(".")[0]}.`);
  }
}

function cmdInfo(name) {
  const p = findPlugin(name);
  if (!p) {
    console.error(`Error: plugin "${name}" not found in registry. Run 'list'.`);
    process.exit(1);
  }
  console.log(`Name:        ${p.name}`);
  console.log(`Version:     ${p.version}`);
  console.log(`Author:      ${p.author}`);
  console.log(`License:     ${p.license}`);
  console.log(`Source:      ${p.source}`);
  console.log(`Homepage:    ${p.homepage}`);
  console.log(`Tags:        ${(p.tags || []).join(", ")}`);
  console.log(`Skills:      ${(p.skills || []).join(", ")}`);
  console.log(`\nDescription:\n  ${p.description}`);
}

function cmdInstall(name, targetArg) {
  const p = findPlugin(name);
  if (!p) {
    console.error(`Error: plugin "${name}" not found in registry. Run 'list'.`);
    process.exit(1);
  }
  const targetDir = path.resolve(targetArg || process.cwd());
  const dest = path.join(targetDir, "plugins", p.name);

  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    console.error(`Error: destination already exists and is not empty: ${dest}`);
    process.exit(1);
  }

  const src = parseSource(p.source);
  if (!src) {
    console.error(`Error: plugin "${name}" has unparseable source "${p.source}".`);
    process.exit(1);
  }

  if (src.kind === "local") {
    const localPath = path.resolve(repoRoot, src.value);
    if (!fs.existsSync(localPath)) {
      console.error(`Error: local source not found: ${src.value}`);
      process.exit(1);
    }
    copyDirSync(localPath, dest);
    console.log(`Installed ${p.name} (local copy) -> ${dest}`);
  } else if (src.kind === "github") {
    // Clone into a temp dir, then copy the plugin folder out.
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "aide-plugin-"));
    try {
      const url = `https://github.com/${src.value}.git`;
      console.log(`Cloning ${url} ...`);
      execSync(`git clone --depth 1 "${url}" "${tmp}"`, { stdio: "inherit" });
      // The repo root is assumed to be the plugin root (contains plugin.json).
      if (!fs.existsSync(path.join(tmp, "plugin.json"))) {
        console.error(`Error: cloned repo has no plugin.json at its root.`);
        process.exit(1);
      }
      copyDirSync(tmp, dest);
      console.log(`Installed ${p.name} (from github) -> ${dest}`);
    } catch (e) {
      console.error(`Error: git clone failed: ${e.message}`);
      process.exit(1);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  } else {
    console.error(`Error: unsupported source kind "${src.kind}" (use local: or github:).`);
    process.exit(1);
  }

  console.log(`\nNext: load the skill(s) in ${path.join(dest, "skills")} from your AI tool.`);
}

function cmdValidate(pluginDirArg) {
  // Delegate to the dedicated validator script so the rules live in one place.
  const validator = path.join(repoRoot, "scripts", "validate-plugin.js");
  const arg = pluginDirArg
    ? `"${path.resolve(pluginDirArg)}"`
    : "";
  try {
    execSync(`node "${validator}" ${arg}`, { stdio: "inherit", cwd: repoRoot });
  } catch (e) {
    process.exit(e.status || 1);
  }
}

function printHelp() {
  console.log(`plugin-cli — manage AI Design Engineer community plugins

Usage:
  node scripts/plugin-cli.js list                    List all plugins in the registry
  node scripts/plugin-cli.js search <query>          Search by name/description/tag
  node scripts/plugin-cli.js info <name>             Show details for one plugin
  node scripts/plugin-cli.js install <name> [dir]    Install a plugin (copy or git clone)
  node scripts/plugin-cli.js validate [plugin-dir]   Validate plugin(s) against the schema
  node scripts/plugin-cli.js -h | --help             Show this help

The registry is a static file at plugins/registry.json — no backend.
Local plugins are copied; github: plugins are shallow-cloned then copied.`);
}

// ---------- arg parsing ----------

const [, , command, ...rest] = process.argv;

if (!command || command === "-h" || command === "--help") {
  printHelp();
  process.exit(0);
}

switch (command) {
  case "list":
    cmdList();
    break;
  case "search":
    cmdSearch(rest[0]);
    break;
  case "info":
    if (!rest[0]) {
      console.error("Error: info requires a plugin name. See --help.");
      process.exit(1);
    }
    cmdInfo(rest[0]);
    break;
  case "install":
    if (!rest[0]) {
      console.error("Error: install requires a plugin name. See --help.");
      process.exit(1);
    }
    cmdInstall(rest[0], rest[1]);
    break;
  case "validate":
    cmdValidate(rest[0]);
    break;
  default:
    console.error(`Error: unknown command "${command}". See --help.`);
    process.exit(1);
}
