const express = require("express");
const authController = require("../controller/authController");

const {
  addMovieToFavorites,
  removeMovieFromWishList,
  getLoggedUserFavorites,
} = require("../controller/favoritesController");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addMovieToFavorites).get(getLoggedUserFavorites);

router.route("/:movieId").delete(removeMovieFromWishList);

module.exports = router;
