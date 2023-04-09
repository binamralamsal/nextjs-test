import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    tweet: {
      type: String,
      required: [true, "Please provide content for this tweet."],
      maxLength: [2000, "Tweet cannot be more than 2000 characters."],
    },
    author: {
      type: String,
      required: [true, "Please provide an author for this tweet."],
      maxLength: [50, "Author cannot be more than 50 characters."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
