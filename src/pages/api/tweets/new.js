import Tweet from "@/models/Tweet";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const newTweet = await Tweet.create({
      tweet: req.body.tweet,
      author: req.body.author,
    });

    res.status(201).json(newTweet);
  }
}
