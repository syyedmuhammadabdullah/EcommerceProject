import {apiError,apiResponse,asyncHandler,SellerWithdrawalModel, NotificationModel,UserModel, io} from '../../index.js'

export const requestWithdraw = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const sellerId = req.seller.sellerId;
 
 
    const transaction = await SellerWithdrawalModel.create({
        amount: amount,
        sellerId: sellerId,
        status: "pending",
        method: "bank_transfer"
    });
    const admins = await UserModel.find({ role: "admin" });
    const notification=await NotificationModel.create({
        recipientModel:"Seller",
        recipient:sellerId,
        title:"Withdrawal Request",
        redirect:false,
        type:"withdrawal",
        data:{transactionId:transaction._id},
        message:`Your withdrawal request of amount RS ${amount} has been received and is being processed.`
    });
    
  const notifications =  await Promise.all(admins.map(async (admin) => (
        await NotificationModel.create({
            recipientModel:"Admin",
            recipient:admin._id,
            title:"New Withdrawal Request",
            redirect:true,
            type:"withdrawal",
            data:{transactionId:transaction._id},
            message:`A new withdrawal request of amount RS ${amount} has been made by seller ${sellerId}.`
        })
    )));
    io.to(sellerId.toString()).emit("notification", notification);
    const seller=await transaction.populate("sellerId","storeDetails.storeName");
    
   await admins.forEach((admin,i) => {
        
        io.to(admin._id.toString()).emit("notification", notifications[i]);
        io.to(admin._id.toString()).emit("newWithdrawalRequest", seller);
      
    });
    res.status(201).json(new apiResponse(201, "Withdrawal request created successfully", transaction));
});