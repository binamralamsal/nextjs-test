import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [100, "Tweet cannot be more than 100 characters."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      maxLength: [256, "Email cannot be more than 256 characters."],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
