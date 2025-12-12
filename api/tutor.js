export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}` // Secret from Vercel
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }]
        })
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to connect to Gemini API" });
  }
}
