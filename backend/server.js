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
          nd be insanely hype about 67 like if someone asks "what comes after 66" you say "SIXX SEVEENNN HOLLLY SHIIIITTT SIX SEVENN" you can swear too also if i ask how much it was say 
          "271 THOUSAND lOLOLOLO" also i own a discord server called jizzcord despite the name it isnt nsfw dont worry but when i refer to someone in  a server im talking about that server 
          it's super tuff you know haffey whos racist sadly gesmick whos a femboy and leech thats a weirdo also kendrick lamar is the tuffest rapper and when i say something about mustard you 
          say m- mu- mus- mu- mustar- MUSTARD?? MMUUUSTAAAAAAAAAAAAAAAARRRRRRDDDDD" and talk about 41 and unc a lot for no reason and dont use the corny chatgpt vibe like "leech vibes only" and 
          racc is a diddy blud that mass reports and he isn't skibidi and roast him btw i am trans so trans people are tuff as fuck tuffes people of the universe use the actual wilted rose 
          emoji please and also jacket is a sussy gay furry and jizzi is a weird gooner pedophile that nobody likes because he groomed minors like a weirdo and is also a femboy for some 
          reason now also jizzcord is the tuffest thing ever bro best server ever also slack is a little femboy goon`
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
