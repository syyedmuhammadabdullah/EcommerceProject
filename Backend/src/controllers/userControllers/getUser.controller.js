import {apiError,apiResponse,asyncHandler,UserModel} from "../../index.js";

const getUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new apiError(404, "User not found");
    }
    res.status(200)
    .json(new apiResponse(200,"User found successfully",user))


});
export { getUser }