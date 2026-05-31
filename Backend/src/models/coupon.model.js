import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  discountScope: {
    type: String,
    required: true,
    enum: ['whole store', 'specific product', 'specific category', 'specific seller'],
    default: 'whole store'
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

  minimumSpend: {
    type: Number,
    default: null
  },

  maximumSpend: {
    type: Number,
    default: null
  },

  maximumDiscount: {
    type: Number,
    default: null
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },

  userUsageLimit: {
    type: Number,
    default: 1
  },

  totalUsageLimit: {
    type: Number,
    default: null
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },

  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SellerModel',
    default: null
  },

  isAdminCoupon: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const CouponModel = moongose.model('CouponModel', couponSchema);