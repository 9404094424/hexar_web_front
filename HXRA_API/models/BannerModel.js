import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);