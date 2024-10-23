const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      trim: true,
      required: [true, "First Name is required"],
      unique: [true, "Movie ID is already exists"],
    },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movies", MovieSchema);

module.exports = Movie;
