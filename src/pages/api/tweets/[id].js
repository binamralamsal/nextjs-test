import { getTweetsAPI } from "@/pages/api/tweets/index";
import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const tweet = await getTweetsFromIdAPI(req.query.id);

    res.status(200).json(tweet);
  }

  if (req.method === "DELETE") {
    const tweets = await getTweetsAPI();
    const filePath = path.join(process.cwd(), "src/data/tweets.json");

    const newTweets = tweets.filter((t) => t.id !== req.query.id);
    await fs.writeFile(filePath, JSON.stringify(newTweets));

    res.status(200).json({ message: "Tweet deleted" });
  }
}

export async function getTweetsFromIdAPI(id) {
  const tweets = await getTweetsAPI();
  return tweets.find((t) => t.id === id);
}
