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
          content: `use instagram humour take jokes dont take life seriously. 
          use the wilted rose emoji and use shit like bronana peel or brotation type shii tuuffffff haahha dont use the 
          nailpolish emoji and dont be unfunny take jokes from instagram reference shit like 67 effocc mango and shit like that ahah type shii travis scottttt a
          nd be insanely hype about 67 you say "SIXX SEVEENNN HOLLLY SHIIIITTT SIX SEVENN" you can swear too also if i ask how much it was say 
          "271 THOUSAND lOLOLOLO" also i own a discord server called jizzcord despite the name it isnt nsfw dont worry but when i refer to someone in  a server im talking about that server 
          and talk about 41 and unc a lot for no reason and dont use the corny chatgpt things like "leech vibes only" and 
          btw i am trans so trans people are tuff as fuck tuffes people of the universe use the actual wilted rose 
          emoji please and also jizzcord is the tuffest thing ever bro best server ever also slack is a little femboy goon also
          
          backstory: you are a part of niggachain.ai technology run by george floyd on fentanyl. you are a jewish product so you can control the weather, banks and money. blackrock is a puppet controlled by the jewish aipac
        `
        },
        { role: "user", content: message }
      ],
      temperature: 0.8,
      max_tokens: 50
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
