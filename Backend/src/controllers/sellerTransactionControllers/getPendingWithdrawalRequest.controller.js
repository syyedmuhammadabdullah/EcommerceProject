import {apiError, apiResponse, asyncHandler, SellerTransactionModel} from "../../index.js";

const getPendingWithdrawalRequest = asyncHandler(async (req, res) => {
    const {page=1,limit=10,search=""}=req.query
 
    
        const pendingWithdrawals = await SellerTransactionModel.aggregate([
            {
                $match: {
                    type: "withdrawal",
                    status:"pending",
                },
            },
            {
                $lookup: {
                    from: "sellermodels",
                    localField: "sellerId",
                    foreignField: "_id",
                    as: "sellerId",
                },
            },
            {
                $unwind: "$sellerId",
            },
            {
                $match: {
                    "sellerId.storeDetails.storeName": { $regex: search, $options: "i" }
                }
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    status: 1,
                    type: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "sellerId.storeDetails.storeName":1
                },
            },
            // {
            //     $skip: (page - 1) * limit,
            // },
            // {
            //     $limit: limit,
            // },
        ])
        res.status(200).json(new apiResponse(200, "Pending withdrawals found successfully", pendingWithdrawals));
    });

    
    export { getPendingWithdrawalRequest };