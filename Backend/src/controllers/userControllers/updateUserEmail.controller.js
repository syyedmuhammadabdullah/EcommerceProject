import { apiError, apiResponse, asyncHandler, UserModel, } from "../../index.js";
import { validate } from "email-validator";



const updateUserEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new apiError(400, "Email is required");
    }
    if (!validate(email)) { 
        throw new apiError(400, "Invalid email format");        
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.email = email;
    await user.save();
    apiResponse(res, 200, true, "Email updated successfully", null);
});
export { updateUserEmail }