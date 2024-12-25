import { apiError, apiResponse, asyncHandler, UserModel, generateTokens, options, CartModel } from "../../index.js";
import { validate } from "email-validator";

const createUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username,device } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("Client IP:", ip);
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
        throw new apiError(400, "User already exists");
    }

    const newUser = await UserModel.create({
        fullName,
        email,
        password,
        username,
        role: "user",
    });
    const sessionId = Date.now().toString();
    const { accessToken, refreshToken } = await generateTokens({userId:newUser._id,role:"user",sessionId:sessionId});
    const newSession={
        sessionId:sessionId,
        device: device,
        ip:ip,}

    newUser.sessions.push(newSession)
    await newUser.save();

    let loggedInUser = await UserModel.findById(newUser._id).select("-password -refreshToken");
    await CartModel.create({ userId: loggedInUser._id });
    req.user = loggedInUser;
    res.status(201)
        .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
        .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
        .json(new apiResponse(201, "User created successfully", loggedInUser));
});

export { createUser };
