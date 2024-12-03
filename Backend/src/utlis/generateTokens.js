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
    if (!session) {
        throw new apiError(400,"access token not valid")
       
    }
    session.lastActive=Date.now()

    const { accessToken, refreshToken } = await generateTokens({userId:user._id,role:decodedToken.role,sessionId:decodedToken.sessionId});


    await user.save({ validateBeforeSave: false });

    req.user = user;

    res.status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
});
export { generateTokens, options, refreshAccessToken };
