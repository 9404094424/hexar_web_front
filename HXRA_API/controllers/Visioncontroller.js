import Vision from "../models/VisionModel.js";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
}).single("visionImage");


export const createVision = (
  req,
  res
) => {
  upload(req, res, async function (err) {

    if (
      err instanceof multer.MulterError
    ) {
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

      const vision =
        await Vision.create({
          visionTitle:
            req.body.visionTitle,

          visionDescription:
            req.body
              .visionDescription,

          visionImage:
            req.file?.filename,
        });

      res.status(201).json({
        success: true,
        message:
          "Vision created successfully",
        data: vision,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  });
};


export const getVisions =
  async (req, res) => {
    try {

      const visions =
        await Vision.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: visions.length,
        data: visions,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


export const getVisionById =
  async (req, res) => {
    try {

      const vision =
        await Vision.findById(
          req.params.id
        );

      if (!vision) {
        return res.status(404).json({
          success: false,
          message:
            "Vision not found",
        });
      }

      res.status(200).json({
        success: true,
        data: vision,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


export const updateVision = (
  req,
  res
) => {
  upload(req, res, async function (err) {

    if (
      err instanceof multer.MulterError
    ) {
      return res.status(400).json({
        success: false,
        message:
          err.message,
      });
    }

    if (err) {
      return res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }

    try {

      const existingVision =
        await Vision.findById(
          req.params.id
        );

      if (!existingVision) {
        return res.status(404).json({
          success: false,
          message:
            "Vision not found",
        });
      }

      const updatedData = {
        visionTitle:
          req.body.visionTitle,

        visionDescription:
          req.body
            .visionDescription,

        visionImage:
          existingVision.visionImage,
      };

      if (req.file) {

        if (
          existingVision.visionImage &&
          fs.existsSync(
            `./uploads/${existingVision.visionImage}`
          )
        ) {
          fs.unlinkSync(
            `./uploads/${existingVision.visionImage}`
          );
        }

        updatedData.visionImage =
          req.file.filename;
      }

      const vision =
        await Vision.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
            runValidators: true,
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Vision updated successfully",
        data: vision,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  });
};


export const deleteVision =
  async (req, res) => {
    try {

      const vision =
        await Vision.findById(
          req.params.id
        );

      if (!vision) {
        return res.status(404).json({
          success: false,
          message:
            "Vision not found",
        });
      }

      if (
        vision.visionImage
      ) {
        const imagePath =
          "./uploads/" +
          vision.visionImage;

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

      await Vision.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Vision deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };