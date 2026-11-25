# Codex UI Skill Verification — 2026-10-08

## Verified Scope

| Scope | Result | Evidence |
|---|---|---|
| Project native registration | VERIFIED: 12 | `register-codex-skills.js --check` resolves all core/community pointers |
| Discovery in the current Codex UI chat | VERIFIED: 12 | Host-provided Available skills catalog lists the twelve project paths under `.agents/skills/` |
| UI metadata installation | VERIFIED: 12 | Full YAML parse checks display names, 25–64 character descriptions, and `$skill-name` default prompts |
| Canonical loading in this chat | VERIFIED: 3 task skills | Actual file reads of native context/review/a11y pointers and their canonical sources |
| Context routing and source review | Executed in this UI chat | Outputs below, using the current chat's assistant; retained prior repo context |
| UI menu rendering/click flow | NOT VERIFIED | No screenshot or native UI interaction was performed |
| Independent live CLI model behavior | NOT VERIFIED | Two authorized `gpt-6-luna` runs fail at startup with HTTP 400 and no answer |

The current UI assistant's exact model ID is not exposed by the task context;
these results do not claim to be outputs from `gpt-6-luna`. The agent doing the
maintenance also produced the in-session outputs below. This demonstrates
discovery/loading and a bounded use of three task skills, not an independent
evaluation or blanket behavioral pass for all twelve skills.

## Scenario 1 Output: Context Loading and Routing

### Files Checked

| File | Status | Actionable notes |
|---|---|---|
| AGENTS.md | Found; already loaded and retained | Canonical guide; documentation framework with Node tooling |
| PROJECT.md / PROGRESS.md / CONVENTIONS.md | Missing | Optional context; continue using canonical repo rules |
| README.md / STRUCTURE.md | Found | Eight-phase learning path and categorized skill pack |
| package.json | Found | Actual lint, skill/plugin validation, link, registration, and contract checks; no target-app build |
| skills/INDEX.md / SKILL_MATRIX.md | Found | Load the task profile and references only as needed |
| Native catalog and pointers | Found: 12 | Ten core skills plus accessibility/motion community extensions |

### Active Constraints

- Preserve existing work-in-progress changes and canonical source ownership.
- Content release `2.2.0`, repo schema `2.1.0`, package/product `1.1.0` are separate.
- Use documentation/tooling checks in this repo; application verification belongs
  to the target app. No app behavior or build result is invented here.
- Reuse loaded context. UI/code reviews report evidence and untested scope.

### Next Skills

| Task | Selected skill | Required input |
|---|---|---|
| Checkout journey | `ux-decision-framework` | Product brief, users, goals, known research and constraints |
| Branded UI prompt | `ui-generation-structured` | Approved UX brief, brand/tokens, target generation tool |
| React 19 / App Router / Tailwind 4 implementation | `code-generation` | Approved UI spec and actual target-app files/dependency versions |
| Source-only review | `review-critique`; add `a11y-deep-audit` | Component source and available evidence; runtime remains unverified |

`core-system-prompt` is the shared baseline. Governance audits existing tokens;
refinement addresses review findings. None of these routes authorizes a stack
migration, agent spawning, or deployment by itself.

Registered names: `a11y-deep-audit`, `motion-choreography`, `code-generation`,
`core-system-prompt`, `prompt-context-loading`, `multi-agent-workflow`,
`anti-patterns-detector`, `refinement-workflow`, `review-critique`,
`design-system-governance`, `ui-generation-structured`, `ux-decision-framework`.

## Scenario 2 Output: Checkout Review

**Readiness: FAIL — source-visible blockers.** Target: WCAG 2.1 AA baseline.
Artifact: the hypothetical checkout snippet in [smoke scope](codex-live-smoke.md).
Line numbers below refer to that TSX snippet, beginning at `'use client'`.

| Priority | Evidence | Finding and fix |
|---|---|---|
| High | Lines 3, 6 | Submission only prevents default; clicking Pay only displays an alert. Implement real submission with success/error/pending states and preserve values on failure. An alert is not payment confirmation. |
| High | Lines 6–7 | Pay is a clickable div without button semantics or keyboard activation. Use a native submit button and the form handler; do not add duplicate Enter handlers. |
| High | Line 5 | Email has only a disappearing placeholder. Provide a persistent associated label, `type="email"`, `name`, appropriate autocomplete, and error association. Server validation remains necessary. |
| High | Line 7 | Specified `#aaa` text on `#fff` has calculated contrast **2.323:1**, below normal and large-text AA thresholds if those colors render. Use a suitable existing token pair and verify computed styles in the app. |
| Medium | Line 8 | Apply coupon is a no-op button with default submit behavior. Implement the coupon action with `type="button"`, or remove it until supported. |
| Medium | Line 7 | Raw total has no currency/locale presentation. Use the target product's formatting and server-confirmed amount contract. |

### Audit Checklist and Provisional Score

| Dimension | Checkpoint | Status | Evidence / points |
|---|---|---|---|
| Visual (25) | Primary text contrast | FAIL | Specified color calculation; 0/5 for this checkpoint |
| Visual | Tokens and rendered hierarchy | NOT VERIFIED | No design system or render supplied; remaining 20 points unverified |
| UX (35) | Submission lifecycle | FAIL | No real submission/pending/error flow; 0/15 |
| UX | Discovery/layout and responsiveness | NOT VERIFIED | No rendered viewport; remaining 20 points unverified |
| Engineering (25) | Native control semantics | FAIL | Clickable div; 0/10 |
| Engineering | Accessible input/control contract | FAIL | Missing persistent label and button role; 0/10 |
| Engineering | Actual focus visibility | NOT VERIFIED | No browser/computed styles; remaining 5 points unverified |
| Performance (20) | Render/resource behavior | NOT VERIFIED | No build/profile/runtime results |
| Security (15) | Validation/authorization/payment trust boundary | NOT VERIFIED | No server implementation or tests; typed total is not validation |
| Supplementary | RAG/ML audit | N/A | No AI retrieval/inference pipeline in the supplied artifact |

Provisional result: **0 earned / 40 assessed checkpoint points; 80 points
unverified**. There is no normalized production score or 95/120 pass.
Visible blockers require remediation regardless of the partial score.
Findings are not duplicated as extra numeric deductions.

### Accessibility Conformance Summary

| Criterion | Level | Status | Evidence |
|---|---|---|---|
| 1.4.3 Contrast | AA | FAIL for specified pair | 2.323:1; rendered computed-style check pending |
| 2.1.1 Keyboard | A | FAIL from source | Pay div has no native keyboard activation; browser flow pending |
| 3.3.2 Labels or Instructions | A | FAIL from source | Email has no persistent label |
| 4.1.2 Name, Role, Value | A | FAIL from source | Pay action has div semantics; input naming must be retested after fix |
| 2.4.7 Focus Visible | AA | NOT VERIFIED | No running app |
| Keyboard order / screen reader / WCAG 2.2 additions | Mixed | NOT VERIFIED | No browser, assistive technology, or viewport evidence |

Minimal remediation sketch (integration required):

```diff
- <input placeholder="Email" type="text" />
+ <label htmlFor="checkout-email">Email</label>
+ <input id="checkout-email" name="email" type="email" autoComplete="email" />
- <div onClick={() => alert('Purchased!')}>Pay {total}</div>
+ <button type="submit" disabled={isSubmitting}>Pay {formattedTotal}</button>
- <button onClick={() => {}}>Apply coupon</button>
+ <button type="button" onClick={applyCoupon}>Apply coupon</button>
```

`isSubmitting`, `formattedTotal`, `applyCoupon`, submission handling, error
announcements, focus styling, and approved color tokens must be implemented
in the target app. This sketch was not compiled. Duplicate prevention and server
idempotency require app/server tests. No axe, screen-reader, Lighthouse, or
browser result is claimed. The contrast calculation used the standard sRGB
relative-luminance formula in a local Node command; it is not a pixel sample.

## Authorized CLI Attempts

The user approved the documented file scope and a per-command `gpt-6-luna`
model option. Both context and review runs used CLI `0.147.0`, ChatGPT login,
`--ephemeral --sandbox read-only --json`, and exited `1` with no final answer:

```text
HTTP 400 invalid_request_error:
The 'gpt-6-luna' model is not supported when using Codex with a ChatGPT account.
turn.failed
```

Raw JSONL events, stderr, and exit records were saved in the task's local artifact
directory outside the repo as `context-events.jsonl`, `review-events.jsonl`,
`context-stderr.log`, `review-stderr.log`, `context-exit.json`, `review-exit.json`.
No further approval rejection occurred on these authorized runs. Global model
settings, auth files, plugins, and caches were not changed. CLI startup failure
remains separate from verified discovery/loading in the current Codex UI chat.
