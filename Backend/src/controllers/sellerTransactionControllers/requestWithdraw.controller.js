import {apiError,apiResponse,asyncHandler,SellerWalletModel,SellerTransactionModel} from '../../index.js'

export const requestWithdraw = asyncHandler(async (req, res) => {
   
    const { amount } = req.body;
    const sellerId = req.seller.sellerId;
    const sellerWallet = await SellerWalletModel.findOne({ sellerId: sellerId });
    if (!sellerWallet) {
        throw new apiError(400, "Wallet not found");
    }
    if (amount > sellerWallet.balance) {
        throw new apiError(400, "Insufficient balance");
    }
    const transaction = await SellerTransactionModel.create({
        type: "withdrawal",
        amount: amount,
        walletId: sellerWallet._id,
        sellerId: sellerId,
        status: "completed",
    });
    sellerWallet.balance -= amount;
    await sellerWallet.save();
    res.status(201).json(new apiResponse(201, "Withdrawal request created successfully", transaction));
});