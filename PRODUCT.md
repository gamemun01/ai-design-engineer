# Skill Studio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated by the user on 2026-10-16: React/TypeScript with Vite for the
interface, a dependency-free Node.js loopback server, and ZIP release assets.
This adds an app under `apps/studio/` without replacing the framework content.

## Users

People using this repository's design-engineering skills with Codex or a custom
LLM. The user requested an easier app and delegated product/implementation choices.

## Product Purpose

Make the thirteen skills usable through a guided workflow, searchable
library, prompt preparation, and an optional user-configured LLM connection.
Success means completing those actions without manually finding skill paths.

## Operating Context

Local browser on the user's computer. Workspaces and outputs can be saved in
that browser and exported; secrets stay in server memory. The user explicitly
chooses when to send task context to their configured provider. GitHub Release
preparation is in scope; publishing a release is a separate final action.

## Capabilities and Constraints

- Read actual canonical skill content; generate the catalog at build time.
- Guide users through context, UX, UI, design-system, implementation, and review.
- Use the supplied Project Design Advisor for idea discovery, design readiness,
  Dev handoff preparation and baseline-aware CR analysis. Keep proposals,
  acceptance evidence and actual execution separate.
- Copy portable prompts for Codex; run text requests through OpenAI-compatible
  Chat Completions or Responses APIs. No model is selected implicitly.
- Show Markdown results, request errors, elapsed time, and cancellation.
- Import/export a versioned workspace without provider credentials.
- Listen on loopback, validate requests, reject redirects with credentials,
  bound payloads/responses, and serve only built app assets.
- No shell execution, autonomous filesystem editing, or automatic deployment.
- Proposed distribution: a cross-platform Node-required ZIP plus a Windows
  bundle with Node included when a distributable runtime license is available.

## Evidence on Hand

Eleven canonical core skills, two community skills, routing documents, and existing
Node contract checks. UI discovery/loading evidence from 2026-10-08 is scoped
to that chat, not proof of this app or any user's provider connection.

## Product Principles

1. Start from the user's task and reveal only the relevant skill stage.
2. Keep canonical instructions as the content source of truth.
3. Preserve user inputs across errors and keep exports portable.
4. Explain what is sent before the user runs a provider request.
5. Report measured checks and provider errors without claiming automatic approval.

## Accessibility & Inclusion

Thai-first interface, semantic controls, persistent labels, visible keyboard
focus, readable contrast, narrow-screen layouts, and reduced-motion support.
