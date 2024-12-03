import { apiError, apiResponse, asyncHandler, UserModel, } from "../../index.js";


const updateUserFullName = asyncHandler(async (req, res) => {
    const { fullName } = req.body;
    if (!fullName) {
        throw new apiError(400, "Full name is required");
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.fullName = fullName;
    await user.save();
    apiResponse(res, 200, true, "Full name updated successfully", null);
});
export { updateUserFullName }