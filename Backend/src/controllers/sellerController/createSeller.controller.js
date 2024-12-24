import { apiError, apiResponse, asyncHandler, UserModel, generateTokens, options, CartModel, SellerModel } from "../../index.js";
import { validate } from "email-validator";

const createSeller = asyncHandler(async (req, res) => {
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

  

        let user = existingUser;

        if (!user) {
            console.log("User not found; creating a new user");
            user = await UserModel.create({
                fullName,
                email,
                password,
                username,
                role: ["seller"], // Ensure `role` is an array if you want to push to it later
            });
        }else if(user.role.includes("seller")){
            throw new apiError(409, "Seller already exists");
        }
         else {
            user.role.push("seller");
        }
        const seller = await SellerModel.create({
            userId:user._id,
        })
        const sessionId = Date.now().toString();
        const { accessToken, refreshToken } = await generateTokens({userId:user._id,role:"seller",sessionId:sessionId});
        const newSession={
            sessionId:sessionId,
            device: device,
            ip:ip,}
        
        user.sellerSessions.push(newSession);
        user.sellerId = seller._id
        await user.save();
       
        
        let loggedInSeller = await UserModel.findById(user._id).select("-password -refreshToken");
        req.seller = loggedInSeller;
        
        res.status(201)
            .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
            .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
            .json(new apiResponse(201, "Seller created successfully", loggedInSeller));
        
});

export { createSeller };
