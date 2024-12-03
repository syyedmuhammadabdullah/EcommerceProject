import { apiError, apiResponse, asyncHandler, UserModel, } from "../../index.js";

const updateUserRecoveryEmail = asyncHandler(async (req, res) => {
    const { recoveryEmail } = req.body;
    if (!recoveryEmail) {
        throw new apiError(400, "Recovery email is required");
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.recoveryEmail = recoveryEmail;
    await user.save();
    apiResponse(res, 200, true, "Recovery email updated successfully", null);
});

export { updateUserRecoveryEmail }