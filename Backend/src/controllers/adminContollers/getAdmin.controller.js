import {apiError, apiResponse,UserModel,asyncHandler} from "../../index.js";

const getAdmin=asyncHandler(async(req,res)=>{
    const admin=await UserModel.findById(req.admin._id);
    if(!admin){
        return res.status(400).json(new apiError(400,"admin not found"));
    }
    res.status(200).json(new apiResponse(200,"admin found successfully",admin));
})
export {getAdmin}