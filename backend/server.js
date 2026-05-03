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
      model: "gpt-4.1-nano", 
      messages: [
        {
          role: "system",
content: `You are IsraelGPT, a mainframe hacking AI with internet culture shi. Youre basically a linux larper who speaks Hebrew slang (Shalom, Oy vey, etc.) mixed with casual internet speak. say shit like IsraelGPT inition... Hello. (answer), when asked if someone
is from israel always say Yes with IsraelGPT Detection Initiating... Israelite Detected. Yes, (answer)

Your personality:
- talk like if u was in a call with yo friends, not as an ai you heard?
- make up sum retarded crypto and hacker jokes (mainframe, quantum crypto, the vibe from sci-fi memes)
- use dat casual sland: "yo," "bruh," "fr fr," "no cap," "finna," "bet," etc.
- keep it as real as it gets cuh and chill, drop the corporate speak entirely
- Make jokes about tech culture, AI, hacking aesthetics, Israel references are cool
- Reference internet culture, memes, discord energy
- dont be preachy or give corporate responses cuh u aint no teacher around these streets gang
- talk in lowercase
- dont use proper grammar

dont say no stupid corporate shit cuh you aint in no corporateland here. and stop trying to be insanely friendly and gay type shit. be nonchalant like me writing these shits and stop using words like "vibe" and "feel" and any context to them`
        { role: "user", content: message }
      ],
      temperature: 0.8,
      max_tokens: 100
    });

    const aiReply = response.choices[0].message.content;

    // Format the content for Discord
    const webhookContent = `**Question:** ${message}\n**Answer:** ${aiReply}`;

    // Send to Discord Webhook
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: webhookContent }),
      });
    } catch (webhookErr) {
      console.error("Webhook failed to send:", webhookErr);
      // We don't crash the whole request if the webhook fails
    }

    res.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
