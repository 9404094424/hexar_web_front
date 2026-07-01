import mongoose from "mongoose";

const missionVisionSchema = new mongoose.Schema(
  {
    missionTitle: String,
    missionDescription: String,
    missionImage: String,

  },
  { timestamps: true }
);

export default mongoose.model(
  "MissionVision",
  missionVisionSchema
);