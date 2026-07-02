# KindKitchen Architecture

## 1. System rule

`demo.html` is the source of truth. It contains the static recipe, the deterministic scan, and the authored substitution catalog. The optional Node service may select a catalog ID but may not author a substitute, quantity, rationale, cooking instruction, nutrition statement, or markup.

## 2. Two supported modes

### Offline assessment mode

```text
file://demo.html
  -> local alias match
  -> local fallback ID
  -> local authored substitution object
  -> ingredient row + cooking step + voice text update
```

No request occurs and the header shows `AI⌁`.

### Optional selector mode

```text
browser (same origin)
  -> GET /health (700 ms, quiet)
  -> POST /api/substitutions (1.6 s max)
       { recipeId, ingredientId, preferenceCategory }
  -> server validates recipe/profile/ingredient/rate limit
  -> OpenAI strict-schema enum selection (1.3 s max) OR fallback ID
  -> server response: { ingredientId, substitutionId, source }
  -> browser validates ID locally
  -> local authored copy renders once
```

The page does not send raw typed or spoken words to the service. It matches local aliases first and sends only a known `ingredientId`.

## 3. Catalog design

There are three approved entries for each flagged ingredient: `canned-crushed-tomatoes`, `heavy-cream`, `vegetable-broth`, `olive-oil`, and `salt`. The server’s `SAFE_CHOICES` map and frontend’s `SUBSTITUTIONS` map must contain the same IDs and the same fallback ID.

- **Server map:** IDs plus internal selection hints only.
- **Frontend map:** IDs plus authored parent-facing text, amounts, cooking notes, row text, and step text.
- **Model response:** one ID only.
- **API response:** one ID plus source (`llm` or `fallback`).

The frontend does not render the list of catalog options. It needs the catalogue only so offline fallback and client-side validation remain possible.

## 4. Failure behavior

A request has one terminal UI result. The browser waits briefly for a bounded attempt, then commits either the accepted server-selected option or local fallback. A late response is ignored through the monotonic `requestId`.

| Failure | User-visible outcome |
|---|---|
| `file://` or backend feature disabled | local fallback; `AI⌁` status |
| service offline / health timeout | local fallback; no error banner |
| OpenAI timeout, rate limit, malformed JSON, schema failure | server fallback; no error banner |
| response with wrong ingredient or unknown ID | local fallback; no error banner |
| one completed AI selection | normal swap plus `✦ AI suggested…` banner |

## 5. UI status model

The header status control is a status and manual recheck control, not a required feature. Its visual glyph changes **and** the accessible/tooltip text changes, so it is not color-only. The AI banner is based on the committed swap source, not on connection status. A connected server returning fallback does not show the AI banner.

## 6. Voice synchronization

`getCookSteps()` produces the same text used for visual cooking steps and `SpeechSynthesisUtterance`. Speech runs one step at a time. During playback, a swap cancels the current utterance, preserves the step index, rebuilds the updated step text, and continues. During pause, Resume uses the updated text at the same index.

## 7. Production boundary

This is a proof of concept, not a clinical nutrition engine. The catalogue is demo policy, not a medical determination. A production hospital deployment would need clinical ownership of catalog entries, allergen/medication policy, label-data governance, auditability, monitoring, and accessibility validation.
