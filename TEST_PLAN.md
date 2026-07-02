# KindKitchen Test Plan

Run these checks before delivery. The core path is `demo.html` opened directly from disk with no server and no network.

## A. Syntax checks

```bash
node --check llm-server.mjs
python3 - <<'PY'
from pathlib import Path
import re
html = Path('demo.html').read_text()
script = re.search(r'<script>\s*(.*?)\s*</script>', html, re.S).group(1)
Path('/tmp/kindkitchen-inline.js').write_text(script)
PY
node --check /tmp/kindkitchen-inline.js
```

Expected: both commands exit 0.

## B. Offline first load

1. Open `demo.html` through `file://` at 320px, 375px, and 390px.
2. Confirm there is no horizontal page scroll.
3. Confirm original rows show `28 oz canned crushed tomatoes`, `1/2 cup heavy cream`, `2 cups vegetable broth`, `1 tbsp olive oil`, and `1/2 tsp salt`.
4. Confirm no row is swapped and no AI-suggested banner is visible.
5. Confirm scan counts show **3 Required changes**, **2 Label checks**, **0 Optional tweaks**.
6. Confirm `AI⌁` has tooltip/accessibility text explaining that offline swaps are active.
7. Confirm the approved-catalog choices are not rendered as an option list.

## C. Swap and Undo

For each flagged ingredient—canned crushed tomatoes, heavy cream, vegetable broth, olive oil, and salt:

1. Tap the ingredient and use its Swap button after reload; both paths must work.
2. Confirm one result card shows use instead, amount, why it fits, cooking note, and Undo.
3. Confirm original ingredient text is struck through and the replacement appears on that row.
4. Confirm each matching cooking step changes and shows `✓ Updated for your version`.
5. Undo and confirm the original row and step return.
6. Reload and confirm no swap persists.

## D. Typed and voice input

1. Enter `cream`, `broth`, `tomatoes`, `salt`, and `oil`; confirm each enters the same flow as a button.
2. Enter `butter`; confirm a polite local message asks for a recognized ingredient.
3. Confirm an unknown typed or spoken request never reaches the backend.
4. With SpeechRecognition absent or denied, typed and touch flows still work.

## E. Voice synchronization

1. Start narration. Confirm its status names the current step.
2. While the cream step reads, swap heavy cream. Confirm it speaks the current swapped text, not the original, and does not start from step 1.
3. Pause, swap or undo an ingredient in the current step, and resume. Confirm the same step reads with current text.
4. Stop, then Play. Confirm it starts at step 1.

## F. Optional service

### F1. Deterministic server response

```bash
ENABLE_FRONTEND_LLM=true node llm-server.mjs
curl -s http://127.0.0.1:8787/health
curl -sS -X POST http://127.0.0.1:8787/api/substitutions \
  -H 'Content-Type: application/json' \
  -d '{"recipeId":"creamy-tomato-soup-v1","ingredientId":"heavy-cream","preferenceCategory":["fat-free","low-sodium"]}'
```

Expected response: `{ "ingredientId": "heavy-cream", "substitutionId": "fat-free-evaporated-milk", "source": "fallback" }`. The header shows `AI↔`, and no AI-suggested banner appears after a swap.

### F2. No backend

1. Set the frontend flag but do not start the server.
2. Trigger a swap.
3. Expected: exactly one fallback result appears, the UI is not stuck, no raw error appears, and the header moves to `AI⌁`.

### F3. OpenAI selector

1. Set `OPENAI_API_KEY`, `ENABLE_LLM=true`, `ENABLE_FRONTEND_LLM=true`; start the server.
2. Open `http://127.0.0.1:8787` and wait for the header to show `AI✓`.
3. Trigger a flagged swap.
4. Expected: response contains an ID from the matching local catalog and `source: "llm"`; UI text remains frontend-authored; ingredients section shows `✦ AI suggested…`.
5. Send a wrong profile, an unknown ingredient, or an ID outside the catalog. Expected: HTTP 400 or local fallback; no model text reaches the page.

## G. Accessibility and layout

1. Keyboard-test swap, Undo, Help, phone-preview, AI-status recheck, form submit, and narration controls.
2. Confirm phone-preview tooltip remains exactly `Open 375px phone preview`.
3. Confirm AI status uses a glyph and descriptive text/tooltip; the AI banner uses a symbol and text.
4. Enable reduced motion and zoom to 200%; verify reflow and controls remain usable.
