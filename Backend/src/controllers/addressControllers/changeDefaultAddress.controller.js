import {apiError,apiResponse,asyncHandler,AddressModel,getAllAddress} from "../../index.js";

const changeDefaultAddress=asyncHandler(async (req,res)=>{
const {addressId,type}=req.body
console.log(addressId,type);


   await AddressModel.updateMany({
       userId:req.user._id,
       ...(type==="shipping"? {isDefaultShipping:true}:{isDefaultBilling:true})
    },
    {
        $set:type==="shipping"? {isDefaultShipping:false}:{isDefaultBilling:false}
        
    }
)

await AddressModel.findByIdAndUpdate(
    addressId,
    {
       $set: type==="shipping"?{isDefaultShipping:true}: {isDefaultBilling:true}
       
    }
)
const addresses=await AddressModel.aggregate([
  {
    $match: { userId: req.user._id }
  }
])
 res.status(200).json(new apiResponse(200,"default address changes successfully ",addresses))

})

export {changeDefaultAddress}