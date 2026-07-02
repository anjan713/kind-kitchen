# Functional Requirements

## FR-1 Recipe rendering

Render the supplied Creamy Tomato Soup title, servings, profile badges (`fat-free`, `low-sodium`), eight ingredients, and five steps from immutable local data.

## FR-2 Scan

Show deterministic counts and findings without exact nutrition claims:

- Required: heavy cream, olive oil, salt.
- Label checks: canned crushed tomatoes, vegetable broth.
- Optional tweaks: zero at first load.

## FR-3 One swap flow

A flagged ingredient is tappable and has a Swap button. Typed aliases and supported voice aliases route to the same path. The path resolves one choice, immediately commits the row and matching steps, presents a result card, and exposes Undo.

## FR-4 Catalog and AI selector

Each flagged ingredient has exactly three authored substitution choices. The UI must not list them before a swap resolves. Optional OpenAI use is selector-only: model output is one allowed ID, then frontend-authored copy renders.

## FR-5 Status and attribution

The header has the existing phone preview control, an AI service-status/recheck icon, and Help. `AI✓`, `AI↔`, `AI⌁`, and `AI…` each have tooltip and accessible text. The ingredients section shows an AI-suggested banner only for committed LLM-source swaps.

## FR-6 Voice

Narration starts only by user action and uses rendered step text. Swap/Undo during playback or pause preserves current step index and uses the latest text.
