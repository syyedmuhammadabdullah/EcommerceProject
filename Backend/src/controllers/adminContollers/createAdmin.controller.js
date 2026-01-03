import { apiError, apiResponse, asyncHandler, UserModel, generateTokens, options, SellerWalletModel, SellerWithdrawalModel, SellerModel } from "../../index.js";
import { validate } from "email-validator";

const createAdmin = asyncHandler(async (req, res) => {
    const { fullName, email, password, username,device } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if ([fullName, email, password, username].some((field) => field.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }

    if (password.length < 6) {
        throw new apiError(400, "Password must be at least 6 characters");
    }

    if (!validate(email)) {
        throw new apiError(400, "Invalid email format");
    }
    
    const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
    });
        if (existingUser) {
            throw new apiError(409, "User already exists");
        }

          const user = await UserModel.create({
                fullName,
                email,
                password,
                username,
                role: ["admin"], 
            });

        const sessionId = Date.now().toString();
        const { accessToken, refreshToken } = await generateTokens({userId:user_id ,role:"admin",sessionId:sessionId});
        const newSession={
            sessionId:sessionId,
            device: device,
            ip:ip,}
        
        user.adminSessions.push(newSession);
        await user.save();
       
        
        let loggedInAdmin = await UserModel.findById(user._id).select("-password ")
        req.admin = loggedInAdmin;
        
        res.status(201)
            .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
            .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
            .json(new apiResponse(201, "Admin created successfully", loggedInAdmin));
        
});

export { createAdmin };
