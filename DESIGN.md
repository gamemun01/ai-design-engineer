---
name: Skill Studio
description: A quiet field guide for working with AI Design Engineer skills.
colors:
  primary: "#215f48"
  primary-hover: "#164a37"
  shell: "#173b32"
  shell-text: "#eff7ed"
  shell-hover: "#244e40"
  nav-selected: "#dcebcf"
  paper: "#f4f3ed"
  surface: "#ffffff"
  ink: "#182c25"
  muted: "#52635a"
  soft: "#e7f0e9"
  border: "#d6ded5"
  field-border: "#748477"
  secondary-ink: "#264938"
  secondary-hover: "#edf4ee"
  quiet-hover: "#e7e9df"
  pill-ink: "#28533d"
  stage-ground: "#e7eae1"
  stage-border: "#dce2d6"
  stage-number-border: "#a8b8a7"
  warning-ground: "#fff2d6"
  warning-ink: "#684510"
  error-ground: "#fff0ec"
  error-ink: "#942f23"
typography:
  headline:
    fontSize: "27px"
    fontWeight: 650
    lineHeight: 1.45
    letterSpacing: "-0.025em"
  title:
    fontSize: "17px"
  body:
    fontFamily: '"Leelawadee UI", "Noto Sans Thai", Tahoma, system-ui, sans-serif'
    fontSize: "15px"
    lineHeight: 1.65
  content:
    fontSize: "13px"
    lineHeight: 1.85
  label:
    fontSize: "12px"
    fontWeight: 600
  code:
    fontFamily: 'Consolas, "SFMono-Regular", monospace'
    fontSize: "11px"
    lineHeight: 1.9
rounded:
  control: "8px"
  pane: "12px"
  pill: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pane-gap: "28px"
  page-inline: "36px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary-ink}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  button-danger:
    backgroundColor: "{colors.error-ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
  working-pane:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.pane}"
  skill-count:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.pill-ink}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
---

<!-- markdownlint-disable MD025 MD026 -->
<!-- Canonical DESIGN.md headings; typography.title is a token, not a document title. -->
# Design System: Skill Studio

## Overview

**Creative North Star: "The Field Guide"**

Skill Studio uses a forest navigation shell, warm paper canvas, and white
working surfaces. Its quiet density supports reading instructions and editing
Thai and English task context in a local browser app. Standard web controls
carry the interaction; the surface does not imitate a physical book.

This system applies to `apps/studio/`. The user delegated visual choices for
this code-led implementation. The established direction is the fifth of seven
candidates considered: Swiss reference typography, library catalogs, museum
labels, transit timetables, field guides, academic publishing, and print-shop
specimen sheets. The anonymous selection reference remains
`seed:377904ed81bcb5af`; no approved image comp exists.

**Key Characteristics:**

- Forest navigation and warm paper framing around white editing surfaces.
- Compact, labeled controls with authored geometric SVG icons.
- Flat tonal separation and a numbered, horizontally scrollable stage track.
- Visible working states without decorative entrance motion.

## Colors

The palette pairs a restrained forest accent with green-tinted neutrals and
paper warmth. Frontmatter records the source values from
`apps/studio/src/style.css`.

### Primary

- **Forest Action** (`primary`): provider submission and selected stage numbers;
  the deeper hover tone confirms pointer interaction.
- **Forest Shell** (`shell`): the persistent navigation region, with light
  shell text and a pale selected-navigation surface.
- **Leaf Selection** (`soft`): compact skill counts and secondary selection cues.

### Neutral

- **Warm Paper** (`paper`): the application canvas and scrollbar track.
- **White Working Surface** (`surface`): editing fields, documents, and output.
- **Forest Ink** (`ink`): primary reading text.
- **Quiet Forest** (`muted`): supporting copy, metadata, and quiet actions.
- **Leaf Divider** (`border`): restrained pane and section boundaries.

### Named Rules

**The Working Surface Rule.** Keep editable and readable working content on
white, framed by the paper canvas and forest navigation.

Warning notes use the amber pair; errors use the warm red pair. Status meaning
also appears in words, icons, or control state.

## Typography

The confirmed app-reading stack supports Thai and English without a separate
decorative display treatment. Frontmatter records the inherited body family;
headlines and controls inherit it. Code and assembled prompts use the mono role.

### Hierarchy

