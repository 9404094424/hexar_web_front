import express from "express";

import {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createBanner
);

router.get(
  "/",
  getBanners
);

router.get(
  "/:id",
  getBannerById
);

router.put(
  "/:id",
  authMiddleware,
  updateBanner
);

router.delete(
  "/:id",
  authMiddleware,
  deleteBanner
);

export default router;