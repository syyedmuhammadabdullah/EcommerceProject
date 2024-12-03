import { apiError, apiResponse, asyncHandler, UserModel,uploadOnCloudinary, deleteOnCloudinary } from "../../index.js";


const updateUserAvatar = asyncHandler(async (req, res) => {
    const  avatar  = req.file;
    console.log("the avatar is", req);
    if (!avatar) {
        throw new apiError(400, "Avatar is required");
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new apiError(404, "User not found");
    }

   let result = await uploadOnCloudinary(avatar.path)
    if (!result) {
        throw new apiError(500, "Failed to upload avatar");
    }
     await deleteOnCloudinary(user.public_id)
    user.avatar = result.secure_url;
    user.public_id = result.public_id
    await user.save();
   res.status(200).json(new apiResponse(200, "Avatar updated successfully", user));
});
export { updateUserAvatar }