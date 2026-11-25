# Skill Studio local API contract

Internal single-user loopback API for the Studio browser UI. Not a hosted API.
Canonical implementation: `apps/studio/server/app.mjs`; executable contract
checks: `apps/studio/test/server.test.mjs` and provider tests in that directory.

## Local request contract

All paths use the exact loopback Host/Origin shown at startup. Writes require
`Content-Type: application/json` and `X-Studio-Token` from bootstrap. Cross-site
requests, other Hosts and other Origins are rejected. No CORS is enabled.
JSON request bodies are limited to 512,000 bytes.

| Method / path | Request | Successful response |
|---|---|---|
| `GET /api/bootstrap` | None | `token`, canonical `catalog`, public `connection` or null |
| `PUT /api/connection` | `baseUrl`, `protocol` (`chat`/`responses`), `model`, optional `apiKey`, `timeoutSeconds` | Public connection: URL/protocol/model/timeout/hasApiKey; never the key |
| `POST /api/models` | `{}` | `{ "models": ["provider-model-id"] }` |
| `POST /api/run` | `projectName`, required `task`, optional `context`, required `skillIds`, optional `referencePaths` | `id`, `content`, `model`, `protocol`, `incomplete`, `elapsedMs`, `createdAt` |

Run requests contain prompt inputs only, excluding previous answers. The server
reconstructs the prompt from its own canonical catalog. Unknown skill/reference
IDs fail validation. One run is allowed at a time (409 otherwise). Disconnecting
the caller cancels the upstream request and releases the run slot.

Omitted `apiKey` keeps the session key only when the normalized Base URL is
unchanged; null clears it. Changing destinations clears the previous key.
Settings are process-local and are lost when Studio closes.

Errors are JSON `{ "error": { "code": "...", "message": "..." } }`.
Relevant statuses: 400 invalid inputs/settings, 403 Host/Origin/token, 409 busy,
413 body cap, 415 content type, 502 invalid/empty/oversized provider response,
504 provider timeout. Upstream non-success status can be relayed with a
sanitized provider message. The client preserves task inputs and existing answers.

## Upstream text-provider contract

The Base URL normally includes `/v1`. The adapter appends:

- `GET /models`: accepts `{ "data": [{ "id": "..." }] }`.
- `POST /chat/completions`: `model`, `messages` (system + user), `stream: false`;
  reads `choices[0].message.content` as text or text blocks.
- `POST /responses`: `model`, `instructions`, `input`, `stream: false`;
  reads `output_text` or message `output_text` blocks in `output`.

Only optional Bearer authentication is supported. No tools, images, streaming,
custom headers or provider-specific token/temperature settings are sent.
Redirects are rejected; keys are not forwarded to redirect targets. Link-local,
metadata and unspecified/multicast destinations are blocked, including resolved
DNS addresses. Localhost and private-network model servers remain supported.
JSON responses are capped at 2,000,000 bytes, answer text at 500,000 characters.
The known configured key is redacted from surfaced provider text/errors.

## Repeatable local simulation

Postman CLI 1.74.0 was used locally. No Postman cloud workspace, published mock
or live model was used. The checked-in mock is a synthetic subset based on the
official [Chat Completions](https://developers.openai.com/api/reference/resources/chat)
and [Responses](https://platform.openai.com/docs/api-reference/responses) response
shapes; it is not a model-quality evaluation or a provider certification.
Owner-workspace lookup was skipped because no specific provider/team workspace
was selected by the user.

```bash
postman simulation run postman/simulations/studio.sim.yaml --port 4321 --no-history --output ndjson
```

In another terminal:

```bash
node apps/studio/test/simulation-smoke.mjs
```

This starts the real Studio API and exercises both protocols through the local
simulation. Its request log must show `/v1/chat/completions` and `/v1/responses`
under routeKey `llm`. Stop the simulation after testing. Do not use real secrets
in its fixture inputs or retain request logs containing private task content.
