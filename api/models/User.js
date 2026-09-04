import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    relation: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    // Authentication
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    isEmailVerified:{
      type:Boolean,
      default:false
    },

    password: {
      type: String,
      // required: true
    },
    otp: {
      type: String,
      // required: true
    },
    otpExpiresAt: {
      type: Date,
      default: null
    },

    // Owner details
    phone: {
      type: String,
      trim: true
    },

    isPhoneVerified:{
      type:Boolean,
      default:false
    },

    // Emergency contacts
    emergencyContacts: {
      type: [emergencyContactSchema],
      default: []
    },

    // QR
    qrToken: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },

    qrActive: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    // Profile completion
    profileCompleted: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

