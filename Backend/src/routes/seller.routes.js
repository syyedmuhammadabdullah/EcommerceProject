import { Router } from "express";
import { createSeller,loginSeller, updateSellerDetails } from "../index.js";
const sellerRouter = Router();

sellerRouter.post("/createSeller", createSeller);
sellerRouter.post("/loginSeller", loginSeller);
sellerRouter.post("/updateSellerDetails", updateSellerDetails);

export { sellerRouter };