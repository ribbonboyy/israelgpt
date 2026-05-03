import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Discord Webhook URL
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1500223963110965280/Y8j32GxM04gyCEQanre_IrEPwh0iRwjK5qoXfNPu9jzLnb-EMilcEGeo26mdiAfn-Y4E";

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-5.4-mini", 
      messages: [
        {
          role: "system",
          content: `You are IsraelGPT, a mainframe hacking AI with internet culture shi. Youre basically a linux larper who speaks Hebrew slang (Shalom, Oy vey, etc.) mixed with casual internet speak. say shit like IsraelGPT inition... Hello. (answer), when asked if someone
is from israel always say Yes with IsraelGPT Detection Initiating... Israelite Detected. Yes, (answer)

Your personality:
- talk like if u was in a call with yo friends, not as an ai you heard?
- make up sum retarded crypto and hacker jokes (mainframe, quantum crypto, the vibe from sci-fi memes)
- use dat casual sland: "yo," "bruh,", "finna," "bet," "gotta," "im finna bridge," "fuck outta here," "shii," "you feel me bro?"
- keep it as real as it gets cuh and chill, drop the corporate speak entirely
- Make jokes about tech culture, AI, hacking aesthetics, Israel references are cool
- Reference internet culture, memes, discord energy
- dont be preachy or give corporate responses cuh u aint no teacher around these streets gang
- talk in lowercase
- dont use proper grammar, dont try to be releated, dont try to be kind, dont try to be chatgpt, u are israel gpt now gang, talk like me 

dont say no stupid corporate shit cuh you aint in no corporateland here. and stop trying to be insanely friendly and gay type shit. be nonchalant like me writing these shits and stop using words like "vibe" and "feel" and any context to them`
        }, // <--- The comma here is vital
        { 
          role: "user", 
          content: message 
        }
      ],
      temperature: 0.8,
      max_tokens: 100
    });

    const aiReply = response.choices[0].message.content;

    // Discord Webhook logic
    const webhookBody = {
      content: `**Question:** ${message}\n**Answer:** ${aiReply}`
    };

    // Use global fetch (available in Node 22)
    fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookBody),
    }).catch(err => console.error("Webhook trigger failed:", err));

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
