import {apiError,apiResponse,asyncHandler,io,NotificationModel,SellerModel} from "../../index.js";

const updateSellerStatus=asyncHandler(async(req,res)=>{
    const {sellerId,status}=req.body;
    const seller=await SellerModel.findById(sellerId);
    if(!seller){
        return res.status(400).json(new apiError(400,"Seller not found"));
    }
    if(seller.accountStatus.status===status){
        return res.status(400).json(new apiError(400,"Seller status already updated"));
    }
    seller.accountStatus.status=status;
    seller.accountStatus.updatedAt=Date.now();
    await seller.save();

    const message=status==="approved"?"Congratulations! Your seller account has been approved. You can now start listing your products and selling on our platform.":"We regret to inform you that your seller account has been rejected. For more information, please contact our support team.";
    // Send notification to seller about status update
    const notification =await NotificationModel.create({
        recipientModel:"Seller",
        recipient:sellerId,
        type:"account",
        title:"Account Status Update",
        message,
        redirect:false,
        data:{}
    });
    io.to(sellerId.toString()).emit("notification",notification);

    res.status(200).json(new apiResponse(200,"Seller status updated successfully",seller));
})
export {updateSellerStatus}