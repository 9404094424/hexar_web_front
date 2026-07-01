import Banner from "../models/BannerModel.js";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");


export const createBanner = (req, res) => {
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
      const banner = await Banner.create({
        ...req.body,
        image: req.file?.filename,
      });

      res.status(201).json({
        success: true,
        message: "Banner created successfully",
        data: banner,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};


export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateBanner = (req, res) => {
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
      console.log("Update ID:", req.params.id);
      console.log("Body:", req.body);
      console.log("File:", req.file);

      const existingBanner = await Banner.findById(req.params.id);

      if (!existingBanner) {
        return res.status(404).json({
          success: false,
          message: "Banner not found",
        });
      }

      const updatedData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: existingBanner.image,
      };

      if (req.file) {
        if (
          existingBanner.image &&
          fs.existsSync(`./uploads/${existingBanner.image}`)
        ) {
          fs.unlinkSync(`./uploads/${existingBanner.image}`);
        }

        updatedData.image = req.file.filename;
      }

      const banner = await Banner.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        data: banner,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};


export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    console.log(banner);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Delete image file
    if (banner.image) {
      const imagePath =
        "./uploads/" + banner.image;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Banner.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};