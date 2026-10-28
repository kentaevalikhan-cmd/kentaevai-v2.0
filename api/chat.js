export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-ai/deepseek-v4.1-flash",
      messages: [
        { role: "system", content: "Ты помощник на сайте KentaevAI 2.0. Отвечай кратко." },
        ...messages,
      ],
      max_tokens: 1000,
    }),
  });

  const data = await r.json();
  res.status(200).json({
    text: data.choices?.[0]?.message?.content ?? "Ошибка: " + JSON.stringify(data),
  });
}
