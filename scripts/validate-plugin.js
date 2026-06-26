// AI Design Engineer — Plugin Validator
//
// Validates community plugins: the manifest (plugin.json) and every SKILL.md it
// declares. Reuses the same v2.1.0 skill schema rules as validate-skill.js and
// the YAML parser from tests/lib/contract-checks.js so behavior stays consistent.
//
// Usage:
//   node scripts/validate-plugin.js                       # validate all plugins/community/*
//   node scripts/validate-plugin.js <plugin-dir>          # validate one plugin

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { parseFrontmatter } = require("../tests/lib/contract-checks");

const repoRoot = path.resolve(__dirname, "..");
const communityDir = path.join(repoRoot, "plugins", "community");

// Same required sections as validate-skill.js (kept in sync intentionally)
const REQUIRED_SKILL_SECTIONS = [
  "## Trigger Description",
  "## System Instruction",
  "## Rules & Constraints",
  "## Expected Output Format",
  "## Example Usage (Few-Shot Example)",
  "## Common Pitfalls",
  "## Verification Checklist",
];

const REQUIRED_MANIFEST_FIELDS = [
  "name",
  "version",
  "description",
  "author",
  "license",
  "skills",
];

const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // kebab-case

// Core skill names — a plugin skill must not collide with these.
const CORE_SKILL_NAMES = new Set([
  "core-system-prompt",
  "prompt-context-loading",
  "ux-decision-framework",
  "ui-generation-structured",
  "design-system-governance",
  "code-generation",
  "review-critique",
  "refinement-workflow",
  "anti-patterns-detector",
  "multi-agent-workflow",
]);

let hasErrors = false;

function error(msg) {
  console.error(`  Error: ${msg}`);
  hasErrors = true;
}

/**
 * Validate a single plugin directory.
 * @param {string} pluginDir Absolute path to the plugin root (contains plugin.json)
 * @param {string[]} allNames Accumulator of plugin names seen (for uniqueness)
 */
function validatePlugin(pluginDir, allNames) {
  const rel = path.relative(repoRoot, pluginDir) || pluginDir;
  console.log(`Checking plugin ${rel}...`);

  const manifestPath = path.join(pluginDir, "plugin.json");
  if (!fs.existsSync(manifestPath)) {
    error(`missing plugin.json at ${rel}`);
    console.log("");
    return;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (e) {
    error(`plugin.json is not valid JSON: ${e.message}`);
    console.log("");
    return;
  }

  // 1. Required manifest fields
  const missing = REQUIRED_MANIFEST_FIELDS.filter((f) => manifest[f] == null);
  if (missing.length > 0) {
    error(`plugin.json missing required fields: ${missing.join(", ")}`);
  }

  // 2. Name format + uniqueness + core collision
  if (manifest.name) {
    if (!NAME_PATTERN.test(manifest.name)) {
      error(`plugin name "${manifest.name}" must be kebab-case.`);
    }
    if (allNames.includes(manifest.name)) {
      error(`plugin name "${manifest.name}" is not unique (already seen).`);
    }
    allNames.push(manifest.name);
  }

  // 3. skills[] must be a non-empty array of existing SKILL.md files
  const skills = manifest.skills;
  if (!Array.isArray(skills) || skills.length === 0) {
    error("plugin.json 'skills' must be a non-empty array of SKILL.md paths.");
  } else {
    for (const skillPath of skills) {
      const abs = path.join(pluginDir, skillPath);
      if (!fs.existsSync(abs)) {
        error(`declared skill not found: ${skillPath}`);
        continue;
      }
      validateSkillFile(abs, manifest.name, rel);
    }
  }

  // 4. source format (local: or github:)
  if (manifest.source) {
    if (!/^(local:|github:)/.test(manifest.source)) {
      error(
        `source "${manifest.source}" must start with "local:" or "github:" (e.g. "github:owner/repo").`
      );
    }
  }

  console.log("");
}

function validateSkillFile(skillPath, pluginName, pluginRel) {
  const content = fs.readFileSync(skillPath, "utf8");
  const parsed = parseFrontmatter(content);

  if (parsed.error) {
    error(`[${pluginName}] ${path.relative(repoRoot, skillPath)}: ${parsed.error}`);
    return;
  }
  const yaml = parsed.yaml;

  // Core-skill name collision check
  if (yaml.name && CORE_SKILL_NAMES.has(yaml.name)) {
    error(
      `[${pluginName}] skill name "${yaml.name}" collides with a core skill — rename it.`
    );
  }

  // Required frontmatter (name + description minimum, mirroring validate-skill.js)
  if (!yaml.name) error(`[${pluginName}] ${path.relative(repoRoot, skillPath)}: missing 'name' in frontmatter.`);
  if (!yaml.description) error(`[${pluginName}] ${path.relative(repoRoot, skillPath)}: missing 'description' in frontmatter.`);

  // Required body sections (v2.1.0 schema)
  const missingSections = REQUIRED_SKILL_SECTIONS.filter((s) => !content.includes(s));
  if (missingSections.length > 0) {
    error(`[${pluginName}] ${path.relative(repoRoot, skillPath)}: missing sections: ${missingSections.join(", ")}`);
  } else {
    console.log(`  OK: skill ${yaml.name || path.basename(path.dirname(skillPath))} has all 7 required sections.`);
  }
}

// ---------- discover + run ----------

function findPluginDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(dir, e.name))
    .filter((d) => fs.existsSync(path.join(d, "plugin.json")));
}

function main() {
  const arg = process.argv[2];

  let pluginDirs;
  if (arg && arg !== "--help" && arg !== "-h") {
    // Validate a single plugin (absolute or repo-relative path)
    const abs = path.isAbsolute(arg) ? arg : path.resolve(repoRoot, arg);
    if (!fs.existsSync(abs)) {
      console.error(`Error: plugin directory not found: ${arg}`);
      process.exit(1);
    }
    pluginDirs = [abs];
    console.log(`Validating 1 plugin...\n`);
  } else {
    pluginDirs = findPluginDirs(communityDir);
    if (pluginDirs.length === 0) {
      console.error(`Error: no plugins found under ${path.relative(repoRoot, communityDir)}.`);
      process.exit(1);
    }
    console.log(`Found ${pluginDirs.length} plugin(s) under plugins/community/...\n`);
  }

  const allNames = [];
  for (const dir of pluginDirs) validatePlugin(dir, allNames);

  if (hasErrors) {
    console.error("Validation FAILED. Fix the errors above.");
    process.exit(1);
  }
  console.log("Validation PASSED. All plugins are compliant with the plugin schema.");
}

// Honor -h/--help without dragging in a dependency
if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log(`validate-plugin — validate community plugins

Usage:
  node scripts/validate-plugin.js                 # validate all plugins/community/*
  node scripts/validate-plugin.js <plugin-dir>    # validate one plugin

Checks: required manifest fields, declared SKILL.md paths exist and pass the
v2.1.0 schema, name is kebab-case + unique + not colliding with core skills.`);
  process.exit(0);
}

main();
