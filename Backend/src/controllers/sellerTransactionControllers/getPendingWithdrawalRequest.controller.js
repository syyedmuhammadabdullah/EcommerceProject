import {apiError, apiResponse, asyncHandler, SellerTransactionModel} from "../../index.js";

const getPendingWithdrawalRequest = asyncHandler(async (req, res) => {
    console.log("get pending withdraw runs");
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
        const pendingWithdrawals = await SellerTransactionModel.aggregate([
            {
                $match: {
                    type: "withdrawal",
                    status: "pending",
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