import mongoose from "mongoose";
import { OrderModel, SellerWalletModel, SellerModel } from "../../index.js";

export const getSellerDetailForAdmin = async (req, res) => {
    console.log("getSellerDetailForAdmin runs", req.query);
    
  const { sellerId } = req.query;

  const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

  // 1️⃣ Seller basic info
  const seller = await SellerModel.findById(sellerId).select(
    "storeDetails.storeName businessEmail accountStatus.status createdAt"
  );

  if (!seller) {
    return res.status(404).json({ message: "Seller not found" });
  }

  // 2️⃣ Orders aggregation (ONE CALL)
  const orderStats = await OrderModel.aggregate([
    {
      $match: {
        sellerId: sellerObjectId,
        status: "delivered", // only completed orders
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
        totalCommission: { $sum: "$commissionAmount" },
      },
    },
  ]);

  const stats = orderStats[0] || {
    totalOrders: 0,
    totalSales: 0,
    totalCommission: 0,
  };

  // 3️⃣ Wallet (ONE CALL)
  const wallet = await SellerWalletModel.findOne({ sellerId });

  // 4️⃣ Final response
  res.status(200).json({
    seller,
    stats: {
      totalOrders: stats.totalOrders,
      totalSales: stats.totalSales,
      totalCommission: stats.totalCommission,
      walletBalance: wallet?.balance || 0,
    },
  });
};
