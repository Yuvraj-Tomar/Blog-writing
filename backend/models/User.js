import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      fieldOfWork: { type: String },
      aboutMe: { type: String },
      socialLink: { type: String },
      profileImage: { type: String } // This will store the image path
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;