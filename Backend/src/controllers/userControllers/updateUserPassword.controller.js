import { apiError, apiResponse, asyncHandler, UserModel, } from "../../index.js";


const updateUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if ([oldPassword, newPassword, confirmPassword].some((field) => field.trim()==="")) {
        throw new apiError(400, "All fields are required");
    }
    const { id } = req.user;
    const user = await UserModel.findById(id);
    if (!user) {
        throw new apiError(404, "User not found");
    }
    
    const isMatch = await user.passwordCheck(oldPassword);
    if (!isMatch) {
        throw new apiError(400, "Invalid password");
    }   
    if (newPassword !== confirmPassword) {
        throw new apiError(400, "Passwords do not match");
    }

    user.password = newPassword;
    await user.save();
    apiResponse(res, 200, true, "Password updated successfully", null);

});
export {updateUserPassword};