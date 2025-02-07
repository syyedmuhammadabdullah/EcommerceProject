import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const getOrders=asyncHandler(async(req,res)=>{

    // const orders=await OrderModel.find({userId:req.user._id});
    const orders=await OrderModel.find({userId:req.user._id})
    .populate({path:"sellerId", select:"storeDetails"})

    res.status(200)
    .json(new apiResponse(200,"Orders found successfully",orders))

})

export {getOrders}