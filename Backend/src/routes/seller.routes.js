import { Router } from "express";
import { createSeller,SellerModel,apiResponse } from "../index.js";
const sellerRouter = Router();

sellerRouter.post("/createSeller", createSeller);
sellerRouter.post("/login", async(req, res) => {
   let seller=await SellerModel.findOne({ email:  "ali@gmail.com"})
   // req.seller=seller;
   res.json(new apiResponse(200, "Login successful", seller));


});

export { sellerRouter };