import mongoose from "mongoose";
import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";

const getCustomerOrders=asyncHandler(async(req,res)=>{
    
    const {filter,page,limit,userId,search="" }=req.query
    let query={
        userId:new mongoose.Types.ObjectId(userId)
    };
    if (filter && filter!=="all") {
        query.status=filter
    };
    const orders=await OrderModel.aggregate([
        {
            $match:query
        },
        {
            $lookup: {
                from: "sellermodels",
                localField: "sellerId",
                foreignField: "_id",
                as: "sellerId"
            }
        },
        {
            $match: {
                "sellerId.storeDetails.storeName": { $regex: search, $options: "i" }
            }
        },
        {
            $unwind: "$sellerId"
        },
        {
            $project: {
                "_id": 1,
                "sellerId.storeDetails.storeName": 1,
                "status": 1,
                "totalItems": 1,
                "totalPrice": 1
            }
        },
        // {
        //     $skip: (page - 1) * limit
        // },
        // {
        //     $limit: limit
        // }
        
        
    ])
    
    if(!orders){
        return res.status(400).json(new apiError(400,"Orders not found"));
    }
    
    res.status(200).json(new apiResponse(200,"Orders found successfully",{orders,userId}));
})
export {getCustomerOrders}