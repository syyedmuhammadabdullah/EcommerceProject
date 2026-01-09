import {apiError,apiResponse ,asyncHandler,OrderModel} from "../../index.js";
import mongoose from "mongoose";
const getSellerAllOrders=asyncHandler(async(req,res)=>{
    const {filter,page=1,limit=10,sellerId,search=""}=req.query
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
  throw new apiError(400, "Invalid seller id");
}
      let query={
    sellerId:new mongoose.Types.ObjectId(sellerId)
  };
    if (req.query.filter && req.query.filter !== "all" && req.query.filter !== "undefined" && req.query.filter !== "null") {
      query.status = req.query.filter;  // Apply the filter to your query
  };
   const orders=await OrderModel.aggregate([
        { $match: query },
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
            $match:{
                "userId.fullName":{ $regex: search, $options: "i" }
            }
        },
        {
            $project:{
                "_id":1,
                "userId.fullName":1,
                "sellerId":1,
                "commissionAmount":1,
                "status":1,
                "totalItems":1,
                "totalPrice":1
            }
        },
        // {
        //     $skip:(page-1)*limit
        // },
        // {
        //     $limit:limit
        // }
    ])
    if(!orders){
        return res.status(400).json(new apiError(400,"Orders not found"));
    }
    console.log(orders);

    res.status(200).json(new apiResponse(200,"Orders found successfully",{orders,sellerId}));
})
export {getSellerAllOrders}