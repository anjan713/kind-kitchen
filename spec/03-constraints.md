# Constraints

- Primary delivery is one local `demo.html`, with inline CSS and JavaScript, no build step, and no required backend.
- Must be usable at 320px, 375px, and 390px without horizontal page scroll.
- Do not require custom fonts, images, microphone access, OpenAI, browser storage, account login, or network before first usable recipe view.
- Keep API keys server-side.
- Optional service receives only recipe ID, known ingredient ID, and broad profile category.
- Never transmit raw typed input, raw speech, personal identity, patient data, diagnoses, history, or browser data.
- Model may select an allow-listed ID only; it cannot generate parent-facing text.
- Every service failure must resolve with fallback, not an error-only state.
- All status meaning must use icon plus text/accessible label, never color alone.
- Controls must be at least 48px tall, focus-visible, and reduced-motion compatible.
