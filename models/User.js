import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "You must provide a first name."],
      maxlength: [30, "Your name cannot exceed 30 characters."],
    },
    lastName: {
      type: String,
      required: [true, "You must provide a last name."],
      maxlength: [30, "Your name cannot exceed 30 characters."],
    },
    nickname: {
      type: String,
      required: [true, "You must provide a nickname."],
      maxlength: [30, "Your name cannot exceed 30 characters."],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: [75, "Your email cannot exceed 75 characters."],
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address."],
    },
    avatar: {
      type: String,
      required: false,
      maxlength: [59, "Filename cannot exceed 50 characters."],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export default mongoose.model("User", UserSchema);
