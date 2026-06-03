
import {apiError,apiResponse,asyncHandler,SellerModel,uploadOnCloudinary,deleteOnCloudinary, UserModel, NotificationModel, io} from '../../index.js';

const updateSellerDetails=asyncHandler(async(req,res)=>{
    const {sellerId}=req.params;
    const sellerForm=req.body;
    
    if(req.files.storeLogo ){
        
        const result=await uploadOnCloudinary(req.files.storeLogo[0]?.path);
        await deleteOnCloudinary(sellerForm.storeLogoPublicId);
        if (!result) {
            throw new apiError(500, "Failed to upload logo");
        }
        sellerForm.storeLogo=result.url;
        sellerForm.storeLogoPublicId=result.public_id;
    }
    if(req.files.storeBanner){
        
        const result=await uploadOnCloudinary(req.files.storeBanner[0]?.path);
        await deleteOnCloudinary(sellerForm.storeBannerPublicId);
        if (!result) {
            throw new apiError(500, "Failed to upload banner");
        }
        sellerForm.storeBanner=result.url;
        sellerForm.storeBannerPublicId=result.public_id;
    }
    
    const form={
        businessName:sellerForm.businessName,
        registrationNumber:sellerForm.registrationNumber,
        taxId:sellerForm.taxId,
        businessEmail:sellerForm.businessEmail,
        sellerId:sellerId,
        cnic:sellerForm.cnic,
        businessAddress: {
            addressLine1:sellerForm.street1,
            addressLine2:sellerForm.street2,
            city:sellerForm.city,
            state:sellerForm.state,
            postalCode:sellerForm.postalCode,
            country:sellerForm.country,
            town:sellerForm.town,
            phone:sellerForm.phone
        },
        bankDetails: {
            bankName:sellerForm.bankName,
            accountHolderName:sellerForm.accountHolderName,
            accountNumber:sellerForm.accountNumber,
            iban:sellerForm.iban
        },
        storeDetails: {
            storeName:sellerForm.storeName,
            storeDescription:sellerForm.storeDescription,
            storeLogo:sellerForm.storeLogo,
            storeLogoPublicId:sellerForm.storeLogoPublicId,
            storeBanner:sellerForm.storeBanner,
            storeBannerPublicId:sellerForm.storeBannerPublicId
            
        }
    }
    
const seller = await SellerModel.findById(sellerId);
if (!seller) throw new apiError(404, "Seller not found");

 const hasChanges =
  sellerForm.businessName !== seller.businessName ||
  sellerForm.registrationNumber !== seller.registrationNumber ||
  sellerForm.taxId !== seller.taxId ||
  sellerForm.businessEmail !== seller.businessEmail ||
  sellerForm.cnic !== seller.cnic;

  if (hasChanges) {
  seller.verification.status = "underReview";
}
 Object.assign(seller, form);
await seller.save();

    if(seller.verification.status !=="verified"){        
        const admins=await UserModel.find({role:"admin"});
    
    const adminNotifications=await Promise.all(admins.map(async(admin)=> (
        await NotificationModel.create({
        type:"seller",
        message:`${seller?.storeDetails?.storeName} has updated their details and is pending verification.`,
        redirect:true,
        recipientModel:"Admin",
        recipient:admin?._id,
        title:"Pending Verification",
        data:{
            sellerId:seller._id,
            storeName:seller?.storeDetails?.storeName
        }
    })

    )));
    
    admins.forEach((admin,i) => {
        const adminNotification=adminNotifications[i];
        io.to(admin._id.toString()).emit("notification", adminNotification);
        
    })
    }
    res.status(200).json(new apiResponse(200,"Seller details updated",seller));
});

export {updateSellerDetails};