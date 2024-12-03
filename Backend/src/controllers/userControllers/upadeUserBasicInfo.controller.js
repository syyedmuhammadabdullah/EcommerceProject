
import { apiError, apiResponse, asyncHandler, UserModel, } from "../../index.js";


const updateUserBasicInfo = asyncHandler(async (req, res) => {
    const { fullName,dob,username,gender } = req.body;
    console.log("basic detail update runs");
    if ([fullName,gender, username].includes((val)=>val==="")) {
        throw new apiError(400, "All fields are required");
    }

    const user = await UserModel.findByIdAndUpdate(req.user._id,{
        fullName,
        username,
        dateOfBirth:dob,
        gender
    });
    if (!user) {
        throw new apiError(404, "User not found");
    }

    res.status(200)
    .json(new apiResponse(200, "User updated successfully", user))
});
export { updateUserBasicInfo }