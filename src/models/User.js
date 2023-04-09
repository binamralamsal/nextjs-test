import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [100, "Tweet cannot be more than 100 characters."],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
      maxLength: [50, "Username cannot be more than 50 characters."],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      maxLength: [256, "Email cannot be more than 256 characters."],
      unique: [true, "Email already exists"],
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
