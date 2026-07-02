import { allowedIds, allowedIdsExcluding, getChoice, isValidRequest, readJson } from "./_lib.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  res.setHeader("Cache-Control", "no-store");
  try {
    const body = await readJson(req);
    if (!isValidRequest(body)) {
      res.status(400).json({ error: "unsupported_request" });
      return;
    }
    const validIds = allowedIds(body.ingredientId);
    const exclude = Array.isArray(body.excludeSubstitutionIds)
      ? body.excludeSubstitutionIds.filter((id) => typeof id === "string" && validIds.includes(id))
      : [];
    const allowed = allowedIdsExcluding(body.ingredientId, exclude);
    res.status(200).json(await getChoice(body.ingredientId, allowed));
  } catch (_) {
    /* The browser falls back locally; do not expose internals or provider errors. */
    res.status(503).json({ error: "temporarily_unavailable" });
  }
}
