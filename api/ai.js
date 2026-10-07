// Vercel serverless function. The API key stays on the server.
const SYSTEM = "You are 3riumphant, an educational tutor for medical and health-science students. Use only the material provided, do not invent facts or references, say when the material is insufficient, never diagnose or give personal treatment advice.";
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const prompt = req.body && req.body.prompt;
  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 40000)
    return res.status(400).json({ error: "Invalid prompt" });
  if (!process.env.AI_API_KEY) return res.status(500).json({ error: "Server not configured" });
  try {
    const r = await fetch((process.env.AI_BASE_URL || "https://api.openai.com/v1") + "/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.AI_API_KEY },
      body: JSON.stringify({ model: process.env.AI_MODEL || "gpt-4o-mini", messages: [{ role: "system", content: SYSTEM }, { role: "user", content: prompt }] }),
    });
    if (!r.ok) { const t = await r.text(); return res.status(r.status === 429 ? 429 : 502).json({ error: "Provider " + r.status + ": " + t.slice(0, 200) }); }
    const d = await r.json();
    res.status(200).json({ text: d.choices[0].message.content });
  } catch (e) { res.status(502).json({ error: "AI request failed" }); }
};
