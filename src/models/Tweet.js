import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    tweet: {
      type: String,
      required: [true, "Please provide content for this tweet."],
      maxLength: [2000, "Tweet cannot be more than 2000 characters."],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an author for this tweet."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
