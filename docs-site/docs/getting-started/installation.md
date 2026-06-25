# Installation

There are three ways to install AI Design Engineer. Pick the one that fits your workflow.

## Option 1: `npx` scaffolder (recommended)

The fastest way to start. Creates a new project with the framework, a tool adapter of your choice, and a working folder structure.

```bash
npx create-ai-design-engineer my-project
```

You'll be prompted for:

- **AI tool** — Claude Code, Cursor, Windsurf, VSCode, or all
- **Phases** — include all, or pick specific ones to keep it lean

The scaffolder will:

1. Create a new folder `my-project/`
2. Copy the chosen phases (01–08) and skills
3. Generate a tool-specific config file (e.g. `.claude/`, `.cursor/rules`)
4. Write a starter `README.md`
5. Initialize a git repo

### CLI flags

```bash
# Skip prompts
npx create-ai-design-engineer my-project --tool cursor -y

# Only the code and review phases (lighter context)
npx create-ai-design-engineer my-project --phases code,review

# All tools at once
npx create-ai-design-engineer my-project --tool all -y
```

| Flag | Description |
|---|---|
| `--tool <name>` | `claude-code` \| `cursor` \| `windsurf` \| `vscode` \| `all` |
| `--phases <list>` | Comma-separated phase slugs, or `all` |
| `--no-install` | Skip dependency install |
| `--no-git` | Skip git init |
| `-y`, `--yes` | Skip interactive prompts |
| `-h`, `--help` | Show help |

## Option 2: Git clone (explore the framework itself)

```bash
git clone https://github.com/gamemun01/ai-design-engineer.git
cd ai-design-engineer
npm install
```

Use this if you want to:

- Read the full skill definitions
- Modify the framework
- Contribute back
- Run validation scripts (`npm run validate-skill`)

## Option 3: Manual copy (no install at all)

Download the files you need from GitHub and drop them into your project. The framework is just Markdown — no runtime dependency.

For example, to add just the `ux-decision-framework` skill to an existing project:

```bash
# From the framework repo
cp -r skills/ux-decision-framework /path/to/your-project/.claude/skills/
```

## ✅ Verify

After installation, check that the structure looks right:

```
my-project/
├── 01-foundation/
├── 02-prompting-patterns/
├── 03-ux-thinking/
├── 04-design-system/
├── 05-ui-generation/
├── 06-ai-to-code/
├── 07-review-critique/
├── 08-production-patterns/
├── skills/
│   ├── core-system-prompt/
│   ├── ux-decision-framework/
│   └── ... (10 skills total)
├── assets/             (architecture diagram, hero banner)
├── README.md
└── .claude/            (or .cursor/, .windsurf/, .vscode/)
```

## 🆘 Troubleshooting

### `npx create-ai-design-engineer` is not found

Make sure you're using npm ≥ 7:

```bash
npm install -g npm@latest
```

Or run with `npx --yes create-ai-design-engineer my-project`.

### The scaffolder asks for git but git isn't installed

Install git from <https://git-scm.com>, or use `--no-git` to skip.

### The tool adapter doesn't work with my IDE

See [Tool adapters](tools.md) for a per-IDE walkthrough, or open an issue.

## Next steps

- [Quick start](quickstart.md) — build your first page in 10 minutes
- [Tool adapters](tools.md) — Claude Code / Cursor / Windsurf / VSCode
- [8 phases](../framework/phases.md) — understand the full pipeline
