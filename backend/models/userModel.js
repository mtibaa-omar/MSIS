import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please tell us your name!"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    avatar: { type: String, default: "" },
    mobile: { type: Number, default: null },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "Disabled"],
      select: false,
    },
    adressDetails: [{ type: mongoose.Schema.ObjectId, ref: "Adress" }],
    shoppingCart: [{ type: mongoose.Schema.ObjectId, ref: "CartProduct" }],
    orderHistory: [{ type: mongoose.Schema.ObjectId, ref: "Order" }],
    forgotPasswordToken: {
      type: String,
      default: null,
    },

    forgotPasswordExpiry: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MODERATOR", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Document Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Query Middelware
userSchema.pre(/^find/, async function (next) {
  this.find({ status: { $ne: "Disabled" } });
  next();
});
// Method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedAfterPassword = function (JWTTimeStamp) {
  if (this.updatedAt) {
    const changedTimestamp = parseInt(this.updatedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedTimestamp;
  }
  return false;
};
userSchema.methods.createForgotPasswordToken = function () {
  const forgotToken = crypto.randomBytes(32).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
  console.log(this.forgotPasswordExpiry);
  return forgotToken;
};
const User = mongoose.model("User", userSchema);

export default User;
