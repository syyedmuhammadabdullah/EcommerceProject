import {apiError,apiResponse,asyncHandler,SellerTransactionModel} from "../../index.js";

const getSellerTransaction=asyncHandler(async(req,res)=>{
   
  const sellerTransaction = await SellerTransactionModel.aggregate([
  {
    $match: {
      sellerId: req.seller.sellerId,
    }
  },
  {
    $sort: { createdAt: -1 }
  },
  {
    $facet: {
      refunded: [
        { $match: { type: "refund" } },
        { $limit: 5 }
      ],
      order_payment: [
        { $match: { type: "order_payment" } },
        { $limit: 5 }
      ],
      withdrawn: [
        { $match: { type: "withdrawal" } },
        { $limit: 5 }
      ]
    }
  }
]);
    res.status(200).json(new apiResponse(200,"Seller transaction found successfully",sellerTransaction));
})
export {getSellerTransaction}