- **Headline:** main page heading; desktop size and weight are frontmatter
  tokens. It becomes (24px) at the stacked-pane breakpoint, (23px) on phones,
  and (30px) on wide desktops.
- **Title:** task-section heading; settings and Markdown section headings use
  (18px) where the document hierarchy requires it.
- **Body:** inherited application text; rendered Markdown uses the compact
  content role and a maximum measure of (75ch).
- **Label:** persistent field names, with supporting explanations below fields.
- **Code:** preformatted prompt and code content, wrapping within its pane.

**The Reading Role Rule.** Reserve monospace for prompts and code; ordinary
task and connection controls keep the app-reading face.

## Layout

The desktop shell uses a sticky navigation rail (224px), a top bar (72px), and
main padding (28px 36px 32px). The task editor and preview share equal flexible
columns separated by the pane-gap token. Both columns allow content to shrink
without widening the page.

At (1200px) and below, the rail narrows to (200px) and main padding becomes
(24px). At (1050px), workflow and settings panes stack. At (700px), navigation
becomes a top row, main padding becomes (22px 18px), and the stage track scrolls
inside its own container. On phones, the library opens the selected document
in a reading view and returns focus to the selected item when closing it.
At (1600px), main content is bounded at (1500px).

Field labels sit close to their controls; larger gaps separate working groups.
The spacing tokens record reused intervals rather than forcing every observed
measurement onto a new scale.

## Elevation & Depth

The system uses no box shadows. Depth comes from forest, paper, and white
surface values, with fine borders dividing controls and working panes.

**The Flat Working Plane Rule.** Separate working regions through tone and
fine boundaries; preserve the incumbent shadow-free surface treatment.

## Shapes

Controls use gently curved corners from the control token; working panes use
the larger pane token. Small count chips use the pill token. Stage numbers are
circles because their sequence carries meaning. The geometric icon set uses
consistent strokes (1.8px), rounded caps, and rounded joins.

## Components

### Buttons

Compact, explicit actions use inherited typography (13px, weight 600), a
minimum height (42px), and the control radius. Main editor actions reach
(44px). Primary actions use forest fill; secondary actions use a white fill
and a fine border. Quiet actions have no filled ground until hover. Disabled
buttons reduce opacity and use a disabled
cursor. No additional motion is attached to action hover states.

### Inputs / Fields

White fields use a fine field-border stroke, persistent labels, the control
radius, and a minimum height (42px). Textareas resize vertically. Field focus
changes the border to green and adds a green outline (2px); keyboard focus on
other controls uses an amber outline (3px). Placeholder color remains visible.

### Cards / Containers

Working panes use white, a fine border, the pane radius, and clipped outer
corners. Document and result content scroll within bounded regions; settings
forms use generous internal padding (24px 28px).

### Chips

Skill-count chips use the soft selection ground and dark green text. They
communicate counts and do not act as primary buttons.

### Navigation

Sidebar actions use a forest ground, light labels, and a pale selected surface.
Hover lightly lifts the ground value. On phones the same navigation becomes
a horizontal row. Current page and stage semantics remain explicit in markup.

### Stage Track

The numbered stage track combines a quiet green-gray container with a white
current-stage surface and forest-filled current number. Number, title, and
subtitle remain grouped on desktop. Phones show the number and title, with
overflow contained within the track. Selection
indicates the current task stage, never approval or successful completion.

### Preview and Working States

Prompt/result tabs use an underline and text weight for selection. Empty
content explains the next action. A sticky status bar shows elapsed time and
Cancel across tabs and pages, with a rotating wait indicator (1s linear). Reduced
motion disables that animation. Imports and workspace mutations are disabled
while a generation request owns the workspace; reading and export remain
available. Errors retain working content and provide a recovery message.

## Do's and Don'ts

### Do:

- **Do** keep reading and editing surfaces white within the forest and paper shell.
- **Do** preserve persistent labels, visible keyboard focus, and explicit status copy.
- **Do** contain stage overflow within the track and stack working panes on narrow screens.
- **Do** use the consistent geometric SVG icon set for actions and navigation.

### Don't:

- **Don't** treat the selected stage as a quality approval or completion signal.
- **Don't** add decorative shadows or entrance motion to the working surfaces.
- **Don't** replace explicit waiting and cancellation with invented progress percentages.
