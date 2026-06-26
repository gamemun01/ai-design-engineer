/**
 * Reusable contract assertions for the Skill Test Runner (v1.3.0).
 *
 * Design: pure functions that read files and return an array of result objects
 * `{ ok: boolean, message: string }`. The runner (tests/skills.test.js) owns all
 * console output and exit codes, so these checks stay side-effect-free and easy
 * to compose.
 *
 * What this covers that validate-skill.js does NOT:
 *   - related_skills cross-reference integrity (graph corruption)
 *   - counting Common Pitfalls (>=5) and Verification Checklist (>=5) items
 *       (the documented "5 minimum" rule the validator only checks as a heading)
 *   - no absolute file:/// paths in the skill body
 *   - example folder completeness + REVIEW score parsing
 *
 * Mirrors the plain-Node, no-test-framework style of tests/scaffolder.test.js.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

// ---------- YAML frontmatter parsing (same subset as validate-skill.js) ----------

function unquote(v) {
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

function parseInlineList(s) {
  const inner = s.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(",").map((part) => unquote(part.trim()));
}

/**
 * Parse the YAML frontmatter block of a SKILL.md. Returns { yaml } or { error }.
 * Intentionally limited to the subset the skills actually use.
 */
function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0] && lines[0].trim() !== "---") {
    return { error: "SKILL.md must start with YAML frontmatter." };
  }
  const endIdx = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (endIdx <= 1) {
    return { error: "Missing closing YAML frontmatter delimiter." };
  }

  const root = {};
  const stack = [{ indent: -1, node: root, key: null }];

  for (let i = 1; i < endIdx; i++) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.match(/^ */)[0].length;
    const trimmed = raw.trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1];

    if (trimmed.startsWith("- ")) {
      const itemVal = unquote(trimmed.slice(2).trim());
      if (parent.key && Array.isArray(parent.node[parent.key])) {
        parent.node[parent.key].push(itemVal);
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx <= 0) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();

    if (!value) {
      const child = {};
      parent.node[key] = child;
      stack.push({ indent, node: child, key: null });
    } else if (value.startsWith("[") && value.endsWith("]")) {
      parent.node[key] = parseInlineList(value);
      stack[stack.length - 1].key = key;
    } else {
      parent.node[key] = unquote(value);
      stack[stack.length - 1].key = key;
    }
  }
  return { yaml: root };
}

// ---------- Section extraction ----------

/** Return the body content under a `## Heading`, up to the next `## `. */
function extractSection(content, heading) {
  const startIdx = content.indexOf(heading);
  if (startIdx === -1) return null;
  const afterHeading = content.indexOf("\n", startIdx) + 1;
  // Next top-level (## ) heading after this one
  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;
  return content.slice(afterHeading, endIdx).trim();
}

/** Count markdown list items (`- ` or `1.`) in a section body. */
function countListItems(sectionBody) {
  if (!sectionBody) return 0;
  const matches = sectionBody.match(/^[\t ]*(?:- |\d+\.\s)/gm);
  return matches ? matches.length : 0;
}

// ---------- Skill contract checks ----------

/**
 * Inspect a single skill file and return an array of results.
 * @param {string} filePath Absolute path to SKILL.md
 * @param {Set<string>} knownSkillNames Set of all skill `name`s in the repo
 */
