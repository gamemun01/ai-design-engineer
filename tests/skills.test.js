/**
 * Skill + Example Test Runner (Roadmap v1.3.0 — "Skill test runner with golden outputs").
 *
 * Two layers of deterministic, CI-friendly checks (no LLM, no API key):
 *   1. Contract tests — schema/structure that validate-skill.js does not cover
 *      deeply (related_skills cross-refs, pitfalls/checklist item counts,
 *      example folder completeness, REVIEW score >= gate).
 *   2. Golden snapshots — fingerprints of skills & examples stored as JSON.
 *      A silent change to a REVIEW score or skill structure will fail here
 *      until `--update-golden` regenerates the snapshot.
 *
 * Usage:
 *   node tests/skills.test.js                # run all checks
 *   node tests/skills.test.js --update-golden # regenerate golden snapshots
 *
 * Mirrors the plain-Node, no-test-framework style of tests/scaffolder.test.js.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const {
  parseFrontmatter,
  checkSkill,
  fingerprintSkill,
  checkExample,
  fingerprintExample,
} = require("./lib/contract-checks");

const REPO = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(REPO, "skills");
const EXAMPLES_DIR = path.join(REPO, "examples");
const GOLDEN_DIR = path.join(__dirname, "golden");
const SKILLS_GOLDEN = path.join(GOLDEN_DIR, "skills.golden.json");
const EXAMPLES_GOLDEN = path.join(GOLDEN_DIR, "examples.golden.json");

const UPDATE_GOLDEN = process.argv.includes("--update-golden");

// ---------- discovery ----------

function findSkillFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "deprecated") continue; // archive, not active
    if (entry.name === "plugins") continue; // community plugins have their own tests
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findSkillFiles(filePath, fileList);
    } else if (entry.name.toLowerCase() === "skill.md") {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function findExampleDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(dir, e.name))
    .filter((d) => fs.existsSync(path.join(d, "README.md"))); // a real example has a README
}

// ---------- golden snapshot helpers ----------

function loadGolden(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeGolden(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/**
 * Compare two values, returning a list of diff paths for primitives/objects/arrays.
 * Only deep enough for our flat fingerprint objects.
 */
function diffValues(actual, expected, prefix) {
  const diffs = [];
  const keys = new Set([
    ...Object.keys(actual || {}),
    ...Object.keys(expected || {}),
  ]);
  for (const key of keys) {
    const a = actual && actual[key];
    const e = expected && expected[key];
    if (Array.isArray(a) || Array.isArray(e)) {
      const aArr = Array.isArray(a) ? a : [];
      const eArr = Array.isArray(e) ? e : [];
      if (aArr.length !== eArr.length) {
        diffs.push(`${prefix}.${key}: length ${aArr.length} !== ${eArr.length}`);
      }
    } else if (typeof a === "object" && typeof e === "object" && a && e) {
      diffs.push(...diffValues(a, e, `${prefix}.${key}`));
    } else if (a !== e) {
      diffs.push(`${prefix}.${key}: ${JSON.stringify(a)} !== ${JSON.stringify(e)}`);
    }
  }
  return diffs;
}

// ---------- runner ----------

let passed = 0;
let failed = 0;
const fail = (msg) => {
  console.error(`  ❌ ${msg}`);
  failed++;
};
const pass = (msg) => {
  console.log(`  ✅ ${msg}`);
  passed++;
};

console.log("Running skill + example contract tests...\n");

// ===== Skills =====
const skillFiles = findSkillFiles(SKILLS_DIR);
console.log(`Skills: found ${skillFiles.length} active SKILL.md file(s)`);

// First pass: collect known skill names for cross-ref checking
const skillNames = new Set();
for (const file of skillFiles) {
  const content = fs.readFileSync(file, "utf8");
  const parsed = parseFrontmatter(content);
  if (parsed.yaml && parsed.yaml.name) skillNames.add(parsed.yaml.name);
}

// Contract checks per skill
for (const file of skillFiles) {
  const rel = path.relative(REPO, file);
  for (const r of checkSkill(file, skillNames)) {
    // rewrite the leading path to the relative file for clarity
    const msg = r.message.replace(/^SKILL\.md:/, `${rel}:`);
    if (r.ok) pass(msg);
    else fail(msg);
  }
}

// Skill golden snapshot
const actualSkills = {};
for (const file of skillFiles) {
  const fp = fingerprintSkill(file);
  if (fp.name) actualSkills[fp.name] = fp;
}
const skillsGolden = loadGolden(SKILLS_GOLDEN);

if (UPDATE_GOLDEN) {
  writeGolden(SKILLS_GOLDEN, actualSkills);
  console.log(`  ♻️  regenerated ${path.relative(REPO, SKILLS_GOLDEN)} (${Object.keys(actualSkills).length} skills)`);
} else if (skillsGolden) {
  const diffs = diffValues(actualSkills, skillsGolden, "skills");
  if (diffs.length === 0) {
    pass(`skills golden snapshot matches (${Object.keys(actualSkills).length} skills)`);
  } else {
    fail(`skills golden snapshot drift (${diffs.length} difference(s)):`);
    diffs.slice(0, 10).forEach((d) => console.error(`        ${d}`));
    console.error("        Run `node tests/skills.test.js --update-golden` to accept the change.");
  }
} else {
  fail(`no skills golden snapshot at ${path.relative(REPO, SKILLS_GOLDEN)} (run with --update-golden)`);
}

console.log("");

// ===== Examples =====
const exampleDirs = findExampleDirs(EXAMPLES_DIR);
console.log(`Examples: found ${exampleDirs.length} example folder(s)`);

for (const dir of exampleDirs) {
  for (const r of checkExample(dir)) {
    if (r.ok) pass(r.message);
    else fail(r.message);
  }
}

// Example golden snapshot
const actualExamples = {};
for (const dir of exampleDirs) {
  const fp = fingerprintExample(dir);
  actualExamples[fp.name] = fp;
}
const examplesGolden = loadGolden(EXAMPLES_GOLDEN);

if (UPDATE_GOLDEN) {
  writeGolden(EXAMPLES_GOLDEN, actualExamples);
  console.log(`  ♻️  regenerated ${path.relative(REPO, EXAMPLES_GOLDEN)} (${Object.keys(actualExamples).length} examples)`);
} else if (examplesGolden) {
  const diffs = diffValues(actualExamples, examplesGolden, "examples");
  if (diffs.length === 0) {
    pass(`examples golden snapshot matches (${Object.keys(actualExamples).length} examples)`);
  } else {
    fail(`examples golden snapshot drift (${diffs.length} difference(s)):`);
    diffs.slice(0, 10).forEach((d) => console.error(`        ${d}`));
    console.error("        Run `node tests/skills.test.js --update-golden` to accept the change.");
  }
} else {
  fail(`no examples golden snapshot at ${path.relative(REPO, EXAMPLES_GOLDEN)} (run with --update-golden)`);
}

console.log("");
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
