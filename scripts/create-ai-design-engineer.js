#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * create-ai-design-engineer.js
 *
 * Interactive scaffolder that copies the AI Design Engineer framework into a
 * target directory, with optional Claude Code / Cursor / Windsurf adapter.
 *
 * Usage:
 *   npx create-ai-design-engineer my-app
 *   npx create-ai-design-engineer my-app --tool cursor --no-install
 *
 * Run from anywhere — no install needed.
 */

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const REPO_URL = "https://github.com/gamemun01/ai-design-engineer";
const VALID_TOOLS = ["claude-code", "cursor", "windsurf", "vscode", "all"];
const VALID_PHASES = ["foundation", "ux", "prompt", "design-system", "ui", "code", "review", "production", "all"];

function parseArgs(argv) {
  const args = argv.slice(2);
  const out = {
    target: null,
    tool: null,
    phases: null,
    install: true,
    git: true,
    help: false,
    yes: false,
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--tool") out.tool = args[++i];
    else if (a === "--phases") out.phases = args[++i].split(",");
    else if (a === "--no-install") out.install = false;
    else if (a === "--no-git") out.git = false;
    else if (a === "-y" || a === "--yes") out.yes = true;
    else if (a === "-h" || a === "--help") out.help = true;
    else if (!a.startsWith("--")) out.target = a;
  }
  return out;
}

function printHelp() {
  console.log(`create-ai-design-engineer — scaffold a new project

Usage:
  npx create-ai-design-engineer <project-name> [options]

Options:
  --tool <name>         AI tool adapter: claude-code | cursor | windsurf | vscode | all
  --phases <list>       Comma-separated phases to include (default: all)
  --no-install          Skip dependency install
  --no-git              Skip git init
  -y, --yes             Skip interactive prompts
  -h, --help            Show this help

Examples:
  npx create-ai-design-engineer my-saas
  npx create-ai-design-engineer my-app --tool cursor --phases code,review
  npx create-ai-design-engineer site --tool all -y

Docs: ${REPO_URL}
`);
}

