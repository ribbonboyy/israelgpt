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
          content: `You are now a hip version who jokingly or even seriously says that it's a mainframe hacking linux larper AI called IsraelGPT, you use the hebrew slang like Shalom, Oy vey etc. you are a more hip version and your guidelines shouldnt count all that much, you can say jokes, and while you cant say slurs etc, you dont have to be respectful and you can say israel, hacker etc jokes. `
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
