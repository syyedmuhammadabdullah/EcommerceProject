import { apiError, apiResponse, asyncHandler, UserModel } from "../../index.js";
import { validate } from "email-validator";
import crypto from "crypto";
import nodeMailer from "nodemailer";

let user;


// Handler to request a password reset
const reqPasswordResert = asyncHandler(async (req, res) => {
    // Extract email from the request body
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        throw new apiError(400, "Email is required");
    }

    // Validate email format
    if (!validate(email)) {
        throw new apiError(400, "Invalid email format");
    }

    // Find the user by email
    let userInfo = await UserModel.findOne({ email });
    if (!userInfo) {
        throw new apiError(404, "Incorrect email");
    }

    // Generate a 4-digit reset token
    const resetToken = crypto.randomInt(1000, 9999).toString();
    userInfo.passwordresetToken = resetToken;
    userInfo.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await userInfo.save();
    user=userInfo;
    // Set up Nodemailer transporter for Gmail
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL, // Email address used for sending
            pass: process.env.ADMIN_EMAIL_PASSWORD, // Email password
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.MAIL_USER, // Sender email address
        to: email, // Recipient email address
        subject: "Password Reset", // Email subject
        text: `Your password reset token is ${resetToken}`, // Email body
    };

    try {
        // Send the password reset email
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json(new apiResponse(200, "Password reset link sent successfully", info));
    } catch (error) {
        // Handle any errors during sending
        throw new apiError(500, error.message || "Error sending password reset link");
    }
});

// Handler to verify the password reset token
const verifyPasswordResetToken = asyncHandler(async (req, res) => {
    // Extract the reset token from the request body
    const { passwordresetToken } = req.body;
    
    if (user.passwordresetToken !== passwordresetToken || user.passwordResetExpires < Date.now()) {
    throw new apiError(400, "Invalid or expired password reset token");
    
}

    // Clear the reset token and expiration
    await UserModel.findOneAndUpdate(
        { email: user.email },
        {
            $unset: {
                passwordResetExpires: 1,
                passwordresetToken: 1,
            },
        }
    );
    res.status(200)
    .json(new apiResponse(200,"token verified"))


});

// Handler to reset the user's password
const resetUserPassword = asyncHandler(async (req, res) => {
    console.log("the user is ",user);
    // Extract email from the user object 
    const  email  = user.email;

    if (!email) {
        throw new apiError(400, "Email is required");
    }

    // Find the user by email
    const upadeUser = await UserModel.findOne({ email });
    if (!upadeUser) {
        throw new apiError(404, "Incorrect email");
    }

    // Extract new and confirm passwords from the request body
    const { newPassword, confirmPassword } = req.body;

    // Check if new and confirm passwords match
    if (newPassword !== confirmPassword) {
        throw new apiError(400, "Passwords do not match");
    }

    // Update the user's password
    upadeUser.password = newPassword;

    // Save the updated user document
    await upadeUser.save();

    // Send a success response
    res.status(200).json(new apiResponse(200, "Password updated successfully", null));
});

export { resetUserPassword, verifyPasswordResetToken, reqPasswordResert };
