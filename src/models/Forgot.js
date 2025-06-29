import mongoose from "mongoose";

const ForgotSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
