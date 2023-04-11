import { hash, genSalt } from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  if (req.method === "GET") {
    const { username } = req.query;

    const user = await getUserByUsernameAPI(username);
    if (!user)
      return res
        .status(404)
        .json({ status: "ERROR", message: "User not found!" });

    return res.status(200).json(user);
  }
}

export async function getUserByUsernameAPI(username) {
  await dbConnect();

  return User.findOne({ username }).select("-password");
}
