import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "recipientModel", // 🔥 dynamic ref
  },
  redirect: {
    type: Boolean,
    default: false,
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ["User", "Seller", "Admin"], // 👈 roles
  },

  type: {
    type: String,
    required: true,
  },

  title:{type: String},
  message: {type: String},

  data: {
    type: Object,
    default: {},
  },
  isCleared: {
    type: Boolean,
    default: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const NotificationModel = mongoose.model("NotificationModel", notificationSchema);