function checkSkill(filePath, knownSkillNames) {
  const results = [];
  const rel = filePath; // caller formats relative path for messages
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(content);

  if (parsed.error) {
    results.push({ ok: false, message: `${rel}: ${parsed.error}` });
    return results;
  }
  const yaml = parsed.yaml;
  const name = yaml.name;

  // 1. Cross-ref integrity: every related_skill must exist in the repo
  const related = (yaml.metadata && yaml.metadata.hermes && yaml.metadata.hermes.related_skills) || [];
  const dangling = related.filter((r) => !knownSkillNames.has(r));
  if (dangling.length === 0) {
    results.push({
      ok: true,
      message: `${name}: all ${related.length} related_skills resolve`,
    });
  } else {
    results.push({
      ok: false,
      message: `${name}: dangling related_skills -> [${dangling.join(", ")}]`,
    });
  }

  // 2. Example section is non-empty
  const exampleSection = extractSection(content, "## Example Usage (Few-Shot Example)");
  if (exampleSection && exampleSection.length > 40) {
    results.push({ ok: true, message: `${name}: Example Usage has content` });
  } else {
    results.push({ ok: false, message: `${name}: Example Usage section missing or empty` });
  }

  // 3. Pitfalls >= 5 items (documented rule, not enforced by validate-skill.js)
  const pitfalls = countListItems(extractSection(content, "## Common Pitfalls"));
  if (pitfalls >= 5) {
    results.push({ ok: true, message: `${name}: Common Pitfalls has ${pitfalls} items (>=5)` });
  } else {
    results.push({
      ok: false,
      message: `${name}: Common Pitfalls has ${pitfalls} items (needs >=5)`,
    });
  }

  // 4. Verification Checklist >= 5 items
  const checklist = countListItems(extractSection(content, "## Verification Checklist"));
  if (checklist >= 5) {
    results.push({
      ok: true,
      message: `${name}: Verification Checklist has ${checklist} items (>=5)`,
    });
  } else {
    results.push({
      ok: false,
      message: `${name}: Verification Checklist has ${checklist} items (needs >=5)`,
    });
  }

  // 5. No absolute file:/// paths used as actual links in the body. We skip
  //    meta-mentions: occurrences inside HTML comment blocks (<!-- -->) or
  //    backtick-quoted spans (e.g. a checklist teaching users to avoid
  //    `file:///`). What remains should be a real absolute link.
  let inComment = false;
  const fileUrlLines = [];
  content.split(/\r?\n/).forEach((line, idx) => {
    if (/<!--/.test(line)) inComment = true;
    const metaQuoted = /`[^`]*file:\/\/\/[^`]*`/.test(line);
    const insideBlock = inComment;
    if (/<!--.*-->/.test(line) && !/<!--[^>]*$/.test(line)) inComment = false;
    if (/file:\/\/\//.test(line) && !metaQuoted && !insideBlock) {
      fileUrlLines.push(idx + 1);
    }
  });
  if (fileUrlLines.length === 0) {
    results.push({ ok: true, message: `${name}: no absolute file:/// paths` });
  } else {
    results.push({
      ok: false,
      message: `${name}: absolute file:/// path on line(s) ${fileUrlLines.join(", ")} (use repo-relative links)`,
    });
  }

  return results;
}

/** Build a compact structural fingerprint of a skill for golden snapshots. */
function fingerprintSkill(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(content);
  const yaml = parsed.yaml || {};
  const hermes = (yaml.metadata && yaml.metadata.hermes) || {};
  return {
    name: yaml.name,
    version: yaml.version || null,
    related_count: (hermes.related_skills || []).length,
    tags_count: (hermes.tags || []).length,
    pitfalls_count: countListItems(extractSection(content, "## Common Pitfalls")),
    checklist_count: countListItems(extractSection(content, "## Verification Checklist")),
  };
}

// ---------- Example contract checks ----------

const REQUIRED_PROMPTS = 3; // an example needs at least this many prompt files

/**
 * Check an example folder for structural completeness and return results.
 * @param {string} exampleDir Absolute path to examples/<name>/
 */
