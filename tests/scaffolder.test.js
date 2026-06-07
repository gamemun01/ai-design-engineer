/**
 * Minimal smoke tests for the scaffolder.
 * Run with: node tests/scaffolder.test.js
 *
 * These are not full unit tests — they verify the script loads,
 * parses args, and exposes the expected helpers.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const os = require("node:os");

const REPO = path.resolve(__dirname, "..");
const SCRIPT = path.join(REPO, "scripts", "create-ai-design-engineer.js");

let passed = 0;
let failed = 0;
const log = (ok, msg) => {
  if (ok) {
    console.log(`  ✅ ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ ${msg}`);
    failed++;
  }
};

console.log("Running scaffolder tests...\n");

// Test 1: --help works
try {
  const out = execSync(`node "${SCRIPT}" --help`, { encoding: "utf-8" });
  log(
    out.includes("create-ai-design-engineer") && out.includes("--tool"),
    "--help prints usage and lists --tool"
  );
} catch (e) {
  log(false, `--help failed: ${e.message}`);
}

// Test 2: -h flag works (alias)
try {
  const out = execSync(`node "${SCRIPT}" -h`, { encoding: "utf-8" });
  log(out.includes("create-ai-design-engineer"), "-h alias works");
} catch (e) {
  log(false, `-h alias failed: ${e.message}`);
}

// Test 3: scaffolder creates a project with --yes
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "aide-test-"));
try {
  execSync(`node "${SCRIPT}" test-app --tool claude-code --no-git -y`, {
    cwd: tmpDir,
    encoding: "utf-8",
  });
  const target = path.join(tmpDir, "test-app");
  log(fs.existsSync(target), "creates target directory");

  const readme = path.join(target, "README.md");
  log(fs.existsSync(readme), "creates README.md");

  const claudeDir = path.join(target, ".claude");
  log(fs.existsSync(claudeDir), "creates .claude/ for claude-code adapter");

  const skills = path.join(target, "skills");
  log(
    fs.existsSync(skills) && fs.readdirSync(skills).length >= 10,
    "copies skills/ folder (>= 10 skills)"
  );
} catch (e) {
  log(false, `scaffolder execution failed: ${e.message}`);
  if (e.stdout) console.log("STDOUT:", e.stdout.toString());
  if (e.stderr) console.log("STDERR:", e.stderr.toString());
} finally {
  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

// Test 4: refuses to overwrite non-empty dir
const tmpDir2 = fs.mkdtempSync(path.join(os.tmpdir(), "aide-test-"));
try {
  const target = path.join(tmpDir2, "nonempty");
  fs.mkdirSync(target);
  fs.writeFileSync(path.join(target, "existing.txt"), "do not delete me");
  execSync(`node "${SCRIPT}" nonempty --no-git -y`, {
    cwd: tmpDir2,
    encoding: "utf-8",
  });
  log(false, "should have failed on non-empty dir");
} catch (e) {
  log(
    e.status === 1 && fs.existsSync(path.join(tmpDir2, "nonempty", "existing.txt")),
    "refuses to scaffold into non-empty directory"
  );
} finally {
  fs.rmSync(tmpDir2, { recursive: true, force: true });
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
