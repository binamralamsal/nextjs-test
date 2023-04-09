import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          await dbConnect();
        } catch (err) {
          throw new Error("Internal server error");
        }

        // check user existance
        const user = await User.findOne({
          $or: [
            { email: credentials.email },
            { username: credentials.username },
          ],
        });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Username or Password doesn't match");
        }

        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
});
