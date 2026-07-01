import express from "express";

import {
    createAbout,
    getAllAbout,
    getAboutById,
    updateAbout,
    deleteAbout
} from "../controllers/aboutController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createAbout
);

router.get(
    "/",
    getAllAbout
);

router.get(
    "/:id",
    getAboutById
);

router.put(
    "/:id",
    authMiddleware,
    updateAbout
);

router.delete(
    "/:id",
    authMiddleware,
    deleteAbout
);

export default router;