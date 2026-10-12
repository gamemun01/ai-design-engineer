# Contributing to AI Design Engineer

First off, thank you for considering contributing! 🎉 You are helping make AI-assisted design engineering better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How can I contribute?

### 🐛 Reporting bugs

- Check the [issue tracker](https://github.com/gamemun01/ai-design-engineer/issues) first
- Include: framework version, AI tool used, skill triggered, expected vs actual output
- Use the bug report template

### 💡 Suggesting enhancements

- Open an issue with the label `enhancement`
- Describe the use case, not just the feature
- Include examples

### 📝 Improving documentation

- Typos, broken links, unclear phrasing — open a PR directly
- New guides / examples — open an issue first to align on scope

### 🧩 Adding a new skill

Skills live in `skills/<skill-name>/SKILL.md`. A good skill:

1. **Has a clear trigger** — when should the AI use it?
2. **Has explicit inputs** — what does the AI need from the user?
3. **Has a defined output** — what should the AI produce?
4. **Fits the framework** — which phase(s) does it serve?
5. **Stays under 2,000 tokens** — keep it focused

Use the skill template:

```markdown
# Skill Name

## When to use
[trigger conditions]

## Inputs
- ...

## Output
[exact format spec]

## Rules
- ...

## Anti-patterns
- ❌ ...

## Example
[concrete example]
```

### 🌐 Adding an example

Examples live in `examples/NN-name/`. Each must:

1. Be reproducible (include a `HOW_TO_RUN.md`)
2. Have a `REVIEW.md` with the 0-120 scorecard
3. Use only skills that exist in this repo
4. Use MIT-licensed placeholder content

### 🔌 Adding tool adapters

Tool adapters live in `scripts/create-ai-design-engineer.js` (the `generateToolConfig` function). To add a new tool:

1. Add the tool name to `VALID_TOOLS`
2. Add a `case` in `generateToolConfig`
3. Update the README
4. Add a test in `tests/`

### 🧩 Publishing a plugin

Plugins are community skill packs that extend the core 10 skills without forking the framework. They live under `plugins/community/` (in-repo) or in an external GitHub repo, and are listed in the static [`plugins/registry.json`](plugins/registry.json). There is no hosted backend — see [`plugins/README.md`](plugins/README.md).

To publish a plugin:

1. **Create the structure**:

   ```text
   my-plugin/
   ├── plugin.json              # manifest (see plugins/README.md for the schema)
   └── skills/
       └── my-skill/
           └── SKILL.md          # follows the v2.1.0 schema
   ```

2. **Validate locally**:

   ```bash
   node scripts/validate-plugin.js ./my-plugin
   ```

   This checks the manifest fields, that every declared `SKILL.md` exists and passes the v2.1.0 schema, that the name is kebab-case + unique, and that no skill name collides with the core 10.

3. **Add an entry** to [`plugins/registry.json`](plugins/registry.json) (or place the plugin under `plugins/community/` for an in-repo example).

4. **Open a PR**. A maintainer will verify the plugin passes `npm run validate-plugin` and `npm run test:plugins`.

A good plugin:

- **Has a clear scope** — one capability beyond the core skills (e.g. deep a11y audit, motion design).
- **Declares `related_core_skills`** in its manifest so the skill graph stays navigable.
- **Respects the same constraints** — tokens, the 5-state contract, WCAG 2.1 AA, no magic numbers.
- **Ships MIT-licensed** content.

See [`plugins/community/a11y-audit-pack`](plugins/community/a11y-audit-pack) and [`plugins/community/motion-design-pack`](plugins/community/motion-design-pack) as references.

## Pull request process

1. **Fork** the repo and create your branch from `dev/feature`
2. **Follow** the existing structure (look at neighboring files)
3. **Test** your changes: `npm run lint && npm run validate-skill`
4. **Update** the CHANGELOG under `[Unreleased]`
5. **Open a PR** with a clear title and description
6. **Wait** for review — we'll get to it within a week

### Commit message format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(skills): add a11y audit skill
fix(scripts): handle empty target dir in scaffolder
docs(readme): clarify install steps
chore: bump version to 1.2.0
```

## Development setup

```bash
git clone https://github.com/gamemun01/ai-design-engineer.git
cd ai-design-engineer
npm install
npm run lint
```

## Style guide

- **Markdown:** follow Google markdown style + markdownlint config
- **Code:** ES modules, Node 18+
- **File names:** kebab-case
- **YAML keys:** lower-kebab-case
- **No emoji** in code or file names (emoji OK in docs for visual breaks)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](License).
