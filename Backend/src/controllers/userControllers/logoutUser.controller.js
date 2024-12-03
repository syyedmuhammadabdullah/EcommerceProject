import { apiError, apiResponse, asyncHandler, UserModel, options } from "../../index.js";
import jwt from "jsonwebtoken";

const logoutUser = asyncHandler(async (req, res) => {
   
    const user=await UserModel.findById(req.user._id)
    console.log("from logout",user,req.sessionId);
    
    if (!user) {
        throw new apiError(404, "User not found");
    }
    user.sessions=user.sessions.filter(session=>session.sessionId!==req.sessionId)
    await user.save()


    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, "user logged out successfully", {}));
});

export { logoutUser };
