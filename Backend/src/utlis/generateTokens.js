import { UserModel, apiError, asyncHandler } from "../index.js";
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: false,
};
const generateTokens = async ({userId,role,sessionId}) => {
    const user = await UserModel.findById(userId);
    const accessToken = await user.createAccessToken({role,sessionId});
    const refreshToken = await user.createRefreshToken({role,sessionId});
    return { accessToken, refreshToken };
};

const refreshAccessToken = asyncHandler(async (req, res) => {
    const inComingRefreshToken = req.cookies.refreshToken;
    

    if (!inComingRefreshToken) {
        throw new apiError(400, "refresh Token not found");
    }
    const decodedToken = jwt.verify(
        inComingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (error, decodedToken) => {
            if (error) {
                throw new apiError(400, "refresh token expired");
            }
            return decodedToken;
        }
    );
    const user = await UserModel.findById(decodedToken.id);
    const session= user.sessions.find(session=>session.sessionId===decodedToken.sessionId)
     const sellerSession= user.sellerSessions.find(session=>session.sessionId===decodedToken.sessionId)
     const adminSession= user.adminSessions.find(session=>session.sessionId===decodedToken.sessionId)
     
     if (!session && !sellerSession && !adminSession) {
         throw new apiError(400,"session not found")
        
     }

     if (session) {
        session.lastActive=Date.now()
        req.user=user
    }else if (sellerSession) {
        sellerSession.lastActive=Date.now()
        req.seller=user      
    }else if (adminSession) {
        adminSession.lastActive=Date.now()   
        req.admin=user     
    }

    const { accessToken, refreshToken } = await generateTokens({userId:user._id,role:decodedToken.role,sessionId:decodedToken.sessionId});


    await user.save({ validateBeforeSave: false });


    res.status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
});
export { generateTokens, options, refreshAccessToken };
