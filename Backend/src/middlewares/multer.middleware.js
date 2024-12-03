import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("multer runs");
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        console.log("multer runs");

    },
});
export const uploadMiddleware = multer({ storage });
