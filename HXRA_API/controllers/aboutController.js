import About from "../models/AboutModel.js";
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


export const createAbout = (req, res) => {
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
            const about = await About.create({
                ...req.body,
                image: req.file?.filename,
            });

            res.status(201).json({
                success: true,
                message: "About created successfully",
                data: about,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    });
};


export const getAllAbout = async (req, res) => {
    try {

        const abouts = await About.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: abouts.length,
            data: abouts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAboutById = async (req, res) => {
    try {

        const about = await About.findById(req.params.id);

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About not found",
            });
        }

        res.status(200).json({
            success: true,
            data: about,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const updateAbout = (req, res) => {
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

            const existingAbout = await About.findById(req.params.id);

            if (!existingAbout) {
                return res.status(404).json({
                    success: false,
                    message: "About not found",
                });
            }

            const updatedData = {
                title: req.body.title,
                description: req.body.description,
                image: existingAbout.image,
            };

            if (req.file) {
                if (
                    existingAbout.image &&
                    fs.existsSync(`./uploads/${existingAbout.image}`)
                ) {
                    fs.unlinkSync(`./uploads/${existingAbout.image}`);
                }

                updatedData.image = req.file.filename;
            }

            const about = await About.findByIdAndUpdate(
                req.params.id,
                updatedData,
                {
                    returnDocument: "after",
                    runValidators: true,
                }
            );

            return res.status(200).json({
                success: true,
                message: "About updated successfully",
                data: about,
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



export const deleteAbout = async (req, res) => {
    try {

        const about = await About.findById(
            req.params.id
        );

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About not found",
            });
        }

        // Delete image
        if (about.image) {

            const imagePath =
                "./uploads/" + about.image;

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await About.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "About deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};