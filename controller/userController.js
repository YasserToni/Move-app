const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");
const { sanitizeUser } = require("../utils/sanitizData");

// get logged user data
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  // req.params.id = req.user.id;
  const user = await userModel.findOne({ _id: req.user._id });
  if (!user) {
    return ApiError("User not found", 404);
  }
  res.status(200).json({
    data: sanitizeUser(user),
  });
  next();
});

// update my password
exports.updateMyPassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  const token = createToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
    token,
  });
});

// update my data
exports.updateMyData = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      bio: req.body.bio,
      profileImage: req.files["profileImage"][0].path,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Data updated successfully",
    data: sanitizeUser(user),
  });
});

// deActivateMe me
exports.deActivateMe = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user._id, {
    active: false,
  });
  res.status(200).json({
    status: "success",
    message: "User deactivated successfully",
  });
});
