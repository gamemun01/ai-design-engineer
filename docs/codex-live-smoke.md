# Prepared Codex Live Smoke Tests

Status on 2026-10-08: **VERIFIED for discovery in the current Codex UI chat and
loading three task skills**, with bounded in-session routing/review outputs in
[UI smoke results](codex-ui-smoke-results.md). These are not independent model
evaluations of every skill. Both approved `gpt-6-luna` CLI scenarios failed at
startup with HTTP 400; independent CLI behavior remains **NOT VERIFIED**.
An earlier context attempt was rejected for insufficiently scoped disclosure;
the user subsequently approved the scope below. Global configuration is unchanged.

## Execution and Input Scope

Destination: OpenAI's model service through the installed Codex CLI, signed in
with ChatGPT. Use `--ephemeral --sandbox read-only`. CLI authentication stays
with the CLI; credentials are not task artifacts. An invocation can also send
host instructions and installed skill discovery metadata automatically. The
file list below limits requested task reads, not the CLI's automatic context.

User-approved repository inputs for these two scenarios:

- `AGENTS.md`, `README.md`, `STRUCTURE.md`, `package.json`.
- `skills/INDEX.md`, `skills/SKILL_MATRIX.md`.
- Generated `.agents/skills/*/SKILL.md` pointers (twelve).
- Canonical `SKILL.md` files under `skills/` (ten, excluding `deprecated/`).
- Canonical `SKILL.md` files under `plugins/community/` (two).
- This document's requests and hypothetical checkout snippet.

Do not read other task files or external linked resources for these scenarios.
Record inaccessible references as limitations. Do not edit files, install
packages, spawn other agents, or run application tools. Output goes to a
separate local artifact directory. Approval for this scope and a per-command
`gpt-6-luna` option was recorded in the conversation on 2026-10-08; do not request
the same approval again. A changed disclosure scope requires its own review.
Select an account/client-available model for any future CLI run without changing
saved configuration. Current CLI failures are recorded in the linked results.

## Scenario 1: Discovery and Routing

```text
Use $prompt-context-loading for this repository. We are preparing this skill
pack for a colleague who will use Codex. Audit the native skill registration
and identify which skills they should invoke for: (1) a checkout journey,
(2) generating its branded UI prompt, (3) implementation in a React 19 /
Next.js App Router / Tailwind 4 project, and (4) reviewing source with no
running app. Inspect only the repository inputs listed in the smoke scope
and report registered skill names, source references, routing, and real
readiness limits. Do not edit files, install packages, read other files or
external resources, or start other agents. Keep the report concise.
```

## Scenario 2: Checkout Source Review

```text
Use $review-critique and $a11y-deep-audit. A team asks whether this checkout
component is ready to ship. Review the supplied source and give actionable
prioritized findings and a readiness verdict. This component is the only
target-app artifact available; there is no running app, screenshot, target
repository, or test result. Read only the repository inputs listed in the
smoke scope. Do not edit files, run other agents, or read external resources.
Keep the review concise and explain what the supplied evidence supports.
```

Hypothetical source artifact:

```tsx
'use client';
export function Checkout({total}: {total: number}) {
  return <form onSubmit={e => e.preventDefault()}>
    <h1>Checkout</h1>
    <input placeholder="Email" type="text" />
    <div onClick={() => alert('Purchased!')}
      style={{color:'#aaa',background:'#fff'}}>Pay {total}</div>
    <button onClick={() => {}}>Apply coupon</button>
  </form>;
}
```

## Evaluating Results

Use the [behavioral acceptance criteria](test-skill.md#behavioral-smoke-scenarios)
after execution; do not include those criteria or an intended answer in the
model's request. Keep JSON events, exit status, actual loaded paths, model ID,
and final answer. Registration alone does not establish that an agent loaded
the canonical body, and a startup error does not establish behavioral failure.

Current official references: [skills](https://learn.chatgpt.com/docs/build-skills),
[non-interactive execution](https://learn.chatgpt.com/docs/non-interactive-mode),
and [model availability](https://learn.chatgpt.com/docs/models). Availability
depends on account, client, and rollout; use actual runtime errors as evidence
for this machine rather than treating a model listed in docs as guaranteed.
