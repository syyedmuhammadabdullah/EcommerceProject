import { Router } from "express";
import { SellerModel } from "../models/seller.model.js";
import { apiResponse } from "../utlis/apiResponse.js";
import { generateTokens } from "../utlis/generateTokens.js";
const sellerRouter = Router();

sellerRouter.post("/register", async(req, res) => {
   await SellerModel.create({
        name: "Ali",
        email: "ali@gmail.com",
        password: "123456",
        
    })
});
sellerRouter.post("/login", async(req, res) => {
   let seller=await SellerModel.findOne({ email:  "ali@gmail.com"})
   // req.seller=seller;
   res.json(new apiResponse(200, "Login successful", seller));


});

export { sellerRouter };