const fs = require('fs');
const path = require('path');

const skillPath = path.resolve(__dirname, '../skills/ai-design-engineer.md');
const content = fs.readFileSync(skillPath, 'utf8');

const requiredSections = [
  '## 🎯 Target Triggers & Keywords',
  '## 💻 System Instruction',
  '## 📜 Rules & Constraints',
  '## 📋 Expected Output Format',
  '## 💡 Example Usage (Few-Shot Example)'
];

const missing = requiredSections.filter((section) => !content.includes(section));

console.log(`Checking ${skillPath}`);
if (missing.length === 0) {
  console.log('✅ Skill structure looks good. All required sections are present.');
  process.exit(0);
}

console.log('⚠️ Missing required sections:');
missing.forEach((section) => console.log(`- ${section}`));
process.exit(1);
