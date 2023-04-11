import Tweet from "@/models/Tweet";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ status: "ERROR", message: "Unauthorized" });
    }

    const newTweet = await Tweet.create({
      tweet: req.body.tweet,
      author: session.user.id,
    });

    res.revalidate(`/profile/${session.user.username}`);
    res.status(201).json(newTweet);
  }
}
