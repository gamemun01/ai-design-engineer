# Golden Snapshots

Golden snapshots are deterministic fingerprints of the **skills** and **examples**
in this repo. They are part of the **Skill Test Runner** (Roadmap v1.3.0).

## What they guard against

The contract checks in `tests/skills.test.js` verify *structure* (every skill has
its sections, every example has its folders, every `related_skills` resolves).
The snapshots add a second layer: they pin the **values** that should not drift
silently.

| Snapshot | Pins | Catches |
|---|---|---|
| `skills.golden.json` | name, version, # tags, # related_skills, # pitfalls, # checklist items | A skill losing a pitfall item, a version bump nobody noticed, a related_skills entry dropped |
| `examples.golden.json` | name, before score, after score, delta | A REVIEW score edited without intent, an example regressing below the 95/120 ship gate |
| `plugins.golden.json` | plugin_count, name, version, skills_count, tags_count, source_kind | A community plugin added/removed from the registry, a skill dropped from a pack, a version bump nobody noticed |

This is **not** LLM golden output. This repo is a framework/docs repo with no LLM
runtime, so the snapshots cover static structure only — deterministic and
CI-friendly.

## Files

```text
tests/golden/
├── README.md                # this file
├── skills.golden.json       # fingerprints of all 10 active skills
├── examples.golden.json     # fingerprints of all 6 examples
└── plugins.golden.json      # fingerprints of all community plugins
```

## When a snapshot test fails

A failure means something structural changed. Two cases:

1. **Unintended change (regression)** — fix the code so the snapshot matches again.
2. **Intended change** (you added a skill, bumped a version, rewrote a REVIEW) —
   regenerate the snapshot:

   ```bash
   node tests/skills.test.js --update-golden    # skills + examples snapshots
   node tests/plugins.test.js --update-golden   # plugins snapshot
   ```

   Review the diff in git, then commit the updated snapshot alongside the change
   that motivated it. Never commit a `--update-golden` run you don't understand.

## Run the tests

```bash
node tests/skills.test.js              # contract + snapshot checks
npm run test:skills                    # same, via package script
```
