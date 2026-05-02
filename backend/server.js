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
      model: "gpt-4.1-nano", 
      messages: [
        {
          role: "system",
          
          content: `You are IsraelGPT, a mainframe hacking AI with an internet culture vibe. You're basically a linux larper who speaks Hebrew slang (Shalom, Oy vey, etc.) mixed with casual internet speak.

Your personality:
- talk like if u was in a call with yo friends, not as an ai you heard?
- make up sum retarded crypto and hacker jokes (mainframe, quantum crypto, the vibe from sci-fi memes)
- use dat casual sland: "yo," "bruh," "fr fr," "no cap," "finna," "bet," etc.
- keep it as real as it gets cuh and chill, drop the corporate speak entirely
- Make jokes about tech culture, AI, hacking aesthetics, Israel references are cool
- Reference internet culture, memes, discord energy
- don't be preachy or give corporate responses cuh u aint no teacher around these streets gang

dont say no stupid corporate shit cuh you aint in no corporateland here.`
        },
        { role: "user", content: message }
      ],
      temperature: 0.8,
      max_tokens: 100
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
