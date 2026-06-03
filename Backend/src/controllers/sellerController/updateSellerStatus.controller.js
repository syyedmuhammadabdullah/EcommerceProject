import {apiError,apiResponse,asyncHandler,io,NotificationModel,SellerModel} from "../../index.js";

const updateSellerStatus=asyncHandler(async(req,res)=>{
    const {accountStatus,verificationStatus,rejectionReason=""}=req.body;
    let sellerId= req?.body?.sellerId || req?.seller?.sellerId;
    
    const seller=await SellerModel.findById(sellerId);
    
    if(!seller){
       throw new apiError(400,"Seller not found")
    }
    if(seller.verification.status===verificationStatus){
        throw new apiError(400,"Seller verification status already updated");
    }
    if(seller.accountStatus.status===accountStatus){
        throw new apiError(400,"Seller status already updated");
    }

    if(verificationStatus){
        seller.verification.status=verificationStatus;
        if(verificationStatus==="rejected"){
            seller.accountStatus.status="inactive";
            seller.verification.rejectionReason=rejectionReason;
        }else{
            seller.verification.verificationDate=Date.now();
                seller.verification.rejectionReason=null;
                seller.accountStatus.status="active";
        }
    }

    if(accountStatus){
        
        if(seller.accountStatus.status==="suspended" && req.role!=="admin"){
            throw new apiError(400,"Seller account is suspended. Only active status is allowed.")
        }
        if(seller.verification.status!=="verified" && accountStatus==="active"){
            throw new apiError(400,"Seller account cannot be active until verification is complete.")
        }
        seller.accountStatus.status=accountStatus;
        seller.accountStatus.updatedAt=Date.now();
    }

    await seller.save();
    
    const message={
        reviewing:"Your account is being reviewed. We will notify you once the review is complete.",
        active:req?.seller?.sellerId? "Your Account status is set to Active and you can start listing your products." : "Congratulations! Your account has been approved and is now active. You can start listing your products and managing your store.",
        suspended:"Your account has been suspended. Please contact support for more information.",
        inactive:req?.seller?.sellerId? "Your account is set to Inactive." :"Your account is currently inactive. Please contact support for more information.",
        pending:"Your account is pending review. Please furnish all required documents and information to expedite the verification process.",
        underReview:"Your account is currently under review. We will notify you once the review is complete.",
        verified:"Congratulations! Your account has been verified. You can now enjoy all the features of our platform.",
        rejected:"We regret to inform you that your account verification has been rejected. Please review the rejection reason and contact support for further assistance."
    } // Send notification to seller about status update
    
    if(accountStatus){
    
    const notification =await NotificationModel.create({
        recipientModel:"Seller",
        recipient:sellerId,
        type:"account",
        title:"Account Status Update",
        message:message[accountStatus],
        redirect:false,
        data:{accountStatus:accountStatus,
            message:message[accountStatus]
        }
    });
    io.to(sellerId.toString()).emit("notification",notification);
    }

    if(verificationStatus){
        const notification =await NotificationModel.create({
            recipientModel:"Seller",
            recipient:sellerId,
            type:"verification",
            title:"Verification Status Update",
            message:message[verificationStatus],
            redirect:false,
            data:{verificationStatus:verificationStatus,
                message:message[verificationStatus]
            }
        });
        io.to(sellerId.toString()).emit("notification",notification);
    }

    res.status(200).json(new apiResponse(200,"Seller status updated successfully",seller));
})
export {updateSellerStatus}