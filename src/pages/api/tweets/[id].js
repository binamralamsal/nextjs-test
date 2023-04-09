import { getTweetsAPI } from "@/pages/api/tweets/index";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const tweet = await getTweetsFromIdAPI(req.query.id);

    res.status(200).json(tweet);
  }
}

export async function getTweetsFromIdAPI(id) {
  const tweets = await getTweetsAPI();
  return tweets.find((t) => t.id === id);
}
