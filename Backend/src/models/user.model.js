import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const sessionSchema = new Schema({
    sessionId: { type: String, required: true }, // Unique ID for the session
    device: { type: String, required: true }, // e.g., "Chrome on Windows"
    ip: { type: String, required: true }, // IP address of the login
    createdAt: { type: Date, default: Date.now }, // When the session was created
    lastActive: { type: Date, default: Date.now }, // Last active time
  });

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            index: true,
            unique: true,
            lowercase: true,
        },
        avatar: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        recoveryEmail: {
            type: String,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        shippingAddress: {
            type: Schema.ObjectId,
            ref: "ShippingAddressModel",
        },
        billingAddress: {
            type: Schema.ObjectId,
            ref: "BillingAddressModel",
        },
     
        dateOfBirth: {
            type: String,
        },
        phoneNumber: {
            type: Number,
        },
        gender: {
            type: String,
            enum: ["Male", "Female","Other"],
        },
        sessions: [sessionSchema],
        sellerSessions: [sessionSchema],
        adminSessions: [sessionSchema],
        refreshToken: {
            type: String,
        },

        passwordresetToken: {
            type: String,
        },
        public_id: {
            type: String,
        },

        passwordResetExpires: {
            type: Date,
        },
        role: {
            type: [String],
            enum: ["user", "admin","seller"],
            default: "user",
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "SellerModel",
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: "AdminModel",
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

userSchema.methods.passwordCheck = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.createAccessToken = async function ({role,sessionId}) {
    return jwt.sign(
        { id: this._id, email: this.email, username: this.username , role:role,sessionId: sessionId},

        process.env.ACCESS_TOKEN_SECRET_KEY,

        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.createRefreshToken = async function ({role,sessionId}) {
    return jwt.sign(
        { id: this._id, email: this.email, username: this.username,role:role,sessionId: sessionId },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const UserModel = mongoose.model("UserModel", userSchema);
