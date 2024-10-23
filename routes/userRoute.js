const express = require("express");
const { cloudinaryImageStorage } = require("../config/cloudinaryConfig");
const { multerSingleImage } = require("../config/multerConfig");

const { updateMydataValidator } = require("../utils/validator/userValidator");
const {
  getLoggedUserData,
  updateMyPassword,
  updateMyData,
  deActivateMe,
} = require("../controller/userController");

const authController = require("../controller/authController");

const router = express.Router();

const movieProfileStorage = cloudinaryImageStorage("movie-profile-images");

// get logged user data
router
  .route("/getLoggedUserData")
  .get(authController.protect, getLoggedUserData);

// update My password
router.route("/updateMyPassword").put(authController.protect, updateMyPassword);

// update My data
router
  .route("/updateMyData")
  .put(
    updateMydataValidator,
    authController.protect,
    multerSingleImage(movieProfileStorage, "profileImage"),
    updateMyData
  );

// DeActive me
router.route("/DeActiveMe").delete(authController.protect, deActivateMe);

module.exports = router;
