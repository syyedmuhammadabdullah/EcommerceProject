import {apiError, apiResponse, asyncHandler, UserModel} from "../../index.js";

const getAllCustomers=asyncHandler(async(req,res)=>{

    const page=req.query.page||1;
    const limit=req.query.limit||10;

    const customers=await UserModel.find({role:"user"}).select(-"password").skip((page-1)*limit).limit(limit);

    if(!customers){
        return res.status(400).json(new apiError(400,"No customers found"));
    }
    res.status(200).json(new apiResponse(200,"Customers found successfully",customers));
})
export {getAllCustomers}