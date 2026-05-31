import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";

const getAllOrders=asyncHandler(async(req,res)=>{
    const {filter,search=""}=req.query
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    let query={};
    
    if (filter && filter!=="all") {
        query.status=filter
    }
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
            $unwind: "$sellerId"
        },
        {
            $lookup: {
                from: "usermodels",
                localField: "userId",
                foreignField: "_id",
                as: "userId"
            }
        },
        {
            $unwind: "$userId"
        },
        {
            $match: {
                $or: [
                    { "userId.fullName": { $regex: search, $options: "i" } },
                    { "sellerId.storeDetails.storeName": { $regex: search, $options: "i" } }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                "userId.fullName": 1,
                "sellerId.storeDetails.storeName": 1,
                "status": 1,
                "totalItems": 1,
                "totalPrice": 1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ])
    const totalOrders = await OrderModel.countDocuments(query);
    if(!orders){
        return res.status(400).json(new apiError(400,"Orders not found"));
    }
    res.status(200).json(new apiResponse(200,"Orders found successfully",orders,totalOrders));
})
export {getAllOrders}