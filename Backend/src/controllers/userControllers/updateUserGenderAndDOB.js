
import { apiError, apiResponse, asyncHandler, UserModel } from "../../index.js";


const updateUserGenderAndDOB=asyncHandler(async(req,res)=>{
    const {gender,dob}=req.body;
    if(!gender || !dob){
        throw new apiError(400,"All fields are required");
    }
    const user=await UserModel.findById(req.user._id);
    if(!user){
        throw new apiError(404,"User not found");
    }
    user.gender=gender;
    user.dob=dob;
    await user.save();
    res.status(200)
    .json(new apiResponse(res,200,true,"Gender and DOB updated successfully",null));
})
export {updateUserGenderAndDOB}