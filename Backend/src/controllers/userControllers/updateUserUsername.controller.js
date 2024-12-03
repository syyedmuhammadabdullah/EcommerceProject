import { apiError, apiResponse, asyncHandler, UserModel, } from "../../index.js";


const updateUserUsername = asyncHandler(async (req, res) => {
    const { username } = req.body;
    if (!username) {
        throw new apiError(400, "Username is required");
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.username = username;
    await user.save();
    apiResponse(res, 200, true, "Username updated successfully", null);
});
export { updateUserUsername }