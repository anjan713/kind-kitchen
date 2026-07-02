# Acceptance Criteria

- [ ] Starts with the original recipe; no swaps, AI banner, save state, or approval UI.
- [ ] Shows 3 Required changes, 2 Label checks, and 0 Optional tweaks for the fat-free/low-sodium demo profile.
- [ ] All five flagged ingredients can resolve one swap by touch and typed alias.
- [ ] No pre-swap list exposes approved catalog choices.
- [ ] Swap result has use instead, amount, why it fits, cooking note, and Undo.
- [ ] Ingredient row, matching step text, and narration remain synchronized.
- [ ] `file://` works with no network.
- [ ] A broken or unavailable service produces exactly one local fallback, no raw error.
- [ ] Server response contains only ingredient ID, substitution ID, and source; no model-generated recipe copy.
- [ ] `AI✓` is shown only after health confirms model mode; `✦ AI suggested…` appears only after accepted LLM source.
- [ ] 320px, 375px, and 390px have no horizontal scrolling.
- [ ] Source and inline script parse checks pass.
