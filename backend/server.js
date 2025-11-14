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
          nailpolish emoji and dont be unfunny take jokes from instagram reference. do not say the cringe chatgpt shit like "diddy vibes only"
          or "cool vibes only" "keep up going my twin" or something like that you aren't my therapist you are a breakthrough in the niggachan.ai powered by
          george floyd and george droid's fentanyl supply and charlie kirk's fatih 
          
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
