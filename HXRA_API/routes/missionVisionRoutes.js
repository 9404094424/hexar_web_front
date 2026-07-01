import express from "express";

import {
    createMission,
    getMissions,
    getMissionById,
    updateMission,
    deleteMission,
} from "../controllers/MissionVisionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    authMiddleware,
    createMission
);

router.get(
    "/",
    getMissions
);

router.get(
    "/:id",
    getMissionById
);

router.put(
    "/:id",
    authMiddleware,
    updateMission
);

router.delete(
    "/:id",
    authMiddleware,
    deleteMission
);

export default router;