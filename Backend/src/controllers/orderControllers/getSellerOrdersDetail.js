import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";

const orginizeChart=(chartStats)=>{
const labelsSet = new Set();
const delivered = {};
const pending = {};
const refunded = {};
let totalItems = 0;
let totalPendingOrders = 0;
let totalDeliveredOrders = 0;

chartStats.forEach(item => {
  const date = item._id.date;
  const status = item._id.status;

  labelsSet.add(date);
  totalItems +=item.count
  if (status === "delivered") {
    delivered[date] = (delivered[date] || 0) + item.amount;
    totalDeliveredOrders += item.count
  }

  if (status === "pending") {
    pending[date] = (pending[date] || 0) + item.amount;
    totalPendingOrders += item.count
  }

  if (status === "refunded") {
    refunded[date] = (refunded[date] || 0) + item.amount;
  }
});

const labels = [...labelsSet].sort();


const response = {
  labels,
  totalItems,
  totalPendingOrders,
  totalDeliveredOrders,
  delivered: labels.map(d => delivered[d] || 0),
  pending: labels.map(d => pending[d] || 0),
  refunded: labels.map(d => refunded[d] || 0)
};

return response

}

const getSellerOrdersDetail=asyncHandler(async(req,res)=>{
    // const order=await OrderModel.aggregate([
    //     {
    //       $match: {
    //         sellerId:req.seller.sellerId
    //       }
    //     },
    //     {
    //       // Stage 1: Group orders to calculate total metrics
    //       $group: {
    //         _id: null,
    //         totalOrders: { $sum: 1 },
    //         totalSales: {
    //           $sum: { $cond: [{ $eq: ["$status", "delivered"] }, "$totalPrice", 0] }
    //         },
    //         totalSuccessfulOrders: {
    //           $sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] }
    //         },
    //         totalPendingOrders: {
    //           $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
    //         }
    //       }
    //     },
    //     {
    //       // Stage 2: Add 5 recent orders as a separate field
    //       $lookup: {
    //         from: "ordermodels",
    //         let: {},
    //         pipeline: [
    //           { $sort: { orderDate: -1 } }, // Sort by order date in descending order
    //           { $limit: 5 }, // Limit to 5 recent orders
    //          {
    //           $unwind: "$products"
    //          },
    //           {
    //             $lookup: {
    //               from: "usermodels",
    //               localField: "userId",
    //               foreignField: "_id",
    //               as: "userInfo"
    //             },
                
    //           },
    //           {
    //             $addFields: {
    //               userName: { $arrayElemAt: ["$userInfo.fullName", 0] }
    //             }
    //           },
    //           {
    //             $project: {
    //               _id: 1,
    //               userName: 1,
    //               totalPrice: 1,
    //               totalItems: 1,
    //               status: 1,
    //               orderDate: 1,
    //             }
    //           }
    //         ],
    //         as: "recentOrders"
    //       }
    //     },
    //     {
    //       // Stage 3: Reshape the output to match the desired format
    //       $project: {
    //         _id: 0,
    //         totalOrders: 1,
    //         totalSales: 1,
    //         totalSuccessfulOrders: 1,
    //         recentOrders: 1,
    //         totalPendingOrders: 1
    //       }
    //     }
    //   ]);
      let groupFormat;
    const range=req.query.range;

switch (range) {
  case"daily":
    groupFormat = "%Y-%m-%d %H";
    break;
  case "weekly":
    groupFormat = "%Y-%m-%d";
    break;

  case "monthly":
    groupFormat = "%Y-%U"; // week number

    break;

  case "6 months":
    groupFormat = "%Y-%m";
    break;

  default:
    groupFormat = "%Y-%m-%d";
}
const now = new Date();
let startDate;

if (range === "daily") {
  startDate = new Date(now.setHours(now.getHours() - 24)); // last 24 hours
}else if (range === "weekly") {
  startDate = new Date(now.setDate(now.getDate() -7)); // last 7 days
}
else if (range === "monthly") {
  
  startDate = new Date(now.setDate(now.getDate() - 30));
}
else if (range === "6 months") {
  startDate = new Date(now.setMonth(now.getMonth() - 6));
}



 const chartStats = await OrderModel.aggregate([
  {
    $match: {
      sellerId: req.seller.sellerId,
      orderDate: { $gte: startDate }
    }
  },
  {
    $group: {
      _id: {
        date: {
          $dateToString: {
            format: groupFormat,
            date: "$updatedAt"
          }
        },
        status: "$status"
      },
      count: { $sum: 1 },
      amount: { $sum: "$totalPrice" }
    }
  },
  { $sort: { "_id.date": 1 } }
]).catch((error) => {
  console.error("Error fetching chart stats:", error);
  throw new apiError(500, "Failed to fetch chart stats",error);
});
const response=orginizeChart(chartStats);


    res.status(200).json(new apiResponse(200,"Order found successfully",response))
})
export {getSellerOrdersDetail}