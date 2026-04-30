import {apiError,apiResponse,asyncHandler,SellerWalletModel,SellerTransactionModel, NotificationModel, io} from '../../index.js'

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
        status: "pending",
    });
    const notification=await NotificationModel.create({
        recipientModel:"Seller",
        recipient:sellerId,
        title:"Withdrawal Request",
        redirect:false,
        type:"withdrawal",
        data:{transactionId:transaction._id},
        message:`Your withdrawal request of amount RS ${amount} has been received and is being processed.`
    })
    io.to(sellerId.toString()).emit("notification", notification);
    res.status(201).json(new apiResponse(201, "Withdrawal request created successfully", transaction));
});