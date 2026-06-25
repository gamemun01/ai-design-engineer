// AI Design Engineer — Skill Validator (v2.1.0 schema)
//
// Schema requirements (aligned with Hermes Agent skill format):
//   YAML frontmatter (required keys):
//     - name            (kebab-case, <= 64 chars)
//     - description     (<= 1024 chars; "Use when ..." trigger pattern preferred)
//   YAML frontmatter (optional but recommended keys):
//     - version         (semver string)
//     - author          (string)
//     - license         (SPDX identifier, default MIT)
//     - stack_compat    (JSON array string, e.g. '["react@18.x"]')
//     - metadata.hermes.tags          (array)
//     - metadata.hermes.related_skills (array)
//   Body sections (all required):
//     - ## Trigger Description
//     - ## System Instruction
//     - ## Rules & Constraints
//     - ## Expected Output Format
//     - ## Example Usage (Few-Shot Example)
//     - ## Common Pitfalls          (new in v2.1.0)
//     - ## Verification Checklist    (new in v2.1.0)
//
// The original v2.0.x schema is preserved at validate-skill.legacy.js.

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const skillsDir = path.join(repoRoot, 'skills');

const requiredSections = [
  '## Trigger Description',
  '## System Instruction',
  '## Rules & Constraints',
  '## Expected Output Format',
  '## Example Usage (Few-Shot Example)',
  '## Common Pitfalls',
  '## Verification Checklist'
];

const requiredYamlKeys = ['name', 'description'];
const allowedYamlKeys = [
  'name',
  'description',
  'version',
  'author',
  'license',
  'stack_compat',
  'metadata'
];
const descriptionMaxLength = 1024;
const nameMaxLength = 64;
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // kebab-case

function findSkillFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip deprecated/ archive directory by default
      if (entry.name === 'deprecated') continue;
      findSkillFiles(filePath, fileList);
    } else if (entry.name.toLowerCase() === 'skill.md') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

/**
 * Parse a simple subset of YAML that supports:
 *   - flat key: value pairs
 *   - nested mappings via indentation (2 spaces)
 *   - list values: [a, b, c] or [ "a", "b" ]
 *   - quoted strings (single/double)
 * Returns a plain JS object.
 */
function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);

  if (lines[0]?.trim() !== '---') {
    return { error: 'SKILL.md must start with YAML frontmatter.' };
  }

  const endIdx = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (endIdx <= 1) {
    return { error: 'Missing closing YAML frontmatter delimiter.' };
  }

  // Build a tree from indented lines
  const root = {};
  const stack = [{ indent: -1, node: root, key: null }];

  for (let i = 1; i < endIdx; i++) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith('#')) continue;

    const indent = raw.match(/^ */)[0].length;
    const trimmed = raw.trim();

    // Pop stack until we find a parent with smaller indent
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (trimmed.startsWith('- ')) {
      // List item under parent
      const itemVal = unquote(trimmed.slice(2).trim());
      if (parent.key && Array.isArray(parent.node[parent.key])) {
        parent.node[parent.key].push(itemVal);
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx <= 0) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    if (!value) {
      // Could be a nested mapping or list — create child
      const child = {};
      parent.node[key] = child;
      stack.push({ indent, node: child, key: null });
    } else if (value.startsWith('[') && value.endsWith(']')) {
      // Inline list
      parent.node[key] = parseInlineList(value);
      stack[stack.length - 1].key = key;
    } else {
      parent.node[key] = unquote(value);
      stack[stack.length - 1].key = key;
    }
  }

  return { yaml: root };
}

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
  return inner.split(',').map((part) => unquote(part.trim()));
}

const skillFiles = findSkillFiles(skillsDir);
let hasErrors = false;

if (skillFiles.length === 0) {
  console.error('Error: No SKILL.md files found under the skills/ directory.');
  process.exit(1);
}

console.log(`Found ${skillFiles.length} skill(s) to validate...\n`);

for (const filePath of skillFiles) {
  const relativePath = path.relative(repoRoot, filePath);
  console.log(`Checking ${relativePath}...`);

  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(content);

  if (parsed.error) {
    console.error(`  Error: ${parsed.error}`);
    hasErrors = true;
    console.log('');
    continue;
  }

  const yaml = parsed.yaml;
  const missingYamlKeys = requiredYamlKeys.filter((key) => !yaml[key]);
  const extraYamlKeys = Object.keys(yaml).filter((key) => !allowedYamlKeys.includes(key));

  if (missingYamlKeys.length > 0) {
    console.error(`  Error: Missing required YAML keys: ${missingYamlKeys.join(', ')}`);
    hasErrors = true;
  }

  if (extraYamlKeys.length > 0) {
    console.error(`  Error: Non-standard YAML keys found: ${extraYamlKeys.join(', ')}`);
    hasErrors = true;
  }

  if (missingYamlKeys.length === 0 && extraYamlKeys.length === 0) {
    console.log(`  OK: YAML metadata is valid (name: "${yaml.name}").`);
  }

  // Description length
  if (yaml.description && yaml.description.length > descriptionMaxLength) {
    console.error(
      `  Error: description is ${yaml.description.length} chars (max ${descriptionMaxLength}).`
    );
    hasErrors = true;
  }

  // Name format
  if (yaml.name) {
    if (yaml.name.length > nameMaxLength) {
      console.error(
        `  Error: name "${yaml.name}" exceeds ${nameMaxLength} chars.`
      );
      hasErrors = true;
    } else if (!namePattern.test(yaml.name)) {
      console.error(
        `  Error: name "${yaml.name}" must be kebab-case (lowercase, hyphens only).`
      );
      hasErrors = true;
    }
  }

  // metadata.hermes.* (recommended)
  const hermes = yaml.metadata && yaml.metadata.hermes;
  if (!hermes) {
    console.log(`  Warn: metadata.hermes block missing — recommended for skill graph routing.`);
  } else {
    if (!Array.isArray(hermes.tags) || hermes.tags.length === 0) {
      console.error(`  Error: metadata.hermes.tags must be a non-empty array.`);
      hasErrors = true;
    } else {
      console.log(`  OK: metadata.hermes.tags = [${hermes.tags.join(', ')}]`);
    }
    if (!Array.isArray(hermes.related_skills) || hermes.related_skills.length === 0) {
      console.error(`  Error: metadata.hermes.related_skills must be a non-empty array.`);
      hasErrors = true;
    } else {
      console.log(`  OK: metadata.hermes.related_skills = [${hermes.related_skills.join(', ')}]`);
    }
  }

  // Required body sections
  const missingSections = requiredSections.filter((section) => !content.includes(section));
  if (missingSections.length > 0) {
    console.error('  Error: Missing required sections:');
    missingSections.forEach((section) => console.error(`    - ${section}`));
    hasErrors = true;
  } else {
    console.log(`  OK: All ${requiredSections.length} required section headings are present.`);
  }

  console.log('');
}

if (hasErrors) {
  console.error('Validation FAILED. Please fix the errors above.');
  process.exit(1);
}

console.log('Validation PASSED. All active skills are compliant with v2.1.0 schema.');
