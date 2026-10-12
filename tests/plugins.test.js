/**
 * Plugin contract tests (Roadmap v2.0.0 — plugin marketplace).
 *
 * Verifies the registry is well-formed, every in-repo community plugin passes
 * the manifest + skill schema, plugin names don't collide with core skills or
 * each other, and a golden snapshot pins the registry contents.
 *
 * Style mirrors tests/skills.test.js (plain Node, no test framework).
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const {
  parseFrontmatter,
  fingerprintSkill,
} = require("./lib/contract-checks");

const REPO = path.resolve(__dirname, "..");
const REGISTRY = path.join(REPO, "plugins", "registry.json");
const COMMUNITY_DIR = path.join(REPO, "plugins", "community");
const GOLDEN = path.join(__dirname, "golden", "plugins.golden.json");

const UPDATE_GOLDEN = process.argv.includes("--update-golden");

let passed = 0;
let failed = 0;
const pass = (m) => {
  console.log(`  ✅ ${m}`);
  passed++;
};
const fail = (m) => {
  console.error(`  ❌ ${m}`);
  failed++;
};

console.log("Running plugin contract tests...\n");

// ---------- registry ----------

function loadRegistry() {
  return JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
}

function loadGolden() {
  if (!fs.existsSync(GOLDEN)) return null;
  return JSON.parse(fs.readFileSync(GOLDEN, "utf8"));
}

function writeGolden(data) {
  fs.writeFileSync(GOLDEN, JSON.stringify(data, null, 2) + "\n", "utf8");
}

const reg = loadRegistry();

// 1. Registry has required top-level fields
const regFields = ["version", "updated", "plugins"];
for (const f of regFields) {
  reg[f] != null ? pass(`registry has field "${f}"`) : fail(`registry missing field "${f}"`);
}
Array.isArray(reg.plugins) ? pass("registry 'plugins' is an array") : fail("registry 'plugins' is not an array");

// 2. Every registry entry has required fields + parseable source + unique name
const REQUIRED_ENTRY = ["name", "version", "description", "source", "skills"];
const seenNames = new Set();
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

for (const p of reg.plugins) {
  for (const f of REQUIRED_ENTRY) {
    p[f] != null ? pass(`${p.name}: registry entry has "${f}"`) : fail(`${p.name}: missing registry field "${f}"`);
  }
  // unique name
  if (seenNames.has(p.name)) fail(`${p.name}: duplicate name in registry`);
  else seenNames.add(p.name);
  // kebab-case name
  NAME_PATTERN.test(p.name || "")
    ? pass(`${p.name}: name is kebab-case`)
    : fail(`${p.name}: name is not kebab-case`);
  // parseable source
  const src = p.source || "";
  /^(local:|github:)/.test(src)
    ? pass(`${p.name}: source "${src}" is parseable`)
    : fail(`${p.name}: source "${src}" must start with local: or github:`);
}

console.log("");

// ---------- community plugins pass validate-plugin ----------

// 3. Every in-repo community plugin passes validate-plugin (delegates to the script)
function findPluginDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(dir, e.name))
    .filter((d) => fs.existsSync(path.join(d, "plugin.json")));
}

const pluginDirs = findPluginDirs(COMMUNITY_DIR);
console.log(`Community plugins: found ${pluginDirs.length} in-repo plugin(s)`);

for (const dir of pluginDirs) {
  const name = path.basename(dir);
  // Run the validator script for a hard pass/fail
  try {
    execSync(`node "${path.join(REPO, "scripts", "validate-plugin.js")}" "${dir}"`, {
      stdio: "pipe",
      cwd: REPO,
    });
    pass(`${name}: passes validate-plugin`);
  } catch (e) {
    fail(`${name}: validate-plugin failed\n${(e.stderr || e.stdout || "").toString().trim()}`);
  }
}

// 4. Plugin skills must not collide with core skill names
const CORE_NAMES = new Set([
  "core-system-prompt", "prompt-context-loading", "ux-decision-framework",
  "ui-generation-structured", "design-system-governance", "code-generation",
  "review-critique", "refinement-workflow", "anti-patterns-detector",
  "multi-agent-workflow",
]);
for (const dir of pluginDirs) {
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, "plugin.json"), "utf8"));
  for (const skillRel of manifest.skills || []) {
    const skillAbs = path.join(dir, skillRel);
    if (!fs.existsSync(skillAbs)) continue;
    const content = fs.readFileSync(skillAbs, "utf8");
    const parsed = parseFrontmatter(content);
    const skillName = parsed.yaml && parsed.yaml.name;
    if (skillName && CORE_NAMES.has(skillName)) {
      fail(`${manifest.name}: skill "${skillName}" collides with a core skill`);
    } else if (skillName) {
      pass(`${manifest.name}: skill "${skillName}" does not collide with core`);
    }
  }
}

console.log("");

// ---------- golden snapshot of the registry ----------

// 5. Registry fingerprint must match the golden snapshot (regression guard)
function fingerprintRegistry(r) {
  return {
    version: r.version,
    plugin_count: r.plugins.length,
    plugins: r.plugins
      .map((p) => ({
        name: p.name,
        version: p.version,
        skills_count: (p.skills || []).length,
        tags_count: (p.tags || []).length,
        source_kind: (p.source || "").split(":")[0],
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

const actualFp = fingerprintRegistry(reg);

if (UPDATE_GOLDEN) {
  writeGolden(actualFp);
  console.log(`  ♻️  regenerated ${path.relative(REPO, GOLDEN)} (${actualFp.plugin_count} plugins)`);
} else {
  const golden = loadGolden();
  if (!golden) {
    fail(`no plugins golden snapshot at ${path.relative(REPO, GOLDEN)} (run with --update-golden)`);
  } else {
    const a = JSON.stringify(actualFp);
    const g = JSON.stringify(golden);
    if (a === g) {
      pass(`plugins golden snapshot matches (${actualFp.plugin_count} plugins)`);
    } else {
      fail("plugins golden snapshot drift — registry changed without snapshot update");
      console.error("        Run `node tests/plugins.test.js --update-golden` to accept the change.");
    }
  }
}

console.log("");
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
