import mongoose from "mongoose";
import { OrderModel, SellerWalletModel, SellerModel, rangeFormat,apiError,apiResponse,asyncHandler,orginizeChart } from "../../index.js";

export const getSellerDetailForAdmin =asyncHandler( async (req, res) => {
    console.log("getSellerDetailForAdmin runs", req.query);

  // 1️⃣ Seller basic info
  
  let sellerId;
  if (req?.query?.sellerId) {
    if (!mongoose.Types.ObjectId.isValid(req.query.sellerId)) {
      throw new apiError(400, "Invalid seller id");
    }
    sellerId = new mongoose.Types.ObjectId(req.query.sellerId);
  } 

  if (!sellerId) {
    return res.status(400).json({ message: "Seller id is required" });
  }

  const seller = await SellerModel.findById(sellerId).select(
    "storeDetails.storeName businessEmail accountStatus.status createdAt"
  );

  if (!seller) {
    return res.status(404).json({ message: "Seller not found" });
  }
  
  const { startDate, groupFormat } = rangeFormat(req.query.range);
  const orderAgg = await OrderModel.aggregate([
  {
    $match: {
      sellerId
    }
  },
  {
    $facet: {
      chartStats: [
        {
          $match: {
            orderDate: {
              $gte: startDate
            }
          }
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: groupFormat,
                  date: "$orderDate",
                }
              },
              status: "$status"
            },
            count: { $sum: 1 },
            amount: {
              $sum: {
                $subtract: [
                  { $ifNull: ["$totalPrice", 0] },
                  { $ifNull: ["$commissionAmount", 0] }
                ]
              }
            }
          }
        },
        { $sort: { "_id.date": 1 } }
      ],

      // ✅ SIRF DELIVERED STATS
      stats: [
        {
          $match: { status: "delivered" }
        },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalSales: { $sum: "$totalPrice" },
            totalCommission: { $sum: "$commissionAmount" }
          }
        }
      ]
    }
  }
]);


   const stats = orderAgg[0]?.stats[0] || {
    totalOrders: 0,
    totalSales: 0,
    totalCommission: 0,
  };

  let wallet = null;
  if (req.role === "admin" && sellerId) {
    wallet = await SellerWalletModel
      .findOne({ sellerId })
      .select("balance -_id");
  }

  res.status(200).json(
    new apiResponse(
      200,
      "Order found successfully",
      {
        chart: orginizeChart(orderAgg[0].chartStats, req.query.range,startDate),
        wallet,
          seller,

    stats: {
      totalOrders: stats.totalOrders,
      totalSales: stats.totalSales,
      totalCommission: stats.totalCommission,
      walletBalance: wallet?.balance || 0,
    },
      }
    )
  );
  // 4️⃣ Final response
  // res.status(200).json({
  
  // });
});