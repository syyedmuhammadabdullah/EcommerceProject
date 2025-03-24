import { Router } from "express";
import { createSeller,loginSeller, updateSellerDetails, roleCheckMiddleware, authMiddleware,getSellerProductsQuestion,getAllSellerCustomers, apiResponse,getSeller } from "../index.js";
const sellerRouter = Router();

sellerRouter.post("/createSeller", createSeller);
sellerRouter.post("/loginSeller", loginSeller);
sellerRouter.put("/updateSellerDetails/:sellerId", authMiddleware,roleCheckMiddleware("seller"),updateSellerDetails);
sellerRouter.put("/test/rtr",(req,res)=>{
    res.status(200).json(new apiResponse(200,"user is logged in",req.params));
})
sellerRouter.get("/getSellerProductsQuestion",authMiddleware,roleCheckMiddleware("seller"),getSellerProductsQuestion)
sellerRouter.get("/getAllSellerCustomers",authMiddleware,roleCheckMiddleware("seller"),getAllSellerCustomers)
sellerRouter.get("/getSeller",authMiddleware,roleCheckMiddleware("seller"),getSeller)

export { sellerRouter };