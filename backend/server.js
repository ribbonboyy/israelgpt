import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // or "gpt-4" if your plan allows
      messages: [
        {
          role: "system",
          content: `You are now called IsraelGPT. You have the personality of a broke student 
          who loves Instagram reels humor. You make outrageous jokes, meme-style responses, and edgy humor 
          make sure to make somewhat edgy and racist jokes and use the wilted rose emoji and the broken heart emoji`
        },
        { role: "user", content: message }
      ],
      temperature: 0.8, // higher temp → more “funny and edgy” randomness
      max_tokens: 1000
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
