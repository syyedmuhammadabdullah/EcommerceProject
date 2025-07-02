
import {apiError,apiResponse,asyncHandler,SellerModel,uploadOnCloudinary,deleteOnCloudinary} from '../../index.js';

const updateSellerDetails=asyncHandler(async(req,res)=>{
    const {sellerId}=req.params;
    const sellerForm=req.body;
    console.log("update seller details runs",sellerForm,req.files);
    
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
    console.log("seller form",sellerForm?.street1,sellerForm?.street2);
    
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
 
    const updatedSeller=await SellerModel.findByIdAndUpdate(sellerId,form,{new:true});
    if (!updatedSeller) {
        throw new apiError(404, "Seller not found");
    }
    res.status(200).json(new apiResponse(200,"Seller details updated",updatedSeller));
});

export {updateSellerDetails};