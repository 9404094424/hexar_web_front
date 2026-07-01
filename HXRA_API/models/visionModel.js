import mongoose from "mongoose";

const visionSchema = new mongoose.Schema(
  {
    visionTitle: String,
    visionDescription: String,
    visionImage: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Vision",
  visionSchema
);