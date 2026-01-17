import { v2 as cloudinary } from "cloudinary";
import { apiError } from "../index.js";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });

        fs.unlinkSync(filePath);

        return result;

    } catch (error) {

        fs.unlinkSync(filePath);

        throw new apiError(500, error);
    }
};

const deleteOnCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        // delete the file on cloudinary
        const response = await cloudinary.uploader.destroy(publicId);
        // file has been deleted successfull
        return response;
    } catch (error) {
        return error;
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
