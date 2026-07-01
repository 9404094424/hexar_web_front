import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import missionVisionRoutes from "./routes/missionVisionRoutes.js";
import createDefaultAdmin from "./utils/createDefaultAdmin.js";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import routerVision from "./routes/visionRoute.js";

dotenv.config();

const app = express();

const startServer = async () => {
    await connectDB();
    await createDefaultAdmin();

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
};

startServer();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hexar CMS API Running");
});

// Static folder for uploaded images
app.use(
    "/uploads",
    express.static(
        path.join(process.cwd(), "uploads")
    )
);
app.use("/api/admin", authRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/mission", missionVisionRoutes);
app.use("/api/vision", routerVision);

// app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});