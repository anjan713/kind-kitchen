import { ENABLE_LLM, ENABLE_FRONTEND_LLM, ENABLE_TTS, OPENAI_API_KEY } from "./_lib.mjs";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    llmEnabled: ENABLE_LLM && Boolean(OPENAI_API_KEY),
    frontendLlmEnabled: ENABLE_FRONTEND_LLM,
    ttsEnabled: ENABLE_TTS && Boolean(OPENAI_API_KEY)
  });
}
