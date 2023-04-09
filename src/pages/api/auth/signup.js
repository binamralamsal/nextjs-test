import { hash, genSalt } from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  if (req.method === "POST") {
    const { email, password, fullName, username } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user)
      return res
        .status(422)
        .json({ status: "ERROR", message: "User already exists!" });

    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const newUser = await User.create({
      email,
      username,
      fullName,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  }
}
