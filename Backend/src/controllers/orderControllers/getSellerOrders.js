import {apiError,asyncHandler,apiResponse,OrderModel} from "../../index.js";

const getSellerOrders=asyncHandler(async(req,res)=>{
 

  let query={
    sellerId:req.seller.sellerId
  };
  const shipmentStatus=req?.query?.shipmentStatus
  const refundStatus=req?.query?.refundStatus
  if (shipmentStatus===undefined && req.query.filter!==undefined) {
    if ( req.query.filter === "all" || req.query.filter === undefined|| req.query.filter === null) {
      query.status = {
        $in: ["pending", "processing", "shipped", "completed", "cancelled", "rejected"]
      }
      console.log("order status is ",query);
      
  }else{
    query.status=req.query.filter
  } 
  }
  
if (shipmentStatus!==undefined&&req.query.filter===undefined ) {
  if (shipmentStatus==="all" || shipmentStatus ===undefined|| shipmentStatus===null) {
  query.shipmentStatus = {
    $in: ["packed", "shipped", "out for delivery", "delivered"]
  };
  console.log("the shipment status is ",query);
  }else{
    query.shipmentStatus=shipmentStatus
  }
}
if (refundStatus!==undefined&&(req.query.filter===undefined&&shipmentStatus===undefined) ) {
  if (refundStatus==="all" || refundStatus ===undefined|| refundStatus===null) {
  query.refundStatus = {
    $in: ["requested", "approved", "processing", "partially refunded" ,"refunded","rejected"]
  };
  console.log("the Refund status is ",query);
  }else{
    query.refundStatus=refundStatus
  }
}
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
            "totalPrice":1,
            "shipmentStatus":1,
            "refundStatus":1
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