const fs = require('fs');
const path = require('path');

const skillsDir = path.resolve(__dirname, '../skills');

// Recursively find all SKILL.md files under the skills/ directory
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

const skillFiles = findSkillFiles(skillsDir);
let hasErrors = false;

const requiredSections = [
  '## Target Triggers & Keywords',
  '## System Instruction',
  '## Rules & Constraints',
  '## Expected Output Format'
];

if (skillFiles.length === 0) {
  console.error('❌ Error: No SKILL.md files found under the skills/ directory.');
  process.exit(1);
}

console.log(`Found ${skillFiles.length} skill(s) to validate...\n`);

skillFiles.forEach((filePath) => {
  const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
  console.log(`Checking ${relativePath}...`);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Validate YAML Frontmatter
  const lines = content.split(/\r?\n/);
  let yamlLines = [];
  let hasYaml = false;

  let startIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '---') {
      startIdx = i;
      break;
    }
    // Allow empty lines or HTML comments before the frontmatter starts
    if (line !== '' && !line.startsWith('<!--') && !line.endsWith('-->') && !line.startsWith('-->') && !line.includes('-->')) {
      break;
    }
  }

  if (startIdx !== -1) {
    let endIdx = -1;
    for (let i = startIdx + 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        endIdx = i;
        break;
      }
    }
    if (endIdx > startIdx + 1) {
      yamlLines = lines.slice(startIdx + 1, endIdx);
      hasYaml = true;
    }
  }

  if (!hasYaml) {
    console.error(`  ❌ Error: Missing YAML frontmatter block starting and ending with "---"`);
    hasErrors = true;
    return;
  }

  // Parse basic YAML key-value pairs
  const yaml = {};
  yamlLines.forEach((line) => {
    if (!line.trim() || line.trim().startsWith('#')) return;
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
      }
      yaml[key] = val;
    }
  });

  const requiredYamlKeys = ['name', 'description', 'version'];
  const missingYamlKeys = requiredYamlKeys.filter((key) => !yaml[key]);

  if (missingYamlKeys.length > 0) {
    console.error(`  ❌ Error: Missing required YAML metadata keys: ${missingYamlKeys.join(', ')}`);
    hasErrors = true;
  } else {
    console.log(`  ✅ YAML metadata is valid (Name: "${yaml.name}", Version: "${yaml.version}")`);
  }

  // 2. Validate Required Sections
  const missingSections = requiredSections.filter((section) => !content.includes(section));

  if (missingSections.length > 0) {
    console.error(`  ❌ Error: Missing required sections:`);
    missingSections.forEach((section) => console.error(`    - ${section}`));
    hasErrors = true;
  } else {
    console.log('  ✅ All required section headings are present.');
  }
  console.log('');
});

if (hasErrors) {
  console.error('❌ Validation FAILED. Please fix the errors above.');
  process.exit(1);
} else {
  console.log('🎉 Validation PASSED. All active skills are fully compliant.');
  process.exit(0);
}

