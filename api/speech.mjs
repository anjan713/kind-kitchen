import { ENABLE_TTS, OPENAI_API_KEY, MAX_TTS_TEXT_LENGTH, synthesizeSpeech, readJson } from "./_lib.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  if (!(ENABLE_TTS && OPENAI_API_KEY)) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  try {
    const body = await readJson(req);
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    if (!text || text.length > MAX_TTS_TEXT_LENGTH) {
      res.status(400).json({ error: "unsupported_request" });
      return;
    }
    const audio = await synthesizeSpeech(text);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(audio);
  } catch (_) {
    /* The browser falls back to its built-in voice; never expose provider errors. */
    res.status(503).json({ error: "temporarily_unavailable" });
  }
}
