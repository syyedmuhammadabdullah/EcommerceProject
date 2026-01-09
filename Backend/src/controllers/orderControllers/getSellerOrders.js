import {apiError,asyncHandler,apiResponse,OrderModel} from "../../index.js";

const getSellerOrders=asyncHandler(async(req,res)=>{
 

  let query={
    sellerId:req.seller.sellerId
  };
    if (req.query.filter && req.query.filter !== "all" && req.query.filter !== "undefined" && req.query.filter !== "null") {
      query.status = req.query.filter;  // Apply the filter to your query
  };
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    

    const totalOrders = await OrderModel.countDocuments(query);
      const total = totalOrders || 0;
    
      const orders = await OrderModel.aggregate([
        { $match: query }, // Match seller's orders
        {
          $lookup: {
            from: "usermodels", // Collection name in MongoDB
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        { $unwind: "$userId" }, // Flatten the userInfo array
        {
          $match: {
            "userId.fullName": { $regex: req.query.search || "", $options: "i" }, // Case-insensitive name search
          },
        },
        {
          $sort:{orderDate:-1},
        },
        {
          $project: {
            status: 1,
            "userId.fullName": 1,
            "userId._id": 1,
            "commissionAmount": 1,
            "totalItems":1,
            "totalPrice":1
          }, // Project only needed fields
        },
        { $skip: (page - 1) * limit }, // Add pagination logic here if needed
        { $limit: limit },
      ]);
    if (!orders) {
        throw new apiError(404,"Orders not found");
    }
    
    res.status(200).json(new apiResponse(200,"Orders found successfully",orders,total))
})
export {getSellerOrders}