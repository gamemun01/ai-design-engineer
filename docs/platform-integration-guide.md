# AI Design Engineer Platform Integration

The repository supplies ten core skill folders, supporting references, and two
optional community extensions. Start with [INDEX.md](../skills/INDEX.md).
The category tree is a source pack; native discovery depends on the host's
supported locations and metadata. This repo does not register it globally.

## Use Directly with Repository Access

In a file-aware agent/editor, ask the agent to read the files in place:

```text
Read AGENTS.md first. Load skills/foundation/prompt-context-loading/SKILL.md,
then skills/foundation/core-system-prompt/SKILL.md if the baseline is not already
loaded. Select the task skill using skills/INDEX.md and load only relevant linked
references. Preserve my existing changes and use actual project commands.
Task: Review the supplied checkout UI and report evidence-backed findings.
```

For a targeted follow-up, name the file directly:

```text
Use skills/code/code-generation/SKILL.md to implement the approved alert list in
the target application's installed stack. Preserve its dependency versions and
verify loading, empty, error, partial, and keyboard behavior where applicable.
```

An IDE file mention can make the same file available. Confirm the host actually
read it; a pasted path or a link alone is not evidence that the body was loaded.

## Native Skill Discovery

### Codex Project Registration

Codex discovers project skills from `.agents/skills/`, as described in
[OpenAI's skill documentation](https://learn.chatgpt.com/docs/build-skills).
This repository includes twelve generated entrypoints there: ten core skills
and both community extensions. Their native frontmatter contains only `name`
and `description`; the canonical source keeps the repository's richer schema.

```bash
node scripts/register-codex-skills.js --dry-run
npm run skills:codex:register
npm run skills:codex:check
```

Edit the canonical skill, then regenerate its pointer when discovery metadata
changes. Body/reference changes are read from the source directly. The script
checks duplicate names and relative links, refuses redirected destinations,
and refuses to overwrite an unmanaged skill. It does not remove unrelated or
retired pointers; review obsolete entries explicitly after renaming a skill.
Keep `.agents/skills/` together with the rest of this repository; the pointers
are not standalone packages.

Use `/skills` or `$review-critique` in Codex. If an update does not appear, start
a new session or restart the host. Duplicate names in user/plugin skills remain
separate entries; use the project source path to disambiguate. Large installed
skill inventories can shorten discovery descriptions, so keep triggers clear.

Generated `agents/openai.yaml` files add readable `AIDE ...` display names,
short descriptions, and explicit invocation prompts. Edit those values in the
generator and regenerate; unmanaged UI metadata is protected from overwrites.
The [Thai Codex UI guide](codex-ui-guide.md) gives copyable prompts and a skill
selection table. Native discovery/loading is verified in the current UI chat;
[UI smoke results](codex-ui-smoke-results.md) distinguish that from failed CLI
attempts and untested visual menu behavior. The [smoke scope](codex-live-smoke.md)
records the approved inputs and requests.

### Other Hosts

Use the host's current official skill/rule documentation before configuring its
native discovery. Preserve user-configured model and invocation settings.

- Keep SKILL.md, references, and any assets/scripts together.
- Preserve repo-relative references or adapt them to a packaged layout deliberately.
  Copying a single categorized folder outside this repo can also break links to
  AGENTS.md, the matrix, and shared framework documents.
- Check allowed frontmatter fields in the host format. The repo's content release
  `version` and `metadata.hermes` conventions are not universal host requirements.
- Keep project adapters as short pointers to canonical instructions; avoid
  duplicated skill bodies that drift after updates.
- Run the [smoke scenarios](test-skill.md#behavioral-smoke-scenarios) in the actual
  host after setup. A local schema pass is not a discovery test.

The existing project scaffolder is separate from native skill installation.
Run its help for supported targets rather than assuming it installs every skill
and on-demand reference into every editor.

```bash
node scripts/create-ai-design-engineer.js --help
```

## Chat Projects and Local Model Wrappers

For a host without file access, provide the selected skill body plus the relevant
reference contents. Retain clear source labels and canonical repository paths
so updates can be reconciled. Do not load the entire pack by default.

A custom local wrapper should read the active skill and required references as
UTF-8, keep repository instructions distinct from untrusted task artifacts,
respect the host's permissions, and record tool results. Size context using the
actual tokenizer, including task files and output space. This repo supplies no
model runtime, CLI orchestration runner, or guaranteed context/latency budget.

## Verify the Source Pack

```bash
npm run validate-skill
npm run validate-plugin
npm run skills:codex:check
npm run test:skills
npm run lint
npm run check-links
```

See [Testing skills](test-skill.md) for coverage and limits. Application checks
run in the target app; skill checks run in this documentation repository.
