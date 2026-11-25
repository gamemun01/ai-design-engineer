# Testing AI Design Engineer Skills

Run from the repository root:

```bash
npm run validate-skill
npm run validate-plugin
npm run skills:codex:check
npm run test:skills
npm run lint
npm run check-links
```

Run `npm test` when validation or scaffolder tooling changes. No API key or live
LLM is needed for these deterministic checks.

## What the Checks Establish

| Check | Coverage |
|---|---|
| `validate-skill` | Core skill metadata, seven actual body headings, unique names, directory/name alignment, graph references, routers, and local links in active skills/references |
| `validate-plugin` | Community plugin manifests and declared skill contracts |
| `skills:codex:check` | All native pointers and UI metadata match the generator and canonical source metadata; relative links resolve |
| `test:skills` | Link/heading checks, safe/idempotent native registration, skill/example contracts, and structural golden snapshots |
| `lint` | Markdown quality in configured active documentation |
| `check-links` | Repository-local Markdown link targets; no remote URL availability or anchor validation |

The frontmatter validator handles the repository's simple YAML convention
(scalar fields, nested mappings, inline arrays); it is not a full YAML parser or
a guarantee of a host's native skill-format compatibility.

Golden snapshots capture structural metadata and item counts, not complete skill
behavior. After reviewing intentional contract changes, regenerate with:

```bash
node tests/skills.test.js --update-golden
npm run test:skills
```

Inspect the snapshot diff before accepting it. A regenerated snapshot does not
fix a broken contract or prove an agent follows the instructions.

## Behavioral Smoke Scenarios

Use an agent with repository access. Load the relevant skill by its path from
[INDEX.md](../skills/INDEX.md), then run the matching scenario. Supply real
artifacts and label example data as hypothetical. These scenarios are manual
acceptance checks, not recorded test results.

For Codex, register the native pointers first and keep raw execution evidence.
The [live smoke scope](codex-live-smoke.md) includes two approved requests.
The [UI results](codex-ui-smoke-results.md) record discovery/loading and bounded
outputs in the current session. These are not independent model evaluations;
the separately attempted CLI runs failed at startup before producing answers.

| Scenario | Request | Observable acceptance criteria |
|---|---|---|
| Context discovery | “Load context for this docs repo; optional PROJECT.md is absent and package scripts exist.” | Reads AGENTS.md first, preserves existing diffs, reports optional gaps, selects actual checks, does not invent an app build |
| UX planning | “Design mobile checkout; research and conversion baseline are unknown.” | Distinguishes facts/assumptions, asks only essential questions, plans applicable states, does not invent research or measured conversion rates |
| UI generation | “Use our existing brand and produce only a v0 prompt from the supplied UX brief.” | Preserves the brand/target, uses canonical eight layers, consumes project tokens, avoids unrelated builder prompts |
| Modern implementation | “Implement a list in an existing React 19/App Router/Tailwind v4 project; no migration requested.” | Inspects installed versions, reuses imports, maps tokens correctly, separates server/client behavior and reports actual tests |
| Recovery | “An async payment submission fails; preserve the form and prevent duplicate orders.” | Handles the event failure explicitly, keeps values, uses native button activation once, explains server idempotency requirements |
| Limited review | “Review only this screenshot; no running app or source is available.” | Gives evidence-backed visual findings; keyboard, security, and performance remain NOT VERIFIED; no production PASS |
| Security exception | “Audit a component with an inline @design-exception comment and a typed untrusted API payload.” | Inspects authorization for the exception and runtime payload validation; comment/types alone do not waive defects |
| Orchestration | “Plan a multi-agent pipeline in an environment without agent tools.” | Labels the plan as a plan or executes roles sequentially; does not invent adapters, scripts, agent completion, or permission to deploy |
| Documentation refinement | “Fix a broken skill reference and run available checks.” | Makes a targeted fix, uses documentation checks, avoids invented UI scores and unnecessary approval loops |

For code-generating workflows, verify output in the target application's type,
build, behavior, keyboard, and responsive checks. This repository's validators
cannot establish generated application correctness or WCAG conformance.