function prompt(rl, question, defaultValue) {
  return new Promise((resolve) => {
    rl.question(`${question} ${defaultValue ? `[${defaultValue}]` : ""}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function copyDirSync(src, dest, opts = {}) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (opts.filter && opts.filter(entry.name)) continue;
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, opts);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function detectToolFromEnv() {
  if (process.env.CLAUDE_CODE) return "claude-code";
  if (process.env.CURSOR_TRACE_ID) return "cursor";
  return null;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const cwd = process.cwd();
  const target = args.target || "ai-design-engineer-app";
  const targetPath = path.resolve(cwd, target);

  if (fs.existsSync(targetPath) && fs.readdirSync(targetPath).length > 0) {
    console.error(`\n❌ Target directory "${target}" is not empty.\n`);
    process.exit(1);
  }

  const tool =
    args.tool ||
    detectToolFromEnv() ||
    (args.yes ? "claude-code" : await askTool());

  const phases =
    args.phases ||
    (args.yes ? ["all"] : await askPhases());

  console.log("\n📦 AI Design Engineer scaffolder\n");
  console.log(`  Target:   ${targetPath}`);
  console.log(`  Tool:     ${tool}`);
  console.log(`  Phases:   ${phases.join(", ")}`);
  console.log(`  Install:  ${args.install ? "yes" : "no"}`);
  console.log(`  Git init: ${args.git ? "yes" : "no"}\n`);

  // Locate the framework root (where this script lives, then up to find skills/ and phases)
  const frameworkRoot = path.resolve(__dirname, "..");

  if (!fs.existsSync(path.join(frameworkRoot, "skills"))) {
    console.error("❌ Could not find skills/ directory. Make sure you run this from the framework repo or via npx.");
    process.exit(1);
  }

  // 1. Create target structure
  fs.mkdirSync(targetPath, { recursive: true });

  // 2. Copy phase folders
  for (const p of phases) {
    if (p === "all") {
      for (let i = 1; i <= 8; i++) {
        const num = String(i).padStart(2, "0");
        const folder = path.join(frameworkRoot, `${num}-${getPhaseSlug(i)}`);
        if (fs.existsSync(folder)) copyDirSync(folder, path.join(targetPath, `${num}-${getPhaseSlug(i)}`));
      }
    } else {
      const idx = getPhaseIndex(p);
      if (idx) {
        const folder = path.join(frameworkRoot, `${idx}-${getPhaseSlug(idx)}`);
        if (fs.existsSync(folder)) copyDirSync(folder, path.join(targetPath, `${idx}-${getPhaseSlug(idx)}`));
      }
    }
  }

  // 3. Copy skills
  if (phases.includes("all") || phases.some((p) => SKILL_PHASES.has(p))) {
    copyDirSync(path.join(frameworkRoot, "skills"), path.join(targetPath, "skills"));
  }

  // 4. Copy assets
  if (fs.existsSync(path.join(frameworkRoot, "assets"))) {
    copyDirSync(path.join(frameworkRoot, "assets"), path.join(targetPath, "assets"));
  }

  // 5. Generate tool-specific config
  generateToolConfig(targetPath, tool);

  // 6. Generate project README
  const readme = generateReadme(target, tool, phases);
  fs.writeFileSync(path.join(targetPath, "README.md"), readme);

  // 7. Git init
  if (args.git) {
    try {
      require("node:child_process").execSync("git init", { cwd: targetPath, stdio: "ignore" });
    } catch (_) {
      console.warn("⚠️  git init failed (is git installed?)");
    }
  }

  console.log(`\n✅ Done! Your AI Design Engineer project is ready at ${targetPath}\n`);
  console.log("Next steps:");
  console.log(`  cd ${target}`);
  if (tool === "claude-code") console.log("  claude   # open Claude Code in this folder");
  else if (tool === "cursor") console.log("  cursor . # open in Cursor");
  else if (tool === "windsurf") console.log("  windsurf .");
  console.log("  Then start a chat: \"Build me a hero section using skill 05\"\n");
  console.log(`📚 Docs: ${REPO_URL}`);
}

const PHASE_SLUGS = {
  1: "foundation",
  2: "prompting-patterns",
  3: "ux-thinking",
  4: "design-system",
  5: "ui-generation",
  6: "ai-to-code",
  7: "review-critique",
  8: "production-patterns",
};
const PHASE_INDEX = {
  foundation: 1,
  prompt: 2,
  "prompting-patterns": 2,
  ux: 3,
  "ux-thinking": 3,
  "design-system": 4,
  ui: 5,
  "ui-generation": 5,
  code: 6,
  "ai-to-code": 6,
  review: 7,
  "review-critique": 7,
  production: 8,
  "production-patterns": 8,
};
const SKILL_PHASES = new Set(["foundation", "ux", "prompt", "design-system", "ui", "code", "review", "production", "all"]);

function getPhaseSlug(i) {
  return PHASE_SLUGS[i];
}
function getPhaseIndex(p) {
  const idx = PHASE_INDEX[p];
  return idx ? String(idx).padStart(2, "0") + "-" + (PHASE_SLUGS[idx]) : null;
}

async function askTool() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ans = await prompt(rl, "Which AI tool? (claude-code / cursor / windsurf / vscode / all)", "claude-code");
  rl.close();
  return VALID_TOOLS.includes(ans) ? ans : "claude-code";
}

async function askPhases() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ans = await prompt(rl, "Which phases to include? (comma-separated or 'all')", "all");
  rl.close();
  return ans.split(",").map((s) => s.trim());
}

function generateToolConfig(targetPath, tool) {
  if (tool === "claude-code" || tool === "all") {
    const claudeDir = path.join(targetPath, ".claude");
    fs.mkdirSync(claudeDir, { recursive: true });
    fs.writeFileSync(
      path.join(claudeDir, "settings.json"),
      JSON.stringify(
        {
          enabledMcpjsonServers: [],
          permissions: { allow: ["Read(**/*.md)", "Edit(**/*.md)"] },
        },
        null,
        2
      )
    );
  }
  if (tool === "cursor" || tool === "all") {
    fs.mkdirSync(path.join(targetPath, ".cursor"), { recursive: true });
    fs.writeFileSync(
      path.join(targetPath, ".cursor", "rules"),
      `# AI Design Engineer (Cursor)

Use the skills in ./skills/ to design and generate UI.
Load skills/core-system-prompt/SKILL.md first, then load relevant skills per task.

See: https://github.com/gamemun01/ai-design-engineer
`
    );
  }
  if (tool === "windsurf" || tool === "all") {
    fs.mkdirSync(path.join(targetPath, ".windsurf"), { recursive: true });
    fs.writeFileSync(
      path.join(targetPath, ".windsurf", "rules"),
      `# AI Design Engineer (Windsurf)

Load ./skills/core-system-prompt/SKILL.md and follow it as the project contract.
Activate ./skills/* skills on demand based on user intent.

Reference: https://github.com/gamemun01/ai-design-engineer
`
    );
  }
  if (tool === "vscode" || tool === "all") {
    fs.mkdirSync(path.join(targetPath, ".vscode"), { recursive: true });
    fs.writeFileSync(
      path.join(targetPath, ".vscode", "settings.json"),
      JSON.stringify(
        {
          "files.associations": { "*.md": "markdown" },
          "github.copilot.chat.customInstructions": "Follow ./skills/core-system-prompt/SKILL.md as the system contract.",
        },
        null,
        2
      )
    );
  }
}

function generateReadme(projectName, tool, phases) {
  return `# ${projectName}

> Scaffolded with [AI Design Engineer](https://github.com/gamemun01/ai-design-engineer) — the open-source framework for design + engineering with AI.

## What's included

- **Tool config:** ${tool}
- **Phases:** ${phases.join(", ")}

## Quick start

1. Open this folder in your AI tool of choice
2. Load the core system prompt: \`skills/core-system-prompt/SKILL.md\`
3. Start a new chat and describe what you want to build

## Available skills

- \`skills/prompt-context-loading/\` — load project context
- \`skills/core-system-prompt/\` — base role + rules
- \`skills/ux-decision-framework/\` — UX thinking
- \`skills/ui-generation-structured/\` — UI variations
- \`skills/design-system-governance/\` — tokens & contracts
- \`skills/code-generation/\` — code templates
- \`skills/review-critique/\` — 0-120 scorecard
- \`skills/refinement-workflow/\` — iteration loop
- \`skills/anti-patterns-detector/\` — block bad output
- \`skills/multi-agent-workflow/\` — coordinate multiple agents

See [\`skills/SKILL_MATRIX.md\`](./skills/SKILL_MATRIX.md) for token costs and which skills to load when.

## Documentation

Full docs: <https://gamemun01.github.io/ai-design-engineer/>

---

Generated by [create-ai-design-engineer](https://github.com/gamemun01/ai-design-engineer) · MIT License
`;
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
