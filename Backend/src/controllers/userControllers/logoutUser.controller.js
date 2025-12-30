import { apiError, apiResponse, asyncHandler, UserModel, options } from "../../index.js";
import jwt from "jsonwebtoken";

const logoutUser = asyncHandler(async (req, res) => {
    let id=req?.user?._id || req?.seller?._id || req?.admin?._id;
    const role=req.body.role;
    console.log("logout user runs",id);
    const user=await UserModel.findById(id)
    console.log("from logout",user,req.sessionId);
    
    if (!user) {
        throw new apiError(404, "User not found");
    }
    if (role==="user"){ 
        user.sessions=user.sessions.filter(session=>session.sessionId!==req.sessionId)
    }
    if (role==="seller"){ 
        user.sellerSessions=user.sellerSessions.filter(session=>session.sessionId!==req.sessionId)
    }
    if (role==="admin"){ 
        user.adminSessions=user.adminSessions.filter(session=>session.sessionId!==req.sessionId)
    }
    await user.save()


    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, "user logged out successfully", {}));
});

export { logoutUser };
