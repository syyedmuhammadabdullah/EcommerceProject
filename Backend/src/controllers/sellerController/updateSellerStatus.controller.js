import {apiError,apiResponse,asyncHandler,io,NotificationModel,SellerModel} from "../../index.js";

const updateSellerStatus=asyncHandler(async(req,res)=>{
    const {sellerId,status}=req.body;
    
    const seller=await SellerModel.findById(sellerId);
    
    if(!seller){
       throw new apiError(400,"Seller not found")
    }
    if(seller.accountStatus.status===status){
        throw new apiError(400,"Seller status already updated");
    }
    seller.accountStatus.status=status;
    seller.accountStatus.updatedAt=Date.now();
    await seller.save();
    
    const message={
        pending:"Your account is pending approval. Please Submit all required documents and information to complete the verification process.",
        reviewing:"Your account is being reviewed. We will notify you once the review is complete.",
        active:"Congratulations! Your account has been approved and is now active. You can start listing your products and managing your store.",
        suspended:"Your account has been suspended. Please contact support for more information.",
        inactive:"Your account is currently inactive. Please contact support for more information."
    } // Send notification to seller about status update
    
    
    const notification =await NotificationModel.create({
        recipientModel:"Seller",
        recipient:sellerId,
        type:"account",
        title:"Account Status Update",
        message:message[status],
        redirect:false,
        data:{status:status,
            message:message[status]
        }
    });
    io.to(sellerId.toString()).emit("notification",notification);

    res.status(200).json(new apiResponse(200,"Seller status updated successfully",seller));
})
export {updateSellerStatus}