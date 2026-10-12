# Plugin Marketplace

The AI Design Engineer plugin marketplace lets the community extend the core 10
skills with new capabilities — without forking the whole framework. A **plugin**
is one or more `SKILL.md` files bundled with a `plugin.json` manifest.

> This is a **static, backend-free** marketplace: the registry is a JSON file in
> this repo, and the CLI copies or clones plugins to your project. There is no
> hosted API, database, or authentication. Install community plugins at your own
> risk — review the source before installing.

## Browse

```bash
# List every plugin in the registry
node scripts/plugin-cli.js list

# Search by name or tag
node scripts/plugin-cli.js search accessibility

# Show details for one plugin
node scripts/plugin-cli.js info a11y-audit-pack
```

## Install

```bash
# Install a plugin into the current project (copies skills/ + manifest)
node scripts/plugin-cli.js install a11y-audit-pack

# Install into a specific directory
node scripts/plugin-cli.js install a11y-audit-pack ./my-project
```

For **local** plugins (in this repo under `plugins/community/`), the CLI copies
files. For **external** plugins (`source: "github:owner/repo"`), the CLI clones
the repo into a temp dir and copies the plugin folder.

After install, load the plugin's `SKILL.md` files in your AI tool exactly like
the core skills.

## Publish a plugin

1. **Create the plugin structure** in a repo (or under `plugins/community/` for
   in-repo plugins):

   ```text
   my-plugin/
   ├── plugin.json              # manifest (see schema below)
   └── skills/
       └── my-skill/
           └── SKILL.md          # follows the v2.1.0 schema
   ```

2. **Write `plugin.json`** (required fields):

   ```json
   {
     "name": "my-plugin",
     "version": "1.0.0",
     "description": "What this plugin adds.",
     "author": "your-handle",
     "license": "MIT",
     "skills": ["skills/my-skill/SKILL.md"],
     "homepage": "https://github.com/you/my-plugin",
     "source": "github:you/my-plugin",
     "tags": ["your", "tags"]
   }
   ```

3. **Validate locally**:

   ```bash
   node scripts/validate-plugin.js ./my-plugin
   ```

4. **Add an entry** to [`plugins/registry.json`](./registry.json) and open a PR.
   A maintainer will review that the plugin's skills pass the v2.1.0 schema and
   do not conflict with core skill names.

## Validate

```bash
# Validate every plugin in plugins/community/
npm run validate-plugin

# Validate a specific plugin
node scripts/validate-plugin.js plugins/community/a11y-audit-pack
```

Checks: required manifest fields, every `skills[]` path exists and is a valid
`SKILL.md`, name is kebab-case and unique, no core-skill name collisions.

## Trust and safety

- The registry is curated by PR review — a maintainer must approve every entry.
- There is **no signing or trust model** beyond review. Before installing a
  plugin from an unfamiliar author, read its `SKILL.md` and any code it ships.
- Plugins run as prompt content in your AI tool; they do not execute code on
  your machine unless you act on their output.

## Files

```text
plugins/
├── README.md                  # this file
├── registry.json              # the static marketplace index
└── community/                 # in-repo example plugins
    ├── a11y-audit-pack/       # example #1: deep accessibility audit
    └── motion-design-pack/    # example #2: motion/micro-interaction design
```

## Related

- Core skills: [`skills/`](../skills/)
- Skill schema: [`skills/README.md`](../skills/README.md) (v2.1.0)
- Plugin CLI: [`scripts/plugin-cli.js`](../scripts/plugin-cli.js)
- Plugin validator: [`scripts/validate-plugin.js`](../scripts/validate-plugin.js)
