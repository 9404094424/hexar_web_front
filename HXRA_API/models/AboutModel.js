import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);