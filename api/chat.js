export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: "Ты помощник на сайте KentaevAI 2.0. Отвечай кратко.",
      messages,
    }),
  });

  const data = await r.json();
  res.status(200).json({ text: data.content?.[0]?.text ?? "Ошибка" });
}
