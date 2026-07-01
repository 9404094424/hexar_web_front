import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";

const createDefaultAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({
            username: "admin"
        });

        if (adminExists) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(
            "admin123",
            10
        );

        await Admin.create({
            username: "admin",
            password: hashedPassword
        });

        console.log("Default admin created");
    }
    catch (error) {
        console.log(error.message);
    }
};

export default createDefaultAdmin;