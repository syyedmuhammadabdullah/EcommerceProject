import { Router } from "express";
import { createSeller,loginSeller } from "../index.js";
const sellerRouter = Router();

sellerRouter.post("/createSeller", createSeller);
sellerRouter.post("/loginSeller", loginSeller);

export { sellerRouter };