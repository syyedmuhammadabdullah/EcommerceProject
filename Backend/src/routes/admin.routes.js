import { Router } from "express";
import { authMiddleware, roleCheckMiddleware,loginAdmin,createAdmin,getAdmin } from "../index.js";

const adminRouter = Router();

adminRouter.get("/getAdmin", authMiddleware, roleCheckMiddleware("admin"), getAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", createAdmin);

export { adminRouter };