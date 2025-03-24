import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Ensures unique coupon codes
        trim: true
    },
    couponType: {
        type: String,
        required: true,
        enum: ['whole store', 'specific product', 'specific category', 'specific seller'],
        default: 'whole seller'
    },
    couponAmount: {
        type: Number,
        required: true,
        min: 0
    },
    maximumSpend: {
        type: Number,
        default: null
    },
    minimumSpend: {
        type: Number,
        default: null
    },
    maximumDiscount: {
        type: Number,
        default: null
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'price'],
        default: 'percentage'
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    multiple: {
        type: Boolean,
        default: false
    },
    maximumUsage: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellerModel', // Assuming sellers are stored in the User model
        default: null // Allows admin coupons to have no seller ID
    },
    isAdminCoupon: {
        type: Boolean,
        default: false // False for seller coupons, true for admin coupons
    }
}, { timestamps: true });


export const CouponModel = moongose.model('CouponModel', couponSchema);