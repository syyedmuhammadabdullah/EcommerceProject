import { Router } from "express";
import { authMiddleware, roleCheckMiddleware,loginAdmin,registerAdmin,getAdmin } from "../index.js";

const adminRouter = Router();

adminRouter.get("/admin", authMiddleware, roleCheckMiddleware("admin"), getAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", registerAdmin);

export { adminRouter };