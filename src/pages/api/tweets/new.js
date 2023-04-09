import path from "path";
import fs from "fs/promises";
import { getTweetsAPI } from "@/pages/api/tweets/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const tweets = await getTweetsAPI();

    const newTweet = {
      id: (tweets.length + 1).toString(),
      tweet: req.body.tweet,
      author: req.body.author,
      createdAt: new Date(),
    };

    tweets.push(newTweet);

    const filePath = path.join(process.cwd(), "src/data/tweets.json");
    await fs.writeFile(filePath, JSON.stringify(tweets));

    res.status(201).json(newTweet);
  }
}
