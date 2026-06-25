const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const skillsDir = path.join(repoRoot, 'skills');

const requiredSections = [
  '## Trigger Description',
  '## System Instruction',
  '## Rules & Constraints',
  '## Expected Output Format',
  '## Example Usage (Few-Shot Example)'
];

// Original keys commented out to preserve history (Rule #1)
// const requiredYamlKeys = ['name', 'description'];
// const allowedYamlKeys = ['name', 'description', 'version', 'stack_compat', 'last_reviewed'];
const requiredYamlKeys = ['name', 'description', 'version', 'stack_compat', 'last_reviewed'];
const allowedYamlKeys = ['name', 'description', 'version', 'stack_compat', 'last_reviewed'];

function findSkillFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findSkillFiles(filePath, fileList);
    } else if (file.toLowerCase() === 'skill.md') {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);

  if (lines[0]?.trim() !== '---') {
    return { error: 'SKILL.md must start with YAML frontmatter.' };
  }

  const endIdx = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (endIdx <= 1) {
    return { error: 'Missing closing YAML frontmatter delimiter.' };
  }

  const yaml = {};
  const yamlLines = lines.slice(1, endIdx);
  for (const line of yamlLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx <= 0) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    yaml[key] = value;
  }

  return { yaml };
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
    console.error('  Standard SKILL.md frontmatter should contain only standard keys.');
    hasErrors = true;
  }

  if (missingYamlKeys.length === 0 && extraYamlKeys.length === 0) {
    console.log(`  OK: YAML metadata is valid (name: "${yaml.name}").`);
  }

  const missingSections = requiredSections.filter((section) => !content.includes(section));
  if (missingSections.length > 0) {
    console.error('  Error: Missing required sections:');
    missingSections.forEach((section) => console.error(`    - ${section}`));
    hasErrors = true;
  } else {
    console.log('  OK: All required section headings are present.');
    
    // Check if each required section actually has content (non-empty body)
    for (const section of requiredSections) {
      const idx = content.indexOf(section);
      if (idx === -1) continue;
      
      // Find the start of the next required section in the content
      let nextIdx = content.length;
      for (const otherSection of requiredSections) {
        if (otherSection === section) continue;
        const otherIdx = content.indexOf(otherSection);
        if (otherIdx > idx && otherIdx < nextIdx) {
          nextIdx = otherIdx;
        }
      }
      
      const sectionBody = content.slice(idx + section.length, nextIdx);
      const trimmedBody = sectionBody.trim();
      if (trimmedBody.length < 20) {
        console.error(`  Error: Section "${section}" lacks substantial content body (length: ${trimmedBody.length}).`);
        hasErrors = true;
      }
    }
  }

  console.log('');
}

if (hasErrors) {
  console.error('Validation FAILED. Please fix the errors above.');
  process.exit(1);
}

console.log('Validation PASSED. All active skills are compliant.');
