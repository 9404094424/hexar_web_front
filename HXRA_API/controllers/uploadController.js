export const uploadImage = async (req, res) => {
    try {

        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        res.status(200).json({
            success: true,
            imageUrl:
                `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};