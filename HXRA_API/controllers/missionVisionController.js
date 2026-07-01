import MissionVision from "../models/MissionVisionModel.js";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
}).single("missionImage");


export const createMission = (req, res) => {
  upload(req, res, async function (err) {

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    try {

      const mission =
        await MissionVision.create({
          missionTitle:
            req.body.missionTitle,

          missionDescription:
            req.body.missionDescription,

          missionImage:
            req.file?.filename,
        });

      res.status(201).json({
        success: true,
        message:
          "Mission created successfully",
        data: mission,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};


export const getMissions = async (
  req,
  res
) => {
  try {

    const missions =
      await MissionVision.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMissionById =
  async (req, res) => {
    try {

      const mission =
        await MissionVision.findById(
          req.params.id
        );

      if (!mission) {
        return res.status(404).json({
          success: false,
          message:
            "Mission not found",
        });
      }

      res.status(200).json({
        success: true,
        data: mission,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


export const updateMission = (
  req,
  res
) => {
  upload(req, res, async function (err) {

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    try {

      console.log(
        "Update ID:",
        req.params.id
      );

      console.log(
        "Body:",
        req.body
      );

      console.log(
        "File:",
        req.file
      );

      const existingMission =
        await MissionVision.findById(
          req.params.id
        );

      if (!existingMission) {
        return res.status(404).json({
          success: false,
          message:
            "Mission not found",
        });
      }

      const updatedData = {
        missionTitle:
          req.body.missionTitle,

        missionDescription:
          req.body
            .missionDescription,

        missionImage:
          existingMission.missionImage,
      };

      // If new image uploaded
      if (req.file) {

        if (
          existingMission.missionImage &&
          fs.existsSync(
            `./uploads/${existingMission.missionImage}`
          )
        ) {
          fs.unlinkSync(
            `./uploads/${existingMission.missionImage}`
          );
        }

        updatedData.missionImage =
          req.file.filename;
      }

      const mission =
        await MissionVision.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            returnDocument:
              "after",
            runValidators: true,
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Mission updated successfully",
        data: mission,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  });
};

// ================= DELETE =================

export const deleteMission =
  async (req, res) => {
    try {

      const mission =
        await MissionVision.findById(
          req.params.id
        );

      console.log(mission);

      if (!mission) {
        return res.status(404).json({
          success: false,
          message:
            "Mission not found",
        });
      }

      // Delete image file
      if (
        mission.missionImage
      ) {
        const imagePath =
          "./uploads/" +
          mission.missionImage;

        if (
          fs.existsSync(
            imagePath
          )
        ) {
          fs.unlinkSync(
            imagePath
          );
        }
      }

      await MissionVision.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Mission deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };