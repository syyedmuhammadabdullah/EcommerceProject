import { Router } from "express";
import { createSeller,loginSeller, updateSellerDetails, roleCheckMiddleware, authMiddleware, getSellerDetailForAdmin,getSellerProductsQuestion,getAllSellerCustomers, apiResponse,getSeller, uploadMiddleware, updateSellerStatus, getAllSellers } from "../index.js";
const sellerRouter = Router();

sellerRouter.post("/createSeller", createSeller);
sellerRouter.post("/loginSeller", loginSeller);
sellerRouter.put("/updateSellerDetails/:sellerId", authMiddleware,roleCheckMiddleware("seller"),uploadMiddleware.fields([{name:"storeLogo",maxCount:1},{name:"storeBanner",maxCount:1}]),updateSellerDetails);
sellerRouter.put("/test/rtr",(req,res)=>{
    res.status(200).json(new apiResponse(200,"user is logged in",req.params));
})
sellerRouter.get("/getSellerProductsQuestion",authMiddleware,roleCheckMiddleware("seller"),getSellerProductsQuestion)
sellerRouter.get("/getAllSellerCustomers",authMiddleware,roleCheckMiddleware("seller"),getAllSellerCustomers)
sellerRouter.get("/getSeller",authMiddleware,roleCheckMiddleware("seller"),getSeller)
sellerRouter.post("/updateSellerStatus",authMiddleware,roleCheckMiddleware("admin"),updateSellerStatus)
sellerRouter.get("/getAllSellers",authMiddleware,roleCheckMiddleware("admin"),getAllSellers)
sellerRouter.get("/getSellerDetailForAdmin",authMiddleware,roleCheckMiddleware("admin"),getSellerDetailForAdmin)
export { sellerRouter };