function checkExample(exampleDir) {
  const results = [];
  const name = path.basename(exampleDir);

  const exists = (rel) => fs.existsSync(path.join(exampleDir, rel));

  // README
  results.push(
    exists("README.md")
      ? { ok: true, message: `${name}: README.md present` }
      : { ok: false, message: `${name}: missing README.md` }
  );

  // prompts/ with >= REQUIRED_PROMPTS files
  const promptsDir = path.join(exampleDir, "prompts");
  let promptCount = 0;
  if (fs.existsSync(promptsDir)) {
    promptCount = fs
      .readdirSync(promptsDir)
      .filter((f) => f.endsWith(".md")).length;
  }
  results.push(
    promptCount >= REQUIRED_PROMPTS
      ? { ok: true, message: `${name}: prompts/ has ${promptCount} files (>=${REQUIRED_PROMPTS})` }
      : { ok: false, message: `${name}: prompts/ has ${promptCount} files (needs >=${REQUIRED_PROMPTS})` }
  );

  // before/ with a component + NOTES.md
  const beforeOk =
    exists("before/NOTES.md") &&
    fs.existsSync(path.join(exampleDir, "before", "components")) &&
    fs
      .readdirSync(path.join(exampleDir, "before", "components"))
      .some((f) => f.endsWith(".before.tsx") || f.endsWith(".tsx"));
  results.push(
    beforeOk
      ? { ok: true, message: `${name}: before/ has component + NOTES.md` }
      : { ok: false, message: `${name}: before/ incomplete (need component + NOTES.md)` }
  );

  // after/ with a component + REVIEW.md
  const afterComponentsDir = path.join(exampleDir, "after", "components");
  const afterOk =
    exists("after/REVIEW.md") &&
    fs.existsSync(afterComponentsDir) &&
    fs.readdirSync(afterComponentsDir).some((f) => f.endsWith(".tsx"));
  results.push(
    afterOk
      ? { ok: true, message: `${name}: after/ has component + REVIEW.md` }
      : { ok: false, message: `${name}: after/ incomplete (need component + REVIEW.md)` }
  );

  // REVIEW.md must parse to an "after" total >= 95 (the ship gate)
  const reviewPath = path.join(exampleDir, "after", "REVIEW.md");
  if (fs.existsSync(reviewPath)) {
    const scores = parseReviewScores(fs.readFileSync(reviewPath, "utf8"));
    const afterTotal = scores.afterTotal;
    if (typeof afterTotal === "number") {
      results.push(
        afterTotal >= 95
          ? { ok: true, message: `${name}: after score ${afterTotal}/120 passes gate (>=95)` }
          : { ok: false, message: `${name}: after score ${afterTotal}/120 below gate (95)` }
      );
    } else {
      results.push({ ok: false, message: `${name}: could not parse after total from REVIEW.md` });
    }
  }

  return results;
}

/**
 * Parse before/after total scores from a REVIEW.md.
 * Looks for patterns like "107/120" near a "PASS" verdict and a "before" score.
 * Returns { beforeTotal, afterTotal } (values may be null if not found).
 *
 * Heuristic: the "after" total is the highest score seen near a PASS/Ship line,
 * and the "before" total is the lower score in a comparison table.
 */
function parseReviewScores(reviewMd) {
  const out = { beforeTotal: null, afterTotal: null };
  // Match "NNN / 120" or "NNN/120"
  const scoreRe = /(\d{1,3})\s*\/\s*120/g;
  const found = [];
  let m;
  while ((m = scoreRe.exec(reviewMd)) !== null) {
    found.push(parseInt(m[1], 10));
  }
  if (found.length === 0) return out;

  // The "after" total: the largest score (the passing one). The "before":
  // the smallest (the failing one), if there's a comparison.
  out.afterTotal = Math.max(...found);
  out.beforeTotal = found.length > 1 ? Math.min(...found) : null;
  return out;
}

/** Build a compact fingerprint of an example for golden snapshots. */
function fingerprintExample(exampleDir) {
  const name = path.basename(exampleDir);
  const reviewPath = path.join(exampleDir, "after", "REVIEW.md");
  const scores = fs.existsSync(reviewPath)
    ? parseReviewScores(fs.readFileSync(reviewPath, "utf8"))
    : { beforeTotal: null, afterTotal: null };
  return {
    name,
    before_score: scores.beforeTotal,
    after_score: scores.afterTotal,
    delta: scores.beforeTotal != null && scores.afterTotal != null
      ? scores.afterTotal - scores.beforeTotal
      : null,
  };
}

module.exports = {
  parseFrontmatter,
  extractSection,
  countListItems,
  checkSkill,
  fingerprintSkill,
  checkExample,
  parseReviewScores,
  fingerprintExample,
};
