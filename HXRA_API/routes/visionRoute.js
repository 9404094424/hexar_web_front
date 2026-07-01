import express from "express";

import {
  createVision,
  getVisions,
  getVisionById,
  updateVision,
  deleteVision,
} from "../controllers/VisionController.js";

const routerVision =
  express.Router();

routerVision
  .post("/", createVision)
  .get("/", getVisions)
  .get("/:id", getVisionById)
  .put("/:id", updateVision)
  .delete("/:id", deleteVision);

export default routerVision;