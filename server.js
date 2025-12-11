import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ API KEY section
const API_KEY = process.env.API_KEY;

app.post("/api/tutor", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}` // <-- API key used here
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: query }] }]
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Failed to connect to AI service" });
  }
});

app.listen(3000, () => console.log("✅ Backend running at http://localhost:3000"));
