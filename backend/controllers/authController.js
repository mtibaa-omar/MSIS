import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import catchAsync from "./../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import crypto from "crypto";
import { verifyEmailTemplate } from "./../utils/verifyEmailTemplate.js";
import { forgotPasswordTemplate } from "../utils/forgotPasswordTemplate.js";
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  res.cookie("jwt", token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};
export const signup = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });
  console.log("user", user);
  if (user) {
    return next(new AppError("Email Already registered!", 400));
  }
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const verificationURL = `${req.protocol}://${req.get("host")}/api/users/verifyEmail/${newUser._id}`;

  await sendEmail({
    email: newUser.email,
    subject: "Verification",
    html: verifyEmailTemplate({
      actionUrl: verificationURL,
      name: req.body.name,
    }),
  });

  createSendToken(newUser, 201, res);
});
export const verifyEmail = catchAsync(async (req, res, next) => {
  console.log("ee");
  const code = req.params.code;
  const user = await User.findById(code);

  if (!user) next(new AppError("Invalid User"));
  console.log(user);
  const updateUser = await User.updateOne({ _id: code }, { verifyEmail: true });
  res.status(200).json({ status: "success" });
});
export const logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.status(200).json({ status: "success", message: "Logged out!" });
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  // verify is valid token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // verify is password changes
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  if (currentUser.changedAfterPassword(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new AppError("There is no user found with this email", 404));
  }

  const resetToken = user.createForgotPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get("host")}/api/users/resetPassword/${resetToken}`;

  const message = forgotPasswordTemplate(resetURL);

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      html: message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    next(new AppError("Your current password is wrong!", 401));
  }

  user.password = req.body.password;
  await user.save();

  createSendToken(user, 200, res);
});
