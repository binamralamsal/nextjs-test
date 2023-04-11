import Tweet from "@/models/Tweet";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const filter = {};
    if (req.query.userId) filter.author = req.query.userId;

    const tweets = await getTweetsAPI(filter);

    res.status(200).json(tweets);
  }
}

export async function getTweetsAPI(filter = {}) {
  await dbConnect();

  return Tweet.find(filter)
    .populate("author", "fullName username")
    .sort({ createdAt: -1 });
}
