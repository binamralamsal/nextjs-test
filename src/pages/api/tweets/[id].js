import Tweet from "@/models/Tweet";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const tweet = await getTweetsFromIdAPI(req.query.id);

    res.status(200).json(tweet);
  }

  if (req.method === "DELETE") {
    await Tweet.deleteOne({ _id: req.query.id });

    res.status(200).json({ message: "Tweet deleted" });
  }
}

export async function getTweetsFromIdAPI(id) {
  await dbConnect();

  return Tweet.findById(id);
}
