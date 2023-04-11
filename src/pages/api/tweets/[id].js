import Tweet from "@/models/Tweet";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const tweet = await getTweetFromIdAPI(req.query.id);

    res.status(200).json(tweet);
  }

  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ status: "ERROR", message: "Unauthorized" });
    }

    await Tweet.deleteOne({ _id: req.query.id, author: session.user.id });
    res.revalidate(`/profile/${session.user.username}`);

    res.status(200).json({ message: "Tweet deleted" });
  }
}

export async function getTweetFromIdAPI(id) {
  await dbConnect();

  return Tweet.findById(id).populate("author", "fullName username");
}
