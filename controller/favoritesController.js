const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const movieModel = require("../model/movieModel");

// @desc add Product to wishList
// @route POST /api/v1/wishtlist/:productId
// @access protected/ user

exports.addMovieToFavorites = asyncHandler(async (req, res, next) => {
  //$addToSet => add productId to wishList array if productId not existing in wishList

  const movie = await movieModel.create({
    userId: req.user._id,
    movieId: req.body.movieId,
  });

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { favorites: movie._id },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Movie added to favorites",
    results: user.favorites.length,
    data: user.favorites,
  });
});

// @desc add Product to wishList
// @route DELETE /api/v1/wishtlist/:productId
// @access protected/ user
exports.removeMovieFromWishList = asyncHandler(async (req, res, next) => {
  //$addToSet => remove productId from wishList array if productId existing in wishLis
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { favorites: req.params.movieId } },
    { new: true }
  );

  await movieModel.findOneAndDelete({
    userId: req.user._id,
    movieId: req.body.movieId,
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from favorites",
    results: user.favorites.length,
    data: user.favorites,
  });
});

// @desc get logged user wishlist
// @route GET /api/v1/wishtlist
// @access protected/ user
exports.getLoggedUserFavorites = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate("favorites");
  res.status(200).json({
    status: "success",
    results: user.favorites.length,
    data: user.favorites,
  });
});
