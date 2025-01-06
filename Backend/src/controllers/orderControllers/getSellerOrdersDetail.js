import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";
const getSellerOrdersDetail=asyncHandler(async(req,res)=>{
    console.log("get seller orders detail runs",req.seller.sellerId);
    
    const order=await OrderModel.aggregate([
        {
          $match: {
            sellerId:req.seller.sellerId
          }
        },
        {
          // Stage 1: Group orders to calculate total metrics
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalSales: {
              $sum: { $cond: [{ $eq: ["$status", "delivered"] }, "$totalPrice", 0] }
            },
            totalSuccessfulOrders: {
              $sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] }
            },
            totalPendingOrders: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
            }
          }
        },
        {
          // Stage 2: Add 5 recent orders as a separate field
          $lookup: {
            from: "ordermodels",
            let: {},
            pipeline: [
              { $sort: { orderDate: -1 } }, // Sort by order date in descending order
              { $limit: 5 }, // Limit to 5 recent orders
             {
              $unwind: "$products"
             },
              {
                $lookup: {
                  from: "usermodels",
                  localField: "userId",
                  foreignField: "_id",
                  as: "userInfo"
                },
                
              },
              {
                $addFields: {
                  userName: { $arrayElemAt: ["$userInfo.fullName", 0] }
                }
              },
              {
                $project: {
                  _id: 1,
                  userName: 1,
                  totalPrice: 1,
                  totalItems: 1,
                  status: 1,
                  orderDate: 1,
                }
              }
            ],
            as: "recentOrders"
          }
        },
        {
          // Stage 3: Reshape the output to match the desired format
          $project: {
            _id: 0,
            totalOrders: 1,
            totalSales: 1,
            totalSuccessfulOrders: 1,
            recentOrders: 1,
            totalPendingOrders: 1
          }
        }
      ]);
      
    if(!order){
        throw new apiError(404,"Order not found");
    }
    res.status(200).json(new apiResponse(200,"Order found successfully",order))
})
export {getSellerOrdersDetail}