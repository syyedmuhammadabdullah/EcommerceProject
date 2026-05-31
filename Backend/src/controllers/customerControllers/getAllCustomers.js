import {apiError, apiResponse, asyncHandler, UserModel} from "../../index.js";

const getAllCustomers=asyncHandler(async(req,res)=>{

    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||10;
    const search=req.query.search || "";

    const customers=await UserModel.find({role:"user" , fullName: { $regex: search, $options: "i" }}).select(-"password").skip((page-1)*limit).limit(limit);
    const totalCustomers=await UserModel.countDocuments({role:"user" , });

    res.status(200).json(new apiResponse(200,"Customers found successfully", customers, totalCustomers ));
})
export {getAllCustomers}