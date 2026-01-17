import mongoose from "mongoose";
import {
  apiError,
  apiResponse,
  asyncHandler,
  OrderModel,
  SellerWalletModel,
  rangeFormat,
  orginizeChart
} from "../../index.js";


const getSellerOrdersDetail = asyncHandler(async (req, res) => {

  let sellerId;
  if (req?.query?.sellerId) {
    if (!mongoose.Types.ObjectId.isValid(req.query.sellerId)) {
      throw new apiError(400, "Invalid seller id");
    }
    sellerId = new mongoose.Types.ObjectId(req.query.sellerId);
  } else {
    sellerId = req.seller.sellerId;
  }

  const { startDate, groupFormat } = rangeFormat(req.query.range);

const chartStats = await OrderModel.aggregate([
  {
    $match: {
      sellerId,
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
      amount: {
  $sum: {
    
        $subtract: [
          { $ifNull: ["$totalPrice", 0] },
          { $ifNull: ["$commissionAmount", 0] }
        ]
      
  }
},
    }
  },
  { $sort: { "_id.date": 1 } }
]);

console.log("order stats for seller",chartStats);

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
        chart: orginizeChart(chartStats, req.query.range,startDate),
        wallet
      }
    )
  );
});

export { getSellerOrdersDetail };
