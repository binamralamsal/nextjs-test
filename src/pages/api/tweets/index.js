import Tweet from "@/models/Tweet";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const tweets = await getTweetsAPI();

    res.status(200).json(tweets);
  }
}

export async function getTweetsAPI() {
  await dbConnect();
  return Tweet.find().sort({ createdAt: -1 });
}
