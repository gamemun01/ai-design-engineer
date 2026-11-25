# Studio validation — 2026-10-16

Scope: Skill Studio product 1.2.0, existing skill content 2.2.0 and the new
Project Design Advisor 1.0.0.
Checks run on Windows x64. The system Node was 24.11.1; the portable Windows
runtime is the official Node 24.22.0. Evidence below separates actual local
execution from simulated provider behavior and unverified deployment.

## Current Project Design Advisor integration

The user supplied the Thai advisor and requested its use on 2026-10-16.
It is now a canonical core skill, a native pointer/UI metadata entry, and the
Project Design stage with four explicit task starters. The unpublished 1.2.0
candidate archives were rebuilt to include thirteen skills and the advisor's
CC BY 4.0 license. Other existing skill versions/licenses remain unchanged.

| Check | Result |
|---|---|
| npm test | PASS: 132 framework/tooling/skill/plugin checks |
| npm run studio:test | PASS: typecheck + build + 21 app tests |
| New integration regressions | PASS: starter/reference prompts, all 13 selected skills, old UX workspace and reference-limit recovery |
| npm run validate-skill / validate-plugin | PASS: 11 core skills / 2 plugins |
| npm run skills:codex:check | PASS: 13 pointers and UI metadata entries |
| npm run lint / check-links | PASS: 165 Markdown files |
| Refreshed Node-required ZIP | PASS: 16 manifest files, 13 skills, extracted startup and UI 200 |
| Refreshed Windows x64 ZIP | PASS: 18 manifest files, 13 skills, bundled runtime startup and UI 200 |

Actual browser checks: stage/library show thirteen skills; all four starters
change the task; readiness/handoff include the Gates reference; CR includes
both CR and readiness references. Existing synthetic context and two prior
results remain. The advisor's canonical content opens from library search.
The copy action reports success; the browser tool's clipboard read returned
empty, so clipboard payload readback is not independently verified in this run.
Screenshots inspected at 1440×1000 and 390×844 show the starter panel and
internally scrolling stage track. Temporary viewport overrides were reset.

No actual model was called for this addition. Skill behavioral quality,
generated readiness judgments, native picker discovery in a new Codex chat,
and upstream source revisions remain NOT VERIFIED. Repository validation and
integration tests prove content structure/loading, not those outcomes.
The standalone Codex quick validator could not run because bundled Python lacks
PyYAML; the repository's required canonical schema validator passed instead.

## Initial twelve-skill build evidence

| Check | Result |
|---|---|
| npm test | PASS: 127 existing framework/tooling/skill/plugin checks |
| npm run studio:test | PASS: typecheck + Vite build + 16 app HTTP/workspace/package tests |
| npm run validate-skill / validate-plugin | PASS: 10 core skills and 2 plugins |
| npm run skills:codex:check | PASS: 12 native pointers |
| npm run lint / check-links | PASS: 158 Markdown files |
| npm audit (root and apps/studio) | PASS: 0 reported vulnerabilities in each |
| Local Postman simulation | PASS: real Studio API, both protocols; request events inspected |
| Node-required ZIP verification | PASS: 15 manifest files, 12 skills, standalone startup, UI 200 |
| Windows x64 ZIP verification | PASS: 17 manifest files, bundled Node 24.22.0 startup, UI 200 |
| YAML parsing / git diff --check | PASS: workflows/simulation files parse; no whitespace errors |

ZIP verification checks the outer SHA-256 and every manifest file, extracts into
a unique temporary folder outside the repository, starts the extracted server,
and reads its catalog and UI. No repository dependencies are used at runtime.
The Windows runtime archive was checked against nodejs.org SHASUMS256.txt.

Root dev-tool audit fixes use targeted transitive overrides, followed by the
full existing test suite and Markdown lint. The older system Node emitted an
ini engine warning during installation; release CI and the portable app use
Node 24.22.0. No system-wide Node installation was changed.

## Browser evidence

Actual Codex in-app browser, synthetic project/task data only:

- Workflow inputs and copy-to-clipboard produced a portable prompt containing
  canonical skill instructions and the entered task/context.
- Library search found the accessibility skill and showed the empty-search state.
- Saved a local fixture connection, loaded its model list, sent both protocols,
  and rendered the clearly labeled synthetic Markdown answer.
- Provider 503 preserved inputs/previous results; cancellation returned usable
  controls. During a slow request, import was disabled and task fields read-only.
- Blank project name survived reload with task intact. Preview tabs responded
  to arrow keys. Workspace JSON export/import retained work without credentials.
- Desktop 1440×1000 and mobile 390×844 captures; document width did not exceed
  viewport width. Temporary viewport override was reset afterward.
- No browser error/warning log entries were observed in the inspected run.

Screenshots are synthetic examples, not evidence of a real LLM's output quality.
This is a focused keyboard/responsive check, not a full screen-reader/WCAG audit.

## Independent review

The Impeccable finish reviewer initially returned `fix` for history sent in API
requests, backup size inconsistency and import/generation mixing. Regressions
now cover prompt-only requests, Thai/ASCII backup byte caps after appends and
edits, and the provider record cap. Imports and editing are locked during a run.
The same reviewer verified those findings and returned `ship` for that scope.
The mechanical craft detector ran once and reported no findings.

## Provider and release scope

Real Studio backend calls were exercised against Node HTTP fixtures and the
checked-in local Postman simulation (`postman` 1.74.0). Simulation logs showed
both `/v1/chat/completions` and `/v1/responses`; no real model or paid API was
called. Authentication/error redaction, destination/key changes, redirects,
metadata addresses, malformed/large responses and timeout are contract tests.

NOT VERIFIED: the user's chosen provider/model, real answer quality, pricing,
macOS/Linux startup, a full accessibility audit, and a remote GitHub Actions run
or published Release. The draft-release workflow is prepared in source; no
remote commit/tag/draft/publication was created in this session.
