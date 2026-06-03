import {apiError,apiResponse,asyncHandler,SellerModel} from "../../index.js";

const getAllSellers=asyncHandler(async(req,res)=>{
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const search=req.query.search || "";
    const sellers=await SellerModel.find({"storeDetails.storeName": { $regex:search, $options: "i" }}).populate({path:"userId",select:"fullName -_id"}).select("storeDetails.storeDescription storeDetails.storeName storeDetails.storeLogo verification.isVerified performanceMetrics accountStatus.status accountStatus.createdAt").skip((page-1)*limit).limit(limit);
    
    const total=await SellerModel.countDocuments();
    res.status(200).json(new apiResponse(200,"Sellers found successfully",sellers, total));
})
export {getAllSellers}